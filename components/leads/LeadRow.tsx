'use client';

import { Lead } from '@/types/lead';
import { 
  cn, 
  formatCurrency, 
  formatDate, 
  getSourceLabel, 
  getStatusLabel 
} from '@/lib/utils';
import { 
  Eye,
  Edit2,
  Trash2,
  Link as LinkIcon, 
  UserPlus, 
  MoreHorizontal, 
  Phone, 
  Mail 
} from 'lucide-react';

interface LeadRowProps {
  lead: Lead;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SourceIcon = ({ source }: { source: string }) => {
  switch (source) {
    case 'instagram': return <LinkIcon className="h-4 w-4" />;
    case 'facebook': return <LinkIcon className="h-4 w-4" />;
    case 'landing_page': return <LinkIcon className="h-4 w-4" />;
    case 'referido': return <UserPlus className="h-4 w-4" />;
    default: return <MoreHorizontal className="h-4 w-4" />;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    nuevo: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    contactado: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    convertido: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    perdido: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-sm",
      styles[status]
    )}>
      {getStatusLabel(status)}
    </span>
  );
};

export default function LeadRow({ lead, onView, onEdit, onDelete }: LeadRowProps) {
  return (
    <tr className="group transition-colors hover:bg-muted/30">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
            {lead.nombre.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{lead.nombre}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.telefono}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-card border shadow-sm text-primary">
            <SourceIcon source={lead.fuente} />
          </div>
          {getSourceLabel(lead.fuente)}
        </div>
      </td>
      <td className="px-6 py-4 italic text-muted-foreground truncate max-w-[150px]">
        {lead.producto_interes}
      </td>
      <td className="px-6 py-4 font-mono font-bold text-foreground">
        {formatCurrency(lead.presupuesto)}
      </td>
      <td className="px-6 py-4 text-muted-foreground">
        {formatDate(lead.fecha_creacion)}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <StatusBadge status={lead.estado} />
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button 
              onClick={() => onView(lead.id)}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              title="Ver detalle"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onEdit(lead.id)}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-indigo-500/10 hover:text-indigo-500"
              title="Editar"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(lead.id)}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-rose-500/10 hover:text-rose-500"
              title="Eliminar"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}
