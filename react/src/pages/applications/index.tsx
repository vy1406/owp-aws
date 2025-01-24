import { useEffect, useState } from "react";
import SkeletonCard from "../../components/SkeletonCard";
import FilterSearch, { IOnFilter } from "./FilterSearch";
import { LANG } from "../../utils/constants";
import Separtor from "../../components/Separator";
import { getApplications, IApplication } from "../../services/applications";
import ApplicationCard from "./ApplicationCard";

const ResourceList = () => {
    const [apiApplications, setApiApplications] = useState<IApplication[]>([]);
    const [filteredApplications, setFilteredApplications] = useState<IApplication[]>([]);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            const data = await getApplications();
            if (data) {
                setApiApplications(data);
                setFilteredApplications(data)
            }
            setLoading(false);
        };

        fetchResources();
    }, []);

    const handleOnFilter = (filter: IOnFilter) => {
        console.log('Filter:', filter);

        const filteredData = apiApplications.filter((application) => {
            const isDateFromValid = filter.dateFrom ? new Date(application.application_date) >= new Date(filter.dateFrom) : true;
            const isDateToValid = filter.dateTo ? new Date(application.application_date) <= new Date(filter.dateTo) : true;
            const isSubmissionCityValid = filter.submission_city
                ? application.submission_city.toLowerCase().includes(filter.submission_city.toLowerCase())
                : true;
            const isStatusValid = filter.status ? application.status.toLowerCase() === filter.status.toLowerCase() : true;
            const isAdditionalInfoValid = filter.additional_info
                ? application.additional_info.toLowerCase().includes(filter.additional_info.toLowerCase())
                : true;

            return isDateFromValid && isDateToValid && isSubmissionCityValid && isStatusValid && isAdditionalInfoValid;
        });

        setFilteredApplications(filteredData);
    }

    return (
        <div className="container mx-auto p-2">
            <FilterSearch onFilter={handleOnFilter} />
            <Separtor />
            {isLoading ? (
                <ul className="list-disc list-inside">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </ul>
            ) : (
                <>
                    <ul className="list-disc list-inside">
                        {filteredApplications.length > 0 ? (
                            filteredApplications.map((application: IApplication) => (
                                <ApplicationCard application={application} key={application.id} />
                            ))
                        ) : (
                            <div className="text-lg font-medium text-gray-200  whitespace-nowrap text-ellipsis mt-4"                >
                                {LANG.EN.NO_APPLICATION_FOUND}
                            </div>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ResourceList;

