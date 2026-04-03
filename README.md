# mobile-ticket-api

API do sistema de controle de atendimento - UNINASSAU 2025

## Como rodar o projeto

### 1. Clonar o repositório
git clone https://github.com/Hosz/mobile-ticket-api.git
cd mobile-ticket-api

### 2. Instalar as dependências
npm install

### 3. Criar o banco de dados
Abra o MySQL Workbench e execute:
CREATE DATABASE controle_de_atendimento;

### 4. Configurar o arquivo .env
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
MYSQL_DB=controle_de_atendimento
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha_aqui(SE NAO TIVER SENHA DEIXE O "MYSQL_PASSWORD=" ASSIM )
MYSQL_PORT=3306
PORT=3000

### 5. Rodar o servidor
npm run dev

As tabelas são criadas automaticamente no banco quando o servidor sobe.

## Endpoints disponíveis

GET  /health         - Verifica se a API está rodando
GET  /guiches        - Lista todos os guichês
POST /guiches        - Cria um novo guichê
PUT  /guiches/:id    - Atualiza um guichê
DELETE /guiches/:id  - Deleta um guichê
POST /senhas/emitir  - Emite uma nova senha