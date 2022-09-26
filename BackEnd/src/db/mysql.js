const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha',
  database: 'banco_de_dados',
});

connection.connect();

connection.query(`
    CREATE TABLE if not exists Question (
        categoria varchar(30) NOT NULL,
        pergunta varchar(500) NOT NULL,
        opcoes_a varchar(200) NOT NULL,
        opcao_b varchar(200) NOT NULL,
        opcao_c varchar(200) NOT NULL,
        opcao_d varchar(200) NOT NULL,
        resposta varchar(200) NOT NULL,
        ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY 
    );
`);

module.exports = connection;
