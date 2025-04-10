import { createBrowserRouter } from 'react-router';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import GameLobby from '../pages/GameLobby';
import RoundLobby from '../pages/RoundLobby';
import Game from '../pages/Game';

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                path: "home",
                Component: HomePage
            },
            {
                path: "game",
                Component: GameLobby
            },
            {
                path: "round",
                Component: RoundLobby
            },
            {
                path: "play",
                Component: Game
            }
        ]
    }
]);

export default router;