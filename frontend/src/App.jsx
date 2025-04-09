import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GameLobby from './pages/GameLobby';
import RoundLobby from './pages/RoundLobby';
import Game from './pages/Game';

function App() {
  return (
    <Layout>
      {/* <HomePage /> */}
      {/* <GameLobby /> */}
      {/* <RoundLobby /> */}
      <Game />
    </Layout>
  );
}

export default App;