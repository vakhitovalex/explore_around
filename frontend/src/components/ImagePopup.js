function ImagePopup(props) {
  return (
    <div
      className={`modal modal_type_image ${props.isOpen ? 'modal_open' : ''}`}
    >
      <div className="modal__image-container">
        <button
          type="button"
          className="modal__close-button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.imageUrl}
          alt={props.imageTitle}
          className="modal__img"
        />
        <h3 className="modal__imgname">{props.imageTitle}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
