import { useState } from "react";

function InteractiveDropDownForm({ button_text, form }) {
    let [formIsOpen, setFormIsOpen] = useState(false);

    let buttonClickHandler = () => {
        setFormIsOpen((prev) => !prev);
    };

    return (
        <div>
            <div className="p-4">
                <button
                    className="
                        border-1 border-mossgreen-dark text-mossgreen-dark 
                        font-bold py-2 px-4 rounded-sm hover:bg-mossgreen-dark 
                        transition duration-300 cursor-pointer w-full
                        hover:text-white hover:border-mossgreen-dark"
                    onClick={buttonClickHandler}
                >
                    {button_text}
                </button>
            </div>
            <div
                className={`${
                    formIsOpen ? "max-h-full" : "max-h-0 hidden"
                } overflow-hidden transition-all duration-300 bg-white p-4 rounded-md shadow-lg`}
            >
                {form}
            </div>
        </div>
    );
}

export default InteractiveDropDownForm;
