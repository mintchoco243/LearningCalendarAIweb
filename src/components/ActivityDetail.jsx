import { Button } from './Button'
import { Heading } from './Heading'
import { Text } from './Text'
import { Armchair, BadgeCheck, CalendarDays, ChartNoAxesCombined, Clock3, Compass, MapPin, MessageCircle, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { formatActivityDate } from '../lib/formatActivityDate'
import './activity-detail.css'

const skillIconRules = [
  { pattern: /communication|feedback|listening|presentation|audience|story|negotiation|relationship/i, Icon: MessageCircle },
  { pattern: /leadership|decision|goal|prioriti/i, Icon: Compass },
  { pattern: /data|experiment|problem|critical/i, Icon: ChartNoAxesCombined },
  { pattern: /ai|ideation|innovation/i, Icon: Sparkles },
  { pattern: /team|facilitation|stakeholder|meeting|empathy|customer|inclusive/i, Icon: Users },
  { pattern: /resilience|personal effectiveness|conflict/i, Icon: ShieldCheck },
]

const getSkillIcon = (skill) => skillIconRules.find(({ pattern }) => pattern.test(skill))?.Icon ?? BadgeCheck

export function ActivityDetail({ activity, completed = false, registered, onClose, onRegister, onToggleRegistration }) {
  if (!activity) return null

  const date = formatActivityDate(activity.date)

  return (
    <div className="ld-detail-overlay" role="dialog" aria-modal="true" aria-label={activity.title}>
      <article className="ld-detail">
        <div className="ld-detail__header">
          <div>
            <span className="ld-detail__category">{activity.category}</span>
            <Heading as="h2" variant="section">{activity.title}</Heading>
          </div>
          <button className="ld-detail__close" onClick={onClose} type="button" aria-label="Close details">×</button>
        </div>
        <div className="ld-detail__body">
          <div className="ld-detail__summary">
            <p aria-label="Date"><CalendarDays aria-hidden="true" size={18} />{date}</p>
            <p aria-label="Time"><Clock3 aria-hidden="true" size={18} />{activity.start}–{activity.end}</p>
            <p className="ld-detail__summary-wide" aria-label="Location"><MapPin aria-hidden="true" size={18} />{activity.location}</p>
          </div>
          <section className="ld-detail__section">
            <Heading as="h3" variant="card">About this session</Heading>
            <Text>{activity.description}</Text>
          </section>
          <section className="ld-detail__section">
            <Heading as="h3" variant="card">Skills you will build</Heading>
            <div className="ld-detail__skills">
              {activity.skills.map((skill) => {
                const SkillIcon = getSkillIcon(skill)
                return <span key={skill}><SkillIcon aria-hidden="true" size={15} />{skill}</span>
              })}
            </div>
          </section>
          <section className="ld-detail__trainer">
            <Text as="p" variant="label">Your trainer</Text>
            <Heading as="h3" variant="card">{activity.trainer}</Heading>
            <Text as="p" variant="muted">{activity.trainerRole}</Text>
            <Text>{activity.trainerBio}</Text>
          </section>
          <div className="ld-detail__footer"><Text as="p" variant="muted"><Armchair aria-hidden="true" size={18} /><strong>{activity.seats}</strong> seats available</Text>{completed ? <Button disabled showHoverArrow={false}>Completed</Button> : <Button variant={registered ? 'danger' : 'primary'} onClick={() => registered ? onToggleRegistration(activity.id) : onRegister(activity)}>{registered ? 'Cancel registration' : 'Register for this session'}</Button>}</div>
        </div>
      </article>
    </div>
  )
}
