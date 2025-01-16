import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const STATUS_MAP = {
    Pending: 'Pending',
    Rejected: 'Rejected',
    Approved: 'Approved',
};

export default function ApplicationForm() {
    const [isSelfSubmitted, setIsSelfSubmitted] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const handleGetAll = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://hglaoj2hgj.execute-api.us-east-1.amazonaws.com/prod/applications', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            const result = await response.json();
            console.log('Test endpoint result:', result);
            alert('Application created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    const addOneDummy = async () => {
        const token = localStorage.getItem('token');

        const generatedindex = Math.floor(Math.random() * 1000);
        const body = {
            additional_info: "additional generated:" + generatedindex,
            application_date: "2025-01-01",
            biometric_date: "2025-01-16",
            decision_date: "2025-01-21",
            is_self_submitted: true,
            status: "Pending",
            submission_city: "Calgary"
        }

        try {
            const response = await fetch('https://hglaoj2hgj.execute-api.us-east-1.amazonaws.com/prod/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to submit form');
            }
            const result = await response.json();
            console.log('Test endpoint result:', result);
            alert('Application created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    const onSubmit = async (data) => {
        console.log(data);

        const tempData = {
            additional_info: "this is my additional info",
            application_date: "2025-01-01",
            biometric_date: "2025-01-16",
            decision_date: "2025-01-21",
            is_self_submitted: true,
            status: "Pending",
            submission_city: "Calgary"
        }

        try {
            const response = await fetch('https://dummyapi.com/api/application/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            alert('Application created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Create an Application</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="application_date" className="block text-sm font-medium text-gray-700">Application Date</label>
                    <input
                        id="application_date"
                        type="date"
                        {...register('application_date', { required: true })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="biometric_date" className="block text-sm font-medium text-gray-700">Biometric Date</label>
                    <input
                        id="biometric_date"
                        type="date"
                        {...register('biometric_date')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="decision_date" className="block text-sm font-medium text-gray-700">Decision Date</label>
                    <input
                        id="decision_date"
                        type="date"
                        {...register('decision_date')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="submission_city" className="block text-sm font-medium text-gray-700">Submission City</label>
                    <input
                        id="submission_city"
                        type="text"
                        {...register('submission_city', { required: true })}
                        placeholder="Enter submission city"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="additional_info" className="block text-sm font-medium text-gray-700">Additional Info</label>
                    <textarea
                        id="additional_info"
                        {...register('additional_info')}
                        placeholder="Enter additional info"
                        maxLength={254}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        {...register('status', { required: true })}
                        defaultValue={STATUS_MAP.Pending}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={STATUS_MAP.Pending}>{STATUS_MAP.Pending}</option>
                        <option value={STATUS_MAP.Rejected}>{STATUS_MAP.Rejected}</option>
                        <option value={STATUS_MAP.Approved}>{STATUS_MAP.Approved}</option>
                    </select>
                </div>
                <div>
                    <label className="flex items-center text-sm">
                        <input
                            type="checkbox"
                            {...register('is_self_submitted')}
                            checked={isSelfSubmitted}
                            onChange={() => setIsSelfSubmitted(!isSelfSubmitted)}
                            className="mr-2"
                        />
                        Self submitted (No counselor)
                    </label>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
            <button onClick={handleGetAll}>
                test get all
            </button>
            <div>----</div>
            <button onClick={addOneDummy}>
                test add dummy
            </button>
        </div>
    );
}
