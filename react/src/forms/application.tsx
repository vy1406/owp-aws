import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { IApplicationForm, ApplicationRules } from './rules';
import { LANG, STATUS_MAP } from '../utils/constants';


type ApplicationFormProps = {
    onSubmit: (data: IApplicationForm) => void;
};

const DEFAULT_VALUS: IApplicationForm = {
    application_date: '',
    biometric_date: null,
    decision_date: null,
    additional_info: '',
    is_self_submitted: false,
    status: STATUS_MAP.PENDING, 
    submission_city: '',
}

const ApplicationForm = ({ onSubmit }: ApplicationFormProps) => {
    const { register, handleSubmit, reset, control, clearErrors } = useForm<IApplicationForm>({
        defaultValues: DEFAULT_VALUS
    });
    
    const { isSubmitSuccessful, isSubmitting, errors } = useFormState({ control });

    useEffect(() => {
        if (isSubmitSuccessful) {
            clearErrors()
            reset()
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="date"
                    id="application_date"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    {...register('application_date', ApplicationRules.application_date)}
                />
                <label
                    htmlFor="application_date"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.APPLICATION_DATE}
                </label>
                <span className="text-sm text-red-400 mt-1 block min-h-[1.25rem]">
                    {errors.application_date?.message || '\u00A0'}
                </span>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="date"
                    id="biometric_date"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    {...register('biometric_date', ApplicationRules.biometric_date)}
                />
                <label
                    htmlFor="biometric_date"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.BIOMETRIC_DATE}
                </label>
                <span className="text-sm text-red-400 mt-1 block min-h-[1.25rem]">
                    {errors.biometric_date?.message || '\u00A0'}
                </span>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="date"
                    id="decision_date"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    {...register('decision_date', ApplicationRules.decision_date)}
                />
                <label
                    htmlFor="decision_date"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.DECISION_DATE}
                </label>
                <span className="text-sm text-red-400 mt-1 block min-h-[1.25rem]">
                    {errors.decision_date?.message || '\u00A0'}
                </span>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    id="title"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    {...register('submission_city')}
                />
                <label
                    htmlFor="title"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.SUBMISSION_CITY}
                </label>
            </div>

            <div>
                <label htmlFor="additional_info" className="block text-sm font-medium text-gray-400 mb-3">
                    {LANG.EN.ADDITIONAL_INFO}
                </label>
                <textarea
                    id="additional_info"
                    rows={4}
                    className="bg-gray-800 block p-2.5 w-full text-sm rounded-lg border border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                    placeholder={LANG.EN.LEAVE_A_MESSAGE}
                    {...register('additional_info')}
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                    {LANG.EN.STATUS}
                </label>
                <div className="flex">
                    <div className="flex items-center me-4">
                        <input
                            id="pending"
                            type="radio"
                            value={STATUS_MAP.PENDING}
                            {...register('status')}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0  dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="pending" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {STATUS_MAP.PENDING}
                        </label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            id="approved"
                            type="radio"
                            value={STATUS_MAP.APPROVED}
                            {...register('status')}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="approved" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {STATUS_MAP.APPROVED}
                        </label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            id="declined"
                            type="radio"
                            value={STATUS_MAP.DECLINED}
                            {...register('status')}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="declined" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {STATUS_MAP.DECLINED}
                        </label>
                    </div>
                </div>
                <span className="text-sm text-red-400 mt-1 block min-h-[1.25rem]">
                    {errors.status?.message || '\u00A0'}
                </span>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center bg-indigo-800 text-white py-2 px-4 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                    }`}
            >
                {isSubmitting ? (
                    <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    LANG.EN.SUBMIT
                )}
            </button>
        </form>
    );
}

export default ApplicationForm;