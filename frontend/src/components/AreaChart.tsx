import { Line } from "react-chartjs-2";
import { IChartProps } from "../types/chart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

//docs
//https://react-chartjs-2.js.org/examples/area-chart
//https:www.chartjs.org/docs/4.2.1/charts/area.html
//https://www.chartjs.org/docs/latest/samples/scale-options/ticks.html

//ChartJS.defaults.borderColor = "rgb(242, 244, 247)";//custom border color//working
// Chart.defaults.backgroundColor = "#9BD0F5";
// Chart.defaults.borderColor = "#36A2EB";
// Chart.defaults.color = "#000";


const options = {
  responsive: true,
  plugins: {
    legend: {
      // display: false,
      position: "bottom" as const, //have the compiler infer the most specific type it can
    },
    title: {
      display: false,
      text: "Line Chart for orders",
    },
  },
};
//area chart is just a line chart with the fill set to true in dataset
function AreaChart({ chartData }: IChartProps) {
  //charts data
  const data = {
    labels: chartData.map((data) => data.year),
    datasets: [
      {
        fill: true, //converts line chart to area chart
        label: "Users Gained",
        data: chartData.map((data) => data.userGain),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        // borderWidth: 2,
        pointBackgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return <Line data={data} options={options} />;
}

export default AreaChart;
