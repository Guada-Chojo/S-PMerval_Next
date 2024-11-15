import React, { useState } from "react";
import { Chart } from "react-google-charts";

interface ChartComponentProps {
    explodedSlice: number | null;
  }

export const PieChart: React.FC<ChartComponentProps> = ({ explodedSlice }) => {

  // Data for the chart
  const data = [
    ["Category", "Value"],
    ["Apple", 45],
    ["Boeing", 30],
    ["Coca-cola", 25],
    ["Google", 20],
    ["Microsoft", 50],
    ["Nestlé", 18],
    ["NVIDIA", 72],
  ];

  // Initial chart options
  const options = {
    pieSliceText: "label",
    backgroundColor: 'transparent',
    slices: explodedSlice !== null ? { [explodedSlice]: { offset: 0.1 } } : {},
    tooltip: { trigger: explodedSlice !== null ? "selection" : "none" }, // Disable tooltips unless a slice is exploded
    enableInteractivity: explodedSlice !== null, // Disable interactions unless a slice is exploded
  };

   // Handler function to update exploded slice
  return (
    <div className="bg-white rounded-xl w-[45%] h-[50%]">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
      />
    </div>
  );
};

