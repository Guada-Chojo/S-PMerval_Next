import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import {
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    ArrowLongRightIcon,
  } from "@heroicons/react/24/outline";
  import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { getDataIndice } from '@/app/services/indices';
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
      mode: 'nearest' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: 20,
    },
    scales: {
      y: {
        display: true,
      },
    },
  };
  
  interface LineChartProps {
    empresa: any;
    icon: string;
    datos: any[];
    labels: any;
    getDatosIndice:Function;
  }

  interface tipoIndice{
    codigoIndice: string,
        ultimaCot: string,
        variacion: number,
  }
  
  export const LineChartIndex: React.FC<LineChartProps> = ({empresa, icon, datos, labels, getDatosIndice}) => {
    const [range, setRange] = useState('day');
    const [indice, setIndice] = useState<tipoIndice>()
    const recargarGrafico = (dias:number) => {  
        setRange(dias === 5 ? 'day' : 'month'); 
        getDatosIndice(dias);
    }
    
    const {t} = useTranslation();

    const { conversionRate, currency } = useCurrency();

    const getIndice = async () => {
        const indice = await getDataIndice();
        setIndice(indice);
    }

    useEffect(() => {
        getIndice();
    }, []);
  
    const data = {
    labels,
    datasets: datos,
  };
    return (
      <div className={`card bg-white rounded-xl h-full w-[60%] flex flex-col shadow-lg`}>
        <div className='card-body p-2'>
          <div className="pt-2 px-4 flex justify-between items-center">
           <div className='flex items-center pb-1'>
              <img src={icon} alt={`IMV icon`} className='mask mask-squircle h-12 w-12' />
              <div className='pl-3 flex-col'>
              <div className='card-title'>{t('index')}</div>           
                { indice !== undefined &&
                    <div className="flex items-center justify-between">
                    <span className="text-sm">{(Number(indice.ultimaCot)*conversionRate).toFixed(2)} {currency}</span>
                    <span
                      className={`flex items-center text-sm pl-5 ${
                        Number(indice.variacion) < 0
                          ? "text-red-600"
                          : Number(indice.variacion) === 0
                          ? "text-gray-600"
                          : "text-green-600"
                      }`}
                    >
                      {indice.variacion}%
                      {Number(indice.variacion) < 0 ? (
                        <ArrowTrendingDownIcon className="h-5 w-5 ml-1" />
                      ) : Number(indice.variacion) === 0 ? (
                        <ArrowLongRightIcon className="h-5 w-5 ml-1" />
                      ) : (
                        <ArrowTrendingUpIcon className="h-5 w-5 ml-1" />
                      )}
                    </span>
                  </div>}
              </div>
            </div>
            <div role="tablist" className="tabs text-black">
              <a 
                role="tab" 
                className={`tab ${range === 'day' ? 'tab-active' : ''} hover:bg-slate-100 text-black rounded-lg`}
                onClick={() => recargarGrafico(5)}
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
          <div className='h-[90%] w-full'>
            <Line options={options} data={data} className='' />
          </div>
        </div>
      </div>
    );
  }
  