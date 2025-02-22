import { useLocation } from "wouter";
import { toast } from "react-toastify";
import HowTo from "../../components/HowTo";
import SignUpForm from "../../forms/signUp";
import { LANG, ROUTES } from "../../utils/constants";
import HowToFillSignUp from "./HowToFillSignUp";
import { ISignUpForm } from "../../forms/rules";
import { useContext } from "react";
import LoginContext from "../../services/context";
import { apiSignUp } from "../../services/auth";

const SignUp = () => {
    const [_, setLocation] = useLocation();
    const { login: ctxLogin } = useContext(LoginContext)
    
    const handleOnSubmit = async (data: ISignUpForm) => {
        const res = await apiSignUp(data);
        if ( res?.username ) {
            ctxLogin({
                token: res?.token || '',
                username: res?.username || 'N/A'
            });
            setLocation(ROUTES.HOME);
        } else {
            toast.error(res?.message);
        }
    }

    return (
        <div className="mt-4">
            <div className="flex items-center justify-center w-full mb-6">
                <h1 className="text-2xl font-bold ml-4 text-center w-full">{LANG.EN.SIGN_UP}</h1>
                <HowTo title={LANG.EN.HOW_IT_WORKS_TITLE}>
                    <HowToFillSignUp />
                </HowTo>
            </div>
            <SignUpForm onSubmit={handleOnSubmit} />
        </div>
    );
}


export default SignUp;