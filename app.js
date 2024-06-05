const express = require('express');
const sequelize = require('./sequelize');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware para permitir o uso de JSON nos corpos das requisições
app.use(express.json());

// Rotas de autenticação
app.use('/authRoutes', authRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
});
