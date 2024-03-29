import React, { useEffect, useState } from "react";
import { auth } from "../../base";
import { Link, useHistory } from "react-router-dom";

export const Home = () => {
    const history = useHistory();
    const logout = async () => {
        try {
            await auth.signOut();
            history.push('/login');
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <>
        <Link to="/login">login</Link>
        <br></br>
        <Link to="/signup">signup</Link>
        <div>Homeです。</div>
        <Link to="/create_worry">worry</Link>
        <br></br>
        <button onClick={logout}>ログアウト</button>
        </>
    )
}