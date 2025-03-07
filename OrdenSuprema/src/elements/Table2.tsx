import { useState } from 'react';
import { Table, Button, Pagination, Modal } from "flowbite-react";

// Parámetros para pasarle a la Navbar
interface TableElementProps {
    header: string[];
    data: object[];
    showModalColumn?: boolean;
    buttons?: { name: string, color: string, onClick: () => void }[];
}

export const TableElement = ({ header, data, showModalColumn = false, buttons }: TableElementProps) => {

    // Estado para manejar la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);

    // Total páginas
    const totalPages = Math.ceil(data.length / 7);

    // Obtenemos las misiones correspondientes a la página actual de la tabla
    const dataPaginated = data.slice((currentPage - 1) * 7, 7 * currentPage);

    // Función para actualizar la página de la tabla
    const onPageChange = (page: number) => setCurrentPage(page);

    // Función para abrir el modal con la imagen del comprobante
    const openModal = (imageSrc: string) => {
        setModalImage(imageSrc);
        setIsOpen(true);
    };

    return (
        <>
        <Table hoverable className="w-full overflow-auto">
            <Table.Head>
                {header.map((value, index) => (
                    <Table.HeadCell key={index} className="break-words p-2">{value}</Table.HeadCell>
                ))}
                <Table.HeadCell>Comprobante</Table.HeadCell>
                {buttons && <Table.HeadCell>Acciones</Table.HeadCell>}
            </Table.Head>
            <Table.Body className="divide-y">
                {dataPaginated.map((row: any, rowIndex: number) => {
                    const entries = Object.entries(row).filter(([key]) => key !== "comprobante");
                    return (
                        <Table.Row key={rowIndex} className="bg-gray-800">
                            {entries.map(([key, value], cellIndex: number) => (
                                <Table.Cell
                                    key={cellIndex}
                                    className="break-words text-wrap p-2 min-w-[100px] max-w-[250px] overflow-hidden"
                                >
                                    {value}
                                </Table.Cell>
                            ))}
                            <Table.Cell className="text-center">
                                <Button size="sm" outline gradientDuoTone="purpleToBlue" onClick={() => openModal(row["comprobante"]) }>
                                    Ver Comprobante
                                </Button>
                            </Table.Cell>
                            {buttons && (
                                <Table.Cell className="text-center flex flex-wrap justify-center items-center space-x-2">
                                    {buttons.map((button, index) => (
                                        <Button
                                            key={index}
                                            outline
                                            size="md"
                                            gradientDuoTone={button.color}
                                            onClick={button.onClick}
                                            className="mb-1"
                                        >
                                            {button.name}
                                        </Button>
                                    ))}
                                </Table.Cell>
                            )}
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>

            {/* Botones de paginación */}
            <div className="flex pt-5 mb-5 justify-center">
                <Pagination layout="navigation" previousLabel='Anterior' nextLabel='Siguiente' currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>

            {/* Modal para ver el comprobante */}
            <Modal show={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header>Comprobante</Modal.Header>
                <Modal.Body className="flex justify-center">
                    {modalImage ? (
                        <img src={modalImage} alt="Comprobante" className="max-w-full h-auto" />
                     ) : (
                        <p>No hay imagen disponible</p>
                    )}                
                    </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
