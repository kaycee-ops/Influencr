export type CalEvent = { id:string; title:string; date:string; meta?:any }
const LS = typeof window !== 'undefined' ? window.localStorage : undefined
export const getEvents = ():CalEvent[] => !LS?[]:JSON.parse(LS.getItem('events')||'[]')
export const saveEvents = (rows:CalEvent[]) => { if(LS) LS.setItem('events', JSON.stringify(rows)) }
export function addEvent(e: CalEvent){ const arr = getEvents(); arr.push(e); saveEvents(arr) }
export function icsForEvent(e: CalEvent){ 
  const dt = e.date.replace(/[-:]/g,'').replace('T','').slice(0,15) + 'Z'
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Influencr MVP//EN','BEGIN:VEVENT','UID:'+e.id,'DTSTAMP:'+dt,'DTSTART:'+dt,'SUMMARY:'+e.title,'END:VEVENT','END:VCALENDAR'].join('\r\n')
}
