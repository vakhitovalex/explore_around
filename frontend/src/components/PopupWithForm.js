function popupWithForm(props) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? 'modal_open' : ''
      }`}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={props.onClose}
        ></button>
        <h3 className="modal__title">{props.title}</h3>
        <form
          action=""
          className="form"
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button className="form__submit" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default popupWithForm
