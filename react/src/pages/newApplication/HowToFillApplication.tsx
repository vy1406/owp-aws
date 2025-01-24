import { LANG } from "../../utils/constants";


const HowToFillApplication = () => {
    return (
        <div className="space-y-6 text-gray-300">
            
            <div className="border-l-4 border-indigo-500 pl-4">
                <p>
                    {LANG.EN.RESOURCE_WALKTHROUGH[0]}<span className="font-semibold ">{LANG.EN.RESOURCE_WALKTHROUGH[1]}</span>. 
                    {LANG.EN.RESOURCE_WALKTHROUGH[2]}<span className="font-semibold ">{LANG.EN.RESOURCE_WALKTHROUGH[3]}</span> 
                    {LANG.EN.RESOURCE_WALKTHROUGH[4]}
                </p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
                <span className="text-md font-semibold">{LANG.EN.TITLE}</span>
                <p>{LANG.EN.TITLE_SEEN_FIRST}</p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
                <span className="text-md font-semibold">{LANG.EN.DESCRIPTION}</span>
                <p>
                    {LANG.EN.DESCRIPTION_RESOURCE}<br />
                    <span className="italic text-gray-400">{LANG.EN.EXAMPLE_RESOURCE_DESCRIPTION}</span>
                </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
                <span className="text-md font-semibold">{LANG.EN.EMAIL}</span>
                <p> {LANG.EN.EMAIL_RESOURCE}</p>

            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
                <span className="text-md font-semibold">{LANG.EN.LINK}</span>
                <p>{LANG.EN.LINK_RESOURCE_DESCRIPTION}</p>
            </div>
        </div>
    );
};

export default HowToFillApplication;
