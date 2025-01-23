import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from './Accordion';


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
        <div className={`mt-4 max-w-md p-1 border  rounded-lg shadow bg-gray-800 border-gray-700 w-full md:w-auto select-none random-card ${isOpen ? 'overflow-scroll' : 'overflow-hidden'}`}>
            <div
                className="flex px-2 justify-between items-center cursor-pointer "
                onClick={handleToggle}
            >
                <div className=" w-full">
                    <div
                        className="text-lg font-medium text-gray-200  whitespace-nowrap text-ellipsis pr-2"
                    >
                        {text}
                    </div>
                    {subText && (
                        <span
                            className="text-sm text-gray-200  whitespace-nowrap text-ellipsis block"
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
                className="transition-all duration-300 ease-in-out "
            >
                <div className="p-1 scroll-m-0">{children}</div>
            </div>
        </div>
    );
};

export default CollapseContainer;
