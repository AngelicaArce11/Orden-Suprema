import axios from "axios";
import { useState } from "react";

export const UploadImage = ({ missionId = 3 }: { missionId: number }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.put(`http://localhost:3000/Mission/complete/${missionId}`, formData,  {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Misión completada con éxito");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <div className="mt-20">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Imagen</button>
    </div>
  );
};
