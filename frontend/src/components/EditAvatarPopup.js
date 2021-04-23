import React, { useRef } from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {
  const pictureLinkRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar(pictureLinkRef.current.value)
  }

  return (
    <PopupWithForm
      name="edit-profile-picture"
      title="Change profile picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={pictureLinkRef}
        defaultValue=""
        id="picture-url"
        type="url"
        className="form__input form__input_type_picture-link"
        placeholder="Picture Link"
        name="pictureLink"
        required
      />
      <span id="picture-url-error" className="form__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
