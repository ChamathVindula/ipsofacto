import { createContext, useContext, useReducer } from "react";

let RoomContext = createContext(null);

export const useRoom = () => {
    return useContext(RoomContext);
};

function RoomProvider({ children }) {
    let initialState = {
        roomId: "",
        roomName: "",
        roomCode: "",
        host: "",
        players: [],
    };

    let reducer = (state, action) => {
        switch (action.type) {
            case "INIT": {
                return {
                    ...state,
                    roomId: action.payload.roomId,
                    roomName: action.payload.roomName,
                    roomCode: action.payload.roomCode,
                    host: action.payload.host,
                    isHost: action.payload.isHost,
                    players: action.payload.players.map((player) => {
                        return {
                            id: player.id,
                            name: player.first_name + " " + player.last_name,
                            avatar: "/public/user.png",
                        };
                    }),
                };
            }
            case "ADD_PLAYER": {
                let player = action.payload;
                return {
                    ...state,
                    players: [
                        ...state.players,
                        {
                            id: player.id,
                            name: player.first_name + " " + player.last_name,
                            avatar: "/public/user.png",
                        },
                    ],
                };
            }
            case "SET_GAME": {
                return {
                    ...state,
                    game: action.payload.game,
                };
            }
        }
    };

    let [room, dispatch] = useReducer(reducer, initialState);

    return (
        <RoomContext.Provider value={{ data: room, dispatch }}>
            {children}
        </RoomContext.Provider>
    );
}

export default RoomProvider;
