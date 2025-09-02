import './globals.css'
import Link from 'next/link'

export const metadata = { title: 'Influencr (MVP v6)', description: 'Swipe-based influencer–brand marketplace prototype' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b sticky top-0 bg-white/70 backdrop-blur z-10">
          <div className="container py-4 flex items-center gap-3 justify-between">
            <Link href="/" className="font-extrabold text-lg tracking-tight">
              <span className="pr-2">Influencr</span>
              <span className="text-xs px-2 py-1 rounded-full bg-black text-white">MVP</span>
            </Link>
            <nav className="ml-auto flex items-center gap-2 text-sm justify-end">
              <Link href="/dashboard" className="btn btn-ghost">Dashboard</Link>
              <Link href="/brand/swipe" className="btn btn-ghost">Brand Swipe</Link>
              <Link href="/influencer/campaigns" className="btn btn-ghost">Open Campaigns</Link>
              <Link href="/matches" className="btn btn-ghost">Matches</Link>
              <Link href="/calendar" className="btn btn-ghost">Calendar</Link>
              <Link href="/roi" className="btn btn-ghost">ROI</Link>
              <Link href="/plans" className="btn">Plans</Link>
              <Link href="/auth" className="btn btn-primary">Login / Signup</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="container py-12 text-center text-sm text-gray-500">
          Prototype — mock data, no backend. Designed for quick iteration.
        </footer>
      </body>
    </html>
  )
}
