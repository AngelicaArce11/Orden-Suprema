import './styles/index.css'
import "flowbite";
import { Navigate } from 'react-router-dom';
import { StrictMode, useState, useEffect  } from 'react'
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
import { DebtsRegister } from './components/Assassin/DebtsRegister.tsx';
import { DebtsConfirm } from './components/Assassin/DebtsConfirm.tsx';
import {CompleteMission} from './components/Assassin/CompleteMission.tsx';
import { DebtsPayment } from './components/Assassin/DebtsPayment.tsx';
import { NavBar } from "./elements/NavBar";
import ProtectedRoute from "./elements/ProtectedRoutes";
import PublicRoute from "./elements/PublicRoute";


const App = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  // Actualizacion del rol para el navbar en el inicio de sesión
  useEffect(() => {

    setUserRole(localStorage.getItem("role"));
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("role")); 
    };
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
  <StrictMode>
    <BrowserRouter> 
    {userRole && <NavBar user={userRole} />}
    <Routes>
      {/* Evita que usuarios autenticados accedan al login */}
      <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login setUserRole={setUserRole} />} />
      </Route>

        {/* Rutas exclusivas para 'Asesino' */}
        <Route element={<ProtectedRoute allowedRoles={["assassin"]} />}>
          <Route path="/changeCoins" element={<ChangeCoinsPage />} />
          <Route path="/debtsAssassin" element={<DebtsAssassin/>} />
          <Route path="/missionsAssassin" element={<MissionPage />} />
          <Route path="/debtsRegister" element={<DebtsRegister/>} />
          <Route path="/debtsConfirm" element={<DebtsConfirm/>} />
          <Route path="/completeMission" element={<CompleteMission/>} />
          <Route path="/debtsPayment" element={<DebtsPayment/>} />    
        </Route>

        {/* Rutas exclusivas para 'La Orden' */}
        <Route element={<ProtectedRoute allowedRoles={["order"]} />}>
          <Route path="/formAssassin" element={<FormAssassin />} />
          <Route path="/highProfile" element={<HighProfile />} />
          <Route path="/history" element={<History />} />
          <Route path="/debtsHighTable" element={<DebtsHighTable/>} />
          <Route path="/confirmMission" element={<MissionsConfirm/>}/> 
        </Route>

        {/* Rutas compartidas  */}
        <Route element={<ProtectedRoute allowedRoles={["assassin", "order"]} />}>
            <Route path="/postMission" element={<MissionPostPage />} />
            <Route path="/cancelMission" element={<CancelMissionPage />} />
            <Route path="/locateAssassin" element={<LocateAssassins />} />
          </Route>

        {/* Redirigir al login para rutas que no existen */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
);
}

createRoot(document.getElementById('root')!).render(<App />);

