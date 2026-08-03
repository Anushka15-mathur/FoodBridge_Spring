import { createContext, useCallback, useEffect, useState } from "react";
import authService from "../services/authService";
import { getToken, setToken, removeToken } from "../utils/token";
import { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setTokenState] = useState(getToken());
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        return currentUser;
    }, []);

    useEffect(() => {
        const restoreSession = async () => {
            const storedToken = getToken();

            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                setAuthToken(storedToken);
                setTokenState(storedToken);
                await refreshUser();
            } catch {
                removeToken();
                setAuthToken(null);
                setTokenState(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, [refreshUser]);

    const login = async (credentials) => {
        const response = await authService.login(credentials);

        if (response.token) {
            setToken(response.token);
            setAuthToken(response.token);
            setTokenState(response.token);
            setUser(response.user);
        }

        return response;
    };

    const logout = () => {
        removeToken();
        setAuthToken(null);
        setTokenState(null);
        setUser(null);
    };

    const value = {
        token,
        user,
        login,
        logout,
        refreshUser,
        loading,
        isAuthenticated: Boolean(token),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
