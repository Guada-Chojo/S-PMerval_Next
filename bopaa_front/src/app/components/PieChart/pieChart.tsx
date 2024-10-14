'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    highlightSegment: string | null;
}

const PieChart: React.FC<PieChartProps> = ({ highlightSegment }) => {
    const chartRef = useRef<any>(null);

    const [offsets, setOffsets] = useState<number[]>(Array(6).fill(0));
    
    const data = {
        labels: ['Google', 'Apple', 'NVIDIA', 'Boeing', 'Coca-Cola', 'Nestlé'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                offset: offsets,
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
                  setOffsets(newOffsets);
                chart.update();
            }
        }
    }, [highlightSegment]);

    return (
        <Pie
          ref={chartRef}  // Directly set the ref
          data={data}
        />
      );
};

export default PieChart;
