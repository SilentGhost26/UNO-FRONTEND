import { renderMain } from "../views/main.view";
import { renderGameRow } from "../components/game-row.component";
import { getGamesByPagination } from "../services/games.service";

export const mainController = {
    render: renderMain,
    mount: async () => {
        const profileBtn = document.querySelector('#profile-btn');
        const gameList = document.querySelector('#game-list');
        const logoutBtn = document.querySelector('#logout-btn');
        const createGameBtn = document.querySelector('#create-game-btn');
        const prevBtn = document.querySelector('#prev-btn');
        const nextBtn = document.querySelector('#next-btn');
        const messageTxt = document.querySelector('#message-text');

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
                prev.disabled = true;
            }
            nextBtn.disabled = false;
            loadGames(newGames.result.games);
        });
    }

};