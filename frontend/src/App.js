import './App.css';
import { socket } from './socket';
import { useState, useEffect } from 'react';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onAction(action) {
      setActions(prev => [...prev, action])
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('action', onAction);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('action', onAction);
    };
  }, [actions]);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div className="App">
      <div className='connection_status'>
        <p>{isConnected ? <strong>Connected</strong> : <strong>Disconnected</strong>}</p>
      </div>
      
      <div className='toggle_section'>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
      </div>
      
      <div className='actions_list'>
        {
          actions.forEach(action => {
            return <p className={action}>action</p>
          })
        }
      </div>
    </div>
  );
}

export default App;
