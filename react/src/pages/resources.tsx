import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Tabs from "../components/Tabs";
import ResourceForm from "../forms/resource";
import ServiceForm from "../forms/service";

const ResourceServiceForm = () => {
    const [activeTab, setActiveTab] = useState('Resource'); // Default to "Resource"

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    const onSubmit = async (data) => {
        const id = uuidv4();
        data.id = id;
        data.type = activeTab;
        const payload = {
            id,
            type: activeTab,
            ...data,
        }
        const url = "https://zdv7d0sic9.execute-api.us-east-1.amazonaws.com/states/execution"
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Data successfully submitted');
            } else {
                console.error('Failed to submit data', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }

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