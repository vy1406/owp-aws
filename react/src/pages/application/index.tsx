import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { deleteApplication, getApplication, IApplication, updateApplication } from "../../services/applications";
import ApplicationForm from "../../forms/application";
import ApplicationFormSkeleton from "../../components/ApplicationSkeleton";
import { toast } from "react-toastify";
import { IApplicationForm } from "../../forms/rules";
import { LANG, ROUTES } from "../../utils/constants";

const Application = () => {
    const [_, setLocation] = useLocation();
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

    const handleOnDelete = async () => {
        if ( !id ) return;

        const response = await deleteApplication(id);

        if (response.status === 401) {
            toast.error(LANG.EN.UNAUTHORIZED);
            setTimeout(() => setLocation(ROUTES.LOGIN), 2000);
            return;
        }
        if (response.status === 200) {
            toast.success(response.message);
            setTimeout(() => setLocation(ROUTES.HOME), 2000);
        } else {
            toast.error(response.message);
        }
    }

    const handleOnUpdate = async (data: IApplicationForm) => {
        const response = await updateApplication({ ...data, id, });

        if (response.status === 401) {
            toast.error(LANG.EN.UNAUTHORIZED);
            setTimeout(() => setLocation(ROUTES.LOGIN), 2000);
            return;
        }
        if (response.application) {
            toast.success(LANG.EN.APPLICATION_UPDATE_SUCCESS);
            setApplication(response.application);
        } else {
            toast.error(LANG.EN.ERROR_UPDATE_APPLICATION);
        }
    }

    if (isLoading) {
        return <ApplicationFormSkeleton />;
    }

    return (
        <div className="max-w-2xl mx-auto mt-5">
            {application ? (
                <ApplicationForm
                    onSubmit={handleOnUpdate}
                    application={application}
                    onDelete={handleOnDelete}
                />
            ) : (
                <p className="text-red-400">Application not found</p>
            )}
        </div>
    );
};

export default Application;
