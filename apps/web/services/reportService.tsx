import axios from 'axios'
import { API_URL } from '../utils/constants'

const API = `${API_URL}/reports`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// 📋 GET all reports
export const getReports = async () => {
  const res = await axios.get(API, getAuthHeaders())
  return res.data
}

// ✅ VALIDATE
export const validateReport = async (id: string) => {
  const res = await axios.patch(
    `${API}/${id}/validate`,
    {},
    getAuthHeaders()
  )
  return res.data
}

// ❌ REJECT
export const rejectReport = async (id: string) => {
  const res = await axios.patch(
    `${API}/${id}/reject`,
    {},
    getAuthHeaders()
  )
  return res.data
}

export const createReport = async (data: any, token: string) => {
  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}