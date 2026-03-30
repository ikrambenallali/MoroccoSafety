import axios from 'axios'
import { API_URL } from '../utils/constants'

const API = `${API_URL}/users`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// 👤 Get all users (admin)
export const getUsers = async () => {
  const res = await axios.get(API, getAuthHeaders())
  return res.data
}

// 🔄 Update role
export const updateUserRole = async (userId: string, role: string) => {
  const res = await axios.put(
    `${API}/role`,
    { userId, role },
    getAuthHeaders()
  )
  return res.data
}

// 👤 Get profile
export const getProfile = async () => {
  const res = await axios.get(`${API}/profile`, getAuthHeaders())
  return res.data
}

// ✏️ Update profile
export const updateProfile = async (data: any) => {
  const res = await axios.put(`${API}/profile`, data, getAuthHeaders())
  return res.data
}