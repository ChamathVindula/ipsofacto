import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import GameLobby from "../pages/GameLobby";
import RoundLobby from "../pages/RoundLobby";
import Game from "../pages/Game";
import Results from "../pages/Results";
import Login from "../pages/Login";
import Register from "../pages/Register";
import protect from "./protect";

const routes = [
    {
        path: "/", // Base path for the application
        Component: Layout,
        children: [
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                index: true,
                path: "home",
                Component: protect(HomePage),
            },
            {
                path: "game",
                Component: protect(GameLobby),
            },
            {
                path: "round",
                Component: protect(RoundLobby),
            },
            {
                path: "play",
                Component: protect(Game),
            },
            {
                path: "results",
                Component: protect(Results),
            },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
