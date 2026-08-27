import { renderRegister } from "../views/register.view";
import { registerPlayer } from "../services/auth.service";
import navigate from '../router/router';

export const registerController = {
    render: renderRegister,
    mount: () => {
        const messageText = document.querySelector('#message-text');
        const form = document.querySelector('#form-container');
        const passwordInp = document.querySelector('#password');
        const confirmInp = document.querySelector('#confirm-password');
        const submitBtn = document.querySelector('#submit-btn');
        const loginBtn = document.querySelector('#login-reg-btn');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const data = {
                name: formData.get('name'),
                age: formData.get('age'),
                email: formData.get('email'),
                password: formData.get('password'),
            }
            
            const result = await registerPlayer(data);
            if (!result.ok) {
                messageText.textContent = result.error.message;
            } else {
                messageText.textContent = 'Registered. Go to login'
            }
        });
        
        confirmInp.addEventListener('input', (e) => {
            if (passwordInp.value !== confirmInp.value) {
                messageText.textContent = 'Confirmation does not match';
                submitBtn.disabled = true;
            } else {
                messageText.textContent = '';
                submitBtn.disabled = false;
            }
        });

        loginBtn.addEventListener('click', (e) => {
            navigate('/login');
        });
    }
}