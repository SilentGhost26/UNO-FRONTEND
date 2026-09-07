# UNO GAME - Frontend

This project is the frontend implementation of the UNO game capstone project. It consumes the REST API and Socket.IO events provided by the UNO backend.

## Technology stack

- JavaScript (Vanilla JS)
- HTML and CSS
- Vite
- Socket.IO Client

## Architecture

The application is organized by responsibility:

- `views`: HTML templates for each screen.
- `controllers`: UI behavior, events, and screen logic.
- `services`: REST and Socket.IO communication with the backend.
- `components`: reusable UI elements, such as cards and game rows.
- `router`: client-side navigation between views.
- `utils`: local session data and result helpers.

## Requirements before installation

1. Node.js 24 or higher.
2. The UNO backend running and accessible from the browser.

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure the `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_API_SOCKET=http://localhost:3000
```

3. Run the development server:

```bash
npm run dev
```

4. To generate a production build:

```bash
npm run build
```

## Application screens

- `/`: Start screen.
- `/login`: User login.
- `/register`: User registration.
- `/lobby`: List of available games.
- `/lobby/create`: Game creation form.
- `/waiting-room`: Waiting room before the game starts.
- `/game`: Game board, hand, deck, discard pile, UNO and challenge actions.
- `/profile`: Read-only and editable user profile.

## Game communication

The frontend uses REST requests to load data such as games, profiles, and game state. Real-time actions use Socket.IO, including creating or joining a game, starting it, playing and drawing cards, saying UNO, challenging players, leaving the game, and receiving the final result.

The player session stores the JWT token and player id in local storage. The active game id is intentionally kept in memory; reloading the page removes the player from the game through the socket disconnect flow.
