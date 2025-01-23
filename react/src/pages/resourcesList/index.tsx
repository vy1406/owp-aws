import { useEffect, useState } from "react";
import { getResources } from "../../services/resource";
import ResourceCard from "../../components/ResourceCard";
import { IResource } from "../../utils/types";
import SkeletonCard from "../../components/SkeletonCard";
import Toggle from "../../components/Toggle";
import FilterSearch from "./FilterSearch";
import { LANG, RESOURCE_MAP } from "../../utils/constants";

const Separtor = () => <div className="border-b-2 border-gray-800 my-4"></div>;

const ResourceList = () => {
    const [activeTab, setActiveTab] = useState('Resource');
    const [resources, setResources] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            const data = await getResources();
            if (data) {
                setResources(data.resources);
                setServices(data.services);
            }
            setLoading(false);
        };

        fetchResources();
    }, []);

    const handleOnFilter = (search: string) => {
        console.log('Filtering:', search);
    }
    
    return (
        <div className="container mx-auto p-2">
            <FilterSearch onFilter={handleOnFilter}/>
            <Separtor />
            <Toggle activeTab={activeTab} onTabSwitch={(tab: string) => setActiveTab(tab)} />
            {isLoading ? (
                <ul className="list-disc list-inside">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </ul>
            ) : (
                <>
                    {activeTab === RESOURCE_MAP.RESOURCE && <ResourceItems items={resources} />}
                    {activeTab === RESOURCE_MAP.SERVICE && <ServiceItems items={services} />}
                </>
            )}
        </div>
    );
};

export default ResourceList;

type ResourceItemsProps = {
    items: IResource[]
}

const ServiceItems = ({ items }: ResourceItemsProps) => {
    return (
        <ul className="list-disc list-inside">
            {items.length > 0 ? (
                items.map((resource: IResource) => (
                    <ResourceCard resource={resource} key={resource.id} />
                ))
            ) : (
                <p className="text-red-500">{LANG.EN.NO_SERVICE_FOUND}</p>
            )}
        </ul>
    )
}

const ResourceItems = ({ items }: ResourceItemsProps) => {
    return (
        <ul className="list-disc list-inside">
            {items.length > 0 ? (
                items.map((resource: IResource) => (
                    <ResourceCard resource={resource} key={resource.id} />
                ))
            ) : (
                <p className="text-red-500">{LANG.EN.NO_SERVICE_FOUND}</p>
            )}
        </ul>
    )
}