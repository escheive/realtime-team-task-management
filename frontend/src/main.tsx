import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { AppProvider } from '~app/main-provider'
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
