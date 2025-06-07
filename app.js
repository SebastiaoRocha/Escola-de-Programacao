const express = require('express');

//Importação de rotas.
const {rotasAlunos} = require('./src/routes/alunoRoutes');

//APP

const app = express(); // Cria uma instância do Express, armazenando todos os métodos e funcionalidades em 'app'.

const PORT = 8081; //Define a porta em que o servidor irá escutar as requisições.

app.use(express.json());// Configurar o body-parser para interpretar corpos de requisições no formato JSON.

app.use("/alunos", rotasAlunos);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
