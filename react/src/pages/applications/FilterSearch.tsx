import { useState } from 'react';
import CollapseContainer from '../../components/CollapseContainer';
import { LANG, STATUS_MAP } from '../../utils/constants';
import { useForm } from 'react-hook-form';

export interface IOnFilter {
    dateFrom: string;
    dateTo: string;
    submission_city: string;
    status: string;
    additional_info: string;
}

interface IFilterSearchForm {
    dateFrom: string;
    dateTo: string;
    submission_city: string;
    status: string;
    additional_info: string;
}

type IFilterSearchProps = {
    onFilter: (data: IOnFilter) => void;
};

const FilterSearch = ({ onFilter }: IFilterSearchProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm<IFilterSearchForm>();

    const onSubmit = (data: IFilterSearchForm) => {
        onFilter({ ...data });
    };

    const handleClear = () => {
        reset();
        onFilter({
            dateFrom: '',
            dateTo: '',
            submission_city: '',
            status: '',
            additional_info: '',
        });
    }

    return (
        <CollapseContainer text={LANG.EN.FILTER_AND_SEARCH} isOpen={isOpen} toggleIsOpen={(isOpen) => setIsOpen(isOpen)}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <div className="relative z-0 w-full mt-2 group">
                    <input
                        type="date"
                        id="dateFrom"
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                        placeholder=" "
                        {...register('dateFrom')}
                    />
                    <label
                        htmlFor="dateFrom"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {LANG.EN.DATE_FROM}
                    </label>

                </div>
                <div className="relative z-0 w-full mt-2 group">
                    <input
                        type="date"
                        id="dateTo"
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                        placeholder=" "
                        {...register('dateTo')}
                    />
                    <label
                        htmlFor="dateTo"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {LANG.EN.DATE_TO}
                    </label>

                </div>



                <div className="relative z-0 w-full mt-2 group">
                    <select
                        id="status"
                        className="block py-4 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer appearance-none"
                        {...register('status')}
                        defaultValue=""
                    >
                        <option value="" disabled className="text-gray-400 bg-gray-800 p-2">
                            {LANG.EN.SELECT_STATUS}
                        </option>
                        <option value="Approved" className="text-white bg-gray-700 hover:bg-gray-600 p-2">
                            {LANG.EN.STATUS_APPROVED}
                        </option>
                        <option value="Declined" className="text-white bg-gray-700 hover:bg-gray-600 p-2">
                            {LANG.EN.STATUS_DECLINED}
                        </option>
                        <option value="Pending" className="text-white bg-gray-700 hover:bg-gray-600 p-2">
                            {LANG.EN.STATUS_PENDING}
                        </option>
                    </select>
                    <label
                        htmlFor="status"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {LANG.EN.STATUS}
                    </label>
                </div>

                <div className="relative z-0 w-full mt-2 group">
                    <input
                        type="text"
                        id="searchTerm"
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                        placeholder=" "
                        {...register('submission_city')}
                    />
                    <label
                        htmlFor="searchTerm"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {LANG.EN.SUBMISSION_CITY}
                    </label>

                </div>
                <div className="relative z-0 w-full mt-2 group">
                    <input
                        type="text"
                        id="searchTerm"
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
                        placeholder=" "
                        {...register('additional_info')}
                    />
                    <label
                        htmlFor="searchTerm"
                        className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {LANG.EN.FREE_TEXT}
                    </label>

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
