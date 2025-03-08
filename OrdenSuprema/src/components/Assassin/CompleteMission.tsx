import axios from "axios";
import { useState } from "react";

export const CompleteMission = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageId, setImageId] = useState<number | null>(null);

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
      const response = await axios.put("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImageId(response.data.imageId);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <div className="mt-20">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Imagen</button>
      {imageId && <p>Imagen subida con ID: {imageId}</p>}
    </div>
  );
};
