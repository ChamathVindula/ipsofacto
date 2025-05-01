import PlayerAvatar from "./PlayerAvatar";
import { useRoom } from "../context/RoomProvider";

function PlayerLineup() {
    let room = useRoom();

    return (
        <div className="flex flex-col justify-center w-1/2 min-w-[300px] max-w-[800px] mx-auto my-8 rounded-lg shadow-lg bg-white">
            <p className="sour-gummy-medium text-4xl text-center py-2">Lobby</p>
            <div className="w-full flex flex-row flex-wrap justify-center">
                {room.data.players.map((player) => (
                    <PlayerAvatar key={player.id} player={player} />
                ))}
            </div>
        </div>
    );
}

export default PlayerLineup;
