let robux = 100;
let dep = 100;
let p1 = ["💎", "💎", "💎"];
let p2 = ["💎", "💎", "💎"];
let p3 = ["💎", "💎", "💎"];
const symbols = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎"];
const rouletteSymbols = ['🔴', '💎', '⚫'];
let p4 = ["🔴", "💎", "⚫"];
let isSpinningSlot = false;
let isSpinningRoulette = false;
let bj = 1;

const blackjackCards = [
  { name: "2", value: 2, art: `┌─────────┐\n│2        │\n│         │\n│    ♠    │\n│         │\n│         │\n│        2│\n└─────────┘` },
  { name: "3", value: 3, art: `┌─────────┐\n│3        │\n│    ♠    │\n│         │\n│    ♠    │\n│         │\n│        3│\n└─────────┘` },
  { name: "4", value: 4, art: `┌─────────┐\n│4        │\n│  ♠   ♠  │\n│         │\n│         │\n│  ♠   ♠  │\n│        4│\n└─────────┘` },
  { name: "5", value: 5, art: `┌─────────┐\n│5        │\n│  ♠   ♠  │\n│    ♠    │\n│         │\n│  ♠   ♠  │\n│        5│\n└─────────┘` },
  { name: "6", value: 6, art: `┌─────────┐\n│6        │\n│  ♠   ♠  │\n│  ♠   ♠  │\n│         │\n│  ♠   ♠  │\n│        6│\n└─────────┘` },
  { name: "7", value: 7, art: `┌─────────┐\n│7        │\n│  ♠   ♠  │\n│  ♠ ♠ ♠  │\n│         │\n│  ♠   ♠  │\n│        7│\n└─────────┘` },
  { name: "8", value: 8, art: `┌─────────┐\n│8        │\n│  ♠ ♠ ♠  │\n│  ♠   ♠  │\n│         │\n│  ♠ ♠ ♠  │\n│        8│\n└─────────┘` },
  { name: "9", value: 9, art: `┌─────────┐\n│9        │\n│  ♠ ♠ ♠  │\n│  ♠ ♠ ♠  │\n│         │\n│  ♠ ♠ ♠  │\n│        9│\n└─────────┘` },
  { name: "J", value: 10, art: `┌─────────┐\n│J        │\n│    ♠    │\n│  ♠ J ♠  │\n│         │\n│    ♠    │\n│        J│\n└─────────┘` },
  { name: "A", value: 11, art: `┌─────────┐\n│A        │\n│    ♠    │\n│   ♠A♠   │\n│         │\n│    ♠    │\n│        A│\n└─────────┘` }
];

let playerCards = [];
let dealerCards = [];

function updateBalance() {
  document.getElementById("depValue").textContent = dep;
  document.getElementById("robux").textContent = robux;
  document.getElementById("blackjackBet").textContent = dep;
}

function plus() {
  if (dep + 10 <= robux) {
    dep += 10;
    updateBalance();
  }
}

function min() {
  if (dep - 10 >= 10) {
    dep -= 10;
    updateBalance();
  }
}

function showGame(game) {
  document.querySelectorAll(".game").forEach(div => div.classList.add("hidden"));
  document.getElementById("menu").classList.add("hidden");
  document.getElementById(`${game}Game`).classList.remove("hidden");
}

function goToMenu() {
  document.querySelectorAll(".game").forEach(div => div.classList.add("hidden"));
  document.getElementById("menu").classList.remove("hidden");
  updateBalance();
}

function spin() {
  if (isSpinningSlot) return;
  if (dep > robux) {
    showMessage("Недостатньо робуксів для ставки", "slotResult");
    return;
  }

  isSpinningSlot = true;
  robux -= dep;
  updateBalance();

  let steps = 30;
  let initialDelay = 50;
  let delayIncrement = 20;

  function spinStep(step, delay) {
    if (step <= 0) {
      const top1 = p1[0];
      const top2 = p2[0];
      const top3 = p3[0];
      const result = document.getElementById("slotResult");

      if (top1 === top2 && top2 === top3) {
        let winAmount = dep * 10;
        robux += winAmount;
        result.textContent = `🎉 Виграш! +${winAmount} робуксів`;
      } else {
        result.textContent = "😢 Нічого не випало.";
      }

      updateBalance();
      isSpinningSlot = false;
      setTimeout(() => { result.textContent = ""; }, 3000);
      return;
    }

    p1.unshift(symbols[Math.floor(Math.random() * symbols.length)]);
    p1.pop();
    p2.unshift(symbols[Math.floor(Math.random() * symbols.length)]);
    p2.pop();
    p3.unshift(symbols[Math.floor(Math.random() * symbols.length)]);
    p3.pop();

    document.getElementById("slot1").textContent = p1.join('\n');
    document.getElementById("slot2").textContent = p2.join('\n');
    document.getElementById("slot3").textContent = p3.join('\n');

    setTimeout(() => spinStep(step - 1, delay + delayIncrement), delay);
  }

  spinStep(steps, initialDelay);
}

function showMessage(text, elementId) {
  const el = document.getElementById(elementId);
  el.textContent = text;
  setTimeout(() => { el.textContent = ""; }, 3000);
}

