import { DataTypes } from 'sequelize';
import { sequelize } from '../../mysql/src/instances/mysql.js';

const Senha = sequelize.define('Senha', {
  codigo: { type: DataTypes.STRING },
  tipo: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'AGUARDANDO' },
  sequencia: { type: DataTypes.INTEGER }
});

export default Senha;