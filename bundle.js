/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/api.js":
/*!************************!*\
  !*** ./scripts/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCard: () => (/* binding */ addCard),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard),\n/* harmony export */   getCards: () => (/* binding */ getCards),\n/* harmony export */   getUserInfo: () => (/* binding */ getUserInfo),\n/* harmony export */   likeCard: () => (/* binding */ likeCard),\n/* harmony export */   unlikeCard: () => (/* binding */ unlikeCard),\n/* harmony export */   updateAvatar: () => (/* binding */ updateAvatar),\n/* harmony export */   updateProfile: () => (/* binding */ updateProfile)\n/* harmony export */ });\nvar config = {\n  baseUrl: \"https://nomoreparties.co/v1/cohort-mag-4\",\n  headers: {\n    authorization: \"cbedec9e-5247-416d-96af-cff601366252\",\n    \"Content-Type\": \"application/json\"\n  }\n};\nvar getUserInfo = function getUserInfo() {\n  return fetch(\"\".concat(config.baseUrl, \"/users/me\"), {\n    headers: config.headers\n  }).then(function (res) {\n    return checkResponse(res);\n  });\n};\nvar getCards = function getCards() {\n  return fetch(\"\".concat(config.baseUrl, \"/cards\"), {\n    headers: config.headers\n  }).then(function (res) {\n    return checkResponse(res);\n  });\n};\nvar updateProfile = function updateProfile(name, about) {\n  return fetch(\"\".concat(config.baseUrl, \"/users/me\"), {\n    method: \"PATCH\",\n    headers: config.headers,\n    body: JSON.stringify({\n      name: name,\n      about: about\n    })\n  }).then(function (res) {\n    return checkResponse(res);\n  });\n};\nvar addCard = function addCard(name, link) {\n  return fetch(\"\".concat(config.baseUrl, \"/cards\"), {\n    method: \"POST\",\n    headers: config.headers,\n    body: JSON.stringify({\n      name: name,\n      link: link\n    })\n  }).then(function (res) {\n    return checkResponse(res);\n  });\n};\nvar deleteCard = function deleteCard(cardId) {\n  return fetch(\"\".concat(config.baseUrl, \"/cards/\").concat(cardId), {\n    method: \"DELETE\",\n    headers: config.headers\n  }).then(function (res) {\n    return checkResponse(res);\n  });\n};\nvar likeCard = function likeCard(cardId) {\n  return fetch(\"\".concat(config.baseUrl, \"/cards/likes/\").concat(cardId), {\n    method: \"PUT\",\n    headers: config.headers\n  }).then(function (res) {\n    return checkResponse(res);\n  });\n};\nvar unlikeCard = function unlikeCard(cardId) {\n  return fetch(\"\".concat(config.baseUrl, \"/cards/likes/\").concat(cardId), {\n    method: \"DELETE\",\n    headers: config.headers\n  }).then(function (res) {\n    return checkResponse(res);\n  });\n};\nvar updateAvatar = function updateAvatar(avatarUrl) {\n  return fetch(\"\".concat(config.baseUrl, \"/users/me/avatar\"), {\n    method: \"PATCH\",\n    headers: config.headers,\n    body: JSON.stringify({\n      avatar: avatarUrl\n    })\n  }).then(function (res) {\n    return checkResponse(res);\n  });\n};\nfunction checkResponse(res) {\n  if (res.ok) {\n    return res.json();\n  }\n  return Promise.reject(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430: \".concat(res.status));\n}\n\n//# sourceURL=webpack://mesto-project-ff/./scripts/api.js?");

/***/ }),

