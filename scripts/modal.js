function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

export function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}
