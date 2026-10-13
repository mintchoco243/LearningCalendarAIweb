import { LearningCalendar } from '../src/components/LearningCalendar'
import { SectionHeader } from '../src/components/SectionHeader'
import { activities } from '../src/data/activities'

const meta = { title: 'Components/LearningCalendar', component: LearningCalendar, parameters: { layout: 'padded' } }
export default meta
const OctoberCalendar = (args) => <section className="ld-app-section"><SectionHeader as="h2" count={1} countLabel="1 activity in this month" heading="Learning calendar" /><LearningCalendar {...args} /></section>
export const October = { args: { activities, completedBeforeDate: '2026-10-11', month: new Date(2026, 9, 1), onNextMonth: () => {}, onOpenActivity: () => {}, onPreviousMonth: () => {} }, render: OctoberCalendar }
export const SeptemberWithDone = { args: { activities, completedBeforeDate: '2026-10-11', month: new Date(2026, 8, 1), onNextMonth: () => {}, onOpenActivity: () => {}, onPreviousMonth: () => {} } }
