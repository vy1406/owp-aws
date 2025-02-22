import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LoginProvider } from './services/context.tsx'

createRoot(document.getElementById('root')!).render(
    <LoginProvider>
      <App />
    </LoginProvider>
)
