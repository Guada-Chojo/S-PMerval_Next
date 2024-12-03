import { useEffect, useState } from "react";
import { useToggle } from "@/app/context/toggle.context";
import { PieChart } from "../charts/pieChart/pieChart";
import { LineChart } from "../charts/lineChart/lineChart";
import './sideBar.css';
import { SidebarButton } from "./buttons";
import { getDataEmpresas, getDataGraficos } from "@/app/services/empresas";
import { getDataGraficosIndices } from "@/app/services/indices";
import { LineChartIndex } from "../charts/lineChart/lineChartIndex";

interface NavigationDrawerProps {
  labels: string[];
}

export const SideBar/* : React.FC<NavigationDrawerProps>  */ = ({ /* labels */ }) => {
  const [highlightSegment, setHighlightSegment] = useState<string | null>(null);
  const { isToggled } = useToggle();
  const [isMobile, setIsMobile] = useState(false);

  const [empresas, setEmpresas] = useState([{
    codEmpresa: '',
    empresaNombre: '',
    ultimaCot: '',
    variacion: ''
  }]);

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
  const [empresa, setEmpresa] = useState<any>({
    codEmpresa: 'IMV',
    empresaNombre: 'Indice S&P Merval',
    ultimaCot: '',
    variacion: ''
  });

  const [selectedButton, setSelectedButton] = useState(empresas[0]);


  // Update isMobile state based on screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generarColorAleatorio = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  const getDatosIndice = async (dias: number) => {
    const datos = await getDataGraficosIndices(dias, 1);
    let labels: any[] = [];
    datos.forEach((dato: any) => {
      if (dato.hora == '09:00') {
        const label = `${dato.fecha.substring(8, 10)}-${dato.fecha.substring(5, 7)} ${dato.hora.substring(0, 2)}hs`
        labels.push(label);
      } else {
        const label = `${dato.hora.substring(0, 2)}hs`
        labels.push(label);
      }
    });
    console.log('Labels:', labels);
    const datasets: any[] = [];
    datos.forEach((arrIndice:any) => {
      const ds = {
        label: arrIndice[0].codigoIndice,
        data: arrIndice.map((vi:any) => {
          return vi.valorIndice;
        }),
        borderColor: arrIndice[0].codigoIndice == 'IMV' ? '#31B6A6' : generarColorAleatorio(),
        backgroundColor: arrIndice[0].codigoIndice === "IMV" ? "rgba(49, 182, 166, 0.2)" : generarColorAleatorio().replace("1)", "0.2)"),
        borderWidth: arrIndice[0].codigoIndice === 'IMV' ? 3 : 1, // Highlight the index line
      }
      datasets.push(ds);
    });

    /* datasets = datos.map((dataset: any) => ({
      label: dataset.hora,
      data: dataset.map((dato: any) => dato.valorIndice),
      borderColor: dataset.codigoIndice == 'IMV' ? '#31B6A6' : generarColorAleatorio(),
      backgroundColor: dataset.codigoIndice === "IMV" ? "rgba(49, 182, 166, 0.2)" : generarColorAleatorio().replace("1)", "0.2)"),
      borderWidth: dataset.codigoIndice === 'IMV' ? 3 : 1, // Highlight the index line */

    console.log("Datos Indices:", datasets);
    setLabelsI(labels);
    setDatosI(datasets)
    // Update the `empresa` state for the index
    const mainIndex = datasets.find((data: any) => data[0].codigoIndice === 'IMV')[0];
    setEmpresa({
      codEmpresa: mainIndex.codigoIndice,
      empresaNombre: 'Indice S&P Merval',
      ultimaCot: mainIndex.valorIndice.toFixed(2),
      variacion: mainIndex.variacion.toFixed(2),
    });
  };


  const cargarGraficoEmpr = async (empresa: any, dias: number) => {
    console.log(empresa.codEmpresa);

    const datos = await getDataGraficos(empresa.codEmpresa, dias);
    console.log("Datos for day:", datos);
    console.log(datos);
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
      data.push(dato.cotization);
    })
    const dataset = [{
      label: empresa.codEmpresa,
      data: data,
      borderColor: '#31B6A6',
      backgroundColor: '#31B6A6',
    }]
    setLabels(labels);
    setDatos(dataset)
    setEmpresa(empresa);
  }
  const handleButtonClick = (button: typeof empresas[0]) => {
    setSelectedButton(button);
    setHighlightSegment(button.codEmpresa);
    cargarGraficoEmpr(button, 1)
  };

  useEffect(() => {
    getDatosIndice(1);
  }, []);

  useEffect(() => {
    if (empresas.length > 0) {
      setSelectedButton(empresas[0]);
      cargarGraficoEmpr(empresas[0], 1); // Initialize first chart
    }
  }, [empresas]);


  return (
    <div className="bg-[#ffffff] flex text-black h-screen">
      <div className={`transition-all duration-300 bg-white ${isMobile ? (isToggled ? "w-60" : "w-20") : isToggled ? "w-60" : "w-20"
        } flex flex-col pt-16`}/* {`drawer ${isExpanded ? 'w-64' : 'w-20'} flex flex-col h-screen`} */>
        <nav className="flex-1 overflow-hidden"> {/* //overflow-hidden py-4 */}
          <ul className={`${isMobile ? (isToggled ? "pr-1" : "pl-1") : isToggled ? "pr-1" : "pl-1"}`} >
            {empresas.map((button, index) => (
              <SidebarButton
                key={index}
                {...button}
                isExpanded={isToggled}
                icon={`/imagenes/${button.codEmpresa}--big.svg`}
                onClick={() => handleButtonClick(button)}
              />))}
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-4 bg-slate-100">
        {/* Main content goes here */}
        <div className="flex flex-col h-full justify-around">
          <LineChart empresa={selectedButton} icon={`/imagenes/${selectedButton.codEmpresa}--big.svg`} datos={datos} labels={labels} getDatos={cargarGraficoEmpr} />
          <div className="flex flex-row justify-between">
            <LineChartIndex empresa={empresa} icon='./imagenes/merval-index--big.svg' datos={datosI} labels={labelsI} getDatosIndice={getDatosIndice} />
            <PieChart highlightSegment={highlightSegment} />
          </div>
        </div>
      </main>

    </div>
  );
}