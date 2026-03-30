import axios from 'axios'
import { API_URL } from '../utils/constants'

const API = `${API_URL}/alerts`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// ➕ Create alert
export const createAlert = async (data: any) => {
  const res = await axios.post(API, data, getAuthHeaders())
  return res.data
}

// 📢 Send alert
export const sendAlert = async (id: string) => {
  const res = await axios.post(
    `${API}/${id}/send`,
    {},
    getAuthHeaders()
  )
  return res.data
}

// 📋 (optionnel) get alerts
export const getAlerts = async () => {
  const res = await axios.get(API, getAuthHeaders())
  return res.data
}

export const getSentAlerts = async () => {
  const res = await axios.get(`${API}/sent`, getAuthHeaders())
  return res.data
}