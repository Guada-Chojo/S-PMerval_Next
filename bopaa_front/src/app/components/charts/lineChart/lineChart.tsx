import { Chart } from "react-google-charts";

export const data = [
  ["Time", "Sales", "Expenses"],
  [new Date(2022, 4, 15, 9, 30), 1030, 540],
  [new Date(2022, 4, 17, 10, 30), 1000, 400],
  [new Date(2022, 5, 13, 11, 30), 1170, 460],
  [new Date(2022, 6, 13, 12, 30), 660, 1120],
];

export const options = {
  curveType: "function",
  backgroundColor: 'transparent',
  legend: { position: "none" },
  chartArea: { width: "80%", height: "70%" },
  hAxis: {
    format: "MMM dd, yyyy", // Custom date format
    gridlines: { count: 3 }, // Controls the number of gridlines
  },
};

export const LineChart = () => {
  return (
    <div className="bg-white rounded-xl w-[95%] h-[45%] flex flex-col">
      <div className="p-2 px-4">Cotización</div>
      <hr className=" border-[1px] w-[90%] self-center pb-0"></hr>
      <div className="relative w-[100%] h-">
        <Chart
          chartType="LineChart"
          data={data}
          width="100%"
          height="100%"
          options={options}
          formatters={[
            {
              column: 0,
              type: "DateFormat",
              options: {
                timeZone: 0,
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
