import { renderGame } from '../views/game.view';
import { renderCard } from '../components/card.component';
import { challengePlayer, distributeCards, drawCard, getGameStatus, getPlayersInGame, hearEvent, leaveGame, playCard, sayUno } from '../services/games.service';
import { getGameId, getPlayerId } from '../utils/storage';
import navigate from '../router/router';

export const gameController = {
    render: renderGame,
    mount: async () => {
        const gameId = getGameId();
        if (!gameId) {
            navigate('/lobby');
            return;
        }

        const board = document.querySelector('#game-board');
        const opponentsArea = document.querySelector('#opponents-area');
        const ownHand = document.querySelector('#own-hand');
        const ownPlayerName = document.querySelector('#own-player-name');
        const gameTitle = document.querySelector('#game-title');
        const turnLabel = document.querySelector('#turn-label');
        const discardPile = document.querySelector('#discard-pile');
        const currentColor = document.querySelector('#current-color');
        const sayUnoButton = document.querySelector('#say-uno-btn');
        const popup = document.querySelector('#game-popup');
        const popupMessage = document.querySelector('#game-popup-message');
        const colorPicker = document.querySelector('#color-picker');
        const popupClose = document.querySelector('#game-popup-close');
        const resultsPopup = document.querySelector('#game-results-popup');
        const ranking = document.querySelector('#game-ranking');
        const currentPlayerId = getPlayerId();
        let players = [];
        let gameStatus;
        const playersWhoSaidUno = new Set();

        const showPopup = (message) => {
            popupMessage.textContent = message || 'The action could not be completed';
            colorPicker.classList.add('hidden');
            popupClose.classList.remove('hidden');
            popup.classList.remove('hidden');
        };

        const closePopup = () => popup.classList.add('hidden');

        const showResults = (scores = []) => {
            const orderedScores = [...scores].sort((first, second) => first.score - second.score).slice(0, 3);
            const places = ['1st', '2nd', '3rd'];
            ranking.innerHTML = '';

            orderedScores.forEach((score, index) => {
                const row = document.createElement('div');
                row.classList.add('ranking-row');
                row.classList.toggle('first', index === 0);
                row.innerHTML = `
                    <span>${places[index]} · ${score.name}</span>
                    <span class="ranking-score">${score.score} pts</span>
                `;
                ranking.appendChild(row);
            });
            resultsPopup.classList.remove('hidden');
        };

        const showWinnerByDeparture = ({ winner, reason }) => {
            ranking.innerHTML = `
                <div class="ranking-row first"><span>Winner · ${winner?.name || 'Remaining player'}</span></div>
                <p>${reason}</p>
            `;
            resultsPopup.classList.remove('hidden');
        };

        const requestPlayCard = (card) => {
            if (card.color !== 'MULTICOLOR') {
                playCard(gameId, card.id + '');
                return;
            }
            popupMessage.textContent = '';
            popupClose.classList.add('hidden');
            colorPicker.classList.remove('hidden');
            popup.classList.remove('hidden');
            document.querySelectorAll('.color-option').forEach(button => {
                button.onclick = () => {
                    closePopup();
                    playCard(gameId, card.id + '', button.dataset.color);
                };
            });
        };

        const refreshGame = async () => {
            const result = await getGameStatus(gameId);
            if (!result.ok) {
                showPopup(result.error?.message || 'Could not load the game');
                return;
            }
            gameStatus = result.result;
            renderBoard();
        };

        const refreshPlayers = async () => {
            const result = await getPlayersInGame(gameId);
            if (!result.ok) {
                showPopup(result.error?.message || 'Could not update the players');
                return;
            }
            players = result.result.players;
            refreshGame();
        };

        const renderBoard = () => {
            if (!gameStatus) {
                return;
            }

            const hands = gameStatus.hands || [];
            hands.forEach(hand => {
                if (hand.cards.length !== 1) {
                    playersWhoSaidUno.delete(hand.playerId);
                }
            });
            const ownHandData = hands.find(hand => hand.playerId === currentPlayerId)?.cards || [];
            const ownPlayer = players.find(player => player.playerId === currentPlayerId);
            const opponents = players.filter(player => player.playerId !== currentPlayerId);
            const cardCount = (playerId) => hands.find(hand => hand.playerId === playerId)?.cards?.length || 0;

            board.className = `players-${players.length}`;
            gameTitle.textContent = gameStatus.game.title;
            ownPlayerName.textContent = ownPlayer?.name || 'You';
            sayUnoButton.classList.toggle('hidden', ownHandData.length !== 1 || playersWhoSaidUno.has(currentPlayerId));
            turnLabel.textContent = gameStatus.currentPlayer?.playerId === currentPlayerId
                ? 'YOUR TURN'
                : `${gameStatus.currentPlayer?.name || 'Another player'}'s turn`;

            currentColor.className = `color-${(gameStatus.game.currentColor || 'YELLOW').toLowerCase()}`;
            discardPile.innerHTML = '';
            if (gameStatus.topCard) {
                discardPile.appendChild(renderCard(gameStatus.topCard));
            }

            opponentsArea.innerHTML = '';
            opponents.forEach((player, index) => {
                const opponent = document.createElement('div');
                opponent.classList.add('opponent-player');
                const count = cardCount(player.playerId);
                opponent.innerHTML = `
                    <div class="opponent-info">
                        <span>${player.name}</span><br />
                        <span class="opponent-cards">${count} cards</span>
                    </div>
                `;

                if (count === 1 && !playersWhoSaidUno.has(player.playerId)) {
                    const challengeButton = document.createElement('button');
                    challengeButton.type = 'button';
                    challengeButton.classList.add('challenge-btn');
                    challengeButton.textContent = 'UNO?';
                    challengeButton.addEventListener('click', () => challengePlayer(gameId, player.playerId));
                    opponent.appendChild(challengeButton);
                }
                opponentsArea.appendChild(opponent);
            });

            ownHand.innerHTML = '';
            ownHandData.forEach(card => {
                ownHand.appendChild(renderCard(card, {
                    playable: true,
                    onClick: requestPlayCard,
                }));
            });
        };

        const playerResult = await getPlayersInGame(gameId);
        if (!playerResult.ok) {
            showPopup(playerResult.error?.message || 'Could not load the players');
            return;
        }
        players = playerResult.result.players;

        document.querySelector('#deck-btn').addEventListener('click', () => drawCard(gameId));
        sayUnoButton.addEventListener('click', () => sayUno(gameId));
        popupClose.addEventListener('click', closePopup);
        document.querySelector('#game-leave-btn').addEventListener('click', () => {
            stopListeners();
            leaveGame();
            navigate('/lobby');
        });
        document.querySelector('#results-leave-btn').addEventListener('click', () => navigate('/lobby'));

        const stopListeners = () => {
            stopCardPlayed();
            stopCardsDrawn();
            stopPlayerChallenged();
            stopError();
            stopPlayerLeft();
            stopDistributedCards();
            stopSaidUno();
            stopGameFinished();
        };
        const refreshAfterEvent = () => refreshGame();
        const stopCardPlayed = hearEvent('card-played', (result) => {
            refreshGame();
            if (result.action === 'Player won the game') {
                showResults(result.scores);
            }
        });
        const stopCardsDrawn = hearEvent('cards-drawn', refreshAfterEvent);
        const stopPlayerChallenged = hearEvent('player-challenged', refreshAfterEvent);
        const stopDistributedCards = hearEvent('distributed-cards', refreshAfterEvent);
        const stopSaidUno = hearEvent('said-uno', (response) => {
            playersWhoSaidUno.add(response.player.playerId);
            renderBoard();
        });
        const stopGameFinished = hearEvent('game-finished', showWinnerByDeparture);
        const stopError = hearEvent('error', (error) => showPopup(error.message));
        const stopPlayerLeft = hearEvent('player-left', (player) => {
            if (player.playerId === currentPlayerId) {
                navigate('/lobby');
                return;
            }
            playersWhoSaidUno.delete(player.playerId);
            if (player.gameFinished) {
                return;
            }
            refreshPlayers();
        });

        await refreshGame();

        // The owner starts the match with the standard UNO hand: seven cards.
        // This is only needed when the board is reached before the initial deal.
        if (gameStatus && !gameStatus.topCard && gameStatus.game.ownerId === currentPlayerId) {
            distributeCards(gameId, 7);
        }
    },
};
