import { useState, useEffect } from 'react'
import axios from 'axios'
import { Briefcase, Plus, LogOut, TrendingUp, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react'

const API = 'https://job-tracker-backend-qgjl.onrender.com'

const STATUS = {
  Applied:   { bg: 'bg-blue-900',    text: 'text-blue-300'    },
  Interview: { bg: 'bg-violet-900',  text: 'text-violet-300'  },
  Offer:     { bg: 'bg-emerald-900', text: 'text-emerald-300' },
  Rejected:  { bg: 'bg-red-900',     text: 'text-red-300'     },
}

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({ company: '', role: '', status: 'Applied', notes: '' })
  const [showForm, setShowForm] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  const headers = { Authorization: `Bearer ${token}` }

  const fetchJobs = async () => {
    const res = await axios.get(`${API}/api/jobs`, { headers })
    setJobs(res.data)
  }

  useEffect(() => { fetchJobs() }, [])

  const addJob = async () => {
    if (!form.company || !form.role) return alert('Company and Role are required!')
    await axios.post(`${API}/api/jobs`, form, { headers })
    setForm({ company: '', role: '', status: 'Applied', notes: '' })
    setShowForm(false)
    fetchJobs()
  }

  const deleteJob = async (id) => {
    await axios.delete(`${API}/api/jobs/${id}`, { headers })
    fetchJobs()
  }

  const updateStatus = async (job, newStatus) => {
    await axios.put(`${API}/api/jobs/${job.id}`, { ...job, status: newStatus }, { headers })
    fetchJobs()
  }

  const uploadResume = async (jobId, file) => {
    const formData = new FormData()
    formData.append('resume', file)
    await axios.post(`${API}/api/jobs/${jobId}/resume`, formData, {
      headers: { ...headers, 'Content-Type': 'multipart/form-data' }
    })
    fetchJobs()
  }

  const logout = () => { localStorage.clear(); window.location.href = '/' }

  const stats = [
    { label: 'Total Applied', value: jobs.length,                                       icon: <Briefcase size={18} />,   from: 'from-violet-600', to: 'to-indigo-600' },
    { label: 'In Interview',  value: jobs.filter(j => j.status === 'Interview').length,  icon: <Clock size={18} />,       from: 'from-blue-500',   to: 'to-cyan-500'   },
    { label: 'Offers',        value: jobs.filter(j => j.status === 'Offer').length,      icon: <CheckCircle size={18} />, from: 'from-emerald-500',to: 'to-teal-600'   },
    { label: 'Rejected',      value: jobs.filter(j => j.status === 'Rejected').length,   icon: <XCircle size={18} />,     from: 'from-rose-500',   to: 'to-red-600'    },
  ]

  const filtered = activeFilter === 'All' ? jobs : jobs.filter(j => j.status === activeFilter)
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div className="flex min-h-screen bg-gray-950 text-sm">
      <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col p-5 shrink-0">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Briefcase size={16} className="text-white" />
          </div>
          <span className="text-white font-semibold text-base">JobTracker</span>
        </div>
        <nav className="flex-1 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600 text-white font-medium cursor-pointer">
            <TrendingUp size={16} />
            <span>Applications</span>
          </div>
        </nav>
        <div className="border-t border-gray-800 pt-4 mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <div>
              <p className="text-white text-xs font-medium">{user?.name}</p>
              <p className="text-gray-500 text-xs">Free plan</p>
            </div>
          </div>
          <button onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-gray-800 bg-gray-900 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-white font-semibold text-lg">Welcome back, {user?.name} 👋</h1>
            <p className="text-gray-500 text-xs mt-0.5">Here's your job search overview</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-xs">
            <Plus size={15} />
            Add Application
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map(s => (
              <div key={s.label} className={`bg-gradient-to-br ${s.from} ${s.to} rounded-xl p-5 text-white`}>
                <div className="flex justify-between items-start mb-3">
                  <span className="opacity-80">{s.icon}</span>
                  <ChevronRight size={14} className="opacity-50" />
                </div>
                <p className="text-3xl font-bold mb-1">{s.value}</p>
                <p className="text-xs opacity-75">{s.label}</p>
              </div>
            ))}
          </div>

          {showForm && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
              <p className="text-white font-semibold mb-4">New Application</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { placeholder: 'Company name', key: 'company' },
                  { placeholder: 'Role / Position', key: 'role' },
                ].map(f => (
                  <input key={f.key} placeholder={f.placeholder} value={form[f.key]}
                    className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                ))}
                <select value={form.status}
                  className="bg-gray-800 border border-gray-700 text-white px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
                <input placeholder="Notes (optional)" value={form.notes}
                  className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={addJob} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">Save</button>
                <button onClick={() => setShowForm(false)} className="bg-gray-800 hover:bg-gray-700 text-gray-400 px-4 py-2 rounded-lg text-sm transition-colors">Cancel</button>
              </div>
            </div>
          )}

          <div className="flex gap-2 mb-5">
            {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-indigo-500'}`}>
                {f}
              </button>
            ))}
            <span className="ml-auto text-gray-600 text-xs self-center">{filtered.length} applications</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-600">
                <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
                <p>No applications yet. Click Add Application!</p>
              </div>
            )}
            {filtered.map(job => {
              const s = STATUS[job.status] || STATUS['Applied']
              return (
                <div key={job.id} className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-5 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-white font-bold text-sm">
                      {job.company[0].toUpperCase()}
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-white font-semibold text-base">{job.company}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{job.role}</p>
                  {job.notes && (
                    <p className="text-gray-600 text-xs border-t border-gray-800 pt-3 mt-3">{job.notes}</p>
                  )}
                  <select value={job.status} onChange={e => updateStatus(job, e.target.value)}
                    className="mt-3 w-full bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                  <div className="mt-3">
                    {job.resumeUrl ? (
                      <div className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-lg">
                        <span className="text-emerald-400 text-xs">Resume uploaded ✓</span>
                        <a href={`${API}${job.resumeUrl}`} target="_blank" rel="noreferrer"
                          className="text-xs text-indigo-400 hover:text-indigo-300">View</a>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 bg-gray-800 border border-dashed border-gray-700 hover:border-indigo-500 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                        <span className="text-gray-500 text-xs">Upload Resume (PDF)</span>
                        <input type="file" accept=".pdf" className="hidden"
                          onChange={e => { const file = e.target.files[0]; if (file) uploadResume(job.id, file) }} />
                      </label>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
                    <span className="text-gray-700 text-xs">
                      {new Date(job.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <button onClick={() => deleteJob(job.id)}
                      className="text-xs text-gray-600 hover:text-red-400 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}