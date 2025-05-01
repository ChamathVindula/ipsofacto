import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

function Header() {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const avatar = user ? (
        <div className="relative flex flex-row items-center" ref={dropdownRef}>
            <p className="text-sm text-center mx-1 lexend-medium">
                {user.first_name + " " + user.last_name}
            </p>
            <button
                onClick={toggleDropdown}
                className="w-9 h-9 rounded-full overflow-hidden shadow-sm mx-auto focus:outline-none"
            >
                <img
                    src="/public/user.png"
                    alt="Avatar"
                    className="w-full h-full object-cover bg-white"
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black rounded shadow-md z-10">
                    <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 lexend-medium"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    ) : null;

    return (
        <header className="bg-mossgreen-light text-white p-4 flex justify-between items-center">
            <h1 className="text-4xl sour-gummy-medium">Ipsofacto</h1>
            <div>{avatar}</div>
        </header>
    );
}

export default Header;
