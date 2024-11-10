import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ToggleContextType = {
  isToggled: boolean;
  toggle: () => void;
};

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export const ToggleProvider = ({ children }: { children: ReactNode }) => {
    const [isToggled, setIsToggled] = useState<boolean>(true);

  // Load the saved toggle state from local storage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('isToggled');
    if (savedState !== null) {
      setIsToggled(JSON.parse(savedState));
    }
  }, []);

  // Save the toggle state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('isToggled', JSON.stringify(isToggled));
  }, [isToggled]);

  const toggle = () => setIsToggled((prev) => !prev);

  return (
    <ToggleContext.Provider value={{ isToggled, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (!context) throw new Error("useToggle must be used within a ToggleProvider");
  return context;
};