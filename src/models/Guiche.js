import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Guiche = sequelize.define('Guiche', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('livre', 'ocupado'),
    defaultValue: 'livre',
  },
}, {
  tableName: 'guiches',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Guiche;