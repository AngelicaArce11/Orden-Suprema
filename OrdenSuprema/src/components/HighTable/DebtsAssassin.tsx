import React, { useState } from "react";
import { NavBar } from "../../elements/NavBar";
import { TableElement } from "../../elements/Table";


const assassinDebts = [
    { deudor: "John Doe", acreedor:"Marco", descripcion: "jdneknejden jdhkjasbdkasbd asdbjasbdk asdkebbefkhba dbjkhef mabsdkabkub jadbkedbkabed d", estado: "Completada" },
    { deudor: "Jane Doe", acreedor:"Marco", descripcion: "behbfeek fkef", estado: "Completada" },
    { deudor: "John Smith", acreedor:"Marco", descripcion: "dhbjhejhefb", estado: "incompleta" },
  ];

export const DebtsAssassin = () => {

    const [filterCompleted, setFilterCompleted] = useState(false);
    const [filterNCompleted, setFilterNCompleted] = useState(false);
    const [filteredAssassin, setFilteredAssassin] = useState(assassinDebts);

    React.useEffect(() => {

        let filtered = assassinDebts;
    
        if (filterCompleted) {
          filtered = filtered.filter((assassin) => 
            assassin.estado.toLowerCase() === "completada"
          );
        }
    
        if (filterNCompleted) {
          filtered = filtered.filter((assassin) => 
            assassin.estado.toLowerCase() == "incompleta"
          );
        }
    
        setFilteredAssassin(filtered);
      }, [filterCompleted, filterNCompleted, assassinDebts]);

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
            <TableElement header={['Nombre del objetivo', 'Descripción', 'Estado', 'Pago']} data={filteredAssassin} />
        </div>
        </>
    );
    };

