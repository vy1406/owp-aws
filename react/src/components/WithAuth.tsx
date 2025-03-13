import { ReactNode } from "react";
import { useLocation } from 'wouter';
import { TOKEN_KEY } from "../services/context";
import { ROUTES } from "../utils/constants";

interface WithAuthProps {
    children: ReactNode;
}

const WithAuth = ({ children }: WithAuthProps) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const [_, setLocation] = useLocation();
    const onLogin = () => setLocation(ROUTES.LOGIN);
    
    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-center text-red-600 text-xl font-semibold mb-4">
                    Must be logged in to access this page
                </p>
                <button
                    onClick={onLogin}
                    className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return <>{children}</>;
};

export default WithAuth;
