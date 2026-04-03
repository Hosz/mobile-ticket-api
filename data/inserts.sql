USE controle_de_atendimento;

-- Admin padrao (senha: admin123)
INSERT INTO usuarios (nome, login, senha_hash, role) VALUES
('Administrador', 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Guiches iniciais
INSERT INTO guiches (numero) VALUES (1), (2), (3);

-- Senha de teste inserida durante desenvolvimento
INSERT INTO senhas (numeracao, tipo, status)
VALUES ('250402-SP001', 'SP', 'AGUARDANDO');