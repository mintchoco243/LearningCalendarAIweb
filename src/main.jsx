import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Agentation } from 'agentation'
import './styles.css'
import App from './PixelCalendarApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {import.meta.env.DEV ? <Agentation /> : null}
  </StrictMode>,
)
