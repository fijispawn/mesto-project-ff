import { openModal, closeModal } from "./modal.js";
import { createCard } from "./card.js";
import "../pages/index.css";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getCards,
  updateProfile,
  addCard,
  updateAvatar,
  likeCard,
  unlikeCard,
  deleteCard,
} from "./api.js";
import avatarImage from "../images/avatar.jpg";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image");
const profileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];
const avatarForm = document.forms["update-avatar"];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const avatarInput = avatarForm.elements.avatar;
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const editProfileModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_new-card");
const avatarModal = document.querySelector(".popup_type_avatar");
const imageModal = document.querySelector(".popup_type_image");
const popupImage = imageModal.querySelector(".popup__image");
const popupCaption = imageModal.querySelector(".popup__caption");
const deletePopup = document.querySelector(".popup_type_delete");
const deletePopupButton = deletePopup?.querySelector(".popup__button");

const cardContainer = document.querySelector(".places__list");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let currentUserId = null;

enableValidation(validationConfig);

function setUserInfo({ name, about, avatar, _id }) {
  profileName.textContent = name;
  profileDescription.textContent = about;
  profileImage.style.backgroundImage = avatar
    ? `url('${avatar}')`
    : `url('${avatarImage}')`;
  currentUserId = _id;
}

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    setUserInfo(userData);

    cards.forEach((card) => {
      const cardElement = createCard(
        card.name,
        card.link,
        card.likes,
        card.owner._id,
        card._id,
        handleImageClick,
        currentUserId,
        likeCard,
        unlikeCard,
        openDeletePopup
      );
      cardContainer.append(cardElement);
    });
  })
  .catch((err) => console.error(`Ошибка загрузки данных: ${err}`));

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(editProfileModal);
});

addCardButton.addEventListener("click", () => {
  clearValidation(addCardForm, validationConfig);
  openModal(addCardModal);
});

avatarButton.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarModal);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;

  const saveButton = profileForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  updateProfile(name, about)
    .then((userData) => {
      setUserInfo(userData);
      closeModal(editProfileModal);
    })
    .catch((err) => console.error(`Ошибка обновления профиля: ${err}`))
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const placeName = addCardForm.elements["place-name"].value;
  const placeLink = addCardForm.elements.link.value;

  const saveButton = addCardForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  addCard(placeName, placeLink)
    .then((newCard) => {
      const cardElement = createCard(
        newCard.name,
        newCard.link,
        newCard.likes,
        newCard.owner._id,
        newCard._id,
        handleImageClick,
        currentUserId,
        likeCard,
        unlikeCard,
        openDeletePopup
      );
      cardContainer.prepend(cardElement);
      closeModal(addCardModal);
      addCardForm.reset();
    })
    .catch((err) => console.error(`Ошибка добавления карточки: ${err}`))
    .finally(() => {
      saveButton.textContent = "Создать";
    });
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;

  const saveButton = avatarForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  updateAvatar(avatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch((err) => console.error(`Ошибка обновления аватара: ${err}`))
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
});

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imageModal);
}

let cardIdToDelete = null;
let cardElementToDelete = null;

function openDeletePopup(cardId, cardElement) {
  cardIdToDelete = cardId;
  cardElementToDelete = cardElement;
  openModal(deletePopup);
}

deletePopupButton?.addEventListener("click", () => {
  deleteCard(cardIdToDelete)
    .then(() => {
      cardElementToDelete.remove();
      closeModal(deletePopup);
    })
    .catch((err) => console.error(`Ошибка удаления карточки: ${err}`));
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});
