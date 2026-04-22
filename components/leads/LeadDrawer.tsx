'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, LeadFormData } from '@/lib/validations';
import { useLeadsDataStore } from '@/store/leads-data-store';
import { Lead } from '@/types/lead';
import { X, Save, User, Mail, Phone, Globe, Package, DollarSign, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getSourceLabel } from '@/lib/utils';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leadId?: string | null;
  mode: 'create' | 'edit' | 'view';
}

export default function LeadDrawer({ isOpen, onClose, leadId, mode }: LeadDrawerProps) {
  const { addLead, updateLead, getLeadById } = useLeadsDataStore();
  const currentLead = leadId ? getLeadById(leadId) : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (mode !== 'create' && currentLead) {
        reset({
          nombre: currentLead.nombre,
          email: currentLead.email,
          telefono: currentLead.telefono,
          fuente: currentLead.fuente,
          producto_interes: currentLead.producto_interes,
          presupuesto: currentLead.presupuesto,
        });
      } else {
        reset({
          nombre: '',
          email: '',
          telefono: '',
          fuente: 'instagram',
          producto_interes: '',
          presupuesto: 0,
        });
      }
    }
  }, [isOpen, mode, currentLead, reset]);

  const onSubmit = async (data: LeadFormData) => {
    if (mode === 'create') {
      addLead(data);
    } else if (mode === 'edit' && leadId) {
      updateLead(leadId, data);
    }
    onClose();
  };

  const isViewOnly = mode === 'view';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full border-l bg-card p-0 shadow-2xl sm:max-w-lg"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                  <h2 className="text-xl font-black text-foreground">
                    {mode === 'create' ? 'Nuevo Lead' : mode === 'edit' ? 'Editar Lead' : 'Detalle del Lead'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {mode === 'view' ? 'Información completa del prospecto.' : 'Completa los campos para continuar.'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 transition-colors hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form / Detail */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <form id="lead-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" /> Nombre
                    </label>
                    <input
                      {...register('nombre')}
                      readOnly={isViewOnly}
                      placeholder="Ej: Juan Pérez"
                      className={cn(
                        "flex h-11 w-full rounded-xl border bg-background px-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                        errors.nombre ? "border-rose-500" : "border-border",
                        isViewOnly && "bg-muted/50 cursor-default"
                      )}
                    />
                    {errors.nombre && (
                      <p className="text-xs font-medium text-rose-500">{errors.nombre.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" /> Email
                    </label>
                    <input
                      {...register('email')}
                      readOnly={isViewOnly}
                      type="email"
                      placeholder="juan@ejemplo.com"
                      className={cn(
                        "flex h-11 w-full rounded-xl border bg-background px-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                        errors.email ? "border-rose-500" : "border-border",
                        isViewOnly && "bg-muted/50 cursor-default"
                      )}
                    />
                    {errors.email && (
                      <p className="text-xs font-medium text-rose-500">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" /> Teléfono
                    </label>
                    <input
                      {...register('telefono')}
                      readOnly={isViewOnly}
                      placeholder="+57 300..."
                      className={cn(
                        "flex h-11 w-full rounded-xl border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
                        "border-border",
                        isViewOnly && "bg-muted/50 cursor-default"
                      )}
                    />
                  </div>

                  {/* Fuente */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" /> Fuente
                    </label>
                    {isViewOnly ? (
                      <div className="flex h-11 items-center px-4 rounded-xl bg-muted/50 border text-sm">
                        {getSourceLabel(currentLead?.fuente || 'otro')}
                      </div>
                    ) : (
                      <select
                        {...register('fuente')}
                        className={cn(
                          "flex h-11 w-full rounded-xl border bg-background px-4 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20",
                          errors.fuente ? "border-rose-500" : "border-border"
                        )}
                      >
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="landing_page">Landing Page</option>
                        <option value="referido">Referido</option>
                        <option value="otro">Otro</option>
                      </select>
                    )}
                    {errors.fuente && (
                      <p className="text-xs font-medium text-rose-500">{errors.fuente.message}</p>
                    )}
                  </div>

                  {/* Producto */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" /> Producto de Interés
                    </label>
                    <input
                      {...register('producto_interes')}
                      readOnly={isViewOnly}
                      placeholder="Ej: Curso de Copywriting"
                      className={cn(
                        "flex h-11 w-full rounded-xl border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
                        "border-border",
                        isViewOnly && "bg-muted/50 cursor-default"
                      )}
                    />
                  </div>

                  {/* Presupuesto */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" /> Presupuesto (USD)
                    </label>
                    <input
                      {...register('presupuesto')}
                      readOnly={isViewOnly}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className={cn(
                        "flex h-11 w-full rounded-xl border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
                        errors.presupuesto ? "border-rose-500" : "border-border",
                        isViewOnly && "bg-muted/50 cursor-default"
                      )}
                    />
                    {errors.presupuesto && (
                      <p className="text-xs font-medium text-rose-500">{errors.presupuesto.message}</p>
                    )}
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="border-t p-6">
                {isViewOnly ? (
                  <button
                    onClick={onClose}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                  >
                    Cerrar Detalle
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="lead-form"
                    disabled={isSubmitting}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Save className="h-5 w-5" />
                    )}
                    {mode === 'create' ? 'Crear Lead' : 'Guardar Cambios'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
