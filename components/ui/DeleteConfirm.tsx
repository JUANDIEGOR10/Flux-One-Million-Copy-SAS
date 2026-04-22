'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function DeleteConfirm({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: DeleteConfirmProps) {
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
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border bg-card p-8 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                <AlertTriangle className="h-8 w-8" />
              </div>
              
              <h3 className="text-xl font-black text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {message}
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                <button
                  onClick={onClose}
                  className="flex h-12 flex-1 items-center justify-center rounded-xl border bg-muted/50 text-sm font-bold transition-all hover:bg-muted"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
