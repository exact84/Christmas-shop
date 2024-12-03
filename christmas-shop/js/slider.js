// const body = document.body; Уже объявлен в menu
const btnRight = document.getElementById("btnRight");
const btnLeft = document.getElementById("btnLeft");
const VectorRight = document.getElementById("VectorRight");
const VectorLeft = document.getElementById("VectorLeft");

const slider = document.querySelector(".slider-slider"); //class="slider-slider"

btnRight.onclick = right;
btnLeft.onclick = left;
body.onresize = resize;
const section = document.querySelector(".slider-row");
let widthVisble = section.offsetWidth;
let widthSlider = slider.offsetWidth;

let clicks = widthVisble > 768 ? 3 : 6;
let step = (widthSlider - widthVisble) / clicks;
let position = 0;
// console.log(
//   `widthVisble: ${widthVisble}, widthSlider: ${widthSlider}, clicks: ${clicks}`
// );

function right() {
  position -= step;
  if (10 - position >= widthSlider - widthVisble) {
    position = widthVisble - widthSlider;
    btnRight.classList.remove("slider-button-activ");
    VectorRight.setAttribute("stroke-opacity", "0.3");
  }
  if (position <= 0) {
    btnLeft.classList.add("slider-button-activ");
    VectorLeft.setAttribute("stroke-opacity", "1");
  }
  slider.style.transform = `translateX(${position}px)`;
}

function left() {
  position += step;
  btnRight.style.pointerEvents = "";
  if (position >= -10) {
    position = 0;
    btnLeft.classList.remove("slider-button-activ");
    VectorLeft.setAttribute("stroke-opacity", "0.3");
  }
  if (position > -1991) {
    btnRight.classList.add("slider-button-activ");
    VectorRight.setAttribute("stroke-opacity", "1");
  }
  slider.style.transform = `translateX(${position}px)`;
}

// Событие ресайз
function resize() {
  position = 0;
  clicks = widthVisble > 768 ? 3 : 6;
  step = (widthSlider - widthVisble) / clicks;
  widthVisble = section.offsetWidth;
  widthSlider = slider.offsetWidth;
  btnLeft.classList.remove("slider-button-activ");
  VectorLeft.setAttribute("stroke-opacity", "0.3");
  btnRight.classList.add("slider-button-activ");
  VectorRight.setAttribute("stroke-opacity", "1");
  slider.style.transform = `translateX(0px)`;
}
