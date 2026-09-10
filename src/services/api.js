import { ok, err } from '../utils/result';
import { getToken } from '../utils/storage';

export const fetchRequest = async (method, url, data) => {
    try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                 'ngrok-skip-browser-warning': 'true',
                'authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            return err(response)
        }
        
        return ok(response);
    } catch (error) {
        return err(error);
    }
}