import { CheckCircle2, X } from 'lucide-react'
import { Button } from './Button'
import { Heading } from './Heading'
import { Text } from './Text'
import './registration-confirmation.css'

export function RegistrationConfirmation({ confirmation, onClose }) {
  if (!confirmation) return null

  const isRegistration = confirmation.type === 'registered'
  const title = isRegistration ? 'Registration successful' : 'Cancellation successful'
  const message = isRegistration
    ? `${confirmation.activity.title} is now in My learning.`
    : `${confirmation.activity.title} was removed from My learning.`

  return (
    <div className="ld-registration-confirmation" role="dialog" aria-modal="true" aria-labelledby="registration-confirmation-title">
      <section className="ld-registration-confirmation__panel">
        <button className="ld-registration-confirmation__close" onClick={onClose} type="button" aria-label="Close confirmation"><X aria-hidden="true" size={20} /></button>
        <CheckCircle2 aria-hidden="true" className="ld-registration-confirmation__icon" size={36} />
        <Heading as="h2" variant="section" id="registration-confirmation-title">{title}</Heading>
        <Text>{message}</Text>
        <Button onClick={onClose}>Continue</Button>
      </section>
    </div>
  )
}
