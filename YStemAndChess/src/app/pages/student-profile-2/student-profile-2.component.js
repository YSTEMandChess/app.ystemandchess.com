//get canvas element
const canvasElement = document.getElementById('myChart');

//dummy tables
let monthX = [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1];
let monthY = [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1];

//chartjs config
let config = {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Website',
            data: [monthX[0], monthY[0]]
          }, {
            label: 'Lessons',
            data: [monthX[1], monthY[1]]
          }, {
            label: 'Puzzle',
            data: [monthX[2], monthY[2]]
          }, {
            label: 'Playing',
            data: [monthX[3], monthY[3]]
          }, {
            label: 'Mentoring',
            data: [monthX[4], monthY[4]]
          }]
        },
        options: {
          aspectRatio: 0.75,
          maintainAspectRatio: false,
          Responsive: true,
          layout: {
            padding: {
              left: 100,
              top: 50,
              right: 100
            },
          },
          scales: {
            y: {
              grid: {
                display: true
              }
            },
            x: {
              grid: {
                display: true
              }
            }
          },
          plugins: {
            legend: {
                position: 'bottom'
            }
          },
          barPercentage: 0.5,
          categoryPercentage: 1,
          borderRadius: 3
      },
      };

let newChart = new Chart(canvasElement, config);