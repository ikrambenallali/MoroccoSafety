import axios from 'axios'
import { API_URL } from '../utils/constants'

const API = `${API_URL}/zones`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// 📋 GET zones
export const getZones = async () => {
  const res = await axios.get(API, getAuthHeaders())
  return res.data
}

// ➕ CREATE zone
export const createZone = async (data: any) => {
  const res = await axios.post(API, data, getAuthHeaders())
  return res.data
}