import React, { useEffect } from "react";
import { useLogin } from '../../hooks/auth/useLogin';
import { AuthCard } from '../organisms/auth/AuthCard';
import { Link, useHistory } from "react-router-dom";
import { auth } from '../../base'

export const LoginPage = () => {
    const { login } = useLogin();
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          user && history.push('/')
        })
      }, [])

    return (
        <>
        <Link to="/signup">signup</Link>
        <AuthCard headerName="セルフコンパッションアプリ" buttonName="ログイン" onClickButton={login}></AuthCard>
        </>
    )
}
