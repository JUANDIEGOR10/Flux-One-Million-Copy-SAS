import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date) {
  return format(new Date(date), "dd MMM yyyy, HH:mm", { locale: es });
}

export function getSourceLabel(source: string) {
  const labels: Record<string, string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    landing_page: "Landing Page",
    referido: "Referido",
    otro: "Otro",
  };
  return labels[source] || source;
}

export function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    nuevo: "Nuevo",
    contactado: "Contactado",
    convertido: "Convertido",
    perdido: "Perdido",
  };
  return labels[status] || status;
}
