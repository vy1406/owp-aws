import { useState } from "react";
import ResourceForm from "../../forms/resource";
import Toggle from "../../components/Toggle";
import HowTo from "../../components/HowTo";
import { LANG, RESOURCE_MAP } from "../../utils/constants";
import HowToFillResource from "./HowToFillResource";
import { IResourceForm } from "../../forms/rules";
import WithAuth from "../../components/WithAuth";

const ResourceServiceForm = () => {
    const [activeTab, setActiveTab] = useState(RESOURCE_MAP.RESOURCE);


    const onSubmit = async (data: IResourceForm) => {

        return new Promise<void>((resolve) => {
            console.log('Submitting data:', data);
            setTimeout(() => {
                console.log('Data submitted successfully');
                resolve();
            }, 3000);
        });
        // const id = uuidv4();
        // data.id = id;
        // data.type = activeTab;
        // const payload = {
        //     id,
        //     type: activeTab,
        //     ...data,
        // }
        // const url = "https://qn6tw91djc.execute-api.us-east-1.amazonaws.com/states/execution"
        // try {
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         body: JSON.stringify(payload),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (response.ok) {
        //         console.log('Data successfully submitted');
        //     } else {
        //         console.error('Failed to submit data', response.statusText);
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }

    };

    return (
        <WithAuth>      
            <div className="max-w-md mx-auto p-2">
                
                <div className="flex items-center justify-center w-full mb-6">
                    <Toggle activeTab={activeTab} onTabSwitch={(tab: string) => setActiveTab(tab)} />
                    <HowTo title={LANG.EN.HOW_RESOURCE_WORK}>
                        <HowToFillResource />
                    </HowTo>
                </div>
                
                <ResourceForm onSubmit={onSubmit} type={activeTab}/>
            </div>
        </WithAuth>
    );
};

export default ResourceServiceForm;