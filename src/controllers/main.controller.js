import { renderMain } from "../views/main.view";
import { renderGameRow } from "../components/game-row.component";
import { getGamesByPagination, joinGame, getGame } from "../services/games.service";
import navigate from "../router/router";
import { getToken } from "../utils/storage";
import { logoutPlayer } from "../services/auth.service";

export const mainController = {
    render: renderMain,
    mount: async () => {
        if (!getToken()) {
            navigate('/login');
            return;
        }
        const profileBtn = document.querySelector('#profile-btn');
        const gameList = document.querySelector('#game-list');
        const logoutBtn = document.querySelector('#logout-btn');
        const createGameBtn = document.querySelector('#create-game-btn');
        const prevBtn = document.querySelector('#prev-btn');
        const nextBtn = document.querySelector('#next-btn');
        const messageTxt = document.querySelector('#message-text');
        prevBtn.disabled = true;
        let currentPage = 1;
        const limit = 10;

        const games = await getGamesByPagination(currentPage, limit);
        if (!games.ok) {
            messageTxt.textContent = 'Error: server not available';
            messageTxt.classList.remove('hidden');
            gameList.innerHTML = '';
            nextBtn.disabled = true;
            prevBtn.disabled = true;
            return;
        }

        const loadGames = (games) => {
            gameList.innerHTML = '';
            if (games.length === 0) {
                messageTxt.textContent = 'There are not games';
                messageTxt.classList.remove('hidden');
                gameList.innerHTML = '';
                nextBtn.disabled = true;
                return;
            } else if (currentPage === 1) {
                prevBtn.disabled = true;
            }
            messageTxt.classList.add('hidden');
            games.forEach(g => {
                const row = renderGameRow(g, (gameId) => {
                    joinGame(gameId, async (result) => {
                        if (!result.ok) {
                            messageTxt.textContent = 'Was not possible join to game';
                            messageTxt.classList.remove('hidden');
                        } else {
                            const game = await getGame(gameId);
                            navigate('/waiting-room', game.result);
                        }
                    });
                });
                gameList.appendChild(row);
            });
        }
        loadGames(games.result.games);

        nextBtn.addEventListener('click', async () => {
            currentPage += 1;
            const newGames = await getGamesByPagination(currentPage, limit);
            if (!games.ok) {
                messageTxt.textContent = 'There are not games';
                messageTxt.classList.remove('hidden');
                gameList.innerHTML = '';
                nextBtn.disabled = true;
            }
            prevBtn.disabled = false;
            loadGames(newGames.result.games);
        });

        prevBtn.addEventListener('click', async () => {
            currentPage -= 1;
            const newGames = await getGamesByPagination(currentPage, limit);
            if (!games.ok) {
                messageTxt.textContent = 'There are not games';
                messageTxt.classList.remove('hidden');
                gameList.innerHTML = '';
                prevBtn.disabled = true;
            }
            nextBtn.disabled = false;
            loadGames(newGames.result.games);
        });

        createGameBtn.addEventListener('click', () => {
            navigate('/lobby/create')
        });

        logoutBtn.addEventListener('click', async (e) => {
            const response = await logoutPlayer();
            if (!response.ok) {
                messageTxt.textContent = response.error.message;
            } else {
                gameList.innerHTML = '';
                messageTxt.textContent = 'Logout succesfully';
                messageTxt.classList.remove('hidden');
               setTimeout(() => {
                    navigate('/');
                }, 500);
            }
        });
    }
};
