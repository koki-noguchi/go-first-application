import React, { useEffect, useState, createContext, ReactNode } from 'react';
import { app } from '../../base';

type authContextType = {
    login: (email: string, password: string, history) => Promise<void>,
    signup: (email: string, password: string, history) => Promise<void>,
    currentUser
}

export const AuthContext = createContext<authContextType>({} as authContextType);

export const AuthProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (email: string, password: string, history） => {
        try {
            await app.auth().signInWithEmailAndPassword(email, password);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }

    const signup = async (email: string, password: string, history）) => {
        try {
            await app.auth().createUserWithEmailAndPassword(email, password);
            history.push('/')
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
      }, []);

    return (
        <AuthContext.Provider
            value={{
                login: login,
                signup: signup,
                currentUser
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
