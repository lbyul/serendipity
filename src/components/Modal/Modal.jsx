import { useEffect, useRef } from "react";
import "./Modal.css";

const Modal = ({
  isOpen,
  onClose,
  message,
  cancelText,
  confirmText,
  confirmType,
  onConfirm,
}) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (overlayRef.current === e.target) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }

    onClose();
  };

  return (
    <aside
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <dialog className="modal-container" open={true}>
        <p>
          {message.split("\n").reduce((result, line, i, arr) => {
            return [
              ...result,
              line,
              i < arr.length - 1 ? <br key={i} /> : null,
            ];
          }, [])}
        </p>
        <div className="modal-buttons">
          <button className="modal-button modal-btn-cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button
            className={`modal-button ${
              confirmType ? `modal-btn-${confirmType}` : "modal-btn-confirm"
            }`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </dialog>
    </aside>
  );
};

export default Modal;
