const $dom = new ReactiveDOM("text")

const speedChart = new ItsiChart("speed", {
  levels: {
    CRITICAL: v => v > 14,
    HIGH: v => v >= 12,
    MEDIUM: v => v >= 8,
    LOW: v => v < 8
  },
  maxEntries: 20,
  min: 7,
  max: 16,
  step: 4
})
const $socket = new WebSocket("wss://school.hrdw.nl/itsi/websocket");
const fuelChart = new ItsiChart("fuel", {

  levels: {
    CRITICAL: v => v < 20,
    HIGH: v => v <= 40,
    MEDIUM: v => v <= 75,
    LOW: v => v < 100
  },
  maxEntries: 1,
  type: 'bar',
  min: 0,
  max: 80,
  step: 25
})

$socket.onopen = function (e) {
  console.log("[open] Connection established");
};

$socket.onmessage = function (event) {
  if (event.data) {
    //  Parse speed and fuel from socket data
    const { speed, fuel } = JSON.parse(event.data)
    //  Update chart data
    speedChart.pushData(speed)
    fuelChart.setData(fuel)
    //  Set [data-listen="speed"] to <speed>
    $dom.set({ speed, fuel })
  }
};

$socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
    alert('ITSI datasource not reachable');
  }
};

$socket.onerror = function () {
  alert('ITSI datasource not reachable');
};