'use client'
import { Influencer, getRatings } from '@/lib/mock'
import { Stars } from './Stars'
export default function InfluencerModal({card, onClose}:{card:Influencer,onClose:()=>void}){
  function avgRating(id:string){
    const rows = getRatings().filter(r=>r.targetType==='influencer' && r.targetId===id)
    if(rows.length===0) return 'No ratings yet'
    const avg = rows.reduce((a,b)=>a+b.stars,0)/rows.length
    return <>Rating: <b><Stars value={avg} /></b> <span className='text-gray-500'>({rows.length})</span></>
  }
  if(typeof window!=='undefined'){
    try{ const prof = JSON.parse(localStorage.getItem('myProfile')||'{}'); const el = document.getElementById('verified-badge'); if(prof?.verified && el) el.classList.remove('hidden') }catch{}
  }
  if(!card) return null
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="card max-w-lg w-full" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <img src={card.avatar} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <div className="text-lg font-semibold flex items-center gap-2">{card.name} <span id="verified-badge" className="text-xs px-2 py-0.5 rounded-full bg-black text-white hidden">Verified</span></div>
            <div className="text-sm text-gray-600">{card.location} · {card.followers.toLocaleString()} followers</div>
            <div className="text-xs text-gray-600">Engagement {card.engagement}% · Influence score {card.influenceScore}</div>
            <div className="text-xs mt-1">{avgRating(card.id)}</div>
          </div>
        </div>
        <p className="mt-3">{card.bio}</p>
        <div className="mt-3 flex gap-2 flex-wrap">{card.niche.map(n => <span key={n} className="badge">{n}</span>)}</div>
        <div className="mt-4 text-right"><button className="btn" onClick={onClose}>Close</button></div>
      </div>
    </div>
  )
}
