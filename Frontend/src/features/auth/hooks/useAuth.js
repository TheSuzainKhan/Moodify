import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {
        user,
        setUser,
        loading,
        setLoading,
        hasCheckedAuth,
        setHasCheckedAuth
    } = context 

    async function handleRegister({username, email, password}) {
        try {
            setLoading(true)
            const data = await register({ username, email, password })
            setUser(data.user)
            setHasCheckedAuth(true)
            return data
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({username, email, password}) {
        try {
            setLoading(true)
            const data = await login({ username, email, password })
            setUser(data.user)
            setHasCheckedAuth(true)
            return data
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMe() {
        try {
            setLoading(true)
            const data = await getMe()
            setUser(data.user)
            return data
        } catch (error) {
            if (error?.response?.status === 401) {
                setUser(null)
                return null
            }

            throw error
        } finally {
            setHasCheckedAuth(true)
            setLoading(false)
        }
    }

    async function handleLogout() {
        try {
            setLoading(true)
            const data = await logout()
            setUser(null)
            setHasCheckedAuth(true)
            return data
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        if (hasCheckedAuth) return
        handleGetMe()  //wapas se user ko hydrate kar deta he => matlab backend se api ko call karna
    }, [hasCheckedAuth])
    
    return ({
        user,
        loading,
        hasCheckedAuth,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetMe
    })

}

