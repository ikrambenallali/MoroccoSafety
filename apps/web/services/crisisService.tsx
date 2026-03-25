import axios from 'axios'

const API = 'http://localhost:3000/crisis'

// 🔐 ajouter token automatiquement
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const getCrises = async () => {
  const res = await axios.get(API)
  return res.data
}

export const getCrisis = async (id: string) => {
  const res = await axios.get(`${API}/${id}`)
  return res.data
}

export const createCrisis = async (data: any) => {
  const res = await axios.post(API, data, getAuthHeaders())
  return res.data
}

export const updateCrisis = async (id: string, data: any) => {
  const res = await axios.put(`${API}/${id}`, data, getAuthHeaders())
  return res.data
}

export const deleteCrisis = async (id: string) => {
  const res = await axios.delete(`${API}/${id}`, getAuthHeaders())
  return res.data
}

export const closeCrisis = async (id: string) => {
  const res = await axios.patch(`${API}/${id}/close`, {}, getAuthHeaders())
  return res.data
}