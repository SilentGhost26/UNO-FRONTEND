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
    socket.on('player-left', (response) => {
        if (response.error) {
            callback(err(response));
        } else {
            callback(ok(response));
        }
    });
}

export const hearEvent = (event, callback) => {
    const socket = getSocket();
    socket.on(event, (response) => {
        callback(response);
    });
    return () => socket.off(event, callback);
}