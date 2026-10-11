import { InteractiveHoverButton } from '../src/components/ui/interactive-hover-button'

const meta = {
  title: 'Primitives/InteractiveHoverButton',
  component: InteractiveHoverButton,
  parameters: { layout: 'centered' },
}

export default meta

export const Default = { args: { text: 'Explore calendar' } }
export const LongLabel = { args: { text: 'View upcoming activities' } }
export const Disabled = { args: { disabled: true, text: 'Completed' } }
