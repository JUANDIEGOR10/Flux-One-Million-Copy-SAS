'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface LeadErrorStateProps {
  onRetry: () => void;
}

export default function LeadErrorState({ onRetry }: LeadErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">¡Ups! Algo salió mal</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
        No pudimos cargar la lista de leads en este momento. Por favor, intenta de nuevo.
      </p>
      <button
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 rounded-full border bg-card px-6 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-95"
      >
        <RefreshCw className="h-4 w-4" />
        Reintentar cargar
      </button>
    </div>
  );
}
