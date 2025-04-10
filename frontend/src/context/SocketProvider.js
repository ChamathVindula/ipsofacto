import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

// This is a context for the socket connection
const SocketContext = createContext(null);

// This is a custom hook that allows you to access the socket context
export const useSocket = () => {
    return useContext(SocketContext);
}

function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:8001';    // Server address

        const socket = io(URL, {
            autoConnect: false
        });

        // Connect to the socket server, this might not be the 
        // case once authentication is implemented
        socket.connect();

        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;