
const viChart = new ItsiChart("#chart", {
  levels: {
    CRITICAL: v => v > 12,
    HIGH: v => v >= 10,
    MEDIUM: v => v >= 8,
    LOW: v => v < 8
  },
  maxEntries: 20,
  min: 7,
  max: 16,
  step: 4
})
const $dom = new ReactiveDOM("listen")
const $socket = new WebSocket("ws://localhost:9898");

$socket.onopen = function (e) {
  console.log("[open] Connection established");
};

$socket.onmessage = function (event) {
  if (event.data) {
    //  Parse speed and fuel from socket data
    const { speed, fuel } = JSON.parse(event.data)
    //  Update chart data
    viChart.setData(speed)
    //  Set [data-listen="speed"] to <speed>
    $dom.set({ speed })
  }
};

$socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

$socket.onerror = function (error) {
  alert(`[error] ${error.message}`);
};
