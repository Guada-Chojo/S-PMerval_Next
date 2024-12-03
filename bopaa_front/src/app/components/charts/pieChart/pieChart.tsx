import React, { useEffect, useRef, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { InfoTable } from "./infoTable";
import { getDataParticipacion } from "@/app/services/empresas";
import { useTranslation } from "next-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  highlightSegment: string | null;
}


export const PieChart: React.FC<PieChartProps> =({ highlightSegment }) => {
    const chartRef = useRef<any>(null);
    const [dataset, setDataset] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [datos, setDatos] = useState<any[]>([]);
    // State to store offset for each segment
    const [offsets, setOffsets] = useState<number[]>(Array(7).fill(0));
    const [hoverSegmentIndex, setHoverSegmentIndex] = useState<number | null>(null);
    const {t} = useTranslation();
    
    const baseColors = [
      'rgba(255, 99, 132, 0.4)',
      'rgba(54, 162, 235, 0.4)',
      'rgba(255, 206, 86, 0.4)',
      'rgba(75, 192, 192, 0.4)',
      'rgba(153, 102, 255, 0.4)',
      'rgba(255, 159, 64, 0.4)',
      'rgba(255, 135, 87, 0.4)',
    ];

    const obtenerDatos = async () => {
      const datos = await getDataParticipacion();
      let labels: string[] = []
      let dataset: number[] = []
      datos.map((empresa: any) => {
        labels.push(empresa.codEmpresa);
        dataset.push(empresa.participacionMercado);
      })
      console.log(dataset)
      setDataset(dataset);
      setLabels(labels);
      setDatos(datos);
    }
  
    useEffect(() => {
      obtenerDatos();
    }, []);
  

    const brightenedColors = baseColors.map((color) => color.replace(/0.4/, '0.9'));
    
    const data = {
      labels: labels,
      datasets: [
        {
          label: `${t('pieTooltip')}`,
          data: dataset,
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
        console.log('Current',chart);
        console.log('Highlight',highlightSegment);
        console.log(data.labels);
        const segmentIndex = data.labels.indexOf(highlightSegment);

        if (segmentIndex !== -1) {
          const newOffsets = offsets.map((offset, index) =>
            index === segmentIndex ? 30 : 0 // Pop out the selected slice with offset 20
            
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
      <div className="card">
        <div className="card-body p-2 bg-white shadow-lg rounded-xl">
        <div className="pt-0.5 px-4 flex justify-between items-center">
          <div className="">{t('pie')}</div>
        </div>
          <hr className=" border-[1px] w-[90%] self-center pb-0"></hr>
          <div className="flex flex-row items-center justify-evenly p-5"> 
              <div className="pr-3">
                <Pie ref={chartRef} data={data}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false, // Disable the legend
                      },
                    },
                  }} />
              </div>
              <InfoTable onHoverRow={handleHoverRow} labels={labels} data={dataset}/>
            
          </div>
        </div>
      </div>
    );
  };

