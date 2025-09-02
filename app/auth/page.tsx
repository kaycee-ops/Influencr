'use client'
import { useState } from 'react'
export default function Auth(){
  const [mode, setMode] = useState<'login'|'signup'>('signup')
  return (
    <div className="max-w-md mx-auto card">
      <div className="flex gap-2 mb-4">
        <button className={`btn ${mode==='signup'?'btn-primary':''}`} onClick={()=>setMode('signup')}>Sign up</button>
        <button className={`btn ${mode==='login'?'btn-primary':''}`} onClick={()=>setMode('login')}>Log in</button>
      </div>
      <div className="grid gap-3">
        {mode==='signup' && <input className="input" placeholder="Name" />}
        <input className="input" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
      </div>
      <button className="btn btn-primary mt-4">{mode==='signup'?'Create account':'Log in'}</button>
      <p className="text-xs text-gray-600 mt-3">Prototype only — no backend yet.</p>
    </div>
  )
}
