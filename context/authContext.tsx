import React, { createContext, useContext, useState, useEffect } from "react"
import { auth, googleProvider } from "../firebaseConfig"
import { signInWithPopup } from "firebase/auth"


const AuthContext = createContext<any>(null)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: any) {
    const [currentUser, setCurrentUser] = useState<any>()
    const [user, setUser] = useState()
    const [loaded, setLoaded] = useState(false)

    async function loginWithGoogle() {
        await signInWithPopup(auth, googleProvider)
    }


    async function logout() {
        await auth.signOut()
    }

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoaded(true)
            
        })
        return unSubscribe
    }, [])


    const value = {
        setCurrentUser,
        currentUser,
        loginWithGoogle,
        logout,
        user,
        setUser
    }

    return (
        <AuthContext.Provider value={value}>
            {loaded && children}
        </AuthContext.Provider>
    )
}

