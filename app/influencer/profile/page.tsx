'use client'
import { useEffect, useRef, useState } from 'react'
import GraphInput from '@/components/GraphInput'

export default function InfluencerProfile() {
  const [name, setName] = useState('Your Name')
  const [location, setLocation] = useState('Beirut')
  const [niche, setNiche] = useState('Fashion, Beauty')
  const [followers, setFollowers] = useState(12000)
  const [bio, setBio] = useState('Short bio about your content and audience.')
  const [rateStory, setRateStory] = useState(80)
  const [ratePost, setRatePost] = useState(200)
  const [avatar, setAvatar] = useState<string>('https://i.pravatar.cc/150?img=5')
  const [verified, setVerified] = useState<boolean>(false)

  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const raw = localStorage.getItem('myProfile')
    if (raw) { const p = JSON.parse(raw); setName(p.name||name); setLocation(p.location||location); setNiche(p.niche||niche); setFollowers(p.followers||followers); setBio(p.bio||bio); setRateStory(p.rateStory||rateStory); setRatePost(p.ratePost||ratePost); if(p.avatar) setAvatar(p.avatar); if(typeof p.verified==='boolean') setVerified(p.verified) }
  }, [])

  function save() {
    localStorage.setItem('myProfile', JSON.stringify({ name, location, niche, followers, bio, rateStory, ratePost, avatar, verified }))
    alert('Saved')
  }
  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if(!f) return; const reader = new FileReader(); reader.onload = () => setAvatar(reader.result as string); reader.readAsDataURL(f)
  }

  return (
    <div className="space-y-6">
      <div className="card max-w-2xl">
        <div className="flex items-center gap-4 mb-4">
          <img src={avatar} className="w-16 h-16 rounded-full object-cover" />
          <div className="space-x-2">
            <button className="btn" onClick={()=>fileRef.current?.click()}>Change Photo</button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick}/>
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-4">Your Professional Profile</h1>
        <div className="grid2">
          <div><div className="label">Name</div><input className="input" value={name} onChange={e=>setName(e.target.value)} /></div>
          <div><div className="label">Location</div><input className="input" value={location} onChange={e=>setLocation(e.target.value)} /></div>
          <div className="md:col-span-2"><div className="label">Niche (comma-separated)</div><input className="input" value={niche} onChange={e=>setNiche(e.target.value)} /></div>
          <div><div className="label">Followers (overall)</div><input className="input" type="number" value={followers} onChange={e=>setFollowers(Number(e.target.value))} /></div>
          <div><div className="label">Bio</div><input className="input" value={bio} onChange={e=>setBio(e.target.value)} /></div>
          <div><div className="label">Rate (Story, USD)</div><input className="input" type="number" value={rateStory} onChange={e=>setRateStory(Number(e.target.value))} /></div>
          <div><div className="label">Rate (Post, USD)</div><input className="input" type="number" value={ratePost} onChange={e=>setRatePost(Number(e.target.value))} /></div>
        </div>
        <div className="mt-3 flex items-center gap-2"><input id='ver' type='checkbox' checked={verified} onChange={e=>setVerified(e.target.checked)} /><label htmlFor='ver' className='text-sm'>Show <b>Verified</b> badge (prototype toggle)</label></div>
        <div className="mt-4"><button className="btn btn-primary" onClick={save}>Save</button></div>
        <p className="mt-4 text-sm text-gray-600">Your profile image and info are visible only to verified brands in this prototype.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card"><div className="kicker">Profile Views</div><div className="stat">218</div><div className="mt-3 h-2 rounded-full bg-gray-100"><div className="h-2 bg-black rounded-full w-2/3" /></div></div>
        <div className="card"><div className="kicker">Engagement</div><div className="stat">4.2%</div><div className="mt-3 h-2 rounded-full bg-gray-100"><div className="h-2 bg-black rounded-full w-2/5" /></div></div>
        <div className="card"><div className="kicker">Content Quality</div><div className="stat">B+</div><div className="mt-3 h-2 rounded-full bg-gray-100"><div className="h-2 bg-black rounded-full w-3/5" /></div></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GraphInput title={'Content Performance (enter numbers)'} />
        <GraphInput title={'Reach by Week (enter numbers)'} />
      </div>
    </div>
  )
}
