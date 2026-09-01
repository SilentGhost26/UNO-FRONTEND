import navigate from "../router/router";
import { renderLogin } from "../views/login.view";
import { loginPlayer } from "../services/auth.service";
import { getToken } from "../utils/storage";

export const loginController = {
    render: renderLogin,
    mount: () => {
        const form = document.querySelector('#form-container');
        const registerBtn = document.querySelector('#register-log-btn');
        const messageText = document.querySelector('#message-text');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const data = {
                email: formData.get('email'),
                password: formData.get('password'),
            }

           const result = await loginPlayer(data.email, data.password);
            if (!result.ok) {
                messageText.textContent = result.error.message;
            } else {
                messageText.textContent = 'Login succesfully'
                setTimeout(() => { 
                    navigate('/lobby');
                }, 500);
               
            }
        });

        registerBtn.addEventListener('click', (e) => {
            navigate('/register');
        });
    }
}
