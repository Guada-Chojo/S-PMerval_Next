import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { InfoTable } from "./infoTable";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  highlightSegment: string | null;
}


export const PieChart: React.FC<PieChartProps> = 
  ({ highlightSegment }) => {
    const chartRef = useRef<any>(null);
  
  // State to store offset for each segment
  const [offsets, setOffsets] = useState<number[]>(Array(7).fill(0));
  const [hoverSegmentIndex, setHoverSegmentIndex] = useState<number | null>(null);

  const baseColors = [
    'rgba(255, 99, 132, 0.4)',
    'rgba(54, 162, 235, 0.4)',
    'rgba(255, 206, 86, 0.4)',
    'rgba(75, 192, 192, 0.4)',
    'rgba(153, 102, 255, 0.4)',
    'rgba(255, 159, 64, 0.4)',
    'rgba(255, 135, 87, 0.4)',
  ];

  const brightenedColors = baseColors.map((color) => color.replace(/0.4/, '0.9'));

  const data = {
    labels: ['Apple', 'Boeing', 'Coca-Cola', 'Google', 'Microsoft', 'Nestlé', 'NVIDIA'],
    datasets: [
      {
        label: 'Participación',
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: baseColors.map((color, index) =>
          hoverSegmentIndex === index ? brightenedColors[index] : color
        ),
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 189, 45, 0.2)',
        ],
        borderWidth: 1,
        offset: offsets,  // Set the offsets for each slice
      },
    ],
  };

  useEffect(() => {
    if (highlightSegment && chartRef.current) {
      const chart = chartRef.current;
      const segmentIndex = data.labels.indexOf(highlightSegment);

      if (segmentIndex !== -1) {
        const newOffsets = offsets.map((offset, index) =>
          index === segmentIndex ? 20 : 0 // Pop out the selected slice with offset 20
        );
        setOffsets(newOffsets);  // Update offsets state
        chart.update();          // Update the chart to reflect changes
      }
    }
  }, [highlightSegment]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [hoverSegmentIndex]);

  const handleHoverRow = (index: number | null) => {
    setHoverSegmentIndex(index);
  };

   // Handler function to update exploded slice
  return (
      <div className=" bg-white rounded-xl flex">
        <Pie ref={chartRef} data={data}
        options={{
          responsive:true,
          plugins: {
            legend: {
              display: false, // Disable the legend
            },
          },
        }}/>
        <InfoTable onHoverRow={handleHoverRow}/>
      </div>
  );
};

