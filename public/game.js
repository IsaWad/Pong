// Get the height and width of the map
const map = document.querySelector(".map");
const mapStyle = getComputedStyle(map);
const mapHeight = map.clientHeight;
const mapWidth = map.clientWidth;

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
    const newTop = Math.max(
      0 + paddle_1Height / 1000,
      currentTop - mapHeight * 0.06
    );
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
    const newTop = Math.max(
      0 + paddle_1Height / 1000,
      currentTop - mapHeight * 0.06
    );
    paddle_2.style.top = newTop + "px";
  }

  if (key === "ArrowDown") {
    const currentTop = parseInt(paddle_2Style.top);
    const newTop = Math.min(
      mapHeight - paddle_1Height,
      currentTop + mapHeight * 0.06
    );
    paddle_2.style.top = newTop + "px";
  }
}

document.addEventListener("keydown", handleKeyDown);

const ball = document.querySelector(".ball");

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

  // Update ball position
  ball.style.top = ballTop + dy + "px";
  ball.style.left = ballLeft + dx + "px";

  if (ballTop < 0) {
    ball.style.top = "0px";
    dy = -dy;
  } else if (ballTop > mapHeight - ball.clientHeight) {
    ball.style.top = mapHeight - ball.clientHeight + "px";
    dy = -dy;
  }

  if (ballLeft < 0) {
    ball.style.left = "0px";
    dx = -dx;
  } else if (ballLeft > mapWidth - ball.clientWidth) {
    ball.style.left = mapWidth - ball.clientWidth + "px";
    dx = -dx;
  }
  //Hej
}

setInterval(moveBall, 50);
