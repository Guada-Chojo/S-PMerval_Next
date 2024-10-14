'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from 'react';
import PieChart from './components/PieChart/pieChart';
import Navbar from "./components/NavBar/navBar";


export default function Home() {
  const [highlightSegment, setHighlightSegment] = useState<string | null>(null);

  const handleButtonClick = (label: string) => {
    setHighlightSegment(label);
  };

  const labels = ['Google', 'Apple', 'NVIDIA', 'Boeing', 'Coca-Cola', 'Nestlé'];

  return (
    <main className={styles.page}>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <div>
            <h1>Pie Chart Highlight</h1>
            <PieChart highlightSegment={highlightSegment} />
          </div>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {labels.map((label) => (
              <li>
                <a key={label} onClick={() => handleButtonClick(label)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
