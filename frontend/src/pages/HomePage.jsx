import PlayerCard from "../components/PlayerCard";
import GameOptions from "../components/GameOptions";

function HomePage() {
    return (
        <div className="flex flex-col justify-around items-center md:flex-row lg:flex-col">
            <PlayerCard playerDetails={ {} } />
            <GameOptions />
        </div>
    );
}

export default HomePage;