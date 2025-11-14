import React, { useState } from 'react'

export default function LeadForm({ univId }) {
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
  const [form, setForm] = useState({ name: '', email: '', phone: '', state: '', course: '', intake: '', consent: false })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  function onChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setStatus(null)
    if (!form.consent) { setStatus({ type: 'error', msg: 'Please give consent.' }); return }
    if (!/^\d{10}$/.test(form.phone)) { setStatus({ type: 'error', msg: 'Enter 10-digit phone.' }); return }
    if (!form.state || form.state.trim().length === 0) { setStatus({ type: 'error', msg: 'Please enter your State.' }); return }
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, univId })
      })
      const json = await res.json()
      if (res.ok) {
        setStatus({ type: 'success', msg: json.message || 'Submitted' })
        setForm({ name: '', email: '', phone: '', state: '', course: '', intake: '', consent: false })
      } else {
        setStatus({ type: 'error', msg: json.error || 'Submission failed' })
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Network error' })
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">Full Name</label>
        <input name="name" value={form.name} onChange={onChange} required className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input name="email" type="email" value={form.email} onChange={onChange} required className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm">Phone (10-digit)</label>
        <input name="phone" value={form.phone} onChange={onChange} required className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm">State</label>
        <input name="state" value={form.state} onChange={onChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm">Course Interested</label>
        <input name="course" value={form.course} onChange={onChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm">Intake Year</label>
        <input name="intake" value={form.intake} onChange={onChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="flex items-center gap-2">
        <input name="consent" type="checkbox" checked={form.consent} onChange={onChange} />
        <label className="text-sm">I consent to be contacted</label>
      </div>
      <div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Submitting...' : 'Submit'}</button>
      </div>
      {status && (
        <div className={status.type === 'success' ? 'text-green-700' : 'text-red-700'}>{status.msg}</div>
      )}
    </form>
  )
}