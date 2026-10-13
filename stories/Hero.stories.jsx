import { Hero } from '../src/components/Hero'

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'padded',
  },
}

export default meta

const defaultArgs = {
  actionLabel: 'Explore calendar',
  description: 'See upcoming training activities, compare schedules, and choose learning that supports your next goal.',
  heading: 'Make time for your next skill',
  onAction: () => {},
  periodLabel: 'October–December 2026',
}

export const Desktop = {
  args: defaultArgs,
  decorators: [
    (Story) => <div style={{ maxWidth: 'var(--content-max)', padding: 'var(--space-6)' }}><Story /></div>,
  ],
}

export const Narrow = {
  args: defaultArgs,
  decorators: [
    (Story) => <div style={{ maxWidth: '440px', padding: 'var(--space-4)' }}><Story /></div>,
  ],
}

export const WithoutPeriodLabel = {
  args: {
    ...defaultArgs,
    periodLabel: null,
  },
  decorators: [
    (Story) => <div style={{ maxWidth: 'var(--content-max)', padding: 'var(--space-6)' }}><Story /></div>,
  ],
}

export const LongContent = {
  args: {
    ...defaultArgs,
    description: 'Browse sessions in leadership, communication, technical practice, well-being, and team collaboration. Each listing includes a date, time, location, trainer, and the skills it can help you develop before you decide to register.',
    heading: 'Plan learning around the work that matters most this quarter',
  },
  decorators: [
    (Story) => <div style={{ maxWidth: 'var(--content-max)', padding: 'var(--space-6)' }}><Story /></div>,
  ],
}
