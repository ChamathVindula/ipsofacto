function JoinGameForm() {
    return (
        <div className="flex flex-col">
            <label htmlFor="gameCode" className="text-sm font-medium text-gray-700">Game Code</label>
            <input type="text" id="gameCode" className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="Enter game code" />
            <button className="mt-4 bg-mossgreen-dark text-white font-bold py-2 px-4 rounded-sm hover:bg-mossgreen-dark cursor-pointer transition duration-300">
                Join
            </button>
        </div>
    );
}
export default JoinGameForm;