import { useCallback } from 'react';
import { LoginInfo } from '../../types/auth/loginInfo';

export const useLogin = () => {
    const login = useCallback((props: LoginInfo) => {
        const {email, password} = props
        console.log([email, password]);
    }, [])

    return {login};
}