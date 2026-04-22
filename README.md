# ⚡ Flux OMCS — Lead Management Dashboard

¡Bienvenido a **Flux OMCS**! Una plataforma premium diseñada para One Million Copy SAS que permite capitalizar la gestión de leads provenientes de diversos embudos de marketing mediante análisis avanzado y asistencia de Inteligencia Artificial.

---

## 🚀 Tecnologías Elegidas

Este proyecto utiliza un stack moderno y eficiente para garantizar velocidad, mantenibilidad y una experiencia de usuario superior:

| Tecnología | Razón de elección |
| :--- | :--- |
| **Next.js 14** | App Router para una navegación fluida, SEO optimizado y estructura escalable. |
| **TypeScript** | Robustez técnica, autocompletado y prevención de errores en tiempo de desarrollo. |
| **Tailwind CSS** | Estilizado rápido y consistente con un sistema de diseño basado en utilidad. |
| **Zustand** | Gestión de estado ligero y persistente para filtros y preferencias. |
| **TanStack Query** | Manejo profesional de caché, estados de carga y sincronización de datos. |
| **Recharts** | Visualización de datos clara y responsiva para KPIs de marketing. |
| **Framer Motion** | Micro-interacciones y animaciones suaves que elevan la percepción de calidad. |

---

## 💻 Cómo Correr el Proyecto

Sigue estos pasos para levantar el entorno de desarrollo localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JUANDIEGOR10/Flux-One-Million-Copy-SAS.git
   cd Flux-One-Million-Copy-SAS
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   Visita [http://localhost:3000](http://localhost:3000)

---

## 📊 Arquitectura de Datos (Mocks)

La aplicación es **100% frontend** y utiliza una capa de servicios simulados para demostrar funcionalidades complejas sin necesidad de un backend real:

- **Mock Layer (`lib/mock-data.ts`)**: Base de datos de 15 leads realistas con diversos atributos (fuente, presupuesto, producto).
- **Reactive Hooks (`hooks/useLeads.ts`)**: Simula el comportamiento de una API REST (latencia de 800ms, filtrado dinámico, búsqueda y paginación).
- **AI Summary Engine (`hooks/useAISummary.ts`)**: Un motor de análisis local que procesa las estadísticas actuales para generar insights estratégicos en tiempo real.

---

## 🧪 Cómo Probar la Aplicación

Para evaluar la funcionalidad completa, te recomendamos seguir este flujo:

1. **Gestión de Leads**: Navega a la sección de Leads, busca por nombre (ej: "Alejandro") y aplica filtros por fuente (Instagram/Facebook). Nota cómo la paginación y el sorting se ajustan.
2. **Dashboard de Estadísticas**: Entra al Dashboard para ver las gráficas de tendencia y distribución. Los datos se recalculan automáticamente según los leads activos.
3. **Resumen Inteligente**: Pulsa el botón "Generar Resumen IA" en el Dashboard. Espera a que la "IA" analice tus datos (verás un estado de carga) y observa el reporte ejecutivo con recomendaciones.
4. **Persistencia**: Cambia un filtro, refresca la página y observa cómo el estado se mantiene gracias a Zustand + LocalStorage.

---

## 🛠️ Estructura de Directorios

```text
src/
├── app/            # Rutas y Layouts (Next.js App Router)
├── components/     # Componentes de UI (Layout, Leads, Dashboard)
├── hooks/          # Lógica de negocio (Data fetching, IA, Debounce)
├── lib/            # Utilidades, Mocks y Validaciones
├── store/          # Estado global (Zustand)
└── types/          # Definiciones de TypeScript
```

---

Desarrollado con ❤️ para **One Million Copy SAS**.
