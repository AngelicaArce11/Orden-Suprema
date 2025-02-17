import { NavBar } from "../../elements/NavBar";
import { Button, Label, TextInput, Blockquote } from "flowbite-react";
import { HiCurrencyDollar, HiArrowPathRoundedSquare } from "react-icons/hi2";

export const ChangeCoinsPage = () => {

    // Monedas del asesino
    const coins = 500000; 

    return (
        <>
            <NavBar user='assassin'></NavBar>
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
                            <TextInput id='pago' type='number' min={1}  placeholder='Digita la cantidad de dinero a cambiar' required></TextInput>
                        </div>
                        {/* Boton para registrar la mision */}
                        <Button type='submit' gradientDuoTone="redToYellow" className='m-4'> 
                            <HiArrowPathRoundedSquare size={20} className='me-2'></HiArrowPathRoundedSquare>
                            Cambiar 
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}