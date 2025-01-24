import LoginForm from "../../forms";
import { LANG, ROUTES } from "../../utils/constants";
import { useLocation } from "wouter";

const Login = () => {
    const [_, setLocation] = useLocation();

    const handleOnSubmit = async (data: any) => {
        return new Promise((resolve) => {
            console.log('Submitting data:', data);
            setTimeout(() => {
                console.log('Data submitted successfully');
                resolve();
            }, 3000);
        });
    }

    return (
        <div className="mt-4">
            <div className="flex items-center justify-center w-full mb-6 gap-6">
                <h1 className="text-2xl font-bold text-center">{LANG.EN.LOGIN}</h1>
            </div>
            <LoginForm onSubmit={handleOnSubmit} onSignUp={() => setLocation(ROUTES.SIGNUP)}/>
        </div>
    );
}


export default Login;