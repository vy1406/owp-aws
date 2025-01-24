import { LANG } from "../../utils/constants";


const HowToFillSignUp = () => {
    return (
        <div className="space-y-6 text-gray-300">
            

            <div className="border-l-4 border-indigo-500 pl-4">
                <p>{LANG.EN.HOW_TO_SIGN_UP_UNIQUE_USERNAME}</p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
                <p>{LANG.EN.HOW_TO_SIGN_UP_PASSWORD}</p>
            </div>



        </div>
    );
};

export default HowToFillSignUp;
