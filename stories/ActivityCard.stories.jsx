import { ActivityCard } from '../src/components/ActivityCard'
import { activities } from '../src/data/activities'

export default {
  title: 'Learning/ActivityCard',
  component: ActivityCard,
  parameters: { layout: 'centered' },
}

export const Default = {
  args: {
    activity: activities[0],
    registered: false,
    onOpen: () => {},
  },
}

export const Registered = {
  args: {
    activity: activities[1],
    registered: true,
    onOpen: () => {},
  },
}

export const Done = {
  args: {
    activity: activities[0],
    completed: true,
    registered: true,
    onOpen: () => {},
  },
}
