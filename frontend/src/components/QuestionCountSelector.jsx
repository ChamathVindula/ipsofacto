import RoundLobbyItemContainer from "./RoundLobbyItemContainer";

function QuestionCountSelector({ min, max, step, onChangeHandler }) {
    return (
        <RoundLobbyItemContainer>
            <h2 className="sour-gummy-medium text-2xl">Number of Questions</h2>
            <div className="w-full flex flex-col">
                <label htmlFor="questionCount" className="lexend-medium text-md">
                    Select the number of questions:
                </label>
                <input
                    type="number"
                    id="questionCount"
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={min}
                    onChange={(e) => onChangeHandler(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
        </RoundLobbyItemContainer>
    );
}

export default QuestionCountSelector;