/***/ "./scripts/card.js":
/*!*************************!*\
  !*** ./scripts/card.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard)\n/* harmony export */ });\nfunction createCard(name, link, likes, ownerId, cardId, handleImageClick, currentUserId, likeCard, unlikeCard, openDeletePopup) {\n  var cardTemplate = document.querySelector(\"#card-template\");\n  var cardElement = cardTemplate.content.querySelector(\".card\").cloneNode(true);\n  var image = cardElement.querySelector(\".card__image\");\n  var title = cardElement.querySelector(\".card__title\");\n  var likeButton = cardElement.querySelector(\".card__like-button\");\n  var deleteButton = cardElement.querySelector(\".card__delete-button\");\n  var likeCount = cardElement.querySelector(\".card__like-count\");\n  image.src = link;\n  image.alt = name;\n  title.textContent = name;\n  likeCount.textContent = likes.length;\n\n  // Отображение кнопки удаления только для карточек текущего пользователя\n  if (ownerId !== currentUserId) {\n    deleteButton.remove();\n  } else {\n    deleteButton.addEventListener(\"click\", function () {\n      openDeletePopup(cardId, cardElement); // Открываем попап удаления\n    });\n  }\n\n  // Лайки\n  likeButton.addEventListener(\"click\", function () {\n    if (likeButton.classList.contains(\"card__like-button_is-active\")) {\n      unlikeCard(cardId).then(function (updatedCard) {\n        likeCount.textContent = updatedCard.likes.length;\n        likeButton.classList.remove(\"card__like-button_is-active\");\n      });\n    } else {\n      likeCard(cardId).then(function (updatedCard) {\n        likeCount.textContent = updatedCard.likes.length;\n        likeButton.classList.add(\"card__like-button_is-active\");\n      });\n    }\n  });\n\n  // Открытие попапа изображения\n  image.addEventListener(\"click\", function () {\n    handleImageClick(name, link);\n  });\n  return cardElement;\n}\n\n//# sourceURL=webpack://mesto-project-ff/./scripts/card.js?");

/***/ }),

