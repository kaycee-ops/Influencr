'use client'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
type Msg = { sender: 'brand'|'influencer', text: string, ts: string }
export default function ChatPage() {
  const { matchId } = useParams<{ matchId: string }>() as { matchId: string }
  const [msgs, setMsgs] = useState<Msg[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { const raw = localStorage.getItem('chat_'+matchId); setMsgs(raw ? JSON.parse(raw) : []) }, [matchId])
  function send(){ const text = inputRef.current?.value?.trim(); if(!text) return; const role = (localStorage.getItem('role') as 'brand'|'influencer') || 'brand'; const next=[...msgs,{sender:role,text,ts:new Date().toISOString()}]; setMsgs(next); localStorage.setItem('chat_'+matchId, JSON.stringify(next)); if(inputRef.current) inputRef.current.value='' }
  return (
    <div className="max-w-xl mx-auto card">
      <h1 className="text-lg font-semibold mb-3">Chat</h1>
      <div className="space-y-2 max-h-80 overflow-auto border rounded-xl p-3">
        {msgs.map((m, idx) => (<div key={idx} className={`flex ${m.sender==='brand'?'justify-end':'justify-start'}`}><div className={`px-3 py-2 rounded-xl text-sm ${m.sender==='brand'?'bg-black text-white':'bg-gray-100'}`}>{m.text}</div></div>))}
        {msgs.length===0 && <div className="text-sm text-gray-600">No messages yet. Say hello 👋</div>}
      </div>
      <div className="mt-3 flex gap-2"><input ref={inputRef} className="input" placeholder="Type a message..." onKeyDown={(e)=>{ if(e.key==='Enter') send()}} /><button className="btn btn-primary" onClick={send}>Send</button></div>
      <p className="text-xs text-gray-600 mt-3">Prototype chat stored locally; no server.</p>
    </div>
  )
}
