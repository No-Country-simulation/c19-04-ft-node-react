import InvalidPasswordMessage from '../components/InvalidPasswordMessage/InvalidPasswordMessage.jsx'
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
		path: '/invalid-password',
		element: <InvalidPasswordMessage  />,
	}


]

export default routerPathComponent
