import React from 'react'
import Univ1 from './pages/Univ1'
import Univ2 from './pages/Univ2'
import Apply from './pages/Apply'

export default function App(){
  const path = window.location.pathname || '/'
  // simple pathname routing
  if(path.startsWith('/apply/')){
    const parts = path.split('/')
    const id = Number(parts[2] || 1)
    return <Apply univId={id} />
  }
  if(path.includes('/univ2')) return <Univ2 />
  return <Univ1 />
}
