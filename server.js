const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const port = 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

//detta servar innehåll i mappen /public
const publicPath = path.join(__dirname, "/public");
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

/* 
  Eventet "connection" triggas när någon klient kopplar sig till servern

  Då skapas en socket som är kopplad till den klient som kopplat upp sig.
  Denna socket kan man nu konfigurera så att den har rätt eventlyssnare.

  Servern kommer alltså har flera sockets igång om den har 
  flera klienter anslutna.
*/
io.on("connection", (socket) => {
  const count = io.engine.clientsCount;
  console.log("A user just connected.", socket.id, count);
  // När klienten på denna socket kopplar ifrån (typ stänger fönstret)
  socket.on("disconnect", () => {
    console.log("A user has disconnected.");
  });

// Emit initial ball position and score to clients
io.emit("init", { ball: { top: initialTop, left: initialLeft }, score: { player1: score_player_1, player2: score_player_2 } });

// Listen for paddle movement from clients
socket.on("movePaddle", (data) => {
  // Emit paddle movement to all clients
  io.emit("updatePaddle", data);
});

});
