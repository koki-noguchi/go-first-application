import React, { memo, VFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CreateWorry } from '../components/pages/CreateWorry';
import { Home } from '../components/pages/Home';
import { AuthProvider } from '../providers/auth/AuthProvider';

export const AuthRouter: VFC = memo(() => {
    return (
        <AuthProvider>
            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route path="/create_worry">
                    <CreateWorry></CreateWorry>
                </Route>
            </Switch>
        </AuthProvider>
    )
})
