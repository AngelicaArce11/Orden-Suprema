//interface MapComponentProps {
//    users: User[];
//}

//export default function MapComponent({ users }: MapComponentProps) {
  // Resto del código...
//}

import { useState } from "react";

export const MapComponent = () => {
  const [location, setLocation] = useState({ lat: 6.274994221961694, lng: -75.59144109994534 }); // Nueva York por defecto

  const updateLocation = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Mapa Dinámico con Google Maps Embed API</h2>
      
      <iframe
        
        //key={`${location.lat},${location.lng}`} // Forzar recarga del iframe
        width="600"
        height="450"

        //loading="lazy"
        //allowFullScreen
        //referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
      ></iframe>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => updateLocation(48.8566, 2.3522)}>París</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => updateLocation(51.5074, -0.1278)}>Londres</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => updateLocation(6.274951563732976, -75.59143037110933)}>Minas</button>
      </div>
    </div>
  );
}
