// Core shared types (self-contained - no external imports)
export interface User {
  id: number;
  email: string;
  role: 'USER' | 'ADMIN';
  level: number;
  shareQuantity?: number;
  name?: string;
}

export interface Shareholder {
  id: number;
  name: string;
  email: string;
  shares: number;
  shares_owned?: number; // Legacy support
  percentage: number;
  address?: string;
  phone?: string;
}

export interface Emission {
  id: number;
  title: string;
  description: string;
  sharePrice: number;
  price_per_share?: number; // Legacy support
  totalShares: number;
  availableShares: number;
  new_shares_offered?: number; // Legacy support
  shares_before?: number; // Legacy support
  shares_after?: number; // Legacy support
  minimumInvestment?: number;
  startDate: string;
  start_date?: string; // Legacy support
  endDate: string;
  end_date?: string; // Legacy support
  status: 'DRAFT' | 'ACTIVE' | 'CLOSED' | 'CANCELLED' | 'COMPLETED';
  presentation_material?: string; // Legacy support
}

export interface Subscription {
  id: number;
  userId: number;
  emissionId: number;
  shareQuantity: number;
  shares_requested?: number; // Legacy support
  shares_allocated?: number; // Legacy support
  totalAmount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  approved_at?: string; // Legacy support
  user?: User;
  emission?: Emission;
}

export interface EmissionSubscription extends Subscription {} // Legacy alias

export interface SubscriptionWithUser extends Subscription {
  user: User;
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