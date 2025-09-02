'use client'
import { getEvents, icsForEvent } from '@/lib/calendar'

export default function CalendarPage(){
  const rows = getEvents().sort((a,b)=> a.date.localeCompare(b.date))
  function downloadICS(idx:number){
    const e = rows[idx]; const blob = new Blob([icsForEvent(e)], {type:'text/calendar'})
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `event-${e.id}.ics`; a.click()
  }
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Calendar</h1>
      <div className="card">
        <div className="kicker">Upcoming</div>
        {rows.length===0 && <div className="text-sm text-gray-600 mt-1">No events yet.</div>}
        <div className="mt-2 space-y-2">
          {rows.map((e, idx) => (
            <div key={e.id} className="flex items-center justify-between border rounded-xl p-3">
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-gray-600">{new Date(e.date).toLocaleString()}</div>
              </div>
              <button className="btn" onClick={()=>downloadICS(idx)}>Add to Calendar (.ics)</button>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-600">Download .ics then open with Google Calendar/Apple Calendar/Outlook to add the event.</p>
    </div>
  )
}
