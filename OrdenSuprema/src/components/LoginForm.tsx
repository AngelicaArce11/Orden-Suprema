// import '../App.css'
import imagen1 from '../assets/icons/login.png'
import imagen from '../assets/img/inicio.png'

export const Login=()=> {
    return (
    <>
        <div className="relative w-screen h-screen group">
            <div className="absolute inset-0 bg-cover bg-center brightness-20 "
            style={{ backgroundImage: `url(${imagen})` }} >
            </div> 
            
            <div className="relative flex items-center justify-center md:justify-end px-20 min-h-screen">
                <div className="max-w-sm w-full bg-gray-200 dark:bg-gray-900 p-6 rounded-lg shadow-md">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img alt="The High Table" src={imagen1} className="mx-auto h-10 w-auto"/>
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Inicio de sesión</h2>
                            <h3 className="text-center font-bold tracking-tight text-gray-400">Al mundo Oscuro</h3>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action="#" method="POST" className="space-y-6">
                                
                                <label htmlFor="id" className="block text-sm/6 font-medium text-gray-900">
                                    Identificación
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="id"
                                    name="id"
                                    type="number"
                                    required
                                    placeholder='Digita tu ID'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                                
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder='Digita tu contraseña'
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Iniciar Sesión
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
  }