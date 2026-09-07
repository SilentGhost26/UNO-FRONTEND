import '../css/game.view.css';

export const renderGame = () => {
    return `
        <section id="game-screen">
            <header id="game-header">
                <span id="game-title"></span>
                <span id="turn-label">Loading game...</span>
                <button type="button" id="game-leave-btn">Leave game</button>
            </header>

            <div id="game-board" class="players-2">
                <div id="opponents-area"></div>

                <div id="game-center">
                    <div class="game-pile">
                        <span class="pile-label">DECK</span>
                        <button type="button" id="deck-btn" class="card-back" aria-label="Draw a card">UNO</button>
                    </div>
                    <div id="current-color" aria-label="Current color"></div>
                    <div class="game-pile">
                        <span class="pile-label">DISCARD</span>
                        <div id="discard-pile" class="discard-pile"></div>
                    </div>
                </div>

                <div id="own-player-area">
                    <div id="own-player-info">
                        <span id="own-player-name" class="player-name"></span>
                        <button type="button" id="say-uno-btn" class="hidden">UNO!</button>
                    </div>
                    <div id="own-hand"></div>
                </div>
            </div>

            <div id="game-popup" class="hidden" role="alertdialog" aria-live="assertive">
                <div id="game-popup-content">
                    <p id="game-popup-message"></p>
                    <div id="color-picker" class="hidden">
                        <p>Choose a color</p>
                        <div id="color-options">
                            <button type="button" data-color="RED" class="color-option red">RED</button>
                            <button type="button" data-color="GREEN" class="color-option green">GREEN</button>
                            <button type="button" data-color="BLUE" class="color-option blue">BLUE</button>
                            <button type="button" data-color="YELLOW" class="color-option yellow">YELLOW</button>
                        </div>
                    </div>
                    <button type="button" id="game-popup-close">OK</button>
                </div>
            </div>

            <div id="game-results-popup" class="hidden" role="dialog" aria-modal="true">
                <div id="game-results-content">
                    <h2>GAME OVER</h2>
                    <div id="game-ranking"></div>
                    <button type="button" id="results-leave-btn">Back to lobby</button>
                </div>
            </div>
        </section>
    `;
};
