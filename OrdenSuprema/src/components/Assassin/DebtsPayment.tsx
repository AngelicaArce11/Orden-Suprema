import { useState } from 'react';
import { NavBar } from "../../elements/NavBar";
import { TableElement } from "../../elements/Table";
import { ConfirmationModal } from "../../elements/ConfirmationModal";

const missions = [
    { acreedor: 'Marco Botton', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', estado: 'incompleto' },
    { acreedor: 'Elena Vargas', descripcion: 'Infiltrarse en la fiesta privada y obtener información confidencial.', estado: 'completo' },
    { acreedor: 'Samuel Ortega', descripcion: 'Interceptar la entrega de armas en el puerto.', estado: 'incompleto' },
    { acreedor: 'Lucía Ferrer', descripcion: 'Instalar un software espía en el sistema del banco.', estado: 'completo' },
    { acreedor: 'Carlos Mendoza', descripcion: 'Proteger a un testigo clave en el caso de corrupción.', estado: 'incompleto' },
    { acreedor: 'Ana Beltrán', descripcion: 'Recuperar una memoria USB robada de alto valor.', estado: 'incompleto' },
    { acreedor: 'Diego Ríos', descripcion: 'Localizar y asegurar a un científico desaparecido.', estado: 'completo' },
    { acreedor: 'Valeria Gómez', descripcion: 'Interceptar una transmisión secreta en una emisora de radio.', estado: 'incompleto' },
    { acreedor: 'Pablo Martínez', descripcion: 'Vigilar a un político sospechoso durante una conferencia.', estado: 'completo' },
    { acreedor: 'Laura Torres', descripcion: 'Identificar a un infiltrado dentro de una agencia de inteligencia.', estado: 'incompleto' },
    { acreedor: 'Fernando Morales', descripcion: 'Evitar un atentado terrorista en el metro.', estado: 'completo' },
    { acreedor: 'Sofía Castillo', descripcion: 'Investigar una red de tráfico de personas en Europa.', estado: 'incompleto' },
    { acreedor: 'Hugo Ramírez', descripcion: 'Interceptar un paquete con materiales radioactivos.', estado: 'completo' },
    { acreedor: 'Natalia López', descripcion: 'Desenmascarar a un agente doble en la embajada.', estado: 'incompleto' },
    { acreedor: 'Javier Cano', descripcion: 'Evacuar a un periodista retenido en zona de guerra.', estado: 'completo' },
    { acreedor: 'Marta Pérez', descripcion: 'Colocar micrófonos en la oficina de un empresario corrupto.', estado: 'incompleto' },
    { acreedor: 'Andrés Herrera', descripcion: 'Recuperar planos robados de un proyecto militar.', estado: 'completo' },
    { acreedor: 'Patricia Sánchez', descripcion: 'Proteger un convoy diplomático en riesgo de ataque.', estado: 'incompleto' },
    { acreedor: 'Roberto Díaz', descripcion: 'Interceptar un cargamento ilegal de diamantes.', estado: 'completo' },
    { acreedor: 'Carmen Flores', descripcion: 'Rescatar a un científico clave secuestrado.', estado: 'incompleto' }
];


export const DebtsPayment = () => {
    const [openModal, setOpenModal] = useState(false);

    const toggleModal = () => setOpenModal((prev) => !prev);

    return (
        <>
            <NavBar user='assassin' />
            
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'>
                    Pagar Deudas
                </h5>
            </div>

            {/* Tabla con las misiones */}
            <div className='w-full pt-15 px-2 sm:px-15'>
                <TableElement
                    header={['Nombre del Acreedor', 'Descripción', 'Estado', '', '']}
                    showFileInput={true}
                    data={missions}
                    nameButton='Enviar'
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
        </>
    );
}