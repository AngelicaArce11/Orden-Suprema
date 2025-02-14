import { Location } from "../types";

interface MapComponentProps {
    location: Location;
}

export const MapComponent = ({ location }: MapComponentProps) => {

  return (
    <div className="flex flex-col items-center gap-4">
      <iframe
        
        //key={`${location.lat},${location.lng}`} // Forzar recarga del iframe
        width="600"
        height="450"

        //loading="lazy"
        //allowFullScreen
        //referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
      ></iframe>
    </div>
  );
}
