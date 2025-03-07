import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../database/models/User.js";

// Verificar la autenticación del usuario
export const verifyToken = async (req, res, next) => {
  try {

    dotenv.config();

    //Se obtiene el token del header que viene de la forma "Bearer token"
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) {
      return res.status(403).json({ message: "Acceso denegado. No hay token." });
    }
    // Verificar el token con la clave del archivo .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Buscar usuario en la base de datos
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Guardar el tipo del usuario en req para los permisos
    req.userType = user.type; 
    next();

  } catch (error) {
      return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

// Verificar el rol del usuario para el acceso a las rutas
export const verifyRole = (rolesPermitidos) => (req, res, next) => {
  if (!rolesPermitidos.includes(req.userType)) {
    return res.status(403).json({ message: "Acceso denegado. No tienes permiso." });
  }
  next();
};
