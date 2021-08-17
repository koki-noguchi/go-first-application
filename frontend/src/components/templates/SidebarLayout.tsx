import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

export const SidebarLayout: FC = ({children}) => {
    const [visible, setVisible] = React.useState(true);

    return (
        <SGrid columns={1}>
            <Grid.Column style={{padding: '0px'}}>
                <Sidebar.Pushable as={Segment} style={{background: 'none', border: 'none', boxShadow: 'none'}}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        onHide={() => setVisible(false)}
                        icon='labeled'
                        inverted
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        <SIcon
                        name='bars'
                        onClick={() => setVisible(!visible)}
                        color={'blue'}
                        size={'large'}
                        style={{marginTop: '30px'}}
                        />
                        <SMenuItem to='/'>
                            <Menu.Item as='a'>
                                <Icon name='home' />
                                Home
                            </Menu.Item>
                        </SMenuItem>
                        <Link to='/create_worry'>
                            <Menu.Item as='a'>
                                <Icon name='handshake outline' />
                                Self Compassion
                            </Menu.Item>
                        </Link>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic style={{padding: '0px'}}>
                        { children }
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Grid.Column>
        </SGrid>
    )
}

const SSideber = styled(Sidebar.Pushable)`
    background: none;
    border: none;
`

const SGrid = styled(Grid)`
    height: 100vh;
`

const SIcon = styled(Icon)`
    cursor: pointer;
`

const SMenuItem = styled(Menu.Item)`
    margin-top: 20px;
`