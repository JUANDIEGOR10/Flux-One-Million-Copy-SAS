'use client';

import { Moon, Sun } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-9 w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-300",
        theme === 'dark' ? "bg-primary/20" : "bg-muted shadow-inner"
      )}
      aria-label="Alternar tema"
    >
      <motion.div
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full shadow-lg",
          theme === 'dark' ? "bg-primary text-primary-foreground" : "bg-white text-orange-500"
        )}
        animate={{
          x: theme === 'dark' ? 28 : 0,
          rotate: theme === 'dark' ? 0 : 180
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </motion.div>
      
      <span className="sr-only">
        {theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      </span>
    </button>
  );
}
