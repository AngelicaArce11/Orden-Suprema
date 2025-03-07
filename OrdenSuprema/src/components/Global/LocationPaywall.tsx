import { useEffect, useRef, useState } from "react";
import { Pay } from "../Assassin/Pay";

interface LocationPaywallProps {
  users: Assassin[];
  onSelectLocation: (location: UserLocation) => void;
}

export const LocationPaywall = ({
  users,
  onSelectLocation,
}: LocationPaywallProps) => {
  const [isPayed, setisPayed] = useState<boolean | null>(null);
  const [selectedUser, setSelectedUser] = useState<Assassin | null>(null);
  const payValue = 49;
  const targetRef = useRef<HTMLDivElement>(null);

  const role_verification = () => {
    if (localStorage.role === "order") {
        return true;
    } else { return false}
  }

  const handleClick1 = (user: Assassin) => {
    setisPayed(role_verification); //Valor por defecto
    setSelectedUser(user); //Selecciona el asesino clickeado por el cliente
  };

  useEffect(() => {
    if (isPayed && selectedUser) {
      //Se selecciona la ubicación del asesino seleccionado para guardarla en archivo padre
      onSelectLocation({
        lat: selectedUser.latitude,
        lng: selectedUser.longitude,
      });
    };
  }, [isPayed, selectedUser]);

  useEffect(() => {
    if (isPayed === false && targetRef.current) {
      //Se selecciona la ubicación del asesino seleccionado para guardarla en archivo padre
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isPayed]);

  return (
    <div className="py-6 mt-16 mb-auto">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 ">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">
            Ubicar Asesinos
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-300 md:text-lg">
            Elige al asesino que quieras ubicar
          </p>
        </div>

        {
          //Fin del texto
          //Inicio de assassins
        }
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center">
          {users.map(
            (user) =>
              (JSON.parse(localStorage.user).id !== user.id) && (
                <div>
                  <a
                    href="javascript:void(0);"
                    key={`map_btn${user.name}`}
                    onClick={() => handleClick1(user)}
                    className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-800 shadow-lg lg:mb-3"
                  >
                    <img
                      src={
                        user.avatar +
                        `?size=${Math.floor(innerWidth / 3)}x${Math.floor(
                          innerWidth / 3
                        )}`
                      }
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </a>

                  <div className="flex items-start justify-between gap-2 px-2">
                    <div className="flex flex-col">
                      <a
                        onClick={() => handleClick1(user)}
                        href="javascript:void(0);"
                        className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                      >
                        {user.name}
                      </a>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-lg">
                        ${payValue}
                      </span>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        <div ref={targetRef}>
          {isPayed === false && (
            <Pay
              message={`¿Seguro que quieres ver la ubicación de ${selectedUser?.name}?`}
              payValue={payValue}
              onSuccess={setisPayed}
            />
          )}
        </div>
      </div>
    </div>
  );
};
