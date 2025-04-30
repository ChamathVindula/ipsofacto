import PlayerCard from "../components/PlayerCard";
import GameOptions from "../components/GameOptions";
import { useAuth } from "../context/AuthProvider";

function HomePage() {    
    const { user } = useAuth();
    
    return (
        <div className="flex flex-col justify-around items-center md:flex-row lg:flex-col">
            <PlayerCard playerDetails={ user ?? { } } />
            <GameOptions />
        </div>
    );
}

export default HomePage;