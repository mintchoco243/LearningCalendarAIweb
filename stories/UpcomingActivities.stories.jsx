import { UpcomingActivities } from '../src/components/UpcomingActivities'
import { activities } from '../src/data/activities'
import '../src/app.css'

const upcomingActivities = activities.slice(0, 8)

export default {
  title: 'Components/UpcomingActivities',
  component: UpcomingActivities,
  parameters: { layout: 'padded' },
}

export const ProgressiveReveal = {
  args: {
    activities: upcomingActivities,
    onOpen: () => {},
    registeredIds: ['lead-with-clarity'],
  },
}

export const NoRevealControl = {
  args: {
    activities: upcomingActivities.slice(0, 3),
    onOpen: () => {},
    registeredIds: [],
  },
}
