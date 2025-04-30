import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user === null) {
            navigate("/login", { replace: true });
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Loading...</div>; // Or a spinner
    if (!user) return null;

    return children;
};

export default ProtectedRoute;
