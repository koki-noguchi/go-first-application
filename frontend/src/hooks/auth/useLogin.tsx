import { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { auth } from '../../base'
import { UserInfo } from '../../types/auth/userInfo';

export const useLogin = () => {
    const history = useHistory();

    const login = useCallback((props: UserInfo) => {
        const {email, password} = props;

        postLogin(email, password).then(() => history.push('/')).catch((err) => alert(err));
    }, [])

    const postLogin = async (email: string, password: string) => {
        await auth.signInWithEmailAndPassword(email, password);
    }

    return {login};
}