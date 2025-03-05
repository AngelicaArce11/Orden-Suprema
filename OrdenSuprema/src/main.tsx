import './styles/index.css'
import "flowbite";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MissionPage } from './components/Assassin/MissionPage.tsx'
import { Login } from './components/LoginForm.tsx'
import { FormAssassin } from './components/HighTable/FormAssassin.tsx'
import { HighProfile } from './components/HighTable/HighProfile.tsx'
import { History } from './components/HighTable/History.tsx'
import { MissionPostPage } from './components/Global/PostMissionPage.tsx';
import { ChangeCoinsPage } from './components/Assassin/ChangeCoinsPage.tsx';
import { CancelMissionPage } from './components/Global/CancelMissionPage.tsx';
import { DebtsHighTable } from './components/HighTable/DebtsHighTable.tsx';
import { DebtsAssassin } from './components/Assassin/DebtsAssassin.tsx';
import { LocateAssassins } from './components/Global/LocateAssassins.tsx';
import { MissionsConfirm } from './components/HighTable/MissionsConfirm.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <MissionsConfirm/> */}
    <BrowserRouter> 
    
      <Routes>
        <Route path="/" />
        <Route path="/loginForm" element={<Login />} />
        <Route path="/formAssassin" element={<FormAssassin />} />
        <Route path="/highProfile" element={<HighProfile />} />
        <Route path="/history" element={<History />} />
        <Route path="/missionsAssassin" element={<MissionPage />} />
        <Route path="/postMission" element={<MissionPostPage />} />
        <Route path="/confirmMission" element={<MissionsConfirm/>}/>
        <Route path="/changeCoins" element={<ChangeCoinsPage />} />
        <Route path="/cancelMission" element={<CancelMissionPage />} />
        <Route path="/debtsAssassin" element={<DebtsAssassin/>} />
        <Route path="/locateAssassin" element={<LocateAssassins/>} />
        <Route path="/debtsHighTable" element={<DebtsHighTable/>} />
      </Routes>

    </BrowserRouter>
  </StrictMode>
)
