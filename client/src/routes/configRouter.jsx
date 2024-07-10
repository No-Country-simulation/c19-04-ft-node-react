import Home from '../views/Home/Home.jsx'
import Login from '../views/Login/Login.jsx'
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
		path: '/login',
		element : <Login/>
	}
	
]

export default routerPathComponent
