"use client";

import { useState } from "react";
import Link from "next/link";
import { FC } from "react";

// Definimos la interfaz para el Sidebar
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
    // Si la barra lateral no está abierta, no renderizamos nada
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  z-50">
            {/* Sidebar */}
            <div className="w-64 h-full bg-gray-800 text-white shadow-md fixed top-0 left-0 p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold">Menu</h2>
                    <button onClick={onClose} className="text-white">
                        <i className="fa-solid fa-times"></i> {/* Icono para cerrar */}
                    </button>
                </div>

                {/* Enlaces de navegación */}
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <Link href="/" className="hover:text-blue-400">
                                <i className="fa-solid fa-home mr-2"></i> Snippets
                            </Link>
                        </li>
                    
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
