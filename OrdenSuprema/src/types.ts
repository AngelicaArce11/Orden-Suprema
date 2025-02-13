// Definir el tipo de ubicación
interface Location {
    lat: number;
    lng: number;
  }
  
// Definir el tipo de usuario
interface User {
    name: string;
    location: Location;
}