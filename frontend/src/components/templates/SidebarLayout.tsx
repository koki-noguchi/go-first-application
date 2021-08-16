import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

export const SidebarLayout: FC = ({children}) => {
    return (
        <SSideber as={Segment}>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible
                width='thin'
            >
                <Link to='/'>
                    <Menu.Item as='a'>
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                </Link>
                <Link to='/create_worry'>
                    <Menu.Item as='a'>
                        <Icon name='handshake outline' />
                        Self Compassion
                    </Menu.Item>
                </Link>
            </Sidebar>

            <Sidebar.Pusher>
                <Segment basic>
                { children }
                </Segment>
            </Sidebar.Pusher>
        </SSideber>
    )
}

const SSideber = styled(Sidebar.Pushable)`
    height: 100vh;
    background-image: url('https://images.unsplash.com/photo-1538645731800-4640c639bba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1225&q=80') !important;
`