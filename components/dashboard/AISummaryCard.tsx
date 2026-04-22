'use client';

import { 
  Sparkles, 
  Brain, 
  ChevronRight, 
  CheckCircle2, 
  Loader2,
  RefreshCw,
  Trophy
} from 'lucide-react';
import { useAISummary } from '@/hooks/useAISummary';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from '../ui/TypewriterText';
import { cn } from '@/lib/utils';

export default function AISummaryCard() {
  const { generateSummary, isGenerating, result } = useAISummary();

  return (
    <div className="relative overflow-hidden rounded-3xl border bg-card/40 p-1 backdrop-blur-xl">
      <div className="rounded-[22px] bg-card/60 p-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Inteligencia Artificial</span>
            </div>
            <h2 className="text-2xl font-black text-foreground md:text-3xl">Análisis Estratégico Flux</h2>
            <p className="mt-2 text-muted-foreground">
              Genera un resumen ejecutivo basado en el comportamiento actual de tus prospectos.
            </p>
          </div>

          <button
            onClick={generateSummary}
            disabled={isGenerating}
            className={cn(
              "group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-primary px-8 text-sm font-black text-primary-foreground transition-all active:scale-95 md:w-auto",
              isGenerating && "opacity-80"
            )}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Procesando Data...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                {result ? 'Regenerar Análisis' : 'Generar Resumen IA'}
              </>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 flex flex-col items-center justify-center py-10"
            >
              <div className="relative h-20 w-20">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                />
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/20">
                  <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                </div>
              </div>
              <p className="mt-6 text-sm font-medium text-muted-foreground animate-pulse">
                Analizando patrones de conversión y presupuestos...
              </p>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-2xl bg-muted/30 p-6 border border-border/50">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Análisis General
                  </h4>
                  <div className="text-muted-foreground">
                    <TypewriterText text={result.analysis} speed={10} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Recomendaciones Estratégicas
                  </h4>
                  <div className="grid gap-3">
                    {result.recommendations.map((rec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                        className="flex items-start gap-3 rounded-xl bg-card border p-4 shadow-sm"
                      >
                        <div className="mt-1 flex h-2 w-2 rounded-full bg-primary" />
                        <p className="text-sm text-muted-foreground">{rec}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border bg-gradient-to-br from-indigo-500/10 to-transparent p-6">
                  <Trophy className="h-8 w-8 text-amber-500 mb-4" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Fuente Dominante</h4>
                  <p className="mt-1 text-2xl font-black text-foreground">{result.mainSource}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Canal de mayor tracción actualmente.</p>
                </div>
                
                <div className="rounded-2xl border bg-card p-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Seguridad de Datos</h4>
                  <p className="mt-1 text-sm text-foreground">Análisis local cifrado</p>
                  <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
