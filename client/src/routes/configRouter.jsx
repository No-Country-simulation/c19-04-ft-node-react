import Home from '../views/Home/Home.jsx'
import Login from '../views/Login/Login.jsx'
import NotFound from '../views/NotFound/NotFound.jsx'

const routerPathComponent = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login', 
		element: <Login />
	}
	,{
		path: '*',
		element: <NotFound />,
	},
]

export default routerPathComponent
