const express = require('express');

const router = express.Router(); // Instancia o router, um objeto do Express usado para definir rotas de forma modular e organizado.

const {alunoController} = require('../controllers/alunoController');

// Rotas de Alunos
router.get("/", alunoController.listarAlunos); // Rota responsável por listar os alunos no sistema.

router.post("/", alunoController.cadastrarAluno);// Rota responsável por cadastrar um novo aluno.

router.put("/:ID_Aluno", alunoController.atualizarAluno); // Rota responsável por atualizar os dados de um aluno.

router.delete("/:ID_Aluno", alunoController.deletarAluno);// Rota responsável por deletar um aluno.

module.exports = {rotasAlunos: router};
