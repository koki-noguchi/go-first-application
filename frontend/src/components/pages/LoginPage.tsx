import React, { useState, ChangeEvent } from "react";
import { Grid, Header, Segment, Form } from 'semantic-ui-react';
import {PrimaryButton} from '../atoms/button/PrimaryButton';
import { useLogin } from '../../hooks/auth/useLogin';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useLogin();

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const onClickLogin = () => login({email, password});

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large'>
                    <Segment stacked>
                    <Header as='h2' color='teal' textAlign='center'>
                        セルフコンパッションアプリ
                    </Header>
                        <Form.Input
                            value={email}
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            onChange={onChangeEmail}
                        />
                        <Form.Input
                            value={password}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={onChangePassword}
                        />
                    <PrimaryButton disabled={email === '' || password === ''} onClick={onClickLogin}>ログイン</PrimaryButton>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}
