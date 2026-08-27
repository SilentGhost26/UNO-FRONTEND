import navigate from "../router/router";
import { renderLogin } from "../views/login.view";

export const loginController = {
    render: renderLogin,
    mount: () => {
        const form = document.querySelector('#form-container');
        const registerBtn = document.querySelector('#register-log-btn');
        const messageText = document.querySelector('#message-text');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const data = {
                email: formData.get('email'),
                password: formData.get('password'),
            }
        });

        registerBtn.addEventListener('click', (e) => {
            navigate('/register');
        });
    }
}