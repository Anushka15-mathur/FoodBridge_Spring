import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { getToken, setToken, removeToken } from "../utils/token";
import { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setTokenState] = useState(getToken());
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = getToken();

        if (storedToken) {
            setAuthToken(storedToken);
            setTokenState(storedToken);
        }

        setLoading(false);
    }, []);

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
        loading,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}