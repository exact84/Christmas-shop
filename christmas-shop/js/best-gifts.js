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
        `          <div class="best-card" id="${i}">
            <img class="best-img" src="./img/${
              categories[card.category]
            }" alt="Gift ${card.category}">
            <div class="best-card-footer">
              <h4 class="header4" style="color: #4361FF;">${card.category}</h4>
              <h3 class="h3-black">${card.name}</h3>
            </div>
          </div>`;
      if (i == 4) {
        break;
      }
    }
    const cardsElement = document.getElementById("best-cards");
    cardsElement.innerHTML = gifts_cards;
  });
