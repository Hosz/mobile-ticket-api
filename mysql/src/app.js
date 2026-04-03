import dotenv from 'dotenv';
import { sequelize } from './instances/mysql.js'; 

dotenv.config();

async function main(){
    try{
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados feita com sucesso!');
    }catch(err){
        console.error(err);
    }
}

main();