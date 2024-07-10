import Home from '../views/Home/Home.jsx'
import NotFound from '../views/NotFound/NotFound.jsx'

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
	{
		path: '/customer-actions',
		element: <CustomerActions />,
	}
	
];

export default routerPathComponent;
