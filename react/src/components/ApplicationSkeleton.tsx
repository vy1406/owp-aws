const ApplicationFormSkeleton = () => {
    return (
        <div className="bg-gray-800 border-gray-700 p-4 rounded-md shadow-md border flex flex-col gap-4 animate-pulse mt-4">

            <div className="flex flex-col gap-3">
                <div className="h-5 w-full bg-gray-600 rounded mt-5"></div>
                <div className="h-5 w-full bg-gray-600 rounded mt-5"></div>
                <div className="h-5 w-full bg-gray-600 rounded mt-5"></div>
            </div>

            <div className="h-5 w-full bg-gray-600 rounded mt-5"></div>

            <div className="h-16 w-full bg-gray-600 rounded mt-5"></div>

            <div className="flex gap-4">
                <div className="h-5 w-1/5 bg-gray-600 rounded mt-5"></div>
                <div className="h-5 w-1/5 bg-gray-600 rounded mt-5"></div>
                <div className="h-5 w-1/5 bg-gray-600 rounded mt-5"></div>
            </div>

            <div className="h-10 w-full bg-gray-600 rounded mt-5"></div>
        </div>
    );
};

export default ApplicationFormSkeleton;
