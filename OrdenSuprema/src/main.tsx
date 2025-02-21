import './styles/index.css'
import "flowbite";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MissionPage } from './components/Assassin/MissionPage.tsx'
import { Login } from './components/LoginForm.tsx'
import { FormAsesino } from './components/HighTable/FormAsesino.tsx'
import { HighProfile } from './components/HighTable/HighProfile.tsx'
import { History } from './components/HighTable/History.tsx'
import { MissionPostPage } from './components/GlobalComponents/PostMissionPage.tsx';
import { ChangeCoinsPage } from './components/Assassin/ChangeCoinsPage.tsx';
import { CancelMissionPage } from './components/GlobalComponents/CancelMissionPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BrowserRouter> 
    
      <Routes>
        <Route path="/" />
        <Route path="/loginForm" element={<Login />} />
        <Route path="/formAssassin" element={<FormAsesino />} />
        <Route path="/highProfile" element={<HighProfile />} />
        <Route path="/history" element={<History />} />
        <Route path="/missionsAssassin" element={<MissionPage />} />
        <Route path="/postMission" element={<MissionPostPage />} />
        <Route path="/changeCoins" element={<ChangeCoinsPage />} />
        <Route path="/cancelMission" element={<CancelMissionPage />} />

      </Routes>

    </BrowserRouter>
  </StrictMode>
)
