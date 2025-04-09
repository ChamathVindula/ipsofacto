import { useState } from "react";
import GameCard from "../components/GameCard";

function Game({ qs }) {
    let sampleQuestions = [
        { 
            text: 'During the early stages of the Cold War, which event in 1962 brought the United States and the Soviet Union to the brink of nuclear war, and what were the key factors that led to the confrontation?', 
            anwsers: [
                'The Berlin Airlift',
                'The Cuban Missile Crisis',
                'The Korean War',
                'The Space Race'
            ],
            correct: 'The Cuban Missile Crisis'
        },
    ];

    const [questions, setQuestions] = useState(sampleQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState([]);


    return (
        <div className="flex justify-center items-center">
            <GameCard
                question={questions[0]}
                onClickHandler={(anwser) => {
                    console.log(anwser);
                }}
            />
        </div>
    );
}

export default Game;