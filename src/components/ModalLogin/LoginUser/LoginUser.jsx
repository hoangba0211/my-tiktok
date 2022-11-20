import React, { useState } from 'react';
import classNames from 'classnames/bind';
import {useSelector, useDispatch} from 'react-redux'
import { getUser , getToken} from '~/features/user/userSlice';

import styles from './LoginUser.module.scss';
import images from '~/assets/images';
import axios from 'axios';

const cx = classNames.bind(styles);
function LoginUser() {
    //Global state
    const dispatch = useDispatch()

    //Local state
    const [eyeOn, setEyeOn] = useState(true);
    const [form, setForm] = useState({ email: '', password: '' });
    
    //Handle Function
    const handlePassword = () => {
        setEyeOn((prev) => !prev);
    };

    const handleChangeValue = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleLoginUser = () => {
        axios
            .post('https://tiktok.fullstack.edu.vn/api/auth/login', {
                email: form.email,
                password: form.password,
            })
            .then((res) => {
                console.log(res);
                localStorage.setItem('Token',res.data.meta.token)
                localStorage.setItem('user',JSON.stringify(res.data.data))
                dispatch(getToken(res.data.meta.token))
                dispatch(getUser(res.data.data.nickname))
                
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Log in</div>
            <div className={cx('desc')}>
                Email or username
                <span>Log in with phone</span>
            </div>
            <div>
                <div className={cx('input')}>
                    <input
                        type="text"
                        placeholder="Email or username"
                        name="email"
                        onChange={(e) => handleChangeValue(e)}
                    />
                </div>
                <div className={cx('input')}>
                    <input
                        type={eyeOn ? 'password' : 'text'}
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChangeValue(e)}
                    />
                    <div className={cx('icon')} onClick={handlePassword}>
                        {eyeOn ? <img src={images.eyeOff} alt="eye" /> : <img src={images.eyeOn} alt="eye" />}
                    </div>
                </div>
                <span className={cx('forgot')}>Forgot password?</span>

                <button disabled={false} className={cx('login-btn')} onClick={handleLoginUser}>
                    Log in
                </button>
            </div>
        </div>
    );
}

export default LoginUser;
