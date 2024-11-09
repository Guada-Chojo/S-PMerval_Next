import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface NavigationDrawerProps {
    links: { name: string; href: string; icon: string }[];
  }

export const SideBar: React.FC<NavigationDrawerProps> = ({links}) => {
    const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Update isMobile state based on screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Collapse the drawer if the screen is small
  useEffect(() => {
    setIsExpanded(!isMobile);
  }, [isMobile]);

  const toggleDrawer = () => {
    setIsExpanded((prev: any) => !prev);
  };

  return (
    <div className="bg-[#e8e6e6] flex">
      <div className={`drawer ${isExpanded ? 'w-64' : 'w-20'} flex flex-col h-screen bg-base-100 shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <span className="text-xl font-semibold flex items-center space-x-2">
          <span>
              {isExpanded ? 'My App' : 'M'}
            </span>
            {isMobile && (
                <button onClick={toggleDrawer} className="btn btn-square btn-sm">
                  {isExpanded ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
                </button>
              )}
        </span>
          {/* {!isMobile && (
            <button onClick={toggleDrawer} className="btn btn-square btn-sm">
              {isExpanded ? '<' : '>'}
            </button>
          )} */}
        </div>
        {/* <div className="drawer-content flex-col">
          {/* Page content here }
          <div className="">
            <NavBar />
          </div>
          <div>
            <div className="p-24">
              <PieChart />
            </div>
          </div>
          <div className="justify-end">
            <Footer />
          </div>

          
        </div> */}
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
      <main className="flex-1 p-4">
        {/* Main content goes here */}
      </main>
      
    </div>
  );
}