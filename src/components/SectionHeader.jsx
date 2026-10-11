import { Heading } from './Heading'
import { Text } from './Text'
import './primitives.css'

export function SectionHeader({
  alignment = 'start',
  as = 'h2',
  className = '',
  description,
  heading,
  headingVariant = 'section',
  ...props
}) {
  return (
    <header className={`ld-section-header ld-section-header--${alignment} ${className}`.trim()} {...props}>
      <Heading as={as} variant={headingVariant}>{heading}</Heading>
      {description ? <Text variant="muted">{description}</Text> : null}
    </header>
  )
}
