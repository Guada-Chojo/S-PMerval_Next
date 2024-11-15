'use client'
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { SideBar } from "./components/sideBar/sideBar";
import { Footer } from "./components/footer/footer";
import { NavBar } from "./components/navBar/navBar";
import { ToggleProvider } from "./context/toggle.context";

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
