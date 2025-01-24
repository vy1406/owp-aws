import { IApplication } from "../../services/applications";
import { LANG, STATUS_MAP } from "../../utils/constants";
import { calculateDaysDifference, calculateDaysSinceDate } from "../../utils/dateUtils";

const Counters = ({ application }: { application: IApplication }) => {


    if ( application.status === STATUS_MAP.APPROVED ) {
        return (
                <div className="flex">
                    <div className="text-gray-200 w-3/5">{LANG.EN.FROM_APPLY_TO_DECISION}:</div>
                    <div className="text-gray-200 ">{calculateDaysDifference(application.application_date, application.decision_date)}</div>
                </div>
        )
    }

    return (
           <>
                <div className="flex">
                    <div className="text-gray-200 w-3/5">{LANG.EN.WAITING_SINCE_APPLICATION}:</div>
                    <div className="text-gray-200 ">{calculateDaysSinceDate(application.application_date)}</div>
                </div>
                <div className="flex">
                    <div className="text-gray-200 w-3/5">{LANG.EN.WAITING_SINCE_BIOMETRIC}:</div>
                    <div className="text-gray-200">{calculateDaysSinceDate(application.biometric_date)}</div>
                </div>

            </>
    )
}

export default Counters;