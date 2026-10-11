import { useEffect, useState } from 'react'
import { Heading } from '../src/components/Heading'
import { Text } from '../src/components/Text'

const colourTokens = [
  '--ld-canvas', '--ld-surface', '--ld-surface-raised', '--ld-border',
  '--ld-border-strong', '--ld-text', '--ld-text-muted', '--ld-text-subtle',
  '--ld-action', '--ld-action-hover', '--ld-action-soft', '--ld-success',
  '--ld-warning', '--ld-danger', '--ld-info',
]

const typeTokens = [
  '--font-heading', '--font-body', '--text-h1', '--text-h2', '--text-h3',
  '--text-h4', '--text-h5', '--text-h6', '--text-body-lg', '--text-body',
  '--text-body-sm', '--text-label',
]

const spacingTokens = [
  '--space-1', '--space-2', '--space-3', '--space-4', '--space-5',
  '--space-6', '--space-7', '--content-max', '--shell-padding',
  '--calendar-cell-min',
]

const shapeTokens = [
  '--radius-sm', '--radius-md', '--radius-lg', '--border-default',
  '--border-focus', '--shadow-overlay',
]

const motionTokens = [
  '--motion-fast', '--motion-selection', '--motion-overlay',
  '--ease-standard', '--ease-overlay',
]

function useTokenValues(tokens) {
  const [values, setValues] = useState({})

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement)
    setValues(Object.fromEntries(tokens.map((token) => [token, styles.getPropertyValue(token).trim()])))
  }, [tokens])

  return values
}

function FoundationFrame({ eyebrow, title, children }) {
  return (
    <section style={{ background: 'var(--ld-canvas)', color: 'var(--ld-text)', fontFamily: 'var(--font-body)', minHeight: '100vh', padding: 'var(--space-6)' }}>
      <p style={{ color: 'var(--ld-action)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', fontWeight: 700, letterSpacing: 'var(--tracking-label)', margin: 0, textTransform: 'uppercase' }}>{eyebrow}</p>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-h3)', margin: 'var(--space-2) 0 var(--space-6)' }}>{title}</h1>
      {children}
    </section>
  )
}

function TokenName({ token, value }) {
  return <p style={{ color: 'var(--ld-text-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', lineHeight: 'var(--leading-label)', margin: 'var(--space-2) 0 0' }}>{token}<br />{value}</p>
}

function Colours() {
  const values = useTokenValues(colourTokens)
  return (
    <FoundationFrame eyebrow="Foundations / Colour" title="Colour roles">
      <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {colourTokens.map((token) => <div key={token}><div aria-label={token} style={{ background: `var(${token})`, border: 'var(--border-default)', borderRadius: 'var(--radius-md)', height: '96px' }} /><TokenName token={token} value={values[token]} /></div>)}
      </div>
    </FoundationFrame>
  )
}

function Typography() {
  const values = useTokenValues(typeTokens)
  return (
    <FoundationFrame eyebrow="Foundations / Typography" title="Readable by default">
      <div style={{ background: 'var(--ld-surface)', border: 'var(--border-default)', borderRadius: 'var(--radius-lg)', display: 'grid', gap: 'var(--space-5)', padding: 'var(--space-5)' }}>
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <Heading as="h1" variant="h1">H1 — Make time for your next skill</Heading>
          <Heading as="h2" variant="h2">H2 — Learning calendar</Heading>
          <Heading as="h3" variant="h3">H3 — Upcoming activities</Heading>
          <Heading as="h4" variant="h4">H4 — Lead with clarity</Heading>
          <Heading as="h5" variant="h5">H5 — Trainer information</Heading>
          <Heading as="h6" variant="h6">H6 — Course summary</Heading>
        </div>
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          <Text variant="body-lg">Body large — An orientation sentence for a major section.</Text>
          <Text variant="body">Body — Readable course descriptions and dialog content use this default text size.</Text>
          <Text variant="muted">Body small — Supporting location, trainer, and helper content.</Text>
          <Text variant="label">Label — Thursday, 8 October 2026 · 09:00–12:00</Text>
        </div>
        {typeTokens.map((token) => <TokenName key={token} token={token} value={values[token]} />)}
      </div>
    </FoundationFrame>
  )
}

function SpacingAndLayout() {
  const values = useTokenValues(spacingTokens)
  return (
    <FoundationFrame eyebrow="Foundations / Spacing & layout" title="A compact learning rhythm">
      <div style={{ background: 'var(--ld-surface)', border: 'var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
        {spacingTokens.map((token) => <div key={token} style={{ alignItems: 'center', display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'minmax(160px, 1fr) 2fr', marginBottom: 'var(--space-4)' }}><TokenName token={token} value={values[token]} /><div style={{ background: 'var(--ld-action)', borderRadius: 'var(--radius-sm)', height: 'var(--space-3)', width: `var(${token})` }} /></div>)}
      </div>
    </FoundationFrame>
  )
}

function ShapeAndDepth() {
  const values = useTokenValues(shapeTokens)
  return (
    <FoundationFrame eyebrow="Foundations / Shape & depth" title="Structure through outline">
      <div style={{ display: 'grid', gap: 'var(--space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {shapeTokens.map((token) => <div key={token} style={{ background: 'var(--ld-surface)', border: token.includes('border') ? `var(${token})` : 'var(--border-default)', borderRadius: token.includes('radius') ? `var(${token})` : 'var(--radius-lg)', boxShadow: token === '--shadow-overlay' ? `var(${token})` : 'none', minHeight: '128px', padding: 'var(--space-5)' }}><TokenName token={token} value={values[token]} /></div>)}
      </div>
    </FoundationFrame>
  )
}

function MotionFoundation() {
  const values = useTokenValues(motionTokens)
  return (
    <FoundationFrame eyebrow="Foundations / Motion" title="Quick, quiet feedback">
      <div style={{ background: 'var(--ld-surface)', border: 'var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
        <button style={{ background: 'var(--ld-action)', border: 0, borderRadius: 'var(--radius-md)', color: 'var(--ld-text)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, padding: 'var(--space-3) var(--space-5)', transition: `background var(--motion-fast) var(--ease-standard), transform var(--motion-fast) var(--ease-standard)` }} type="button">Register for this session</button>
        <div style={{ display: 'grid', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>{motionTokens.map((token) => <TokenName key={token} token={token} value={values[token]} />)}</div>
      </div>
    </FoundationFrame>
  )
}

export default { title: 'Foundations' }

export const Colour = { render: () => <Colours /> }
export const Type = { render: () => <Typography /> }
export const SpacingLayout = { name: 'Spacing & layout', render: () => <SpacingAndLayout /> }
export const ShapeDepth = { name: 'Shape & depth', render: () => <ShapeAndDepth /> }
export const Motion = { render: () => <MotionFoundation /> }
