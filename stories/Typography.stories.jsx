import { Heading } from '../src/components/Heading'
import { Text } from '../src/components/Text'

const storySurface = {
  background: 'var(--ld-canvas)',
  color: 'var(--ld-text)',
  display: 'grid',
  gap: 'var(--space-5)',
  maxWidth: '720px',
  minHeight: '100vh',
  padding: 'var(--space-6)',
}

export default {
  title: 'Primitives/Typography',
  parameters: { layout: 'fullscreen' },
}

export const HeadingVariants = {
  render: () => (
    <div style={storySurface}>
      <Heading as="h1" variant="h1">H1 — Make time for the work that makes you better.</Heading>
      <Heading as="h2" variant="h2">H2 — Learning calendar</Heading>
      <Heading as="h3" variant="h3">H3 — Upcoming activities</Heading>
      <Heading as="h4" variant="h4">H4 — Lead with clarity</Heading>
      <Heading as="h5" variant="h5">H5 — Trainer information</Heading>
      <Heading as="h6" variant="h6">H6 — Course summary</Heading>
    </div>
  ),
}

export const TextVariants = {
  render: () => (
    <div style={storySurface}>
      <Text variant="label">Thursday, 8 October 2026 · 09:00–12:00</Text>
      <Text variant="body-lg">A large introduction supports primary page content.</Text>
      <Text variant="body">This practical session helps managers translate direction into trusted, repeatable team rituals.</Text>
      <Text variant="muted">Garena HQ · Orchid 3 · Linh Nguyen</Text>
    </div>
  ),
}

export const LongText = {
  render: () => (
    <div style={storySurface}>
      <Heading as="h2" variant="section">About this session</Heading>
      <Text variant="body">Explore the habits that make leadership feel clear and human. Through short scenarios and peer practice, you will turn broad goals into decisions, conversations, and weekly rhythms your team can act on without losing the context and care that make the work meaningful.</Text>
      <Text variant="muted">Long descriptions retain readable width, sentence case, and a 24px line height.</Text>
    </div>
  ),
}
