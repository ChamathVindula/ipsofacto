import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GameLobby from './pages/GameLobby';
import RoundLobby from './pages/RoundLobby';

function App() {
  return (
    <Layout>
      {/* <HomePage /> */}
      {/* <GameLobby /> */}
      <RoundLobby />
    </Layout>
  );
}

export default App;