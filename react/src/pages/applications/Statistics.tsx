
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
import { LANG, STATUS_MAP } from '../../utils/constants';
import Separtor from './Separator';
import GoThereLink from '../../components/GoThereLink';


interface StatisticsProps {
    applications: IApplication[];
}

const Statistics: React.FC<StatisticsProps> = ({ applications }) => {
    const [isOpen, setIsOpen] = useState(false);

    const fastestApplication = findFastestApplication(applications);
    const longestApplication = findLongestApplication(applications);
    const longestPendingApplication = findLongestPendingApplication(applications);

    const { averageDays: averageApprovedDays, total: totalApproved } = calculateAverageDays(applications, STATUS_MAP.APPROVED);
    const { averageDays: averagePendingDays, total: totalPending } = calculateAveragePendingDays(applications);

    return (
        <CollapseContainer text={LANG.EN.STATISTICS} isOpen={isOpen} toggleIsOpen={(isOpen) => setIsOpen(isOpen)}>
            <div className="bg-gray-800 text-white p-4 rounded-lg space-y-4">
                {fastestApplication &&
                       <div className="flex justify-between">
                        <div className="text-gray-200 w-2/5">Fastest Approved:</div>
                        <div className="text-gray-200 ">{fastestApplication.days} days</div>
                        <GoThereLink link='#'/>
                    </div>
                }
                {longestApplication &&
                    <div className="flex justify-between">
                        <div className="text-gray-200 w-2/5">Longest Approved:</div>
                        <div className="text-gray-200 ">{longestApplication.days} days</div>
                        <GoThereLink link='#'/>
                    </div>
                }
                {longestPendingApplication &&
                    <div className="flex justify-between">
                        <div className="text-gray-200 w-2/5">Longest Pending:</div>
                        <div className="text-gray-200 ">{longestPendingApplication.days} days</div>
                        <GoThereLink link='#'/>
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
