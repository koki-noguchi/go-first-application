import React, { FC, useState } from "react";
import dayjs from 'dayjs';
import styled from 'styled-components'
// import { auth } from "../../base";
// import { useHistory } from "react-router-dom";
import { List } from "semantic-ui-react";

export const Home: FC = () => {
    const month = dayjs().format('YYYY年MM月');
    const today = dayjs().format('DD');
    const startOfWeek = dayjs().startOf('week');
    const [selectedDate, setSelectedDate] = useState(today);

    const generateWeekList = () => {
        const weekList = [];
        let date = startOfWeek;

        for (let i = 0; i < 7; i++) {
            weekList.push(date.format('DD'));
            date = date.add(1, 'day');
        }
        return weekList;
    }

    const week = generateWeekList();

    // const history = useHistory();
    // const logout = async () => {
    //     try {
    //         await auth.signOut();
    //         history.push('/login');
    //     } catch (err) {
    //         alert(err.message)
    //     }
    // }

    const onClickDate = (day: string) => {
        setSelectedDate(day);
    }

    return (
        <>
        {/* <Link to="/login">login</Link>
        <br></br>
        <Link to="/signup">signup</Link>
        <Link to="/create_worry">worry</Link>
        <br></br>
        <button onClick={logout}>ログアウト</button> */}
        <SDiv>
            <SDivMonth>{month}</SDivMonth>
            <List horizontal style={{width: '100%'}}>
                {week.map((day, key) => (
                    <List.Item key={key}>
                        <SListContent as='button' selectedDate={selectedDate} day={day} onClick={() => onClickDate(day)}>{day}</SListContent>
                    </List.Item>
                ))}
                <SDivDemo>
                    <h2>History</h2>
                    <List bulleted>
                        <SListItem>test</SListItem>
                        <SListItem>test</SListItem>
                        <SListItem>test</SListItem>
                    </List>
                </SDivDemo>
            </List>
        </SDiv>
        </>
    )
}

const SDiv = styled.div`
    text-align: center;
`

const SDivMonth = styled.div`
    font-size: 1.8rem;
    margin: 65px 0 20px 0;
`

const SListContent = styled(List.Content)`
    font-size: 1.6em;
    border: 0px solid;
    padding: 8px;
    border-radius: ${props => props.selectedDate === props.day && '50%'};
    background: ${props => props.selectedDate === props.day && '#FF8C00' || 'none'};
    color: ${props => props.selectedDate === props.day && 'white'};
    cursor: pointer;
`
const SDivDemo = styled.div`
    margin-top: 50px;
    padding: 20px;
    max-width: 500px;
    height: 300px;
    background-color: white;
    margin: 50px auto;
`

const SListItem = styled(List.Item)`
    text-align: left;
`