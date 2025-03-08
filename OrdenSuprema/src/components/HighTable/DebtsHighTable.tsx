import { useState, useEffect } from "react";
import { NavBar } from "../../elements/NavBar";
import { TableElement } from "../../elements/Table";
import axios from "axios";

export const DebtsHighTable = () => {
    const [debts, setDebts] = useState<Debt[]>([])
    const [filterCompleted, setFilterCompleted] = useState(false);
    const [filterNCompleted, setFilterNCompleted] = useState(false);

    // LLamado al backend para obtener las deudas
    useEffect(() => {
      axios.get("http://localhost:3000/debt")
        .then(({ data }) => setDebts(data))
        .catch(console.error);
    }, []);

    // Filtro para aplicar los checkboxes
    const filteredDebts = debts.filter(debt => {
      if (filterCompleted && !debt.is_completed) 
        return false;
      if (filterNCompleted && debt.is_completed) 
        return false;
      return true;
    });

    // Obtener los campos necesarios para la visualización
    const data = filteredDebts
      .map(({ creditorId, debtorId, description, is_completed }) => 
      [creditorId, debtorId, description, is_completed ? "Completada" : "Sin completar"])

    return (
      <>
      <NavBar user="highTable"/>

      {/* Titulo */}
      <div className='flex justify-center items-center mt-30'>
        <h5 className='text-white font-bold text-2xl lg:text-5xl'> Deudas entre Asesinos </h5>
            
      </div>
      
      {/* Checkboxes para los filtros */}
      <div className="flex justify-center items-center gap-6 mt-10">
  
        <label className="flex items-center cursor-pointer text-white gap-2">
          <input type="checkbox" checked={filterCompleted} onChange={() => setFilterCompleted(!filterCompleted)} className="hidden peer" />
          <span className="w-5 h-5 border-2 border-white rounded-md flex justify-center items-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
            {filterCompleted && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>}
          </span>
          Filtrar Completadas
        </label>


        <label className="flex items-center cursor-pointer text-white gap-2">
          <input type="checkbox" checked={filterNCompleted} onChange={() => setFilterNCompleted(!filterNCompleted)} className="hidden peer" />
          <span className="w-5 h-5 border-2 border-white rounded-md flex justify-center items-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
            {filterNCompleted && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>}
          </span>
          Filtrar No Completadas
        </label>
      </div>


        {/* Tabla con los datos filtrados */}
        <div className='w-full pt-15 pr-4 pl-4 px-2 sm:px-30'>        
            <TableElement header={['Nombre Deudor', 'Nombre Acreedor', 'Descripción', 'Estado']} data={data}  />
        </div>
        </>
    );
    };

