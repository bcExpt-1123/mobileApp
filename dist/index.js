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
            _context.next = 15;
            break;
          }

          bb = new _bb["default"]();
          branch = req.body.agencia;
          account = req.body.conta;
          password = req.body.pass;
          _context.next = 10;
          return _regenerator["default"].awrap(bb.login({
            branch: branch,
            account: account,
            password: password
          }));

        case 10:
          name = _context.sent;
          _context.next = 13;
          return _regenerator["default"].awrap(bb.checking.getBalance());

        case 13:
          checkingBalance = _context.sent;
          console.log(name.nomeCliente, checkingBalance);

        case 15:
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

          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          res.json({
            name: '',
            balance: ''
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
app.get('/', function _callee2(req, res) {
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.json('start');

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.listen(8000);
console.log('Running at Port 8000');
var _default = _bb["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map