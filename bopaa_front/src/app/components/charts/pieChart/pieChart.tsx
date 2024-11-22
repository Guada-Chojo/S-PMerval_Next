import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface ChartComponentProps {
    explodedSlice: number | null;
    highlightedSlice: number | null;
  }

export const PieChart: React.FC<ChartComponentProps> = ({ explodedSlice,
  highlightedSlice, }) => {

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      // Update screen size only on the client
      const updateScreenSize = () => setIsSmallScreen(window.innerWidth < 768);
      updateScreenSize();
  
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

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

  // Dynamically build slices: explodedSlice overrides highlightedSlice
  const slices: Record<number, { offset?: number; color?: string }> = {};
  if (highlightedSlice !== null) {
    slices[highlightedSlice] = { color: "orange" }; // Highlight with color
  }
  if (explodedSlice !== null) {
    slices[explodedSlice] = { offset: 0.3 }; // Add offset
  }

  // Initial chart options
  const options = {
    pieSliceText: isSmallScreen ? "percentage" : "none", // Labels on small screens
    legend: { position: isSmallScreen ? "bottom" : "none" },
    backgroundColor: 'transparent',
    slices,
  };

   // Handler function to update exploded slice
  return (
    <div className="bg-white rounded-xl w-[45%] h-[50%]">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        height={'100%'}
      />
    </div>
  );
};

