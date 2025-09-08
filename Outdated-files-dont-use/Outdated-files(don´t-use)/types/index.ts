export interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  level: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Shareholder {
  id: number;
  user_id: number | null;
  name: string;
  email: string;
  shares_owned: number;
  created_at: string;
  updated_at: string;
}

export interface Emission {
  id: number;
  title: string;
  description: string;
  presentation_material: string;
  shares_before: number;
  new_shares_offered: number;
  shares_after: number;
  price_per_share: number;
  start_date: string;
  end_date: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface EmissionSubscription {
  id: number;
  emission_id: number;
  user_id: number;
  shares_requested: number;
  shares_allocated: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approved_by: number | null;
  approved_at: string | null;
  created_at: string;
}