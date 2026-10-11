import { CalendarMonth } from '../src/components/CalendarMonth'
import { activities } from '../src/data/activities'

export default {
  title: 'Learning/CalendarMonth',
  component: CalendarMonth,
  parameters: { layout: 'centered' },
}

export const October = {
  args: {
    month: 9,
    year: 2026,
    activities,
    selectedDate: '2026-10-08',
    onSelectDate: () => {},
  },
}
