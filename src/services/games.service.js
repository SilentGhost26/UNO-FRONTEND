import { fetchRequest } from './api';
import { ok, err } from '../utils/result';
import { getSocket } from './socket';

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

export const createGame = async (gameData, callback) => {
    const socket = getSocket();
    socket.emit('create-game', gameData);
    await socket.on('created-game', (response) => {
        if (response.error) {
            callback(err(response));
        } else {
            callback(ok(response));
        }
    });
}