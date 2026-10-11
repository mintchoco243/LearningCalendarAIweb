import { Button } from './Button'
import { Heading } from './Heading'
import { Text } from './Text'
import './registration-form.css'

export function RegistrationForm({
  description = 'Reserve your place for this learning activity.',
  initialValues = {},
  onSubmit,
  questionLabel = 'Question for the trainer',
  showQuestion = true,
  submitLabel = 'Register',
  title = 'Register for this session',
}) {
  const values = initialValues ?? {}

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.(Object.fromEntries(new FormData(event.currentTarget)))
  }

  return (
    <form className="ld-registration-form" onSubmit={handleSubmit}>
      <div className="ld-registration-form__intro">
        <Heading as="h2" variant="section">{title}</Heading>
        {description ? <Text as="p" variant="muted">{description}</Text> : null}
      </div>

      <div className="ld-registration-form__fields">
        <label>
          <span>Name</span>
          <input autoComplete="name" defaultValue={values.name ?? ''} name="name" required type="text" />
        </label>
        <label>
          <span>Email</span>
          <input autoComplete="email" defaultValue={values.email ?? ''} name="email" required type="email" />
        </label>
        {showQuestion ? <label>
          <span>{questionLabel} <em>(optional)</em></span>
          <textarea defaultValue={values.question ?? ''} name="question" rows="4" />
        </label> : null}
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}
