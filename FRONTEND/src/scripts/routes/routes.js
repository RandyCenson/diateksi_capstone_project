import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import AuthPage from '../pages/auth/auth-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/auth': new AuthPage(),
};

export default routes;
