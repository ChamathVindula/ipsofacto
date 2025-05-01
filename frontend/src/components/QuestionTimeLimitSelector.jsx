import RoundLobbyItemContainer from "./RoundLobbyItemContainer";

function QuestionTimeLimitSelector({ min, max, step, onChangeHandler }) {
    return (
        <RoundLobbyItemContainer>
            <h2 className="sour-gummy-medium text-2xl">
                Time Limit per Question
            </h2>
            <div className="w-full flex flex-col">
                <label
                    htmlFor="questionCount"
                    className="lexend-medium text-sm"
                >
                    Select the time limit per question (in seconds):
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

export default QuestionTimeLimitSelector;
