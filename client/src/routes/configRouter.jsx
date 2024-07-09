import Register from '../views/Admin/Register/Register.jsx';
import Home from '../views/Home/Home.jsx';
import NotFound from '../views/NotFound/NotFound.jsx';

const routerPathComponent = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routerPathComponent;
