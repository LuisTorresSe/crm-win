import { usePathname } from "next/navigation";
import SidebarItem, { ISidebarItem } from "./SidebarItem";
import { cn } from "@/core/utils/cn";


export interface ISidebarGroup {
    group: string;
    items: ISidebarItem[];
    collapsible?: boolean;
}

interface Props {
    group: ISidebarGroup;
    className?: string;
}

export default function SidebarGroup({ group, className }: Props) {
    const pathname = usePathname();
    const { collapsible = false } = group;

    return (
        <div className={cn("mb-6", className)}>
            {/* Título del grupo */}
            <h3 className="px-5 mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {group.group}
            </h3>

            {/* Elementos del grupo */}
            <div className="space-y-0.5">
                {group.items.map((item) => {
                    const isActive = pathname === item.link || pathname?.startsWith(`${item.link}/`);

                    return (
                        <SidebarItem
                            key={item.link}
                            item={item}
                            isActive={isActive}
                        />
                    );
                })}
            </div>
        </div>
    );
}