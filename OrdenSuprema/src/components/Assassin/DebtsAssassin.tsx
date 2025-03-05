import React, { useState, useEffect } from "react";
import { NavBar } from "../../elements/NavBar";
import { TableElement } from "../../elements/Table";

const assassinDebts = [
  { deudor: "John Doe", acreedor: "Marco", descripcion: "jdneknejden jdhkjasbdkasbd asdbjasbdk asdkebbefkhba dbjkhef mabsdkabkub jadbkedbkabed d", estado: "Completada" },
  { deudor: "Capry", acreedor: "John Doe", descripcion: "Deuda 1", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "Jane Doe", descripcion: "Deuda 2", estado: "Completada" },
  { deudor: "Jane Doe", acreedor: "Capry", descripcion: "Deuda 3", estado: "Incompleta" },
];

export const DebtsAssassin = () => {
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [filterNCompleted, setFilterNCompleted] = useState(false);
  const [filteredAssassin, setFilteredAssassin] = useState<{ deudor: string; acreedor: string; descripcion: string; estado: string }[]>([]);
  const [section, setSection] = useState('deudasADeber'); // Estado para manejar la sección actual

  useEffect(() => {
    let filtered = assassinDebts;

    if (section === 'deudasADeber') {
      filtered = filtered.filter((debt) => debt.deudor === 'Capry');
    } else if (section === 'deudasACobrar') {
      filtered = filtered.filter((debt) => debt.acreedor === 'Capry');
    }

    if (filterCompleted) {
      filtered = filtered.filter((debt) => debt.estado.toLowerCase() === "completada");
    }

    if (filterNCompleted) {
      filtered = filtered.filter((debt) => debt.estado.toLowerCase() === "incompleta");
    }

    setFilteredAssassin(filtered);
  }, [filterCompleted, filterNCompleted, section]);

  return (
    <>
      <NavBar user='assassin' />
      <div className='flex justify-center items-center mt-30'>
        <h5 className='text-white font-bold text-2xl lg:text-5xl'>
          {section === 'deudasADeber' ? 'Deudas a Deber' : 'Deudas a Cobrar'}
        </h5>
      </div>
      
      {/* Botones para cambiar de sección */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button onClick={() => setSection('deudasADeber')} className="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Deudas a Deber</button>
        <button onClick={() => setSection('deudasACobrar')} className="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Deudas a Cobrar</button>
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
         Completadas
        </label>

        <label className="flex items-center cursor-pointer text-white gap-2">
          <input type="checkbox" checked={filterNCompleted} onChange={() => setFilterNCompleted(!filterNCompleted)} className="hidden peer" />
          <span className="w-5 h-5 border-2 border-white rounded-md flex justify-center items-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
            {filterNCompleted && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>}
          </span>
          Incompletas
        </label>
      </div>

      {/* Tabla con los datos filtrados */}
      <div className='w-full pt-15 pr-4 pl-4 px-2 sm:px-30'>        
        <TableElement header={['Nombre del objetivo', 'Descripción', 'Estado', 'Pago']} data={filteredAssassin} />
      </div>
    </>
  );
};