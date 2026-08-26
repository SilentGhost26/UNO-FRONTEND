import { renderRegister } from "../views/register.view";

export const registerController = {
    render: renderRegister,
    mount: () => {
        const error = document.querySelector('#error-text');
        const form = document.querySelector('#form-container');
        const passwordInp = document.querySelector('#password');
        const confirmInp = document.querySelector('#confirm-password');
        const submitBtn = document.querySelector('#submit-btn');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const data = {
                name: formData.get('name'),
                age: formData.get('age'),
                email: formData.get('email'),
                password: formData.get('password'),
            }

            
            error.textContent = data.name;
        });
        
        confirmInp.addEventListener('input', (e) => {
            if (passwordInp.value !== confirmInp.value) {
                error.textContent = 'Confirmation does not match';
                submitBtn.disabled = true;
            } else {
                error.textContent = '';
                submitBtn.disabled = false;
            }
        });
    }
}