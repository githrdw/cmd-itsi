/* Copyright (C) 2020 Ruben de Wit - All Rights Reserved
 * You may use, distribute and modify this code.
 * The above copyright notice and this permission notice 
 * shall be included in all copies or substantial portions of the software.
 */

const STATES = {
  CRITICAL: "#d50000",
  HIGH: "#ff867c",
  MEDIUM: "#00bcd4",
  LOW: "#4caf50"
}
class ItsiChart {
  constructor(chart, { levels, maxEntries, min, max, step, type }) {
    this.parent = document.querySelector(`[data-chart='${chart}']`)
    this.canvas = document.createElement('canvas')
    this.levels = levels || {}
    this.maxEntries = maxEntries || 10
    this.type = type || 'line'
    this.min = min
    this.max = max
    this.step = step

    this.ctx = this.canvas.getContext("2d")
    this.parent.appendChild(this.canvas)
    window.addEventListener('resize', () => this.defineChart(), {})
    this.defineChart()
  }
  setData(value, index = 0) {
    let { data: { labels, datasets } } = this.chart
    const dataset = datasets[0]
    dataset.data[index] = value
    dataset.backgroundColor = this.getStateColor(value)
    this.chart.update();

  }
  pushData(value) {
    let { data: { labels, datasets } } = this.chart
    const dataset = datasets[0]
    const dataLen = dataset.data.length
    //  Remove first data-element if chart contains max entries
    if (dataLen >= this.maxEntries) {
      dataset.data.shift()
      labels.shift()
    }
    //  Push value to data list
    dataset.data.push(value)
    //  Calculate color
    dataset.borderColor = this.getStateColor(value)
    //  Generate a random label (for now)
    labels.push(Math.random());
    //  Redraw the chart
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
      type: this.type,
      data: {
        labels: Array(this.maxEntries),
        datasets: [{
          data: Array(this.maxEntries),
          borderWidth: 2
        }]
      },
      options: {
        defaultFontColor: "#fff",
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            ticks: {
              stepSize: this.step,
              suggestedMin: this.min,
              suggestedMax: this.max,
              fontColor: "#fff"
            }
          }]
        },
        aspectRatio: (width / height),
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }
    }
    if (!this.chart) {
      this.chart = new Chart(this.ctx, adata)
    } else {
      this.chart.options.aspectRatio = width / height
      this.chart.update()
    }
  }
}