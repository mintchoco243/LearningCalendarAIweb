import { X } from 'lucide-react'
import { Button } from './Button'
import { Heading } from './Heading'
import { Text } from './Text'
import './registration-confirmation.css'

export function RegistrationActionConfirmation({ pendingAction, onBack, onClose, onConfirm }) {
  if (!pendingAction) return null

  const isRegistration = pendingAction.type === 'registered'
  const title = isRegistration ? 'Confirm registration' : 'Confirm cancellation'
  const message = isRegistration
    ? `Add ${pendingAction.activity.title} to My learning?`
    : `Remove ${pendingAction.activity.title} from My learning?`

  return (
    <div className="ld-registration-confirmation" role="dialog" aria-modal="true" aria-labelledby="registration-action-confirmation-title">
      <section className="ld-registration-confirmation__panel">
        <button className="ld-registration-confirmation__close" onClick={onClose} type="button" aria-label="Close confirmation"><X aria-hidden="true" size={20} /></button>
        <Heading as="h2" variant="section" id="registration-action-confirmation-title">{title}</Heading>
        <Text>{message}</Text>
        <div className="ld-registration-confirmation__actions">
          <Button onClick={onBack ?? onClose} variant="secondary">Back</Button>
          <Button onClick={onConfirm} variant={isRegistration ? 'primary' : 'danger'}>{isRegistration ? 'Confirm registration' : 'Confirm cancellation'}</Button>
        </div>
      </section>
    </div>
  )
}
