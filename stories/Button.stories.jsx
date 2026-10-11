import { Button } from '../src/components/Button'

export default {
  title: 'Primitives/Button',
  component: Button,
  parameters: { layout: 'centered' },
}

export const Primary = { args: { children: 'Register for this session' } }

export const Secondary = { args: { children: 'View details', variant: 'secondary' } }

export const LongLabel = {
  args: {
    children: 'Register for the leadership communication workshop',
  },
}

export const Hover = {
  args: { children: 'Register for this session', className: 'ld-button--preview-hover' },
}

export const Pressed = {
  args: { children: 'Register for this session', className: 'ld-button--preview-pressed' },
}

export const KeyboardFocus = {
  args: { children: 'Register for this session', className: 'ld-button--preview-focus' },
}

export const Disabled = {
  args: { children: 'Completed', disabled: true },
}
