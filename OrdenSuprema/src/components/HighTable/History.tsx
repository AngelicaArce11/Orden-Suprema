import React, { useState } from "react";

interface Asesino {
  nombreObj: string;
  descripcion: string;
  estado: string;
  pago: number;
}


const asesinos: Asesino[] = [
  { nombreObj: "John Doe", descripcion: "jdneknejdend", estado: "Completa", pago: 23 },
  { nombreObj: "Jane Doe", descripcion: "behbfeek fkef", estado: "En progreso", pago: 19 },
  { nombreObj: "John Smith", descripcion: "dhbjhejhefb", estado: "Pendiente", pago: 30 },

];

function AsesinoRow({ asesino }: { asesino: Asesino }) {
  return (
    <tr className="hover:bg-gray-600 bg-gray-700 ">
      <td className="px-6 py-4 text-white font-bold">{asesino.nombreObj}</td>
      <td className="px-6 py-4 text-gray-200 ">{asesino.descripcion}</td>
      <td className="px-6 py-4 text-white">{asesino.estado}</td>
      <td className="px-6 py-4 text-white">{asesino.pago}</td>
    </tr>
  );
}

function AsesinosTable({ asesinos }: { asesinos: Asesino[] }) {
  return (
    // <div className="overflow-x-auto">
    <div className=" w-full max-w-5xl overflow-y-auto mt-4 ">
      <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold sm:text-base">NOMBRE DEL OBJETIVO</th>
            <th className="px-6 py-3 text-left text-sm font-semibold sm:text-base">DESCRIPCIÓN</th>
            <th className="px-6 py-3 text-left text-sm font-semibold sm:text-base">ESTADO</th>
            <th className="px-6 py-3 text-left text-sm font-semibold sm:text-base">PAGO</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {asesinos.map((asesino) => (
            <AsesinoRow key={asesino.nombreObj} asesino={asesino} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SearchAsesino({ search, setSearch }: { search: string; setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Buscar asesino"
      className="border border-gray-300 rounded-md px-4 py-2 w-full mt-30 max-w-3xl"
    />
  );
}

export const History = () => {
  const [search, setSearch] = useState("");
  const [filteredAsesinos, setFilteredAsesinos] = useState(asesinos);

  React.useEffect(() => {
    setFilteredAsesinos(
      asesinos.filter((asesino) =>
        asesino.nombreObj.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="h-screen w-screen bg-gray-600 flex flex-col items-center justify-center p-4">
      <SearchAsesino search={search} setSearch={setSearch} />
      <AsesinosTable asesinos={filteredAsesinos} />
    </div>
  );
};

