import axios from 'axios'

const API = 'http://localhost:8080'

export const login = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials)
  localStorage.setItem('token', res.data.token)
}

export const register = async (credentials) => {
  return axios.post(`${API}/register`, credentials)
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getToken = () => localStorage.getItem('token')
