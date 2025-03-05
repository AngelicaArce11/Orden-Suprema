import { MapComponent } from "../../elements/Map";
import { NavBar } from "../../elements/NavBar";

import { useEffect, useRef, useState } from "react";
import { LocationPaywall } from "./LocationPaywall";
import axios from "axios";

/*  Crear la lista de usuarios
const oldUsers: User[] = [
  {
    name: "Jack el Destripador",
    location: { lat: 48.8566, lng: 2.3522 },
    range: "asesino",
    money: 500,
  },
  {
    name: "Zodiaco",
    location: { lat: 51.5074, lng: -0.1278 },
    range: "asesino",
    money: 500,
  },
  {
    name: "Minero",
    location: { lat: 6.274951563732976, lng: -75.59143037110933 },
    range: "asesino",
    money: 500,
  },
  {
    name: "Ghostface",
    location: { lat: 35.6895, lng: 139.6917 },
    range: "asesino",
    money: 500,
  },
];*/

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
