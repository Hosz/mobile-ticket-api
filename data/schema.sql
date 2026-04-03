CREATE DATABASE IF NOT EXISTS controle_de_atendimento
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE controle_de_atendimento;

CREATE TABLE IF NOT EXISTS usuarios (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(100) NOT NULL,
  login       VARCHAR(50)  NOT NULL UNIQUE,
  senha_hash  VARCHAR(255) NOT NULL,
  role        ENUM('atendente', 'admin') NOT NULL DEFAULT 'atendente',
  ativo       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guiches (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  numero      INT NOT NULL UNIQUE,
  status      ENUM('livre', 'ocupado') NOT NULL DEFAULT 'livre',
  usuario_id  INT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_guiche_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS senhas (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  numeracao   VARCHAR(20)  NOT NULL UNIQUE,
  tipo        ENUM('SP', 'SG', 'SE') NOT NULL,
  status      ENUM('AGUARDANDO', 'CHAMADA', 'EM_ATENDIMENTO', 'ATENDIDA', 'NAO_COMPARECEU', 'DESCARTADA') NOT NULL DEFAULT 'AGUARDANDO',
  emitida_em  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  chamada_em  DATETIME NULL,
  atendida_em DATETIME NULL,
  guiche_id   INT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_senha_guiche FOREIGN KEY (guiche_id)
    REFERENCES guiches(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS atendimentos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  senha_id    INT NOT NULL,
  guiche_id   INT NOT NULL,
  usuario_id  INT NOT NULL,
  inicio_em   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fim_em      DATETIME NULL,
  tm_real     DECIMAL(5,2) NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_atend_senha   FOREIGN KEY (senha_id)   REFERENCES senhas(id)    ON UPDATE CASCADE,
  CONSTRAINT fk_atend_guiche  FOREIGN KEY (guiche_id)  REFERENCES guiches(id)   ON UPDATE CASCADE,
  CONSTRAINT fk_atend_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)  ON UPDATE CASCADE
);

CREATE INDEX idx_senhas_tipo_status ON senhas(tipo, status);
CREATE INDEX idx_senhas_emitida_em  ON senhas(emitida_em);
CREATE INDEX idx_atend_inicio_em    ON atendimentos(inicio_em);
CREATE INDEX idx_atend_guiche       ON atendimentos(guiche_id);