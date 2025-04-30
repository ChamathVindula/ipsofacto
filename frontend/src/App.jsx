import './App.css';
import { RouterProvider } from 'react-router';
import router from './router';
import SocketProvider from './context/SocketProvider';
import RoomProvider from './context/RoomProvider';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <RoomProvider>
          <RouterProvider router={router} />
        </RoomProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;