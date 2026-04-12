import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            setLoading,
            hasCheckedAuth,
            setHasCheckedAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}
