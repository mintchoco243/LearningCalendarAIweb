import { forwardRef } from 'react'
import { ArrowRight } from 'lucide-react'

const joinClassNames = (...names) => names.filter(Boolean).join(' ')

const InteractiveHoverButton = forwardRef(function InteractiveHoverButton(
  { className = '', showHoverArrow, text = 'Button', type = 'button', variant = 'primary', ...props },
  ref,
) {
  const shouldShowHoverArrow = showHoverArrow ?? variant === 'primary'

  return (
    <button
      ref={ref}
      className={joinClassNames(
        'group ld-interactive-button',
        `ld-interactive-button--${variant}`,
        className,
      )}
      type={type}
      {...props}
    >
      <span className="ld-interactive-button__content">
        <span aria-hidden="true" className="ld-interactive-button__dot" />
        <span>{text}</span>
        {shouldShowHoverArrow ? <ArrowRight aria-hidden="true" className="ld-interactive-button__arrow" size={16} /> : null}
      </span>
    </button>
  )
})

InteractiveHoverButton.displayName = 'InteractiveHoverButton'

export { InteractiveHoverButton }
