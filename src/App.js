import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getData } from "./services/dataInfoService";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [data, setData] = useState({totalUser: 0, totalProduct: 0, percen: 0, productDone: 0 ,doughnut: {
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
        let doneData = dataResult.currentIndex + 1;

        setData({totalUser: dataResult.totalUser, totalProduct: dataResult.totalProduct, percen: ((Math.round(dataResult.currentIndex + 1) * 100) / dataResult.totalUser).toFixed(2), productDone: dataResult.productDone, doughnut: {
          labels: ["Red", "Blue"],
          datasets: [
            {
              label: "# of Data",
              data: [doneData, dataResult.totalUser - doneData],
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
        Done :  <span style={{color: "red"}}>{data.productDone.toLocaleString("en")}</span> / {data.totalProduct.toLocaleString("en")} Products
      </h3>
      <h3 style={{color: "blue", fontWeight: "bold"}}>
         Total user: {data.totalUser.toLocaleString("en")}
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
