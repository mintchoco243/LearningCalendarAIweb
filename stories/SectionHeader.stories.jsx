import { SectionHeader } from '../src/components/SectionHeader'

const meta = {
  title: 'Primitives/SectionHeader',
  component: SectionHeader,
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--ld-canvas)', maxWidth: '720px', minHeight: '220px', padding: 'var(--space-8)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
}

export default meta

export const ShortContent = {
  args: {
    as: 'h2',
    count: 1,
    countLabel: 'activity this month',
    heading: 'Learning calendar',
    description: 'Find the next activity for your growth plan.',
  },
}

export const LongContent = {
  args: {
    heading: 'Build skills through practical learning',
    description: 'Browse sessions across leadership, communication, technical practice and well-being. Each listing shows its schedule, trainer and location so you can plan ahead.',
  },
}

export const WithoutDescription = {
  args: {
    as: 'h2',
    count: 8,
    countLabel: 'upcoming activities',
    heading: 'Upcoming activities',
  },
}

export const Centered = {
  args: {
    alignment: 'center',
    heading: 'Plan your learning',
    description: 'Choose an activity that supports your next goal.',
  },
}
