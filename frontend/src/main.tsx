import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { AppProvider } from '~app/main-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
