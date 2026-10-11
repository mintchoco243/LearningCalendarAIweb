import { useMemo, useState } from 'react'
import { activities } from './data/activities'
import { ActivityCard } from './components/ActivityCard'
import { ActivityDetail } from './components/ActivityDetail'
import { Button } from './components/Button'
import { CalendarMonth } from './components/CalendarMonth'
import { Heading } from './components/Heading'
import { Hero } from './components/Hero'
import { SectionHeader } from './components/SectionHeader'
import { Text } from './components/Text'
import './app.css'

const calendarYear = 2026
const defaultSelectedDate = '2026-10-08'
const formatDate = (value, options = { day: 'numeric', month: 'short' }) => new Intl.DateTimeFormat('en', options).format(new Date(`${value}T00:00:00`))

export default function CalendarApp() {
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [registeredIds, setRegisteredIds] = useState(['storytelling-with-data'])
  const [view, setView] = useState('calendar')
  const selectedActivities = useMemo(() => activities.filter((activity) => activity.date === selectedDate), [selectedDate])
  const upcomingActivities = activities.filter((activity) => activity.date >= defaultSelectedDate).slice(0, 3)
  const registrations = activities.filter((activity) => registeredIds.includes(activity.id))
  const toggleRegistration = (id) => setRegisteredIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const showCalendar = () => { setView('calendar'); window.setTimeout(() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }

  return <main className="ld-app">
    <header className="ld-app-header"><div className="ld-shell ld-app-header__inner"><a className="ld-wordmark" href="#top"><span>G</span> Learning</a><nav className="ld-nav" aria-label="Learning views"><button className={view === 'calendar' ? 'ld-nav__item ld-nav__item--active' : 'ld-nav__item'} onClick={() => setView('calendar')} type="button">Calendar</button><button className={view === 'registrations' ? 'ld-nav__item ld-nav__item--active' : 'ld-nav__item'} onClick={() => setView('registrations')} type="button">My learning <span>{registrations.length}</span></button></nav></div></header>
    <div className="ld-shell ld-app__main">
      <Hero id="top" actionLabel="Explore calendar" description="See upcoming training activities, compare schedules, and choose learning that supports your next goal." heading="Make time for your next skill" onAction={showCalendar} periodLabel="October 2026 – May 2027" />
      <section className="ld-overview" aria-label="Learning overview"><div><Text as="p" variant="label">Learning activities</Text><strong>{activities.length}</strong><Text as="p" variant="muted">across the current programme</Text></div><div><Text as="p" variant="label">Coming up next</Text><strong>{formatDate(upcomingActivities[0].date)}</strong><Text as="p" variant="muted">{upcomingActivities[0].title}</Text></div><div><Text as="p" variant="label">My learning plan</Text><strong>{registrations.length}</strong><Text as="p" variant="muted">sessions on your calendar</Text></div></section>
      {view === 'calendar' ? <><section className="ld-app-section"><div className="ld-section-row"><SectionHeader heading="Coming up" description="Your next opportunities to learn with colleagues." /><Button variant="secondary" onClick={() => setSelectedDate(upcomingActivities[0].date)}>Jump to calendar</Button></div><div className="ld-card-grid">{upcomingActivities.map((activity) => <ActivityCard activity={activity} key={activity.id} registered={registeredIds.includes(activity.id)} onOpen={setSelectedActivity} />)}</div></section><section id="calendar" className="ld-app-section"><div className="ld-section-row"><SectionHeader heading={`Learning calendar · ${calendarYear}`} description="Select a day to inspect available activities." /><p className="ld-calendar-legend"><span />Activity available</p></div><div className="ld-calendar-grid">{Array.from({ length: 12 }, (_, month) => <CalendarMonth key={month} month={month} year={calendarYear} activities={activities} onSelectDate={setSelectedDate} selectedDate={selectedDate} />)}</div></section><section className="ld-selected" aria-live="polite"><div className="ld-selected__header"><div><Text as="p" variant="label">Selected date</Text><Heading as="h2" variant="section">{formatDate(selectedDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</Heading></div><Button variant="secondary" onClick={() => setSelectedDate(defaultSelectedDate)}>Back to today</Button></div>{selectedActivities.length ? <div className="ld-card-grid ld-card-grid--two">{selectedActivities.map((activity) => <ActivityCard activity={activity} key={activity.id} registered={registeredIds.includes(activity.id)} onOpen={setSelectedActivity} />)}</div> : <Text as="p" className="ld-empty">No session is scheduled for this day. Pick a highlighted date to explore an activity.</Text>}</section></> : <section className="ld-app-section"><SectionHeader heading="My registrations" description="Keep track of the sessions you have reserved. Registration is stored for this browser session only." />{registrations.length ? <div className="ld-card-grid ld-card-grid--two">{registrations.map((activity) => <ActivityCard activity={activity} key={activity.id} registered onOpen={setSelectedActivity} />)}</div> : <Text as="p" className="ld-empty">Your learning plan is open. Browse the calendar to reserve a session.</Text>}</section>}
    </div>
    <footer className="ld-footer"><div className="ld-shell"><Text as="p" variant="muted">Garena Learning & Development · Prototype experience</Text></div></footer>
    <ActivityDetail activity={selectedActivity} registered={selectedActivity ? registeredIds.includes(selectedActivity.id) : false} onClose={() => setSelectedActivity(null)} onToggleRegistration={toggleRegistration} />
  </main>
}
