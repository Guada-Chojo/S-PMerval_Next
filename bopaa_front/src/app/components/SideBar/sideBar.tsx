import { useEffect, useState } from "react";
import { useToggle } from "@/app/context/toggle.context";

interface NavigationDrawerProps {
  links: { name: string; href: string; icon: string }[];
}

export const SideBar: React.FC<NavigationDrawerProps> = ({ links }) => {
  const { isToggled } = useToggle();
  const [isExpanded, setIsExpanded] = useState(isToggled);
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="bg-[#ffffff] flex">
      <div className={`drawer ${isExpanded ? 'w-64' : 'w-20'} flex flex-col h-screen shadow-lg`}>
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-semibold flex items-center space-x-2">
              <a>{isExpanded ? 'Indice MERV' : <img className="mask mask-squircle" src="./imagenes/merval-index--big.svg"></img>}</a>
          </span>        
        </div>
        <hr className=" w-[75%] self-center h-0.5 bg-slate-950"></hr>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="menu">
            {links.map((link, index) => (
              <li key={index} className="hover:bg-gray-200">
                <a href={link.href} className="flex items-center space-x-4 px-4 py-2">
                  <span className="icon">{link.icon}</span>
                  {isExpanded && <span>{link.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-4 bg-slate-100">
        {/* Main content goes here */}
      </main>

    </div>
  );
}