import { useState } from 'react'
import { ActivityCard } from './ActivityCard'
import { Button } from './Button'
import { SectionHeader } from './SectionHeader'

export function UpcomingActivities({ activities, batchSize = 3, initialCount = 3, onOpen, registeredIds = [] }) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const visibleActivities = activities.slice(0, visibleCount)
  const isExpanded = visibleCount >= activities.length
  const canExpand = activities.length > initialCount

  const toggleVisibleActivities = () => {
    setVisibleCount((current) => isExpanded ? initialCount : Math.min(current + batchSize, activities.length))
  }

  return (
    <section id="upcoming-activities" className="ld-app-section">
      <SectionHeader
        as="h2"
        count={activities.length}
        countLabel={activities.length === 1 ? 'upcoming activity' : 'upcoming activities'}
        description="The next sessions from the same course list shown in Learning Calendar."
        heading="Upcoming activities"
      />
      <div className="ld-card-grid">
        {visibleActivities.map((activity) => (
          <ActivityCard
            activity={activity}
            key={activity.id}
            onOpen={onOpen}
            registered={registeredIds.includes(activity.id)}
          />
        ))}
      </div>
      {canExpand ? <div className="ld-upcoming__actions"><Button aria-expanded={isExpanded} onClick={toggleVisibleActivities} variant="secondary">{isExpanded ? 'Show fewer' : 'Explore more'}</Button></div> : null}
    </section>
  )
}
