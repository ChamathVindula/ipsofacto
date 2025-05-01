function PlayerAvatar({ player }) {
    return (
        <div className="flex flex-col justify-center bg-white m-2">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm mx-auto">
                <img
                    src={player.avatar ?? "/public/user.png"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <p className="text-center text-xs lexend-medium">
                    {player.name ?? "Player Name"}
                </p>
            </div>
        </div>
    );
}

export default PlayerAvatar;
