const STATES = {
  CRITICAL: "#d50000",
  HIGH: "#ff867c",
  MEDIUM: "#00bcd4",
  LOW: "#4caf50"
}
const data = {
  type: 'line',
  data: {
    labels: Array(9),
    datasets: [{
      data: Array(9),
      borderWidth: 2
    }]
  }
}
class ItsiChart {
  constructor(canvas, { levels, maxEntries, min, max, step }) {
    this.parent = document.querySelector(canvas)
    this.canvas = document.createElement('canvas')
    this.levels = levels || {}
    this.maxEntries = maxEntries || 10
    this.min = min
    this.max = max
    this.step = step

    this.ctx = this.canvas.getContext("2d")
    this.parent.appendChild(this.canvas)
    window.addEventListener('resize', () => this.defineChart(), {})
    this.defineChart()
  }
  setData(value) {
    let { data: { labels, datasets } } = this.chart
    const dataset = datasets[0]
    const dataLen = dataset.data.length
    //  Remove first data-element if chart contains max entries
    if (dataLen >= this.maxEntries) {
      dataset.data.shift()
      labels.shift()
    }
    dataset.data.push(value)
    dataset.borderColor = this.getStateColor(value)
    labels.push(Math.random());
    this.chart.update()
  }
  getStateColor(value) {
    const { CRITICAL, HIGH, MEDIUM, LOW } = this.levels
    let state
    if (LOW) state = LOW(value) ? STATES.LOW : state
    if (MEDIUM) state = MEDIUM(value) ? STATES.MEDIUM : state
    if (HIGH) state = HIGH(value) ? STATES.HIGH : state
    if (CRITICAL) state = CRITICAL(value) ? STATES.CRITICAL : state
    return state
  }
  defineChart() {
    const { width, height } = this.parent.getBoundingClientRect()
    let adata = {
      ...data,
      options: {
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            ticks: {
              stepSize: this.step,
              suggestedMin: this.min,
              suggestedMax: this.max
            }
          }]
        },
        title: {
          text: "Speed",
          display: true
        },
        aspectRatio: (width / height),
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }
    }
    if (!this.chart) this.chart = new Chart(this.ctx, adata)
    else this.chart.update()
  }
}