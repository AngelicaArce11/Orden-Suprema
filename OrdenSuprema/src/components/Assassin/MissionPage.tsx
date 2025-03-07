import { useState, useEffect } from 'react';
import { TableElement } from "../../elements/Table";
import { Button, Modal, Toast, Alert } from "flowbite-react";
import {HiOutlineExclamationCircle, HiCheckCircle, HiXCircle, HiInformationCircle } from "react-icons/hi2";
import axios from "axios";

export const MissionPage = () => {

    // Estado para manejar el modal para confirmar la aceptacion de una mision
    const [openModal, setOpenModal] = useState(false);
    // Estado que contiene las misiones disponibles para que el asesino las acepte
    const [missions, setMissions] = useState<Mission[]>([]);
    // Estado para manejar la aceptacion de una mision, tiene el indice de la fila de la mision a aceptar
    const [accept, setAccept] = useState<number>();
    // Estado para actualizar la pantalla
    const [refresh, setRefresh] = useState(false);
    // Estado para notificaciones
    const [notifications, setNotifications] = useState('');
    // Estado para manejar el ID del asesino
    const [IDAssassin, setIdAssassin] = useState(null);

    // Obtenemos los datos de la BD 
    useEffect(() => {
        axios
            .get("http://localhost:3000/FilteredMission")
            .then((response) => {

                // Obtenemos al usuario
                const data = localStorage.getItem("user");
                const user = data ? JSON.parse(data) : null;

                setMissions(
                    // Mapeamos para obtener los atributos que queremos presentar en la pagina
                    response.data.map((mission: any) => ({
                        id: mission.id,
                        targetName: mission.targetName,
                        description: mission.description,
                        paymentValue: mission.paymentValue
                    })
                    )
                )

                // Obtenemos el id del usuario
                setIdAssassin(user.id);
                }
                
            )
            .catch((error) => console.error("Error fetching missions:", error));
    }, [refresh]);

    // Este metodo sirve para obtener la fila de la mision que se esta aceptando
    const clickAccept = (row: number) => {
        setAccept(row);
        setOpenModal(true);
    };

    // Este metodo se encarga de realizar la actualizacion en la BD de la mision que ha sido aceptada
    const acceptMission = async (indexMission: number) => {

        // Asignamos la mision al asesino 
        axios
            .put(
                `http://localhost:3000/Mission/accept/${indexMission}`, 
                { assignedToId: IDAssassin}
            )
            .then(() => {
                setOpenModal(false);
                setNotifications('Success');
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error("Error accept mission:", error); 
                setOpenModal(false);
                setNotifications('Failed');
            }
            );
    }

    return (
        <>
            {/* Titulo de la pagina */}
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'> Misiones Publicadas </h5>
            </div>
            
            {/* Logica que verifica si hay misiones disponibles para asignar */}
            {missions.length === 0 ? (
                <div className='flex justify-center items-center mt-30'>
                    <Alert color="failure" icon={() => <HiInformationCircle size={30} className='m-2'></HiInformationCircle>}>
                        <span className="font-semibold text-sm lg:text-xl "> No hay misiones disponibles para asignar. </span>
                    </Alert>
                </div>
            ): (
                <>  
                    {/* Tabla con las misiones */}
                    <div className='w-full pt-15 px-2 sm:px-15'>
                        <TableElement header={['Nombre del objetivo', 'Descripción', 'Pago', '']} data={missions.map(({ id, ...rest }) => rest)} nameButton='Aceptar' colorButton='greenToBlue' onClick={clickAccept}></TableElement>
                    </div>
                </>
            )}
            
            {/* Notificaciones de lo que ocurre con la asignacion de la mision */}
            {notifications && notifications !== '' ? (
                <Toast className='absolute right-4 bottom-4'>
                    {notifications === 'Success' ? (
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-800 text-green-200">
                            <HiCheckCircle className="h-5 w-5" />
                        </div>
                    ) : (
                        <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-800 text-red-200'> 
                            <HiXCircle className="h-5 w-5" />
                        </div>
                    )}
                    <div className="ml-3 text-sm font-normal">{notifications === 'Success' ? 'Misión asignada exitosamente.' : 'No se ha podido asignar la misión.'}</div>
                    <Toast.Toggle onClick={() => setNotifications('')} />
                </Toast> 
            ) : null } 

            {/* Modal de confirmacion o cancelacion */}
            <Modal size="md" show={openModal} onClose={() => setOpenModal(false)} className='bg-opacity-50'>
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿ Estás seguro de aceptar la realización de esta misión ?
                        </h3>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button outline size='md' gradientDuoTone="greenToBlue" onClick={() => accept !== undefined ? acceptMission(missions[accept].id) : setOpenModal(false)}>  Sí, estoy seguro </Button>
                        <Button outline size='md' gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(false)}>  Cancelar </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}