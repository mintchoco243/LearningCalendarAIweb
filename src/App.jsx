import { useMemo, useState } from 'react'
import { activities } from './data/activities'
import { ActivityCard } from './components/ActivityCard'
import { ActivityDetail } from './components/ActivityDetail'
import { CalendarMonth } from './components/CalendarMonth'

const calendarYear = 2026
const defaultSelectedDate = '2026-10-08'

const formatDate = (value, options = { day: 'numeric', month: 'short' }) =>
  new Intl.DateTimeFormat('en', options).format(new Date(`${value}T00:00:00`))

function App() {
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [registeredIds, setRegisteredIds] = useState(['storytelling-with-data'])
  const [view, setView] = useState('calendar')

  const selectedActivities = useMemo(
    () => activities.filter((activity) => activity.date === selectedDate),
    [selectedDate],
  )
  const upcomingActivities = activities.filter((activity) => activity.date >= defaultSelectedDate).slice(0, 3)
  const registrations = activities.filter((activity) => registeredIds.includes(activity.id))

  const toggleRegistration = (id) => {
    setRegisteredIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="flex items-center gap-3" href="#top" aria-label="Garena Learning Calendar home">
            <span className="grid size-9 place-items-center rounded-xl bg-[#ee3d2b] text-lg font-black text-white">G</span>
            <span className="text-sm font-black uppercase tracking-[0.18em] text-slate-950">Learning</span>
          </a>
          <nav className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-sm font-bold">
            <button className={`rounded-lg px-3 py-2 ${view === 'calendar' ? 'bg-white text-[#d93425] shadow-sm' : 'text-slate-500'}`} onClick={() => setView('calendar')} type="button">Calendar</button>
            <button className={`rounded-lg px-3 py-2 ${view === 'registrations' ? 'bg-white text-[#d93425] shadow-sm' : 'text-slate-500'}`} onClick={() => setView('registrations')} type="button">My learning <span className="ml-1 rounded-full bg-red-100 px-1.5 py-0.5 text-xs text-[#d93425]">{registrations.length}</span></button>
          </nav>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_85%_20%,#ee3d2b,transparent_28%),radial-gradient(circle_at_70%_85%,#7a2318,transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-300">Garena Learning & Development</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">Make time for the work that makes you better.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Explore practical learning experiences, connect with inspiring trainers, and build your next skill with your Garena colleagues.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#ee3d2b] px-5 py-3 text-sm font-bold text-white hover:bg-[#d93425]" onClick={() => setView('calendar')} type="button">Explore the calendar</button>
            <a className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white hover:bg-white/10" href="#upcoming">See what’s next</a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="grid gap-4 md:grid-cols-3" aria-label="Learning overview">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm font-medium text-slate-500">Learning activities</p><p className="mt-2 text-3xl font-black">{activities.length}</p><p className="mt-1 text-sm text-slate-500">across Oct 2026–May 2027</p></div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm font-medium text-slate-500">Coming up next</p><p className="mt-2 text-xl font-black">{formatDate(upcomingActivities[0].date)}</p><p className="mt-1 text-sm text-slate-500">{upcomingActivities[0].title}</p></div>
          <div className="rounded-2xl bg-[#ee3d2b] p-5 text-white shadow-sm"><p className="text-sm font-medium text-red-100">My learning plan</p><p className="mt-2 text-3xl font-black">{registrations.length}</p><p className="mt-1 text-sm text-red-100">sessions on your calendar</p></div>
        </section>

        {view === 'calendar' ? (
          <>
            <section id="upcoming" className="mt-14">
              <div className="flex items-end justify-between gap-5"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d93425]">Your next opportunities</p><h2 className="mt-2 text-3xl font-black tracking-tight">Coming up</h2></div><button className="text-sm font-bold text-[#d93425]" onClick={() => setSelectedDate(upcomingActivities[0].date)} type="button">Jump to calendar →</button></div>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {upcomingActivities.map((activity) => <ActivityCard activity={activity} key={activity.id} registered={registeredIds.includes(activity.id)} onOpen={setSelectedActivity} />)}
              </div>
            </section>

            <section className="mt-16" aria-labelledby="calendar-heading">
              <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d93425]">Plan your year</p><h2 id="calendar-heading" className="mt-2 text-3xl font-black tracking-tight">Learning calendar · {calendarYear}</h2></div><p className="text-sm text-slate-500"><span className="mr-2 inline-block size-2 rounded-full bg-[#ee3d2b]" />Activity available</p></div>
              <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 12 }, (_, month) => <CalendarMonth key={month} month={month} year={calendarYear} activities={activities} onSelectDate={setSelectedDate} selectedDate={selectedDate} />)}
              </div>
            </section>

            <section className="mt-12 rounded-3xl bg-slate-900 p-6 text-white sm:p-8" aria-live="polite">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-300">Selected date</p>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4"><h2 className="text-2xl font-black">{formatDate(selectedDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h2><button className="text-sm font-bold text-red-300 hover:text-white" onClick={() => setSelectedDate(defaultSelectedDate)} type="button">Back to today</button></div>
              {selectedActivities.length ? <div className="mt-6 grid gap-4 md:grid-cols-2">{selectedActivities.map((activity) => <ActivityCard activity={activity} key={activity.id} registered={registeredIds.includes(activity.id)} onOpen={setSelectedActivity} />)}</div> : <p className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">No session is scheduled for this day. Pick a highlighted date to explore an activity.</p>}
            </section>
          </>
        ) : (
          <section className="mt-14"><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d93425]">Personal learning plan</p><h2 className="mt-2 text-3xl font-black tracking-tight">My registrations</h2><p className="mt-3 max-w-xl leading-7 text-slate-600">Keep track of the sessions you have reserved. Registration is stored for this browser session only.</p>{registrations.length ? <div className="mt-7 grid gap-4 lg:grid-cols-2">{registrations.map((activity) => <ActivityCard activity={activity} key={activity.id} registered onOpen={setSelectedActivity} />)}</div> : <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">Your learning plan is open. Browse the calendar to reserve a session.</div>}</section>
        )}
      </div>
      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-5 py-7 text-sm text-slate-500 sm:px-8">Garena Learning & Development · Prototype experience</div></footer>
      <ActivityDetail activity={selectedActivity} registered={selectedActivity ? registeredIds.includes(selectedActivity.id) : false} onClose={() => setSelectedActivity(null)} onToggleRegistration={toggleRegistration} />
    </main>
  )
}

export default App
