import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getData } from "./services/dataInfoService";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [data, setData] = useState({total_user: 0, total_product: 0, percen: 0, product_done: 0 ,doughnut: {
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
  }});

  useEffect(() => {
    const getDataForChart = async () => {
      try {
        let dataResult = await getData();
        let doneData = dataResult.index + 1;

        setData({total_user: dataResult.total_user, total_product: dataResult.total_product, percen: ((Math.round(dataResult.index + 1) * 100) / dataResult.total_user).toFixed(2), product_done: dataResult.number_product_done, doughnut: {
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
        }});
      } catch (error) {
        console.log(error);
      }
    };
    getDataForChart();
  }, [data]);

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>Get Data Status</h1>
      <h3 style={{color: "blue", fontWeight: "bold"}}>
        Done :  <span style={{color: "red"}}>{data.product_done.toLocaleString("en")}</span> / {data.total_product.toLocaleString("en")} Products
      </h3>
      <h3 style={{color: "blue", fontWeight: "bold"}}>
         Total user: {data.total_user.toLocaleString("en")}
      </h3>
      
      <h2 style={{color: "blue", fontWeight: "bold"}}>
        {data.percen} %
      </h2>
      <div style={{width: "400px", height: "400px", paddingTop: "50px", paddingLeft: "20px"}}>
        <Doughnut data={data.doughnut} />
      </div>
    </div>
  );
}

export default App;
