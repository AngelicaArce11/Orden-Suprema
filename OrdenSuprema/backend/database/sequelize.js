import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    'OrdenSuprema',
    'postgres',
    'postgres123',
    {
        host: 'localhost',
        dialect: 'postgres'
    });

    // 'OrdenSuprema',
    // 'postgres',
    // 'postgres123',
    // {
    //     host: 'localhost',
    //     dialect: 'postgres'
    // }
// )