import exampleIcon from '../assets/icons/user.png';
import { Dropdown, Drawer, Sidebar  } from "flowbite-react";
import { HiBars4,HiArrowRightOnRectangle} from "react-icons/hi2";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
    user: String
}

export const NavBar = ({user} : NavBarProps ) => {

    const [isMenuMobile, setMenuMobile] = useState(false);
    const [name , setName] = useState('');
    const [coins, setCoins] = useState('');
    const [avatar, setAvatar] = useState('');
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {

        // Metodo para actualizar los atributos
        const updateUserData = () => {
            const data = localStorage.getItem("user");
            const user = data ? JSON.parse(data) : null;
            setName(user?.name || '');
            setCoins(user?.totalCoins || '');
            setAvatar(user?.avatar || '');
        };
    
        updateUserData(); // Cargar datos iniciales
    
        // Metodo para manejar el cambio
        const handleStorageChange = () => {
            updateUserData();
        };
    
        window.addEventListener("storage", handleStorageChange);
    
        // Intervalo para actualizar cada cierto tiempo
        const interval = setInterval(() => {
            const storedData = localStorage.getItem("user");
            const user = storedData ? JSON.parse(storedData) : null;
            if (user?.totalCoins !== coins) {
                updateUserData();
            }
        }, 600); // Verifica cada segundo
    
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, [coins]);

    const logout = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("role");  
        localStorage.removeItem("user");  
        window.location.href = "/login";  
    };
            
    return (
        <>
            <nav className='fixed top-0 w-full flex bg-gray-800 z-10 border-b border-cyan-500'>

                {/* Imagen y mensaje de bienvenida al asesino */}
                <a className='top-2 flex'>
                    <img className=" m-2 h-12 w-12 rounded-full" src={avatar} alt=""></img>
                    <span className='m-2 text-gray-300 text-sm lg:text-lg'> Bienvenido/a {name}</span>
                    {/* Monedas del asesino */}
                    {user === 'assassin' ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke='currentColor' className="size-6 stroke-black fill-yellow-500 absolute m-8 left-9 sm:m-9">
                                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clip-rule="evenodd" />
                            </svg>
                            <span className='absolute m-8 sm:m-9 left-17 text-gray-300'> {coins} </span>
                        </>
                    ): null}
                </a> 
                
                {/* Botones de las funcionalides */}
                <div className='absolute flex justify-between hidden right-20 lg:block'>

                    <Dropdown className="rounded-lg" renderTrigger={() => 
                        <button  className='m-3 rounded-lg hover:bg-slate-700 focus:bg-slate-900 py-2 px-5'> 
                            Misiones
                        </button>}
                    >
                        <div className="bg-gray-800 text-white rounded-lg">
                            {user === 'assassin' ? (
                                <Link to={"/missionsAssassin"}>
                                    <Dropdown.Item> Ver misiones publicadas </Dropdown.Item>   
                                </Link>
                            ): null }
                            
                            <Link to={"/postMission"}>
                                <Dropdown.Item> Publicar misión </Dropdown.Item>
                            </Link>
                            
                            <Link to={"/cancelMission"}>
                                <Dropdown.Item> Cancelar misión </Dropdown.Item>
                            </Link>

                            <Link to={user === 'assassin' ? "/completeMission" : "/confirmMission"}>
                                <Dropdown.Item>{user === 'assassin' ? 'Completar misión' : 'Confirmar misión'}</Dropdown.Item>
                            </Link>
                        
                        </div>
                    </Dropdown>
                    <Dropdown  className="rounded-lg" renderTrigger={() => 
                        <button className='m-2 rounded-lg hover:bg-slate-700 focus:bg-slate-900 py-2 px-5'> 
                            {user === 'assassin' ? 'Deudas': 'Asesinos' }
                        </button>}
                    >
                        <div className="bg-gray-800 text-white rounded-lg">
                            <Link to={user === 'assassin' ? "/debtsRegister" : "/formAssassin"}>
                                <Dropdown.Item>{user === 'assassin' ? 'Registrar deuda' : 'Registrar asesino'}</Dropdown.Item>
                            </Link>
        
                            <Link to={user === 'assassin' ? "/debtsConfirm" : "/history"}>
                                <Dropdown.Item>{user === 'assassin' ? 'Confirmar deuda' : 'Historial de asesinos'}</Dropdown.Item>
                            </Link>

                            <Link to={user === 'assassin' ? "/debtsPayment" : "/debtsHighTable"}>
                                <Dropdown.Item>{user === 'assassin' ? 'Pagar deuda' : 'Deudas entre asesinos' }</Dropdown.Item>
                            </Link>
                            {user === 'order' ? (
                                <Link to={"/locateAssassin"}>
                                    <Dropdown.Item> Ubicar asesino </Dropdown.Item>
                                </Link>
                            ): null }

                        </div>
                    </Dropdown>

                    {user === 'assassin' ? (
                        <>  
                            <Link to={"/locateAssassin"}>
                                <button className='m-2 rounded-lg hover:bg-slate-700 focus:bg-slate-900 py-2 px-5'> Ubicar asesino </button>
                            </Link>
                            
                            <Link to={"/changeCoins"}>
                                <button className='m-2 rounded-lg hover:bg-slate-700 focus:bg-slate-900 py-2 px-5'> Cambiar monedas </button> 
                            </Link>
                        </>
                    ): null }
                </div>

                
                {/* Cerrar sesion */}
                <a  onClick={logout} className='absolute right-5 top-4 hidden lg:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 stroke-cyan-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </a>

                {/* Boton para abrir el menu de dispositivos moviles */}
                <div className='absolute right-3 mt-4 lg:hidden'>
                    <button onClick= { () => setMenuMobile(true)}>
                        <HiBars4 size={25} className="text-white" />
                    </button>
                </div>
                {/* Menu de dispositivos moviles */}
                <Drawer open={isMenuMobile} onClose={() => setMenuMobile(false)} position='right'>
                    <Drawer.Header title="Menú"/>
                    <Drawer.Items>
                        <Sidebar>
                            <Sidebar.Items>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Collapse label='Misiones'>
                                        {user === 'assassin' ? (
                                            <Link to={"/missionsAssassin"}>
                                                <Sidebar.Item href="#">Ver misiones publicadas</Sidebar.Item> 
                                            </Link>
                                        ): null }
                                        <Link to={"/postMission"}>
                                            <Sidebar.Item href="#">Publicar misiones</Sidebar.Item>
                                        </Link>
                                        
                                        <Link to={user === 'assassin' ? "/completeMission" : "/confirmMission"}> 
                                            <Sidebar.Item href="#">{user === 'assassin' ? 'Completar misión' : 'Confirmar misión'}</Sidebar.Item>
                                        </Link>
                                        
                                        <Link to={"/cancelMission"}>
                                            <Sidebar.Item href="#">Cancelar misión</Sidebar.Item>
                                        </Link>
                                    </Sidebar.Collapse>
                                    <Sidebar.Collapse label={user === 'assassin' ? 'Deudas': 'Asesinos'}>
                                        <Link to={user === 'assassin' ? "/debtsRegister" : "/formAssassin"}>
                                            <Sidebar.Item href="#">{user === 'assassin' ? 'Registrar deuda' : 'Registrar asesino'}</Sidebar.Item>
                                        </Link>
                                        <Link to={user === 'assassin' ? "/debtsConfirm" : "/history"}>
                                            <Sidebar.Item href="#">{user === 'assassin' ? 'Confirmar deuda' : 'Historial de asesinos'}</Sidebar.Item>
                                        </Link>
                                        <Link to={user === 'assassin' ? "/debtsPayment" : "/debtsHighTable"}>
                                            <Sidebar.Item href="#">{user === 'assassin' ? 'Pagar deuda' : 'Deudas entre asesinos' }</Sidebar.Item>
                                        </Link>
                                    </Sidebar.Collapse>
                                        {user === 'assassin' ? (
                                            <>
                                                <Link to={"/locateAssassin"}>
                                                    <Sidebar.Item className='!text-white'> Ubicar Asesino </Sidebar.Item>
                                                </Link>
                                                <Link to={"/changeCoins"}>
                                                    <Sidebar.Item className='!text-white'> Cambiar Monedas </Sidebar.Item> 
                                                </Link>   
                                            </>
                                        ): null }
                                </Sidebar.ItemGroup>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item className='!text-white' icon={() => <HiArrowRightOnRectangle size={20} className="text-cyan-500" onClick={logout}/>}>
                                        Cerrar Sesión
                                    </Sidebar.Item>
                                </Sidebar.ItemGroup>
                            </Sidebar.Items>
                        </Sidebar>
                    </Drawer.Items>
                </Drawer>
            </nav>
        </>
    );
}