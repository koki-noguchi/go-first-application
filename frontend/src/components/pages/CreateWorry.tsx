import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { useCreateWorryMutation } from '../../generated/graphql';
import firebase from 'firebase';


export const CreateWorry = () => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

    const [createWorry] = useCreateWorryMutation({
        variables: {
            title: title,
            notes: note
        }
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createWorry();
    }

    return (
        <>
        <Link to='/'>home</Link>
        <SDiv>
            <SForm onSubmit={handleSubmit}>
                <Form.Field>
                    <label>タイトル</label>
                    <input value={title} onChange={onChangeTitle} placeholder='心配事・不安・嫌だったことを一言で表すと？' />
                </Form.Field>
                <Form.Field>
                    <label>心配事・不安・嫌だったこと</label>
                    <textarea
                        value={note}
                        onChange={onChangeNote}
                        style={{height: '50vh', resize: 'none'}}
                        placeholder='今日１日にどんな心配事・不安・嫌だったことがありましたか？例えば、発表会で失敗しないか不安だった・自分のミスで先輩に迷惑をかけて凹んだといったように。'
                    ></textarea>
                </Form.Field>
                <div>
                    <Button type='submit'>Submit</Button>
                </div>
            </SForm>
        </SDiv>
        </>
    )
}

const SForm = styled(Form)`
    width: 70vh;
    background-color: #CCFFCC;
    padding: 15px;
    border-radius: 10px;
`

const SDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
`