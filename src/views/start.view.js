import '../css/start.view.css';
import logoUrl from '../assets/logo.png';

export const renderStart = () => {
    return `
    <section id="start-screen">
        <div id="logo-container">
            <img src="${logoUrl}" alt="UNO Logo" id="logo-img"/>
        </div>
        <div id="start-container">
            <h1 class="title">UNO GAME</h1>
            <div>
                <button id="login-btn">login</button>
            </div>
            <div>
                <button id="register-btn">register</button>
            </div>
        </div>
    </section>
    `;
}
