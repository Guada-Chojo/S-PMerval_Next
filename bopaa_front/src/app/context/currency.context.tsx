// app/context/currency.context.tsx
import React, { createContext, useContext, useState } from "react";

interface CurrencyContextType {
  currency: string;
  conversionRate: number;
  changeCurrency: (newCurrency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1); // Default conversion rate

  const changeCurrency = (newCurrency: string) => {
    if (newCurrency === "USD") {
      setConversionRate(1); // Example: 1 ARG = 1 ARG
    } else if (newCurrency === "ARG") {
      setConversionRate(1000); // Example conversion rate
    }
    setCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, conversionRate, changeCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
