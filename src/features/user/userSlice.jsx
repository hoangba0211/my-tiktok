import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: '',
    token:''
};

export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        getToken: (state, action) => {
            return {
                ...state,
                token: action.payload
            }
        },
        getUser: (state, action) => {
            return {
                ...state,
                user: action.payload

            }
        },
        onLogout: (state, action) => {
            return {
                ...state,
                user:action.payload,
                token:action.payload,
            }
        },
    },
});

export const {getToken, getUser, onLogout } = userSlice.actions;

export default userSlice.reducer;
