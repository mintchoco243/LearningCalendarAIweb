import { useState } from 'react'
import { activities } from './data/activities'
import { ActivityCard } from './components/ActivityCard'
import { BackToTopButton } from './components/BackToTopButton'
import { ActivityDetail } from './components/ActivityDetail'
import { Button } from './components/Button'
import { Heading } from './components/Heading'
import { Hero } from './components/Hero'
import { LearningCalendar } from './components/LearningCalendar'
import { RegistrationDialog } from './components/RegistrationDialog'
import { RegistrationConfirmation } from './components/RegistrationConfirmation'
import { RegistrationActionConfirmation } from './components/RegistrationActionConfirmation'
import { SectionHeader } from './components/SectionHeader'
import { Text } from './components/Text'
import garenaLogo from './assets/garena-logo-vertical.png'
import './app.css'

const defaultMonth = new Date(2026, 9, 1)
const getCurrentDateKey = () => {
  const values = Object.fromEntries(
    new Intl.DateTimeFormat('en', { day: '2-digit', month: '2-digit', timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric' })
      .formatToParts(new Date())
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  )

  return `${values.year}-${values.month}-${values.day}`
}

const currentDate = getCurrentDateKey()

const isCompletedActivity = (activity) => activity.date < currentDate

export default function PixelCalendarApp() {
  const [calendarMonth, setCalendarMonth] = useState(defaultMonth)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [registrationActivity, setRegistrationActivity] = useState(null)
  const [registrationDraft, setRegistrationDraft] = useState(null)
  const [registeredIds, setRegisteredIds] = useState(['lead-with-clarity', 'storytelling-with-data'])
  const [confirmation, setConfirmation] = useState(null)
  const [pendingAction, setPendingAction] = useState(null)
  const [showAllUpcoming, setShowAllUpcoming] = useState(false)
  const [view, setView] = useState('calendar')
  const registrations = activities.filter((activity) => registeredIds.includes(activity.id))
  const upcomingActivities = activities
    .filter((activity) => !isCompletedActivity(activity))
    .sort((first, second) => first.date.localeCompare(second.date))
  const displayedUpcomingActivities = showAllUpcoming ? upcomingActivities : upcomingActivities.slice(0, 2)
  const visibleActivities = activities.filter((activity) => activity.date.startsWith(`${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}`) && !isCompletedActivity(activity))
  const toggleRegistration = (id) => setRegisteredIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const moveMonth = (offset) => setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))
  const scrollToSection = (id) => window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  const showUpcomingActivities = () => { setView('calendar'); scrollToSection('upcoming-activities') }
  const showCalendar = () => { setView('calendar'); scrollToSection('calendar') }
  const beginRegistration = (activity) => { setRegistrationDraft(null); setRegistrationActivity(activity) }
  const closeRegistration = () => { setRegistrationActivity(null); setRegistrationDraft(null) }
  const submitRegistration = (formData) => { setRegistrationDraft(formData); setPendingAction({ activity: registrationActivity, formData, type: 'registered' }); setRegistrationActivity(null); setSelectedActivity(null) }
  const cancelRegistration = (id) => { const activity = activities.find((item) => item.id === id); setPendingAction({ activity, type: 'cancelled' }); setSelectedActivity(null) }
  const backFromPendingAction = () => {
    if (pendingAction.type === 'registered') setRegistrationActivity(pendingAction.activity)
    else setSelectedActivity(pendingAction.activity)
    setPendingAction(null)
  }
  const closePendingAction = () => { setPendingAction(null); setRegistrationDraft(null) }
  const completePendingAction = () => { toggleRegistration(pendingAction.activity.id); setConfirmation(pendingAction); setPendingAction(null); setRegistrationDraft(null) }

  return <main className="ld-app ld-app--pixel">
    <header className="ld-app-header"><div className="ld-shell ld-app-header__inner"><a className="ld-wordmark" href="#top"><img alt="Garena" className="ld-wordmark__logo" src={garenaLogo} /><span>Learning Calendar</span></a><nav className="ld-nav" aria-label="Learning views"><button className={view === 'calendar' ? 'ld-nav__item ld-nav__item--active' : 'ld-nav__item'} onClick={() => setView('calendar')} type="button">Calendar</button><button className={view === 'registrations' ? 'ld-nav__item ld-nav__item--active' : 'ld-nav__item'} onClick={() => setView('registrations')} type="button">My learning <span>{registrations.length}</span></button></nav></div></header>
    <div className="ld-shell ld-app__main">
      <Hero id="top" actionLabel="Explore calendar" description="Select a month, inspect its training activities, and register for skills that support your next goal." heading="Make time for your next skill" onAction={showCalendar} periodLabel="Skill path · 2026–2027" />
      <section className="ld-overview" aria-label="Learning overview"><button aria-label="Open upcoming activities" className="ld-overview__card ld-overview__card--interactive" onClick={showUpcomingActivities} type="button"><Heading as="span" variant="h5">Learning activities</Heading><strong>{activities.length}</strong><Text as="span" variant="muted">training activities</Text></button><button aria-label="Open current month in Learning Calendar" className="ld-overview__card ld-overview__card--interactive" onClick={showCalendar} type="button"><Heading as="span" variant="h5">Current month</Heading><strong>{visibleActivities.length}</strong><Text as="span" variant="muted">available sessions</Text></button><button aria-label="Open My learning" className="ld-overview__card ld-overview__card--interactive" onClick={() => setView('registrations')} type="button"><Heading as="span" variant="h5">My learning</Heading><strong>{registrations.length}</strong><Text as="span" variant="muted">learning sessions</Text></button></section>
      {view === 'calendar' ? <><section id="upcoming-activities" className="ld-app-section"><SectionHeader heading="Upcoming activities" description="The next sessions from the same course list shown in Learning Calendar." /><div className="ld-card-grid">{displayedUpcomingActivities.map((activity) => <ActivityCard activity={activity} key={activity.id} registered={registeredIds.includes(activity.id)} onOpen={setSelectedActivity} />)}</div>{upcomingActivities.length > 2 ? <div className="ld-upcoming__actions"><Button aria-expanded={showAllUpcoming} onClick={() => setShowAllUpcoming((current) => !current)}>{showAllUpcoming ? 'Show fewer' : 'Explore more'}</Button></div> : null}</section><section id="calendar" className="ld-app-section"><LearningCalendar activities={activities} completedBeforeDate={currentDate} month={calendarMonth} onNextMonth={() => moveMonth(1)} onOpenActivity={setSelectedActivity} onPreviousMonth={() => moveMonth(-1)} /></section></> : <section className="ld-app-section"><SectionHeader heading="My learning" description="Sessions currently registered or completed in this browser." />{registrations.length ? <div className="ld-card-grid ld-card-grid--two">{registrations.map((activity) => <ActivityCard activity={activity} completed={isCompletedActivity(activity)} key={activity.id} registered onOpen={setSelectedActivity} />)}</div> : <Text as="p" className="ld-empty">Your learning plan is open. Browse the calendar to register for a session.</Text>}</section>}
    </div>
    <footer className="ld-footer"><div className="ld-shell"><Text as="p" variant="muted">Garena Learning & Development · Prototype experience</Text></div></footer>
    <BackToTopButton onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })} />
    <ActivityDetail activity={selectedActivity} completed={selectedActivity ? isCompletedActivity(selectedActivity) : false} onClose={() => setSelectedActivity(null)} onRegister={beginRegistration} onToggleRegistration={cancelRegistration} registered={selectedActivity ? registeredIds.includes(selectedActivity.id) : false} />
    <RegistrationDialog activity={registrationActivity} initialValues={registrationDraft} onClose={closeRegistration} onSubmit={submitRegistration} />
    <RegistrationActionConfirmation pendingAction={pendingAction} onBack={backFromPendingAction} onClose={closePendingAction} onConfirm={completePendingAction} />
    <RegistrationConfirmation confirmation={confirmation} onClose={() => setConfirmation(null)} />
  </main>
}
