import { Image } from "../database/models/Image.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() }); // Guarda el archivo en memoria temporalmente

// Subir imagen
export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }

  try {
    const newImage = await Image.create({ data: req.file.buffer });

    res.json({ message: "Imagen almacenada", imageId: newImage.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar la imagen" });
  }
};

// Obtener imagen por ID
export const getImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    res.set("Content-Type", "image/png"); // Ajusta según el formato
    res.send(image.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la imagen" });
  }
};

// Middleware para manejar la subida de imágenes con multer
export const uploadMiddleware = upload.single("image");
