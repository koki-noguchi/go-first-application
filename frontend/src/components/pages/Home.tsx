import React from "react";
import { auth } from "../../base";

export const Home = () => {
    return (
        <>
        <div>Homeです。</div>
        <button onClick={() => auth.signOut()}>ログアウト</button>
        </>
    )
}