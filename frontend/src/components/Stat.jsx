function Stat({ game }) {
    return (
        <div className="bg-mossgreen-light rounded-sm p-2 my-1 w-full flex items-center justify-between hover:scale-105">
            <span className="text-white text-md">{game.name}</span>
            <span className="text-mossgreen-dark text-lg">{game.score}</span>
        </div>
    );
}

export default Stat;