import axios from 'axios'
import { API_URL } from '../utils/constants'

const API = `${API_URL}/stats`

export const getOverview = async () => {
  const res = await axios.get(`${API}/overview`)
  return res.data
}

export const getCrisisByType = async () => {
  const res = await axios.get(`${API}/crisis-by-type`)
  return res.data
}

export const getResolutionTime = async () => {
  const res = await axios.get(`${API}/resolution-time`)
  return res.data
}