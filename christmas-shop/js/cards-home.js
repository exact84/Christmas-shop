fetch("./gifts.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  })
  .then((cards) => {
    // Перемешиваем массив
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    const categories = {
      "For Work": "gift-for-work.png",
      "For Health": "gift-for-health.png",
      "For Harmony": "gift-for-harmony.png",
    };

    const colors = {
      "For Work": "#4361FF",
      "For Health": "#06A44F",
      "For Harmony": "#FF43F7",
    };

    fillGiftList("All");

    function fillGiftList(filter = "All") {
      // Заполнение списка подарков
      let gifts_cards = "";
      let i = -1;
      for (let card of cards) {
        i += 1;
        gifts_cards =
          gifts_cards +
          `          <div class="best-card" id="${i}">
              <img class="best-img" src="./img/${
                categories[card.category]
              }" alt="Gift ${card.category}">
              <div class="best-card-footer">
                <h4 class="header4" style="color: ${colors[card.category]};">${
            card.category
          }</h4>
                <h3 class="h3-black">${card.name}</h3>
              </div>
            </div>`;
        if (i == 4) {
          break;
        }
      }
      const cardsElement = document.getElementById("best-cards");
      cardsElement.innerHTML = gifts_cards;
    }

    // Модальное окно
    const modalWindow = document.getElementById("modal");
    const closeBtn = document.getElementById("close-btn");
    const overlay = document.getElementById("overlay");
    let flag = true;

    document
      .getElementById("best-cards")
      .addEventListener("click", function (event) {
        // alert(`нажато! ${container}`);
        const container = event.target.closest(".best-card");
        if (flag) {
          flag = false;
          // console.log(container);
          const id = container.id;
          const card = cards[id];

          // Переносим данные в модальное окно
          const curImg = document.getElementsByClassName("gifts-img2");
          curImg[curImg.length - 1].style.backgroundImage = `url("./img/${
            categories[cards[container.id].category]
          }")`;

          const category = document.getElementById("category");
          const name = document.getElementById("name");
          const description = document.getElementById("description");
          category.innerHTML = cards[container.id].category;
          category.style.color = colors[cards[container.id].category];
          name.innerHTML = cards[container.id].name;
          description.innerHTML = cards[container.id].description;

          const power1 = document.getElementById("power1");
          const power2 = document.getElementById("power2");
          const power3 = document.getElementById("power3");
          const power4 = document.getElementById("power4");
          power1.innerHTML = cards[container.id].superpowers.live;
          power2.innerHTML = cards[container.id].superpowers.create;
          power3.innerHTML = cards[container.id].superpowers.love;
          power4.innerHTML = cards[container.id].superpowers.dream;

          const snowflakes1 = document.getElementById("snowflakes1");
          const snowflakes2 = document.getElementById("snowflakes2");
          const snowflakes3 = document.getElementById("snowflakes3");
          const snowflakes4 = document.getElementById("snowflakes4");
          let countFl = +cards[container.id].superpowers.live / 100;
          snowflakes1.innerHTML = "";
          for (let i = 1; i <= 5; i += 1) {
            if (i <= countFl)
              snowflakes1.innerHTML += '<img src="./img/snowflake-small.svg">';
            else
              snowflakes1.innerHTML +=
                '<img src="./img/snowflake-small-op.svg">';
          }
          countFl = +cards[container.id].superpowers.create / 100;
          snowflakes2.innerHTML = "";
          for (let i = 1; i <= 5; i += 1) {
            if (i <= countFl)
              snowflakes2.innerHTML += '<img src="./img/snowflake-small.svg">';
            else
              snowflakes2.innerHTML +=
                '<img src="./img/snowflake-small-op.svg">';
          }
          countFl = +cards[container.id].superpowers.love / 100;
          snowflakes3.innerHTML = "";
          for (let i = 1; i <= 5; i += 1) {
            if (i <= countFl)
              snowflakes3.innerHTML += '<img src="./img/snowflake-small.svg">';
            else
              snowflakes3.innerHTML +=
                '<img src="./img/snowflake-small-op.svg">';
          }
          countFl = +cards[container.id].superpowers.dream / 100;
          snowflakes4.innerHTML = "";
          for (let i = 1; i <= 5; i += 1) {
            if (i <= countFl)
              snowflakes4.innerHTML += '<img src="./img/snowflake-small.svg">';
            else
              snowflakes4.innerHTML +=
                '<img src="./img/snowflake-small-op.svg">';
          }

          overlay.classList.add("show");
          modalWindow.classList.add("show");
          body.classList.add("no-scroll");
          event.stopPropagation();
        }
      });
    // }

    closeBtn.addEventListener("click", function () {
      // Закрыть модальное окно
      // alert("отжато!");
      flag = true;
      modalWindow.classList.remove("show");
      overlay.classList.remove("show");
      body.classList.remove("no-scroll");
      // event.stopPropagation();
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
