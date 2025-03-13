const SkeletonCard = () => {
    return (
        <div className="bg-gray-800 border-gray-700 p-3 rounded-md shadow-md border  flex flex-col gap-3 animate-pulse mt-4" >
            <div className="flex justify-between gap-4">
                <div className="h-5 w-3/4 bg-gray-600 rounded"></div> 
                <div className="h-5 w-6 bg-gray-600 rounded"></div>  
            </div>
        </div>
    );
};

export default SkeletonCard;