import Question from "./Question";
import Anwsers from "./Anwsers";

function GameCard({ question, onClickHandler }) {
  return (
    <div className="flex flex-col justify-center items-center p-4 mt-8 mx-16">
      <Question text={question.question} />
      <Anwsers
        anwsers={[...question.distractions, question.answer]}
        correct_anwser={question.answer}
        onClickHandler={onClickHandler}
      />
    </div>
  );
}

export default GameCard;
