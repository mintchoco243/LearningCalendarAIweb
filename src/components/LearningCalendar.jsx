import { Check } from 'lucide-react'
import { Button } from './Button'
import { Heading } from './Heading'
import './learning-calendar.css'

const weekdayLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

export function LearningCalendar({ activities, completedBeforeDate, month, onNextMonth, onOpenActivity, onPreviousMonth }) {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const firstDay = new Date(year, monthIndex, 1)
  const offset = (firstDay.getDay() + 6) % 7
  const totalDays = new Date(year, monthIndex + 1, 0).getDate()
  const cells = Array.from({ length: Math.ceil((offset + totalDays) / 7) * 7 }, (_, index) => index - offset + 1)
  const activitiesByDate = new Map(activities.map((activity) => [activity.date, activity]))
  const monthLabel = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(month)

  return (
    <section className="ld-learning-calendar" aria-label={`Learning calendar for ${monthLabel}`}>
      <header className="ld-learning-calendar__header">
        <Heading as="h3" variant="h3">{monthLabel}</Heading>
        <div className="ld-learning-calendar__controls">
          <Button aria-label="Previous month" onClick={onPreviousMonth} showHoverArrow={false} variant="secondary">Previous</Button>
          <Button aria-label="Next month" onClick={onNextMonth} showHoverArrow={false} variant="secondary">Next</Button>
        </div>
      </header>
      <div className="ld-learning-calendar__weekdays">{weekdayLabels.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="ld-learning-calendar__grid">
        {cells.map((day, index) => {
          if (day < 1 || day > totalDays) return <span className="ld-learning-calendar__blank" key={`blank-${index}`} />
          const date = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const activity = activitiesByDate.get(date)
          const completed = activity && completedBeforeDate && activity.date < completedBeforeDate
          const className = activity
            ? `ld-learning-calendar__day ld-learning-calendar__day--activity${completed ? ' ld-learning-calendar__day--completed' : ''}`
            : 'ld-learning-calendar__day'
          const label = activity ? `${date}: ${activity.title}${completed ? ', Done' : ''}` : date
          return <button aria-label={label} className={className} key={date} onClick={() => activity && onOpenActivity(activity)} type="button"><span className="ld-learning-calendar__day-number">{day}{completed ? <Check aria-hidden="true" size={12} /> : null}</span>{activity ? <small>{completed ? `Done · ${activity.title}` : activity.title}</small> : null}</button>
        })}
      </div>
    </section>
  )
}
