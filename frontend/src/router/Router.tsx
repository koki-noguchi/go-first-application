import React, { memo, VFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../components/pages/Home';
import { LoginPage } from '../components/pages/LoginPage';
import { SignUpPage } from '../components/pages/SignUpPage';


export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Home></Home>
            </Route>
            <Route exact path="/login">
                <LoginPage></LoginPage>
            </Route>
            <Route path="/signup">
                <SignUpPage></SignUpPage>
            </Route>
        </Switch>
    )
});
