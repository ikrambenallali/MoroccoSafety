import axios from 'axios'
import { API_URL } from '../utils/constants'

const API = `${API_URL}/media`

// 📤 upload file
export const uploadMedia = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await axios.post(`${API}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return res.data
}

// 📥 get media by id
export const getMedia = async (id: string) => {
    const res = await axios.get(`${API}/${id}`)
    return res.data
}

// 📋 get all medias (requires backend endpoint)
export const getAllMedias = async () => {
    try {
        const res = await axios.get(API)
        return res.data
    } catch (error) {
        console.error('Error fetching medias:', error)
        return []
    }
}