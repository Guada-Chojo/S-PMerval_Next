'use client'
import styles from "./page.module.css";
import NavBar from "./NavBar/navBar";
import Footer from "./Footer/footer";

export default function Home() {
  return (
    <div className="bg-[#e8e6e6]">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex-col">
          {/* Page content here */}
          <div className="">
            <NavBar />
          </div>
          <div className="justify-end">
            <Footer />
          </div>
          {/* <label htmlFor="my-drawer-2" className="btn btn-circle swap swap-rotate drawer-button fixed top-3 left-3 right-0 lg:hidden">
          
          </label> */}

          <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button fixed top-3 left-3 right-0 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
    </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-[#2C1A1D] text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li><a>Google</a></li>
            <li><a>Apple</a></li>
            <li><a>Microsoft</a></li>
            <li><a>NVIDIA</a></li>
            <li><a>Boeing</a></li>
            <li><a>Coca-Cola</a></li>
            <li><a>Nestlé</a></li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}
