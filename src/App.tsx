import { Routes, Route, useLocation } from 'react-router'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Impact from './pages/Impact'
import Partners from './pages/Partners'
import GetInvolved from './pages/GetInvolved'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Analytics />
    </Layout>
  )
}
