import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { createCard } from "./card.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
const closeButtons = document.querySelectorAll(".popup__close");
const profileForm = editProfileModal.querySelector(".popup__form");
const addCardForm = addCardModal.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardContainer = document.querySelector(".places__list");

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  openModal(addCardModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".popup");
  button.addEventListener("click", () => closeModal(modal));
});

document.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closeModal(evt.target);
  }
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const placeName = addCardForm.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const placeLink = addCardForm.querySelector(".popup__input_type_url").value;
  const newCard = createCard(placeName, placeLink);
  cardContainer.prepend(newCard);
  closeModal(addCardModal);
});

initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link);
  cardContainer.append(cardElement);
});
