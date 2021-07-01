import React, { useState, ChangeEvent } from "react";
import { Grid, Header, Segment, Form } from 'semantic-ui-react';
import { useLogin } from '../../hooks/auth/useLogin';
import { AuthCard } from '../organisms/auth/AuthCard';
import { Link } from "react-router-dom";



export const LoginPage = () => {
    const { login } = useLogin();
    return (
        <>
        <Link to="/signup">signup</Link>
        <AuthCard headerName="セルフコンパッションアプリ" buttonName="ログイン" onClickButton={login}></AuthCard>
        </>
    )
}
