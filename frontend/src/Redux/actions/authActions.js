import axios from 'axios'
import { FAIL, GETCURRENT, GETALLUSERS, LOGIN, LOGOUT, REGISTER } from '../types/authTypes'

export const login = (data,navigate) => async (dispatch) => {
    try {
        const res = await axios.post('/auth/login', data)
        dispatch({ type: LOGIN, payload: res.data })
        navigate('/messenger')

    } catch (error) {
        dispatch({ type: FAIL, payload: error.response.data })
    }
}

export const register = (data,navigate) => async (dispatch) => {
    try {
        const res = await axios.post('/auth/register', data)
        dispatch({ type: REGISTER, payload: res.data })
        navigate('/messenger')
    } catch (error) {
        dispatch({type: FAIL, payload:error.response.data})
    }
}

export const getallusers = (search) => async (dispatch) => {
     const token = localStorage.getItem('token')
    const config = {
        headers: {
            authorization: token
        }
    }
    try {
        const res = await axios.get(`/auth/users?search=${search}`, config)
        dispatch({type:GETALLUSERS, payload:res.data})
    } catch (error) {
        dispatch({type: FAIL, payload:error.response.data})
    }
}

export const getcurrent = () => async (dispatch) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            authorization: token
        }
    }
    try {
        const res = await axios.get('/auth/current', config)
        dispatch({type:GETCURRENT, payload:res.data})
    } catch (error) {
        dispatch({type:FAIL, payload:error.response.data })
    }
}

export const logout = () => {
    return {type: LOGOUT}
}