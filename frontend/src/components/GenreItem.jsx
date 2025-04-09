function GenreItem({ genre, clickHandler }) {
    return (
        <div
            className="
                min-w-[84px] max-w-[200px] flex justify-center items-center m-2 
                rounded-md text-white font-bold cursor-pointer 
                hover:scale-105 transition-transform duration-200
                lexend-medium active:scale-95"
            style={{ backgroundColor: genre.color }}
            onClick={() => clickHandler({ id: genre.id, name: genre.name })} // Pass the genre object to the click handler
        >
            <span className="p-2">
                {genre.name}
            </span>
        </div>
    );
}

export default GenreItem;