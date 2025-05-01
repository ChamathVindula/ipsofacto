import CardSmall from "./CardSmall";
import InteractiveDropDownForm from "./InteractiveDropDownForm";
import CreateGameForm from "./CreateGame";
import JoinGameForm from "./JoinGameForm";

function GameOptions() {
    return (
        <CardSmall>
            <InteractiveDropDownForm
                button_text={"Create Game"}
                form={<CreateGameForm />}
            />
            <InteractiveDropDownForm
                button_text={"Join Game"}
                form={<JoinGameForm />}
            />
        </CardSmall>
    );
}

export default GameOptions;
