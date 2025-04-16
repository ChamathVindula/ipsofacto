import { createContext, useContext, useEffect, useReducer } from "react";

let RoomContext = createContext(null);

export const useRoom = () => {
    return useContext(RoomContext);
}

function RoomProvider({ children }) {
    let initialState = {
        roomId: "",
        roomName: "",
        roomCode: "",
        host: "",
        players: []
    }

    // function to generate a random player name
    const generateRandomName = () => {
        const players = [
            "Alex Johnson",
            "Jordan Smith",
            "Taylor Brooks",
            "Morgan Davis",
            "Casey Lee",
            "Riley Thompson",
            "Jamie Carter",
            "Drew Morgan",
            "Quinn Parker",
            "Cameron Blake"
        ];

        return players[Math.floor(Math.random() * players.length)];
    }

    let reducer = (state, action) => {
        switch(action.type) {
            case "INIT": {
                return {
                    ...state,
                    roomId: action.payload.roomId,
                    roomName: action.payload.roomName,
                    roomCode: action.payload.roomCode,
                    host: action.payload.host,
                    isHost: action.payload.isHost,
                    players: action.payload.players.map(player => {
                        return { 
                            id: player,
                            name: generateRandomName(), 
                            avatar: "/public/user.png" 
                        } 
                    })
                };
            }
            case "ADD_PLAYER": {
                return {
                    ...state,
                    players: [...state.players, { 
                        id: action.payload,
                        name: generateRandomName(), 
                        avatar: "/public/user.png" 
                    }]
                };
            }
            case "SET_GAME": {
                return {
                    ...state,
                    game: action.payload.game
                };
            }
        }
    }

    let [room, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log("Room state updated:", room);
    }, [room]);

    return (
        <RoomContext.Provider value={{ data: room, dispatch }}>
            {children}
        </RoomContext.Provider>
    );
}

export default RoomProvider;