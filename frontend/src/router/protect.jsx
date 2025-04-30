import ProtectedRoute from "../components/ProtectedRoute";

const protect = (Component) => () =>
    (
        <ProtectedRoute>
            <Component />
        </ProtectedRoute>
    );
    
export default protect;