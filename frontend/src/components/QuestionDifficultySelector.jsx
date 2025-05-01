import RoundLobbyItemContainer from "./RoundLobbyItemContainer";

function QuestionDifficultySelector({
    options,
    selectedDifficulty,
    onChangeHandler,
}) {
    return (
        <RoundLobbyItemContainer>
            <h2 className="sour-gummy-medium text-2xl">Difficulty</h2>
            <div className="w-full flex flex-col">
                <label
                    htmlFor="questionDifficulty"
                    className="lexend-medium text-sm"
                >
                    Select the difficulty level of the questions:
                </label>
                <div>
                    <div className="flex flex-row">
                        {options.map((option, index) => (
                            <button
                                key={option}
                                onClick={() => onChangeHandler(option)}
                                className={`
                                px-3 py-1 font-semibold text-lg 
                                ${
                                    selectedDifficulty === option
                                        ? "bg-mossgreen-light text-white"
                                        : "bg-gray-200 text-gray-700"
                                } 
                                ${index === 0 ? "rounded-l-lg" : ""} 
                                ${
                                    index === options.length - 1
                                        ? "rounded-r-lg"
                                        : ""
                                }
                                hover:bg-gray-300 hover:text-white transition duration-300
                            `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </RoundLobbyItemContainer>
    );
}

export default QuestionDifficultySelector;
