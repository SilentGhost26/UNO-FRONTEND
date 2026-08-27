import '../css/game-row.component.css';

export const renderGameRow = (game, onJoin) => {
    const row = document.createElement('div');
    row.classList.add('game-row');
    row.dataset.gameId = game.id;

    row.innerHTML = `
        <span class="game-title">${game.title}</span>
        <span class="game-max-players">${game.maxPlayers}</span>
        <span class="game-draw-four">${game.rules.allowDrawFour ? '✅' : '❌'}</span>
        <span class="game-accumulate">${game.rules.allowAccumulateDraw ? '✅' : '❌'}</span>
        <span class="game-reverse">${game.rules.allowReverse ? '✅' : '❌'}</span>
        <button class="join-btn">join</button>
    `;
    
    const joinBtn = row.querySelector('.join-btn');
    joinBtn.addEventListener('click', () => onJoin(game.id));
    return row;
}