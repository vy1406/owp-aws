import { useForm } from 'react-hook-form';

const ServiceForm = ({ onSubmit }) => {
    const { register, handleSubmit, reset, watch } = useForm();
    const tags = watch('tags', '').split(',').filter((tag) => tag.trim() !== '').slice(0, 10);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    maxLength={50}
                    {...register('title')}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    maxLength={200}
                    {...register('description')}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                <input
                    type="url"
                    id="link"
                    {...register('link')}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (max 10)</label>
                <input
                    type="text"
                    id="tags"
                    placeholder="Enter tags separated by commas"
                    {...register('tags')}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2 mb-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};

export default ServiceForm;