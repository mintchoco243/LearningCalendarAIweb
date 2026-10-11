import './calendar-month.css'

const weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function CalendarMonth({ month, year, activities, selectedDate, onSelectDate }) {
  const firstDay = new Date(year, month, 1)
  const offset = (firstDay.getDay() + 6) % 7
  const totalDays = new Date(year, month + 1, 0).getDate()
  const activityDates = new Set(activities.map((activity) => activity.date))
  const cells = Array.from({ length: offset + totalDays }, (_, index) => index - offset + 1)

  return (
    <section className="ld-calendar-month">
      <h3 className="ld-calendar-month__title">
        {new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(year, month))}
      </h3>
      <div className="ld-calendar-month__weekdays">
        {weekdayLabels.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
      </div>
      <div className="ld-calendar-month__days">
        {cells.map((day, index) => {
          if (day < 1) return <span key={`blank-${index}`} className="ld-calendar-month__blank" />
          const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasActivity = activityDates.has(date)
          const isSelected = date === selectedDate
          return (
            <button
              aria-label={`${date}${hasActivity ? ', training available' : ''}`}
              className={`ld-calendar-day ${isSelected ? 'ld-calendar-day--selected' : hasActivity ? 'ld-calendar-day--activity' : ''}`}
              key={date}
              onClick={() => onSelectDate(date)}
              type="button"
            >
              {day}
              {hasActivity && !isSelected && <span className="ld-calendar-day__marker" />}
            </button>
          )
        })}
      </div>
    </section>
  )
}
