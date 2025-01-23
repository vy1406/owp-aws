import { useEffect, useState } from "react";
import { getResources } from "../../services/resource";
import ResourceCard from "../../components/ResourceCard";
import { IResource } from "../../utils/types";
import SkeletonCard from "../../components/SkeletonCard";
import Toggle from "../../components/Toggle";

const ResourceList = () => {
    const [activeTab, setActiveTab] = useState('Resource');
    const [resources, setResources] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            const data = await getResources();
            if (data) {
                setResources(data.resources);
            }
            setLoading(false);
        };

        fetchResources();
    }, []);

    return (
        <div className="container mx-auto p-2">
                <Toggle activeTab={activeTab} onTabSwitch={(tab: string) => setActiveTab(tab)} />


            {isLoading ? (
                <ul className="list-disc list-inside">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </ul>
            ) : (
                <ul className="list-disc list-inside">
                    {resources.length > 0 ? (
                        resources.map((resource: IResource) => (
                            <ResourceCard resource={resource} key={resource.id} />
                        ))
                    ) : (
                        <p className="text-red-500">No resources found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ResourceList;
