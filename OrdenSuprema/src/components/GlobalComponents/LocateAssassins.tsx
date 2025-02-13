import { MapComponent } from "./MapComponent";
import { User } from "./types";
  
  // Crear la lista de usuarios
  const users: User[] = [
    { name: "París", location: { lat: 48.8566, lng: 2.3522 } },
    { name: "Londres", location: { lat: 51.5074, lng: -0.1278 } },
    { name: "Minas", location: { lat: 6.274951563732976, lng: -75.59143037110933 } },
    { name: "Tokio", location: { lat: 35.6895, lng: 139.6917 } },
  ];
  
export const LocateAssassins = () => {
  return (
    <div><MapComponent/></div>
  )
}
