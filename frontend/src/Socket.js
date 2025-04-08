import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:8001';    // Server address

export const socket = io(URL);

// export const socket = io(URL, {
//     autoConnect: false
// });