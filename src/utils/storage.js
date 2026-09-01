let gameId;

export const saveToken = (token) => {
    localStorage.setItem('token',  token);
};

export const getToken = () => {
    return localStorage.getItem('token');
}

export const saveGameId = (id) => {
    gameId = id;
}

export const getGameId = () => {
    return gameId;
}

export const savePlayerId = (id) => {
    localStorage.setItem('playerId', id);
}

export const getPlayerId = () => {
    return localStorage.getItem('playerId');
}
