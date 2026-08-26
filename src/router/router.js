import { startController } from '../controllers/start.controller';
import { loginController } from '../controllers/login.controller';

const routes = {
    '/l': startController,
    '/': loginController,
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