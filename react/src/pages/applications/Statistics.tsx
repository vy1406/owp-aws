
import React, { useState } from 'react';
import {
    calculateAverageDays,
    calculateAveragePendingDays,
    findFastestApplication,
    findLongestApplication,
    findLongestPendingApplication
} from './utils';
import CollapseContainer from '../../components/CollapseContainer';
import { IApplication } from '../../services/applications';
import { LANG, ROUTES, STATUS_MAP } from '../../utils/constants';
import Separtor from './Separator';
import GoThereLink from '../../components/GoThereLink';
import { useLocation } from 'wouter';

interface StatisticsProps {
    applications: IApplication[];
}

const Statistics: React.FC<StatisticsProps> = ({ applications }) => {
    const [isOpen, setIsOpen] = useState(false);
   const [_, setLocation] = useLocation();

    const handleOnClick = (applicationId: string) => {
        setLocation(ROUTES.APPLICATION.replace(":id", applicationId));
    }
    const fastestApplication = findFastestApplication(applications);
    const longestApplication = findLongestApplication(applications);
    const longestPendingApplication = findLongestPendingApplication(applications);

    const { averageDays: averageApprovedDays, total: totalApproved } = calculateAverageDays(applications, STATUS_MAP.APPROVED);
    const { averageDays: averagePendingDays, total: totalPending } = calculateAveragePendingDays(applications);

    return (
        <CollapseContainer text={LANG.EN.STATISTICS} isOpen={isOpen} toggleIsOpen={(isOpen) => setIsOpen(isOpen)}>
            <div className="bg-gray-800 text-white p-2 rounded-lg space-y-4">
                {fastestApplication &&
                       <div className="flex justify-between">
                        <div className="text-gray-200 w-2/5">Fastest Approved:</div>
                        <div className="text-gray-200 ">{fastestApplication.days} days</div>
                        <GoThereLink onClick={() => handleOnClick(fastestApplication.app.id!)}/>
                    </div>
                }
                {longestApplication &&
                    <div className="flex justify-between">
                        <div className="text-gray-200 w-2/5">Longest Approved:</div>
                        <div className="text-gray-200 ">{longestApplication.days} days</div>
                        <GoThereLink onClick={() => handleOnClick(longestApplication.app.id!)}/>
                    </div>
                }
                {longestPendingApplication &&
                    <div className="flex justify-between">
                        <div className="text-gray-200 w-2/5">Longest Pending:</div>
                        <div className="text-gray-200 ">{longestPendingApplication.days} days</div>
                        <GoThereLink onClick={() => handleOnClick(longestPendingApplication.app.id!)}/>
                    </div>
                }
                <Separtor />
                {averageApprovedDays &&
                    <div className="flex justify-between">
                        <div className="text-gray-200 w-2/5">Avg Approved:</div>
                        <div className="text-gray-200 ">{averageApprovedDays} days</div>
                        <div className="text-gray-200 ">({totalApproved})</div>
                    </div>
                }
                {averageApprovedDays &&
                    <div className="flex justify-between">
                        <div className="text-gray-200 w-2/5">Avg Pending:</div>
                        <div className="text-gray-200 ">{averagePendingDays} days</div>
                        <div className="text-gray-200 ">({totalPending})</div>
                    </div>
                }
            </div>
        </CollapseContainer>
    );
};

export default Statistics;
