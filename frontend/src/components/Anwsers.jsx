import Anwser from "./Anwser";

function Anwsers({ anwsers, correct_anwser, onClickHandler }) {
    return (
        <div className="w-full flex flex-col flex-wrap justify-center items-center md:grid md:grid-cols-2 md:gap-8">
            {
                anwsers.map((anwser, index) => {
                    return (
                        <Anwser
                            key={index}
                            text={anwser}
                            onClickHandler={onClickHandler}
                        />
                    )
                })
            }
        </div>
    );
}

export default Anwsers;