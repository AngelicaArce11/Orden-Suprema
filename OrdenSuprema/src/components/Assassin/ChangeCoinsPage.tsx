import { Button, Label, TextInput, Blockquote, Toast } from "flowbite-react";
import { HiCurrencyDollar, HiArrowPathRoundedSquare, HiXCircle, HiCheckCircle } from "react-icons/hi2";
import axios from "axios";
import { changeCoins } from "../../services/changeCoins";
import { useEffect, useState } from "react";

export const ChangeCoinsPage = () => {
    // Estado para manejar las monedas del usuario
    const [coins, setCoins] = useState(0);
    // Estado para manejar el dinero a cambiar 
    const [money, setMoney] = useState(0);
    // Estado para manejar el ID del asesino
    const [IDAssassin, setIdAssassin] = useState(-1);
    // Estado para notificaciones
    const [notifications, setNotifications] = useState('');
    // Estado para actualizar la pantalla
    const [refresh, setRefresh] = useState(false);

    useEffect(() =>{
        // Obtenemos al usuario
        const data = localStorage.getItem("user");
        const user = data ? JSON.parse(data) : null;
        setCoins(user.totalCoins);
        setIdAssassin(user.id);
    }, [refresh])

    //Manejo de cambios en los inputs
    const handleChange = (event: any) => {
        setMoney(Number(event.target.value));
    };

    const updateCoins = async (idUser: number, money: number) => {
        axios.
            put(`http://localhost:3000/UserById/${idUser}`, 
                {coins: changeCoins(money) }
            )
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                setNotifications('Success');
                setMoney(0);
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error("Error update coins:", error); 
                setNotifications('Failed');
            });
    }

    return (
        <>
            {/* Titulo de la pagina */}
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'> Cambiar Monedas </h5>
            </div>
            {/* Formulario de publicacion */}
            <div className='flex justify-center pt-10'>
                <div className='bg-slate-900 w-sm m-2 sm:w-4xl xl:w-7xl mb-5 rounded-lg'>
                    <form className="flex flex-col m-10 ">
                        {/* Campos del formulario */}
                        <div className='pb-10 border-b'>
                            <Blockquote className="text-center">
                                ¡ Convierte tu dinero en poder !
                            </Blockquote>
                        </div>
                        <div className='flex justify-end items-center pt-5'>
                            <Label className='text-sm sm:text-lg' value={'Monedas disponibles: ' + coins}></Label>
                            <HiCurrencyDollar className='text-yellow-500 m-1' size={18}></HiCurrencyDollar>
                        </div>
                        <div className='pb-10 pt-5'>
                            <div className='mb-2 block'>
                                <Label htmlFor='pago' className='text-sm sm:text-lg' value="Cantidad de dinero:"></Label>
                            </div>
                            <TextInput id='pago' type='number' min={0} onChange={handleChange} placeholder='Digita la cantidad de dinero a cambiar' value={money === 0 ? '': money} required></TextInput>
                        </div>
                        {/* Boton para registrar la mision */}
                        <Button type='button' gradientDuoTone="greenToBlue" className='m-4' onClick={() => updateCoins(IDAssassin, money)}> 
                            <HiArrowPathRoundedSquare size={20} className='me-2'></HiArrowPathRoundedSquare>
                            Cambiar 
                        </Button>
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
                    <div className="ml-3 text-sm font-normal">{notifications === 'Success' ? 'Monedas actualizadas exitosamente.' : 'No se ha podido actualizar las monedas.'}</div>
                    <Toast.Toggle onClick={() => setNotifications('')} />
                </Toast> 
            ) : null } 
        </>
    );
}