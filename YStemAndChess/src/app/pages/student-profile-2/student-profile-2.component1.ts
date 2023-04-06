//get canvas element
const canvasElement = document.getElementById('myChart') as HTMLCanvasElement;

//create interface for API Data retrieval
interface Timecard {
    username: string;
    mentor: number;
    lesson: number;
    play: number;
    puzzle: number;
    website: number;
}

/*//date/times to paste in the URL to fetch from the API

//const currentDate: Date = new Date();
const username: string = "zteststudent";
const startDate = new Date('2023-03-01T00:00:00');
const endDate = new Date('2023-04-01T00:00:00');

fetch("/timeTracking/statistics?username={zteststudent}&startDate=${2023-03-01T00:00:00}&endDate={2023-04-01T00:00:00.000Z}")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    timecardStorage.push(convertAPIValues(data));
  })
  .catch((error) => console.error("FETCH ERROR:", error));
*/

//-----------------------------------------------------
const timecardStorage: any[] = [];

let testAPIObj: Timecard = {
    username: "zteststudent",
    mentor: 368455,
    lesson: 0,
    play: 0,
    puzzle: 0,
    website: 0
};

function convertAPIValues(apiObj) {
  let dummyAPIObj = apiObj;
  let milMentor = dummyAPIObj.mentor / 60000;
  let milLesson = dummyAPIObj.lesson / 60000;
  let milPlay = dummyAPIObj.play / 60000;
  let milPuzzle = dummyAPIObj.puzzle / 60000;
  let milWebsite = dummyAPIObj.website / 60000;

  let trueArray = [milWebsite, milLesson, milPuzzle, milPlay, milMentor];
  return trueArray;
};

//dummy tables
timecardStorage.push(convertAPIValues(testAPIObj));
let monthX = timecardStorage[0];
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
//@ts-ignore
let newChart = new Chart(canvasElement, config), any;
