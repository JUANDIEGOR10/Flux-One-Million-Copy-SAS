import { z } from "zod";

export const leadFilterSchema = z.object({
  search: z.string().optional(),
  fuentes: z.array(z.enum(['instagram', 'facebook', 'landing_page', 'referido', 'otro'])).optional(),
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
});


export type LeadFilterValues = z.infer<typeof leadFilterSchema>;

export const leadSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  telefono: z.string().optional(),
  fuente: z.string().min(1, 'Selecciona una fuente válida').refine(
    (val) => ['instagram', 'facebook', 'landing_page', 'referido', 'otro'].includes(val),
    { message: 'Selecciona una fuente válida' }
  ),
  producto_interes: z.string().optional(),
  presupuesto: z.coerce.number().min(0, 'El presupuesto debe ser mayor o igual a 0').optional().or(z.literal('')),
});

export type LeadFormData = z.infer<typeof leadSchema>;
