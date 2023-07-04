import React from 'react';


const Modal = ({isOpen, onClose, children}) => {
  return (
    <>
      {isOpen ? (
        <div data-modal-placement="top-left"  className="fixed top-0 left-0 right-0  w-full  inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-1/2 p-6">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Modification du profil
                </h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;