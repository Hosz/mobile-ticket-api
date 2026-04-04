# mobile-ticket-api

API do sistema de controle de atendimento - UNINASSAU 2025

## Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/Hosz/mobile-ticket-api.git
cd mobile-ticket-api
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Criar o banco de dados
Abra o MySQL Workbench e execute:
```sql
CREATE DATABASE controle_de_atendimento;
```

### 4. Configurar o arquivo .env
Crie um arquivo `.env` na raiz do projeto. Voce pode copiar de `.env.example` ou usar:
```env
MYSQL_HOST=localhost
MYSQL_DB=controle_de_atendimento
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_PORT=3306
JWT_SECRET=change-me
PORT=3000
```

### 5. Rodar o servidor
```bash
npm run dev
```

As tabelas são criadas automaticamente no banco quando o servidor sobe.

## Endpoints disponíveis

- `GET /health` - Verifica se a API esta rodando
- `GET /guiches` - Lista todos os guiches
- `POST /guiches` - Cria um novo guiche
- `PUT /guiches/:id` - Atualiza um guiche
- `DELETE /guiches/:id` - Deleta um guiche
- `POST /senhas` - Emite uma nova senha
- `POST /senhas/chamar` - Chama a proxima senha da fila
- `GET /senhas/ultimas` - Lista as ultimas chamadas
