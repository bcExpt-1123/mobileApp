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

app.get('/', async (req, res) => {
  res.json('start');
});

app.listen(8000);

console.log('Running at Port 8000');

export default BB;
