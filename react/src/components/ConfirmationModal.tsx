import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  subTitle: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, subTitle, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-center">{title}</h2>

        <p className="text-gray-300 text-center mt-2">{subTitle}</p>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
              onClick={onConfirm}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
