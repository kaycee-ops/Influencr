'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Campaign, getCampaigns, saveCampaigns } from '@/lib/mock'

export default function NewCampaign() {
  const router = useRouter()
  const [title, setTitle] = useState('Summer Launch Collab')
  const [category, setCategory] = useState('Fashion')
  const [budgetMin, setBudgetMin] = useState(300)
  const [budgetMax, setBudgetMax] = useState(700)
  const [deliverables, setDeliverables] = useState('2 stories, 1 reel')
  const [visibility, setVisibility] = useState<'PRIVATE'|'APPLICATIONS_OPEN'>('PRIVATE')
  const [brief, setBrief] = useState('Private campaign brief goes here. Revealed only after match/shortlist.')
  const [paymentMethod, setPaymentMethod] = useState<'CASH'|'BANK'|'ESCROW'>('CASH')
  const [codePrefix, setCodePrefix] = useState('SAVE10')

  function create() {
    const rows = getCampaigns()
    const c: Campaign = {
      id: 'cmp_' + Math.random().toString(36).slice(2), brandId: 'br_1',
      title, category, budgetMin: Number(budgetMin), budgetMax: Number(budgetMax),
      deliverables: deliverables.split(',').map(s=>s.trim()).filter(Boolean),
      visibility, brief, paymentMethod, codePrefix, createdAt: new Date().toISOString(),
    }
    rows.push(c); saveCampaigns(rows); router.push('/dashboard')
  }

  return (
    <div className="card max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">Create Campaign</h1>
      <div className="grid2">
        <div><div className="label">Title</div><input className="input" value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div><div className="label">Category</div><input className="input" value={category} onChange={e=>setCategory(e.target.value)} /></div>
        <div><div className="label">Budget Min (USD)</div><input className="input" type="number" value={budgetMin} onChange={e=>setBudgetMin(Number(e.target.value))} /></div>
        <div><div className="label">Budget Max (USD)</div><input className="input" type="number" value={budgetMax} onChange={e=>setBudgetMax(Number(e.target.value))} /></div>
        <div className="md:col-span-2"><div className="label">Deliverables</div><input className="input" value={deliverables} onChange={e=>setDeliverables(e.target.value)} placeholder="e.g., 2 stories, 1 reel" /></div>
        <div className="md:col-span-2">
          <div className="label">Visibility</div>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2"><input type="radio" name="vis" checked={visibility==='PRIVATE'} onChange={()=>setVisibility('PRIVATE')} /><span>Private (default)</span></label>
            <label className="inline-flex items-center gap-2"><input type="radio" name="vis" checked={visibility==='APPLICATIONS_OPEN'} onChange={()=>setVisibility('APPLICATIONS_OPEN')} /><span>Applications Open (brief hidden until shortlisted)</span></label>
          </div>
        </div>
        <div className="md:col-span-2"><div className="label">Brief (kept private)</div><textarea className="input h-32" value={brief} onChange={e=>setBrief(e.target.value)} /></div>
        <div><div className="label">Payment Method</div><select className="input" value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value as any)}><option value='CASH'>Cash (Lebanon)</option><option value='BANK'>Bank Transfer</option><option value='ESCROW'>Escrow (GCC recommended)</option></select></div>
        <div><div className="label">Discount Code Prefix (optional)</div><input className="input" value={codePrefix} onChange={e=>setCodePrefix(e.target.value)} placeholder="e.g., SAVE10" /></div>
      </div>
      <div className="mt-4 flex gap-2"><button className="btn btn-primary" onClick={create}>Create</button></div>
    </div>
  )
}
