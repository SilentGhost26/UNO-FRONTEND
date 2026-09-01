export const renderPlayerRow = (player) => {
    console.log(player)
    const row = document.createElement('div');
    row.classList.add('player-row');
    row.dataset.playerId = player.playerId;
    row.textContent = player.name;  
    return row;
}