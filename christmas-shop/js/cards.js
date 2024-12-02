/* import { readFile } from "fs";

// Считываем JSON-файл
readFile("../gifts.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Ошибка чтения файла:", err);
    return;
  }
  try {
    const cards = JSON.parse(jsonString);
    console.log(cards);
  } catch (err) {
    console.log("Ошибка парсинга:", err);
  }
});
*/

fetch("../gifts.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  })
  .then((cards) => {
    // Перемешиваем массив
    // for (let i = cards.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [cards[i], cards[j]] = [cards[j], cards[i]];
    // }

    let gifts_cards = "";
    let i = 0;
    const categories = {
      "For Work": "gift-for-work.png",
      "For Health": "gift-for-health.png",
      "For Harmony": "gift-for-harmony.png",
    };

    for (let card of cards) {
      i += 1;
      // console.log(card);
      gifts_cards =
        gifts_cards +
        `          <div class="gifts-card" id="${i}">
            <img class="gifts-img" src="../img/${
              categories[card.category]
            }" alt="Gift ${card.category}">
            <div class="gifts-card-footer">
              <h4 class="header4" style="color: #4361FF;">${card.category}</h4>
              <h3 class="h3-black">${card.name}</h3>
            </div>
          </div>`;
    }
    // console.log(gifts_cards);
    const cardsElement = document.getElementById("gifts-cards");
    cardsElement.innerHTML = gifts_cards;

    // Модальные окна
    const containers = document.getElementsByClassName("gifts-card");
    const modalWindow = document.getElementById("modal");
    const closeBtn = document.getElementById("close-btn");
    const overlay = document.getElementById("overlay");
    let flag = true;

    for (let container of containers) {
      container.addEventListener("click", function () {
        // alert("нажато!");
        if (flag) {
          flag = false;
          // Переносим данные в модальное окно
          const category = document.getElementById("category");
          const name = document.getElementById("name");
          const description = document.getElementById("description");
          category.innerHTML = cards[container.id].category;
          name.innerHTML = cards[container.id].name;
          description.innerHTML = cards[container.id].description;
          console.log(
            `ID: ${container.id} \n в окне - ${name.innerHTML}, в массиве ${
              cards[container.id].name
            }`
          );
          overlay.classList.add("show");
          modalWindow.classList.add("show");
          body.classList.add("no-scroll");
          event.stopPropagation();
        }
      });
    }

    closeBtn.addEventListener("click", function () {
      // alert("отжато!");
      flag = true;
      modalWindow.classList.remove("show");
      overlay.classList.remove("show");
      body.classList.remove("no-scroll");
      event.stopPropagation();
      // Останавливаем всплытие события, чтобы клик по кнопке не срабатывал на документ
    });

    document.addEventListener("click", function (event) {
      // Проверяем, был ли клик вне модального окна и кнопки закрытия
      if (
        !modalWindow.contains(event.target) &&
        event.target !== closeBtn &&
        !flag
      ) {
        flag = true;
        modalWindow.classList.remove("show");
        overlay.classList.remove("show");
        body.classList.remove("no-scroll");
      }
    });
  })
  .catch((error) => {
    console.error("Ошибка загрузки JSON:", error);
  });
