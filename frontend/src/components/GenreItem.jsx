function GenreItem({ genre, clickHandler }) {
    function getRandomColor() {
        const randomChannel = () => Math.floor(Math.random() * 256); // 0–255
        const hex = [randomChannel(), randomChannel(), randomChannel()]
            .map((c) => c.toString(16).padStart(2, "0"))
            .join("");

        return `#${hex}`;
    }

    return (
        <div
            className="
                min-w-[84px] max-w-[200px] flex justify-center items-center m-1 
                rounded-md text-white font-bold cursor-pointer 
                hover:scale-105 transition-transform duration-200
                lexend-medium active:scale-95 text-sm"
            style={{ backgroundColor: getRandomColor() }} // Default color if genre.color is not defined
            onClick={() => clickHandler({ id: genre.id, name: genre.name })} // Pass the genre object to the click handler
        >
            <span className="p-[8px]">{genre.name}</span>
        </div>
    );
}

export default GenreItem;
