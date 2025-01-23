import { LANG, RESOURCE_MAP } from "../utils/constants";

type ToggleProps = {
    activeTab: string
    onTabSwitch: (tab: string) => void
};

const Toggle = ({ activeTab, onTabSwitch }: ToggleProps) => {
    const isResource = activeTab === RESOURCE_MAP.RESOURCE;

    return (
        <div className="flex items-center justify-center w-full mb-6">
            <label className="flex items-center cursor-pointer">
                <span className={`mr-3 text-lg font-medium ${isResource ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {LANG.EN.RESOURCE}
                </span>

                <div className="relative">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={!isResource}
                        onChange={() => onTabSwitch(isResource ? RESOURCE_MAP.SERVICE : RESOURCE_MAP.RESOURCE)}
                    />
                    <div className="w-12 h-6 bg-white rounded-full shadow-inner transition-all"></div>
                    <div
                        className={`dot absolute w-6 h-6 bg-indigo-600 rounded-full shadow top-0 left-0 transition ${
                            isResource ? 'translate-x-0 bg-indigo-600' : 'translate-x-full bg-indigo-600'
                        }`}
                    ></div>
                </div>

                <span className={`ml-3 text-lg font-medium ${!isResource ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {LANG.EN.SERVICE}
                </span>
            </label>
        </div>
    );
};

export default Toggle;
