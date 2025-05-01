import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Fireworks } from "fireworks-js";
import ProgressBar from "../components/progressBar";
import { useRoom } from "../context/RoomProvider";

function Results() {
    let { state } = useLocation();
    let navigate = useNavigate();
    let fireworksRef = useRef(null);
    let room = useRoom();

    // A player map to get the player name from the userId
    let playerMap = room.data.players.reduce((acc, player) => {
        acc[player.id] = player;
        return acc;
    }, {});

    useEffect(() => {
        const fireworks = new Fireworks(fireworksRef.current, {
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 50,
            traceLength: 3,
            traceSpeed: 10,
            explosion: 5,
            intensity: 30,
            flickering: 50,
            lineStyle: "round",
            hue: {
                min: 0,
                max: 360,
            },
            delay: {
                min: 30,
                max: 60,
            },
            rocketsPoint: {
                min: 50,
                max: 50,
            },
            lineWidth: {
                explosion: {
                    min: 1,
                    max: 3,
                },
                trace: {
                    min: 1,
                    max: 2,
                },
            },
            brightness: {
                min: 50,
                max: 80,
            },
            decay: {
                min: 0.015,
                max: 0.03,
            },
            mouse: {
                click: false,
                move: false,
                max: 1,
            },
        });
        fireworks.start();

        setTimeout(() => {
            fireworks.stop();
        }, 5000); // Set a timer for 5 seconds
    }, []);

    const sortedResults = Object.entries({
        ...state.scores,
        824012: 5.5,
        821108: 2.5,
        513063: 1.5,
    }).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

    // Display the results of the game
    // Set a timer for about 10 seconds and let them skip the timer as well

    return (
        <>
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Game Results
                </h2>
                <ul className="space-y-3">
                    {sortedResults.map(([userId, score], index) => {
                        let baseStyle = "";
                        let hoverStyle = "";
                        let emoji = "";

                        switch (index) {
                            case 0:
                                baseStyle =
                                    "bg-yellow-100 border border-yellow-300";
                                hoverStyle = "hover:bg-yellow-200";
                                emoji = "🥇";
                                break;
                            case 1:
                                baseStyle =
                                    "bg-gray-100 border border-gray-300";
                                hoverStyle = "hover:bg-gray-200";
                                emoji = "🥈";
                                break;
                            case 2:
                                baseStyle =
                                    "bg-amber-100 border border-amber-300";
                                hoverStyle = "hover:bg-amber-200";
                                emoji = "🥉";
                                break;
                            default:
                                baseStyle = "bg-gray-50";
                                hoverStyle = "hover:bg-gray-100";
                        }

                        return (
                            <li
                                key={userId}
                                className={`flex items-center justify-between px-4 py-2 rounded-md transition duration-200 ${baseStyle} ${hoverStyle}`}
                            >
                                <span className="flex-1 ml-4 text-gray-800 truncate">
                                    {emoji && (
                                        <span className="mr-2">{emoji}</span>
                                    )}
                                    {playerMap[userId]
                                        ? playerMap[userId].name
                                        : "Unknown Player"}
                                </span>
                                <span className="font-semibold text-blue-600">
                                    {score} pts
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <ProgressBar
                duration={10000}
                onComplete={() => {
                    if (state.hostNextRound) {
                        navigate("/round", {
                            state: { host: state.hostNextRound },
                        });
                    } else {
                        navigate("/home");
                    }
                }}
            />
            <div
                ref={fireworksRef}
                className="absolute inset-0 z-10 pointer-events-none"
            />
        </>
    );
}

export default Results;
