import PlayerLineup from "../components/PlayerLineup";
import Banner from "../components/Banner";
import GameSetup from "../components/GameSetup";

function GameLobby() {
    // Temporary data for testing
    let players = [
        { id: 1, name: "James May", avatar: "/public/user.png" },
        { id: 2, name: "Richard Hammond", avatar: "/public/user.png" },
        { id: 3, name: "Jeremy Clarkson", avatar: "/public/user.png" },
        { id: 4, name: "Chris Harris", avatar: "/public/user.png" },
        { id: 5, name: "Sabine Schmitz", avatar: "/public/user.png" },
        { id: 6, name: "Edd China", avatar: "/public/user.png" },
        { id: 7, name: "Tiff Needell", avatar: "/public/user.png" },
        { id: 8, name: "Jodie Kidd", avatar: "/public/user.png" }
    ];


    return (
        <div className="flex flex-col justify-center items-center">
            <PlayerLineup players={players} />
            <Banner message="Waiting for the game to begin..." />
            <GameSetup />
        </div>
    );
}

export default GameLobby;