/***/ "./scripts/index.js":
/*!**************************!*\
  !*** ./scripts/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ \"./scripts/modal.js\");\n/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card.js */ \"./scripts/card.js\");\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/index.css */ \"./pages/index.css\");\n/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation.js */ \"./scripts/validation.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api.js */ \"./scripts/api.js\");\n/* harmony import */ var _images_avatar_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/avatar.jpg */ \"./images/avatar.jpg\");\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\n\n\n\n\n\n\nvar editProfileButton = document.querySelector(\".profile__edit-button\");\nvar addCardButton = document.querySelector(\".profile__add-button\");\nvar avatarButton = document.querySelector(\".profile__image\");\nvar profileForm = document.forms[\"edit-profile\"];\nvar addCardForm = document.forms[\"new-place\"];\nvar avatarForm = document.forms[\"update-avatar\"];\nvar nameInput = profileForm.elements.name;\nvar jobInput = profileForm.elements.description;\nvar avatarInput = avatarForm.elements.avatar;\nvar profileName = document.querySelector(\".profile__title\");\nvar profileDescription = document.querySelector(\".profile__description\");\nvar profileImage = document.querySelector(\".profile__image\");\nvar editProfileModal = document.querySelector(\".popup_type_edit\");\nvar addCardModal = document.querySelector(\".popup_type_new-card\");\nvar avatarModal = document.querySelector(\".popup_type_avatar\");\nvar imageModal = document.querySelector(\".popup_type_image\");\nvar popupImage = imageModal.querySelector(\".popup__image\");\nvar popupCaption = imageModal.querySelector(\".popup__caption\");\nvar deletePopup = document.querySelector(\".popup_type_delete\");\nvar deletePopupButton = deletePopup === null || deletePopup === void 0 ? void 0 : deletePopup.querySelector(\".popup__button\");\nvar cardContainer = document.querySelector(\".places__list\");\nvar validationConfig = {\n  formSelector: \".popup__form\",\n  inputSelector: \".popup__input\",\n  submitButtonSelector: \".popup__button\",\n  inactiveButtonClass: \"popup__button_disabled\",\n  inputErrorClass: \"popup__input_type_error\",\n  errorClass: \"popup__error_visible\"\n};\nvar currentUserId = null;\n(0,_validation_js__WEBPACK_IMPORTED_MODULE_3__.enableValidation)(validationConfig);\nfunction setUserInfo(_ref) {\n  var name = _ref.name,\n    about = _ref.about,\n    avatar = _ref.avatar,\n    _id = _ref._id;\n  profileName.textContent = name;\n  profileDescription.textContent = about;\n  profileImage.style.backgroundImage = avatar ? \"url('\".concat(avatar, \"')\") : \"url('\".concat(_images_avatar_jpg__WEBPACK_IMPORTED_MODULE_5__, \"')\");\n  currentUserId = _id;\n}\nPromise.all([(0,_api_js__WEBPACK_IMPORTED_MODULE_4__.getUserInfo)(), (0,_api_js__WEBPACK_IMPORTED_MODULE_4__.getCards)()]).then(function (_ref2) {\n  var _ref3 = _slicedToArray(_ref2, 2),\n    userData = _ref3[0],\n    cards = _ref3[1];\n  setUserInfo(userData);\n  cards.forEach(function (card) {\n    var cardElement = (0,_card_js__WEBPACK_IMPORTED_MODULE_1__.createCard)(card.name, card.link, card.likes, card.owner._id, card._id, handleImageClick, currentUserId, _api_js__WEBPACK_IMPORTED_MODULE_4__.likeCard, _api_js__WEBPACK_IMPORTED_MODULE_4__.unlikeCard, openDeletePopup);\n    cardContainer.append(cardElement);\n  });\n})[\"catch\"](function (err) {\n  return console.error(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u0437\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0438 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0445: \".concat(err));\n});\neditProfileButton.addEventListener(\"click\", function () {\n  nameInput.value = profileName.textContent;\n  jobInput.value = profileDescription.textContent;\n  (0,_validation_js__WEBPACK_IMPORTED_MODULE_3__.clearValidation)(profileForm, validationConfig);\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(editProfileModal);\n});\naddCardButton.addEventListener(\"click\", function () {\n  (0,_validation_js__WEBPACK_IMPORTED_MODULE_3__.clearValidation)(addCardForm, validationConfig);\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(addCardModal);\n});\navatarButton.addEventListener(\"click\", function () {\n  (0,_validation_js__WEBPACK_IMPORTED_MODULE_3__.clearValidation)(avatarForm, validationConfig);\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(avatarModal);\n});\nprofileForm.addEventListener(\"submit\", function (evt) {\n  evt.preventDefault();\n  var name = nameInput.value;\n  var about = jobInput.value;\n  var saveButton = profileForm.querySelector(\".popup__button\");\n  saveButton.textContent = \"Сохранение...\";\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_4__.updateProfile)(name, about).then(function (userData) {\n    setUserInfo(userData);\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)(editProfileModal);\n  })[\"catch\"](function (err) {\n    return console.error(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u043E\\u0431\\u043D\\u043E\\u0432\\u043B\\u0435\\u043D\\u0438\\u044F \\u043F\\u0440\\u043E\\u0444\\u0438\\u043B\\u044F: \".concat(err));\n  })[\"finally\"](function () {\n    saveButton.textContent = \"Сохранить\";\n  });\n});\naddCardForm.addEventListener(\"submit\", function (evt) {\n  evt.preventDefault();\n  var placeName = addCardForm.elements[\"place-name\"].value;\n  var placeLink = addCardForm.elements.link.value;\n  var saveButton = addCardForm.querySelector(\".popup__button\");\n  saveButton.textContent = \"Сохранение...\";\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_4__.addCard)(placeName, placeLink).then(function (newCard) {\n    var cardElement = (0,_card_js__WEBPACK_IMPORTED_MODULE_1__.createCard)(newCard.name, newCard.link, newCard.likes, newCard.owner._id, newCard._id, handleImageClick, currentUserId, _api_js__WEBPACK_IMPORTED_MODULE_4__.likeCard, _api_js__WEBPACK_IMPORTED_MODULE_4__.unlikeCard, openDeletePopup);\n    cardContainer.prepend(cardElement);\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)(addCardModal);\n    addCardForm.reset();\n  })[\"catch\"](function (err) {\n    return console.error(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u0434\\u043E\\u0431\\u0430\\u0432\\u043B\\u0435\\u043D\\u0438\\u044F \\u043A\\u0430\\u0440\\u0442\\u043E\\u0447\\u043A\\u0438: \".concat(err));\n  })[\"finally\"](function () {\n    saveButton.textContent = \"Создать\";\n  });\n});\navatarForm.addEventListener(\"submit\", function (evt) {\n  evt.preventDefault();\n  var avatarUrl = avatarInput.value;\n  var saveButton = avatarForm.querySelector(\".popup__button\");\n  saveButton.textContent = \"Сохранение...\";\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_4__.updateAvatar)(avatarUrl).then(function (userData) {\n    profileImage.style.backgroundImage = \"url('\".concat(userData.avatar, \"')\");\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)(avatarModal);\n    avatarForm.reset();\n  })[\"catch\"](function (err) {\n    return console.error(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u043E\\u0431\\u043D\\u043E\\u0432\\u043B\\u0435\\u043D\\u0438\\u044F \\u0430\\u0432\\u0430\\u0442\\u0430\\u0440\\u0430: \".concat(err));\n  })[\"finally\"](function () {\n    saveButton.textContent = \"Сохранить\";\n  });\n});\nfunction handleImageClick(name, link) {\n  popupImage.src = link;\n  popupImage.alt = name;\n  popupCaption.textContent = name;\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(imageModal);\n}\nvar cardIdToDelete = null;\nvar cardElementToDelete = null;\nfunction openDeletePopup(cardId, cardElement) {\n  cardIdToDelete = cardId;\n  cardElementToDelete = cardElement;\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)(deletePopup);\n}\ndeletePopupButton === null || deletePopupButton === void 0 || deletePopupButton.addEventListener(\"click\", function () {\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_4__.deleteCard)(cardIdToDelete).then(function () {\n    cardElementToDelete.remove();\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)(deletePopup);\n  })[\"catch\"](function (err) {\n    return console.error(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0438\\u044F \\u043A\\u0430\\u0440\\u0442\\u043E\\u0447\\u043A\\u0438: \".concat(err));\n  });\n});\ndocument.querySelectorAll(\".popup\").forEach(function (popup) {\n  popup.addEventListener(\"mousedown\", function (evt) {\n    if (evt.target.classList.contains(\"popup_opened\") || evt.target.classList.contains(\"popup__close\")) {\n      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)(popup);\n    }\n  });\n});\n\n//# sourceURL=webpack://mesto-project-ff/./scripts/index.js?");

