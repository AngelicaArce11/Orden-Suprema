import React, { useState, useEffect } from "react";
import { NavBar } from "../../elements/NavBar";
import { TableElement } from "../../elements/Table";
import { Dropdown, DropdownItem } from "flowbite-react";


const assassinDebts = [
  { deudor: "John Doe", acreedor: "Capry", descripcion: "HOLA QUNEIUNF UNCEIUNAIUNFE CUNIANCIUAENCIUEAUINDCI UANIUFNEAIUCBIAEBCIUD IJANCIUAE ICBNAIUBFCIF EANCIUEBIACNIUADSIC U CUABC IUEBYU AYUDCBIUAEFYUI ADCYU EUCBUYA CYAE BFCAUYEB UAECYUABCUYBADIUCB AUEBCAUEBC S 4", estado: "Completada" },
  { deudor: "Capry", acreedor: "John Doe", descripcion: "Deuda 1", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "Jane Doe", descripcion: "Deuda 2", estado: "Completada" },
  { deudor: "Jane Doe", acreedor: "Capry", descripcion: "Deuda 3", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "John Doe", descripcion: "Deuda 5", estado: "Completada" },
  { deudor: "John Doe", acreedor: "Capry", descripcion: "Deuda 6", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "Jane Doe", descripcion: "Deuda 7", estado: "Completada" },
  { deudor: "Jane Doe", acreedor: "Capry", descripcion: "Deuda 8", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "John Doe", descripcion: "Deuda 9", estado: "Completada" },
  { deudor: "John Doe", acreedor: "Capry", descripcion: "Deuda 10", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "Jane Doe", descripcion: "Deuda 11", estado: "Completada" },
  { deudor: "Jane Doe", acreedor: "Capry", descripcion: "Deuda 12", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "John Doe", descripcion: "Deuda 13", estado: "Completada" },
  { deudor: "John Doe", acreedor: "Capry", descripcion: "Deuda 14", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "Jane Doe", descripcion: "Deuda 15", estado: "Completada" },
  { deudor: "Jane Doe", acreedor: "Capry", descripcion: "Deuda 16", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "John Doe", descripcion: "Deuda 17", estado: "Completada" },
  { deudor: "John Doe", acreedor: "Capry", descripcion: "Deuda 18", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "Jane Doe", descripcion: "Deuda 19", estado: "Completada" },
  { deudor: "Jane Doe", acreedor: "Capry", descripcion: "Deuda 20", estado: "Incompleta" },
  { deudor: "Capry", acreedor: "John Doe", descripcion: "Deuda 21", estado: "Completada" },
  { deudor: "John Doe", acreedor: "Capry", descripcion: "Deuda 22", estado: "Incompleta" },

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
  
    if (filterCompleted && !filterNCompleted) {
      filtered = filtered.filter((debt) => debt.estado.toLowerCase() === "completada");
    } else if (!filterCompleted && filterNCompleted) {
      filtered = filtered.filter((debt) => debt.estado.toLowerCase() === "incompleta");
    } else if (filterCompleted && filterNCompleted) {
      // No se necesita filtrar por estado si ambos filtros están activados
    } else {
      // Si ninguno de los filtros está activado, no se necesita filtrar por estado
    }
  
    setFilteredAssassin(filtered);
  }, [filterCompleted, filterNCompleted, section]);

  return (
    <>
      <div className='flex justify-center items-center mt-30'>
        <h5 className='text-white font-bold text-2xl lg:text-5xl'>
          {section === 'deudasADeber' ? 'Deudas a Deber' : 'Deudas a Cobrar'}
        </h5>
      </div>
      
      {/* Botones para cambiar de sección */}

      {/* Tabla con los datos filtrados */}
      <div className='w-full pt-15 pr-4 pl-4 px-2 sm:px-30'> 
        {/* Botones para cambiar de sección y Checkboxes para los filtros */}
        <div className="flex justify-between items-start gap-6 mt-10"> 
          <Dropdown dismissOnClick={false} renderTrigger={() => (
            <button className="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Opciones
            </button>
          )}
          placement="right">
            <DropdownItem onClick={() => setSection('deudasADeber')}>
            Deudas a Deber
            </DropdownItem>
            <DropdownItem onClick={() => setSection('deudasACobrar')}>
              Deudas a Cobrar
            </DropdownItem>
          </Dropdown>
        


          <div className="flex flex-col items-end gap-2 ">
            <label className="flex justify-end items-center cursor-pointer text-white gap-2 text-right">
              <input type="checkbox" checked={filterCompleted} onChange={() => setFilterCompleted(!filterCompleted)} className="hidden peer" />
              <span className="w-5 h-5 border-2 border-white rounded-md flex justify-center items-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
                {filterCompleted && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>}
              </span>
            Completadas
            </label>

            <label className="flex items-center cursor-pointer text-white gap-2 text-right mb-2">
              <input type="checkbox" checked={filterNCompleted} onChange={() => setFilterNCompleted(!filterNCompleted)} className="hidden peer" />
              <span className="w-5 h-5 border-2 border-white rounded-md flex justify-center items-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
                {filterNCompleted && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>}
              </span>
              Incompletas
            </label>
          </div>
        </div>
        <TableElement header={[ 'Deudor','Acreedor', 'Descripión', 'Estado']} data={filteredAssassin}/>
      </div>
    </>
  );
};