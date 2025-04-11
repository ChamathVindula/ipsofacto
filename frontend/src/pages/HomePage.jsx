import PlayerCard from "../components/PlayerCard";
import GameOptions from "../components/GameOptions";

function HomePage() {
    // Temporary player ID generation
    localStorage.setItem("player_id", Math.floor(Math.random() * 1000000));
    
    return (
        <div className="flex flex-col justify-around items-center md:flex-row lg:flex-col">
            <PlayerCard playerDetails={ {} } />
            <GameOptions />
        </div>
    );
}

export default HomePage;