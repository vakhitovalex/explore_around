import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const { owner, name, link, likes } = props.card;
  const isLiked = likes.some((item) => item === currentUser._id);

  return (
    <div className="element">
      {owner === currentUser._id && (
        <button
          type="submit"
          className="element__delete"
          onClick={() => props.onCardDelete(props.card)}
        ></button>
      )}

      <div
        className="element__image"
        style={{ backgroundImage: `url(${link})` }}
        onClick={() => props.onClick(name, link)}
      ></div>
      <div className="element__description">
        <h2 className="element__name">{name}</h2>
        <div className="element__like">
          <button
            className={
              isLiked ? `element__like-figure_active` : `element__like-figure`
            }
            onClick={() => props.onCardLike(props.card)}
          ></button>
          <h3 className="element__like-count">{likes.length}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
