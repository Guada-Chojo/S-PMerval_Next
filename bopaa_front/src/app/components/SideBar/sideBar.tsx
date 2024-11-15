import { useEffect, useState } from "react";
import { useToggle } from "@/app/context/toggle.context";
import { PieChart } from "../charts/pieChart/pieChart";

interface NavigationDrawerProps {
  /* links: { name: string; href: string; icon: string }[]; */
}

export const SideBar: React.FC<NavigationDrawerProps> = ({ /* links, */ }) => {
  const [explodedSlice, setExplodedSlice] = useState<number | null>(null);
  const { isToggled } = useToggle();
  const [isExpanded, setIsExpanded] = useState(isToggled);
  const [isMobile, setIsMobile] = useState(false);
  const buttons = [
    { name: "Apple", icon: './imagenes/apple--big.svg' },
    { name: "Boeing", icon: './imagenes/boeing--big.svg' },
    { name: "Coca-cola", icon: './imagenes/coca-cola--big.svg' },
    { name: "Google", icon: './imagenes/alphabet--big.svg' },
    { name: "Microsoft", icon: './imagenes/microsoft--big.svg' },
    { name: "Nestlé", icon: './imagenes/nestle--big.svg' },
    { name: "NVIDIA", icon: './imagenes/nvidia--big.svg' }
  ];

  const handleButtonClick = (index: number) => {
    setExplodedSlice((prevIndex: any) => (prevIndex === index ? null : index));
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
    <div className="bg-[#ffffff] flex text-black">
      <div className={`drawer ${isExpanded ? 'w-64' : 'w-20'} flex flex-col h-screen shadow-lg`}>
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-semibold flex items-center space-x-2">
            <a>{isExpanded ? 'Indice MERV' : <img className="mask mask-squircle" src="./imagenes/merval-index--big.svg"></img>}</a>
          </span>
        </div>
        <hr className=" w-[75%] self-center h-0.5 bg-slate-950"></hr>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="menu">
            {buttons.map((button, index) => (
              <li key={index} className="hover:bg-gray-200">
                <a onClick={() => handleButtonClick(index)} className="flex items-center space-x-4 px-4 py-2">
                  <img src={button.icon} className="rounded-xl" />
                  {isExpanded && <span>{button.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-4 bg-slate-100">
        {/* Main content goes here */}
        
        <PieChart explodedSlice={explodedSlice}/>
      </main>

    </div>
  );
}