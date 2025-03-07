// import { useState } from 'react';
// import { Table, Button, Pagination } from "flowbite-react";


// // Parametros para pasarle a la Navbar
// interface TableElementProps {
//     header: string[];
//     data: object[];
//     nameButton?: string
//     colorButton?: string
//     onClick? : () => void;
// }

// export const TableElement = ({header, data, nameButton, colorButton, onClick} : TableElementProps) => {

//     // Estado para manejar la paginacion
//     const [currentPage, setCurrentPage] = useState(1);
    
//     //Total paginas
//     const totalPages = Math.ceil(data.length/7);

//     // Obtenemos las misiones correspondientes a la pagina actual de la tabla
//     const dataPaginated = data.slice((currentPage -1)*7, 7*currentPage);

//     // Funcion para actualizar la pagina de la tabla
//     const onPageChange = (page: number) => setCurrentPage(page);

//     return (
//         <> 
//             <Table hoverable className='table-fixed '>
//                 <Table.Head>
//                     { header.map((value) => (
//                         <Table.HeadCell className='break-words p-2'>{value}</Table.HeadCell>
//                     ))}
//                 </Table.Head>
//                 <Table.Body className='divide-y'>
                    
//                     {/* Obtenemos las filas */}
//                     {dataPaginated.map( (row: object, rowIndex: number) => {
//                         // Convertimos el objeto en un arreglo clave valor
//                         const entries = Object.entries(row);
                    
//                         return (
//                             <Table.Row key={rowIndex} className='bg-gray-800 '>
//                                 {/* Iteramos por cada celda */}
//                                 {entries.map(([key, value], cellIndex: number) => 
//                                     // Si es la primera celda, queremos que la letra sea en negrilla
//                                     cellIndex === 0 ? (
//                                         <Table.Cell className='font-medium text-white break-words text-wrap p-2'>{value}</Table.Cell>
//                                     ) : (
//                                         // Si la tabla tiene botón
//                                         cellIndex === entries.length - 1 && nameButton !== undefined ? (
//                                             <>
//                                                 <Table.Cell className='text-gray break-words text-wrap p-2'>{value}</Table.Cell>
//                                                 <Table.Cell className='text-center flex justify-center items-center '>
//                                                     <Button outline size='md' gradientDuoTone={colorButton} onClick={onClick}>  {nameButton} </Button>
//                                                 </Table.Cell>
//                                             </>
//                                         ) : (
//                                             // Si la tabla no tiene botón
//                                             <Table.Cell className='text-gray break-words text-wrap p-2'>{value}</Table.Cell>
//                                         )
//                                     )
//                                 )}
//                             </Table.Row>
//                         );
//                     })}
//                 </Table.Body>
//             </Table>
            
//             {/* Botones de paginacion */}
//             <div className="flex pt-5 mb-5 justify-center">
//                 <Pagination layout="navigation" previousLabel='Anterior' nextLabel='Siguiente' currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
//             </div>
//         </>
//     );
// }

// import { useState } from 'react';
// import { Table, Button, Pagination, FileInput, Label } from "flowbite-react";

// // Parametros para pasarle a la Navbar
// interface TableElementProps {
//     header: string[];
//     data: object[];
//     nameButton?: string;
//     colorButton?: string;
//     onClick?: () => void;
//     showFileInput?: boolean;
// }

// export const TableElement = ({header, data, nameButton, colorButton, onClick, showFileInput = false} : TableElementProps) => {

//     // Estado para manejar la paginacion
//     const [currentPage, setCurrentPage] = useState(1);
    
//     //Total paginas
//     const totalPages = Math.ceil(data.length/7);

//     // Obtenemos las misiones correspondientes a la pagina actual de la tabla
//     const dataPaginated = data.slice((currentPage -1)*7, 7*currentPage);

//     // Funcion para actualizar la pagina de la tabla
//     const onPageChange = (page: number) => setCurrentPage(page);

//     return (
//         <> 
//             <Table hoverable className='table-fixed '>
//                 <Table.Head>
//                     { header.map((value, index) => (
//                         <Table.HeadCell key={index} className='break-words p-2'>{value}</Table.HeadCell>
//                     ))}
//                 </Table.Head>
//                 <Table.Body className='divide-y'>
                    
//                     {/* Obtenemos las filas */}
//                     {dataPaginated.map( (row: object, rowIndex: number) => {
//                         // Convertimos el objeto en un arreglo clave valor
//                         const entries = Object.entries(row);
                    
