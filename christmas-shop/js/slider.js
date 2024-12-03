// const body = document.body; Уже объявлен в menu
const btnRight = document.getElementById("btnRight");
const btnLeft = document.getElementById("btnLeft");

btnRight.onclick = right;
btnLeft.onclick = left;

// Ивент листенер на кнопочки вперёд/назад
function right() {
  window.alert("Вперёд!!!");
}

function left() {
  window.alert("Назад...");
}

// btnRight.addEventListener("click", right());

// Событие ресайз
