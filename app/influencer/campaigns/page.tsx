'use client'
import { useEffect, useMemo, useState } from 'react'
import { Application, Campaign, getApplications, getCampaigns, saveApplications } from '@/lib/mock'

export default function OpenCampaigns() {
  const [rows, setRows] = useState<Campaign[]>([])
  const [myApps, setMyApps] = useState<Application[]>([])
  useEffect(() => { setRows(getCampaigns().filter(c => c.visibility==='APPLICATIONS_OPEN')); setMyApps(getApplications()) }, [])

  function apply(c: Campaign) {
    const apps = getApplications()
    const exists = apps.find(a => a.campaignId===c.id)
    if (exists) return alert('You already applied.')
    apps.push({ id:'app_' + Math.random().toString(36).slice(2), campaignId:c.id, influencerId:'me', pitch:'I am a strong fit for your brand and audience.', status:'PENDING', createdAt:new Date().toISOString() })
    saveApplications(apps); setMyApps(apps); alert('Applied! Brand will see your pitch without revealing the full brief yet.')
  }
  const appliedIds = useMemo(() => new Set(myApps.map(a => a.campaignId)), [myApps])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Open Campaigns (Applications Allowed)</h1>
      {rows.length===0 && <div className="card">No open campaigns yet.</div>}
      {rows.map(c => (
        <div key={c.id} className="card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-medium">{c.title}</div>
              <div className="text-xs text-gray-600">{c.category} · Applications Open</div>
              <div className="text-sm mt-1">{c.deliverables.join(' · ')}</div>
            </div>
            <div className="text-sm">{c.budgetMin}–{c.budgetMax} USD</div>
          </div>
          <div className="mt-2 text-xs text-gray-600">Brief remains private until the brand shortlists you.</div>
          <div className="mt-3"><button className={`btn ${appliedIds.has(c.id)?'opacity-50 pointer-events-none':''}`} onClick={()=>apply(c)}>{appliedIds.has(c.id) ? 'Applied' : 'Apply'}</button></div>
        </div>
      ))}
    </div>
  )
}
