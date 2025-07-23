import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { AuthState } from '../../types/auth';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;

      state.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        accessToken: token,
        refreshToken: user.refreshToken,
        createdAt: user.metadata.creationTime || '',
        lastLoginAt: user.metadata.lastSignInTime || '',
      };
      state.token = token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, setLoading } =
  authSlice.actions;

export default authSlice.reducer;
