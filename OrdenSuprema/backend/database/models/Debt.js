import { DataTypes} from "sequelize";
import { sequelize } from "../sequelize.js";
import { User } from "./User.js";


export const Debt = sequelize.define(
    'Debt',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        proof_image: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.BLOB("long"),
            allowNull: true, // Might not be available until completion
          },
    },
    {
        timestamps: false
    }
);

//Associations
Debt.belongsTo(User.scope('assassin'), { foreignKey: {name: 'creditorId', allowNull: false}});
Debt.belongsTo(User.scope('assassin'), { foreignKey: {name: 'debtorId', allowNull: false}});
User.hasMany(Debt, { foreignKey: 'creditorId' });
User.hasMany(Debt, { foreignKey: 'debtorId' });