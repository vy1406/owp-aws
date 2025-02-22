import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { getApplication, IApplication } from "../../services/applications";
import ApplicationForm from "../../forms/application";
import ApplicationFormSkeleton from "../../components/ApplicationSkeleton";
import { toast } from "react-toastify";

const Application = () => {
    const [application, setApplication] = useState<IApplication | null>(null);
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchApplication = async () => {
            if (!id) return;
            setLoading(true);
            if (id) {
                const fetchedApplication = await getApplication(id);
                if (fetchedApplication.application) {
                    setApplication(fetchedApplication.application);
                } else {
                    toast.error(fetchedApplication.message);
                }
            }
            setLoading(false);
        };
        fetchApplication();
    }, [id]);

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
