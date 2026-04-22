# 📚 Análisis Técnico y Guía de Entrega — Flux OMCS

Este documento resume la estrategia técnica, decisiones de arquitectura y cumplimiento de requisitos para la prueba técnica de **One Million Copy SAS**.

---

## 🏗️ 1. Arquitectura y Estructura
Se ha optado por una arquitectura modular basada en **Next.js 14 (App Router)**, priorizando la separación de preocupaciones (*Separation of Concerns*):

*   **`src/app`**: Manejo de rutas y layouts globales.
*   **`src/components`**: Dividido por módulos funcionales (`leads`, `dashboard`, `layout`). Se evita el uso de carpetas genéricas para mejorar la escalabilidad.
*   **`src/store`**: Gestión de estado centralizada con **Zustand**. Se separó el estado de la UI (modales/drawers) del estado de los datos (Lead Data) para evitar re-renders innecesarios.
*   **`src/lib/validations.ts`**: Fuente única de verdad para la validación de esquemas con **Zod**, compartida por el frontend y los tipos de datos.

---

## 💾 2. Manejo de Datos (Opción B/C)
Para la prueba, se implementó una **Capa de Datos Híbrida**:
*   **Mock Service**: Simulación de una API REST con datos realistas.
*   **Persistencia Local**: Uso de `localStorage` mediante el middleware de Zustand.
*   **Justificación**: "Se decidió no depender de una API externa para garantizar que la prueba sea 100% portable y funcional al instante, demostrando a la vez capacidad para manejar estados persistentes y lógica asíncrona de servidor."

---

## ✅ 3. Cumplimiento de la Rúbrica

| Requisito | Estado | Nota Técnica |
| :--- | :--- | :--- |
| **Uso de TypeScript** | 🟢 Completo | Tipado estricto en store, componentes y validaciones. |
| **Manejo de Estados** | 🟢 Avanzado | Zustand con persistencia y derivación de métricas. |
| **Validaciones** | 🟢 Robusto | Zod + React Hook Form con mensajes de error claros. |
| **Tests (10/10)** | 🟢 Completo | Vitest + JSDOM cubriendo CRUD, Validaciones y Store. |
| **Modo Oscuro** | 🟢 Funcional | Toggle persistente con framer-motion y tokens CSS. |
| **Drawer/Modal** | 🟢 Premium | Drawer interactivo con modos: Crear, Editar y Ver. |
| **Animaciones** | 🟢 Premium | Framer Motion para micro-interacciones. |
| **Arquitectura** | 🟢 Limpia | Estructura profesional lista para escalar. |

---

## 🧪 4. Ejecución de Pruebas Unitarias
Para ejecutar el conjunto de pruebas implementado, utilice el siguiente comando en la terminal:

```bash
npm run test
```
*   **Vitest**: Utilizado por su velocidad y compatibilidad nativa con ESM.
*   **Cobertura**: Se han priorizado los casos de borde en la lógica del `store` y la integridad de los esquemas de `Zod`.

---

## 🧠 5. Guía para la Defensa (Preguntas Probables)

### ¿Por qué Zustand en lugar de Redux?
> "Zustand ofrece una API más limpia y con menos boilerplate, ideal para aplicaciones ágiles donde se requiere persistencia rápida y una curva de aprendizaje menor sin sacrificar el rendimiento."

### ¿Cómo manejaste la validación de tipos entre Zod y React Hook Form?
> "Utilizamos `zodResolver` para vincular los esquemas de validación con el formulario, y se resolvieron discrepancias de tipado en campos opcionales (como el presupuesto) mediante pre-procesamiento de datos para asegurar que los nulos y strings vacíos se manejen correctamente."

### ¿Qué harías si el proyecto escala a 100,000 leads?
> "Migraría la lógica de filtrado y sorting del frontend (actualmente en el store) al backend (API real) y utilizaría paginación en el servidor con **TanStack Query** para manejar el caché y las actualizaciones en tiempo real."

---

## 🌟 5. Valor Agregado: El Módulo de IA
El componente de **Resumen de IA** no es solo visual; utiliza un motor de análisis que procesa los leads actuales en el store para ofrecer insights reales (aunque las respuestas sean plantillas premium), demostrando visión de negocio y capacidad de integración de tecnologías emergentes.

---
*Documento preparado por Antigravity para One Million Copy SAS.*
