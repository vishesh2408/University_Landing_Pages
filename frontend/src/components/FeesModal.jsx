import React, {useEffect, useState} from 'react'

export default function FeesModal({open, onClose, univId, courses: initialCourses}){
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
  const [fees, setFees] = useState(null)
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState('') // 'initial' | 'remote'

  useEffect(()=>{
    if(!open) return
    // show initial courses immediately if available
    if(initialCourses && initialCourses.length){
      setFees({ courses: initialCourses })
      setSource('initial')
    }

    let mounted = true
    const controller = new AbortController()
    setLoading(true)
    fetch(`${API_BASE}/api/fees?univ=${univId}`, { signal: controller.signal })
      .then(r => {
        if(!r.ok) throw new Error('bad response')
        return r.json()
      })
      .then(j => {
        if(!mounted) return
        if(!j) return
        // normalize different shapes: prefer j.courses or array
        const remoteCourses = Array.isArray(j) ? j : (j.courses || [])
        if(remoteCourses && remoteCourses.length){
          // merge by code/name: remote wins when available
          const initialMap = (initialCourses || []).reduce((acc,c)=>{ if(c.code) acc[c.code]=c; else acc[c.name]=c; return acc }, {})
          const merged = remoteCourses.map(rc=>{
            const key = rc.code || rc.name
            const base = initialMap[key] || {}
            return { ...base, ...rc }
          })
          setFees({ courses: merged })
          setSource('remote')
        } else {
          // no remote courses; keep whatever we had
          setFees(prev=>prev || { courses: [] })
        }
      })
      .catch(err => {
        if(err.name !== 'AbortError'){
          console.warn('[FeesModal] fetch failed', err && err.message)
          setFees(prev=>prev || null)
        }
      })
      .finally(()=>{ if(mounted) setLoading(false) })

    const onKey = (e)=>{ if(e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)

    return ()=>{ mounted = false; controller.abort(); window.removeEventListener('keydown', onKey) }
  },[open,univId,initialCourses,onClose])

  if(!open) return null

  const handleBackdrop = (e)=>{ if(e.target === e.currentTarget) onClose() }

  const courseList = (()=>{
    if(!fees) return []
    if(Array.isArray(fees)) return fees
    if(fees.courses) return fees.courses
    return []
  })()

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={handleBackdrop}>
      <div className="bg-white max-w-2xl w-full md:w-3/4 lg:w-2/3 p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Course-wise Fees</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-600 hover:text-gray-800">Close</button>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            {loading && <div className="text-sm text-gray-600">Loading...</div>}
            {!loading && source && <div className="text-sm text-gray-500">Source: {source === 'remote' ? 'Server' : 'Local fallback'}</div>}
          </div>
          {!loading && courseList.length>0 && (
            <div className="space-y-3">
              {courseList.map((c)=> (
                <div key={c.code || c.name} className="p-3 border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50">
                  <div>
                    <div className="font-medium text-gray-800">{c.name}</div>
                    <div className="text-sm text-gray-600">{c.code ? `Code: ${c.code}` : null}</div>
                    {c.details && <div className="text-sm text-gray-700 mt-1">{c.details}</div>}
                  </div>
                  <div className="mt-3 sm:mt-0 sm:text-right">
                    <div className="text-sm text-gray-700">Fees Range</div>
                    <div className="font-semibold text-gray-900">{c.fees?.min || 'N/A'} — {c.fees?.max || 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && courseList.length===0 && <div className="text-sm text-gray-600">No fee data available.</div>}
        </div>
      </div>
    </div>
  )
}
