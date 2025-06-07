const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const alunoModel = sequelize.define('Alunos', {
    ID_Aluno:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_Aluno:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpfAluno:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dataNascimentoAluno:{
        type: DataTypes.DATEONLY,// Tipo de dado apenas com a data (sem hora)
        allowNull: false
    },
    emailAluno:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefoneAluno:{
        type: DataTypes.STRING,
        allowNull: true
    },
    enderecoAluno:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'Alunos',
    timestamps: false
});

module.exports = {alunoModel};