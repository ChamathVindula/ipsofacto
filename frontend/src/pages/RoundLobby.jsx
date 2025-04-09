import { useState, useEffect } from "react";
import Order from "../components/Order";
import GenreSelector from "../components/GenreSelector";
import QuestionCountSelector from "../components/QuestionCountSelector";
import QuestionTimeLimitSelector from "../components/QuestionTimeLimitSelector";
import QuestionDifficultySelector from "../components/QuestionDifficultySelector";

function RoundLobby() {
    const [genre, setGenre] = useState([
        { id: 1, name: "Science", color: "#FF5733" },
        { id: 2, name: "History", color: "#33FF57" },
        { id: 3, name: "Geography", color: "#3357FF" },
        { id: 4, name: "Literature", color: "#FF33A1" },
        { id: 5, name: "Mathematics", color: "#FF8C33" },
        { id: 6, name: "Art", color: "#33FFA1" },
        { id: 7, name: "Music", color: "#A133FF" },
        { id: 8, name: "Sports", color: "#FFC733" },
        { id: 9, name: "Technology", color: "#33C7FF" },
        { id: 10, name: "Movies", color: "#FF33C7" }
    ]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [difficulties, setDifficulties] = useState(['easy', 'medium', 'hard']);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [numberOfQuestions, setNumberOfQuestions] = useState(1);  // Default to 1 question
    const [timePerQuestion, setTimePerQuestion] = useState(5000);   // Default to 5 seconds

    let genreSelectHandler = (genre) => {
        setSelectedGenre(genre);
    }

    let difficultySelectHandler = (difficulty) => {
        setSelectedDifficulty(difficulty);
    }

    let numberOfQuestionsHandler = (number) => {
        setNumberOfQuestions(number);
    }
    
    let timePerQuestionHandler = (time) => {
        setTimePerQuestion(time*1000); // Convert to milliseconds
    }

    let settings = {
        genre: selectedGenre?.name,
        difficulty: selectedDifficulty,
        question_count: numberOfQuestions
    }

    useEffect(() => {
        //...
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <Order settings={settings} />
            <GenreSelector genre={genre} genreSelectHandler={genreSelectHandler} />
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
        </div>
    );
}

export default RoundLobby;