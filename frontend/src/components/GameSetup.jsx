import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useRoom } from "../context/RoomProvider";

function GameSetup() {
    const [roundCount, setRoundCount] = useState(1);
    const [pointsPerQuestion, setPointsPerQuestion] = useState(0.5);
    const room = useRoom();
    const socket = useSocket();

    const roundCountChangeHandler = (event) => {
        setRoundCount(event.target.value);
    };

    const pointsPerQuestionChangeHandler = (event) => {
        setPointsPerQuestion(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        socket.emit(
            "create_game",
            room.data.roomId,
            pointsPerQuestion,
            roundCount
        );
    };

    return (
        <div
            className="
            flex flex-col bg-white w-1/2 min-w-[300px] max-w-[350px] 
            border-2 border-mossgreen-light rounded-lg my-4"
        >
            <form className="flex flex-col p-4" onSubmit={formSubmitHandler}>
                <fieldset className="flex flex-col my-2">
                    <label
                        htmlFor="roundCount"
                        className="lexend-medium text-md font-medium text-gray-700"
                    >
                        Number of Rounds
                    </label>
                    <input
                        type="number"
                        id="roundCount"
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        min="1"
                        max="10"
                        step="1"
                        placeholder="Enter the number of rounds"
                        onChange={roundCountChangeHandler}
                    />
                </fieldset>
                <fieldset className="flex flex-col my-2">
                    <label
                        htmlFor="pointsPerQuestion"
                        className="lexend-medium text-md font-medium text-gray-700"
                    >
                        Points per Question
                    </label>
                    <input
                        type="number"
                        id="pointsPerQuestion"
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        min="0.5"
                        max="100"
                        step="0.5"
                        placeholder="Enter how many points per question"
                        onChange={pointsPerQuestionChangeHandler}
                    />
                </fieldset>
                <fieldset className="flex flex-col my-2">
                    <button
                        type="submit"
                        className="mt-4 bg-mossgreen-dark text-white font-bold py-2 px-4 rounded-sm transition duration-300 cursor-pointer active:scale-95"
                    >
                        Start Game
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default GameSetup;
