import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(credentials.email, credentials.password);
        
        if(response.status === 200) {
            navigate("/home");
        } else {
            alert("Invalid credentials");
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Login
                </h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-[200px] border-1 border-mossgreen-dark text-mossgreen-dark 
                            font-bold py-2 px-4 rounded-sm hover:bg-mossgreen-dark 
                            transition duration-300 cursor-pointer
                            hover:text-white hover:border-mossgreen-dark"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
