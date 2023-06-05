import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { IChartProps } from "../types/chart";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      // display: false,

      position: "bottom" as const, //default is top
    },
    title: {
      display: true,
      text: "Pie Chart for orders",
    },
  },
};
//can only rep one dataset//extra is ignored
function PieChart({ chartData }: IChartProps) {
  //charts data
  const data = {
    labels: chartData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: chartData.map((data) => data.userGain),
        backgroundColor: [
          "#4a148c",
          "#ce93d8",
          "#7b1fa2",
          "#ab47bc",
          "#8e24aa",
        ],
        borderColor: ["#4a148c", "#ce93d8", "#7b1fa2", "#ab47bc", "#8e24aa"],
        borderWidth: 1,
        // cutout: "10%",//sets cutout//default is 0%//if 50% it looks like donut
        // hoverBackgroundColor: "red",
      },
    ],
  };

  return <Pie data={data} options={options} />;
}

export default PieChart;
