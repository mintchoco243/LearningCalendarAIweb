import { ActivityDetail } from '../src/components/ActivityDetail'
import { activities } from '../src/data/activities'

const meta = { title: 'Components/ActivityDetail', component: ActivityDetail, parameters: { layout: 'fullscreen' } }
export default meta
export const Default = { args: { activity: activities[0], onClose: () => {}, onRegister: () => {}, onToggleRegistration: () => {}, registered: false } }
export const Registered = { args: { activity: activities[1], onClose: () => {}, onRegister: () => {}, onToggleRegistration: () => {}, registered: true } }
export const Completed = { args: { activity: activities[0], completed: true, onClose: () => {}, onRegister: () => {}, onToggleRegistration: () => {}, registered: true } }
