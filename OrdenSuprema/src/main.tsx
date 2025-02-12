import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MissionPage } from './components/Assassin/missionPage.tsx'
import { Login } from './components/LoginForm.tsx'
import { FormAsesino } from './components/HighTable/FormAsesino.tsx'
import { HighProfile } from './components/HighTable/HighProfile.tsx'
import { History } from './components/HighTable/History.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <MissionPage />

    <BrowserRouter> 
    {/* <Navbar />  */}
      <Routes>
        <Route path="/" />
        <Route path="/loginForm" element={<Login />} />
        <Route path="/formAssassin" element={<FormAsesino />} />
        <Route path="/highProfile" element={<HighProfile />} />
        <Route path="/history" element={<History />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>
)
