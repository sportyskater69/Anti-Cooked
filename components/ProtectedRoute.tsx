import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { firebaseUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // or splash screen
    }

    if (!firebaseUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};