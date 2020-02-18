const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898);
const wsServer = new WebSocketServer({
  httpServer: server
});

//  Random number generator
function calc({ min, max, step, previous }) {
  //  Calculate the chances that the outcome will be negative
  //  If the previous value === max, the result will be true
  //  If the previous value === min, the result will be false
  //  Numbers between min and max will be randomly selected
  const isNegative = (Math.random() + (previous - min) / (max - min)) * 100 > 100
  //  Chose an step size
  const chosenStep = step[Math.ceil(Math.random() * step.length - 1)]
  const newValue = previous + ([1, -1][+isNegative] * chosenStep);
  return Math.round((newValue + Number.EPSILON) * 100) / 100
}

wsServer.on('request', function (request) {

  var sentState = {
    speed: 0
  }
  const connection = request.accept(null, request.origin);
  setInterval(() => {
    const data = {
      speed: calc({ min: 7, max: 16, step: [0.2, 0.3, 0.4, 0.5, 1, 2], previous: sentState.speed })
    }
    connection.sendUTF(JSON.stringify(data))
    sentState = data
  }, 500)
});
