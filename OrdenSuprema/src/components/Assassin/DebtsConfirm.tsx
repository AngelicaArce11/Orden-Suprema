import React, { useState, useEffect } from "react";
import { NavBar } from "../../elements/NavBar";
import { Dropdown, DropdownItem } from "flowbite-react";
import { TableElement } from "../../elements/Table2";
import axios from "axios";

// const assassins = [
//     {deudor: 'Jack el Destripador', acreedor: 'Zodiaco', descripcion: 'Deuda 1', estado: 'Incompleta', comprobante:''},
//     {deudor: 'Zodiaco', acreedor: 'Jack el Destripador', descripcion: 'Deuda 2', estado: 'Incompleta', comprobante:''},
//     {deudor: 'Darth Vader', acreedor: 'Jack el Destripador', descripcion: 'Deuda 3', estado: 'Incompleta', comprobante:''},
//     {deduor: 'Chanci care picha', acreedor: 'Jack el Destripador', descripcion: 'Deuda 4', estado: 'Incompleta', comprobante:''},
//     {deudor: 'Jack el Destripador', acreedor: 'Zodiaco', descripcion: 'Deuda 5', estado: 'Incompleta', comprobante:'dddd'},
// ]

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

  // Obtener las imagenes de prueba
  useEffect(() => {
    debts.forEach(({ creditorId, debtorId }) => {
      namePerson(creditorId);
      namePerson(debtorId);
    });
  }, [debts]);

  const debtsData = debts
    .filter((m) => !m.is_completed)
    .map(({ debtorId, creditorId, description }) => ({
      deudor: names[debtorId],
      acreedor: names[creditorId],
      descripcion: description,
      estado: "Incompleta",
    }));

  // useEffect(() => {
  //     axios.get(`http://localhost:3000/debts`)
  //         .then(({ data }) => setDebts(data))
  //         .catch(console.error);
  // }, []);

  // const handleAccept = async (id: number) => {
  //     await axios.put(`http://localhost:3000/debts/${id}`);
  //     setDebts(debts.map(debt =>
  //         debt.id === id ? { ...debt, estado: "Completa" } : debt
  //     ));
  // };

  const buttons = [
    {
      name: "Aceptar",
      color: "greenToBlue",
      onClick: () => console.log("Aceptar"),
    },
    {
      name: "Rechazar",
      color: "pinkToOrange",
      onClick: () => console.log("Rechazar"),
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
          header={["Deudor", "Acreedor", "Descripción", "Estado"]}
          showModalColumn={true}
          data={debtsData}
          buttons={buttons}
        />
      </div>
    </>
  );
};
