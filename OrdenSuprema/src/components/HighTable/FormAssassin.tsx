import imagen from '../../assets/img/RegAssassin.jpg'
import axios from "axios";
import {useState } from "react";  

export const FormAssassin=()=> {

  // Obtener token almacenado
  const token = localStorage.getItem("token"); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
  });

  //Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevForm => {
      return {
        id: prevForm.id,
        name: prevForm.name,
        email: prevForm.email,
        [e.target.name]: e.target.value
      };
    });
  };

  //Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Evita que la página se recargue

    try {
      // Enviar la información al servidor
      await axios.post("http://localhost:3000/User/Assassin", {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        password: formData.id,
        // Coordenadas inciales por defecto aleatorias
        latitude : (Math.random() * 180 - 90).toFixed(6), 
        longitude : (Math.random() * 360 - 180).toFixed(6),
        totalCoins: 0
      },{
        // Se incluye token de autorización 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      alert("Registro exitoso");
      
      setFormData({
        id: "",
        name: "",
        email: "",
      });

    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
   
      <div className="relative w-screen h-screen overflow-hidden group">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 brightness-100 group-hover:brightness-70 "
          style={{ backgroundImage: `url(${imagen})` }} >
        </div> 

        <div className="relative flex items-center justify-center min-h-screen mt-7">
          <form onSubmit={handleSubmit} className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl w-full bg-slate-900 dark:bg-gray-900 p-13 rounded-lg shadow-md">

            <h2 className=" mb-10 text-center text-2xl/9 font-bold tracking-tight text-white">Registrar Asesino</h2>
            <div className="mb-7">
              <label className="block mb-2 text-sm font-medium text-gray-50 dark:text-white">
                Nombre
              </label>
              <input  
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow-xs bg-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  
                required />
            </div>

            <div className="mb-7">
              <label className="block mb-2 text-sm font-medium text-gray-50 dark:text-white">
                ID
              </label>
              <input 
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="shadow-xs bg-gray-700  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" 
                required />
            </div>

            <div className="mb-7">
                <label  htmlFor="email"  className="block mb-2 text-sm font-medium text-gray-50 dark:text-white">
                  Correo Electrónico
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className=" shadow-xs bg-gray-700  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" 
                  required />
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



