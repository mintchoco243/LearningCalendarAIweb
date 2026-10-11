import { RegistrationConfirmation } from '../src/components/RegistrationConfirmation'
import { activities } from '../src/data/activities'

const meta = { title: 'Components/RegistrationConfirmation', component: RegistrationConfirmation, parameters: { layout: 'fullscreen' } }
export default meta
export const Registered = { args: { confirmation: { activity: activities[0], type: 'registered' }, onClose: () => {} } }
export const Cancelled = { args: { confirmation: { activity: activities[1], type: 'cancelled' }, onClose: () => {} } }
