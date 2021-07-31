import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { useCreateWorry } from '../../hooks/worry/useCreateWorry';


export const CreateWorry = () => {
    const [title, setTitle] = useState('');
    const [notes, setNote] = useState('');

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

    const { handleSubmit } = useCreateWorry();
    const onClickSubmit = (e: FormEvent) => handleSubmit({title, notes}, e);

    return (
        <>
        <Link to='/'>home</Link>
        <SDiv>
            <SForm onSubmit={onClickSubmit}>
                <SFormField>
                    <SLabel>タイトル</SLabel>
                    <input value={title} onChange={onChangeTitle} placeholder='今日１日にタイトルをつけるとしたら？' />
                </SFormField>
                <SFormField>
                    <SLabel>心配事・不安・嫌だったこと</SLabel>
                    <textarea
                        value={notes}
                        onChange={onChangeNote}
                        style={{height: '50vh', resize: 'none'}}
                        placeholder='どんな心配事・不安・つらかったことがありましたか？例えば、「発表会で失敗しないか不安だった・自分のミスで先輩に迷惑をかけて凹んだ」といったように。'
                    ></textarea>
                </SFormField>
                <SDivButton>
                    <Button type='submit'>Submit</Button>
                </SDivButton>
            </SForm>
        </SDiv>
        </>
    )
}

const SForm = styled(Form)`
    width: 80vh;
    height: 81vh;
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #333399;
    font-size: 18px !important;
`

const SFormField = styled(Form.Field)`
    text-align: center;
`

const SDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
`

const SDivButton = styled.div`
    text-align: center;
`

const SLabel = styled.label`
    margin-bottom: 12px !important;
    border-bottom: 1px solid;
    padding-bottom: 8px;
`
