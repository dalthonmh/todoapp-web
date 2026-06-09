import axios from 'axios'
import { getToken } from './authService'

import { API_TASK_URL } from '../config'

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
})

/**
 * Tasks API client.
 * Works with both backends:
 *  - todoapp-core (legacy Node/Mongo, now transformed to return "id")
 *  - todoapp-task (improved Java/Spring Boot, uses "id")
 *
 * The frontend only deals with "id".
 */
export const getTodos = () =>
  axios.get(`${API_TASK_URL}/api/tasks`, authHeader())

export const addTodo = (title) =>
  axios.post(`${API_TASK_URL}/api/tasks`, { title }, authHeader())

export const deleteTodo = (id) =>
  axios.delete(`${API_TASK_URL}/api/tasks/${id}`, authHeader())

export const updateTodo = (id, body) =>
  axios.put(`${API_TASK_URL}/api/tasks/${id}`, body, authHeader())
