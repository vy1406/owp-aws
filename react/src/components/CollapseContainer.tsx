import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from './Accordion';


interface CollapsibleApplicationBoxProps {
    text: string;
    subText?: string;
    isOpen: boolean;
    children: React.ReactNode;
    toggleIsOpen: (isOpen: boolean) => void;
}
const CollapseContainer: React.FC<CollapsibleApplicationBoxProps> = ({ text, subText = null, children, isOpen, toggleIsOpen }) => {
    const [height, setHeight] = useState(isOpen ? "auto" : "0px");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setHeight(`${contentRef.current?.scrollHeight}px`);
        } else {
            setHeight("0px");
        }
    }, [isOpen]);

    return (
        <div className="mt-4 p-1 border rounded-lg shadow bg-gray-800 border-gray-700 w-full max-w-[500px] overflow-hidden">
            <div
                className="flex px-2 justify-between items-center cursor-pointer"
                onClick={() => toggleIsOpen(!isOpen)}
            >
                <div className="w-full">
                    <div className="text-lg font-medium text-gray-200 truncate pr-2">
                        {text}
                    </div>
                    {subText && (
                        <span className="text-sm text-gray-200 block">
                            {subText}
                        </span>
                    )}
                </div>
                <ChevronDown isOpen={isOpen} className="text-gray-200" />
            </div>

            <div
                ref={contentRef}
                style={{ height }}
                className={`transition-all duration-300 ease-in-out overflow-hidden`}
            >
                <div className="p-2">{children}</div>
            </div>
        </div>
    );
};


export default CollapseContainer;
