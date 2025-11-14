import React, {useState} from 'react'
import LeadForm from '../components/LeadForm'

export default function Apply({univId = 1}){
  const [submitted, setSubmitted] = useState(false)

  if(submitted) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Application Submitted</h2>
        <p className="text-gray-700 mb-6">Thank you for applying. Our admissions team will contact you shortly.</p>
        <a href={univId === 2 ? '/univ2' : '/'} className="inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Back to Page</a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Final Application — {univId === 2 ? 'University Two' : 'University One'}</h1>
              <p className="text-gray-600 mt-2">Complete this quick form and submit your application to start the admissions process.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-sm text-gray-500">Step 1 of 1</span>
            </div>
          </div>

          <div className="p-6 border-t">
            <LeadForm univId={univId} onSuccess={() => setSubmitted(true)} showSubmitLabel="Submit Application" />
          </div>
        </div>
      </div>
    </div>
  )
}
