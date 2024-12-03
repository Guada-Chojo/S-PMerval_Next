'use client'
import { ToggleProvider } from "./context/toggle.context";
import { NavBar } from "./components/navBar/navBar";
import { SideBar } from "./components/sideBar/sideBar";
import { Footer } from "./components/footer/footer";
import { CurrencyProvider } from "./context/currency.context";


const links = [{name: 'Google', href:'/', icon: 'ph'}]

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
