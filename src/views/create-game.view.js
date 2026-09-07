import '../css/create-game.view.css';

export const renderCreateGame = () => {
    return `
        <section id="create-game-screen">
            <h1 class="title">CREATE GAME</h1>
            <div id="create-game-card">
                <form id="create-game-form">
                    <input class="create-inp" type="text" name="title" placeholder="Title" minlength="3" maxlength="30" required />
                    <input class="create-inp" type="number" name="max-players" placeholder="Max players" min="2" max="4" required />

                    <div class="checkbox-row">
                        <label for="draw-four">Allow Draw Four</label>
                        <input type="checkbox" id="draw-four" name="allow-draw-four" />
                    </div>
                    <div class="checkbox-row">
                        <label for="accumulate-draw">Allow Accumulate Draw</label>
                        <input type="checkbox" id="accumulate-draw" name="allow-accumulate-draw" />
                    </div>
                    <div class="checkbox-row">
                        <label for="reverse">Allow Reverse</label>
                        <input type="checkbox" id="reverse" name="allow-reverse" />
                    </div>

                    <p id="message-text"></p>

                    <div id="button-row">
                        <button type="button" id="cancel-btn">Cancel</button>
                        <button type="submit" id="create-btn">Create</button>
                    </div>
                </form>
            </div>
        </section>
    `;
}