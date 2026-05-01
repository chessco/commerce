export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
  description: string;
  specs: Record<string, string>;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Pending' | 'In Review' | 'Completed' | 'Cancelled';
  items: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuotationRequest {
  id: string;
  projectType: 'Industrial' | 'Commercial' | 'Residential';
  referenceName: string;
  squareFootage: number;
  timeline: string;
  status: 'Draft' | 'Submitted' | 'Processing' | 'Completed';
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}
