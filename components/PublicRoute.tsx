import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { firebaseUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (firebaseUser) {
        return <Navigate to="/app" replace />;
    }

    return children;
};