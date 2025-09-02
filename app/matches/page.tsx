'use client'
import { useEffect, useState } from 'react'
import { Match, getMatches, saveMatches, mockInfluencers, getRatings, saveRatings, getCampaigns, getConversions, saveConversions } from '@/lib/mock'
import Link from 'next/link'

export default function Matches() {
  const [rows, setRows] = useState<Match[]>([])
  const [note, setNote] = useState('')
  const [stars, setStars] = useState(5)
  const [amount, setAmount] = useState(49)

  useEffect(() => { setRows(getMatches().slice().reverse()) }, [])

  const nameOf = (id:string) => mockInfluencers.find(i=>i.id===id)?.name || id
  const avatarOf = (id:string) => mockInfluencers.find(i=>i.id===id)?.avatar || ''

  function codeFor(m:Match){
    if(m.discountCode) return m.discountCode
    const lastCmp = getCampaigns().slice(-1)[0]
    const prefix = lastCmp?.codePrefix || 'SAVE10'
    const person = nameOf(m.influencerId).split(' ')[0].toUpperCase()
    return `${prefix}-${person}`
  }
  function setCode(m:Match){
    const next = rows.map(r => r.id===m.id ? {...r, discountCode: codeFor(m)} : r)
    saveMatches(next); setRows(next)
  }
  ffunction fundEscrow(m: Match) {
  const next: Match[] = rows.map(r =>
    r.id === m.id ? ({ ...r, paymentStatus: 'ESCROW_FUNDED' } as Match) : r
  )
  saveMatches(next)
  setRows(next)
}

function markPaid(m: Match) {
  const next: Match[] = rows.map(r =>
    r.id === m.id ? ({ ...r, paymentStatus: 'PAID' } as Match) : r
  )
  saveMatches(next)
  setRows(next)
}

function markCompleted(m: Match) {
  const next: Match[] = rows.map(r =>
    r.id === m.id ? ({ ...r, paymentStatus: 'COMPLETED' } as Match) : r
  )
  saveMatches(next)
  setRows(next)
}

  }
  function rateInf(m:Match){
    const rs = getRatings()
    rs.push({ id:'rt_'+Math.random().toString(36).slice(2), targetType:'influencer', targetId:m.influencerId, stars, note, ts:new Date().toISOString() })
    saveRatings(rs); setNote(''); setStars(5); alert('Rating saved')
  }
  function recordConversion(m:Match){
    if(!m.discountCode){ alert('Generate code first.'); return }
    const list = getConversions()
    list.push({ id:'cv_'+Math.random().toString(36).slice(2), code: m.discountCode, amount: Number(amount)||0, ts:new Date().toISOString() })
    saveConversions(list); alert('Conversion recorded')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Matches</h1>
      {rows.length===0 && <div className="card">No matches yet.</div>}
      <div className="grid md:grid-cols-2 gap-6">
        {rows.map(m => (
          <div key={m.id} className="card space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={avatarOf(m.influencerId)} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <div className="font-medium">{nameOf(m.influencerId)}</div>
                  <div className="text-xs text-gray-600">Matched {new Date(m.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <Link href={`/messages/${m.id}`} className="btn btn-primary">Message</Link>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="btn" onClick={()=>setCode(m)}>{m.discountCode? 'Code: '+m.discountCode : 'Generate Code'}</button>
              <button className="btn" onClick={()=>fundEscrow(m)}>{m.paymentStatus==='ESCROW_FUNDED' ? 'Escrow: Funded ✓' : 'Fund Escrow'}</button>
              <button className="btn" onClick={()=>markPaid(m)}>{m.paymentStatus==='PAID'?'Paid ✓':'Mark Paid'}</button>
              <button className="btn" onClick={()=>markCompleted(m)}>{m.paymentStatus==='COMPLETED'?'Completed ✓':'Mark Completed'}</button>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="card bg-gray-50">
                <div className="kicker">Rate Influencer</div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="number" min={1} max={5} className="input w-20" value={stars} onChange={e=>setStars(Number(e.target.value))} />
                  <input className="input" placeholder="Short note" value={note} onChange={e=>setNote(e.target.value)} />
                </div>
                <button className="btn mt-2" onClick={()=>rateInf(m)}>Save Rating</button>
              </div>
              <div className="card bg-gray-50">
                <div className="kicker">Record Conversion</div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="number" className="input w-32" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
                  <button className="btn" onClick={()=>recordConversion(m)}>Record</button>
                </div>
                <div className="text-xs text-gray-600 mt-1">Tie sales to discount codes for ROI.</div>
              </div>
              <div className="card bg-gray-50">
                <div className="kicker">Payment Status</div>
                <div className="mt-1 text-sm">{m.paymentStatus||'PENDING'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
