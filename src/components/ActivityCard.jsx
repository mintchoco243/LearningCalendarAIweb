import './activity-card.css'
import { CalendarDays, Clock3, MapPin, UserRound } from 'lucide-react'
import { formatActivityDate } from '../lib/formatActivityDate'

const categoryImages = {
  Collaboration: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
  Data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  Digital: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  Leadership: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
}

export function ActivityCard({ activity, completed = false, registered, onOpen }) {
  const imageSrc = activity.imageUrl ?? categoryImages[activity.category] ?? categoryImages.Collaboration

  return (
    <button
      className={completed ? 'ld-activity-card ld-activity-card--completed' : 'ld-activity-card'}
      onClick={() => onOpen(activity)}
      type="button"
    >
      <div className="ld-activity-card__media" aria-hidden="true"><img alt="" src={imageSrc} /></div>
      <div className="ld-activity-card__meta">
        <span className="ld-activity-card__category">{activity.category}</span>
        {completed ? <span className="ld-activity-card__done">Done</span> : registered && <span className="ld-activity-card__registered">Registered</span>}
      </div>
      <h3 className="ld-activity-card__title">{activity.title}</h3>
      <p className="ld-activity-card__description">{activity.shortDescription}</p>
      <div className="ld-activity-card__details">
        <p aria-label="Date and time"><CalendarDays aria-hidden="true" size={16} /><span>{formatActivityDate(activity.date)}</span><Clock3 aria-hidden="true" size={16} /><span>{activity.start}–{activity.end}</span></p>
        <p aria-label="Location"><MapPin aria-hidden="true" size={16} /><span>{activity.location}</span></p>
        <p aria-label="Trainer"><UserRound aria-hidden="true" size={16} /><span>{activity.trainer}</span></p>
      </div>
    </button>
  )
}
