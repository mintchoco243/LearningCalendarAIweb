import { LearningCalendar } from '../src/components/LearningCalendar'
import { activities } from '../src/data/activities'

const meta = { title: 'Components/LearningCalendar', component: LearningCalendar, parameters: { layout: 'padded' } }
export default meta
export const October = { args: { activities, completedBeforeDate: '2026-10-11', month: new Date(2026, 9, 1), onNextMonth: () => {}, onOpenActivity: () => {}, onPreviousMonth: () => {} } }
export const SeptemberWithDone = { args: { activities, completedBeforeDate: '2026-10-11', month: new Date(2026, 8, 1), onNextMonth: () => {}, onOpenActivity: () => {}, onPreviousMonth: () => {} } }
