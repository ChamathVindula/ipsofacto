function Banner({ message }) {
    return (
        <div className="mx-auto my-4">
            <p className="lexend-semibold text-2xl text-center py-2">
                {message}
            </p>
        </div>
    );
}

export default Banner;
