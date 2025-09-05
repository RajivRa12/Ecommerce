import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User } from '@shared/types';
import { supabase } from '@/lib/supabaseClient';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_SUCCESS'; payload: User };

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: { email: string; password: string; firstName: string; lastName: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSupabaseUserToUser(user: any): User {
  return {
    id: user.id,
    email: user.email,
    firstName: (user.user_metadata && (user.user_metadata.firstName || user.user_metadata.first_name)) || '',
    lastName: (user.user_metadata && (user.user_metadata.lastName || user.user_metadata.last_name)) || '',
    role: 'customer',
    addresses: [],
    avatar: user.user_metadata?.avatar || undefined,
    createdAt: user.created_at || new Date().toISOString(),
    updatedAt: user.updated_at || new Date().toISOString(),
  } as User;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from Supabase session
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const session = (sessionData as any)?.session;
        if (session?.user && mounted) {
          const mapped = mapSupabaseUserToUser(session.user);
          dispatch({ type: 'LOGIN_SUCCESS', payload: mapped });
          localStorage.setItem('auth', JSON.stringify({ user: mapped }));
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }

        // Listen to auth changes
        supabase.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            const mappedUser = mapSupabaseUserToUser(session.user);
            dispatch({ type: 'LOGIN_SUCCESS', payload: mappedUser });
            localStorage.setItem('auth', JSON.stringify({ user: mappedUser }));
          } else {
            localStorage.removeItem('auth');
            dispatch({ type: 'LOGOUT' });
          }
        });
      } catch (error) {
        console.error('Auth init error', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: error.message };
      }
      const user = data.user;
      const mapped = mapSupabaseUserToUser(user);
      localStorage.setItem('auth', JSON.stringify({ user: mapped }));
      dispatch({ type: 'LOGIN_SUCCESS', payload: mapped });
      return { success: true };
    } catch (err: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: err.message };
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: { data: { firstName: userData.firstName, lastName: userData.lastName } },
      });
      if (error) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: error.message };
      }

      // For signUp, user may be null until confirmed; use returned data
      const user = (data as any).user || null;
      const mapped = user ? mapSupabaseUserToUser(user) : {
        id: '',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'customer',
        addresses: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as User;

      localStorage.setItem('auth', JSON.stringify({ user: mapped }));
      dispatch({ type: 'REGISTER_SUCCESS', payload: mapped });
      return { success: true };
    } catch (err: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('auth');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
