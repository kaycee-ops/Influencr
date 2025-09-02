'use client'
import { useMemo, useState } from 'react'
export default function GraphInput({title}:{title:string}){
  const [raw, setRaw] = useState('12, 15, 14, 18, 22, 20')
  const nums = useMemo(()=> raw.split(/[,\s]+/).map(n=>Number(n)).filter(n=>!isNaN(n)), [raw])
  const max = Math.max(1, ...nums)
  const points = nums.map((n,i)=>`${i*(240/Math.max(1,nums.length-1))},${80-(n/max)*80}`).join(' ')
  const trend = nums.length>1 && (nums[nums.length-1]-nums[0])
  const insight = () => nums.length<3 ? 'Add more points for insights.' : `Avg ${Math.round(nums.reduce((a,b)=>a+b,0)/nums.length)}. Trend appears ${trend>0?'upward':trend<0?'downward':'flat'}. Consider adjusting budget based on last 2 points.`
  return (
    <div className="card">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="text-sm text-gray-600 mb-2">Paste comma-separated numbers to visualize.</div>
      <textarea className="input h-20" value={raw} onChange={e=>setRaw(e.target.value)} />
      <div className="mt-3 border rounded-xl p-3 bg-white">
        <svg viewBox="0 0 240 80" className="w-full h-24">
          <polyline fill="none" stroke="black" strokeWidth="2" points={points} />
        </svg>
      </div>
      <div className="mt-2 text-sm">Prototype insight: {insight()}</div>
    </div>
  )
}
