import RoundLobbyItemContainer from "./RoundLobbyItemContainer";
import GenreItem from "./GenreItem";

function GenreSelector({ genre, genreSelectHandler }) {
    return (
        <RoundLobbyItemContainer>
            <h2 className="sour-gummy-medium text-2xl">Genre</h2>
            <div className="w-full flex flex-row flex-wrap justify-center bg-white shadow-lg rounded-lg">
                {genre.map((g) => {
                    return (
                        <GenreItem
                            key={g.id}
                            genre={g}
                            clickHandler={genreSelectHandler}
                        />
                    );
                })}
            </div>
        </RoundLobbyItemContainer>
    );
}

export default GenreSelector;
