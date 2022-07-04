export const Modal = ({ isOpen, children, onHidden }) => {
  return (
    <div
      className={`modal ${!isOpen ? "hidden" : ""}`}
      onClick={() => onHidden(null)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
