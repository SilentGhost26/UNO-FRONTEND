import '../css/login.view.css';

export const renderLogin = () => {
    return `
        <section id="login-screen">
            <h1 id="title">UNO</h1>
            <form id="form-container">
                <input class="login-inp" id="email-inp" type="email" name="email" placeholder="Email" required />
                <input class="login-inp" id="password-inp" type="password" name="password" placeholder="Password" required minlength="8" />
                <button type="submit">Login</button>
                <button type="button" id="register-log-btn">Go to register</button>
                <p id="message-text"></p>
            </form>
        </section>
    `;
}