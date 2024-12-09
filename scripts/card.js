export function createCard(
  name,
  link,
  likes,
  ownerId,
  cardId,
  handleImageClick,
  currentUserId,
  likeCard,
  unlikeCard,
  openDeletePopup
) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  image.src = link;
  image.alt = name;
  title.textContent = name;
  likeCount.textContent = likes.length;

  if (likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (ownerId !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      openDeletePopup(cardId, cardElement);
    });
  }

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      unlikeCard(cardId)
        .then((updatedCard) => {
          likeCount.textContent = updatedCard.likes.length;
          likeButton.classList.remove("card__like-button_is-active");
        })
        .catch((err) => console.error(`Ошибка снятия лайка: ${err}`));
    } else {
      likeCard(cardId)
        .then((updatedCard) => {
          likeCount.textContent = updatedCard.likes.length;
          likeButton.classList.add("card__like-button_is-active");
        })
        .catch((err) => console.error(`Ошибка установки лайка: ${err}`));
    }
  });

  image.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  return cardElement;
}
