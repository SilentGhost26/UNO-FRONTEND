import { ok, err } from '../utils/result';
import { saveToken, savePlayerId } from '../utils/storage';

import { fetchRequest } from "./api"

export const registerPlayer = async (registerData) => {
    const response = await fetchRequest('POST', '/auth/register', registerData);
    
    if (!response.ok) {
        return err(await response.error.json());
    }

    if (response.result.status !== 201) {
        return err(await response.result.json());
    }
    return ok();
}

export const loginPlayer = async (email, password) => {
    const response = await fetchRequest('POST', '/auth/login', { email, password });
    if (!response.ok) {
        return err(await response.error.json());
    }

    if (response.result.status !== 200) {
        return err(await response.result.json());
    }
    const result = await response.result.json();
    saveToken(result.access_token);
    savePlayerId(result.playerId);

    return ok();
}

export const logoutPlayer = async () => {
    const response = await fetchRequest('POST', '/auth/logout');

    if (!response.ok) {
        return err(await response.error.json());
    }

    if (response.result.status === 200) {
        saveToken(null);
        return ok();
    }
    return err(await response.error.json());
}