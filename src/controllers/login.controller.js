import { renderLogin } from "../views/login.view";

export const loginController = {
    render: renderLogin,
    mount: () => {
        const form = document.querySelector('#form-container');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const data = {
                email: formData.get('email'),
                password: formData.get('password'),
            }
        });
    }
}