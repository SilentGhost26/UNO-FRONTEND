import { fetchRequest } from './api';
import { ok, err } from '../utils/result';
import { getSocket } from './socket';
import { getGameId, saveGameId } from '../utils/storage';

export const getGamesByPagination = async (page, limit) => {
    const params = new URLSearchParams({ page, limit });
    const response = await fetchRequest('GET', `/games?${params}`);
    if (!response.ok) {
        if (response.error instanceof TypeError) {
            return err(response.error);
        }
        return err(await response.error.json());
    }

    const result = await response.result.json();
    if (response.result.status !== 200) {
        return err(result);
    }

    return ok(result);
}

export const createGame = (gameData, callback) => {
    const socket = getSocket();
    socket.emit('create-game', gameData);
    socket.once('created-game', (response) => {
        if (response.error) {
            callback(err(response));
        } else {
            saveGameId(response.id);
            callback(ok(response));
        }
    });
}

export const getGameStatus = async (gameId) => {
    const response = await fetchRequest('GET', `/games/${gameId}/status`);
    if (!response.ok) {
        if (response.error instanceof TypeError) {
            return err(response.error);
        }
        return err(await response.error.json());
    }

    const result = await response.result.json();
    if (response.result.status !== 200) {
        return err(result);
    }
    return ok(result);
}

export const getGame = async (gameId) => {
    const response = await fetchRequest('GET', `/games/${gameId}`);
    if (!response.ok) {
        if (response.error instanceof TypeError) {
            return err(response.error);
        }
        return err(await response.error.json());
    }

    const result = await response.result.json();
    if (response.result.status !== 200) {
        return err(result);
    }

    return ok(result);
}

export const getPlayersInGame = async (gameId) => {
    const response = await fetchRequest('GET', `/games/${gameId}/players`);
    if (!response.ok) {
        if (response.error instanceof TypeError) {
            return err(response.error);
        }
        return err(await response.error.json());
    }

    const result = await response.result.json();
    if (response.result.status !== 200) {
        return err(result);
    }

    return ok(result);
} 

export const updateGame = async (gameId, gameData, callback) => {
    const socket = getSocket();
    socket.emit('update-game', { gameId, gameData });
    socket.once('game-updated', (response) => {
        if (response.error) {
            callback(err(response));
        } else {
            callback(ok(response));
        }
    });
}

export const joinGame = async (gameId, callback) => {
    const socket = getSocket();
    socket.emit('enter-game', { gameId });
    socket.once('player-joined', (response) => {
        if (response.error) {
            callback(err(response));
        } else {
            saveGameId(gameId);
            callback(ok(response));
        }
    });
}

export const leaveGame = async (callback) => {
    const socket = getSocket();
    socket.emit('leave-game', ({ gameId: getGameId() }));
    socket.once('player-left', (response) => {
        if (response.error) {
            callback?.(err(response));
        } else {
            callback?.(ok(response));
        }
    });
}

export const hearEvent = (event, callback) => {
    const socket = getSocket();
    const handler = (response) => {
        callback(response);
    };
    socket.on(event, handler);
    return () => socket.off(event, handler);
}

export const startGame = (gameId, callback) => {
    const socket = getSocket();
    socket.emit('start-game', { gameId });
    socket.once('game-started', () => callback?.(ok()));
}

export const distributeCards = (gameId, cardsPerPlayer) => {
    getSocket().emit('distribute-cards', { gameId, cardsPerPlayer });
}

export const playCard = (gameId, cardId, newColor) => {
    console.log(cardId)
    getSocket().emit('play-card', { gameId, cardId, newColor });
}

export const drawCard = (gameId) => {
    getSocket().emit('draw', { gameId });
}

export const challengePlayer = (gameId, challengedPlayerId) => {
    getSocket().emit('challenge', { gameId, challengedPlayerId });
}

export const sayUno = (gameId) => {
    getSocket().emit('say-uno', { gameId });
}
