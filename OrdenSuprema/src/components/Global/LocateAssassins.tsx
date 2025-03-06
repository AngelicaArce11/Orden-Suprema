import { MapComponent } from "../../elements/Map";
import { NavBar } from "../../elements/NavBar";

import { useEffect, useRef, useState } from "react";
import { LocationPaywall } from "./LocationPaywall";
import axios from "axios";


export const LocateAssassins = () => {
  const [users, setUsers] = useState([]); //Lista de Asesinos
  const [selectedLoc, setSelectedLoc] = useState<UserLocation | null>(null); //Ubicación del Asesino seleccionado por usuario
  const targetRef = useRef<HTMLDivElement>(null); //Usada para ScrollIntoView del mapa

  const pickUser = (location: UserLocation) => {
    setSelectedLoc(location);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/User/Assassin")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

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
      <NavBar user={"yo"} />

      <LocationPaywall users={users} onSelectLocation={pickUser} />
      <div ref={targetRef}>
        {selectedLoc !== null && <MapComponent location={selectedLoc} />}
      </div>
    </div>
  );
};
