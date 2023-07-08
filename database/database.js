const Sequelize = require("sequelize");
//conexão com o banco de dados do mysql
const connection = new Sequelize("trabalho_sexto_ano", "root", "admin", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;