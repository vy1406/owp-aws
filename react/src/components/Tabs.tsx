const Tabs = ({ activeTab, onTabSwitch }) => (
    <div className="flex justify-center mb-6">
        <button
            className={`px-4 py-2 ${activeTab === 'Resource' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => onTabSwitch('Resource')}
        >
            Resource
        </button>
        <button
            className={`px-4 py-2 ${activeTab === 'Service' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => onTabSwitch('Service')}
        >
            Service
        </button>
    </div>
);


export default Tabs;
