import { useEffect } from "react";
import PlayerLineup from "../components/PlayerLineup";
import Banner from "../components/Banner";
import GameSetup from "../components/GameSetup";
import { useRoom } from "../context/RoomProvider";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router";

function GameLobby() {
    let room = useRoom();
    let socket = useSocket();
    let navigate = useNavigate();

    useEffect(() => {
        if(!socket) return;

        socket.on('game_starting', (room) => {
            console.log("Game starting, redirecting to the round lobby...");
            navigate("/round");
        });

        socket.on('player_joined', (player) => {
            room.dispatch({ type: 'ADD_PLAYER', payload: player });
        });

        return () => {
            socket.off('game_starting');
            socket.off('player_joined');
        }
    }, []);

    let component = room.data.isHost ? <GameSetup /> : <Banner message="Waiting for the game to begin..." />;

    return (
        <div className="flex flex-col justify-center items-center">
            <PlayerLineup />
            {component}
        </div>
    );
}

export default GameLobby;