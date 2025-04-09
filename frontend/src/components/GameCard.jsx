import Question from "./Question";
import Anwsers from "./Anwsers";

function GameCard({ question, onClickHandler }) {
    console.log('ans', question)
    return (
        <div className="flex flex-col justify-center items-center p-4 mt-8 mx-16">
            <Question text={question.text} />
            <Anwsers anwsers={question.anwsers} onClickHandler={onClickHandler} />
        </div>
    );
}

export default GameCard;