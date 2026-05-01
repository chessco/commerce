import { Product, Order, DashboardMetric } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Interruptor Industrial",
    category: "Distribución de Energía",
    price: 1250.00,
    stock: 45,
    status: 'In Stock',
    image: "https://picsum.photos/seed/breaker/400/400",
    description: "Interruptor industrial de alto rendimiento diseñado para la protección de infraestructura eléctrica pesada.",
    specs: {
      "Voltaje": "480V",
      "Amperaje": "1200A",
      "Polos": "3 Polos",
      "Capacidad de Interrupción": "65kA"
    }
  },
  {
    id: "2",
    name: "Medidor de Energía Inteligente",
    category: "Monitoreo",
    price: 345.00,
    stock: 120,
    status: 'In Stock',
    image: "https://picsum.photos/seed/meter/400/400",
    description: "Medidor avanzado con monitoreo en tiempo real y conectividad en la nube para una gestión eficiente de la energía.",
    specs: {
      "Precisión": "Clase 0.5S",
      "Conectividad": "Modbus TCP/IP",
      "Pantalla": "LCD Retroiluminada",
      "Montaje": "Riel DIN"
    }
  },
  {
    id: "3",
    name: "Transformador de Alta Tensión",
    category: "Distribución de Energía",
    price: 8500.00,
    stock: 8,
    status: 'Low Stock',
    image: "https://picsum.photos/seed/transformer/400/400",
    description: "Unidad de transformación de alta tensión para distribución de energía a escala de servicios públicos y subestaciones industriales.",
    specs: {
      "Capacidad": "500kVA",
      "Voltaje Primario": "13.8kV",
      "Voltaje Secundario": "480V",
      "Enfriamiento": "Inmerso en Aceite"
    }
  },
  {
    id: "4",
    name: "Protector de Sobretensión",
    category: "Protección",
    price: 185.00,
    stock: 250,
    status: 'In Stock',
    image: "https://picsum.photos/seed/surge/400/400",
    description: "Dispositivo de protección contra sobretensiones confiable para salvaguardar equipos electrónicos sensibles de picos de voltaje.",
    specs: {
      "Tipo": "Tipo 2",
      "Descarga Máxima": "40kA",
      "Tiempo de Respuesta": "< 25ns",
      "Indicador": "Estado Visual"
    }
  }
];

export const DASHBOARD_METRICS: DashboardMetric[] = [
  { label: "Total de Pedidos", value: "1,248", change: 12.5, trend: 'up' },
  { label: "Nuevas Cotizaciones", value: "34", change: 8.2, trend: 'up' },
  { label: "Pendiente de Revisión", value: "12", change: -2.4, trend: 'down' },
  { label: "Proyectos Activos", value: "56", change: 0, trend: 'neutral' }
];

export const RECENT_ACTIVITY = [
  { id: "1", user: "Juan Pérez", action: "Cotización Aprobada", time: "hace 2 horas", project: "Subestación Industrial A" },
  { id: "2", user: "Sara Smith", action: "Nuevo Producto Añadido", time: "hace 4 horas", project: "Actualización de Catálogo" },
  { id: "3", user: "Miguel Johnson", action: "Cotización Solicitada", time: "hace 1 día", project: "Complejo Comercial B" },
  { id: "4", user: "Emily Brown", action: "Stock Actualizado", time: "hace 2 días", project: "Auditoría de Inventario" }
];

export const CHART_DATA = [
  { name: 'Ene', orders: 400, quotes: 240 },
  { name: 'Feb', orders: 300, quotes: 139 },
  { name: 'Mar', orders: 200, quotes: 980 },
  { name: 'Abr', orders: 278, quotes: 390 },
  { name: 'May', orders: 189, quotes: 480 },
  { name: 'Jun', orders: 239, quotes: 380 },
  { name: 'Jul', orders: 349, quotes: 430 },
];
