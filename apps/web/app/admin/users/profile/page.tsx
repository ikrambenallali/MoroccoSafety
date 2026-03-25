'use client'

import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '@/services/userService'

export default function ProfilePage() {
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    const fetch = async () => {
      const data = await getProfile()
      setForm(data)
    }
    fetch()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await updateProfile(form)
    alert('Profile updated')
  }

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-bold mb-4">My Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={form.name || ''}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
        />

        <input
          value={form.email || ''}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
        />

        <button className="bg-blue-500 text-white p-2 rounded">
          Update
        </button>
      </form>
    </div>
  )
}