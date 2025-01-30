export const Table = () => {
    return (
        <> 
            <div className="absolute overflow-hidden top-65 max-w-400 max-h-200 ms-35">
                <table className='text-left overflow-hidden rounded-lg table-auto'>
                    {/* Encabezado */}
                    <thead className='bg-gray-700 font-bold'>
                        {/* Columnas */}
                        <th className='px-6 py-3'> Nombre del Objetivo </th>
                        <th className='px-6 py-3 w-2/3'> Descripción </th>
                        <th className='px-6 py-3'> Pago (Monedas) </th>
                        <th className='px-6 py-3'></th>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody className="bg-gray-600">
                        {/* Filas */}
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4 font-bold'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90 </td>
                            <td className='px-6 py-4'> 
                                <button className='rounded-full outline outline-lime-400  hover:bg-lime-500/30 focus:bg-green-600 '> Aceptar </button> 
                                </td>
                        </tr>
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90 </td>
                            <td className='px-6 py-4'> Botón </td>
                        </tr>
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90 </td>
                            <td className='px-6 py-4'> Botón </td>
                        </tr>
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90 </td>
                            <td className='px-6 py-4'> Botón </td>
                        </tr>
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90 </td>
                            <td className='px-6 py-4'> Botón </td>
                        </tr>
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90 </td>
                            <td className='px-6 py-4'> Botón </td>
                        </tr>
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90</td>
                            <td className='px-6 py-4'> Botón </td>
                        </tr>
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90 </td>
                            <td className='px-6 py-4'> Botón </td>
                        </tr>
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90 </td>
                            <td className='px-6 py-4'> Botón </td>
                        </tr>
                        <tr className='border-y hover:bg-gray-500' >
                            <td className='px-6 py-4'> Marco Botton </td>
                            <td className='px-6 py-4'> Eliminar al objetivo sin ser detectado y recuperar documentos clasifcados. </td>
                            <td className='px-6 py-4'> 90 </td>
                            <td className='px-6 py-4'> Botón </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}