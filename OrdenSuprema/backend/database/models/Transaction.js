import { DataTypes} from "sequelize";
import { sequelize } from "../sequelize.js";
import { User } from "./User.js";


export const Transaction = sequelize.define(
    'Transaction',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.ENUM('deposit', 'withdrawal', 'payment', 'reward'),
            allowNull: false,
        },
            amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: false
    }
);

//Association
Transaction.belongsTo(User, { foreignKey: {name: 'userId', allowNull: false} });
User.hasMany(Transaction, { foreignKey: 'userId' });

