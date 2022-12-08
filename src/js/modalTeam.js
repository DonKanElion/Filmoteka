(() => {
  const refs = {
    openModalBtn: document.querySelector(".footer__btn-team"),
    closeModalBtn: document.querySelector(".modal__close"),
    modalTeam: document.querySelector(".backdrop__team"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  refs.closeModalBtn.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        toggleModal();
      }
      })

  window.addEventListener("click", function(event) {
    if (event.target === document.querySelector('.backdrop__team')) {
      toggleModal();
    }
  });

  function toggleModal() {
    refs.modalTeam.classList.toggle("is-hidden");
  }
})();
