import { useEffect, useState } from "react";
import { User, Location } from "../../types";
import { Pay } from "../Assassin/pay";

interface LocationPaywallProps {
    users: User[];
    onSelectLocation: (location: Location) => void;
}



export const LocationPaywall = ({ users, onSelectLocation }: LocationPaywallProps) => {
    const [isPayed, setisPayed] = useState<boolean|null>(null);
    const [selectedUser, setSelectedUser] = useState<User|null>(null);
    const payValue = 49;

    const handleClick1 = (user:User) => {
        setisPayed(false)
        setSelectedUser(user)
    };
    useEffect(() => {
        if (isPayed && selectedUser) {
            onSelectLocation(selectedUser.location);
        }
    }, [isPayed]);

  return (
    <div className="py-6 mt-16 mb-auto">
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8 ">
    <div className="mb-10 md:mb-16">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Ubicar Asesinos
        </h2>

        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Elige al asesino que quieras ubicar
        </p>
    </div>

    {
    //End of text
    //Start of assassins
    }

    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {
        users.map((user) => (
        <div >
            <a href="javascript:void(0);"
               key={`map_btn${user.name}`}
               onClick={() => handleClick1(user)} 
               className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-800 shadow-lg lg:mb-3">
                <img src="https://lh3.googleusercontent.com/a-/ALV-UjWcy1cKKEpIwGka2J098OpWZ6j-WkYlXfeGpehBpV995cIc6vSXaA=s240-p-k-rw-no"
                     loading="lazy"
                     className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </a>

                <div className="flex items-start justify-between gap-2 px-2">
                <div className="flex flex-col">
                    <a onClick={() => handleClick1(user)}
                       href="javascript:void(0);"
                       className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
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
        ))
        }

    

    </div>
    <div id="infoPagoMapa">
        {isPayed === false &&
        <Pay message={'Hola'} payValue={payValue} onSuccess={setisPayed}/>
        }
    </div>
    
    </div>
    </div>
  )
  {/* isPayed !== null && !isPayed &&
            <div className="py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-800 p-4 sm:flex-row md:p-8">
                <div>
                    <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">Debes pagar para poder conocer la ultima ubicacion de {selectedUser?.name}</h2>
                </div>

            <a onClick={handleClick2} href="javascript:void(0);" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold !text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Pagar $50 ahora</a>
            </div>
            </div>
            </div>*/}
