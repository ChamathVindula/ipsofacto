import Stat from "./Stat";

function Stats({ game_history }) {
    return (
        <div className="w-full flex flex-col items-center justify-center border-2 border-mossgreen-light rounded-sm bg-white p-3">
            <span className="inline-block mx-auto text lexend-medium text-2xl">
                Stats
            </span>
            <div className="w-full flex flex-col items-center justify-center">
                {game_history.map((game) => {
                    return <Stat key={game.id} game={game} />;
                })}
            </div>
        </div>
    );
}

export default Stats;
