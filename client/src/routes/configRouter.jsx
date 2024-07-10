import Home from '../views/Home/Home.jsx';
import NotFound from '../views/NotFound/NotFound.jsx';
import DashBoardAdmins from '../views/Admin/DashBoardAdmin.jsx';

const routerPathComponent = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin/register',
    element: <DashBoardAdmins />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routerPathComponent;
