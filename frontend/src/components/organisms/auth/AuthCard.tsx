import React, { VFC, memo, useState, ChangeEvent } from "react";
import { Grid, Header, Segment, Form } from 'semantic-ui-react';
import { UserInfo } from '../../../types/auth/userInfo';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';


type Props = {
    headerName: string,
    buttonName: string,
    onClickButton: (props: UserInfo) => void,
}

export const AuthCard: VFC<Props> = memo((props: Props) => {
    const { headerName, buttonName, onClickButton } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const onClickLogin = () => onClickButton({email, password});

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large'>
                    <Segment stacked>
                    <Header as='h2' color='teal' textAlign='center'>
                        {headerName}
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
                    <PrimaryButton disabled={email === '' || password === ''} onClick={onClickLogin}>{buttonName}</PrimaryButton>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
})
