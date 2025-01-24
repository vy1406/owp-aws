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
            console.log('Data:', data);
            setLoading(false);
        };

        fetchResources();
    }, []);

    const handleOnFilter = (filter: IOnFilter) => {
     
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

