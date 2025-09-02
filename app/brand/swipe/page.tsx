'use client'
import { useMemo, useState } from 'react'
import { mockInfluencers } from '@/lib/mock'
import SwipeDeck from '@/components/SwipeDeck'

export default function BrandSwipe() {
  const [location, setLocation] = useState('Any')
  const [category, setCategory] = useState('Any')
  const [minFollowers, setMinFollowers] = useState(0)
  const [maxFollowers, setMaxFollowers] = useState(1000000)
  const [minEng, setMinEng] = useState(0)

  const cards = useMemo(() => {
    return mockInfluencers.filter(i => 
      (location==='Any' || i.location===location) &&
      (category==='Any' || i.niche.includes(category)) &&
      (i.followers >= minFollowers) && (i.followers <= maxFollowers) &&
      (i.engagement >= minEng)
    )
  }, [location, category, minFollowers, maxFollowers, minEng])

  const locations = ['Any', ...Array.from(new Set(mockInfluencers.map(i=>i.location)))]
  const categories = ['Any', ...Array.from(new Set(mockInfluencers.flatMap(i=>i.niche)))]

  return (
    <div className="grid2 items-start">
      <div className="card">
        <h1 className="text-xl font-semibold mb-3">Swipe Influencers</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <div><div className="label">Location</div><select className="input" value={location} onChange={e=>setLocation(e.target.value)}>{locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}</select></div>
          <div><div className="label">Category</div><select className="input" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(n => <option key={n} value={n}>{n}</option>)}</select></div>
          <div><div className="label">Followers (min)</div><input className="input" type="number" value={minFollowers} onChange={e=>setMinFollowers(Number(e.target.value))} /></div>
          <div><div className="label">Followers (max)</div><input className="input" type="number" value={maxFollowers} onChange={e=>setMaxFollowers(Number(e.target.value))} /></div>
          <div className="md:col-span-2"><div className="label">Minimum Engagement %</div><input className="input" type="number" min={0} max={20} value={minEng} onChange={e=>setMinEng(Number(e.target.value))} /></div>
          <div className="md:col-span-2 text-xs text-gray-600">Engagement rate ≈ average interactions ÷ followers × 100 (last 30 posts; mocked).</div>
        </div>
      </div>
      <SwipeDeck cards={cards} />
    </div>
  )
}
