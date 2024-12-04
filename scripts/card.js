export function createCard(name, link, handleImageClick) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  image.src = link;
  image.alt = name;
  title.textContent = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  image.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  return cardElement;
}
