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
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      // display: false,
      position: "bottom" as const, //default is top
    },
    title: {
      display: true,
      text: "Line Chart for orders",
    },
  },
};

function LineChart({ chartData }: IChartProps) {
  //charts data
  const data = {
    labels: chartData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: chartData.map((data) => data.userGain),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 2,
        pointBackgroundColor: "red",
      },
      {
        label: "Users Lost",
        data: chartData.map((data) => data.userLost),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
