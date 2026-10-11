import '../src/styles.css'
import { createElement, Fragment } from 'react'
import { Agentation } from 'agentation'

const preview = {
  parameters: {
    backgrounds: {
      default: 'Learning canvas',
      values: [
        { name: 'Learning canvas', value: 'var(--ld-canvas)' },
        { name: 'Surface', value: 'var(--ld-surface)' },
      ],
    },
    layout: 'padded',
  },
  decorators: [
    (Story) => createElement(
      Fragment,
      null,
      createElement(Story),
      import.meta.env.DEV ? createElement(Agentation) : null,
    ),
  ],
}

export default preview
