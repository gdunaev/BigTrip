import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

const createStatisticsTemplate = (isStats) => {
  // console.log('222', )
  // if (isStats) {
      return `<section class="statistics visually-hidden">
<h2>Trip statistics</h2>

<!-- Пример диаграмм -->
<!--<img src="img/big-trip-stats-markup.png" alt="Пример диаграмм">-->

<div class="statistics__item money">
  <canvas class="statistics__chart statistics__chart--money" id="money" width="900"></canvas>
</div>

<div class="statistics__item">
  <canvas class="statistics__chart statistics__chart--transport" id="type" width="900"></canvas>
</div>

<div class="statistics__item">
  <canvas class="statistics__chart statistics__chart--time" id="time" width="900"></canvas>
</div>
</section>`;
  // }
  // return '';

};

const compareSum = (elemA, elemB) => {
  return elemB - elemA;
}

const renderMoneyChart = (moneyCtx, points) => {

  console.log(points)
const table = {};
const res = points.filter(({typePoint, basePrice}) => {
  // console.log(typePoint, basePrice)

  if(table[typePoint]){
    // let sum = table[typePoint];
    table[typePoint] = table[typePoint] + basePrice;
  } else {
    table[typePoint] = basePrice;
  }


});
// .sort(compareSum);
console.log(table);
let sortable = Object.entries(table);

sortable.sort((a, b) => {
  // console.log(a[1], a)
  return b[1] -  a[1]  ;
});

// const test = Object.values(table).sort(compareSum);
console.log(sortable);
// test.forEach(element => {
//   console.log(element);
// });

moneyCtx.height = BAR_HEIGHT * 5;


return new Chart(moneyCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE'],
    datasets: [{
      data: [400, 300, 200, 160, 150, 100],
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: (val) => `€ ${val}`,
      },
    },
    title: {
      display: true,
      text: 'MONEY',
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        minBarLength: 50,
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
})
};



const renderTypeChart = (typeCtx, points) => {

  typeCtx.height = BAR_HEIGHT * 5;


  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE'],
      datasets: [{
        data: [4, 3, 2, 1, 1, 1],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  timeCtx.height = BAR_HEIGHT * 5;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE'],
      datasets: [{
        data: [4000, 300, 100, 160, 150, 100],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  })
};



export default class StatisticsView extends SmartView {
  constructor(points) {
    super();

    this._points = points;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

  }

  // setCharts();

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  start() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    // const {tasks, dateFrom, dateTo} = this._data;

     const moneyCtx = document.querySelector('.statistics__chart--money');
    //  console.log('11', moneyCtx)
    const typeCtx = document.querySelector('.statistics__chart--transport');
    const timeCtx = document.querySelector('.statistics__chart--time');

    this._moneyChart = renderMoneyChart(moneyCtx, this._points);
    this._typeChart = renderTypeChart(typeCtx, this._points);
    this._timeChart = renderTimeChart(timeCtx, this._points);
  }
}
