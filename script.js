let player = {
  health: 100,
  maxHealth: 100,
  attack: 20,
  defense: 10
};

let enemies = [
  { name: "Goblin", health: 100, maxHealth: 100, attack: 12, img: "goblin.png" },
  { name: "Orc", health: 120, maxHealth: 120, attack: 18, img: "orc.png" },
  { name: "Dragon", health: 150, maxHealth: 150, attack: 25, img: "dragon.png" }
];

let currentEnemyIndex = 0;
let enemy = { ...enemies[currentEnemyIndex] };

function loadEnemy() {
  enemy = { ...enemies[currentEnemyIndex] };
  document.getElementById("enemyName").innerText = `👹 ${enemy.name}`;
  document.getElementById("enemyImg").src = enemy.img;
  updateHealthBars();
}

function updateHealthBars() {
  document.getElementById("player-health").style.width = `${player.health}%`;
  document.getElementById("enemy-health").style.width = `${(enemy.health / enemy.maxHealth) * 100}%`;
}

function animateHit(id) {
  const el = document.getElementById(id);
  el.classList.add("shake");
  setTimeout(() => el.classList.remove("shake"), 300);
}

function logMessage(msg) {
  document.getElementById("log").innerText = msg;
}

function enemyTurn() {
  if (enemy.health <= 0) return;
  const damage = Math.floor(Math.random() * enemy.attack);
  player.health -= damage;
  if (player.health < 0) player.health = 0;
  logMessage(`👹 ${enemy.name} attacks you for ${damage} damage!`);
  animateHit("player-health");
  updateHealthBars();
  checkGameOver();
}

function checkGameOver() {
  if (player.health <= 0) {
    showEndScreen("💀 Game Over!");
  } else if (enemy.health <= 0) {
    currentEnemyIndex++;
    if (currentEnemyIndex >= enemies.length) {
      showEndScreen("🏆 You Win!");
    } else {
      logMessage(`🎉 You defeated ${enemy.name}! Next enemy approaching...`);
      setTimeout(() => {
        loadEnemy();
        updateHealthBars();
      }, 2000);
    }
  }
}

function disableButtons() {
  document.getElementById("attackBtn").disabled = true;
  document.getElementById("healBtn").disabled = true;
  document.getElementById("defendBtn").disabled = true;
}

function showEndScreen(message) {
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("endMessage").innerText = message;
  document.getElementById("endScreen").style.display = "flex";
}

function selectCharacter(type) {
  let img = "";
  if (type === "wizard") {
    player.attack = 25;
    player.defense = 5;
    img = "wizard.png";
    document.getElementById("playerTitle").innerText = "🧙‍♂️ Wizard";
  } else {
    player.attack = 15;
    player.defense = 15;
    img = "knight.png";
    document.getElementById("playerTitle").innerText = "🛡️ Knight";
  }

  document.getElementById("playerImg").src = img;
  document.getElementById("characterSelect").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  loadEnemy();
}

document.getElementById("attackBtn").addEventListener("click", () => {
  const damage = Math.floor(Math.random() * player.attack);
  enemy.health -= damage;
  if (enemy.health < 0) enemy.health = 0;
  logMessage(`🗡️ You attacked ${enemy.name} for ${damage} damage!`);
  animateHit("enemy-health");
  updateHealthBars();
  setTimeout(() => {
    enemyTurn();
    checkGameOver();
  }, 1000);
});

document.getElementById("healBtn").addEventListener("click", () => {
  const heal = Math.floor(Math.random() * 20) + 10;
  player.health += heal;
  if (player.health > player.maxHealth) player.health = player.maxHealth;
  logMessage(`💖 You healed for ${heal} HP!`);
  updateHealthBars();
  setTimeout(() => enemyTurn(), 1000);
});

document.getElementById("defendBtn").addEventListener("click", () => {
  const blocked = Math.floor(Math.random() * player.defense);
  player.health += blocked;
  logMessage(`🛡️ You blocked ${blocked} damage.`);
  updateHealthBars();
  setTimeout(() => enemyTurn(), 1000);
});