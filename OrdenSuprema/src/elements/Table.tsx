import { useState, useEffect } from 'react';
import { Table, Button, Pagination, FileInput, Label } from "flowbite-react";

// Parametros para pasarle a la Navbar
interface TableElementProps {
    header: string[];
    data: object[];
    nameButton?: string;
    colorButton?: string;
    onClick?: (parameter: any) => void;
    showFileInput?: boolean;
    onFileChange?: (rowIndex: number, file: File | null) => void;
}

export const TableElement = ({ header, data, nameButton, colorButton, onClick, showFileInput, onFileChange }: TableElementProps) => {

    // Estado para manejar la paginación
    const [currentPage, setCurrentPage] = useState(1);

    // Estado para manejar los archivos cargados
    const [files, setFiles] = useState<{ [key: number]: File | null }>({});

    // Total páginas
    const totalPages = Math.ceil(data.length / 7);

    // Obtenemos las misiones correspondientes a la página actual de la tabla
    const dataPaginated = data.slice((currentPage - 1) * 7, 7 * currentPage);

    // Función para actualizar la página de la tabla
    const onPageChange = (page: number) => setCurrentPage(page);

    // Retrocede una página si la actual está vacía
    useEffect(() => {
        if (dataPaginated.length === 0 && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }, [dataPaginated, currentPage]);

    return (
        <>
            <Table hoverable className='table-fixed'>
                <Table.Head>
                    {header.map((value, index) => (
                        <Table.HeadCell key={index} className='break-words p-2'>{value}</Table.HeadCell>
                    ))}
                </Table.Head>

                <Table.Body className='divide-y'>
                    {dataPaginated.map((row: object, rowIndex: number) => {
                        const entries = Object.entries(row);

                        return (
                            <Table.Row key={rowIndex} className='bg-gray-800'>
                                {/* Iteramos por cada celda */}
                                {entries.map(([key, value], cellIndex: number) => (
                                    <Table.Cell
                                        key={cellIndex}
                                        className={`text-gray break-words text-wrap p-2 ${cellIndex === 0 ? 'font-medium text-white' : ''}`}
                                    >
                                        {value}
                                    </Table.Cell>
                                ))}

                                {/* Input de carga de archivos por fila */}
                                {showFileInput && (
                                    <Table.Cell>
                                        <Label htmlFor={`file-upload-${rowIndex}`} value="Subir archivo" />
                                        <FileInput
                                            id={`file-upload-${rowIndex}`}
                                            helperText="SVG, PNG, JPG o GIF (MAX. 800x400px)."
                                            onChange={(e) =>
                                                onFileChange && onFileChange(rowIndex, e.target.files ? e.target.files[0] : null)
                                            }
                                        />   
                                    </Table.Cell>
                                )}

                                {/* Botón condicional */}
                                {nameButton && (
                                    <Table.Cell className='text-center flex justify-center items-center'>
                                        <Button
                                            outline
                                            size='md'
                                            gradientDuoTone={colorButton}
                                            onClick={() => onClick && onClick(rowIndex)}
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

            {/* Botones de paginación */}
            <div className="flex pt-5 mb-5 justify-center">
                {totalPages > 1 && (
                    <Pagination
                        layout="navigation"
                        previousLabel='Anterior'
                        nextLabel='Siguiente'
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        showIcons
                    />
                )}
            </div>
        </>
    );
};