import { useEffect, useState } from 'react';
import CollapseContainer from '../../components/CollapseContainer';
import { LANG } from '../../utils/constants';
import { useForm } from 'react-hook-form';

export interface IOnFilter {
    searchTerm: string;
    tags: string;
}

interface IFilterSearchForm {
    searchTerm: string;
    tags: string;
}

type IFilterSearchProps = {
    onFilter: (data: IOnFilter) => void;
    filters: IOnFilter;
};

const FilterSearch = ({ onFilter, filters }: IFilterSearchProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, watch } = useForm<IFilterSearchForm>();
    
    useEffect(() => {
        reset(filters);
    }, [filters, reset]);

    const tags = (watch('tags') || '').split(',').filter((tag) => tag.trim() !== '');

    const handleOnDeleteTag = (tag: string) => {
        const newTags = tags.filter((t) => t !== tag);
        const tagsInput = newTags.join(',');
        reset({ tags: tagsInput });
        onFilter({ searchTerm: '', tags: tagsInput });
    };

    const onSubmit = (data: IFilterSearchForm) => {
        const { searchTerm, tags } = data;
        onFilter({ searchTerm, tags });
    };

    const handleClear = () => {
        reset();
        onFilter({ searchTerm: '', tags: "" });
    }

    return (
        <CollapseContainer text={LANG.EN.FILTER_AND_SEARCH} isOpen={isOpen} toggleIsOpen={(isOpen) => setIsOpen(isOpen)}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <div className="relative z-0 w-full mt-2 group">
                    <input
                        type="text"
                        id="searchTerm"
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                        placeholder=" "
                        {...register('searchTerm')}
                    />
                    <label
                        htmlFor="searchTerm"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {LANG.EN.FREE_TEXT}
                    </label>

                </div>


                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        id="tags"
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        {...register('tags')}
                    />
                    <label
                        htmlFor="tags"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {LANG.EN.TAGS}
                    </label>
                    <div className="mt-2">
                        {tags.length === 0 && (
                            <p className={`px-2 py-2.5 italic text-xs text-gray-400`}>
                                ( {LANG.EN.SEPARATE_BY_COMMAS} )
                            </p>)}
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
                <div className='flex gap-4'>
                    <button
                        className='w-full flex justify-center items-center bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600'
                        onClick={handleClear}
                    >
                        {LANG.EN.CLEAR}
                    </button>
                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-indigo-700`}
                    >
                        {LANG.EN.SEARCH}
                    </button>
                </div>
            </form>
        </CollapseContainer>
    );
};

export default FilterSearch;
