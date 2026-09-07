import { fetchRequest } from './api';
import { ok, err } from '../utils/result';

const getResponseResult = async (response) => {
    if (!response.ok) {
        if (response.error instanceof TypeError) {
            return err(response.error);
        }
        return err(await response.error.json());
    }

    return ok(await response.result.json());
};

export const getProfile = async () => {
    const response = await fetchRequest('GET', '/players/me');
    return getResponseResult(response);
};

export const updateProfile = async (profileData) => {
    const response = await fetchRequest('PUT', '/players', profileData);
    return getResponseResult(response);
};
