import { ArrowUp } from 'lucide-react'
import './back-to-top-button.css'

export function BackToTopButton({ onClick }) {
  return (
    <button aria-label="Back to top" className="ld-back-to-top-button" onClick={onClick} type="button">
      <ArrowUp aria-hidden="true" size={20} />
    </button>
  )
}
