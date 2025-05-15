import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina nombres de clases con soporte para tailwind y resolución de conflictos
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}