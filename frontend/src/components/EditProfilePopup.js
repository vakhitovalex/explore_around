import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();
    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Edit profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name"
        type="text"
        value={name}
        onChange={handleNameChange}
        className="form__input form__input_type_profile-name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
        name="profileName"
      />
      <span id="profile-name-error" className="form__error"></span>
      <input
        id="profile-info"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        className="form__input form__input_type_profile-description"
        placeholder="Description"
        required
        minLength="2"
        maxLength="200"
        name="profileAbout"
      />
      <span id="profile-info-error" className="form__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
