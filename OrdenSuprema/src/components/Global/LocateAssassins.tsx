import { MapComponent } from "../../elements/Map";

import { useEffect, useRef, useState } from "react";
import { LocationPaywall } from "./LocationPaywall";
import axios from "axios";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi2";

export const LocateAssassins = () => {
  const [empty, setEmpty] = useState(false);
  const [users, setUsers] = useState([]); //Lista de Asesinos
  const [selectedLoc, setSelectedLoc] = useState<UserLocation | null>(null); //Ubicación del Asesino seleccionado por usuario
  const targetRef = useRef<HTMLDivElement>(null); //Usada para ScrollIntoView del mapa

  const pickUser = (location: UserLocation) => {
    setSelectedLoc(location);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/User/Assassin")
      .then((response) => { setUsers(response.data); })
      .catch((error) => console.error("Error fetching users:", error));
      
  }, []);

  useEffect(() => {
    setEmpty(users.length === 0);
  }, [users]); 

  //ScrollIntoView del mapa
  useEffect(() => {
    if (selectedLoc !== null && targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedLoc]);

  return (
    <div className="w-screen bg-transparent">
      {empty ? (
        <div className="flex justify-center items-center mt-30">
          <Alert
            color="failure"
            icon={() => <HiInformationCircle size={30} className="m-2" />}
          >
            <span className="font-semibold text-sm lg:text-xl ">
              No hay Asesinos registrados en el Sistema.
            </span>
          </Alert>
        </div>
      ) : (
        <>
          <LocationPaywall users={users} onSelectLocation={pickUser} />
          <div ref={targetRef}>
            {selectedLoc !== null && <MapComponent location={selectedLoc} />}
          </div>
        </>
      )}
    </div>
  );
};
