import React, { useState, useEffect } from "react";
import { NavBar } from "../../elements/NavBar";
import { Dropdown, DropdownItem } from "flowbite-react";
import { TableElement } from "../../elements/Table2";
import axios from "axios";


export const DebtsConfirm = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [names, setNames] = useState<Record<number, string>>({});
  //const [images, setImages] = useState({})

  //Fetch deudas
  useEffect(() => {
    axios
      .get("http://localhost:3000/debt")
      .then(({ data }) => setDebts(data))
      .catch(console.error);
  }, []);

  //fija los nombres
  const namePerson = async (id: number) => {
    if (!names[id]) {
      const { data } = await axios.get(`http://localhost:3000/UserById/${id}`);
      setNames((prev) => ({ ...prev, [id]: data.name }));
    }
  };

  //imagens
  const debtImage = async (debtId: number) => {
        return (`http://localhost:3000/Debt/image/${debtId}`);
      };

  // Obtener los nombres de los usuarios
  useEffect(() => {
    debts.forEach(({ creditorId, debtorId }) => {
      namePerson(creditorId);
      namePerson(debtorId);
    });
  }, [debts]);

// Informació a mostrar en la tabla
  const debtsData = debts
    .filter((m) => !m.is_completed)
    .map(({id,  debtorId, creditorId, description }) => ({
      id,
      deudor: names[debtorId],
      acreedor: names[creditorId],
      descripcion: description,
      estado: "Incompleta",
      
    }));

  //Aceptar deuda 
  const handleAccept = async (id: number) => {
    await axios.put(`http://localhost:3000/debt/${id}`, { is_completed: true });
    setDebts((prevDebts) =>
      prevDebts.map((debt) =>
        debt.id === id ? { ...debt, is_completed: true } : debt
      )
    );
    };

  const buttons  = (id: number) =>[
    {
      name: "Aceptar",
      color: "greenToBlue",
      onClick: () => handleAccept(id),
    },

  ];

  return (
    <>
      <div className="flex justify-center items-center mt-30">
        <h5 className="text-white font-bold text-2xl lg:text-5xl">
          Confirmar deuda
        </h5>
      </div>

      {/* Tabla con los datos filtrados */}
      <div className="w-full pt-15 pr-4 pl-4 px-2 sm:px-30">
        <TableElement
          header={["ID", "Deudor", "Acreedor", "Descripción", "Estado"]}
          showModalColumn={true}
          data={debtsData}
          buttons={buttons} 
        />
      </div>
    </>
  );
};