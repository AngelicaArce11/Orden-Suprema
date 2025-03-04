import { User } from "../database/models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getAllAssassins = async (req, res) => {
    try {
        const assassins = await User.scope('assassin').findAll();
        res.json(assassins);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getAllOrder = async (req, res) => {
    try {
        const orderMembers = await User.scope('order').findAll();
        res.json(orderMembers);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createAssassin = async (req, res) => {
    try {
        const { name, email, password, latitude, longitude, totalCoins } = req.body
        const newUser = await User.create({
            name: name,
            email: email,
            password: password,
            type: 'assassin',
            latitude: latitude,
            longitude: longitude,
            totalCoins: totalCoins
        });
        res.json(newUser);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createOrder = async (req, res) => {
    try {
        const { name, email, password, position } = req.body
        const newUser = await User.create({
            name: name,
            email: email,
            password: password,
            type: 'order',
            position: position
        });
        res.json(newUser);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateUser = async (req, res) => {
    try {
    const { id } = req.params
    //Pendiente por implementar
    res.sendStatus(501);
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