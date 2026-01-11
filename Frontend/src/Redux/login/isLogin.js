import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loginStatus : document.cookie !== "" //check for cookie
};
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setloginStatus: (state,action) => {
            state.loginStatus = (action.payload)
        },
    },
})

export const { setloginStatus } = loginSlice.actions

export default loginSlice.reducer