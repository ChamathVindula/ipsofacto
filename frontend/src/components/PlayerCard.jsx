import CardSmall from "./CardSmall";
import Stats from "./Stats";

function PlayerCard({ playerDetails }) {
    // Temporary data for game history
    let gameHistory = playerDetails.game_history ?? [
        { id: 1, name: 'The Brain Teaser Blitz', score: '52' },
        { id: 2, name: 'The Memory Challenge', score: '45' },
        { id: 3, name: 'The Logic Puzzle', score: '38' },
        { id: 4, name: 'The Trivia Showdown', score: '50' },
        { id: 5, name: 'The Word Wizard', score: '60' }
    ]; 
    return (
        <CardSmall>
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm mx-auto">
                <img src="/public/user.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="player_name my-2">
                <p className="mx-auto text-center text-3xl sour-gummy-medium">{playerDetails.name ?? 'Player Name'}</p>
            </div>
            <Stats game_history={gameHistory} />
        </CardSmall>
    );
}

export default PlayerCard;