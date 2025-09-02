'use client'
import { getConversions } from '@/lib/mock'

export default function ROIPage(){
  const rows = getConversions().slice().reverse()
  const total = rows.reduce((a,b)=>a+b.amount,0)
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">ROI Dashboard</h1>
      <div className="card">
        <div className="kicker">Conversions</div>
        {rows.length===0 && <div className="text-sm text-gray-600 mt-1">No conversions recorded yet. Generate a discount code from a match, then record conversions.</div>}
        <div className="mt-2 space-y-2">
          {rows.map((e) => (
            <div key={e.id} className="flex items-center justify-between border rounded-xl p-3">
              <div>
                <div className="font-medium">Code {e.code}</div>
                <div className="text-xs text-gray-600">{new Date(e.ts).toLocaleString()}</div>
              </div>
              <div className="text-sm">${e.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-sm font-medium">Total revenue attributed: ${total.toFixed(2)}</div>
      </div>
      <p className="text-xs text-gray-600">Prototype conversions are logged manually from the Matches page to simulate affiliate tracking.</p>
    </div>
  )
}
