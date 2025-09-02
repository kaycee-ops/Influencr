'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [role, setRole] = useState<'brand'|'influencer'|''>('')
  useEffect(() => { const r = window.localStorage.getItem('role') as 'brand'|'influencer'|null; if (r) setRole(r) }, [])
  function choose(r: 'brand'|'influencer') { setRole(r); window.localStorage.setItem('role', r) }

  return (
    <section className="hero">
      <div className="grid2 items-center">
        <div className="card relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
               style={{background: 'radial-gradient(circle at 30% 30%, rgba(236,72,153,.5), transparent 60%)'}}/>
          <h1 className="hero-title mb-3">The Home of Creators and Brands</h1>
          <p className="hero-sub mb-6">Connect privately. Match with intent. Build campaigns that actually convert.</p>
          <div className="grid md:grid-cols-2 gap-3 max-w-lg">
            <button className={`btn ${role==='brand'?'btn-primary':''}`} onClick={()=>choose('brand')}>I&apos;m a Brand</button>
            <button className={`btn ${role==='influencer'?'btn-primary':''}`} onClick={()=>choose('influencer')}>I&apos;m an Influencer</button>
          </div>
          <div className="mt-4"><Link href="/dashboard" className="btn btn-primary">Continue</Link></div>
          <div className="mt-6 text-sm text-gray-600">Private by default · Swipe to match · Built for millennial teams</div>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Why Influencr</h3>
          <ul className="grid gap-3 text-gray-700">
            <li>🔒 <b>Privacy-first</b> campaigns — reveal briefs only after a match.</li>
            <li>🎯 <b>Smart filters</b> for brands; structured proactivity for creators.</li>
            <li>🤖 <b>AI Analytics</b>: smart trends & suggestions to improve performance.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
