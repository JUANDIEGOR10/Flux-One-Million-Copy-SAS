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
