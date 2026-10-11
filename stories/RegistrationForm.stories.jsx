import { RegistrationForm } from '../src/components/RegistrationForm'

const meta = {
  title: 'Components/RegistrationForm',
  component: RegistrationForm,
  parameters: { layout: 'padded' },
}

export default meta

export const Default = {
  args: {
    title: 'Register for Lead with clarity',
  },
}

export const WithoutQuestion = {
  args: {
    showQuestion: false,
    title: 'Register for Storytelling with data',
  },
}

export const LongContent = {
  args: {
    description: 'Tell us who you are so the learning team can prepare the right participant materials. You may also share one question you would like the trainer to address during the session.',
    questionLabel: 'What would you like to explore during this session?',
    title: 'Register for a practical learning experience with your Garena colleagues',
  },
}
