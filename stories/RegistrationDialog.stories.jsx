import { RegistrationDialog } from '../src/components/RegistrationDialog'
import { activities } from '../src/data/activities'

const meta = { title: 'Components/RegistrationDialog', component: RegistrationDialog, parameters: { layout: 'fullscreen' } }
export default meta
export const Default = { args: { activity: activities[0], onClose: () => {}, onSubmit: () => {} } }
