// Core shared types (self-contained - no external imports)
export interface User {
  id: number;
  email: string;
  role: 'USER' | 'ADMIN';
  level: number;
  shareQuantity?: number;
}

export interface Shareholder {
  id: number;
  name: string;
  email: string;
  shares: number;
  percentage: number;
  address?: string;
  phone?: string;
}

export interface Emission {
  id: number;
  title: string;
  description: string;
  sharePrice: number;
  totalShares: number;
  availableShares: number;
  minimumInvestment?: number;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'ACTIVE' | 'CLOSED' | 'CANCELLED';
}

export interface Subscription {
  id: number;
  userId: number;
  emissionId: number;
  shareQuantity: number;
  totalAmount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  user?: User;
  emission?: Emission;
}

// Frontend-specific types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface BlurredContentProps {
  children: React.ReactNode;
  requiredLevel: number;
  userLevel: number;
  userRole?: 'USER' | 'ADMIN';
  adminOnly?: boolean;
}

export interface APIError {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status?: number;
  };
  message?: string;
}