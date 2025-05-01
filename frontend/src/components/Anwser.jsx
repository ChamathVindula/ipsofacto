function Anwser({ text, question_id, onClickHandler }) {
    return (
        <div
            className="w-full flex justify-center items-center text-center 
                    text-gray-800 bg-gray-200 rounded-lg p-4 my-2 hover:cursor-pointer 
                    hover:bg-gray-300 active:scale-95 transition duration-200 ease-in-out md:my-0"
            onClick={() => onClickHandler(question_id, text)}
        >
            <p className="lexend-medium text-[2.5vw] md:text-[1.5vw] lg:text-[2.2vw] xl:text-[1.5vw] font-bold">
                {text}
            </p>
        </div>
    );
}

export default Anwser;
