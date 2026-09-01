import { renderCreateGame } from "../views/create-game.view";
import { createGame } from "../services/games.service";
import { saveGameId } from "../utils/storage";
import navigate from "../router/router";

export const gameController = {
    render: renderCreateGame,
    mount: async () => {
        const createGameForm = document.querySelector('#create-game-form');
        const messageText = document.querySelector('#message-text');
        const cancelBtn = document.querySelector('#cancel-btn');
        createGameForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(createGameForm);

            const data = {
                title: formData.get('title'),
                maxPlayers: Number(formData.get('max-players')),
                rules: {
                    allowDrawFour: formData.get('allow-draw-four') === 'on',
                    allowAccumulateDraw: formData.get('allow-accumulate-draw') === 'on',
                    allowReverse: formData.get('allow-reverse') === 'on',
                }
            }

            try {
                createGame(data, async (result) => {
                    if (!result.ok) {
                        messageText.textContent = result.error.message;
                    } else {
                        messageText.textContent = 'game created succesfully';
                        setTimeout(() => { 
                            navigate('/waiting-room', result.result);
                        }, 500);
                    }
                });
            } catch (error) {
                messageText.textContent = error.message;
            }
        });

        cancelBtn.addEventListener('click', (e) => {
            navigate('/lobby');
        });
    }  
};
