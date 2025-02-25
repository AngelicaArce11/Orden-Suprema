import { Location } from "../types";

interface MapComponentProps {
    location: Location;
}

export const MapComponent = ({ location }: MapComponentProps) => {

return (
      <div className="w-9/10 px-4 mb-8 mt-8 mx-auto flex justify-center">
        <div className="relative w-full h-full max-h-[80vh] aspect-[3/4]">
          <iframe
            key={`${location.lat},${location.lng}`} // Force reload on location change
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
          ></iframe>
        </div>
      </div>
    );
}
