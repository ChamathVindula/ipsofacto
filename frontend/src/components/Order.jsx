import RoundLobbyItemContainer from "./RoundLobbyItemContainer";

function Order({ settings }) {
    return (
        <RoundLobbyItemContainer>
            <div className="flex justify-center items-center m-2 font-bold sour-gummy-medium">
                <p className="text-4xl">
                    {`
                        ${settings.question_count ?? ""} 
                        ${settings.difficulty ?? ""} 
                        ${settings.genre ?? ""} 
                        ${
                            settings.question_count > 1
                                ? "questions"
                                : "question"
                        }`}
                </p>
            </div>
        </RoundLobbyItemContainer>
    );
}

export default Order;
