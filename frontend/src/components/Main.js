import React, { useContext } from 'react';
import Card from './Card.js';
import Header from './Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <Header
        email={props.isLoggedIn ? `${props.email}` : ' '}
        link={props.isLoggedIn ? `Log out` : ' '}
        linkTo={'/'}
        onClick={props.handleLogout}
      />
      <section className="profile">
        <div className="profile__current">
          <button
            className="profile__picture-edit"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__picture"
            />
          </button>
          <div className="profile__info">
            <div className="profile__head">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
