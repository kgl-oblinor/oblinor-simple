// Import User type first
import { User } from '../../types/index';

// Re-export shared types
export * from '../../types/index';

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