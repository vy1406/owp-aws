import { useEffect, useState } from "react";
import { getResources } from "../services/resource";
import ResourceCard from "../components/ResourceCard";
import { IResource } from "../utils/types";

const ResourceList = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <h1 className="text-2xl font-bold mb-2">Resource List</h1>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <ul className="list-disc list-inside">
                    {resources.length > 0 ? (
                        resources.map((resource: IResource) => (
                            <ResourceCard resource={resource} key={resource.id}/>
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
