import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { getApplication, IApplication } from "../../services/applications";
import ApplicationForm from "../../forms/application";
import ApplicationFormSkeleton from "../../components/ApplicationSkeleton";

const Application = () => {
    const [application, setApplication] = useState<IApplication | null>(null);
    const [isLoading, setLoading] = useState(true);
    const location = useParams();

    useEffect(() => {
        const fetchApplication = async () => {
            setLoading(true);
            if (location.id) {
                const fetchedApplication = await getApplication(location.id);
                if (fetchedApplication) {
                    setApplication(fetchedApplication);
                }
            }
            setLoading(false);
        };
        fetchApplication();
    }, [location]);

    if (isLoading) {
        return <ApplicationFormSkeleton />;
    }

    return (
        <div className="max-w-2xl mx-auto mt-5">
            {application ? (
                <ApplicationForm onSubmit={(data) => console.log("Submitted data:", data)} application={application} />
            ) : (
                <p className="text-red-400">Application not found</p>
            )}
        </div>
    );
};

export default Application;
