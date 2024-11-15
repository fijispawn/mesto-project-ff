// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardReciever = (name, link) => {
  let card = document.querySelector("#card-template");
  let cloned = card.content.cloneNode(true);

  let image = cloned.querySelector("img");
  let title = cloned.querySelector(".card__title");

  image.src = link;
  image.alt = name;
  title.textContent = name;

  const deleteButton = cloned.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () =>{
    let cardElement = deleteButton.closest('.card');
    cardElement.remove();
  })

  return cloned;
};

function deleteCard(cardElement){
cardElement.remove()
}

let cardContainer = document.querySelector('.places__list');

initialCards.forEach((item) =>{
    const cardElement = cardReciever(item.name, item.link);
    cardContainer.append(cardElement);
})
