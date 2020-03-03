const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898);
const wsServer = new WebSocketServer({
  httpServer: server
});

var emptyState = {
  speed: 0,
  fuel: 80,
  eta: 10
}, sentState = emptyState, currentData
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
setInterval(() => {
  const { speed, fuel, eta } = sentState
  currentData = {
    speed: calc({ min: 7, max: 16, step: [0.2, 0.3, 0.4, 0.5, 1], previous: speed }),
    fuel: Math.round((fuel - 0.01) * 100) / 100,
    eta: Math.round((eta + 0.1) * 100) / 100
  }
  sentState = currentData
}, 1000)
setInterval(() => {
  sentState = emptyState
}, 900000)
wsServer.on('request', function (request) {
  setInterval(() => {
    connection.sendUTF(JSON.stringify(currentData))
  }, 1000)

  const connection = request.accept(null, request.origin);
  connection.on('message', message => {
    if (message.utf8Data === "reset") {
      console.log("RESET")
      sentState = emptyState
    }
  })

});
