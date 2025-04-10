import './App.css';
import { RouterProvider } from 'react-router';
import router from './router';
import SocketProvider from './context/SocketProvider';

function App() {
  return (
    <SocketProvider>
        <RouterProvider router={router} />
    </SocketProvider>
  );
}

export default App;