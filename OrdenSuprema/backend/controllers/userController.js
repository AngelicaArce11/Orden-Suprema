import { User } from "../database/models/User.js";
import { Op } from "sequelize";

export const getAllUsers = async (req, res) => { //Lista de todos los usuarios registrados
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getAllAssassins = async (req, res) => { //Lista de todos los Asesinos registrados
    try {
        const assassins = await User.scope('assassin').findAll();
        res.json(assassins);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getAllOrder = async (req, res) => { //Lista de todos los Miembros de la Orden (Admins) registrados
    try {
        const orderMembers = await User.scope('order').findAll();
        res.json(orderMembers);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createAssassin = async (req, res) => {
    try {
        const { id, name, email, password, latitude, longitude, totalCoins } = req.body

        // Verifica si el ID ya existe
        const existingUser = await User.findOne({ where: { id } });
        if (existingUser) {
            return res.status(400).json({ message: "El ID ya está en uso" });
        }

        // Verifica si el email ya existe
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: "El email ya está en uso" });
        }


        const newUser = await User.create({
            id: id,
            name: name,
            email: email,
            password: password,
            avatar: `https://robohash.org/set_set5/bgset_bg1/${email}`,
            type: 'assassin',
            latitude: latitude,
            longitude: longitude,
            totalCoins: totalCoins
        });
        res.json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message, errors: error.errors || [] });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { id, name, email, password, position } = req.body

        // Verifica si el ID ya existe
        const existingUser = await User.findOne({ where: { id } });
        if (existingUser) {
            return res.status(400).json({ message: "El ID ya está en uso" });
        }

        // Verifica si el email ya existe
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: "El email ya está en uso" });
        }

        const newUser = await User.create({
            id: id,
            name: name,
            email: email,
            password: password,
            avatar: `https://robohash.org/set_set4/bgset_bg1/${email}`,
            type: 'order',
            position: position
        });
        res.json(newUser);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateUser = async (req, res) => {
    try { //Pendiente por implementar
    const { id } = req.params;
    const {set} = req.body

    const user = await User.findByPk(id);
    user.avatar = `https://robohash.org/set_set${set}/bgset_bg1/${user.email}`;
    await user.save();

    res.json(user); 
    } catch (error) {
        return res.status(500).json({message: error.message});
}};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await User.destroy({
            where: {
                id
            }
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};