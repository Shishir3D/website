import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// The scroll-craft runtime reads the semantic React markup after its first commit.
import './vendor/scrollcraft.js'
const rootElement = document.getElementById('root')!
const readyObserver = new MutationObserver(() => {
  if (!rootElement.querySelector('[data-sc-act]')) return
  readyObserver.disconnect()
  ;(window as Window & { ScrollCraft?: { mount: (root: HTMLElement) => void } }).ScrollCraft?.mount(rootElement)
})
readyObserver.observe(rootElement, { childList: true })
