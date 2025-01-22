import { useEffect, useState } from "react";
import { getResources } from "../services/resource";

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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Resource List</h1>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <ul className="list-disc list-inside">
                    {resources.length > 0 ? (
                        resources.map((resource) => (
                            <li key={resource.id} className="mb-2">
                                <strong>{resource.title}</strong> - {resource.description}
                            </li>
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
