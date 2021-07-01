import React, { VFC } from "react";
import { useLogin } from '../../hooks/auth/useLogin';
import { AuthCard } from '../organisms/auth/AuthCard';
import { Link } from "react-router-dom";

export const SignUpPage: VFC = () => {
    const { login } = useLogin();
    return (
        <>
            <Link to="/">login</Link>
            <AuthCard headerName="サインアップ" buttonName="登録" onClickButton={login}></AuthCard>
        </>
    )
}
