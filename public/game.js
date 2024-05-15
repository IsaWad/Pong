// Get the height and width of the map
const map = document.querySelector(".map");
const mapStyle = getComputedStyle(map);
const mapHeight = map.clientHeight;
const mapWidth = map.clientWidth;

// Create paddle 1
let paddle_1 = document.createElement("div");
paddle_1.classList.add("paddle", "paddle_1");
paddle_1.style.position = "absolute";
paddle_1.style.top = "50%";
paddle_1.style.left = "10px";
map.appendChild(paddle_1);

// Create paddle 2
let paddle_2 = document.createElement("div");
paddle_2.classList.add("paddle", "paddle_2");
paddle_2.style.position = "absolute";
paddle_2.style.top = "50%";
paddle_2.style.left = mapWidth - 20 + "px";
map.appendChild(paddle_2);

function handleKeyDown(event) {
  const key = event.key;

  const paddle_1 = document.querySelector(".paddle_1");
  const paddle_1Style = getComputedStyle(paddle_1);
  const paddle_1Height = paddle_1.clientHeight;

  const paddle_2 = document.querySelector(".paddle_2");
  const paddle_2Style = getComputedStyle(paddle_2);
  const paddle_2Height = paddle_2.clientHeight;

  if (key.toLowerCase() === "w") {
    const currentTop = parseInt(paddle_1Style.top);
    const newTop = Math.max(0, currentTop - mapHeight * 0.06);
    paddle_1.style.top = newTop + "px";
  }

  if (key.toLowerCase() === "s") {
    const currentTop = parseInt(paddle_1Style.top);
    const newTop = Math.min(
      mapHeight - paddle_1Height,
      currentTop + mapHeight * 0.06
    );
    paddle_1.style.top = newTop + "px";
  }

  if (key === "ArrowUp") {
    const currentTop = parseInt(paddle_2Style.top);
    const newTop = Math.max(0, currentTop - mapHeight * 0.06);
    paddle_2.style.top = newTop + "px";
  }

  if (key === "ArrowDown") {
    const currentTop = parseInt(paddle_2Style.top);
    const newTop = Math.min(
      mapHeight - paddle_2Height,
      currentTop + mapHeight * 0.06
    );
    paddle_2.style.top = newTop + "px";
  }
}

document.addEventListener("keydown", handleKeyDown);

const ball = document.querySelector(".ball");
ball.style.position = "absolute";

const initialTop = Math.random() * (mapHeight - ball.clientHeight);
const initialLeft = Math.random() * (mapWidth - ball.clientWidth);
ball.style.top = initialTop + "px";
ball.style.left = initialLeft + "px";

const randomSpeed = Math.random() * 5 + 2;
const randomAngle = Math.random() * Math.PI * 2;

let dx = Math.cos(randomAngle) * randomSpeed;
let dy = Math.sin(randomAngle) * randomSpeed;

function moveBall() {
  let ballTop = parseInt(ball.style.top);
  let ballLeft = parseInt(ball.style.left);

  const paddle_1Height = paddle_1.clientHeight;
  const paddle_1Width = paddle_1.clientWidth;
  const paddle_1Top = parseInt(paddle_1.style.top);
  const paddle_1Bottom = paddle_1Top + paddle_1Height;
  const paddle_1Right = parseInt(paddle_1.style.left) + paddle_1Width;

  const paddle_2Height = paddle_2.clientHeight;
  const paddle_2Width = paddle_2.clientWidth;
  const paddle_2Top = parseInt(paddle_2.style.top);
  const paddle_2Bottom = paddle_2Top + paddle_2Height;
  const paddle_2Left = parseInt(paddle_2.style.left);

  // Update ball position
  ball.style.top = ballTop + dy + "px";
  ball.style.left = ballLeft + dx + "px";

  // Check collision with top and bottom walls
  if (ballTop < 0) {
    ball.style.top = "0px";
    dy = -dy;
  } else if (ballTop > mapHeight - ball.clientHeight) {
    ball.style.top = mapHeight - ball.clientHeight + "px";
    dy = -dy;
  }

  // Check collision with left paddle
  if (
    ballLeft <= paddle_1Right &&
    ballLeft >= parseInt(paddle_1.style.left) &&
    ballTop + ball.clientHeight >= paddle_1Top &&
    ballTop <= paddle_1Bottom
  ) {
    ball.style.left = paddle_1Right + "px";
    dx = -dx;
  }

  // Check collision with right paddle
  if (
    ballLeft + ball.clientWidth >= paddle_2Left &&
    ballLeft <= paddle_2Left + paddle_2Width &&
    ballTop + ball.clientHeight >= paddle_2Top &&
    ballTop <= paddle_2Bottom
  ) {
    ball.style.left = paddle_2Left - ball.clientWidth + "px";
    dx = -dx;
  }

  // Check collision with left and right walls
  if (ballLeft < 0) {
    ball.style.left = "0px";
    dx = -dx;
  } else if (ballLeft > mapWidth - ball.clientWidth) {
    ball.style.left = mapWidth - ball.clientWidth + "px";
    dx = -dx;
  }
}

setInterval(moveBall, 15);
