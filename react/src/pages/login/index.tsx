import { toast } from "react-toastify";
import LoginForm from "../../forms/login";
import { ILoginForm } from "../../forms/rules";
import { apiLogin } from "../../services/auth";
import { LANG, ROUTES } from "../../utils/constants";
import { useLocation } from "wouter";
import { useContext, useEffect } from "react";
import LoginContext from "../../services/context";

const Login = () => {
    const [_, setLocation] = useLocation();
    const { login: ctxLogin, logout } = useContext(LoginContext)

    useEffect(() => {
        logout();
    }, [logout]);

    const handleOnSubmit = async (data: ILoginForm) => {
        const res = await apiLogin(data);
        if (res?.username) {
            const res = await apiLogin(data);
            ctxLogin({
                token: res?.token || '',
                username: res?.username || 'N/A'
            });
            setLocation(ROUTES.HOME);
        } else {
            toast.error(LANG.EN.LOGIN_ERROR);
        }
    }


    return (
        <div className="mt-4">
            <div className="flex items-center justify-center w-full mb-6 gap-6">
                <h1 className="text-2xl font-bold text-center">{LANG.EN.LOGIN}</h1>
            </div>
            <LoginForm onSubmit={handleOnSubmit} onSignUp={() => setLocation(ROUTES.SIGNUP)} />
        </div>
    );
}


export default Login;