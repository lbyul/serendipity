import "./Modal.css";
import { useRef } from "react";
import useEscapeKey from "@/hooks/useEscapeKey";

const Modal = ({
  isOpen,
  onClose,
  message,
  confirmText,
  confirmType,
  onConfirm,
}) => {
  const overlayRef = useRef(null);
  useEscapeKey(isOpen, onClose);

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
            취소
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
