import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { MissionPage } from './components/Assassin/missionPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MissionPage />
  </StrictMode>,
)
