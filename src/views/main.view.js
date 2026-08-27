import '../css/main.view.css';
export const renderMain = () => {
    return `
        <section id="main-screen">
            <button id="profile-btn">Profile</button>
            <div id="games-container">
                <div id="games-header">
                    <span>Name</span>
                    <span>max Players</span>
                    <span>Draw Four</span>
                    <span>Accumulate Draw</span>
                    <span>reverse</span>
                    <span></span> 
                </div>
                <span id="message-text" class="hidden"></span>
                <div id="game-list">
                </div>
                <div id="button-list-container">
                    <button id="prev-btn">prev</button>
                    <button id="next-btn">next</button>
                </div>
            </div>
            <button id="logout-btn">Logout</button>
            <button id="create-game-btn">Create game</button>
        </section>
    `;
}