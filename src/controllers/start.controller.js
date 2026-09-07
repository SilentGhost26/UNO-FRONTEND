import { renderStart } from "../views/start.view";
import navigate from '../router/router';

export const startController = {
    render: renderStart,
    mount: () => {
        document.querySelector('#login-btn')
            .addEventListener('click', () => {
                navigate('/login');
            });

        document.querySelector('#register-btn')
            .addEventListener('click', () => {
                navigate('/register');
            });
    }
}