import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

import Api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);
  const [{ cardName, cardImage }, setCardData] = useState({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const history = useHistory();

  const api = new Api({
    baseUrl: 'https://www.api.alex-around-us.students.nomoreparties.site',
    // baseUrl: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      authorization: `Bearer ${token}`,
    },
  });

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res.ok) {
          setIsRegistered(true);
          setIsInfoTooltipOpen(true);
        } else {
          setIsRegistered(false);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data) {
          throw new Error('User Not Found');
        }
        if (data.token) {
          setEmail('');
          setPassword('');
          setIsLoggedIn(true);
          setToken(localStorage.setItem('token', data.token));
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setEmail('');
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            console.log(res);
            setIsLoggedIn(true);
            setEmail(res.email);
            setCurrentUser(res);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function requestUserInfo() {
    api
      .getUserInfo()
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err + ' in user api request');
      });
  }

  useEffect(() => {
    requestUserInfo();
  }, []);

  function requestCards() {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err + ' in cards request');
      });
  }

  useEffect(() => {
    requestCards();
  }, []);

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Send a request to the API and getting the updated card data
    api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        // Create a new array based on the existing one and putting a new card into it
        const newCards = cards.map((item) =>
          item._id === card._id ? newCard : item
        );
        // Update the state
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err + ' in like api request');
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const arrayWithoutDeletedCard = cards.filter(
          (item) => item._id !== card._id
        );
        setCards(arrayWithoutDeletedCard);
      })
      .catch((err) => {
        console.log(err + ' in delete api request');
      });
  }

  function handleCardClick(cardName, cardImage) {
    setIsImageModalOpen(true);
    setCardData({ cardName, cardImage });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarModalOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceModalOpen(true);
  }

  function closeAllModals() {
    setIsEditAvatarModalOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlaceModalOpen(false);
    setIsImageModalOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo({ name, about })
      .then((res) => setCurrentUser(res))
      .catch((err) => {
        console.log(err + ' in user api request');
      })
      .then(() => closeAllModals());
  }

  function handleUpdateAvatar(link) {
    api
      .updateUserPicture(link)
      .then((res) => setCurrentUser(res))
      .catch((err) => {
        console.log(err + ' in user avatar api request');
      })
      .then(() => closeAllModals());
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({
        name,
        link,
      })
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => {
        console.log(err + ' in add card api request');
      })
      .then(() => closeAllModals());
  }

  return (
    <div className="page">
      <div className="page__container">
        <BrowserRouter>
          <CurrentUserContext.Provider value={currentUser}>
            <Switch>
              <Route path="/signin">
                {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
                <Header
                  email={isLoggedIn ? email : ''}
                  linkTo={'/signup'}
                  link={'Sign Up'}
                />
                <Login handleLogin={handleLogin} />
              </Route>
              <Route path="/signup">
                {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
                <Header
                  email={isLoggedIn ? email : ''}
                  linkTo={'/signin'}
                  link={'Log in'}
                />
                <Register handleRegister={handleRegister} />
              </Route>
              <ProtectedRoute
                exact
                path="/"
                isLoggedIn={isLoggedIn}
                email={email}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                handleLogout={handleLogout}
                cards={cards}
                {...(isLoggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Redirect to="/signin" />
                ))}
              />
            </Switch>

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllModals}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarModalOpen}
              onClose={closeAllModals}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlaceModalOpen}
              onClose={closeAllModals}
              onAddPlace={handleAddPlaceSubmit}
            />
            <PopupWithForm
              name="delete-place"
              title="Are you sure?"
            ></PopupWithForm>
            <ImagePopup
              isOpen={isImageModalOpen}
              imageUrl={cardImage}
              imageTitle={cardName}
              onClose={closeAllModals}
            />
            <InfoTooltip
              isRegistered={isRegistered}
              isOpen={isInfoTooltipOpen}
              onClose={closeAllModals}
            />
            <Footer />
          </CurrentUserContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
