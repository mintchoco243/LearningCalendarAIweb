import { Heading } from './Heading'
import { Text } from './Text'
import './primitives.css'

export function SectionHeader({
  alignment = 'start',
  as = 'h2',
  className = '',
  count,
  countLabel,
  description,
  heading,
  headingVariant = 'section',
  ...props
}) {
  return (
    <header className={`ld-section-header ld-section-header--${alignment} ${className}`.trim()} {...props}>
      <Heading as={as} className="ld-section-header__heading" variant={headingVariant}>
        <span>{heading}</span>
        {count !== undefined ? <span aria-label={countLabel} className="ld-section-header__count">{count}</span> : null}
      </Heading>
      {description ? <Text variant="muted">{description}</Text> : null}
    </header>
  )
}
