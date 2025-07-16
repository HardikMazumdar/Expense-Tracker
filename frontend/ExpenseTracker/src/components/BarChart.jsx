import { Bar } from "react-chartjs-2";
export const BarChart = (props) => {
  return (
    <div className="chart-container">
    
      <Bar
        data={props.chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: props.text
            },
            legend: {
              display: false
            },
            maintainAspectRatio: true,
          }
        }}
      />
    </div>
  );
};