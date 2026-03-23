'use client'

import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'

export default function Navbar() {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    router.push('/login')
  }

  return (
    <div className="bg-[#2D3336] text-white p-4 flex justify-between">
      <h1 className="font-bold">CrisAlert</h1>

      <button onClick={handleLogout} className="text-red-400">
        Logout
      </button>
    </div>
  )
}