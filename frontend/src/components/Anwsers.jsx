import Anwser from "./Anwser";

function Anwsers({ question_id, anwsers, onClickHandler }) {
    return (
        <div className="w-full flex flex-col flex-wrap justify-center items-center md:grid md:grid-cols-2 md:gap-8">
            {
                anwsers.map((anwser, index) => {
                    return (
                        <Anwser
                            key={index}
                            text={anwser}
                            question_id={question_id}
                            onClickHandler={onClickHandler}
                        />
                    )
                })
            }
        </div>
    );
}

export default Anwsers;