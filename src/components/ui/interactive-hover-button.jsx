import { forwardRef } from 'react'
import { ArrowRight } from 'lucide-react'

const joinClassNames = (...names) => names.filter(Boolean).join(' ')

const InteractiveHoverButton = forwardRef(function InteractiveHoverButton(
  { className = '', showHoverArrow = true, text = 'Button', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={joinClassNames(
        'group relative inline-flex min-h-[var(--calendar-cell-min)] min-w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[var(--ld-border-strong)] bg-[var(--ld-surface)] px-[var(--space-5)] py-[var(--space-3)] text-center text-[var(--text-body-sm)] font-semibold leading-[var(--leading-body-sm)] text-[var(--ld-text)] transition-[border-color,color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ld-border-strong)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[var(--ld-border)] disabled:text-[var(--ld-text-subtle)] disabled:opacity-70',
        className,
      )}
      type={type}
      {...props}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[var(--ld-action)] transition-transform duration-300 group-hover:scale-x-100 group-disabled:scale-x-0" />
      <span className="relative z-10 inline-flex items-center justify-center gap-[var(--space-2)]">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[var(--ld-action)] transition-colors duration-300 group-hover:bg-[var(--ld-text)] group-disabled:bg-[var(--ld-text-subtle)]" />
        <span>{text}</span>
        {showHoverArrow ? <ArrowRight aria-hidden="true" className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-disabled:opacity-0" size={16} /> : null}
      </span>
    </button>
  )
})

InteractiveHoverButton.displayName = 'InteractiveHoverButton'

export { InteractiveHoverButton }
