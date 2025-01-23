import { useState, useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import { LANG } from '../utils/constants';
type HelpIconProps = {
    children: React.ReactNode;
    title: string;
};

const HowTo = ({ children, title }: HelpIconProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const howToRef = useRef(null);
    useClickOutside(howToRef, () => setIsOpen(false));


    return (
        <div>
            <div
                className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-gray-600 hover:text-gray-800 hover:border-gray-600 transition-all"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#4f46e5" strokeWidth="1.5" />
                    <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round" />
                    <circle cx="12" cy="16" r="1" fill="#4f46e5" />
                </svg>
            </div>

            {isOpen &&
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center ">
                    <div ref={howToRef} className=" rounded-lg shadow-lg p-4 w-[90%] max-w-screen-md bg-gray-800">
                        <h2 className="text-lg font-semibold mb-3">{title}</h2>
                        <div className='max-h-80 overflow-y-auto'>
                            {children}
                        </div>
                        <div className='flex justify-center mt-4'>
                            <button
                                className={"bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-indigo-700"}
                                onClick={() => setIsOpen(false)}
                            >
                                {LANG.EN.GOT_IT}
                            </button>
                        </div>
                    </div>
                </div>

            }
        </div>
    );
};

export default HowTo;
