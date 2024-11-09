'use client'
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { SideBar } from "./components/SideBar/sideBar";
import { Footer } from "./components/Footer/footer";
import { NavBar } from "./components/NavBar/navBar";

const links = [{name: 'Google', href:'/', icon: 'ph'}]

export default function Home() {
  return (
    <>
      <NavBar />
      <SideBar links={links}/>
      <Footer />
    </>
  );
}
