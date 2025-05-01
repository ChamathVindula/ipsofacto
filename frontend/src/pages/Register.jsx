import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await register(
            formData.first_name,
            formData.last_name,
            formData.email,
            formData.password
        );

        if (response.status === 201) {
            navigate("/login");
        } else if (response.status === 400) {
            alert("User already exists");
        } else {
            alert("Registration failed");
        }
    };

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-[350px] mx-auto flex items-center justify-center mt-20">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center lexend-medium">
                    Register
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="first_name"
                        className="block text-gray-700 mb-1 lexend-medium text-sm"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="last_name"
                        className="block text-gray-700 mb-1 lexend-medium text-sm"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 mb-1 lexend-medium text-sm"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 mb-1 lexend-medium text-sm"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-fit border-1 border-mossgreen-dark text-mossgreen-dark 
                            font-bold py-1 px-4 rounded-sm hover:bg-mossgreen-dark 
                            transition duration-300 cursor-pointer
                            hover:text-white hover:border-mossgreen-dark lexend-medium"
                    >
                        Create Account
                    </button>
                </div>
                <div>
                    <p className="text-center mt-4 text-sm">
                        Already have an account?{" "}
                        <a
                            onClick={() => navigate("/login")}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Login here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
