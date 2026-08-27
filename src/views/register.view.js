import '../css/register.view.css'

export const renderRegister = () => {
    return `
    <section id="register-screen">
        <h1 id ="title">REGISTER</h1>
        <form id="form-container">
            <input class="register-inp" name="name" placeholder="Name" minlength="3" required />
            <input class="register-inp" type="number" name="age" min="5" max="100" placeholder="Age" required />
            <input class="register-inp" type="email" name="email" placeholder="Email" required />
            <input class="register-inp" id="password" type="password" name="password" placeholder="Password" minlength="8" required />
            <input class="register-inp" id="confirm-password" type="password" name="confirm-password" placeholder="Confirm password" required />
            <button id="submit-btn" type="submit">Register</button>
            <button id="login-reg-btn" type="button">go to login</button>
            <p id="message-text"></p>
        </form>
    </section>
    `;
}