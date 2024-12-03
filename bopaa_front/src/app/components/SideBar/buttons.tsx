import {
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    ArrowLongRightIcon,
  } from "@heroicons/react/24/outline";
  
  interface ButtonProps {
    codEmpresa: string,
    empresaNombre: string,
    ultimaCot: string,
    variacion: string,
    icon: string;
    isExpanded: boolean;
    onClick: () => void;
  }
  
  export const SidebarButton: React.FC<ButtonProps> = ({
    codEmpresa,
    empresaNombre,
    ultimaCot,
    variacion,
    icon,
    isExpanded,
    onClick,
  }) => {
    return (
      <li
        className={`hover:bg-gray-100 cursor-pointer transition-all duration-150 ${
          isExpanded ? "px-4 py-4" : "px-2 py-2"
        }`}
      >
        <a onClick={onClick} className="flex items-center">
          <img
            src={icon}
            alt={`${codEmpresa} icon`}
            className={`mask mask-squircle ${
              isExpanded ? "h-14 w-14" : "h-14 w-14"
            }`}
          />
          {isExpanded && (
            <div className="ml-3 flex-grow">
              <p className="text-base font-medium">{empresaNombre}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">{ultimaCot}</span>
                <span
                  className={`flex items-center text-sm ${
                    Number(variacion) < 0
                      ? "text-red-600"
                      : Number(variacion) === 0
                      ? "text-gray-600"
                      : "text-green-600"
                  }`}
                >
                  {variacion}%
                  {Number(variacion) < 0 ? (
                    <ArrowTrendingDownIcon className="h-5 w-5 ml-1" />
                  ) : Number(variacion) === 0 ? (
                    <ArrowLongRightIcon className="h-5 w-5 ml-1" />
                  ) : (
                    <ArrowTrendingUpIcon className="h-5 w-5 ml-1" />
                  )}
                </span>
              </div>
            </div>
          )}
        </a>
      </li>
    );
  };