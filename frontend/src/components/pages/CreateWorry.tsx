import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';

export const CreateWorry = () => {
    return (
        <>
        <Link to='/'>home</Link>
        <Form>
            <Form.Field>
                <label>タイトル</label>
                <input placeholder='First Name' />
            </Form.Field>
            <Form.TextArea label='不安なことを書いてみよう' placeholder='Tell us more about you...' />
            <Button type='submit'>Submit</Button>
        </Form>
        </>
    )
}