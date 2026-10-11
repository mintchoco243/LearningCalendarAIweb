import { InteractiveHoverButton } from './ui/interactive-hover-button'

export function Button({ children, className = '', type = 'button', variant, ...props }) {
  return (
    <InteractiveHoverButton className={className} text={children} type={type} {...props} />
  )
}
