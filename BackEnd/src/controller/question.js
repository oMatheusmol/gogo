const connection = require('../db/mysql');

const read = async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    connection.query('SELECT * FROM Question', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.status(200).send(results);
    });
  } catch {
    res.status(401).send('Error! read');
  }
};

const create = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  const { category, question, options, answer } = req.body;

  connection.query(`insert into Question(categoria, pergunta, opcoes_a, opcao_b, opcao_c, opcao_d, resposta) 
  values ("${category}",  
  "${question}",
  "${options[0]}","${options[1]}", "${options[2]}", "${options[3]}", "${answer}"
  )`);

  res.status(201).send('Question inserted');
};

module.exports = {
  read,
  create,
};
