import { Button, Label, TextInput, Textarea, Modal, Toast } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { HiMiniUser, HiCurrencyDollar,  HiXCircle, HiCheckCircle } from "react-icons/hi2";
import axios from "axios";
import payment from "../../services/cost";

export const MissionPostPage = () => {

    // Para redirigir a otras pantallas
    const navigate = useNavigate();

    // Estado para manejar el rol del usuario
    const [role, setRole] = useState('');
    // Estado para manejar las monedas del usuario
    const [coins, setCoins] = useState(0);
    // Estado para conocer el ID del usuario 
    const [IDUser, setIdUser] = useState(-1);
    // Estado para notificaciones
    const [notifications, setNotifications] = useState('');
    // Estado para manejar el modal del pago por la funcionalidad - caso asesino
    const [openPayModal, setOpenPayModal] = useState(false);
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({ targetName: "", description: "" , paymentValue: "", publishedById: -1});

    useEffect(() =>{
        // Obtenemos al usuario
        const data = localStorage.getItem("user");
        const user = data ? JSON.parse(data) : null;

        // Mostrar el modal de pago si se trata de un asesino
        setOpenPayModal(user.type === 'assassin' ? true : false);

        setCoins(user.totalCoins);
        setIdUser(user.id);
        setRole(user.type);
    }, [])

    //Manejo de cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prevForm => {
            return {
                ...prevForm,
                [name]: type === "number" ? Number(value) : value, // Convierte a número si es un input numérico
                publishedById: IDUser,
            }
        });
    };

    // Manejo de la creacion de la mision
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.
            post(`http://localhost:3000/Mission`, formData)
            .then(() => {
                setFormData({ targetName: "", description: "" , paymentValue: "", publishedById: -1});
                setNotifications('Success');
                setTimeout(() => {

                    if(role === 'assassin'){
                        navigate("/missionsAssassin"); 
                    } else if (role === 'order'){
                        navigate("/highProfile"); 
                    }                    
                }, 800); 
            })
            .catch((error) => {
                console.error("Error create mission:", error); 
                setNotifications('Failed');
            });
    }

    // Actualizar las monedas del usuario en caso de ser asesino
    const updateCoins = async (idUser: number) => {
        axios.
            put(`http://localhost:3000/UserById/${idUser}`, 
                {coins: -payment }
            )
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                setOpenPayModal(false);
            })
            .catch((error) => {
                console.error("Error update coins:", error); 
            });
    }

    return(
        <>
            {/* Titulo de la pagina */}
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'> Publicar Misión </h5>
            </div>
            {/* Formulario de publicacion */}
            <div className='flex justify-center pt-10'>
                <div className='bg-slate-900 w-sm m-2 sm:w-4xl xl:w-7xl mb-5 rounded-lg'>
                    <form className="flex flex-col m-10 " onSubmit={handleSubmit} method="POST">
                        {/* Campos del formulario */}
                        <div className='pb-10'>
                            <div className='mb-2 block'>
                                <Label htmlFor='objetivo' className='text-sm sm:text-lg' value='Nombre del objetivo'></Label>
                            </div>
                            <TextInput id='objetivo' type='text' name='targetName' icon={HiMiniUser} onChange={handleChange} required value={formData.targetName}></TextInput>
                        </div>
                        <div className='pb-10'>
                            <div className='mb-2 block'>
                                <Label htmlFor='descripcion'className='text-sm sm:text-lg' value='Descripción de la misión'></Label>
                            </div>
                            <Textarea id='descripcion' className='p-2' name='description' rows={10} onChange={handleChange} required value={formData.description}></Textarea>
                        </div>
                        <div className='pb-10'>
                            <div className='mb-2 block'>
                                <Label htmlFor='pago' className='text-sm sm:text-lg' value="Pago"></Label>
                            </div>
                            <TextInput id='pago' type='number' min={1} name='paymentValue' icon={HiCurrencyDollar} onChange={handleChange} required value={formData.paymentValue}></TextInput>
                        </div>
                        {/* Boton para registrar la mision */}
                        <Button type='submit' gradientDuoTone="greenToBlue" className='m-4' > Publicar </Button>
                    </form>
                </div>
            </div>
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
                    <div className="ml-3 text-sm font-normal">{notifications === 'Success' ? 'Misión publicada exitosamente.' : 'No se ha podido publicar la misión.'}</div>
                    <Toast.Toggle onClick={() => setNotifications('')} />
                </Toast> 
            ) : null } 

            {/* Modal de pago por el acceso a la funcionalidad - Caso asesino  */}
            <Modal size="md" show={openPayModal}>
                <Modal.Body>
                    <div className='text-left'>
                        <h3 className="mb-5 text-lg font-normal text-gray-400">
                            Para acceder a esta opción debes pagar {payment} monedas.
                        </h3>
                    </div>

                    <div className='flex justify-end'>
                        <h3 className="mb-5 text-lg font-normal text-gray-400">
                            Monedas disponibles: {coins}
                        </h3>
                        < HiCurrencyDollar className='text-yellow-500 m-2'></HiCurrencyDollar>
                    </div>

                    <div className='text-left'>
                        <h3 className="mb-5 text-lg font-normal text-gray-400">
                            {coins < payment ? 'No tienes monedas suficientes para acceder a la funcionalidad.' : 'Todo tiene un precio. Elige sabiamente....'}
                        </h3>
                    </div>
                    <div className="flex justify-center gap-4">
                        {coins < payment ? (
                            <Link to={"/missionsAssassin"}>
                                <Button outline size='md' gradientDuoTone="greenToBlue">
                                    Aceptar
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Button outline size='md' gradientDuoTone="greenToBlue" onClick={() => {updateCoins(IDUser)}}>
                                    Aceptar
                                </Button>
                                <Link to={"/missionsAssassin"}>
                                    <Button outline size='md' gradientDuoTone="pinkToOrange">
                                        Cancelar
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    ) 
}