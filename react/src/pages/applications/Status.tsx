import React from 'react';
import { STATUS_MAP } from '../../utils/constants';

interface StatusProps {
  status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case STATUS_MAP.PENDING:
        return 'bg-yellow-300 text-gray-900';
      case STATUS_MAP.DECLINED:
        return 'bg-red-400 text-gray-900';
      case STATUS_MAP.APPROVED:
        return 'bg-green-400 text-gray-900';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  return (
    <div className={`tracking-wide inline-block w-28 text-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle()}`}>
      {status}
    </div>
  );
};

export default Status;
