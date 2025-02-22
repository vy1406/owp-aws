import ApplicationForm from "../../forms/application";
import { IApplicationForm } from "../../forms/rules";
import { formatDateToDDMMYYYY } from "../../utils/dateUtils";

const NewApplication = () => {
    const handleOnSubmit = async (data: IApplicationForm) => {

        const formattedData = {
            ...data,
            application_date: formatDateToDDMMYYYY(data.application_date),
            biometric_date: formatDateToDDMMYYYY(data.biometric_date),
            decision_date: formatDateToDDMMYYYY(data.decision_date),
        }
        console.log(formattedData);
        // return new Promise<void>((resolve) => {
        //     console.log('Submitting data:', data);
        //     setTimeout(() => {
        //         console.log('Data submitted successfully');
        //         resolve();
        //     }, 3000);
        // });
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
        <div className="max-w-2xl mx-auto mt-5">
            <ApplicationForm onSubmit={handleOnSubmit} />
        </div>
    );
}

export default NewApplication;