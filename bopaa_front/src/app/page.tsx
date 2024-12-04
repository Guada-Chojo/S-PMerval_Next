'use client'
import { Footer } from "./components/Footer/footer";
import { NavBar } from "./components/navBar/navBar";
import { SideBar } from "./components/SideBar/sideBar";
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
