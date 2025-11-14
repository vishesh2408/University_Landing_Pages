import React, { useEffect, useState } from 'react'
import LeadForm from '../components/LeadForm'
import FeesModal from '../components/FeesModal'

// Facility icons (simple, theme-aware)
const IconLab = ({ className = 'text-indigo-500' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-8 h-8 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 2v7.31M14 9.31V2" />
    <path d="M12 11.31C7.03 11.31 3 15.34 3 20.31V22h18v-1.69c0-4.97-4.03-9-9-9Z" />
  </svg>
)
const IconLibrary = ({ className = 'text-indigo-500' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-8 h-8 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
)
const IconSports = ({ className = 'text-indigo-500' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-8 h-8 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 15h1.5a2.5 2.5 0 0 1 0 5H4" />
    <path d="M19.5 15H18a2.5 2.5 0 0 1 0 5h1.5" />
  </svg>
)
const IconHostel = ({ className = 'text-indigo-500' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-8 h-8 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2 4.2 6.57v3.9c0 3.52 3.11 6.88 7.8 8.53 4.69-1.65 7.8-5.01 7.8-8.53v-3.9L12 2Z" />
  </svg>
)

const FacilityIcon = ({ name, theme }) => {
  const iconClass = theme?.highlight || 'text-indigo-600'
  switch (name.toLowerCase()) {
    case 'state-of-the-art labs':
    case 'robotics & ai lab':
    case 'high-performance computing center':
      return <IconLab className={iconClass} />
    case 'modern library':
    case 'digital library':
      return <IconLibrary className={iconClass} />
    case 'sports complex':
      return <IconSports className={iconClass} />
    case 'on-campus hostel':
      return <IconHostel className={iconClass} />
    default:
      return <IconLab className={iconClass} />
  }
}

// Shared mock data (keeps offline dev simple)
const universityDataStore = {
  1: {
    name: 'Stellar Private University',
    tagline: 'Excellence in Education. Innovation for the Future.',
    logoUrl: 'https://placehold.co/140x40/4F46E5/FFF?text=StellarU',
    overview:
      'Stellar Private University combines rigorous academics with hands-on research and industry collaboration. Our programs emphasize practical skills, interdisciplinary projects, and mentoring. Students benefit from strong industry ties, study-abroad options, and an incubator for student startups.',
    courses: [
      { code: 'BTE', name: 'B.Tech - Electronics & Communication', fees: { min: '$10,000', max: '$12,000' } },
      { code: 'BTC', name: 'B.Tech - Computer Science', fees: { min: '$11,000', max: '$13,000' } },
      { code: 'BDS', name: 'B.Sc. - Data Science', fees: { min: '$9,500', max: '$11,500' } },
      { code: 'BBA', name: 'BBA - Business Management', fees: { min: '$8,000', max: '$10,000' } },
      { code: 'MBA', name: 'MBA - Technology Management', fees: { min: '$16,000', max: '$18,000' } },
      { code: 'MTE', name: 'M.Tech - Embedded Systems', fees: { min: '$12,000', max: '$14,000' } },
    ],
    placements:
      'Stellar maintains a 95% placement record for undergraduates in core streams. Recent campus recruiters include Tata Consultancy Services, Qualcomm, Siemens, Amazon, and local engineering firms. Average package across programs: $15,000; top CTC last season: $75,000 (international placement). The Career Development Center runs internship drives, industry mentorship, and dedicated bootcamps.',
    facilities: [
      { name: 'State-of-the-art Labs', desc: 'Advanced electronics, robotics and IoT labs with industry-standard equipment and faculty-led projects.' },
      { name: 'Modern Library', desc: 'Hybrid library with print and digital collections, research subscriptions and group study rooms.' },
      { name: 'Sports Complex', desc: 'Multi-sport arena, indoor courts, gymnasium, and fitness trainers.' },
      { name: 'On-campus Hostel', desc: 'Secure hostels with mess facilities, study zones and recreational lounges.' },
      { name: 'Entrepreneurship & Incubator', desc: 'Support for student startups including seed grants, mentors and co-working space.' },
      { name: 'Student Wellness Center', desc: 'Counseling, medical care and wellness programs promoting student wellbeing.' },
    ],
    highlights: [ { value: '95%', label: 'Placement Record' }, { value: '200+', label: 'Industry Internships' }, { value: '40+', label: 'Active Research Labs' } ],
    news: [
      { title: 'Stellar Research Team Wins National Robotics Challenge', date: '2025-08-12', summary: 'Team StellarBots secured first place in a national-level robotics competition showcasing autonomous drones.' },
      { title: 'Industry Mentorship Program Launched', date: '2025-06-01', summary: 'New mentorship cohort pairs students with mentors from Qualcomm and Siemens for real-world projects.' },
    ],
    testimonials: [
      { name: 'Riya Sharma', role: 'Alumni - Software Engineer', text: 'Stellar gave me the practical experience and network to land my first role at a top MNC.' },
      { name: 'Dr. Amit Verma', role: 'Assistant Professor', text: 'Our students engage in impactful research that addresses industry challenges.' },
    ],
    importantDates: [
      { label: 'Admissions Deadline (Fall)', date: '2025-09-30' },
      { label: 'Scholarship Application', date: '2025-08-15' },
    ],
    brochureUrl: '#',
  },
  2: {
    name: 'Apex Technical Institute',
    tagline: 'Engineering the World of Tomorrow.',
    logoUrl: 'https://placehold.co/140x40/c2410c/FFF?text=ApexTech',
    overview:
      'Apex Technical Institute stands at the forefront of technological education. Our programs blend theory and practical application to prepare leaders in engineering and research.',
    courses: [
      { code: 'BTE', name: 'B.Tech - Electronics', fees: { min: '$11,000', max: '$13,000' } },
      { code: 'BTC', name: 'B.Tech - Computers', fees: { min: '$12,000', max: '$14,000' } },
      { code: 'MS', name: 'M.S. in Data Science', fees: { min: '$18,000', max: '$20,000' } },
    ],
    placements:
      'Apex graduates enjoy a 98% placement rate in core fields with an average starting salary around $18,000 per annum. Recruiters include TCS, Bosch, Amazon, Adobe and a growing set of high-growth startups. The Career Services team runs targeted employer drives, company-specific mock interviews and dedicated internship-to-hire programs. Notable outcomes: average package ~$18,000; top CTC recently reached $85,000; strong internship-to-offer conversions.',
    facilities: [
      { name: 'Robotics & AI Lab', desc: 'Dedicated robotics and AI research lab with industry-grade equipment, project pods and faculty-led research tracks.' },
      { name: 'Digital Library', desc: 'Extensive e-resources, research databases, licensed journals and collaborative workspaces with 24/7 access.' },
      { name: 'High-Performance Computing Center', desc: 'Cluster and GPU resources for large-scale data processing, AI training and research projects.' },
      { name: 'On-campus Hostel', desc: 'Modern hostels with high-speed internet, study lounges and secure access.' },
      { name: 'Entrepreneurship Cell', desc: 'Workshops, seed grants and mentor networks to help students incubate startups.' },
      { name: 'Student Wellness Center', desc: 'Counseling services, health checkups and wellbeing programs to support student life.' },
      { name: 'Industry Collaboration Labs', desc: 'Partnered lab-spaces jointly run with industry partners for live projects and internships.' },
    ],
    highlights: [ { value: '98%', label: 'Placement Record' }, { value: '40+', label: 'Research Labs' }, { value: '25+', label: 'Patents Filed' } ],
    news: [
      { title: 'Apex Partners with OpenAI Lab', date: '2025-07-20', summary: 'Apex lab will collaborate on ML research and host an annual AI hackathon.' },
      { title: 'New HPC Cluster Commissioned', date: '2025-05-10', summary: 'High-performance computing resources expanded to support data science projects.' },
      { title: 'Apex Students Win AI Hackathon', date: '2025-09-02', summary: 'Student teams from Apex clinched top prizes at the national AI hackathon demonstrating novel ML pipelines.' },
      { title: 'Industry Incubator Collaboration', date: '2025-10-11', summary: 'Apex signs a memorandum with a regional incubator to provide workspace and seed mentorship to student startups.' },
    ],
    testimonials: [
      { name: 'Vikram Rao', role: 'Alumni - Researcher', text: 'Apex provided me the lab access to publish my first paper in a top conference.' },
      { name: 'Sana Iqbal', role: 'Current Student', text: 'Hands-on projects and startup mentorship helped me launch my campus startup.' },
      { name: 'Priya Menon', role: 'Recruiter - Amazon', text: 'Apex students come well-prepared with practical skills and teamwork experience.' },
      { name: 'Sameer Gupta', role: 'Alumni - ML Engineer', text: 'Strong mentorship and project exposure at Apex accelerated my career into ML engineering.' },
    ],
    importantDates: [
      { label: 'M.Tech Applications Close', date: '2025-10-15' },
      { label: 'AI Hackathon', date: '2025-11-05' },
    ],
    brochureUrl: '#',
  },
  
}


const getTheme = (id) => {
  if (id === 2) {
    return {
      heroGradient: 'bg-gradient-to-r from-orange-700 via-red-600 to-orange-800',
      heroButton: 'bg-orange-600 hover:bg-orange-700',
      highlight: 'text-orange-600',
      activeTab: 'text-orange-600 bg-orange-50',
      primaryButton: 'bg-orange-600 hover:bg-orange-700',
      modalButton: 'bg-orange-600',
      logoBg: 'bg-orange-600',
    }
  }
  return {
    heroGradient: 'bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800',
    heroButton: 'bg-indigo-600 hover:bg-indigo-700',
    highlight: 'text-indigo-600',
    activeTab: 'text-indigo-600 bg-indigo-50',
    primaryButton: 'bg-indigo-600 hover:bg-indigo-700',
    modalButton: 'bg-indigo-600',
    logoBg: 'bg-indigo-700',
  }
}

export default function UniversityPage({ univId = 1 }) {
  const theme = getTheme(univId)
  const [open, setOpen] = useState(false)
  // initialize with local fallback data for instant render
  const [data, setData] = useState(universityDataStore[univId] || null)
  // fetching indicates background refresh in progress
  const [fetching, setFetching] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // id, name and path of the other university to link between pages
  const otherId = univId === 1 ? 2 : 1
  const otherName = universityDataStore[otherId]?.name || `University ${otherId}`
  const otherPath = otherId === 1 ? '/' : '/univ2'

  useEffect(() => {
    let mounted = true
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    // quick background refresh with short timeout to avoid long waits
    ;(async () => {
      setFetching(true)
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 2500)
      try {
        console.log('[UniversityPage] attempting fetch from', `${API_BASE}/api/fees?univ=${univId}`)
        const res = await fetch(`${API_BASE}/api/fees?univ=${univId}`, { signal: controller.signal })
        clearTimeout(timeout)
        if (!res.ok) throw new Error('bad response ' + res.status)
        const json = await res.json()
        console.log('[UniversityPage] fetched remote data:', json)
        if (mounted && json) {
          setData(json)
          setActiveTab('overview')
        }
      } catch (err) {
        if (err.name === 'AbortError') console.warn('[UniversityPage] fetch aborted (timeout)')
        else console.warn('[UniversityPage] fetch failed:', err && err.message)
        // keep fallback data already rendered
      } finally {
        if (mounted) setFetching(false)
      }
    })()
    return () => { mounted = false }
  }, [univId])

  const navLinks = [ 'overview', 'courses', 'fees', 'placements', 'facilities' ]
  // extend nav with news/testimonials for content-rich pages
  const extendedNav = [...navLinks, 'news', 'testimonials']

  // (Summary cards removed) use navbar to focus sections via focusSection(id)

  const focusSection = (id) => {
    setActiveTab(id)
    // smooth scroll to detailed section when it exists
    setTimeout(()=>{
      const el = document.getElementById(id)
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow sticky top-0 z-30">
        <div className="max-w-5xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-md text-white text-lg font-bold md:text-2xl ${theme.logoBg}`}>{data?.name || 'University'}</div>
          </div>
          <nav className="hidden md:flex items-center space-x-3">
            {extendedNav.map((id) => (
              <button key={id} onClick={() => focusSection(id)} className={`text-sm font-medium px-3 py-2 rounded-md transition-all ${activeTab===id?theme.activeTab:'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                {id.charAt(0).toUpperCase()+id.slice(1)}
              </button>
            ))}
            <a href={`/apply/${univId}`} className="text-sm text-white bg-green-600 hover:bg-green-700 font-medium px-4 py-2 rounded-full transition-all shadow-sm">Apply Now</a>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((id) => (
                <button key={id} onClick={() => { focusSection(id); setIsMobileMenuOpen(false) }} className={`block w-full text-left text-base font-medium px-3 py-2 rounded-md ${activeTab===id?theme.activeTab:'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>{id.charAt(0).toUpperCase()+id.slice(1)}</button>
              ))}
              <a href={`/apply/${univId}`} onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left text-base text-white bg-green-600 hover:bg-green-700 font-medium px-3 py-2 rounded-md">Apply Now</a>
              <div className="mt-2">
                {(extendedNav || []).map((id)=> (
                  <button key={id} onClick={() => { focusSection(id); setIsMobileMenuOpen(false) }} className="block w-full text-left text-base text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md">{id.charAt(0).toUpperCase()+id.slice(1)}</button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>

      {!fetching && data && (
        <section className={`relative py-16 md:py-24 ${theme.heroGradient}`}>
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-5xl font-bold">{data.name}</h1>
            <p className="text-xl md:text-2xl mt-3 text-gray-200">{data.tagline}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href={`/apply/${univId}`} className={`px-6 py-3 text-white font-semibold rounded-md shadow-lg transition-all text-lg ${theme.heroButton}`}>Apply Now</a>
              <a href={data.brochureUrl} className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-md shadow-lg hover:bg-gray-100 transition-all text-lg">Download Brochure</a>
            </div>
          </div>
        </section>
      )}

      {!fetching && (
        <section className="bg-white shadow-md -mt-10 relative z-20 mx-auto max-w-6xl rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {data?.highlights?.map((h,i)=> (
              <div key={i} className="text-center">
                <h3 className={`text-2xl font-bold ${theme.highlight}`}>{h.value}</h3>
                <p className="text-gray-600">{h.label}</p>
              </div>
            ))}
          </div>

          {/* summary cards removed — navbar will focus sections */}
        </section>
      )}

      <main className="max-w-5xl mx-auto p-6 mt-12">
        {fetching && <div className="text-center py-12 text-gray-600">Loading...</div>}
        {!fetching && data && (
          <section className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <section id="overview" className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-gray-800">Overview</h2>
                <p className="mt-4 text-gray-700 leading-relaxed text-base">{data.overview}</p>
              </section>

              <section id="courses" className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-gray-800">Courses Offered</h3>
                <ul className="mt-6 list-disc ml-5 text-gray-700 space-y-3">
                  {(data?.courses || []).map(c=> (
                    <li key={c.code} className="text-base"><span className="font-semibold text-gray-800">{c.name}</span><br/><span className="text-sm text-gray-600">Approx. Fees: {c.fees?.min} — {c.fees?.max}</span></li>
                  ))}
                </ul>
              </section>

              <section id="fees" className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-gray-800">Fee Structure</h3>
                <div className="mt-6 space-y-4">
                  {(data?.courses || []).map(c=> (
                    <div key={c.code} className="p-5 border border-gray-200 rounded-lg flex-col sm:flex-row flex justify-between sm:items-center bg-gray-50">
                      <div>
                        <div className="font-semibold text-lg text-gray-800">{c.name}</div>
                        <div className="text-sm text-gray-600">{c.fees?.min} — {c.fees?.max} (Per Year)</div>
                      </div>
                    </div>
                  ))}
                  <button onClick={()=>setOpen(true)} className={`mt-6 px-5 py-2 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.primaryButton}`}>Check Detailed Fees</button>
                </div>
              </section>

              <section id="placements" className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-gray-800">Placements</h3>
                <p className="mt-4 text-gray-700 leading-relaxed text-base">{data.placements}</p>
              </section>

              <section id="facilities" className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-gray-800">Campus Facilities</h3>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(data?.facilities || []).map((f,i)=> {
                    const fname = typeof f === 'string' ? f : f.name
                    const fdesc = typeof f === 'string' ? null : f.desc
                    return (
                      <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="pt-1"><FacilityIcon name={fname} theme={theme}/></div>
                        <div>
                          <div className="text-base font-medium text-gray-700">{fname}</div>
                          {fdesc && <div className="text-sm text-gray-500 mt-1">{fdesc}</div>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>

              <section id="news" className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-gray-800">News & Events</h3>
                <div className="mt-6 space-y-4">
                  {(data?.news || []).map((n,i)=> (
                    <article key={i} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-800">{n.title}</h4>
                        <time className="text-sm text-gray-500">{n.date}</time>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">{n.summary}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section id="testimonials" className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-gray-800">Student Testimonials</h3>
                <div className="mt-6 space-y-4">
                  {(data?.testimonials || []).map((t,i)=> (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">“{t.text}”</p>
                      <p className="mt-3 text-sm font-semibold text-gray-800">{t.name} <span className="text-sm font-normal text-gray-500">— {t.role}</span></p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div id="apply" className="bg-white p-6 rounded-lg shadow-lg md:col-span-1 h-fit md:sticky top-24">
              <h3 className="text-2xl font-semibold text-gray-900">Enquire Now</h3>
                <p className="text-sm text-gray-600 mt-1">Get a call back from our team</p>
                <div className="mt-4 mb-4 p-4 bg-gray-50 rounded-md border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-800">Important Dates</h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-2">
                    {(data?.importantDates || []).map((d,i)=> (
                      <li key={i}><span className="font-medium text-gray-800">{d.label}:</span> <span className="text-gray-600">{d.date}</span></li>
                    ))}
                  </ul>
                </div>
                <LeadForm univId={univId} />
            </div>
          </section>
        )}
        {!fetching && !data && <div className="text-center py-12 text-red-600">Failed to load university data.</div>}
      </main>

      <section className="max-w-5xl mx-auto p-6 mt-12">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-lg font-medium text-gray-800">Interested in another university?</p>
          <p className="text-sm text-gray-600 mt-2">You can also apply to <span className={`font-semibold ${theme.highlight}`}>{otherName}</span>.</p>
          <div className="mt-4">
            <a href={otherPath} className="inline-block px-5 py-2 rounded-md text-white font-medium shadow-sm bg-green-600 hover:bg-green-700">Visit {otherName} landing page</a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className={`inline-block px-3 py-1 rounded-md text-white font-bold ${theme.logoBg}`}>{data?.name || 'University'}</div>
              <p className="mt-4 text-sm text-gray-300">{data?.tagline}</p>
              <p className="mt-4 text-sm text-gray-400">123 University Ave, Knowledge Park<br/>City, Country</p>
            </div>

            <div>
              <h4 className="text-gray-100 font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#overview" className="text-gray-300 hover:text-white">Overview</a></li>
                <li><a href="#courses" className="text-gray-300 hover:text-white">Courses</a></li>
                <li><a href="#fees" className="text-gray-300 hover:text-white">Fees</a></li>
                <li><a href="#placements" className="text-gray-300 hover:text-white">Placements</a></li>
                <li><a href="#facilities" className="text-gray-300 hover:text-white">Facilities</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-100 font-semibold mb-3">Contact</h4>
              <p className="text-sm text-gray-300">Admissions Office</p>
              <p className="text-sm text-gray-400 mt-2">Phone: <a href="tel:+911234567890" className="text-gray-300 hover:text-white">+91 12345 67890</a></p>
              <p className="text-sm text-gray-400">Email: <a href="mailto:admissions@example.edu" className="text-gray-300 hover:text-white">admissions@example.edu</a></p>
            </div>

            <div>
              <h4 className="text-gray-100 font-semibold mb-3">Connect</h4>
              <div className="flex space-x-3 mb-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              </div>
              <p className="text-sm text-gray-300">Looking for the other university?</p>
              <a href={otherPath} className="inline-block mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm">Visit {otherName} page</a>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} {data?.name || 'University'}. All rights reserved.</p>
            <div className="mt-3 md:mt-0 flex items-center space-x-4">
              <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Terms</a>
              <a href={`/apply/${univId}`} className={`text-sm ${theme.primaryButton} text-white px-3 py-1 rounded-md`}>Apply</a>
            </div>
          </div>
        </div>
      </footer>

      <FeesModal open={open} onClose={()=>setOpen(false)} univId={univId} theme={theme} courses={data?.courses} />
    </div>
  )
}
