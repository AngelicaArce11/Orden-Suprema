import { Mission, User } from "./types";

export const users: User[] = [
    { name: "Jack el Destripador", location: { lat: 48.8566, lng: 2.3522 }, range: 'asesino', money: 500},
    { name: "Zodiaco", location: { lat: 51.5074, lng: -0.1278 }, range: 'asesino', money: 500 },
    { name: "Minero", location: { lat: 6.274951563732976, lng: -75.59143037110933 }, range: 'asesino', money: 500 },
    { name: "Ghostface", location: { lat: 35.6895, lng: 139.6917 }, range: 'asesino', money: 500 },
];

export const missions: Mission[] = [
    {
      id: 1,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjXyVUB3FmxSYINypqpldlPt1uJTVxrBpLmdgsNLCFk_j-vfyew=s240-p-k-rw-no",
      targetName: "Sofia Laurent",
      assassinName: "Ghost Whisper",
      payment: 12000,
      description: "Objetivo protegido, alto nivel de seguridad.",
      isCompleted: true
    },
    {
      id: 2,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjXhCr_KtxpZDEH1kxbSpMNzPPfcNTBLdK4E4-xlBZjSRQ7I7Mg=s240-p-k-rw-no",
      targetName: "John Doe",
      assassinName: "Shadow Reaper",
      payment: 5000,
      description: "Elimina al objetivo en su oficina sin dejar rastro.",
      isCompleted: false
    },
    {
      id: 3,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjUTVL87mIVrOCg_ohZ5oGkJtwMI0HMNBhZNAcr8lyq6Ai6hPJpD=s240-p-k-rw-no",
      targetName: "Elena Vasquez",
      assassinName: "Night Phantom",
      payment: 7500,
      description: "Asesinar al objetivo en un evento privado.",
      isCompleted: null // Estado desconocido
    },
    {
      id: 4,
      img: "https://lh3.googleusercontent.com/a-/ALV-UjVSV0QEwgeg2SdBEiOOMaZXqgIlwq4f7Shk2IJVBk9DkFRMFFW9=s240-p-k-rw-no",
      targetName: "Victor Kruger",
      assassinName: "Silent Viper",
      payment: 10000,
      description: "Objetivo de alto riesgo, requiere sigilo absoluto.",
      isCompleted: true
    },
    {
      id: 5,
      img: "https://lh3.googleusercontent.com/a/ACg8ocI4YYLooqPjmwFjFplURFCkZUIwMieqIoD-E0WLlnVQ6sHwwWqs=s240-p-k-rw-no",
      targetName: "Lucas Moretti",
      assassinName: "Dark Raven",
      payment: 6500,
      description: "Intercepción en aeropuerto, eliminar sin testigos.",
      isCompleted: false
    },
  ];
  