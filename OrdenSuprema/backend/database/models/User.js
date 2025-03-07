import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import bcrypt from "bcrypt";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      // autoIncrement: true,
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
      validate: {
        isEmail: true,
      },
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
    // Atributos del asesino
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true, // Solo usado si type = 'assassin'
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true, // Solo usado si type = 'assassin'
    },
    totalCoins: {
      type: DataTypes.INTEGER,
      allowNull: true, // Solo usado si type = 'assassin'
      defaultValue: 0,
    },
    // Atributos de la Orden 
    position: {
      type: DataTypes.STRING,
      allowNull: true, // Solo usado si type = 'order'
    },
  },
  {
    timestamps: false,
  }
);

// Scopes for filtering users
User.addScope("assassin", { where: { type: "assassin" } });
User.addScope("order", { where: { type: "order" } });

// Encriptar la contraseña antes de crear el usuario
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

