import {loginUser} from '../../config/apiService'

export const postLogin = (data) => loginUser(data.data)

export const checkToken = (data) => loginUser(data.data)
