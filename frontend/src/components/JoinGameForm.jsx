import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useRoom } from "../context/RoomProvider";
import { useNavigate } from "react-router";

function JoinGameForm() {
    const [roomCode, setRoomCode] = useState("");
    const socket = useSocket();
    const room = useRoom();
    const navigate = useNavigate();

    const onChangeHandle = (e) => {
        setRoomCode(e.target.value);
    };

    const onClickHandler = (e) => {
        e.preventDefault();

        if (roomCode.trim() === "") {
            alert("Please enter a game code!");
            return;
        }
        socket.emit("join_room", localStorage.getItem('player_id'), roomCode);    // Player id is temporarily stored in local storage

        setRoomCode("");
    };

    useEffect(() => {
        if(!socket) return;

        socket.on("room_joined", (roomData) => {
            room.dispatch({ type: "INIT", payload: roomData });
            navigate("/game");
        });
    }, [socket]);

    return (
        <div className="flex flex-col">
            <label
                htmlFor="gameCode"
                className="text-sm font-medium text-gray-700"
            >
                Game Code
            </label>
            <input
                type="text"
                id="gameCode"
                value={roomCode}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter game code"
                onChange={onChangeHandle}
            />
            <button 
                className="mt-4 bg-mossgreen-dark text-white font-bold 
                                py-2 px-4 rounded-sm hover:bg-mossgreen-dark 
                                cursor-pointer transition duration-300"
                onClick={onClickHandler}
                >
                Join
            </button>
        </div>
    );
}
export default JoinGameForm;
