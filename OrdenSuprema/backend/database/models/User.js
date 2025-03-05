import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("assassin", "order"),
      allowNull: false,
    },
    // Assassin attributes
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true, // Only used if type = 'assassin'
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true, // Only used if type = 'assassin'
    },
    totalCoins: {
      type: DataTypes.INTEGER,
      allowNull: true, // Only used if type = 'assassin'
      defaultValue: 0,
    },
    // Order attributes
    position: {
      type: DataTypes.STRING,
      allowNull: true, // Only used if type = 'order'
    },
  },
  {
    timestamps: false,
  }
);

// Scopes for filtering users
User.addScope("assassin", { where: { type: "assassin" } });
User.addScope("order", { where: { type: "order" } });
