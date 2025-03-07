import { useState, useEffect } from 'react';
import { TableElement } from "../../elements/Table";
import { Button, Modal, Toast, Alert } from "flowbite-react";
import {HiOutlineExclamationCircle, HiCurrencyDollar, HiCheckCircle, HiXCircle, HiInformationCircle} from "react-icons/hi2";
import axios from "axios";
import {refund} from "../../services/refund";

export const CancelMissionPage = () => {

    // Estado que contiene las misiones que se pueden cancelar
    const [missions, setMissions] = useState<Mission[]>([]);
    // Estado para actualizar la pantalla
    const [refresh, setRefresh] = useState(false);
    // Estado para manejar el modal para confirmar la cancelacion de una mision
    const [openModal, setOpenModal] = useState(false);
    // Estado para manejar la cancelacion de una mision, tiene el indice de la fila de mision a cancelar
    const [cancel, setCancel] = useState<number>();
    // Estado para notificaciones
    const [notifications, setNotifications] = useState('');
    // Estado para manejar las monedas del usuario
    const [coins, setCoins] = useState(0);
    // Estado para manejar el rol del usuario
    const [role, setRole] = useState('');

    // Obtenemos los datos de la BD 
    useEffect(() => {
        axios
            .get("http://localhost:3000/FilteredMission")
            .then((response) =>  {
                const data = localStorage.getItem("user");
                const user = data ? JSON.parse(data) : null;

                let filteredMissions = response.data.map((mission: any) => ({
                    id: mission.id,
                    publishedById: mission.publishedById ,
                    targetName: mission.targetName,
                    description: mission.description,
                    status: 'Sin asignar',
                    paymentValue: mission.paymentValue,
                }));

                // Si el usuario es asesino, filtramos antes de actualizar el estado
                if (user?.type === 'assassin') {
                    filteredMissions = filteredMissions.filter((mission: any) => mission.publishedById === user.id);
                }

                setMissions(filteredMissions)
                setCoins(user.totalCoins);
                setRole(user.type);
                }
            )
            .catch((error) => console.error("Error fetching missions:", error));
    }, [refresh]);

    // Este metodo sirve para obtener la fila de la mision que se esta cancelando
    const clickCancel = (row: number) => {
        setCancel(row);
        setOpenModal(true);
    };

    // Este metodo se encarga de realizar la actualizacion en la BD de la mision que ha sido cancelada
    const cancelMission = async (indexMission: number) => {
        // Asignamos la mision al asesino 
        axios
            .delete(`http://localhost:3000/Mission/delete/${indexMission}`)
            .then(() => {
                setOpenModal(false);
                setNotifications('Success');
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error("Error cancel mission:", error); 
                setOpenModal(false);
                setNotifications('Failed');
            }
            );
    }

    return (
        <>
            {/* Titulo de la pagina */}
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'> Cancelar Misión </h5>
            </div>

            {/* Logica que verifica si hay misiones disponibles para asignar */}
            {missions.length === 0 ? (
                <div className='flex justify-center items-center mt-30'>
                    <Alert color="failure" icon={() => <HiInformationCircle size={30} className='m-2'></HiInformationCircle>}>
                        <span className="font-semibold text-sm lg:text-xl "> No hay misiones disponibles para cancelar. </span>
                    </Alert>
                </div>
            ): (
                <>  
                    {/* Tabla con las misiones */}
                    <div className='w-full pt-15 px-2 sm:px-15'>
                        <TableElement header={['Nombre del objetivo', 'Descripción', 'Estado', 'Pago', '']} data={missions.map(({id, publishedById, ...rest }) => rest)} nameButton='Cancelar' colorButton='pinkToOrange' onClick={clickCancel} ></TableElement>
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
                    <div className="ml-3 text-sm font-normal">{notifications === 'Success' ? 'Misión cancelada exitosamente.' : 'No se ha podido cancelar la misión.'}</div>
                    <Toast.Toggle onClick={() => setNotifications('')} />
                </Toast> 
            ) : null } 

            {/* Modal de confirmacion o cancelacion */}
            <Modal size="md" show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            ¿ Estás seguro de cancelar esta misión ?
                        </h3>
                    </div>
                    {role === 'assassin' ? (
                        <>
                            <div className='flex justify-end'>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Monedas disponibles: {coins}
                                </h3>
                                < HiCurrencyDollar className='text-yellow-500 m-2'></HiCurrencyDollar>
                            </div>
                            <div className='text-center'>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Se te va a realizar un desembolso de {refund()} monedas.
                                </h3>
                            </div>
                        </>
                    ): null}
                    
                    <div className="flex justify-center gap-4">
                        <Button outline size='md' gradientDuoTone="greenToBlue" onClick={() => cancel !== undefined ? cancelMission(missions[cancel].id) : setOpenModal(false)}>  Sí, estoy seguro </Button>
                        <Button outline size='md' gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(false)}>  Cancelar </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}