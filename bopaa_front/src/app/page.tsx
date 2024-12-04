'use client'
import { NavBar } from "./components/navBar/navBar";
import { SideBar } from "./components/sideBar/sideBar";
import { Footer } from "./components/footer/footer";
import { CurrencyProvider } from "./context/currency.context";

export default function Home() {
  return (
    <>
    <CurrencyProvider>
        <NavBar />
        <SideBar />
        </CurrencyProvider>
      <Footer />
    </>
  );
}
