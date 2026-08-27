import { ok, err } from '../utils/result';

export const fetchRequest = async (method, url, data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        return err(response)
    }

    return ok(response);
}