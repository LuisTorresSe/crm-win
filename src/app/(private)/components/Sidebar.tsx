"use client"
import { useState, useEffect } from "react";
import {
    LuLayoutList,
    LuUsers,
    LuSettings,
    LuCalendar,
    LuMessageSquare,
    LuChevronLeft,
    LuMenu,
} from "react-icons/lu";
import { ISidebarItem } from "./SidebarItem";
import SidebarGroup, { ISidebarGroup } from "./SidebarGroup";
import { cn } from "@/core/utils/cn";

const sidebarItems: Record<string, ISidebarItem[]> = {
    general: [
        {
            name: "Dashboard",
            link: "/dashboard",
            icon: <p />,
        },
        {
            name: "Tickets",
            link: "/tickets",
            icon: <LuLayoutList />,
            badge: {
                count: 5,
                variant: "warning",
            },
        },
        {
            name: "Calendario",
            link: "/calendar",
            icon: <LuCalendar />,
        },
        {
            name: "Mensajes",
            link: "/messages",
            icon: <LuMessageSquare />,
            badge: {
                count: 3,
                variant: "danger",
            },
        },
    ],
    management: [
        {
            name: "clientes",
            link: "/clients",
            icon: <LuUsers />,
        },
    ],
    system: [
        {
            name: "Configuracion",
            link: "/settings",
            icon: <LuSettings />,
        },
    ],
};

const sidebarGroups: ISidebarGroup[] = [
    {
        group: "General",
        items: sidebarItems.general,
    },
    {
        group: "Administracion",
        items: sidebarItems.management,
    },
    {
        group: "Configuracion",
        items: sidebarItems.system,
    },
];

interface SidebarProps {
    collapsed?: boolean;
    onToggleCollapse?: () => void;
    className?: string;
}

export default function Sidebar({
    collapsed = false,
    onToggleCollapse,
    className,
}: SidebarProps) {
    const [mounted, setMounted] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Toggle button for mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md dark:bg-slate-800 text-slate-700 dark:text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                <LuMenu className="h-6 w-6" />
            </button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed md:static top-0 left-0  w-64 md:w-72 transition-transform z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col",
                    mobileOpen ? "translate-x-0" : "-translate-x-full",
                    "md:translate-x-0 min-h-screen ",
                    className
                )}
            >
                {/* Logo y encabezado */}
                <div className="px-5 py-6 border-b border-slate-200 dark:border-slate-700">
                    <div className={cn("flex items-center justify-between")}>
                        <div className="flex items-center">
                            <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center rounded-md shadow-md">
                                <span className="font-bold text-base">C</span>
                            </div>
                            <h1 className="ml-3 font-semibold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                CRM WIN
                            </h1>
                        </div>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="md:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <LuChevronLeft className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Grupos de navegación */}
                <nav className="flex-grow overflow-y-auto pt-5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {sidebarGroups.map((group) => (
                        <SidebarGroup key={group.group} group={group} />
                    ))}
                </nav>

                {/* Footer - perfil de usuario */}
                <div className="mt-auto px-5 py-5 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-sm">
                            <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Diego Huaman Vargas</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Administrator</p>
                        </div>
                        <button className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
