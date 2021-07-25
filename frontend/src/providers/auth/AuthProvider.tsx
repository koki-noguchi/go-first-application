import firebase from 'firebase';
import React, { FC, createContext, useEffect, useState } from 'react'
import { auth } from '../../base'
import { Link, useHistory } from "react-router-dom";

type AuthContextProps = {
    currentUser: firebase.User | null | undefined
  }

export const AuthContext = createContext<AuthContextProps>({ currentUser: undefined })

export const AuthProvider: FC = ({ children }) => {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(
      undefined
    )

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        user ? setCurrentUser(user) : history.push('/login');
      })
    }, [])

    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    )
  }
