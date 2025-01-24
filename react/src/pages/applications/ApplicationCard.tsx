import { IApplication } from "../../services/applications";
import { LANG } from "../../utils/constants";
import { formatDateToDDMMYYYY } from "../../utils/dateUtils";
import CollapsableApplication from "./CollapsabileApplication";
import Counters from "./Counters";
import Separtor from "./Separator";

const ApplicationCard = ({ application }: { application: IApplication }) => {

    return (
        <CollapsableApplication status={application.status} date={application.application_date}>
           <div className="flex flex-col gap-1 mt-2">
                <div className="flex">
                    <div className="text-gray-200 w-2/5">{LANG.EN.APPLICATION_DATE}:</div>
                    <div className="text-gray-200 ">{formatDateToDDMMYYYY(application.application_date)}</div>
                </div>
                <div className="flex">
                    <div className="text-gray-200 w-2/5">{LANG.EN.BIOMETRIC_DATE}:</div>
                    <div className="text-gray-200">{formatDateToDDMMYYYY(application.biometric_date)}</div>
                </div>
                <div className="flex">
                    <div className="text-gray-200 w-2/5">{LANG.EN.DECISION_DATE}:</div>
                    <div className="text-gray-200 ">{formatDateToDDMMYYYY(application.decision_date)}</div>
                </div>
                <Separtor />
                <div className="flex">
                    <div className="text-gray-200 w-2/5">{LANG.EN.SUBMISSION_CITY}:</div>
                    <div className="text-gray-200">{application.submission_city}</div>
                </div>
                <div className="flex">
                    <div className="text-gray-200 w-2/5">{LANG.EN.SELF_SUBMISSION}:</div>
                    <div className="text-gray-200">{application.is_self_submitted ? LANG.EN.YES : LANG.EN.NO}</div>
                </div>
                <Separtor />             
                {application.additional_info && <div className="flex flex-col gap-1">
                    <div className="text-gray-200">{LANG.EN.ADDITIONAL_INFO}:</div>
                    <div className="text-gray-200">{application.additional_info}</div>
                </div>}
                <Separtor />
                <Counters application={application}/>
                <div className="text-gray-200 italic text-right">({application.username})</div>
            </div>
        </CollapsableApplication>
    )
}

export default ApplicationCard;