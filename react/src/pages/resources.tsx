import { useState } from "react";
import Tabs from "../components/Tabs";
import ResourceForm from "../forms/resource";
import ServiceForm from "../forms/service";

const ResourceServiceForm = () => {
    const [activeTab, setActiveTab] = useState('Resource'); // Default to "Resource"

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    const onSubmit = (data) => {
        data.type = activeTab;
        console.log(data); // Log the submitted data
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <Tabs activeTab={activeTab} onTabSwitch={handleTabSwitch} />

            <h1 className="text-2xl font-bold text-center mb-6">{activeTab}</h1>

            {activeTab === 'Resource' ? (
                <ResourceForm onSubmit={onSubmit} />
            ) : (
                <ServiceForm onSubmit={onSubmit} />
            )}
        </div>
    );
};

export default ResourceServiceForm;