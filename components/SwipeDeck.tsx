'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Influencer, Match, getMatches, saveMatches, getRatings } from '@/lib/mock'
import InfluencerModal from './InfluencerModal'
import { addEvent } from '@/lib/calendar'

export default function SwipeDeck({ cards }: { cards: Influencer[] }) {
  const [index, setIndex] = useState(0)
  const [show, setShow] = useState(false)
  const [direction, setDirection] = useState<'left'|'right'>('right')
  const [scheduleFor, setScheduleFor] = useState<Influencer|null>(null)
  const [when, setWhen] = useState<string>('')

  function avgRating(id:string){
    const rows = getRatings().filter(r=>r.targetType==='influencer' && r.targetId===id)
    if(rows.length===0) return 'No ratings yet'
    const avg = rows.reduce((a,b)=>a+b.stars,0)/rows.length
    return `Rating: ${avg.toFixed(1)}/5 (${rows.length})`
  }

  function likeCurrent() {
    const c = cards[index]
    if (!c) return
    const rows: Match[] = getMatches()
    rows.push({ id: 'mt_' + Math.random().toString(36).slice(2), brandId: 'br_1', influencerId: c.id, createdAt: new Date().toISOString(), paymentStatus:'PENDING' })
    saveMatches(rows)
    setDirection('right')
    setScheduleFor(c)
    requestAnimationFrame(()=> setIndex(prev=>prev+1))
  }
  function passCurrent() { setDirection('left'); requestAnimationFrame(()=> setIndex(prev=>prev+1)) }

  const current = cards[index]

  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {current ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={ direction==='right' ? { opacity:0, x:220, y:-80, rotate:12 } : { opacity:0, x:-220, y:-80, rotate:-12 } }
            className="card relative"
          >
            <button className="absolute top-3 right-3 text-sm underline" onClick={()=>setShow(true)}>View Profile</button>
            <div className="flex items-center gap-3">
              <img src={current.avatar} alt={current.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="text-lg font-semibold">{current.name}</div>
                <div className="text-sm text-gray-600">{current.location} · {current.followers.toLocaleString()} followers</div>
                <div className="text-xs text-gray-600">Engagement {current.engagement}% · Influence score {current.influenceScore}</div>
                <div className="text-xs">{avgRating(current.id)}</div>
              </div>
            </div>
            <p className="mt-3 text-gray-700">{current.bio}</p>
            <div className="mt-3 flex gap-2 flex-wrap">{current.niche.map(n => <span key={n} className="badge">{n}</span>)}</div>
            <div className="mt-4 flex gap-3">
              <button className="btn" onClick={passCurrent}>Pass</button>
              <button className="btn btn-primary" onClick={likeCurrent}>Match</button>
            </div>
          </motion.div>
        ) : (
          <div className="card text-center" key="empty">
            <div className="text-lg font-medium mb-2">No more influencers for these filters.</div>
            <div className="text-gray-600">Try adjusting filters or check back later.</div>
          </div>
        )}
      </AnimatePresence>
      <div className="matches-pill">Matches: {getMatches().length}</div>

      {show && current && <InfluencerModal card={current} onClose={()=>setShow(false)} />}

      {scheduleFor && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={()=>setScheduleFor(null)}>
          <div className="card max-w-md w-full" onClick={(e)=>e.stopPropagation()}>
            <div className="text-lg font-semibold mb-2">Schedule Campaign Touchpoint</div>
            <div className="text-sm text-gray-600">Log an event with {scheduleFor.name} so both sides can track it.</div>
            <div className="mt-3">
              <div className="label">Date & time</div>
              <input className="input" type="datetime-local" value={when} onChange={e=>setWhen(e.target.value)} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn" onClick={()=>setScheduleFor(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={()=>{ 
                if(!when){ alert('Pick a date'); return }
                addEvent({ id:'evt_'+Math.random().toString(36).slice(2), title:'Collab with '+scheduleFor.name, date: when })
                setScheduleFor(null); setWhen(''); alert('Event saved. See Calendar.')
              }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
