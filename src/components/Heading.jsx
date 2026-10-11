import './primitives.css'

export function Heading({ as: Tag = 'h2', children, className = '', variant = 'section', ...props }) {
  return (
    <Tag className={`ld-heading ld-heading--${variant} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}
