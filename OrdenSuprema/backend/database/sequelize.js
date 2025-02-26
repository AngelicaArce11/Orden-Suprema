import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(
    'OrdenSuprema',
    'postgres',
    'postgres123',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);