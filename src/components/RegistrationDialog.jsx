import { X } from 'lucide-react'
import { RegistrationForm } from './RegistrationForm'
import './registration-dialog.css'

export function RegistrationDialog({ activity, initialValues, onClose, onSubmit }) {
  if (!activity) return null

  return (
    <div className="ld-registration-dialog" role="dialog" aria-modal="true" aria-label="Register for this session">
      <div className="ld-registration-dialog__panel">
        <button className="ld-registration-dialog__close" onClick={onClose} type="button" aria-label="Close registration form"><X aria-hidden="true" size={20} /></button>
        <RegistrationForm description={`Register for ${activity.title} with ${activity.trainer}.`} initialValues={initialValues} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
