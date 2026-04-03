import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sequelize } from '../mysql/src/instances/mysql.js';
import guicheRoutes from './routes/guicheRoutes.js';
import senhaRoutes from './routes/senhaRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ message: 'API rodando' });
});

app.use('/guiches', guicheRoutes);
app.use('/senhas', senhaRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Banco conectado!');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  } catch (err) {
    console.error('Erro ao conectar:', err);
  }
}

main();