import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';

type Props = {
    children: ReactNode
}

export const SidebarLayout: FC<Props> = (props: Props) => {
    const { children } = props;
    const [visible, setVisible] = React.useState(window.innerWidth >= 768);

    const handle = () => {
        console.log('a');
    }

    return (
        <SGrid columns={1}>
            <Grid.Column style={{padding: '0px'}}>
                <SIconBars
                    name='bars'
                    onClick={() => setVisible(!visible)}
                    color={'blue'}
                    size={'large'}
                    visible={visible ? 1 : 0}
                />
                <SDropDown
                    button
                    className='icon'
                    icon='user circle'
                    direction='left'
                >
                    <Dropdown.Menu>
                        <Dropdown.Item text='ログアウト' onClick={handle} />
                    </Dropdown.Menu>
                </SDropDown>
                <Sidebar.Pushable as={Segment} style={{background: 'none', border: 'none', boxShadow: 'none', margin: '0px'}}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        vertical
                        visible={visible}
                        style={{maxWidth: '110px'}}
                    >
                        <Link to='/'>
                            <Menu.Item  style={{marginTop: '35px'}} >
                                <Icon name='home'  />
                                Home
                            </Menu.Item>
                        </Link>
                        <Link to='/create_worry'>
                            <Menu.Item >
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

const SGrid = styled(Grid)`
    height: 100vh;
    margin: 0px !important;
`

const SIconBars = styled(Icon)`
    display: none !important;
    position: absolute;
    z-index: 1;
    cursor: pointer;
    @media (max-width: 768px) {
        display: block !important;
    }
    transform: ${props => props.visible && 'rotate(90deg)'};
`

const SDropDown = styled(Dropdown)`
    padding: 5px !important;
    border: 1px solid !important;
    background-color: white !important;
    position: absolute !important;
    right: 10px !important;
    z-index: 100 !important;
    font-size: 1.5em !important;
    @media (max-width: 768px) {
        right: 0px !important;
    }
`