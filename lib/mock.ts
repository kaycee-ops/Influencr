export type Role = 'brand' | 'influencer'
export type Plan = 'free' | 'pro' | 'premium'
export type PaymentMethod = 'CASH' | 'BANK' | 'ESCROW'

export type Influencer = {
  id: string; name: string; niche: string[]; location: string; followers: number;
  engagement: number; avatar: string; bio: string; rateStory?: number; ratePost?: number;
  gender: 'Male'|'Female'; age: number; audienceFemalePct?: number; topCities?: string[];
  influenceScore?: number;
}
export type Brand = { id: string; name: string; industry: string; location: string; vibe: string[]; logo: string; blurb: string }
export type CampaignVisibility = 'PRIVATE' | 'APPLICATIONS_OPEN'
export type Campaign = { id:string; brandId:string; title:string; category:string; budgetMin:number; budgetMax:number; deliverables:string[]; visibility:CampaignVisibility; brief:string; paymentMethod:PaymentMethod; codePrefix?:string; createdAt:string }
export type Application = { id:string; campaignId:string; influencerId:string; pitch:string; status:'PENDING'|'SHORTLISTED'|'DECLINED'|'ACCEPTED'; createdAt:string }
export type Match = { id:string; brandId:string; influencerId:string; campaignId?:string; createdAt:string; paymentStatus?:'PENDING'|'ESCROW_FUNDED'|'PAID'|'COMPLETED'; receiptDataUrl?:string; discountCode?:string }

export type Rating = { id:string; targetType:'influencer'|'brand'; targetId:string; stars:number; note?:string; ts:string }
export type Conversion = { id:string; code:string; amount:number; ts:string }

export const mockInfluencers: Influencer[] = [
  { id:'inf_1', name:'Maya Haddad', niche:['Fashion','Beauty'], location:'Beirut', followers:82000, engagement:4.1, avatar:'https://i.pravatar.cc/150?img=47', bio:'Beirut-based fashion + beauty creator. Love minimal looks & local brands.', rateStory:120, ratePost:300, gender:'Female', age:26, audienceFemalePct:78, topCities:['Beirut','Jounieh','Byblos'], influenceScore:86 },
  { id:'inf_2', name:'Omar Khalil', niche:['Food','Travel'], location:'Dubai', followers:156000, engagement:2.7, avatar:'https://i.pravatar.cc/150?img=12', bio:'Street food hunter. Hotels, hidden spots, and budget-friendly gems.', rateStory:150, ratePost:450, gender:'Male', age:30, audienceFemalePct:41, topCities:['Dubai','Sharjah','Abu Dhabi'], influenceScore:79 },
  { id:'inf_3', name:'Layla Salem', niche:['Fitness','Wellness'], location:'Abu Dhabi', followers:54000, engagement:5.2, avatar:'https://i.pravatar.cc/150?img=32', bio:'Movement, mindset, & sustainable wellness routines.', rateStory:90, ratePost:220, gender:'Female', age:24, audienceFemalePct:62, topCities:['Abu Dhabi','Dubai'], influenceScore:83 },
  { id:'inf_4', name:'Rami Nassar', niche:['Tech','Gadgets'], location:'Beirut', followers:23000, engagement:6.3, avatar:'https://i.pravatar.cc/150?img=7', bio:'Gadget reviews and smart home setups.', rateStory:60, ratePost:150, gender:'Male', age:28, audienceFemalePct:18, topCities:['Beirut'], influenceScore:72 },
]

export const mockBrands: Brand[] = [
  { id:'br_1', name:'Cedars Coffee Co.', industry:'Food & Beverage', location:'Beirut', vibe:['cozy','local','artisan'], logo:'https://dummyimage.com/80x80/000/fff&text=C', blurb:'Small-batch Lebanese coffee roaster.' },
  { id:'br_2', name:'Sands Active', industry:'Athleisure', location:'Dubai', vibe:['energetic','clean','modern'], logo:'https://dummyimage.com/80x80/000/fff&text=S', blurb:'Performance wear for hot climates.' },
]

const LS = typeof window !== 'undefined' ? window.localStorage : undefined
export const getCampaigns = ():Campaign[] => !LS?[]:JSON.parse(LS.getItem('campaigns')||'[]')
export const saveCampaigns = (rows:Campaign[]) => { if(LS) LS.setItem('campaigns', JSON.stringify(rows)) }
export const getMatches = ():Match[] => !LS?[]:JSON.parse(LS.getItem('matches')||'[]')
export const saveMatches = (rows:Match[]) => { if(LS) LS.setItem('matches', JSON.stringify(rows)) }
export const getApplications = ():Application[] => !LS?[]:JSON.parse(LS.getItem('applications')||'[]')
export const saveApplications = (rows: Application[]) => {
  if (LS) LS.setItem('applications', JSON.stringify(rows))
}

export const getRatings = ():Rating[] => !LS?[]:JSON.parse(LS.getItem('ratings')||'[]')
export const saveRatings = (rows:Rating[]) => { if(LS) LS.setItem('ratings', JSON.stringify(rows)) }
export const getPlan = ():Plan => !LS?'free':(LS.getItem('plan') as Plan)||'free'
export const setPlan = (p:Plan) => { if(LS) LS.setItem('plan', p) }
export const getConversions = ():Conversion[] => !LS?[]:JSON.parse(LS.getItem('conversions')||'[]')
export const saveConversions = (rows:Conversion[]) => { if(LS) LS.setItem('conversions', JSON.stringify(rows)) }
