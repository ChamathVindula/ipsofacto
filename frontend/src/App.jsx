import './App.css';
import { RouterProvider } from 'react-router';
import router from './router';
import SocketProvider from './context/SocketProvider';
import RoomProvider from './context/RoomProvider';

function App() {
  return (
    <SocketProvider>
      <RoomProvider>
        <RouterProvider router={router} />
      </RoomProvider>
    </SocketProvider>
  );
}

export default App;