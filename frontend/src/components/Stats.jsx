function Stats({ game_history }) {
    return (
        <div className="w-full flex flex-col items-center justify-center border-2 border-mossgreen-light rounded-sm bg-white p-3">
            <span className="inline-block mx-auto text lexend-medium text-2xl">Stats</span>
            <div className="w-full flex flex-col items-center justify-center">
                {
                    game_history.map(game => {
                        return (
                            <div key={game.id} className="bg-mossgreen-light rounded-sm p-2 my-1 w-full flex items-center justify-between hover:scale-105">
                                <span className="text-white text-md">{game.name}</span>
                                <span className="text-mossgreen-dark text-lg">{game.score}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Stats;