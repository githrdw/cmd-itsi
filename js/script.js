const $socket = new WebSocket("wss://school.hrdw.nl/itsi/websocket");
const $dom = new ReactiveDOM("text")

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
const etaChart = new ItsiChart("eta", {
  type: "doughnut",
  maxEntries: 20,
  min: 7,
  max: 16,
  step: 4,
  legend: true,
  categories: [{ text: '% traveled', color: '#4caf50' }, { text: '% left', color: '#ff867c' }]
})

const toHHMMSS = n => {
  const o = n => ("" + Math.round(n)).padStart(2, 0);
  return ((n = Math.abs(n)) < 0 ? "-" : o(n / 3600 | 0) + ":" + o(n % 3600 / 60 | 0) + ":" + o(n % 60))
}

$socket.onopen = function (e) {
  console.log("[open] Connection established");
};

$socket.onmessage = function (event) {
  if (event.data) {
    //  Parse speed and fuel from socket data
    let data = JSON.parse(event.data)
    //  Update chart data
    speedChart.pushData(data.speed)
    fuelChart.setData(data.fuel)
    etaChart.setData(data.eta)
    etaChart.setData(100 - data.eta, 1)
    data.etaSeconds = toHHMMSS(900 - 900 * data.eta / 100)
    //  Set [data-listen="speed"] to <speed>
    $dom.set(data)
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