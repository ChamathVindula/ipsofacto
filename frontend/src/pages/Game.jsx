import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import { useSocket } from "../context/SocketProvider";
import { useRoom } from "../context/RoomProvider";
import Banner from "../components/Banner";

function Game() {
    let socket = useSocket();
    let room = useRoom();
    let [gameStarted, setGameStarted] = useState(false);
    let [questions, setQuestions] = useState([]);
    let [score, setScore] = useState([]);
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        if(!socket) return;

        socket.emit('player_ready', room.data.roomId, localStorage.getItem('player_id'));   // Player id is temporarily stored in local storage

        socket.on('game_starting', (questions, startRoundAt) => {
            setQuestions(questions);

            let currentTime = Date.now();
            let startGameAt = startRoundAt - currentTime;

            if(startGameAt <= 0) {
                setGameStarted(true);
            } else {
                setTimeout(() => {
                    setGameStarted(true);
                }, startGameAt);
            }

            console.log("Game starting in " + startGameAt * 1000 + " seconds");
            console.log("Questions: ", questions);
        });

        socket.on('player_not_in_room', () => {
            console.log("Player not in room");
        });

        return () => {
            socket.off('game_starting');
            socket.off('player_not_in_room');
        }
    }, [socket]);

    let content = gameStarted ? (<GameCard
        question={questions[currentQuestionIndex]}
        onClickHandler={(anwser) => {
            console.log(anwser);
        }}
    />) : <Banner message="Get ready..." />;

    return (
        <div className="flex justify-center items-center">
            {content}
        </div>
    );
}

export default Game;