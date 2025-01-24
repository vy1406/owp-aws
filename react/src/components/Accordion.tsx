import React, { useState, useRef, useEffect } from 'react';

interface ChevronDownProps {
    isOpen: boolean;
    className?: string;
}

export const ChevronDown: React.FC<ChevronDownProps> = ({ isOpen, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                } ${className}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
};


interface CollapsibleApplicationBoxProps {
    text: string;
    subText?: string;
    children: React.ReactNode;
}

const CollapseContainer: React.FC<CollapsibleApplicationBoxProps> = ({ text, subText = null, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('0px');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setHeight(isOpen ? `${contentRef.current?.scrollHeight}px` : '0px');
    }, [isOpen]);

    return (
        <div className="mt-4 overflow-hidden max-w-md p-2 border  rounded-lg shadow bg-gray-800 border-gray-700 w-full md:w-auto select-none random-card">
            <div
                className="flex justify-between p-0 cursor-pointer "
                onClick={handleToggle}
            >
                <div className="overflow-hidden w-full">
                    <div
                        className={`text-lg pl-1 font-medium text-gray-200 ${!isOpen ? 'overflow-hidden whitespace-nowrap text-ellipsis pr-2' : 'pr-2'}`}
                    >
                        {text}
                    </div>
                    {subText && (
                        <span
                            className="text-sm text-gray-200 overflow-hidden whitespace-nowrap text-ellipsis block"
                        >
                            {subText}
                        </span>
                    )}
                </div>
                <ChevronDown isOpen={isOpen} className="text-gray-200" />
            </div>

            <div
                ref={contentRef}
                style={{ height }}
                className="transition-all duration-300 ease-in-out overflow-hidden"
            >
                <div className="p-1">{children}</div>
            </div>
        </div>
    );
};

export default CollapseContainer;
