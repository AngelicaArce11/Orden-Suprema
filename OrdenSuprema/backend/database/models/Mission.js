import { DataTypes} from "sequelize";
import { sequelize } from "../sequelize.js";
import { User } from "./User.js";


export const Mission = sequelize.define(
  "Mission",
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
      type: DataTypes.ENUM(
        "unassigned",
        "in_progress",
        "under_review",
        "completed",
        "failed"
      ),
      allowNull: false,
      defaultValue: "unassigned",
    },
    paymentValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    proofImage: {
      type: DataTypes.STRING, // URL or file path
      allowNull: true, // Might not be available until completion
    },
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true, // Might not be available until completion
    },
  },
  {
    timestamps: false,
  }
);

//Associations
Mission.belongsTo(User.scope('assassin'), { foreignKey: {name: 'assignedToId', allowNull: true}});
Mission.belongsTo(User, { foreignKey: {name: 'publishedById', allowNull: false}});
User.hasMany(Mission, { foreignKey: 'assignedToId' });
User.hasMany(Mission, { foreignKey: 'publishedById' });