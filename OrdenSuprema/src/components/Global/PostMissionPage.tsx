import { NavBar } from "../../elements/NavBar";
import { Button, Label, TextInput, Textarea, Modal } from "flowbite-react";
import { useState } from "react";
import { HiMiniUser, HiCurrencyDollar } from "react-icons/hi2";


export const MissionPostPage = () => {

    // Obtenemos el tipo de usuario
    const user = 'assassin';
    // Monedas del asesino
    const coins = 50; 

    // Estado para manejar el modal del pago por la funcionalidad - caso asesino
    const [openPayModal, setOpenPayModal] = useState(user === 'assassin' ? true: false);

    return(
        <>
            <NavBar user={user}></NavBar>
            {/* Titulo de la pagina */}
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'> Publicar Misión </h5>
            </div>
            {/* Formulario de publicacion */}
            <div className='flex justify-center pt-10'>
                <div className='bg-slate-900 w-sm m-2 sm:w-4xl xl:w-7xl mb-5 rounded-lg'>
                    <form className="flex flex-col m-10 ">
                        {/* Campos del formulario */}
                        <div className='pb-10'>
                            <div className='mb-2 block'>
                                <Label htmlFor='objetivo' className='text-sm sm:text-lg' value='Nombre del objetivo'></Label>
                            </div>
                            <TextInput id='objetivo' type='text' icon={HiMiniUser} required></TextInput>
                        </div>
                        <div className='pb-10'>
                            <div className='mb-2 block'>
                                <Label htmlFor='descripcion'className='text-sm sm:text-lg' value='Descripción de la misión'></Label>
                            </div>
                            <Textarea id='descripcion' className='p-2' rows={10} required></Textarea>
                        </div>
                        <div className='pb-10'>
                            <div className='mb-2 block'>
                                <Label htmlFor='pago' className='text-sm sm:text-lg' value="Pago"></Label>
                            </div>
                            <TextInput id='pago' type='number' min={1} icon={HiCurrencyDollar} required></TextInput>
                        </div>
                        {/* Boton para registrar la mision */}
                        <Button type='submit' gradientDuoTone="greenToBlue" className='m-4'> Publicar </Button>
                    </form>
                </div>
            </div>

            {/* Modal de pago por el acceso a la funcionalidad - Caso asesino  */}
            <Modal size="md" show={openPayModal} onClose={() => setOpenPayModal(false)}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <div className='text-left'>
                        <h3 className="mb-5 text-lg font-normal text-gray-400">
                            Para acceder a esta opción debes pagar 90 monedas.
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
                            Todo tiene un precio. Elige sabiamente....
                        </h3>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button color="success" onClick={() => setOpenPayModal(false)}>
                            Aceptar
                        </Button>
                        <Button color="failure" onClick={() => setOpenPayModal(false)}>
                            Cancelar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    ) 
}