//                         return (
//                             <Table.Row key={rowIndex} className='bg-gray-800 '>

                                
//                                 {/* Iteramos por cada celda */}
//                                 {entries.map(([key, value], cellIndex: number) => 
//                                     // Si es la primera celda, queremos que la letra sea en negrilla
//                                     cellIndex === 0 ? (
//                                         <Table.Cell key={cellIndex} className='font-medium text-white break-words text-wrap p-2'>{value}</Table.Cell>
//                                     ) : (
//                                         // Si la tabla tiene botón
//                                         cellIndex === entries.length - 1 && nameButton !== undefined ? (
//                                             <>
//                                                 <Table.Cell key={cellIndex} className='text-gray break-words text-wrap p-2'>{value}</Table.Cell>
//                                                 <Table.Cell className='text-center flex justify-center items-center '>
//                                                     <Button outline size='md' gradientDuoTone={colorButton} onClick={onClick}>  {nameButton} </Button>
//                                                 </Table.Cell>
//                                             </>
//                                         ) : (
//                                             // Si la tabla no tiene botón
//                                             <Table.Cell key={cellIndex} className='text-gray break-words text-wrap p-2'>{value}</Table.Cell>
//                                         )
//                                     )
//                                 )}
//                                 {/* Input de carga de archivos por fila */}
//                                 {showFileInput && (
//                                     <Table.Cell>
//                                         <Label htmlFor={`file-upload-${rowIndex}`} value="Upload file" />
//                                         <FileInput id={`file-upload-${rowIndex}`} helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." />
//                                     </Table.Cell>
//                                 )}
//                             </Table.Row>
//                         );
//                     })}
//                 </Table.Body>
//             </Table>
            
//             {/* Botones de paginacion */}
//             <div className="flex pt-5 mb-5 justify-center">
//                 <Pagination layout="navigation" previousLabel='Anterior' nextLabel='Siguiente' currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
//             </div>
//         </>
//     );
// }

import { useState } from 'react';
import { Table, Button, Pagination, FileInput, Label } from "flowbite-react";

// Parametros para pasarle a la Navbar
interface TableElementProps {
    header: string[];
    data: object[];
    nameButton?: string;
    colorButton?: string;
    onClick?: () => void;
    showFileInput?: boolean;
}

export const TableElement = ({header, data, nameButton, colorButton, onClick, showFileInput = false} : TableElementProps) => {

    // Estado para manejar la paginacion
    const [currentPage, setCurrentPage] = useState(1);
    
    // Estado para manejar los archivos subidos
    const [files, setFiles] = useState<{ [key: number]: File | null }>({});

    //Total paginas
    const totalPages = Math.ceil(data.length/7);

    // Obtenemos las misiones correspondientes a la pagina actual de la tabla
    const dataPaginated = data.slice((currentPage -1)*7, 7*currentPage);

    // Funcion para actualizar la pagina de la tabla
    const onPageChange = (page: number) => setCurrentPage(page);

    return (
        <> 
            <Table hoverable className='table-fixed '>
                <Table.Head>
                    { header.map((value, index) => (
                        <Table.HeadCell key={index} className='break-words p-2'>{value}</Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body className='divide-y'>
                    
                    {/* Obtenemos las filas */}
                    {dataPaginated.map( (row: object, rowIndex: number) => {
                        // Convertimos el objeto en un arreglo clave valor
                        const entries = Object.entries(row);
                    
                        return (
                            <Table.Row key={rowIndex} className='bg-gray-800 '>

                                {/* Iteramos por cada celda */}
                                {entries.map(([key, value], cellIndex: number) => (
                                    <Table.Cell key={cellIndex} className={`text-gray break-words text-wrap p-2 ${cellIndex === 0 ? 'font-medium text-white' : ''}`}>{value}</Table.Cell>
                                ))}
                                
                                {/* Input de carga de archivos por fila */}
                                {showFileInput && (
                                    <Table.Cell>
                                        <Label htmlFor={`file-upload-${rowIndex}`} value="Subir archivo" />
                                        <FileInput 
                                            id={`file-upload-${rowIndex}`} 
                                            helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
                                            onChange={(e) => setFiles({ ...files, [rowIndex]: e.target.files ? e.target.files[0] : null })} 
                                        />
                                    </Table.Cell>
                                )}

                                {/* Botón con validación */}
                                {nameButton && (
                                    <Table.Cell className='text-center flex justify-center items-center '>
                                        <Button 
                                            outline 
                                            size='md' 
                                            gradientDuoTone={colorButton} 
                                            onClick={onClick} 
                                            disabled={showFileInput && !files[rowIndex]}
                                        >  
                                            {nameButton} 
                                        </Button>
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            
            {/* Botones de paginacion */}
            <div className="flex pt-5 mb-5 justify-center">
                <Pagination layout="navigation" previousLabel='Anterior' nextLabel='Siguiente' currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>
        </>
    );
}


