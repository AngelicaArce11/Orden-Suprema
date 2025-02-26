import { DataTypes} from "sequelize";
import { sequelize } from "../sequelize.js";
import { User } from "./User.js";


export const Mission = sequelize.define(
    'Mission',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        targetName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('completed', 'in_progress', 'under_review', 'unassigned', 'failed'),
            allowNull: false,
            defaultValue: 'unassigned'
        },
        paymentValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          proofImage: {
            type: DataTypes.STRING, // URL or file path
            allowNull: true, // Might not be available until completion
          },
    },
    {
        timestamps: false
    }
);

//Associations
Mission.belongsTo(User.scope('assassin'), { foreignKey: {name: 'assignedToId', allowNull: false}});
Mission.belongsTo(User, { foreignKey: {name: 'publishedById', allowNull: false}});
User.hasMany(Mission, { foreignKey: 'assignedById' });
User.hasMany(Mission, { foreignKey: 'publishedById' });