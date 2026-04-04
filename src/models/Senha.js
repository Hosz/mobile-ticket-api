import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Senha = sequelize.define('senha', {
  numeracao: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  tipo: {
    type: DataTypes.ENUM('SP', 'SG', 'SE'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(
      'AGUARDANDO',
      'CHAMADA',
      'EM_ATENDIMENTO',
      'ATENDIDA',
      'NAO_COMPARECEU',
      'DESCARTADA'
    ),
    defaultValue: 'AGUARDANDO',
  },
  emitida_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  chamada_em: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  atendida_em: {
    type: DataTypes.DATE,
    allowNull: true
  },
  guiche_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, 
{
  tableName: 'senhas',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Senha;