/***/ }),

/***/ "./scripts/modal.js":
/*!**************************!*\
  !*** ./scripts/modal.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   openModal: () => (/* binding */ openModal)\n/* harmony export */ });\nfunction handleEscClose(evt) {\n  if (evt.key === \"Escape\") {\n    var openedModal = document.querySelector(\".popup_opened\");\n    if (openedModal) {\n      closeModal(openedModal);\n    }\n  }\n}\nfunction openModal(modal) {\n  modal.classList.add(\"popup_opened\");\n  document.addEventListener(\"keydown\", handleEscClose);\n}\nfunction closeModal(modal) {\n  modal.classList.remove(\"popup_opened\");\n  document.removeEventListener(\"keydown\", handleEscClose);\n}\n\n//# sourceURL=webpack://mesto-project-ff/./scripts/modal.js?");

/***/ }),

/***/ "./scripts/validation.js":
/*!*******************************!*\
  !*** ./scripts/validation.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearValidation: () => (/* binding */ clearValidation),\n/* harmony export */   enableValidation: () => (/* binding */ enableValidation)\n/* harmony export */ });\nfunction enableValidation(config) {\n  var forms = document.querySelectorAll(config.formSelector);\n  forms.forEach(function (form) {\n    var inputs = form.querySelectorAll(config.inputSelector);\n    var button = form.querySelector(config.submitButtonSelector);\n    inputs.forEach(function (input) {\n      input.addEventListener(\"input\", function () {\n        checkInputValidity(form, input, config);\n        toggleButtonState(inputs, button, config);\n      });\n    });\n    toggleButtonState(inputs, button, config);\n  });\n}\nfunction checkInputValidity(form, input, config) {\n  var errorElement = form.querySelector(\".\".concat(input.name, \"-error\"));\n  if (!input.validity.valid) {\n    showInputError(input, errorElement, config);\n  } else {\n    hideInputError(input, errorElement, config);\n  }\n}\nfunction showInputError(input, errorElement, config) {\n  input.classList.add(config.inputErrorClass);\n  if (errorElement) {\n    errorElement.textContent = input.validationMessage;\n    errorElement.classList.add(config.errorClass);\n  }\n}\nfunction hideInputError(input, errorElement, config) {\n  input.classList.remove(config.inputErrorClass);\n  if (errorElement) {\n    errorElement.textContent = \"\";\n    errorElement.classList.remove(config.errorClass);\n  }\n}\nfunction toggleButtonState(inputs, button, config) {\n  var isFormValid = Array.from(inputs).every(function (input) {\n    return input.validity.valid;\n  });\n  button.disabled = !isFormValid;\n  if (button.disabled) {\n    button.classList.add(config.inactiveButtonClass);\n  } else {\n    button.classList.remove(config.inactiveButtonClass);\n  }\n}\nfunction clearValidation(form, config) {\n  var inputs = form.querySelectorAll(config.inputSelector);\n  var button = form.querySelector(config.submitButtonSelector);\n  inputs.forEach(function (input) {\n    var errorElement = form.querySelector(\".\".concat(input.name, \"-error\"));\n    if (errorElement) {\n      hideInputError(input, errorElement, config);\n    }\n  });\n  button.disabled = true;\n  button.classList.add(config.inactiveButtonClass);\n}\n\n//# sourceURL=webpack://mesto-project-ff/./scripts/validation.js?");

/***/ }),

/***/ "./pages/index.css":
/*!*************************!*\
  !*** ./pages/index.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto-project-ff/./pages/index.css?");

/***/ }),

/***/ "./images/avatar.jpg":
/*!***************************!*\
  !*** ./images/avatar.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"images/avatar.jpg\";\n\n//# sourceURL=webpack://mesto-project-ff/./images/avatar.jpg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/index.js");
/******/ 	
/******/ })()
;