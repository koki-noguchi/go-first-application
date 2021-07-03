import React, { FC, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { useSignUp } from "../../hooks/auth/useSignUp";
import { AuthCard } from '../organisms/auth/AuthCard';
import { auth } from '../../base'

export const SignUpPage: FC = () => {
    const { signUp } = useSignUp();
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          user && history.push('/')
        })
      }, [])

    return (
        <>
            <Link to="/login">login</Link>
            <AuthCard headerName="サインアップ" buttonName="登録" onClickButton={signUp}></AuthCard>
        </>
    )
}
