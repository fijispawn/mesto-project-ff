// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const createCard = (name, link) => {
  const card = document.querySelector("#card-template");
  const cloned = card.content.querySelector(".card").cloneNode(true);

  const image = cloned.querySelector("img");
  const title = cloned.querySelector(".card__title");

  image.src = link;
  image.alt = name;
  title.textContent = name;

  const deleteButton = cloned.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cloned);
  });

  return cloned;
};

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const cardContainer = document.querySelector(".places__list");

initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link);
  cardContainer.append(cardElement);
});

