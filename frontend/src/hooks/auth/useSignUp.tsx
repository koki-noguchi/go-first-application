import { useHistory } from "react-router-dom";
import { auth } from '../../base'
import { UserInfo } from '../../types/auth/userInfo';

export const useSignUp = () => {
    const history = useHistory();

    const signUp = (props: UserInfo) => {
        const {email, password} = props;

        postSignUp(email, password).then(() => history.push('/login')).catch((err) => alert(err));
    }

    const postSignUp = async (email: string, password: string) => {
        await auth.createUserWithEmailAndPassword(email, password)
    }

    return {signUp};
}