import axios from 'axios'
import { getToken } from './authService'

const API = 'http://localhost:3000/api' // microservicio de ToDo

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
})

export const getTodos = () => axios.get(`${API}/tasks`, authHeader())
export const addTodo = (title) => axios.post(`${API}/tasks`, { title }, authHeader())
export const deleteTodo = (id) => axios.delete(`${API}/tasks/${id}`, authHeader())
export const updateTodo = (id, body) => axios.put(`${API}/tasks/${id}`, body, authHeader())
