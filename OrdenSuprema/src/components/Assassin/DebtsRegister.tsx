import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Label, TextInput, Button, Toast } from "flowbite-react";
import {HiXCircle, HiCheckCircle } from "react-icons/hi2";
import axios from "axios";

type Assassin = {
    id: number;
    name: string;
};

export const DebtsRegister = () => {

    // Para redirigir a otras pantallas
    const navigate = useNavigate();

    // Estado para manejar los asesinos a los cuales se les puede registrar deudas
    const [assassins, setAssassins] = useState<Assassin[]>([]);
    // Estado para conocer el ID del usuario 
    const [IDUser, setIdUser] = useState(-1);
    // Estado para notificaciones
    const [notifications, setNotifications] = useState('');
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({ description: "", debtor: ""});

    // Obtenemos al usuario
    useEffect(() =>{
        const data = localStorage.getItem("user");
        const user = data ? JSON.parse(data) : null;

        setIdUser(user.id);
    }, []);

    // Obtenemos los asesinos
    useEffect(() =>{
        axios.
            get(`http://localhost:3000/User/Assassin`)
            .then((response) => {
                setAssassins(
                    // Mapeamos para obtener los atributos que queremos y excluimos al usuario
                    response.data.map((assassin: any) => ({
                        id: assassin.id,
                        name: assassin.name,
                    }))
                )
            })
            .catch((error) => {
                console.error("Error fetch assassins:", error); 
            })
    }, []);

    //Manejo de cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value} = e.target;
        setFormData(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        });
    };

    // Manejo de la creacion de la deuda
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.
            post(`http://localhost:3000/debt`, {description: formData.description, creditorId: IDUser, debtorId: getIdByName(formData.debtor)})
            .then(() => {
                setFormData({ description: "", debtor: ""});
                setNotifications('Success');
                setTimeout(() => {
                    navigate("/debtsAssassin");                
                }, 800); 
            })
            .catch((error) => {
                console.error("Error create debt:", error); 
                setNotifications('Failed');
            });
    }

    // Para resetear los campos en caso de que le de en cancelar
    const handleReset = () => {
        setFormData({
            description: "",
            debtor: "",
        });
    };

    // Actualizar el estado cuando se seleccione un nombre del Dropdown
    const handleSelectName = (name: any) => {
        setFormData({ ...formData, debtor: name });
    };

    // Obtener el ID del asesino 
    const getIdByName = (name: string) => {
        const assassin = assassins.find((assassin: any) => assassin.name === name);
        return assassin ? assassin.id : null; // Retorna el id o null si no se encuentra
    };

    return (
        <>

            <div className="flex justify-center items-center mt-30">
                <h5 className="text-white font-bold text-2xl lg:text-5xl">
                    Registrar deuda
                </h5>
            </div>

            {/* Formulario de registro de deuda */}
            <div className="flex justify-center pt-20">
                <form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="max-w-2xl w-full bg-slate-900 dark:bg-gray-900 p-10 rounded-lg shadow-md"
                >
                    {/* Dropdown para seleccionar un nombre */}
                    <div className="mb-5">
                        <label className="block mb-2 font-bold text-gray-700 text-sm sm:text-lg">
                            Selecciona un nombre:
                        </label>
                        <NameDropdown
                            assassins={
                                assassins.filter((assassin: any) => assassin.id !== IDUser)}
                            selectedName={formData.debtor}
                            onSelect={handleSelectName}
                        />
                    </div>

                    {/* Campo para la justificación de la deuda */}
                    <div className="mb-5">
                        <Label className="text-sm sm:text-lg">Justificación de la deuda</Label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            required
                            rows={4}
                            maxLength={500}
                        />
                    </div>

                    {/* Botones para registrar o cancelar */}
                    <div className="flex justify-center gap-4 mt-5">
                        <Button type="submit" outline gradientDuoTone="greenToBlue">
                            Registrar
                        </Button>
                        <Button type="button" outline gradientDuoTone="pinkToOrange" onClick={handleReset}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
             {/* Notificaciones de lo que ocurre con la asignacion de la mision */}
            {notifications && notifications !== '' ? (
                <Toast className='absolute right-4 bottom-4'>
                    {notifications === 'Success' ? (
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-800 text-green-200">
                            <HiCheckCircle className="h-5 w-5" />
                        </div>
                    ) : (
                        <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-800 text-red-200'> 
                            <HiXCircle className="h-5 w-5" />
                        </div>
                    )}
                    <div className="ml-3 text-sm font-normal">{notifications === 'Success' ? 'Deuda registrada exitosamente.' : 'No se ha podido registrar la deuda.'}</div>
                    <Toast.Toggle onClick={() => setNotifications('')} />
                </Toast> 
            ) : null } 
        </>
    );
};

// Componente Dropdown para seleccionar un nombre
function NameDropdown({assassins, selectedName, onSelect} ) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Filtrar nombres según la búsqueda
    const filteredNames = assassins
    .map((assassin: any) => assassin.name) 
    // Extraer solo los nombres
    .filter((name: string) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative">
            {/* Botón que abre/cierra el dropdown */}
            <button
                type="button"
                className="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedName || "Selecciona un nombre"}
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="absolute left-0 w-full mt-2 bg-gray-800 text-white shadow-md rounded-lg z-50">
                    {/* Campo de búsqueda */}
                    <div className="p-2">
                        <TextInput
                            placeholder="Buscar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-700 text-white"
                        />
                    </div>

                    {/* Lista de opciones */}
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredNames.length > 0 ? (
                            filteredNames.map((name: any) => (
                                <li
                                    key={name}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                                    onClick={() => {
                                        onSelect(name);
                                        setSearch(""); // Limpiar búsqueda
                                        setIsOpen(false); // Cerrar dropdown
                                    }}
                                >
                                    {name}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-400">No encontrado</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
