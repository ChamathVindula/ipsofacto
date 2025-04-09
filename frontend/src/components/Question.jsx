function Question({ text }) {
    return (
        <div className="w-full mb-8">
            <p className="lexend-medium text-[2.8vw] md:text-[1.8vw] lg:text-[2.5vw] xl:text-[1.8vw] font-bold text-gray-800">
                {`Question: ${text}`}
            </p>
        </div>
    );
}

export default Question;