import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [cardTitle, setCardTitle] = useState('');
  const [cardImageLink, setCardImageLink] = useState('');

  function handleCardTitleChange(e) {
    setCardTitle(e.target.value);
  }

  function handleCardImageLinkChange(e) {
    setCardImageLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardTitle,
      link: cardImageLink,
    });
    setCardTitle('');
    setCardImageLink('');
  }

  return (
    <PopupWithForm
      name="add-place"
      title="New place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-title"
        type="text"
        value={cardTitle}
        onChange={handleCardTitleChange}
        className="form__input form__input_type_place-title"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        name="placeTitle"
        required
      />
      <span id="place-title-error" className="form__error"></span>
      <input
        id="place-url"
        type="url"
        value={cardImageLink}
        onChange={handleCardImageLinkChange}
        className="form__input form__input_type_place-link"
        placeholder="Image Link"
        name="placeLink"
        required
      />
      <span id="place-url-error" className="form__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
