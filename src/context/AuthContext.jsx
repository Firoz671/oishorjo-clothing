import { createContext, useContext, useEffect, useReducer } from 'react';
import authService from '../api/authService';

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('oishorjo_user')) || null,
  token: localStorage.getItem('oishorjo_token') || null,
  isAuthenticated: !!localStorage.getItem('oishorjo_token'),
  isLoading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'RESTORE_SESSION':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on app load
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('oishorjo_token');
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success) {
            dispatch({ type: 'RESTORE_SESSION', payload: res.data });
          } else {
            authService.logout();
            dispatch({ type: 'LOGOUT' });
          }
        } catch {
          authService.logout();
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    restoreSession();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: res.data, token: res.token },
      });
    }
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    if (res.success) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: res.data, token: res.token },
      });
    }
    return res;
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
