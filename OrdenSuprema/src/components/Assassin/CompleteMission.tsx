// import { useState } from 'react';
// import { TableElement } from "../../elements/Table";
// import { ConfirmationModal } from "../../elements/ConfirmationModal";
// import { UploadImage } from './UploadImage';



// export const CompleteMission = () => {

//     const [openModal, setOpenModal] = useState(false);
//     const toggleModal = () => setOpenModal((prev) => !prev);
//     return(
//         <>
//             <div className='flex justify-center items-center mt-30'>
//                 <h5 className='text-white font-bold text-2xl lg:text-5xl'>
//                     Completar Misión
//                 </h5>
//             </div>

//             {/* Tabla con las misiones */}
//                     <div className='w-full pt-15 px-2 sm:px-15'>
//                         <TableElement header={['Nombre del objetivo', 'Nombre del asesino', 'Descripción', 'Pago', '', '']} showFileInput={true} data={missions} nameButton='Enviar'
//                     colorButton='greenToBlue'
//                     onClick={toggleModal}
//                 />
//             </div>

//             {/* Modal de confirmación */}
//             <ConfirmationModal
//                 open={openModal}
//                 onClose={toggleModal}
//                 onConfirm={toggleModal}
//             />
//             <UploadImage missionId={3}/>
//         </>
//     )

// }
// const missions = [
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
//     {objetivo: 'Marco Botton', hitman:'Capry', descripcion: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', pago: 20},
// ]

import { useEffect, useState } from 'react';
import { TableElement } from "../../elements/Table";
import { ConfirmationModal } from "../../elements/ConfirmationModal";
import { UploadImage } from './UploadImage';
import axios from 'axios';

export const CompleteMission = () => {

    const [openModal, setOpenModal] = useState(false);
    const [missions, setMissions] = useState([]);
    const [selectedMissionIndex, setSelectedMissionIndex] = useState<number | undefined>(undefined);
    const [refresh, setRefresh] = useState(false);

    const toggleModal = () => setOpenModal((prev) => !prev);

    // Obtener misiones asignadas en progreso
    useEffect(() => {
        const data = localStorage.getItem("user");
        const user = data ? JSON.parse(data) : null;

        if (!user || !user.id) return;

        axios.get(`http://localhost:3000/Mission/AssignedTo/${user.id}/status`)
            .then(({ data }) => {
                setMissions(data.map(({ id, targetName, description, paymentValue }) => ({
                    id,
                    targetName,
                    name: user.name,
                    description,
                    paymentValue
                })));
            })
            .catch(error => console.error('Error al obtener misiones:', error));
    }, [refresh]);

    // Manejar la selección de la misión para enviar el comprobante
    const clickAccept = (index: number) => {
        setSelectedMissionIndex(index);
        setOpenModal(true);
    };

    // Confirmar el envío del comprobante
    const confirmSendProof = async () => {
        if (selectedMissionIndex === undefined) return;

        const data = localStorage.getItem("user");
        const user = data ? JSON.parse(data) : null;
    
        const selectedMissionId = missions[selectedMissionIndex].id;
    
        try {
            await axios.put(`http://localhost:3000/Mission/submitProof/${user.id}`, {
                missionId: selectedMissionId,    // 🔥 Enviar el ID de la misión en el body
                status: 'under_review'
            });
    
            setOpenModal(false);
            setRefresh(!refresh); // Recargar misiones para que se actualice la lista
        } catch (error) {
            console.error('Error al enviar el comprobante:', error);
            setOpenModal(false);
        }
    };

    return(
        <>
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'>
                    Completar Misión
                </h5>
            </div>

            {/* Tabla con las misiones */}
            <div className='w-full pt-15 px-2 sm:px-15'>
                <TableElement
                    header={['Nombre del objetivo', 'Nombre del asesino','Descripción', 'Pago', '', '']}
                    showFileInput={true}
                    data={missions.map(({ id, ...rest }) => rest)}
                    nameButton='Enviar'
                    colorButton='greenToBlue'
                    onClick={clickAccept}
                />
            </div>

            {/* Modal de confirmación */}
            <ConfirmationModal
                open={openModal}
                onClose={toggleModal}
                onConfirm={confirmSendProof}
            />

            {/* Componente de subida de imágenes */}
            {selectedMissionIndex !== undefined && (
                <UploadImage missionId={missions[selectedMissionIndex].id} />
            )}
        </>
    );
}
