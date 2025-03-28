"use client"
import { Fragment, useState } from "react";
import HomePage from "./dashboard/page";
import Sidebar from "@/app/components/sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen); // Cambia el estado de visibilidad
  };

  return (
    <Fragment>
      <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
        {/*  <button
          onClick={handleSidebarToggle}
          className="p-2 bg-blue-500 text-white rounded-md m-4"
        >
          <i className="fa-solid fa-bars"></i> Abrir Menú
        </button> */}
        {/*  <Sidebar isOpen={sidebarOpen} onClose={handleSidebarToggle} /> */}
        <HomePage />
      </div>
    </Fragment>
  );
}
