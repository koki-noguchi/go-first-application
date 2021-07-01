import { useCallback } from 'react';
import { UserInfo } from '../../types/auth/userInfo';

export const useLogin = () => {
    const login = useCallback((props: UserInfo) => {
        const {email, password} = props
        console.log([email, password]);
    }, [])

    return {login};
}