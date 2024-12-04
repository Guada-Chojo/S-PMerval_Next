import { useEffect, useState } from "react";
import { useToggle } from "@/app/context/toggle.context";
import { PieChart } from "../charts/pieChart/pieChart";
import { LineChart } from "../charts/lineChart/lineChart";
import './sideBar.css';
import { SidebarButton } from "./buttons";
import { getDataEmpresas, getDataGraficos } from "@/app/services/empresas";
import { getDataGraficosIndices } from "@/app/services/indices";
import { LineChartIndex } from "../charts/lineChart/lineChartIndex";
import { useCurrency } from "@/app/context/currency.context";

interface NavigationDrawerProps {
  labels: string[];
}

interface empresaTipo {
    codEmpresa: string,
    empresaNombre: string,
    ultimaCot: string,
    variacion: string
};

export const SideBar/* : React.FC<NavigationDrawerProps>  */ = ({ /* labels */ }) => {
  const [highlightSegment, setHighlightSegment] = useState<string | null>(null);
  /* const { isToggled } = useToggle(); */
  const [isMobile, setIsMobile] = useState(false);

  const [empresas, setEmpresas] = useState<empresaTipo[]>([]);

  const [empresasGrf, setEmpresasGrf] = useState<empresaTipo[]>([]);

  const { conversionRate, currency } = useCurrency();

  const getAllEmpresas = async () => {
    const empresas = await getDataEmpresas();
    setEmpresas(empresas);
  }

  useEffect(() => {
    getAllEmpresas();
  }, []);

  const [datos, setDatos] = useState<any[]>([]);
  const [datosI, setDatosI] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [labelsI, setLabelsI] = useState<any[]>([]);
  const [indice, setIndice] = useState<any>({
    codEmpresa: 'IMV',
    empresaNombre: 'Indice S&P Merval',
    ultimaCot: '',
    variacion: ''
  });

  const [selectedButton, setSelectedButton] = useState<empresaTipo>();


 // Update isMobile state based on screen width
/*   useEffect(() => {
    console.log('window: ', window.innerWidth)
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    console.log('mobile',isMobile)
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 */
  const generarColorAleatorio = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  const cargarIndices = async (dias: number) => {
    const datos = await getDataGraficosIndices(dias, 1);
    
    let labels: any[] = [];
    console.log('time: ',datos[0]);
    datos[0].map((dato: any) => {
      /* console.log('time: ',dato); */
      
        if (dato.hora == '09:00') {
        const label = `${dato.fecha.substring(8, 10)}-${dato.fecha.substring(5, 7)} ${dato.hora.substring(0, 2)}hs`
        labels.push(label);
      } else {
        const label = `${dato.hora.substring(0, 2)}hs`
        labels.push(label);
      }
      });
    console.log('Labels:', labels);
    
    const datasets = datos.map((dataset:any) => {
      let data:number[] = [];
      dataset.forEach((dato:any) => {
        console.log('valorindice: ', dato);
        
        data.push(dato.valorIndice*conversionRate);
      });

      return {
        label: dataset[0].codigoIndice,
        data: data,
        borderColor:  dataset[0].codigoIndice == 'IMV' ? '#31B6A6' : generarColorAleatorio(),
        backgroundColor: dataset[0].codigoIndice === "IMV" ? "rgba(49, 182, 166, 0.2)" : generarColorAleatorio().replace("1)", "0.2)"),
        borderWidth: dataset[0].codigoIndice === 'IMV' ? 3 : 1,
      }
    });
    /* const datasets: any = {}
    //indices por hora
    datos[0].forEach((dato:any, numIteracion: number) => {
      if (!datasets[dato.codigoIndice]) {
        datasets[dato.codigoIndice] = {};
      } 
      if (!datasets[dato.codigoIndice].data) {
        datasets[dato.codigoIndice].data = [];
      } 
      datasets[dato.codigoIndice] = {
        data: [...datasets[dato.codigoIndice].data, dato.valorIndice],
        label: dato.codigoIndice,
        borderColor:  dato.codigoIndice == 'IMV' ? '#31B6A6' : generarColorAleatorio(),
        backgroundColor: dato.codigoIndice === "IMV" ? "rgba(49, 182, 166, 0.2)" : generarColorAleatorio().replace("1)", "0.2)"),
        borderWidth: dato.codigoIndice === 'IMV' ? 3 : 1,

      }
      
    });
    const datasets2: any = [];
    for (const [key, value] of Object.entries(datasets)) {
      datasets2.push(value);
    } */
    setLabelsI(labels);
    setDatosI(datasets)
    // Update the `empresa` state for the index
    setIndice({
      codEmpresa: 'IMV',
      empresaNombre: 'Indice S&P Merval',
      ultimaCot: '',
      variacion: '',
    });
    };


  const cargarEmpresa = async (empresa: any, dias: number) => {
    console.log('Empresa codigo: ',empresa.codEmpresa);
    try {
    const datos = await getDataGraficos(empresa.codEmpresa, dias);
    console.log("Datos for day:", datos);
    let labels: any[] = [];
    let data: number[] = [];
    datos.map((dato: any) => {
      if (dato.hora == '09:00') {
        const label = `${dato.fecha.substring(8, 10)}-${dato.fecha.substring(5, 7)} ${dato.hora.substring(0, 2)}hs`
        labels.push(label);
      } else {
        const label = `${dato.hora.substring(0, 2)}hs`
        labels.push(label);
      }
      data.push(dato.cotization*conversionRate);
    })
    const dataset = [{
      label: empresa.codEmpresa,
      data: data,
      borderColor: '#31B6A6',
      backgroundColor: '#31B6A6',
    }]
    setLabels(labels);
    setDatos(dataset)
    setEmpresasGrf(empresa);
  } catch (error) {
    console.error("Error loading chart data:", error);
    setLabels([]);
    setDatos([]);
}
  }

  const handleButtonClick = (button: typeof empresas[0]) => {
    setSelectedButton(button);
    setHighlightSegment(button.codEmpresa);
    cargarEmpresa(button, 1)
  };

  useEffect(() => {
    cargarIndices(1);
  }, []);

  useEffect(() => {
    console.log('Useeffect empresas: ',empresas);
    
    if (empresas.length > 0) {
      setSelectedButton(empresas[0]);
      cargarEmpresa(empresas[0], 1); // Initialize first chart
    }
  }, [empresas]);


  return (
    <div className="bg-[#ffffff] flex text-black h-screen">
      <div className={`transition-all duration-300 bg-white ${!isMobile ? "w-[17rem]" : "w-20"} flex flex-col pt-6`}/* {`drawer ${isExpanded ? 'w-64' : 'w-20'} flex flex-col h-screen`} */>
        <nav className="flex-1 overflow-hidden"> {/* //overflow-hidden py-4 */}
          <ul className={`${!isMobile ? /* (isToggled ? */ "pr-1" : "pl-1"/* ) : isToggled ? "pr-1" : "pl-1" */}`} >
            {empresas.length > 0 && empresas.map((button, index) => (
              <SidebarButton
                key={index}
                {...button}
                isExpanded={!isMobile}
                icon={`/imagenes/${button.codEmpresa}--big.svg`}
                onClick={() => handleButtonClick(button)}
              />))}
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-3 bg-slate-100">
        {/* Main content goes here */}
        <div className="flex flex-col h-full justify-around px-5">
         {empresas.length > 0 && selectedButton !== undefined && <LineChart empresa={selectedButton} datos={datos} labels={labels} getDatos={cargarEmpresa} />}
          <div className="flex flex-row justify-between">
            <LineChartIndex empresa={indice} icon='./imagenes/merval-index--big.svg' datos={datosI} labels={labelsI} getDatosIndice={cargarIndices} />
            <PieChart highlightSegment={highlightSegment} />
          </div>
        </div>
      </main>

    </div>
  );
}