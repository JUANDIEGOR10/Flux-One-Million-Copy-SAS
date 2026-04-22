export type LeadSource = 'instagram' | 'facebook' | 'landing_page' | 'referido' | 'otro';

export type LeadStatus = 'nuevo' | 'contactado' | 'convertido' | 'perdido';

export interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fuente: LeadSource;
  producto_interes: string;
  presupuesto: number;
  fecha_creacion: string; // ISO 8601
  estado: LeadStatus;
}

export interface LeadFilters {
  search: string;
  fuentes: LeadSource[];
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  page: number;
  limit: number;
  sortBy: keyof Lead;
  sortOrder: 'asc' | 'desc';
}

export interface LeadsResponse {
  leads: Lead[];
  total: number;
  totalPages: number;
}
