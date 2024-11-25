'use client'
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { ToggleProvider } from "./context/toggle.context";
import { NavBar } from "./components/NavBar/navBar";
import { SideBar } from "./components/SideBar/sideBar";
import { Footer } from "./components/Footer/footer";

const links = [{name: 'Google', href:'/', icon: 'ph'}]

export default function Home() {
  return (
    <>
      <ToggleProvider>
        <NavBar />
        <SideBar />
      </ToggleProvider>
      <Footer />
    </>
  );
}
