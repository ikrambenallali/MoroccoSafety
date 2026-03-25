import axios from 'axios'

const API = 'http://localhost:3000/stats'

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