import AppRouter from "../../routes/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../state/store/slices/auth/actionsUser/fetchUser";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <>
            <AppRouter />
        </>
    );
}

export default App;
