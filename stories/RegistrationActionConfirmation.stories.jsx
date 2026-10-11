import { RegistrationActionConfirmation } from '../src/components/RegistrationActionConfirmation'
import { activities } from '../src/data/activities'

const meta = { title: 'Components/RegistrationActionConfirmation', component: RegistrationActionConfirmation, parameters: { layout: 'fullscreen' } }
export default meta
export const Register = { args: { pendingAction: { activity: activities[0], type: 'registered' }, onClose: () => {}, onConfirm: () => {} } }
export const Cancel = { args: { pendingAction: { activity: activities[1], type: 'cancelled' }, onClose: () => {}, onConfirm: () => {} } }
