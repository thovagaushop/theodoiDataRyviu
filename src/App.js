import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getData } from "./services/dataInfoService";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [data, setData] = useState({
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "# of Data",
        data: [0, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const getDataForChart = async () => {
      try {
        let dataResult = await getData();
        let doneData = dataResult.index + 1;

        setData({
          labels: ["Red", "Blue"],
          datasets: [
            {
              label: "# of Data",
              data: [doneData, dataResult.total_user - doneData],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };
    getDataForChart();
  }, [data]);

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>Get Data Status</h1>
      <div style={{width: "400px", height: "400px", paddingTop: "50px", paddingLeft: "20px"}}>
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default App;
