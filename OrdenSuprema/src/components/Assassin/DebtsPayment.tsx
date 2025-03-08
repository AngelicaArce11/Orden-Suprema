// import { useState } from 'react';
// import { TableElement } from "../../elements/Table";
// import { ConfirmationModal } from "../../elements/ConfirmationModal";

// const missions = [
//     { creditorId: 'Marco Botton', description: 'Eliminar al objetivo sin ser detectado y recuperar documentos clasificados.', is_completed: 'incompleto' },
//     { creditorId: 'Carmen Flores', description: 'Rescatar a un científico clave secuestrado.', is_completed: 'incompleto' }
// ];


// export const DebtsPayment = () => {
//     const [openModal, setOpenModal] = useState(false);

//     const toggleModal = () => setOpenModal((prev) => !prev);

//     return (
//         <>
            
//             <div className='flex justify-center items-center mt-30'>
//                 <h5 className='text-white font-bold text-2xl lg:text-5xl'>
//                     Pagar Deudas
//                 </h5>
//             </div>

//             {/* Tabla con las misiones */}
//             <div className='w-full pt-15 px-2 sm:px-15'>
//                 <TableElement
//                     header={['Nombre del Acreedor', 'Descripción', 'Estado', '', '']}
//                     showFileInput={true}
//                     data={missions}
//                     nameButton='Enviar'
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
//         </>
//     );
// }

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { TableElement } from "../../elements/Table";
// import { ConfirmationModal } from "../../elements/ConfirmationModal";

// export const DebtsPayment = () => {
//     const [openModal, setOpenModal] = useState(false);
//     const [missions, setMissions] = useState([]);
//     const [selectedDebtId, setSelectedDebtId] = useState(null);
//     const [proofImage, setProofImage] = useState(null);

//     // Obtenemos al usuario
//     const data = localStorage.getItem("user");
//     const userId = data ? JSON.parse(data).id : null;

//     // Obtener las deudas con `proof_image` en NULL
//     useEffect(() => {
//         if (!userId) return;

//         axios.get(`http://localhost:3000/debt/${userId}/no-proof`)
//             .then(({ data }) => setMissions(data))
//             .catch(error => console.error('Error al obtener deudas:', error));
//     }, [userId]);

//     // Manejar la carga del comprobante de pago
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setProofImage(reader.result); // Guardar la imagen como Base64
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Manejar el envío del comprobante de pago
//     const handleSendProof = async () => {
//         if (!proofImage) {
//             alert("Por favor, selecciona un comprobante antes de enviar.");
//             return;
//         }

//         try {
//             await axios.put(
//                 `http://localhost:3000/debt/${selectedDebtId}/proof`,
//                 { proof_image: proofImage }  // Enviar el comprobante en el body
//             );

//             alert('Comprobante enviado con éxito.');
//             setOpenModal(false);

//             // Recargar la lista de misiones
//             axios.get(`http://localhost:3000/debt/${userId}/no-proof`)
//                 .then(({ data }) => setMissions(data));
//         } catch (error) {
//             console.error('Error al enviar el comprobante:', error);
//             alert('Error al enviar el comprobante. Intenta de nuevo.');
//         }
//     };

//     // Abrir el modal y capturar el ID de la deuda seleccionada
//     const handleOpenModal = (debtId) => {
//         setSelectedDebtId(debtId);
//         setOpenModal(true);
//     };

//     return (
//         <>
//             <div className='flex justify-center items-center mt-30'>
//                 <h5 className='text-white font-bold text-2xl lg:text-5xl'>
//                     Pagar Deudas
//                 </h5>
//             </div>

//             {/* Tabla con las deudas */}
//             <div className='w-full pt-15 px-2 sm:px-15'>
//                 <TableElement
//                     header={['Nombre del Acreedor', 'Descripción', 'Estado', '', '', '']}
//                     showFileInput={true} // Mostrar el campo para subir comprobantes
//                     onFileChange={handleFileChange} // Guardar la imagen seleccionada
//                     data={missions.map(({ creditorId, description, is_completed, id }) => ({
//                         creditorId,
//                         description,
//                         status: is_completed ? 'Completada' : 'Incompleta',
                        
//                         onClick: () => handleOpenModal(id)
//                     }))}
//                     nameButton='Enviar'
//                     colorButton='greenToBlue'
//                 />
//             </div>

//             {/* Modal de confirmación */}
//             <ConfirmationModal
//                 open={openModal}
//                 onClose={() => setOpenModal(false)}
//                 onConfirm={handleSendProof}
//             />
//         </>
//     );
// };
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TableElement } from "../../elements/Table";

export const DebtsPayment = () => {
    const [missions, setMissions] = useState([]);
    const [selectedDebtId, setSelectedDebtId] = useState(null);
    const [proofImage, setProofImage] = useState(null);

    // Obtenemos al usuario
    const data = localStorage.getItem("user");
    const userId = data ? JSON.parse(data).id : null;

    // Obtener las deudas con `proof_image` en NULL
    useEffect(() => {
        if (!userId) return;

        axios.get(`http://localhost:3000/debt/${userId}/no-proof`)
            .then(({ data }) => setMissions(data))
            .catch(error => console.error('Error al obtener deudas:', error));
    }, [userId]);

    // Manejar la carga del comprobante de pago
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProofImage(reader.result); // Guardar la imagen como Base64
            };
            reader.readAsDataURL(file);
        }
    };

    // Manejar el envío del comprobante de pago
    const handleSendProof = async (debtId) => {
        if (!proofImage) {
            alert("Por favor, selecciona un comprobante antes de enviar.");
            return;
        }

        try {
            await axios.put(
                `http://localhost:3000/debt/${debtId}/proof`,
                { proof_image: proofImage }  // Enviar el comprobante en el body
            );

            alert('Comprobante enviado con éxito.');

            // Recargar la lista de misiones
            axios.get(`http://localhost:3000/debt/${userId}/no-proof`)
                .then(({ data }) => setMissions(data));
        } catch (error) {
            console.error('Error al enviar el comprobante:', error);
            alert('Error al enviar el comprobante. Intenta de nuevo.');
        }
    };

    return (
        <>
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'>
                    Pagar Deudas
                </h5>
            </div>

            {/* Tabla con las deudas */}
            <div className='w-full pt-15 px-2 sm:px-15'>
                <TableElement
                    header={['Nombre del Acreedor', 'Descripción', 'Estado', '', '', '']}
                    showFileInput={true} // Mostrar el campo para subir comprobantes
                    onFileChange={handleFileChange} // Guardar la imagen seleccionada
                    data={missions.map(({ creditorId, description, is_completed, id }) => ({
                        creditorId,
                        description,
                        status: is_completed ? 'Completada' : 'Incompleta',
                        onClick: () => handleSendProof(id) 
                    }))}
                    nameButton='Enviar'
                    colorButton='greenToBlue'
                />
            </div>
        </>
    );
};
