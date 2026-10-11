import './primitives.css'

export function Text({ as: Tag = 'p', children, className = '', variant = 'body', ...props }) {
  return (
    <Tag className={`ld-text ld-text--${variant} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}
