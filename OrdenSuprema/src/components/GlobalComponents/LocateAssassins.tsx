import { MapComponent } from "../../elements/Map";
import { NavBar } from "../../elements/navBar";
import { User } from "../../types";
import { Location} from "../../types";
import { useState } from "react";
import { LocationPaywall } from "./LocationPaywall";
  
// Crear la lista de usuarios
const users: User[] = [
    { name: "Jack el Destripador", location: { lat: 48.8566, lng: 2.3522 }, range: 'asesino', money: 500},
    { name: "Zodiaco", location: { lat: 51.5074, lng: -0.1278 }, range: 'asesino', money: 500 },
    { name: "Minero", location: { lat: 6.274951563732976, lng: -75.59143037110933 }, range: 'asesino', money: 500 },
    { name: "Ghostface", location: { lat: 35.6895, lng: 139.6917 }, range: 'asesino', money: 500 },
];
  


export const LocateAssassins = () => {
    const [selectedLoc, setSelectedLoc] = useState<Location|null>(null);

const pickUser = (location: Location) => {
    setSelectedLoc(location);
}

    return (
        <div className="w-screen bg-transparent">
            <NavBar/>

            <LocationPaywall users={users} onSelectLocation={pickUser}/>
            {selectedLoc !== null && <MapComponent location={selectedLoc} />}
        </div>
    )
}
