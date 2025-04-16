import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSocket } from "../context/SocketProvider";
import { useRoom } from "../context/RoomProvider";
import GameCard from "../components/GameCard";
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
    let navigate = useNavigate();

    let createTimer = (time, callback) => {
        if (!time || typeof callback !== "function") return;
        timerRef.current = setTimeout(callback, time);
    };

    let clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    let onClickHandler = (question_id, answer) => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setAnswers((prevAnswers) => {
            return { ...prevAnswers, [question_id]: answer };
        });
    };

    useEffect(() => {
        if (!socket) return;

        socket.emit("player_ready", room.data.roomId, localStorage.getItem("player_id")); // Player id is temporarily stored in local storage

        socket.on("round_starting", (data, startRoundAt) => {
            setQuestions(data.questions);
            setTimePerQuestion(data.time_per_question);

            let time = Math.max(startRoundAt - Date.now(), 0);

            setTimeout(() => {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setIsGameFinished(false);
            }, time);
        });

        socket.on("round_finished", (round, scores) => {
            console.log("Round finished", round, scores);
            // navigate('/results', { state: { round, scores } });
        });

        return () => {
            socket.off("round_starting");
            socket.off("round_finished");
        };
    }, [socket]);

    useEffect(() => {
        clearTimer();

        // If there are no more questions, stop the game
        if (currentQuestionIndex >= questions.length) {
            setIsGameFinished(true);
            socket.emit("player_finshed_round", room.data.roomId, localStorage.getItem("player_id"), answers);
            return;
        }

        let callback = () => {
            setCurrentQuestionIndex((prevIndex) =>
                prevIndex >= questions.length - 1 ? prevIndex : prevIndex + 1
            );
        };
        createTimer(timePerQuestion, callback);
    }, [currentQuestionIndex]);

    let content = null;

    if (!questions.length) {
        content = <Banner message="Waiting for other players to join..." />;
    } else {
        if (currentQuestionIndex >= questions.length) {
            content = (
                <Banner message="Round finished, waiting for other players!" />
            );
        } else if (currentQuestionIndex === -1) {
            content = <Banner message="Waiting for the round to start..." />;
        } else {
            content = (
                <GameCard
                    question={questions[currentQuestionIndex]}
                    onClickHandler={onClickHandler}
                />
            );
        }
    }

    let progressBar = isGameFinished ? null : (
        <ProgressBar
            duration={timePerQuestion}
            questionIndex={currentQuestionIndex}
        />
    );

    return (
        <>
            <div className="flex justify-center items-center">{content}</div>
            {progressBar}
        </>
    );
}

export default Game;
