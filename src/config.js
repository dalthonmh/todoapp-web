// src/config.js
export const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL || ''

/**
 * Base URL for the Tasks API.
 * Can point to either:
 *  - todoapp-core (legacy first version, now returns "id")
 *  - todoapp-task (improved Java version)
 * Defaults to relative URLs (''), which works great behind the Ingress.
 */
export const API_TASK_URL = import.meta.env.VITE_API_TASK_URL || import.meta.env.VITE_API_CORE_URL || ''
