import axios from 'axios'
import { getToken } from './authService'

import { API_CORE_URL } from '../config'

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
})

export const getTodos = () => axios.get(`${API_CORE_URL}/api/tasks`, authHeader())
export const addTodo = (title) => axios.post(`${API_CORE_URL}/api/tasks`, { title }, authHeader())
export const deleteTodo = (id) => axios.delete(`${API_CORE_URL}/api/tasks/${id}`, authHeader())
export const updateTodo = (id, body) => axios.put(`${API_CORE_URL}/api/tasks/${id}`, body, authHeader())
