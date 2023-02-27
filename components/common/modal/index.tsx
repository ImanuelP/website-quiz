import { ReactElement, useEffect } from "react";

interface ModalProps {
  open?: "hidden" | "visible" | any;
  title: string;
  onClose: () => void;
  children?: ReactElement;
}
const Modal: React.FC<ModalProps> = (props) => {
  const { open, title, onClose, children } = props;

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
    // onAnimationEnd={}
      data-modal-backdrop='static'
      tabIndex={-1}
      aria-hidden='true'
      className={`${open} mx-auto flex justify-center bg-black bg-opacity-80 fixed items-center top-0 left-0 right-0 z-50 w-full p-4 h-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}>
      <div className='relative w-full h-full max-w-4xl md:h-auto '>
        <div className='relative bg-white rounded-lg shadow '>
          <div className='flex items-start justify-between p-4 bg-green-800 bg-opacity border-b rounded-t '>
            <h3 className='flex justify-center w-full gap-2 items-center text-xl font-semibold text-white'>
              {title}
            </h3>
            <button
              onClick={onClose}
              type='button'
              className='text-gray-400 bg-transparent hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '
              data-modal-hide='staticModal'>
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'></path>
              </svg>
            </button>
          </div>
          <div className='p-6 space-y-6'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
