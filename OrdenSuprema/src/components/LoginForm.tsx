import imagen1 from "../assets/icons/login.png";
import imagen from "../assets/img/inicio.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = ({setUserRole,}: {setUserRole: (role: string | null) => void;}) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const navigate = useNavigate();

  //Manejo de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevForm) => {
      return {
        email: prevForm.email,
        password: prevForm.password,
        [e.target.name]: e.target.value,
      };
    });
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude);
        },
        (err) => {console.error(err)},
        {maximumAge: 10000}
    );
  };

  const locationUpdate = (id: number, lat: number, lon: number) => {
    axios
      .put(`http://localhost:3000/UserById/location/${id}`, {
        latitude: lat,
        longitude: lon
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setLatitude(0);
        setLongitude(0);
      })
      .catch((error) => {
        console.error("Error fetch location:", error);
      });
  };


  // Envío de la información del loguin
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    try {
      // Solicitud en para el backend
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );

      // Guarda el token y el rol en localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUserRole(response.data.role);

      // Redirecciona al usuario según su rol
      if (response.data.role === "assassin") {
        navigate("/missionsAssassin");
        //Actualiza la ubicación del Asesino
        locationUpdate(JSON.parse(localStorage.user).id, latitude, longitude);
      } else if (response.data.role === "order") {
        navigate("/highProfile");
      }
    } catch (error) {
      alert("Error en el login. Verifica tus credenciales por favor");
      console.error("Error en el login:", error);
    }
  };

  return (
    <>
      <div className="relative w-screen h-screen group justify-center items-center flex">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-20 "
          style={{ backgroundImage: `url(${imagen})` }}
        ></div>

        <div className="relative flex items-center justify-center md:justify-end  min-h-screen">
          <div className="w-[450px] bg-gray-800  p-7 rounded-lg shadow-md">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  alt="The High Table"
                  src={imagen1}
                  className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-100">
                  Inicio de sesión
                </h2>
                <h3 className="text-center font-bold tracking-tight text-gray-300">
                  Al mundo Oscuro
                </h3>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  onSubmit={handleSubmit}
                  method="POST"
                  className="space-y-6 "
                >
                  <label
                    htmlFor="id"
                    className="block  text-sm/6 font-medium text-gray-100"
                  >
                    Correo
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      required
                      placeholder="Digita tu correo"
                      className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>

                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    Contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      required
                      placeholder="Digita tu contraseña"
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-left"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 mt-10 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Iniciar Sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
