import { useEffect, useState } from "react";
import { getResources, IResourceData } from "../../services/resource";
import ResourceCard from "../../components/ResourceCard";
import { IResource } from "../../utils/types";
import SkeletonCard from "../../components/SkeletonCard";
import Toggle from "../../components/Toggle";
import FilterSearch, { IOnFilter } from "./FilterSearch";
import { LANG, RESOURCE_MAP } from "../../utils/constants";
import Separtor from "../../components/Separator";

const ResourceList = () => {
    const [activeTab, setActiveTab] = useState('Resource');
    const [apiResponse, setApiResponse] = useState<IResourceData>({ resources: [], services: [] });
    const [resources, setResources] = useState<IResource[]>([]);
    const [services, setServices] = useState<IResource[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            const data = await getResources();
            if (data) {
                setApiResponse(data);
                setResources(data.resources);
                setServices(data.services);
            }
            setLoading(false);
        };

        fetchResources();
    }, []);

    const handleOnFilter = (filter: IOnFilter) => {
        const { searchTerm, tags } = filter;
        const tagList = tags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag !== '');

        const filterItems = (items: IResource[]): IResource[] => {
            return items.filter((item: IResource) => {
                const matchesSearchTerm =
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase());

                const itemTags = item.tags?.toLowerCase().split(',').map(tag => tag.trim());

                const matchesTags = tagList.length === 0 || tagList.some(tag =>
                    itemTags?.some(itemTag => itemTag.includes(tag))
                );

                return matchesSearchTerm && matchesTags;
            });
        };

        setResources(filterItems(apiResponse.resources || []));
        setServices(filterItems(apiResponse.services || []));
    }

    return (
        <div className="container mx-auto p-2">
            <FilterSearch onFilter={handleOnFilter} />
            <Separtor />
            <Toggle activeTab={activeTab} onTabSwitch={(tab: string) => setActiveTab(tab)} />
            {isLoading ? (
                <ul className="list-disc list-inside">
                    {[...Array(8)].map((_, index) => (<SkeletonCard key={index} />))}
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
                <div className="text-lg font-medium text-gray-200  whitespace-nowrap text-ellipsis mt-4"                >
                    {LANG.EN.NO_SERVICE_FOUND}
                </div>
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
                <div className="text-lg font-medium text-gray-200  whitespace-nowrap text-ellipsis mt-4"                >
                    {LANG.EN.NO_RESOURCE_FOUND}
                </div>
            )}
        </ul>
    )
}