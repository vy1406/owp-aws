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
    const [filters, setFilters] = useState<IOnFilter>({ searchTerm: '', tags: '' });

    const handleOnTag = (tag: string) => {
        const filter = { searchTerm: '', tags: tag };
        setFilters(filter);
        handleOnFilter(filter);
    }


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
        setFilters(filter);
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
        <div className="flex justify-center w-full">
            <div className="w-full max-w-[500px] mx-auto p-4">
                <FilterSearch onFilter={handleOnFilter} filters={filters} />
                <Separtor />
                <Toggle activeTab={activeTab} onTabSwitch={(tab: string) => setActiveTab(tab)} />
                {isLoading ? (
                    <ul className="list-disc list-inside">
                        {[...Array(8)].map((_, index) => (<SkeletonCard key={index} />))}
                    </ul>
                ) : (
                    <>
                        {activeTab === RESOURCE_MAP.RESOURCE && <ResourceItems items={resources} onTag={handleOnTag} />}
                        {activeTab === RESOURCE_MAP.SERVICE && <ServiceItems items={services} onTag={handleOnTag} />}
                    </>
                )}
            </div>
        </div>
    );
};

export default ResourceList;

type ResourceItemsProps = {
    items: IResource[]
    onTag: (tag: string) => void
}

const ServiceItems = ({ items, onTag }: ResourceItemsProps) => {
    return (
        <ul className="list-disc list-inside">
            {items.length > 0 ? (
                items.map((resource: IResource) => (
                    <ResourceCard resource={resource} key={resource.id} onTag={onTag} />
                ))
            ) : (
                <div className="text-lg font-medium text-gray-200  whitespace-nowrap text-ellipsis mt-4"                >
                    {LANG.EN.NO_SERVICE_FOUND}
                </div>
            )}
        </ul>
    )
}

const ResourceItems = ({ items, onTag }: ResourceItemsProps) => {
    return (
        <ul className="list-disc list-inside">
            {items.length > 0 ? (
                items.map((resource: IResource) => (
                    <ResourceCard resource={resource} key={resource.id} onTag={onTag} />
                ))
            ) : (
                <div className="text-lg font-medium text-gray-200  whitespace-nowrap text-ellipsis mt-4"                >
                    {LANG.EN.NO_RESOURCE_FOUND}
                </div>
            )}
        </ul>
    )
}