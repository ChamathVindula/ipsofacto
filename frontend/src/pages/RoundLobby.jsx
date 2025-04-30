import { useState, useEffect, useRef } from "react";
import Order from "../components/Order";
import GenreSelector from "../components/GenreSelector";
import QuestionCountSelector from "../components/QuestionCountSelector";
import QuestionTimeLimitSelector from "../components/QuestionTimeLimitSelector";
import QuestionDifficultySelector from "../components/QuestionDifficultySelector";
import Banner from "../components/Banner";
import { useSocket } from "../context/SocketProvider";
import { useRoom } from "../context/RoomProvider";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthProvider";
import API from "../api/api";

function RoundLobby() {
    const socket = useSocket();
    const room = useRoom();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user } = useAuth();
    const roundHost = state.host || null;
    const [isHost, setIsHost] = useState(
        roundHost.toString() === user.id.toString()
    );
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [difficulties, setDifficulties] = useState([
        "easy",
        "medium",
        "hard",
    ]);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [numberOfQuestions, setNumberOfQuestions] = useState(1); // Default to 1 question
    const [timePerQuestion, setTimePerQuestion] = useState(5000); // Default to 5 seconds
    const [isLoading, setIsLoading] = useState(false);
    const submitBtnRef = useRef(null);

    let genreSelectHandler = (genre) => {
        setSelectedGenre(genre);
    };

    let difficultySelectHandler = (difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    let numberOfQuestionsHandler = (number) => {
        setNumberOfQuestions(number);
    };

    let timePerQuestionHandler = (time) => {
        setTimePerQuestion(time * 1000); // Convert to milliseconds
    };

    let onClickHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        socket.emit(
            "create_round",
            room.data.roomId,
            selectedGenre.name,
            selectedDifficulty,
            numberOfQuestions,
            timePerQuestion
        );
    };

    let settings = {
        genre: selectedGenre?.name,
        difficulty: selectedDifficulty,
        question_count: numberOfQuestions,
    };

    useEffect(() => {
        if (!socket) return;

        socket.on("round_created", () => {
            navigate("/play");
        });

        return () => {
            socket.off("round_created");
        };
    }, []);

    useEffect(() => {
        // Fetch genres from the API on component mount
        API.get("/api/genre/all")
            .then((response) => {
                if (response.status === 200) {
                    setGenre(response.data);
                } else {
                    throw new Error("Failed to fetch genres");
                }
            })
            .catch((error) => {
                alert("Error fetching genres: " + error.message);
            });
    }, []);

    let content = null;

    if (isHost) {
        content = (
            <>
                <Order settings={settings} />
                <GenreSelector
                    genre={genre}
                    genreSelectHandler={genreSelectHandler}
                />
                <QuestionDifficultySelector
                    options={difficulties}
                    onChangeHandler={difficultySelectHandler}
                    selectedDifficulty={selectedDifficulty}
                />
                <QuestionCountSelector
                    min={1}
                    max={15}
                    step={1}
                    onChangeHandler={numberOfQuestionsHandler}
                />
                <QuestionTimeLimitSelector
                    min={5}
                    max={20}
                    step={1}
                    onChangeHandler={timePerQuestionHandler}
                />
                <div className="flex flex-col justify-center items-center mt-4">
                    <button
                        className="min-w-[128px] justify-center items-center border-1 border-mossgreen-light 
                              text-white bg-mossgreen-light font-bold py-2 px-4 rounded-sm 
                              hover:bg-mossgreen-dark hover:border-mossgreen-dark active:scale-95 
                              transition duration-300 cursor-pointer w-full hover:text-white 
                              hover:border-mossgreen-dark flex"
                        onClick={onClickHandler}
                        ref={submitBtnRef}
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        ) : (
                            "Start Round"
                        )}
                    </button>
                </div>
            </>
        );
    } else {
        content = (
            <Banner message="Waiting for the host to start the round &#128515;" />
        );
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {content}
        </div>
    );
}

export default RoundLobby;
