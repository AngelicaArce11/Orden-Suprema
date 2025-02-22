import React, { useState } from "react";
import { NavBar } from "../../elements/NavBar";
import { TableElement } from "../../elements/Table";


interface Assassin {
  nombreObj: string;
  descripcion: string;
  estado: string;
  pago: number;
}

const assassins: Assassin[] = [
  { nombreObj: "John Doe", descripcion: "jdneknejden jdhkjasbdkasbd asdbjasbdk asdkebbefkhba dbjkhef mabsdkabkub jadbkedbkabed d", estado: "Completa", pago: 23 },
  { nombreObj: "Jane Doe", descripcion: "behbfeek fkef", estado: "En progreso", pago: 19 },
  { nombreObj: "John Smith", descripcion: "dhbjhejhefb", estado: "Pendiente", pago: 30 },

];

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

export const History = () => {
  const [search, setSearch] = useState("");
  const [filteredAssassin, setFilteredAssassin] = useState(assassins);

  React.useEffect(() => {
    setFilteredAssassin(
      assassins.filter((asesino) =>
        asesino.nombreObj.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

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
        <TableElement header={['Nombre del objetivo', 'Descripción', 'Estado', 'Pago']} data={filteredAssassin}  ></TableElement>
      </div>
      
    </>
  );
};

