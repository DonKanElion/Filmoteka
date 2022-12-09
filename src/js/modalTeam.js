(() => {
  const refs = {
    openModalBtn: document.querySelector(".footer__btn-team"),
    closeModalBtn: document.querySelector(".modal__close-btn"),
    modalTeam: document.querySelector(".backdrop__team"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal); // Відкриває модалку
  refs.closeModalBtn.addEventListener("click", toggleModal); // Закриває модалку

  window.addEventListener("click", function(e) {  // закриває мод кліком за межами
    if (e.target === document.querySelector('.backdrop__team')) {
      toggleModal();
      }
  });

  function toggleModal() {
    refs.modalTeam.classList.toggle("is-hidden");
  }
})();
