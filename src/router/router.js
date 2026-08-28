import { startController } from '../controllers/start.controller';
import { loginController } from '../controllers/login.controller';
import { registerController } from '../controllers/register.controller';
import { mainController } from '../controllers/main.controller';
import { gameController } from '../controllers/create-game.controller';

const routes = {
    '/': startController,
    '/login': loginController,
    '/register': registerController,
    '/lobby': mainController,
    '/lobby/create': gameController,
}

function router() {
  const path = window.location.pathname;
  const view = routes[path] || routes['/'];
  document.getElementById('main').innerHTML = view.render();
  view.mount?.();
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);

function navigate(path) {
  window.history.pushState({}, '', path);
  router();
}

export default navigate;