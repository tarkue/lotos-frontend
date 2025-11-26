"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { api } from "..";
import { AuthClient } from "../controllers/auth.controller";
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  UserResponseDTO,
} from "../dto/auth.dto";

interface AuthState {
  isAuthenticated?: boolean;
  isLoading: boolean;
  user: UserResponseDTO | null;
}

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_AUTH"; payload: { user: UserResponseDTO } }
  | { type: "CLEAR_AUTH" }
  | { type: "SET_ERROR" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_AUTH":
      return {
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case "CLEAR_AUTH":
      return {
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    case "SET_ERROR":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (data: LoginRequestDTO) => Promise<void>;
  register: (data: RegisterRequestDTO) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: undefined,
    isLoading: true,
    user: null,
  });

  const checkAuth = useCallback(async () => {
    try {
      const hasToken = api.auth.isAuthenticated();

      if (!hasToken) {
        dispatch({ type: "CLEAR_AUTH" });
        return;
      }

      const userProfile = await api.users.getMyProfile();
      dispatch({ type: "SET_AUTH", payload: { user: userProfile } });
    } catch (error) {
      console.error("Auth check failed:", error);
      if (
        (error as { response: { status: number } })?.response?.status === 403
      ) {
        api.auth.clearTokens();
      }
      dispatch({ type: "CLEAR_AUTH" });
    }
  }, []);

  const login = useCallback(
    async (data: LoginRequestDTO) => {
      try {
        dispatch({ type: "SET_ERROR" });
        await api.auth.login(data);
        await checkAuth();
      } catch (error) {
        dispatch({ type: "SET_ERROR" });
        throw error;
      }
    },
    [checkAuth]
  );

  const register = useCallback(
    async (data: RegisterRequestDTO) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        await api.auth.register(data);
        await login({ email: data.email, password: data.password });
      } catch (error) {
        dispatch({ type: "SET_ERROR" });
        throw error;
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const refreshToken = (
        api.auth as AuthClient
      ).tokenStorage.getRefreshToken();
      if (refreshToken) {
        await api.auth.logout({ refresh_token: refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      api.auth.clearTokens();
      dispatch({ type: "CLEAR_AUTH" });
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const refreshToken = (
        api.auth as AuthClient
      ).tokenStorage.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token");
      }
      await (api.auth as AuthClient).forceRefreshToken({
        refresh_token: refreshToken,
      });
      await checkAuth();
    } catch {
      await logout();
    }
  }, [checkAuth, logout]);

  // Проверяем аутентификацию только при монтировании провайдера
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    ...state,
    login,
    register,
    logout,
    refresh,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
