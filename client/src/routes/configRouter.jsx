import CustomerActions from '../components/CustomerActions/CustomerActions.jsx'
import Home from '../views/Home/Home.jsx'
import NotFound from '../views/NotFound/NotFound.jsx'

const routerPathComponent = [
	{
		path: '/home',
		element: <Home />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
	{
		path: '/customer-actions',
		element: <CustomerActions />,
	}
	
]

export default routerPathComponent
