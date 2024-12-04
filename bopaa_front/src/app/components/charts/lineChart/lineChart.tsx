import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  layouts,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useToggle } from '@/app/context/toggle.context';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useCurrency } from '@/app/context/currency.context';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
  },
  stacked: false,
  plugins: {
    legend: {
      display: false, // Disable the legend
    },
  },
  layout: {
    padding: 20, // Adds padding around the chart content
  },
  scales: {
    y: {
      display: true,
    },
  },
};



interface LineChartProps {
  empresa: any;
  datos: any[];
  labels: any;
  getDatos:Function;
}

export const LineChart: React.FC<LineChartProps> = ({ empresa, datos, labels, getDatos}) => {
  const [range, setRange] = useState('day');
  const recargarGrafico = (dias:number) => {  
      setRange(dias === 1 ? 'day' : 'month'); 
      getDatos(empresa, dias);
      console.log("Reloading chart with:", { dias, empresa });
      console.log("Fetched data:", datos);
  }
  const {t} = useTranslation();
  const { conversionRate, currency } = useCurrency();

  const data = {
  labels: labels,
  datasets: datos,
};
  return (
    <div className={`card bg-white rounded-xl h-[48%] w-full flex flex-col shadow-lg`}>
      <div className='card-body p-2'>
        <div className="pt-2 px-4 flex justify-between items-center">
         <div className='flex items-center pb-1'>
            <img src={`/imagenes/${empresa.codEmpresa}--big.svg`} alt={`${empresa.codEmpresa} icon`} className='mask mask-squircle h-12 w-12' />
            <div className='pl-3 flex-col'>
            <div className='card-title'>{empresa.codEmpresa}</div>           
              <div className="flex items-center justify-between">
                  <span className="text-sm">{(Number(empresa.ultimaCot)*conversionRate).toFixed(2)} {currency}</span>
                  <span
                    className={`flex items-center text-sm pl-5 ${
                      Number(empresa.variacion) < 0
                        ? "text-red-600"
                        : Number(empresa.variacion) === 0
                        ? "text-gray-600"
                        : "text-green-600"
                    }`}
                  >
                    {empresa.variacion}%
                    {Number(empresa.variacion) < 0 ? (
                      <ArrowTrendingDownIcon className="h-5 w-5 ml-1" />
                    ) : Number(empresa.variacion) === 0 ? (
                      <ArrowLongRightIcon className="h-5 w-5 ml-1" />
                    ) : (
                      <ArrowTrendingUpIcon className="h-5 w-5 ml-1" />
                    )}
                  </span>
                </div>
            </div>
          </div>
          <div role="tablist" className="tabs text-black">
            <a 
              role="tab" 
              className={`tab ${range === 'day' ? 'tab-active' : ''} hover:bg-slate-100 text-black rounded-lg`}
              onClick={() => recargarGrafico(1)}
              >
              {t('toggleChart.day')}
              </a>
            <a 
            role="tab" 
            className={`tab ${range === 'month' ? 'tab-active' : ''} hover:bg-slate-100 text-black rounded-lg`}
            onClick={() => recargarGrafico(30)}
            >
              {t('toggleChart.month')}
              </a>
          </div>
        </div>
        <hr className=" border-[1px] w-[90%] self-center pb-0"></hr>
        <div className='h-full w-full'>
          <Line options={options} data={data} className='' />
        </div>
      </div>
    </div>
  );
}
