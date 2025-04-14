import { useState, useEffect, useRef } from "react";
import GameCard from "../components/GameCard";
import { useSocket } from "../context/SocketProvider";
import { useRoom } from "../context/RoomProvider";
import Banner from "../components/Banner";
import ProgressBar from "../components/progressBar";

function Game() {
    let socket = useSocket();
    let room = useRoom();
    let [timePerQuestion, setTimePerQuestion] = useState(5000); // Default to 5 seconds
    let [questions, setQuestions] = useState([]);
    let [answers, setAnswers] = useState({});
    let [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    let [isGameFinished, setIsGameFinished] = useState(true);
    let timerRef = useRef(null);


    let createTimer = (time, callback) => {
        if (!time || typeof callback !== 'function') return;
        timerRef.current = setTimeout(callback, time);
    }

    let clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    let onClickHandler = (questionId, answer) => {    
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setAnswers(prevAnswers => { return { ...prevAnswers, [questionId]: answer } });
    }

    useEffect(() => {
        if(!socket) return;

        socket.emit('player_ready', room.data.roomId, localStorage.getItem('player_id'));   // Player id is temporarily stored in local storage

        socket.on('game_starting', (data, startRoundAt) => {
            setQuestions(data.questions);
            setTimePerQuestion(data.time_per_question);

            let time = Math.max((startRoundAt - Date.now()), 0);

            setTimeout(() => {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setIsGameFinished(false);
            }, time);

            return () => {
                socket.off('game_starting');
            }
        });
    }, [socket]);

    useEffect(() => {
        clearTimer();
        
        // If there are no more questions, stop the game
        if(currentQuestionIndex >= questions.length) {
            setIsGameFinished(true);
            return;
        }

        let callback = () => {
            setCurrentQuestionIndex((prevIndex) => prevIndex >= questions.length - 1 ? prevIndex : prevIndex + 1);
        }
        createTimer(timePerQuestion, callback);
    }, [currentQuestionIndex]);

    let content = null;

    if(!questions.length) {
        content = <Banner message="Waiting for other players to join..." />;
    } else {
        if(currentQuestionIndex >= questions.length) {
            content = <Banner message="Game finished!" />;
        } else if(currentQuestionIndex === -1) {
            content = <Banner message="Waiting for the game to start..." />;
        } 
        else {
            content = (
                <GameCard
                    question={questions[currentQuestionIndex]}
                    onClickHandler={onClickHandler}
                />
            );
        }
    }

    let progressBar = isGameFinished ? null : <ProgressBar duration={timePerQuestion} questionIndex={currentQuestionIndex} />;

    return (
        <>
            <div className="flex justify-center items-center">
                {content}
            </div>
            {progressBar}
        </>
    );
}

export default Game;