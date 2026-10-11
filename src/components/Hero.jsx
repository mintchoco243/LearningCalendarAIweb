import { InteractiveHoverButton } from './ui/interactive-hover-button'
import { SectionHeader } from './SectionHeader'
import { Text } from './Text'
import skillPathTerrain from '../assets/skill-path-terrain.png'
import './hero.css'

export function Hero({
  actionLabel,
  description,
  heading,
  imageAlt = '',
  imageSrc,
  onAction,
  periodLabel = 'Learning & development',
  ...props
}) {
  const visualSrc = imageSrc ?? skillPathTerrain
  const updateVisualFocus = (event) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    event.currentTarget.style.setProperty('--hero-pointer-x', `${x}%`)
    event.currentTarget.style.setProperty('--hero-pointer-y', `${y}%`)
    event.currentTarget.style.setProperty('--hero-pointer-opacity', '1')
  }
  const clearVisualFocus = (event) => event.currentTarget.style.setProperty('--hero-pointer-opacity', '0')

  return (
    <section className="ld-hero" {...props}>
      <figure className="ld-hero__visual" onPointerLeave={clearVisualFocus} onPointerMove={updateVisualFocus}>
        <img className="ld-hero__image" src={visualSrc} alt={imageAlt} />
        {!imageSrc && (
          <div className="ld-hero__milestones" aria-hidden="true">
            <span className="ld-hero__milestone ld-hero__milestone--start">Start</span>
            <span className="ld-hero__milestone ld-hero__milestone--build">Build</span>
            <span className="ld-hero__milestone ld-hero__milestone--master">Master</span>
            <span className="ld-hero__next-skill">Next skill</span>
          </div>
        )}
        <figcaption><Text as="span" variant="label">{periodLabel}</Text></figcaption>
      </figure>
      <div className="ld-hero__content">
        <SectionHeader
          as="h1"
          description={description}
          heading={heading}
          headingVariant="display"
        />
        <InteractiveHoverButton onClick={onAction} text={actionLabel} />
      </div>
    </section>
  )
}
