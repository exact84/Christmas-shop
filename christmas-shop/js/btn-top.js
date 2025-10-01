document.addEventListener("DOMContentLoaded", () => {
  const btnTop = document.getElementById("btn-top");
  const scrollLimit = 300;

  function showHideButton() {
    if (window.innerWidth <= 768 && window.scrollY > scrollLimit) {
      btnTop.style.display = "block";
    } else {
      btnTop.style.display = "none";
    }
  }

  showHideButton();

  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", showHideButton);
  window.addEventListener("resize", showHideButton);
});
