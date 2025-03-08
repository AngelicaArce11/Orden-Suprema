import { useState } from 'react';
import { TableElement } from "../../elements/Table";
import { ConfirmationModal } from "../../elements/ConfirmationModal";
import { UploadImage } from './UploadImage';

const missions = [
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
    {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
]

export const CompleteMission = () => {

    const [openModal, setOpenModal] = useState(false);
    const toggleModal = () => setOpenModal((prev) => !prev);
    return(
        <>
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'>
                    Completar Misión
                </h5>
            </div>

            {/* Tabla con las misiones */}
                    <div className='w-full pt-15 px-2 sm:px-15'>
                        <TableElement header={['Nombre del objetivo', 'Nombre del asesino', 'Descripción', 'Pago', '', '']} showFileInput={true} data={missions} nameButton='Enviar'
                    colorButton='greenToBlue'
                    onClick={toggleModal}
                />
            </div>

            {/* Modal de confirmación */}
            <ConfirmationModal
                open={openModal}
                onClose={toggleModal}
                onConfirm={toggleModal}
            />
            <UploadImage missionId={3}/>
        </>
    )

}