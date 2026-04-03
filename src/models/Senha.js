import { DataTypes } from 'sequelize';
import { sequelize } from '../../mysql/src/instances/mysql.js';

const Senha = sequelize.define('senha', {
  numeracao: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  tipo: { type: DataTypes.ENUM('SP', 'SG', 'SE'), allowNull: false },
  status: { type: DataTypes.ENUM('AGUARDANDO', 'CHAMADA', 'EM_ATENDIMENTO', 'ATENDIDA', 'NAO_COMPARECEU', 'DESCARTADA'), defaultValue: 'AGUARDANDO' }
}, {
  tableName: 'senhas',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Senha;