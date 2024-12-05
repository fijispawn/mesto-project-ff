import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { createCard } from "./card.js";
import avatarImage from "../images/avatar.jpg";
import "../pages/index.css";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const editProfileModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
const popupImage = imageModal.querySelector(".popup__image");
const popupCaption = imageModal.querySelector(".popup__caption");

const cardContainer = document.querySelector(".places__list");

function setProfileAvatar(url) {
  profileImage.style.backgroundImage = `url('${url}')`;
}
setProfileAvatar(avatarImage);

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imageModal);
}

function handleOpenModal(modal) {
  openModal(modal);
}

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  handleOpenModal(editProfileModal);
});

addCardButton.addEventListener("click", () => {
  handleOpenModal(addCardModal);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const placeName = addCardForm.elements["place-name"].value;
  const placeLink = addCardForm.elements.link.value;
  const newCard = createCard(placeName, placeLink, handleImageClick);
  cardContainer.prepend(newCard);

  addCardForm.elements["place-name"].value = "";
  addCardForm.elements.link.value = "";

  closeModal(addCardModal);
});

initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link, handleImageClick);
  cardContainer.append(cardElement);
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
