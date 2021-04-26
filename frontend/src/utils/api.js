export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // GET https://around.nomoreparties.co/v1/groupId/cards/
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
  // GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  //PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  //DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  changeLikeStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        headers: this._headers,
        method: 'PUT',
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      );
    } else {
      return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        headers: this._headers,
        method: 'DELETE',
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      );
    }
  }

  //PATCH https://around.nomoreparties.co/v1/groupId/users/me
  updateUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  updateUserPicture(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  // POST https://around.nomoreparties.co/v1/groupId/cards
  addNewCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
  //DELETE DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: 'DELETE',
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
}

// const api = new Api({
//   baseUrl: 'https://www.api.alex-around-us.students.nomoreparties.site',
//   headers: {
//     'Content-Type': 'application/json',
//     authorization: `Bearer ${token}`,
//   },
// });

// export default api;
