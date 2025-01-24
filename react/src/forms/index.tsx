import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { LANG } from '../utils/constants';
import { ILoginForm, LoginRules } from './rules';


type ApplicationFormProps = {
    onSubmit: (data: ILoginForm) => void;
    onSignUp: () => void;
};

const DEFAULT_VALUS: ILoginForm = {
    username: '',
    password: '',
}

const LoginForm = ({ onSubmit, onSignUp }: ApplicationFormProps) => {
    const { register, handleSubmit, reset, control, clearErrors } = useForm<ILoginForm>({
        defaultValues: DEFAULT_VALUS
    });
    
    const { isSubmitSuccessful, isSubmitting, errors } = useFormState({ control });

    useEffect(() => {
        if (isSubmitSuccessful) {
            clearErrors()
            reset()
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    id="username"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    {...register('username', LoginRules.username)}
                />
                <label
                    htmlFor="username"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.USERNAME}
                </label>
                <span className="text-sm text-red-400 mt-1 block min-h-[1.25rem]">
                    {errors.username?.message || '\u00A0'}
                </span>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="password"
                    id="password"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    {...register('password', LoginRules.password)}
                />
                <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.PASSWORD}
                </label>
                <span className="text-sm text-red-400 mt-1 block min-h-[1.25rem]">
                    {errors.password?.message || '\u00A0'}
                </span>
            </div>


            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center bg-indigo-800 text-white py-2 px-4 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                    }`}
            >
                {isSubmitting ? (
                    <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    LANG.EN.LOGIN
                )}
            </button>
            <button
                type="button"
                className="w-full flex justify-center items-center bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                onClick={onSignUp}
            >
                {LANG.EN.SIGN_UP}
            </button>
        </form>
    );
}

export default LoginForm;