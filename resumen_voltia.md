# Resumen del Código Abierto (Voltia)

Basado en los archivos proporcionados en tu entorno de desarrollo, el proyecto **Voltia** está estructurado como una aplicación moderna con un frontend en React (posiblemente un framework como Vite o Next.js) y un backend manejado con Prisma ORM.

## Componentes y Páginas (Frontend)

- **`AdminProducts.tsx`**: Es la página de administración del catálogo de productos. Proporciona una interfaz rica e interactiva con dos modos de visualización (Tabla y Kanban). Integra la funcionalidad completa de CRUD utilizando hooks personalizados. Muestra los productos filtrando por inventario (En Stock, Stock Bajo, Sin Stock). Se apoya en librerías como `framer-motion` y `lucide-react`.

## Estado Global y Hooks (Frontend)

- **`uiStore.ts`**: Utiliza **Zustand** como manejador de estado global. Guarda la preferencia de vista del usuario en la zona de administración (`table` o `kanban`) y además lo persiste usando el almacenamiento local (persist middleware).
- **`useCategories.ts`**: Es un hook de **React Query** (`useQuery`) encargado de consumir la API (`GET /categories`) para obtener la lista de las categorías disponibles.
- **`useQuotations.ts`**: Es un hook de **React Query** (`useMutation`) utilizado para enviar solicitudes (`POST /quotations`) encargadas de crear nuevas cotizaciones (con nombre y descripción).

## Configuración Base de Datos (Backend / API)

- **`prisma.config.ts`**: Contiene la configuración general del ORM **Prisma**, apuntando al archivo original de su esquema, definiendo la ruta para las migraciones y registrando el script de "sembrado" o población de datos (seed). Obtiene la conexión directamente de las variables de entorno (`DATABASE_URL`).
