import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const API = 'https://job-tracker-backend-qgjl.onrender.com'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">J</div>
          <span className="text-white font-semibold text-base">JobTracker</span>
        </div>
        <h1 className="text-white text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>
        {error && <p className="text-red-400 text-sm mb-4 bg-red-950 p-3 rounded-lg">{error}</p>}
        <div className="space-y-3">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Email</label>
            <input type="email" placeholder="you@example.com"
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Password</label>
            <input type="password" placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-medium transition-colors mt-2">
            Sign in
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300">Register</Link>
        </p>
      </div>
    </div>
  )
}