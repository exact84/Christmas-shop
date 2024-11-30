const burgerToggle = document.getElementById("burger-toggle");
const body = document.body;

burgerToggle.addEventListener("change", function () {
  if (burgerToggle.checked) {
    body.classList.add("no-scroll");
  } else {
    body.classList.remove("no-scroll");
    // window.alert("не отмечен");
  }
});

document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.getElementById("burger-toggle").checked = false; // Снимаем отметку с чекбокса
    body.classList.remove("no-scroll");
  });
});
