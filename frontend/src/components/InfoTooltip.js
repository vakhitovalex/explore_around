import successSign from '../images/check_sign.svg';
import failSign from '../images/cross_sign.svg';

function InfoTooltip(props) {
  return (
    <div
      className={`modal modal_type_tooltip ${props.isOpen ? 'modal_open' : ''}`}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.isRegistered ? successSign : failSign}
          alt={
            props.isRegistered
              ? 'Successfully Registered Icon'
              : 'Registration Failed Icon'
          }
          className="modal__img-status"
        />
        <h3 className="modal__title">
          {props.isRegistered
            ? `Success! You have now been registered.`
            : `Oops, something went wrong! Please try again.`}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
