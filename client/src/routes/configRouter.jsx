import Home from '../views/Home/Home.jsx'
import Login from '../views/Login/Login.jsx'
import NotFound from '../views/NotFound/NotFound.jsx'
import CustomerActions from '../components/CustomerActions/CustomerActions.jsx'
import DashBoardAdmins from '../views/Admin/DashBoardAdmin.jsx'

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
    path: '/customer-actions',
    element: <CustomerActions />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
	{
		path: '/login',
		element : <Login/>
	}
	
];

export default routerPathComponent;
