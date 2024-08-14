import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './app'
import { AuthProvider } from '~context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
)
