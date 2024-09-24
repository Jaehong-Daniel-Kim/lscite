import {createBrowserRouter, redirect} from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import {GetMe} from "./api";

const router = createBrowserRouter([{
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
        {
            index: true,
            loader: async () => {
                const user = await GetMe()
                if (!user) {
                    return redirect("/login");
                } else {
                    return redirect("/home");
                }
            }
        },
        {
            path: "home",
            element: <Home />,
            loader: async () => {
                const user = await GetMe()
                if (!user) {
                    return redirect("/login");
                } else {
                    return null;
                }
            }
        },
        {
            path: "login",
            element: <Login />,
            loader: async () => {
                const user = await GetMe()
                if (!user) {
                    return null;
                } else {
                    return redirect("/home");
                }
            }
        },
    ]
}])

export default router;
