import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useRoom } from "../context/RoomProvider";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

function CreateGameForm() {
    const [roomName, setRoomName] = useState("");
    const socket = useSocket();
    const room = useRoom();
    const navigate = useNavigate();
    const { user } = useAuth();

    const onChangeHandle = (e) => {
        setRoomName(e.target.value);
    };

    const onClickHandler = (e) => {
        e.preventDefault();

        if (roomName.trim() === "") {
            alert("Please enter a game name!");
            return;
        }
        socket.emit("create_room", user.id, roomName);

        setRoomName("");
    };

    useEffect(() => {
        if (!socket) return;

        socket.on("room_created", (roomData) => {
            room.dispatch({ type: "INIT", payload: roomData });
            navigate("/game");
        });

        return () => {
            socket.off("room_created");
        }
    }, [socket, room, navigate]);

    return (
        <div className="flex flex-col">
            <label
                htmlFor="gameName"
                className="text-sm font-medium text-gray-700"
            >
                Game Name
            </label>
            <input
                type="text"
                id="gameName"
                value={roomName}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter game name"
                onChange={onChangeHandle}
            />
            <button
                className="mt-4 bg-mossgreen-dark text-white font-bold py-2 px-4 rounded-sm hover:bg-mossgreen-dark cursor-pointer transition duration-300"
                onClick={onClickHandler}
            >
                Create
            </button>
        </div>
    );
}

export default CreateGameForm;
