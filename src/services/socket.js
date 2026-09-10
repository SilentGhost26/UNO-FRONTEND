import { io } from 'socket.io-client';
import { getToken } from '../utils/storage';
let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io(import.meta.env.VITE_API_SOCKET, {
            auth: {
                token: getToken(),
            },
            extraHeaders: {
                'ngrok-skip-browser-warning': 'true'
            },
            transports: ['websocket']
        });
    }
    return socket;
}