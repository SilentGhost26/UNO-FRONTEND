import { renderWaitingRoom } from '../views/waiting-room.view';
import { getPlayersInGame, updateGame, hearEvent, leaveGame, startGame } from '../services/games.service';
import { renderPlayerRow } from '../components/player-row.component';
import { getPlayerId } from '../utils/storage';
import { getGameId } from '../utils/storage';
import navigate from '../router/router';

export const waitingRoomController = {
    render: renderWaitingRoom,
    mount: (gameData) => {
        const waitingRoomCard = document.querySelector('#waiting-room-card');
        const leaveBtn = document.querySelector('#leave-btn');
        const editBtn = document.querySelector('#edit-btn');
        const startBtn = document.querySelector('#start-btn');
        const infoTitle = document.querySelector('#info-title');
        const infoMax = document.querySelector('#info-max-players');
        const infoDrawFour = document.querySelector('#info-draw-four');
        const infoReverse = document.querySelector('#info-reverse');
        const infoAccumulate = document.querySelector('#info-accumulate');
        const playerList = document.querySelector('#players-list');
        const messageText = document.querySelector('#wait-message-text');

        const editOverlay = document.querySelector('#edit-overlay');
        const editForm = document.querySelector('#edit-form');
        const editCancelBtn = document.querySelector('#edit-cancel-btn');
        const editMsg = document.querySelector('#edit-message-text');

        async function initData() {
            infoTitle.textContent = gameData.title;
            infoMax.textContent = gameData.maxPlayers;
            infoDrawFour.textContent = gameData.rules.allowDrawFour? '✅' : '❌';
            infoReverse.textContent = gameData.rules.allowReverse? '✅' : '❌';
            infoAccumulate.textContent = gameData.rules.allowAccumulateDraw? '✅' : '❌';

            const players = await getPlayersInGame(gameData.id);

            if (!players.ok) {
                messageText.textContent = players.error.message;
                messageText.classList.remove('hidden');
            } else {
                players.result.players.forEach(p => {
                    const row = renderPlayerRow(p);
                    playerList.appendChild(row);
                });
            }
           
            if (getPlayerId() === gameData.ownerId) {
                editBtn.classList.remove('hidden');
                startBtn.classList.remove('hidden');
            }
        }

        initData();

        editBtn.addEventListener('click', (e) => {
            document.querySelector('#edit-title').value = infoTitle.textContent;
            document.querySelector('#edit-max-players').value = infoMax.textContent;
            document.querySelector('#edit-draw-four').checked = infoDrawFour.textContent === '✅';
            document.querySelector('#edit-accumulate').checked = infoAccumulate.textContent === '✅';
            document.querySelector('#edit-reverse').checked = infoReverse.textContent === '✅';
            editMsg.textContent = '';
            editOverlay.classList.remove('hidden');
            waitingRoomCard.classList.add('hidden');
        });

        editCancelBtn.addEventListener('click', (e) => {
            editOverlay.classList.add('hidden');
            waitingRoomCard.classList.remove('hidden');
        });

        editForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(editForm);
            const data = {
                title: formData.get('title'),
                maxPlayers: Number(formData.get('max-players')),
                rules: {
                    allowDrawFour: formData.get('allow-draw-four') === 'on',
                    allowAccumulateDraw: formData.get('allow-accumulate-draw') === 'on',
                    allowReverse: formData.get('allow-reverse') === 'on',
                }
            }   

            updateGame(getGameId(), data, (result) => {
                if (!result.ok) {
                    editMsg.textContent = result.error?.message ?? 'Update failed';
                    return;
                }
                editOverlay.classList.add('hidden');
                waitingRoomCard.classList.remove('hidden');
            });
        });

        leaveBtn.addEventListener('click', (e) => {
            stopListeningGameUpdated();
            stopListeningPlayerJoined();
            stopListeningPlayerLeft();
            leaveGame();
            setTimeout(() => {
                navigate('/lobby');
            }, 500);
        });

        startBtn.addEventListener('click', () => {
            startGame(getGameId(), (result) => {
                if (!result.ok) {
                    messageText.textContent = result.error?.message || 'Could not start the game';
                    messageText.classList.remove('hidden');
                }
            });
        });

        const stopListeningGameUpdated = hearEvent('game-updated', (result) => {
            infoTitle.textContent = result.title;
            infoMax.textContent = result.maxPlayers;
            infoDrawFour.textContent = result.rules.allowDrawFour ? '✅' : '❌';
            infoReverse.textContent = result.rules.allowReverse ? '✅' : '❌';
            infoAccumulate.textContent = result.rules.allowAccumulateDraw ? '✅' : '❌';
        });

        const stopListeningPlayerJoined = hearEvent('player-joined', async (response) => {
            const players = await getPlayersInGame(gameData.id);

            if (!players.ok) {
                messageText.textContent = players.error.message;
                messageText.classList.remove('hidden');
            } else {
                playerList.innerHTML = '';
                players.result.players.forEach(p => {
                    const row = renderPlayerRow(p);
                    playerList.appendChild(row);
                });
            }
        });
        const stopListeningPlayerLeft = hearEvent('player-left', async (response) => {
            if (response.playerId === gameData.ownerId) {
                messageText.textContent = 'owner left the game';
                setTimeout(() => {
                    navigate('/lobby');
                }, 500);
            } else {
                const players = await getPlayersInGame(gameData.id);

                if (!players.ok) {
                    messageText.textContent = players.error.message;
                    messageText.classList.remove('hidden');
                } else {
                    playerList.innerHTML = '';
                    players.result.players.forEach(p => {
                    const row = renderPlayerRow(p);
                    playerList.appendChild(row);
                });
            }
            }
        });
        const stopListeningGameStarted = hearEvent('game-started', () => {
            stopListeningGameUpdated();
            stopListeningPlayerJoined();
            stopListeningPlayerLeft();
            stopListeningGameStarted();
            navigate('/game');
        });
    }
}
