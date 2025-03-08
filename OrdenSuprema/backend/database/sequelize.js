import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(
    'OrdenSuprema',
    'postgres',
    'capry2512',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);