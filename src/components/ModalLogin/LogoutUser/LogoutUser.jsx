
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onLogout } from '~/features/user/userSlice';

function LogoutUser() {
    const token = useSelector((state) => state.user.token);
    console.log(token)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('Token')
        localStorage.removeItem('user')
        dispatch(onLogout(''))
        navigate('/')
    },[])

    return;
}
export default LogoutUser;
