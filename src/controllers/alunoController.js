const { alunoModel } = require('../models/alunoModel');
const { Op} = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils');

const alunoController = {

    listarAlunos: async (req, res) => {
        try {

            let alunos = await alunoModel.findAll();

            alunos = alunos.map(aluno => {
                aluno.dataNascimentoAluno = parseDateBd(aluno.dataNascimentoAluno);
                return aluno;
            });

            return res.status(200).json(alunos);

        } catch (error) {

            console.error(`Erro ao listar alunos: `, error);
            return res.status(500).json({ message: "Erro ao listar alunos" });

        }
    },

    cadastrarAluno: async (req, res) => {
        try {

            const { nome_Aluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno } = req.body;
            // Validação para garantir que todos os campos obrigatórios sejam fornecidos.
            if (!nome_Aluno || !cpfAluno || !dataNascimentoAluno || !emailAluno) {
                return res.status(400).json({ message: "Campos obrigatórios não inseridos!" });
            }
            // Faz uma busca no banco de dados para verificar se já existe usuario cadastrado com esses dados.
            let aluno = await alunoModel.findOne({
                where: {
                    [Op.or]: [
                        { cpfAluno },
                        { emailAluno }
                    ]
                }
            });

            if (aluno) {
                return res.status(409).json({ message: "Aluno já cadastrado!" });
            }

            await alunoModel.create({ nome_Aluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno });

            return res.status(201).json({ message: "Aluno cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar aluno!");
            return res.status(500).json({ message: "Erro ao cadastrar aluno!" });
        }
    },

    atualizarAluno: async (req, res) => {
        try {
            const { ID_Aluno } = req.params;
            const { nome_Aluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno } = req.body;



            let aluno = await alunoModel.findByPk(ID_Aluno);

            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado!" });
            }

            if (cpfAluno || emailAluno) {
                let aluno = await alunoModel.findOne({
                    where: {
                        [Op.or]: [
                            { cpfAluno },
                            { emailAluno }
                        ]
                    }
                });

                if (aluno) {
                    return res.status(409).json({ message: "Email ou CPF já cadastrados!" });
                }

            }

            let dadosAtualizados = { nome_Aluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno };

            await alunoModel.update(dadosAtualizados, { where: { ID_Aluno } });

            aluno = await alunoModel.findByPk(ID_Aluno);

            aluno.dataNascimentoAluno = parseDateBd(aluno.dataNascimentoAluno);

            return res.status(200).json({ message: "Aluno atualizado com sucesso: ", Aluno: aluno });

        } catch (error) {
            console.error("Erro ao atualizar aluno!");
            return res.status(500).json({ message: "Erro ao atualizar aluno!" });
        }

    },

    deletarAluno: async (req, res) => {
        try {
            
            const { ID_Aluno } = req.params;
    
            let aluno = await alunoModel.findByPk(ID_Aluno);
    
            if(!aluno){
                return res.status(404).json({message: "Aluno não encontrado!"});
            }
    
            let nomeAluno = aluno.nome_Aluno;

            let result = await alunoModel.destroy({where: {ID_Aluno}});

            if(result > 0){
                return res.status(200).json({message: `${nomeAluno} foi excluido com sucesso!`});
            }else{
                return res.status(404).json({message: "Erro ao excluir aluno!"});
            }

        } catch (error) {
            console.error("Erro ao excluir aluno", error);
            return res.status(500).json({message: "Erro ao excluir aluno!"});
        }     
    }

};

module.exports = { alunoController };
