import { toast } from "react-toastify";
import ApplicationForm from "../../forms/application";
import { IApplicationForm } from "../../forms/rules";
import { createApplication, IApplication } from "../../services/applications";
import { USER_KEY } from "../../services/context";
import { LANG, ROUTES } from "../../utils/constants";
import { useLocation } from "wouter";

const NewApplication = () => {
    const [_, setLocation] = useLocation();

    const handleOnSubmit = async (data: IApplicationForm) => {
        const username = localStorage.getItem(USER_KEY);
        const formattedData: IApplication = { ...data, username, }
        const res = await createApplication(formattedData);

        if ( res.id) {
            toast.success(LANG.EN.APPLICATION_CREATED_SUCCESS);
            setLocation(ROUTES.HOME);
        } else { 
            toast.error(res.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-5">
            <ApplicationForm onSubmit={handleOnSubmit} />
        </div>
    );
}

export default NewApplication;