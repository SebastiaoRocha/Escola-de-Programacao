const { alunoModel } = require('../models/alunoModel');

const alunoController = {
    listarAlunos: async (req,res)=>{
        try {
            
            let alunos = await alunoModel.findAll();

            return res.status(200).json(alunos);

        } catch (error) {
            
            console.error(`Erro ao listar alunos: `, error);
            return res.status(500).json({message: "Erro ao listar alunos"});

        }
    },
    cadastrarAluno:(req,res)=>{
        res.send("Usuário Cadastrado com sucesso!");
    },
    atualizarAluno:(req,res)=>{
        const {ID_Aluno} = req.params;
        res.send(`Usuário ${ID_Aluno} foi atualizado com sucesso!`);
    },
    deletarAluno:(req,res)=>{
        const {ID_Aluno} = req.params;
        res.send(`Usuário ${ID_Aluno} foi deletado com sucesso!`);
    }
};

module.exports = {alunoController};
