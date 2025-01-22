import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CONSTANTS, LANG } from '../utils/constants';
import { IResourceForm, ResourceRules } from './rules';

const ResourceForm = ({ onSubmit }) => {
    const { register, handleSubmit, reset, watch, control, clearErrors } = useForm<IResourceForm>();
    const { isSubmitSuccessful, isSubmitting, errors } = useFormState({ control });

    const tags = (watch('tags') || '').split(',').filter((tag) => tag.trim() !== '').slice(0, CONSTANTS.MAX_TAGS);

    useEffect(() => {
        if (isSubmitSuccessful) {
            clearErrors()
            reset()
        }
    }, [isSubmitSuccessful, reset]);

    const handleOnDeleteTag = (tag: string) => {
        const newTags = tags.filter((t) => t !== tag);
        reset({ tags: newTags.join(',') });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    id="title"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    {...register('title', ResourceRules.title)}
                />
                <label
                    htmlFor="title"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.RESOURCE}
                </label>
                <span className="text-sm text-red-400 mt-1 block min-h-[1.25rem]">
                    {errors.title?.message || '\u00A0'}
                </span>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    id="link"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    {...register('link', ResourceRules.link)}
                />
                <label
                    htmlFor="link"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.LINK}
                </label>
                <span className="text-sm text-red-400 mt-1 block min-h-[1.25rem]">
                    {errors.link?.message || '\u00A0'}
                </span>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    id="tags"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    {...register('tags', ResourceRules.tags)}
                />
                <label
                    htmlFor="tags"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.TAGS}
                </label>
                <p className={`mt-2 italic text-xs ${tags.length >= CONSTANTS.MAX_TAGS ? 'text-red-500' : 'text-gray-400'}`}>
                    {tags.length >= CONSTANTS.MAX_TAGS
                        ? `( ${LANG.EN.YOU_CAN_ONLY_ADD_UP_TO} ${CONSTANTS.MAX_TAGS} ${LANG.EN.TAGS} )`
                        : `( ${LANG.EN.YOU_CAN_ADD_UP_TO} ${CONSTANTS.MAX_TAGS - tags.length} ${LANG.EN.MORE_TAGS} )`}
                </p>
                <div className="mt-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            onClick={() => handleOnDeleteTag(tag)}
                            className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2 mb-2 cursor-pointer"
                        >
                            {tag} &times;
                        </span>
                    ))}
                </div>
            </div>
        

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-3">
                    {LANG.EN.DESCRIPTION}
                </label>
                <textarea
                    id="description"
                    rows={4}
                    className="bg-gray-800 block p-2.5 w-full text-sm rounded-lg border border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                    placeholder={LANG.EN.LEAVE_A_MESSAGE}
                    {...register('description', ResourceRules.description)}
                />
                <span className="text-sm text-red-400 mt-1 block min-h-[1.25rem]">
                    {errors.description?.message || '\u00A0'}
                </span>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    id="submitterEmail"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    {...register('submitterEmail', ResourceRules.submitterEmail)}
                />
                <label
                    htmlFor="submitterEmail"
                    className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {LANG.EN.EMAIL}
                </label>
                <p className="mt-2 italic text-xs text-gray-400">
                    ( {LANG.EN.EMAIL_NOTIFIED} )
                </p>
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
};

export default ResourceForm;
