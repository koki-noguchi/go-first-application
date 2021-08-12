import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import styled from 'styled-components'
import { auth } from "../../base";
import { Link, useHistory } from "react-router-dom";
import { List } from "semantic-ui-react";

export const Home = () => {
    const month = dayjs().format('MM');
    const today = dayjs().format('DD');
    const startOfWeek = dayjs().startOf('week');

    const generateWeekList = () => {
        let weekList = [];
        let date = startOfWeek;

        for (let i = 0; i < 7; i++) {
            weekList.push(date.format('DD'));
            date = date.add(1, 'day');
        }
        return weekList;
    }

    const week = generateWeekList();
    console.log(week);

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
        <SDiv>
            <List horizontal>
                {week.map((day) => (
                    <List.Item>
                        <SListContent today={today} day={day}>{day}</SListContent>
                    </List.Item>
                ))}
            </List>
        </SDiv>
        </>
    )
}

const SDiv = styled.div`
    text-align: center;
`

const SListContent = styled(List.Content)`
    font-size: 2em;
    border: 0px solid;
    padding: 8px;
    border-radius: ${props => props.today === props.day && '50%'};
    background-color: ${props => props.today === props.day && '#FF8C00'};
    color: ${props => props.today === props.day && 'white'};
`
