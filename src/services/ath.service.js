import { ok, err } from '../utils/result';

import { fetchRequest } from "./api"

export const registerPlayer = async (registerData) => {
    const response = await fetchRequest('POST', '/auth/register', registerData);
    
    if (!response.ok) {
        return err(await response.error.json());
    }
    console.log(response)
    if (response.result.status !== 201) {
        return err(await response.result.json());
    }
    return ok();
}