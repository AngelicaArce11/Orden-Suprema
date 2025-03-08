import React, { useState, useEffect } from "react";
import { NavBar } from "../../elements/NavBar";
import { TableElement } from "../../elements/Table";
import axios from "axios";

// Componente para la barra de búsqueda
function SearchAsesino({ search, setSearch }: { search: string; setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Buscar asesino"
      className="border border-gray-300 rounded-md px-4 py-2 w-full mt-6 mr-4 ml-4 max-w-3xl"
    />
  );
}

// Componente para la tabla del historial de misiones
export const History = () => {
  const [search, setSearch] = useState("");
  const [missions, setMissions] = useState<Mission[]>([]);
  
  // LLamado al backend para obtener las misiones
  useEffect(() => {
    axios.get("http://localhost:3000/Mission")
      .then(({ data }) => setMissions(data))
      .catch(console.error);
  }, []);

  // Filtro para aplicar la búsqueda y para obtener los campos necesarios para la visualización
  const filteredMissions = missions
    .filter(m => m.targetName.toLowerCase().includes(search.toLowerCase()))
    .map(({ targetName, description, status, paymentValue }) => 
      [targetName, description, 
      { unassigned: "Sin asignar",
        in_progress: "En progreso",
        under_review: "En revisión",
        completed: "Completado",
        failed: "Fallido"}[status], `$${paymentValue.toLocaleString()}`]);


  return (
    <>
      <NavBar user="highTable"/>

      {/* Titulo */}
      <div className='flex justify-center items-center mt-30'>
          <h5 className='text-white font-bold text-2xl lg:text-5xl'> Historial de Asesinos </h5>
      </div>
      <div className='flex justify-center items-center mt-5'>
        <h5 className='text-white font-bold text-1xl lg:text-3xl'> Misiones </h5>
      </div>
      
      {/* Barra de búsqueda */}
      <div className='flex justify-center items-center mt-2 pr-4 pl-4 sm:px-10'>
        <SearchAsesino search={search} setSearch={setSearch} />
      </div>


      {/* Tabla y barra de busqueda con el Historial de los asesinos */}
      <div className='w-full pt-15 pr-4 pl-4 px-2 sm:px-15  '>        
        <TableElement header={['Nombre del objetivo', 'Descripción', 'Estado', 'Pago']} data={filteredMissions}  ></TableElement>
      </div>
      
    </>
  );
};

