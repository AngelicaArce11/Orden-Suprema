import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../database/models/User.js";


// Autenticar usuario para el login
export const loginUser = async (req, res) => {
   
  try {
    dotenv.config();
    const { email, password } = req.body;

    //Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    //Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    // console.log(process.env);
    // Generar token con JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ message: "Login exitoso", token, role: user.type});
    

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
