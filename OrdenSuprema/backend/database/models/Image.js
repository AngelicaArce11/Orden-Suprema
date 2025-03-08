import { DataTypes} from "sequelize";
import { sequelize } from "../sequelize.js";
import { Mission } from "./Mission.js";


export const Image = sequelize.define(
    'Image',
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        data: {
          type: DataTypes.BLOB("long"), // Almacena datos binarios
          allowNull: false,
        },
      },
      {
        timestamps: false
      }
);

//Association
//Transaction.belongsTo(User, { foreignKey: {name: 'userId', allowNull: false} });
//User.hasMany(Transaction, { foreignKey: 'userId' });

