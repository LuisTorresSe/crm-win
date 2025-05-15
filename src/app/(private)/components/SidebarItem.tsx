import { cn } from "@/core/utils/cn";
import Link from "next/link";
import { ReactNode } from "react";
// Utilidad para combinar nombres de clases

export interface ISidebarItem {
    name: string;
    link: string;
    icon: ReactNode;
    badge?: {
        count: number;
        variant?: "default" | "success" | "warning" | "danger";
    };
}

interface Props {
    item: ISidebarItem;
    isActive?: boolean;
}

export default function SidebarItem({ item, isActive = false }: Props) {
    // Determinamos las clases basadas en el estado activo
    const itemClasses = cn(
        "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 group relative",
        isActive
            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
            : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/40"
    );

    // Configuramos los estilos del badge según la variante
    const getBadgeClasses = () => {
        const baseClasses = "ml-auto px-2 py-0.5 text-xs rounded-full font-medium";

        switch (item.badge?.variant) {
            case "success":
                return cn(baseClasses, "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300");
            case "warning":
                return cn(baseClasses, "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300");
            case "danger":
                return cn(baseClasses, "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300");
            default:
                return cn(baseClasses, "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300");
        }
    };

    return (
        <Link
            href={item.link}
            className={itemClasses}
        >
            {/* Indicador lateral para item activo */}
            {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 dark:bg-indigo-400 rounded-r-full" aria-hidden="true" />
            )}

            <span className={cn(
                "flex items-center justify-center w-6 h-6 transition-all duration-300",
                isActive
                    ? "text-indigo-600 dark:text-indigo-300"
                    : "text-slate-500 dark:text-slate-400",
                "group-hover:text-indigo-600 dark:group-hover:text-indigo-300"
            )}>
                {item.icon}
            </span>

            <span className="flex-grow font-medium">{item.name}</span>

            {item.badge && (
                <span className={getBadgeClasses()}>
                    {item.badge.count}
                </span>
            )}
        </Link>
    );
}