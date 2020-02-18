const data = {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderColor:
        'rgba(255, 99, 132, 1)',
      backgroundColor: "transparent",
      borderWidth: 1
    }],
    options: {
    },
  }
}
class ItsiChart {
  constructor(canvas) {
    this.parent = document.querySelector(canvas)
    this.canvas = document.createElement('canvas')

    this.ctx = this.canvas.getContext("2d")
    this.parent.appendChild(this.canvas)
    window.addEventListener('resize', () => this.defineChart(), {})
    this.defineChart()
  }
  defineChart() {
    const { width, height } = this.parent.getBoundingClientRect()
    let adata = {
      ...data,
      options: {
        title: {
          text: "Speed",
          display: true
        },
        // aspectRatio: (width / height),
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

const viChart = new ItsiChart("#chart")