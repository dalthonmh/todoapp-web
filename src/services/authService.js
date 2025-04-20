import axios from 'axios'

import { API_AUTH_URL } from '../config'

export const login = async (credentials) => {
  const res = await axios.post(`${API_AUTH_URL}/login`, credentials)
  localStorage.setItem('token', res.data.token)
}

export const register = async (credentials) => {
  return axios.post(`${API_AUTH_URL}/register`, credentials)
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getToken = () => localStorage.getItem('token')
