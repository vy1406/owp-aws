import { format } from "date-fns";
import ApplicationForm from "../../forms/application";
import { LANG } from "../../utils/constants";
import { IApplicationForm } from "../../forms/rules";

const NewApplication = () => {

    const handleOnSubmit = async (data: any) => {
        return new Promise((resolve) => {
            console.log('Submitting data:', data);
            setTimeout(() => {
                console.log('Data submitted successfully');
                resolve();
            }, 3000);
        });
        // const formattedData = {
        //     ...data,
        //     application_date: format(new Date(data.application_date), 'yyyy-MM-dd'),
        //     biometric_date: format(new Date(data.biometric_date), 'yyyy-MM-dd'),
        //     decision_date: format(new Date(data.decision_date), 'yyyy-MM-dd'),
        // }
        // console.log(formattedData);

        // const token = localStorage.getItem('token');
        // const tempData = {
        //     additional_info: "this is my additional info",
        //     application_date: "2025-01-20",
        //     biometric_date: "2025-01-21",
        //     decision_date: "2025-01-22",
        //     is_self_submitted: true,
        //     status: "Pending",
        //     submission_city: "Calgary"
        // }

        // try {
        //     const response = await fetch('https://hglaoj2hgj.execute-api.us-east-1.amazonaws.com/prod/applications/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${token}`,
        //         },
        //         body: JSON.stringify(formattedData),
        //     });
        //     if (!response.ok) {
        //         throw new Error('Failed to submit form');
        //     }
        //     alert('Application created successfully!');
        // } catch (error) {
        //     console.error('Error:', error);
        //     alert('An error occurred. Please try again.');
        // }
    };

    return (
        <div className="mt-4">
            <div className="flex items-center justify-center w-full mb-6 gap-6">
                <h1 className="text-2xl font-bold text-center">{LANG.EN.CREATE_APPLICATION}</h1>
            </div>
            <ApplicationForm onSubmit={handleOnSubmit} />
        </div>
    );
}

export default NewApplication;