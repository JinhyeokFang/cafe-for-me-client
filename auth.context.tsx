import React, { FC, PropsWithChildren, ReactNode, useContext, useState } from "react";

export interface AuthorizationStoreState {
    token: null | string;
    setToken: (token: string) => void;
    clearToken: () => void;
    isLogined: () => boolean;
} 

export const AuthContext = React.createContext<AuthorizationStoreState>({ 
    token: null,
    setToken(token: string) {},
    clearToken() { this.token = null },
    isLogined() { return false },
});

export const useAuth = () => {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props: AuthProviderProps) => {
    const { children } = props;
    const [token, setToken] = useState<null | string>(null);
    
    const clearToken = () => {
        setToken(null);
    };

    const isLogined = () => {
        return token !== null;
    };

    const value = {
        token,
        setToken,
        clearToken,
        isLogined,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>    
    );
}
