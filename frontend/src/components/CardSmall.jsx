function CardSmall({ children }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-3 w-1/2 min-w-[300px] max-w-[350px] mx-auto my-2">
            {children}
        </div>
    );
}

export default CardSmall;