function playRoulette(betColor) {
  if (isSpinningRoulette) return;
  if (dep > robux) {
    showMessage("Недостатньо робуксів для ставки", "rouletteResult");
    return;
  }

  isSpinningRoulette = true;
  robux -= dep;
  updateBalance();

  let steps = 30;
  let initialDelay = 50;
  let delayIncrement = 20;

  function spinStep(step, delay) {
    if (step <= 0) {
      let resultColor = p4[1];
      let win = false;

      if (betColor === "zero" && resultColor === '💎') {
        win = true;
      } else if (betColor === "червоне" && resultColor === '🔴') {
        win = true;
      } else if (betColor === "чорне" && resultColor === '⚫') {
        win = true;
      }

      const resultEl = document.getElementById("rouletteResult");
      if (win) {
        let winAmount = dep * 3;
        robux += winAmount;
        resultEl.textContent = `🎉 Ви виграли +${winAmount} робуксів!`;
      } else {
        resultEl.textContent = "😢 Ви програли.";
      }

      updateBalance();
      isSpinningRoulette = false;
      setTimeout(() => { resultEl.textContent = ""; }, 3000);
      return;
    }

    p4.unshift(rouletteSymbols[Math.floor(Math.random() * rouletteSymbols.length)]);
    p4.pop();
    document.getElementById("roll").textContent = p4.join('');
    setTimeout(() => spinStep(step - 1, delay + delayIncrement), delay);
  }

  spinStep(steps, initialDelay);
}

function getCard() {
  return blackjackCards[Math.floor(Math.random() * blackjackCards.length)];
}

function calculateScore(cards) {
  let sum = 0;
  let aces = 0;
  cards.forEach(c => {
    sum += c.value;
    if (c.name === "A") aces++;
  });

  while (sum > 21 && aces > 0) {
    sum -= 10;
    aces--;
  }

  return sum;
}

function renderCards(cards, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  cards.forEach(c => {
    const cardPre = document.createElement("pre");
    cardPre.classList.add("card");
    cardPre.textContent = c.art;
    container.appendChild(cardPre);
  });
}

function hit() {
  if (playerCards.length === 0) return;

  playerCards.push(getCard());
  renderCards(playerCards, "blackjackCards");

  const playerScore = calculateScore(playerCards);

  if (playerScore > 21) {
    document.getElementById("blackjackResult").textContent = "Перебір! Ви програли.";
    updateBalance();
    renderBlackjackStatus();
    document.getElementById("betButtons").style.display = "block";

    setTimeout(() => {
      playerCards = [];
      dealerCards = [];
      renderCards([], "blackjackCards");
      document.getElementById("blackjackResult").textContent = "";
      document.getElementById("blackjackPlayer").textContent = "";
      document.getElementById("blackjackDealer").textContent = "";
    }, 3000);
  } else {
    renderBlackjackStatus();
  }
}

function startBlackjack() {
  if (bj == 1) {
    bj = 0;
    if (dep > robux) {
      showMessage("Недостатньо робуксів для ставки", "blackjackResult");
      return;
    }

    robux -= dep;
    updateBalance();

    playerCards = [getCard(), getCard()];
    dealerCards = [getCard(), getCard()];
    renderCards(playerCards, "blackjackCards");

    document.getElementById("blackjackResult").textContent = "";
    renderBlackjackStatus();
    document.getElementById("betButtons").style.display = "none";
  }
}

function renderBlackjackStatus() {
  const playerScore = calculateScore(playerCards);
  const dealerScore = calculateScore(dealerCards);
  document.getElementById("blackjackPlayer").textContent = `Ваші карти: ${playerScore}`;
  document.getElementById("blackjackDealer").textContent = `Карти дилера: ${dealerScore}`;
}

function stand() {
  if (playerCards.length == 0) return;

  const playerScore = calculateScore(playerCards);

  while (calculateScore(dealerCards) < 17 && calculateScore(dealerCards) != playerScore) {
    dealerCards.push(getCard());
  }

  renderCards(playerCards, "blackjackCards");

  const dealerScore = calculateScore(dealerCards);
  let resultText = "";

  if (dealerScore > 21 || playerScore > dealerScore) {
    robux += dep * 2;
    resultText = "Ви виграли!";
  } else if (playerScore == dealerScore) {
    robux += dep;
    resultText = "Нічия!";
  } else if (playerScore == 21 && dealerScore != 21) {
    robux += dep * 10;
    resultText = "blackJack!";
  } else {
    resultText = "Ви програли.";
  }

  document.getElementById("blackjackResult").textContent = resultText;
  updateBalance();
  renderBlackjackStatus();
  document.getElementById("betButtons").style.display = "block";

  setTimeout(() => {
    playerCards = [];
    dealerCards = [];
    renderCards([], "blackjackCards");
    document.getElementById("blackjackResult").textContent = "";
    document.getElementById("blackjackPlayer").textContent = "";
    document.getElementById("blackjackDealer").textContent = "";
    bj = 1;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  let savedRobux = localStorage.getItem('robux');
  if (!savedRobux) {
    robux = 100;
    localStorage.setItem('robux', robux);
  } else {
    robux = parseInt(savedRobux);
  }
  document.getElementById('robux').textContent = robux;
});

function saveRobux() {
  localStorage.setItem('robux', robux);
}

function Payment(event) {
  event.preventDefault();
  const amount = parseInt(document.getElementById('robuxAmount').value);
  if (!isNaN(amount) && amount > 0) {
    robux += amount;
    updateBalance();
    saveRobux();
 
    goToMenu();
  } else {
    alert("Введіть коректну кількість робуксів");
  }
}

function loadRobux() {
  const saved = localStorage.getItem('robux');
  if (saved !== null) {
    robux = parseInt(saved);
  } else {
    robux = 100;
    saveRobux();
  }
}
