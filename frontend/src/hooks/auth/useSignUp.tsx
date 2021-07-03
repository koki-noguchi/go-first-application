import { useHistory } from "react-router-dom";
import { auth } from '../../base'
import { UserInfo } from '../../types/auth/userInfo';

export const useSignUp = () => {
    const history = useHistory();

    const signUp = (props: UserInfo) => {
        const {email, password} = props;
        try {
            auth.createUserWithEmailAndPassword(email, password)
            history.push('/login')
        } catch (err) {
            alert(err.message)
        }
    }

    return {signUp};
}