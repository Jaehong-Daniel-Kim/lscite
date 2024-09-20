import {createBrowserRouter} from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";

const router = createBrowserRouter([{
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
        {
            path: "home",
            element: <Home />
        },
        {
            path: "login",
            element: <Login />
        },
    ]
}])

export default router;
