import { InteractiveHoverButton } from './ui/interactive-hover-button'
import './primitives.css'

export function Button({ children, className = '', type = 'button', variant = 'primary', ...props }) {
  return (
    <InteractiveHoverButton className={className} text={children} type={type} variant={variant} {...props} />
  )
}
