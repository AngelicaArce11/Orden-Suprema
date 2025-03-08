import React, { useState, useEffect } from "react";
import { NavBar } from "../../elements/NavBar";
import { TableElement } from "../../elements/Table";
import { Dropdown, DropdownItem } from "flowbite-react";
import axios from "axios";

export const DebtsAssassin = () => {
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [filterNCompleted, setFilterNCompleted] = useState(false);
  const [filteredAssassin, setFilteredAssassin] = useState([]);
  const [section, setSection] = useState('deudasADeber'); // 'deudasADeber' o 'deudasACobrar'

  // Obtenemos al usuario
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  useEffect(() => {
    if (!user || !user.id) return; // Validación para evitar errores si el usuario no existe

    const endpoint = section === 'deudasADeber'
    ? `http://localhost:3000/api/debt/${user.id}?role=debtor`
    : `http://localhost:3000/api/debt/${user.id}?role=creditor`;

    axios.get(endpoint)
      .then(({ data }) => {
        let filtered = data;

        // Filtrado según el estado booleano
        if (filterCompleted && !filterNCompleted) {
          filtered = filtered.filter(debt => debt.is_completed === true); // ✅ Completadas
        } else if (!filterCompleted && filterNCompleted) {
          filtered = filtered.filter(debt => debt.is_completed === false); // ✅ Incompletas
        }

        setFilteredAssassin(filtered);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del backend:", error);
        setFilteredAssassin([]);
      });

  }, [user?.id, section, filterCompleted, filterNCompleted]);

  // Mapeo usando exclusivamente las columnas del backend
  const dataDebts = filteredAssassin.map(({ debtorId, creditorId, description, is_completed }) => [
    debtorId,
    creditorId,
    description,
    is_completed ? "Completada" : "Incompleta"
  ]);

  return (
    <>
      <div className='flex justify-center items-center mt-30'>
        <h5 className='text-white font-bold text-2xl lg:text-5xl'>
          {section === 'deudasADeber' ? 'Deudas a Deber' : 'Deudas a Cobrar'}
        </h5>
      </div>

      <div className='w-full pt-15 pr-4 pl-4 px-2 sm:px-30'> 
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

          {/* Checkboxes con diseño original */}
          <div className="flex flex-col items-end gap-2 ">
            <label className="flex justify-end items-center cursor-pointer text-white gap-2 text-right">
              <input 
                type="checkbox" 
                checked={filterCompleted} 
                onChange={() => setFilterCompleted(!filterCompleted)} 
                className="hidden peer"
              />
              <span className="w-5 h-5 border-2 border-white rounded-md flex justify-center items-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
                {filterCompleted && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </span>
              Completadas
            </label>

            <label className="flex items-center cursor-pointer text-white gap-2 text-right mb-2">
              <input 
                type="checkbox" 
                checked={filterNCompleted} 
                onChange={() => setFilterNCompleted(!filterNCompleted)} 
                className="hidden peer"
              />
              <span className="w-5 h-5 border-2 border-white rounded-md flex justify-center items-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
                {filterNCompleted && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </span>
              Incompletas
            </label>
          </div>
        </div>

        <TableElement header={['Deudor', 'Acreedor', 'Descripción', 'Estado']} data={dataDebts} />
      </div>
    </>
  );
};
