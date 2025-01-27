import { useLocation } from "wouter";
import HowTo from "../../components/HowTo";
import SignUpForm from "../../forms/signUp";
import { LANG, ROUTES } from "../../utils/constants";
import HowToFillSignUp from "./HowToFillSignUp";

const SignUp = () => {
    const [_, setLocation] = useLocation();
    
    const handleOnSubmit = async (data: any) => {
        return new Promise((resolve) => {
            console.log('Submitting data:', data);
            setTimeout(() => {
                console.log('Data submitted successfully');
                setLocation(ROUTES.LOGIN)
            }, 3000);
        });
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