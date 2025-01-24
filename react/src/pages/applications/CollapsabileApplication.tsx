import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from '../../components/Accordion';
import Status from './Status';
import { formatDateToDDMMYYYY } from '../../utils/dateUtils';


interface CollapsibleApplicationBoxProps {
    date: string;
    children: React.ReactNode;
    status: string;
}

const CollapsableApplication: React.FC<CollapsibleApplicationBoxProps> = ({ date, status, children }) => {
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
                <div className="overflow-hidden w-full flex">
                    <div
                        className={`tracking-wide w-1/2 text-lg pl-1 font-medium text-gray-200 ${!isOpen ? 'overflow-hidden whitespace-nowrap text-ellipsis pr-2' : 'pr-2'}`}
                    >
                        {formatDateToDDMMYYYY(date)}
                    </div>
                    <Status status={status}/>
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

export default CollapsableApplication;
