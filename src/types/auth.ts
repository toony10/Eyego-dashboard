interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  phoneNumber: string | null;
  accessToken: string;
  refreshToken: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}
