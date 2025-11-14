import React, { useEffect, useState } from 'react'
import LeadForm from '../components/LeadForm'
import FeesModal from '../components/FeesModal'

// A: Professional two-column layout (Variant A)
const getThemeA = () => ({
  heroGradient: 'bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600',
  heroButton: 'bg-indigo-600 hover:bg-indigo-700',
  highlight: 'text-indigo-600',
  activeTab: 'text-indigo-600 bg-indigo-50',
  primaryButton: 'bg-indigo-600 hover:bg-indigo-700',
  modalButton: 'bg-indigo-600',
})

const universityDataStore = {
  1: {
    name: 'Stellar Private University',
    tagline: 'Excellence in Education. Innovation for the Future.',
    logoUrl: 'https://placehold.co/140x40/4F46E5/FFF?text=StellarU',
    overview:
      'Stellar Private University is a premier institution dedicated to excellence in education, research, and innovation. We offer programs designed to equip students with the skills to succeed in a globalized world.',
    courses: [
      { code: 'BTE', name: 'B.Tech - Electronics', fees: { min: '$10,000', max: '$12,000' } },
      { code: 'BTC', name: 'B.Tech - Computers', fees: { min: '$11,000', max: '$13,000' } },
      { code: 'MBA', name: 'MBA - General', fees: { min: '$15,000', max: '$17,000' } },
    ],
    placements:
      'Stellar University boasts a 95% placement record with top companies. Average package approx $15,000 per annum.',
    facilities: ['State-of-the-art Labs', 'Modern Library', 'Sports Complex', 'On-campus Hostel'],
    highlights: [ { value: '95%', label: 'Placement Record' }, { value: '50+', label: 'Top Faculty' }, { value: '10+', label: 'Global Partnerships' } ],
    brochureUrl: '#',
  },
}

export default function UniversityPageA({ univId = 1 }){
  const theme = getThemeA()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(()=>{
    let mounted = true
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    setLoading(true)
    ;(async ()=>{
      try{
        const res = await fetch(`${API_BASE}/api/fees?univ=${univId}`)
        if(!res.ok) throw new Error('Bad response')
        const json = await res.json()
        if(mounted){ setData(json); setActiveTab('overview'); setLoading(false) }
      }catch(e){
        if(mounted){ setData(universityDataStore[univId]||null); setActiveTab('overview'); setLoading(false) }
      }
    })()
    return ()=>{ mounted = false }
  },[univId])

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero */}
      {!loading && data && (
        <section className={`${theme.heroGradient} text-white py-20`}> 
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{data.name}</h1>
              <p className="mt-4 text-lg text-indigo-100 max-w-xl">{data.tagline}</p>
              <div className="mt-6 flex gap-4">
                <a href={`/apply/${univId}`} className={`px-6 py-3 rounded-md text-white ${theme.heroButton}`}>Apply Now</a>
                <a href={data.brochureUrl} className="px-6 py-3 rounded-md bg-white text-indigo-700">Download Brochure</a>
              </div>
            </div>
            <div className="hidden md:block">
              <img src={data.logoUrl} alt="logo" className="h-24 mx-auto"/>
            </div>
          </div>
        </section>
      )}

      <main className="max-w-6xl mx-auto p-6 -mt-12">
        <div className="bg-white rounded-lg shadow-md p-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <section id="overview">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-3 text-gray-700">{data?.overview}</p>
            </section>

            <section id="courses" className="mt-6">
              <h3 className="text-xl font-semibold">Courses</h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                {data?.courses?.map(c=> (
                  <div key={c.code} className="p-4 border rounded-lg">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-gray-600">{c.fees?.min} — {c.fees?.max}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="placements" className="mt-6">
              <h3 className="text-xl font-semibold">Placements</h3>
              <p className="mt-2 text-gray-700">{data?.placements}</p>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-semibold">Key Highlights</h4>
              <ul className="mt-3 text-gray-700 space-y-2">
                {data?.highlights?.map((h,i)=> <li key={i}><strong className="text-indigo-600 mr-2">{h.value}</strong>{h.label}</li>)}
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Enquire Now</h4>
              <p className="text-sm text-gray-600">Fill quick form and our team will reach out.</p>
              <div className="mt-4">
                <LeadForm univId={univId} />
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-semibold">Fees</h4>
              <button onClick={()=>setOpen(true)} className={`mt-3 px-4 py-2 text-white rounded ${theme.primaryButton}`}>Check Course-wise Fees</button>
            </div>
          </aside>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500">
        &copy; {new Date().getFullYear()} {data?.name || 'University'}
      </footer>

      <FeesModal open={open} onClose={()=>setOpen(false)} univId={univId} theme={theme} courses={data?.courses} />
    </div>
  )
}
