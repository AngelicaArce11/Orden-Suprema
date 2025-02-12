import imagen from '../../assets/img/RegAssassin.jpg'

export const FormAsesino=()=> {
    return (
    <>
      <div className="relative w-screen h-screen group">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 brightness-100 group-hover:brightness-70 "
          style={{ backgroundImage: `url(${imagen})` }} >
        </div> 

        <div className="relative flex items-center justify-center min-h-screen">
          <form className="max-w-sm w-full bg-gray-100 dark:bg-gray-900 p-10 rounded-lg shadow-md">

            <h2 className="mt-10 mb-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Registrar Asesino</h2>
            <div className="mb-7">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre
              </label>
              <input  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  required />
            </div>

            <div className="mb-7">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ID
              </label>
              <input type='number' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
            </div>

            <div className="mb-7">
                <label  htmlFor="email"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Correo Electrónico
                </label>
                <input type="email" id="email" className=" shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
            </div>

            <div className="w-full flex justify-center items-center mt-10">
              <button type="submit" className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Registrar
              </button>
              <button type="submit" className=" ml-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Cancelar
              </button>  
            </div>

          </form>
        </div>
        
      </div>
    </>
    )
  } 



