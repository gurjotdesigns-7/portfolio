import { useState, useEffect } from 'react'
import Home from './pages/Home'
import CaseStudyKYC from './pages/CaseStudyKYC'
import CaseStudyCineflow from './pages/CaseStudyCineflow'
import CaseStudyReferral from './pages/CaseStudyReferral'
import Photography from './pages/Photography'
import Nav from './components/Nav'
import './App.css'

export default function App() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const navigate = (p) => setPage(p)

  return (
    <div className="app">
      <Nav page={page} navigate={navigate} />
      {page === 'home'        && <Home navigate={navigate} />}
      {page === 'kyc'         && <CaseStudyKYC navigate={navigate} />}
      {page === 'cineflow'    && <CaseStudyCineflow navigate={navigate} />}
      {page === 'referral'    && <CaseStudyReferral navigate={navigate} />}
      {page === 'photography' && <Photography navigate={navigate} />}
    </div>
  )
}
