import '../css/waiting-room.view.css';

export const renderWaitingRoom = () => {
    return `
        <section id="waiting-room-screen">
            <div id="waiting-room-card">
                <div id="waiting-room-content">
                    <div id="game-info">
                        <p><span class="info-label">title:</span> <span id="info-title"></span></p>
                        <p><span class="info-label">max Players:</span> <span id="info-max-players"></span></p>
                        <p><span class="info-label">allow Draw Four:</span> <span id="info-draw-four"></span></p>
                        <p><span class="info-label">allow Reverse:</span> <span id="info-reverse"></span></p>
                        <p><span class="info-label">allow Accumulate:</span> <span id="info-accumulate"></span></p>
                    </div>

                    <div id="players-section">
                        <h3>players</h3>
                        <div id="players-list">
                        </div>
                    </div>
                </div>
                <span id="wait-message-text" class="hidden"></span>
                <div id="waiting-room-actions">
                    <button id="leave-btn">leave</button>
                    <button id="edit-btn" class="hidden">edit</button>
                    <button id="start-btn" class="hidden">start</button>
                </div>
            </div>
            <div id="edit-overlay" class="hidden">
                <div id="edit-popup">
                    <h2>EDIT GAME</h2>
                    <form id="edit-form">
                        <input type="text" name="title" id="edit-title" placeholder="Title" minlength="3" maxlength="30" required />
                        <input type="number" name="max-players" id="edit-max-players" placeholder="Max players" min="2" max="4" required />
                        <div class="checkbox-row">
                            <label>Allow Draw Four</label>
                            <input type="checkbox" id="edit-draw-four" name="allow-draw-four" />
                        </div>
                        <div class="checkbox-row">
                            <label>Allow Accumulate Draw</label>
                            <input type="checkbox" id="edit-accumulate" name="allow-accumulate-draw" />
                        </div>
                        <div class="checkbox-row">
                            <label>Allow Reverse</label>
                            <input type="checkbox" id="edit-reverse" name="allow-reverse" />
                        </div>
                        <p id="edit-message-text"></p>
                        <div id="edit-button-row">
                            <button type="button" id="edit-cancel-btn">Cancel</button>
                            <button type="submit" id="edit-save-btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `;
}
