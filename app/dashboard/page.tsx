'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import GraphInput from '@/components/GraphInput'
import { getCampaigns, getPlan } from '@/lib/mock'

export default function Dashboard() {
  const [role, setRole] = useState<'brand'|'influencer'|''>('')
  const [plan, setPlanState] = useState<'free'|'pro'|'premium'>('free')
  useEffect(() => { setRole((window.localStorage.getItem('role') as any) || ''); setPlanState(getPlan()) }, [])

  return (
    <div className="space-y-6">
      {plan==='free' && (
        <div className="card bg-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="kicker">Plan</div>
              <div className="font-semibold">You&apos;re on the Free plan</div>
              <div className="text-sm text-gray-600">Upgrade to unlock analytics and unlimited swipes.</div>
            </div>
            <Link href="/plans" className="btn btn-primary">Upgrade</Link>
          </div>
        </div>
      )}

      <div className="grid2">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
          <p className="text-gray-600 mb-4">Signed in as: <b>{role || '—'}</b></p>
          {role==='' && <p className="text-sm text-gray-600 mb-4">Select a role on the <Link href="/" className="underline">home page</Link>.</p>}
          {role==='brand' && (
            <div className="space-y-3">
              <Link href="/brand/campaigns/new" className="btn btn-primary">Create Campaign</Link>
              <div className="h-2" />
              <Link href="/brand/swipe" className="btn">Swipe Influencers</Link>
              <div className="h-2" />
              <Link href="/matches" className="btn">View Matches</Link>
              <div className="h-2" />
              <Link href="/roi" className="btn">Open ROI Dashboard</Link>
            </div>
          )}
          {role==='influencer' && (
            <div className="space-y-3">
              <Link href="/influencer/profile" className="btn">Edit Profile</Link>
              <div className="h-2" />
              <Link href="/influencer/campaigns" className="btn btn-primary">Browse Open Campaigns</Link>
              <div className="h-2" />
              <Link href="/matches" className="btn">View Matches</Link>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="text-lg font-medium mb-2">Recent Campaigns</h3>
          <div className="space-y-3">
            {getCampaigns().slice(-5).reverse().map(c => (
              <div key={c.id} className="border rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-gray-600">{c.category} · {c.visibility} · {c.paymentMethod}</div>
                  </div>
                  <div className="text-sm">{c.budgetMin}–{c.budgetMax} USD</div>
                </div>
              </div>
            ))}
            {getCampaigns().length===0 && <div className="text-sm text-gray-600">No campaigns yet.</div>}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card"><div className="kicker">This Month</div><div className="stat">12</div><div className="text-sm text-gray-600">New matches</div><div className="mt-3 h-2 rounded-full bg-gray-100"><div className="h-2 bg-black rounded-full w-2/3" /></div></div>
        <div className="card"><div className="kicker">Response Rate</div><div className="stat">86%</div><div className="text-sm text-gray-600">Avg influencer reply rate</div><div className="mt-3 h-2 rounded-full bg-gray-100"><div className="h-2 bg-black rounded-full w-5/6" /></div></div>
        <div className="card"><div className="kicker">Pipeline</div><div className="stat">8</div><div className="text-sm text-gray-600">Active convos</div><div className="mt-3 h-2 rounded-full bg-gray-100"><div className="h-2 bg-black rounded-full w-1/2" /></div></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GraphInput title={'Campaign Performance (enter numbers)'} />
        <GraphInput title={'Engagement Over Time (enter numbers)'} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="kicker">Top Performing Niches</div>
          <ul className="mt-2 text-sm space-y-2">
            <li>• Fitness creators drove +22% higher CTR vs avg</li>
            <li>• Food micro-creators (10–30k) yielded best ROI</li>
            <li>• Beauty collabs perform best on Reels vs Stories</li>
          </ul>
        </div>
        <div className="card">
          <div className="kicker">AI Spend Guidance</div>
          <div className="text-sm">Shift 15–20% budget from macro to micro influencers in Beirut & Dubai for higher engagement efficiency. Increase reel-heavy briefs.</div>
        </div>
      </div>
    </div>
  )
}
