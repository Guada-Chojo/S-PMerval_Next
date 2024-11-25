import { useEffect, useState } from "react";
import { useToggle } from "@/app/context/toggle.context";
import { PieChart } from "../charts/pieChart/pieChart";
import { LineChart } from "../charts/lineChart/lineChart";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { InfoTable } from "../charts/pieChart/infoTable";
import './sideBar.css';

interface NavigationDrawerProps {
  labels: string[];
}

export const SideBar/* : React.FC<NavigationDrawerProps>  */= ({ /* labels */ }) => {
  const [highlightSegment, setHighlightSegment] = useState<string | null>(null);
  const { isToggled } = useToggle();
  const [isExpanded, setIsExpanded] = useState(isToggled);
  const [isMobile, setIsMobile] = useState(false);
  const buttons = [
    { name: "Apple", ultCot: 100, var: 12.0, icon: './imagenes/apple--big.svg' },
    { name: "Boeing", ultCot: 100, var: 0.00, icon: './imagenes/boeing--big.svg' },
    { name: "Coca-Cola", ultCot: 100, var: 18.0, icon: './imagenes/coca-cola--big.svg' },
    { name: "Google", ultCot: 100, var: -1.79, icon: './imagenes/alphabet--big.svg' },
    { name: "Microsoft", ultCot: 100, var: 2.00, icon: './imagenes/microsoft--big.svg' },
    { name: "Nestlé", ultCot: 100, var: 8.00, icon: './imagenes/nestle--big.svg' },
    { name: "NVIDIA", ultCot: 100, var: -4.35, icon: './imagenes/nvidia--big.svg' }
  ];

  const handleButtonClick = (label: string) => {
    setHighlightSegment(label);
  };

  // Update the isExpanded state whenever isToggled changes
  useEffect(() => {
    setIsExpanded(isToggled);
  }, [isToggled]);

  // Update isMobile state based on screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Optional: collapse the drawer on mobile view if desired
  useEffect(() => {
    if (isMobile) setIsExpanded(false);
  }, [isMobile]);

  return (
    <div className="bg-[#ffffff] flex text-black h-screen">
      <div className={`drawer ${isExpanded ? 'w-64' : 'w-20'} flex flex-col h-screen`}>
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-semibold flex items-center space-x-2">
            <a>{isExpanded ? 'Indice MERV' : <img className="mask mask-squircle" src="./imagenes/merval-index--big.svg"></img>}</a>
          </span>
        </div>
        <hr className=" w-[75%] self-center h-0.5 bg-slate-950"></hr>
        <nav className="flex-1 overflow-hidden py-4">
          <ul className="menu">
            {buttons.map((button, index) => (
              <li key={index} className="hover:bg-gray-200">
                <a onClick={() => handleButtonClick(button.name)} className="flex items-center px-4 py-2">

                  {isExpanded ?

                    <div className="flex items-center content-between ">
                      <img src={button.icon} className="mask mask-squircle" />
                      <div className="flex-col ml-2 content-around">
                        <p className="text-sm">{button.name}</p>
                        <div className="ml-auto flex space-x-1 justify-between">
                          <p className="text-sm">{button.ultCot}</p>
                          <p
                            className={`text-sm ${button.var < 0
                              ? "text-[#E5102E]"
                              : button.var === 0
                                ? "text-black"
                                : "text-[#27BE69]"
                              } flex self-center`}
                          >
                            {button.var}
                            {(button.var < 0) ?
                              <ArrowTrendingDownIcon className="text-[#E5102E] h-5 w-5" /> :
                              (button.var == 0) ?
                                <ArrowLongRightIcon className="h-5 w-5" /> :
                                <ArrowTrendingUpIcon className="text-[#27BE69] h-5 w-5" />
                            }
                          </p>

                        </div>
                      </div>
                    </div> :
                    <div className="space-x-4">
                      <img src={button.icon} className="mask mask-squircle" />
                    </div>
                  }
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-4 bg-slate-100">
        {/* Main content goes here */}
        <div className="flex flex-col h-full justify-around ">
         <LineChart />
          <div className="flex md:flex-row md:space-x-4">
            <div className="">
              <PieChart highlightSegment={highlightSegment}/>
            </div>
            <div className="md:w-1/3 w-full hidden md:block ">
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}