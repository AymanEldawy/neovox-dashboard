import { createPortal } from "react-dom";

const Modal = ({
  // open,
  onClose,
  children,
  containerClassName,
  bodyClassName,
  open,
  isDrawer,
}) => {
  let classes = `max-w-[85%] rounded-md p-4 min-w-[250px] max-h-[90vh] overflow-auto`;
  if (isDrawer) {
    classes = `p-4 overflow-auto h-screen min-w-[250px] ltr:ml-auto rtl:mr-auto`;
  }

  if (!open) return;

  return createPortal(
    <div
      className={`
      fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center backdrop-blur-sm bg-[#0008]
      ${containerClassName}
      `}
      onClick={() => {
        if (onClose) onClose();
      }}
    >
      <div
        className={`bg-white dark:bg-[#282828] shadow ${classes} ${bodyClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("portal-modal")
  );
};

export default Modal;
