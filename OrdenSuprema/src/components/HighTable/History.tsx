
const asesinos = [
  { nombreObj: "John Doe", descripcion: "sjkdkbkfbskjdf sdfnsdjfksdfkjnsdkfnksjdnfsdfsdfsdfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA dfnsdnfsdnfknsdkfjnkjsdfnkjdsnfkjsdnfkj", estado: "Completa" },
  { nombreObj: "Jane Doe", descripcion: "sjkdkbkfbskjdf sdfnsdjfksdfkjnsdkfnksjdnfsdfsdfsdf dfnsdnfsdnfknsdkfjnkjsdfnkjdsnfkjsdnfkj", estado: "Completa" },
  { nombreObj: "John Smith", descripcion: "sjkdkbkfbskjdf sdfnsdjfksdfkjnsdkfnksjdnfsdfsdfsdf dfnsdnfsdnfknsdkfjnkjsdfnkjdsnfkjsdnfkj-01-03", estado: "En progreso" },
]


function AsesinoRow({ asesino }: { asesino: { nombreObj: string; descripcion: string; estado: string } }) {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 text-gray-800">{asesino.nombreObj}</td>
      <td className="px-6 py-4 text-gray-800 ">{asesino.descripcion}</td>
      <td className="px-6 py-4 text-gray-800">{asesino.estado}</td>
    </tr>
  );
}

function AsesinosTable({ asesinos }: { asesinos: { nombreObj: string; descripcion: string; estado: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full max-w-3xl mx-auto border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">NombreObj</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">descripcion</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">estado</th>
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

function SearchAsesino() {
  return (
    <input
      type="text"
      placeholder="Buscar asesino"
      className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-3xl"
    />
  );
}



export const History = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10"> 
      <div className="flex flex-col items-center justify-start min-h-screen p-10 mt-30">
        <SearchAsesino  />
        <AsesinosTable asesinos={asesinos}/>
      </div>
    </div> 
  );
};
