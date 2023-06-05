import { Bar } from "react-chartjs-2";
import { IChartProps } from "../types/chart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//can omit options
const options = {
  responsive: true,
  plugins: {
    legend: {
      // display: false,
      position: "bottom" as const, //default is top
    },
    title: {
      display: true,
      text: "Bar Chart for orders",
    },
  },
};

function BarChart({ chartData }: IChartProps) {
  //charts data
  const data = {
    labels: chartData.map((data) => data.year),
    datasets: [
      {
        label: "User gained",
        data: chartData.map((data) => data.userGain),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        // borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "User Lost",
        data: chartData.map((data) => data.userLost),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        // borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;
