'use client'
import { ToggleProvider } from "./context/toggle.context";
import { NavBar } from "./components/navBar/navBar";
import { SideBar } from "./components/sideBar/sideBar";
import { Footer } from "./components/footer/footer";


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
