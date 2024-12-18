import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context22; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context22 = Object.prototype.toString.call(o)).call(_context22, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context20, _context21; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context20 = ownKeys(Object(t), !0)).call(_context20, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context21 = ownKeys(Object(t))).call(_context21, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.regexp.to-string.js";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reduce";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
/**
 * @file Command line interface for JSforce
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import http from 'http';
import url from 'url';
import crypto from 'crypto';
import _openUrl from 'open';
import { Command } from 'commander';
import inquirer from 'inquirer';
import request from '../request';
import base64url from 'base64url';
import Repl from './repl';
import jsforce, { Connection, OAuth2 } from '..';
import version from '../VERSION';
var registry = jsforce.registry;
/**
 *
 */
export var Cli = /*#__PURE__*/function () {
  function Cli() {
    _classCallCheck(this, Cli);
    _defineProperty(this, "_repl", new Repl(this));
    _defineProperty(this, "_conn", new Connection());
    _defineProperty(this, "_connName", undefined);
    _defineProperty(this, "_outputEnabled", true);
    _defineProperty(this, "_defaultLoginUrl", undefined);
  }
  return _createClass(Cli, [{
    key: "readCommand",
    value:
    /**
     *
     */
    function readCommand() {
      return new Command().option('-u, --username [username]', 'Salesforce username').option('-p, --password [password]', 'Salesforce password (and security token, if available)').option('-c, --connection [connection]', 'Connection name stored in connection registry').option('-l, --loginUrl [loginUrl]', 'Salesforce login url').option('--sandbox', 'Login to Salesforce sandbox').option('-e, --evalScript [evalScript]', 'Script to evaluate').version(version).parse(process.argv);
    }
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var program;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              program = this.readCommand();
              this._outputEnabled = !program.evalScript;
              _context.prev = 2;
              _context.next = 5;
              return this.connect(program);
            case 5:
              if (program.evalScript) {
                this._repl.start({
                  interactive: false,
                  evalScript: program.evalScript
                });
              } else {
                this._repl.start();
              }
              _context.next = 12;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              console.error(_context.t0);
              process.exit();
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[2, 8]]);
      }));
      function start() {
        return _start.apply(this, arguments);
      }
      return start;
    }()
  }, {
    key: "getCurrentConnection",
    value: function getCurrentConnection() {
      return this._conn;
    }
  }, {
    key: "print",
    value: function print() {
      if (this._outputEnabled) {
        var _console;
        (_console = console).log.apply(_console, arguments);
      }
    }
  }, {
    key: "saveCurrentConnection",
    value: function saveCurrentConnection() {
      if (this._connName) {
        var conn = this._conn;
        var connName = this._connName;
        var connConfig = {
          oauth2: conn.oauth2 ? {
            clientId: conn.oauth2.clientId || undefined,
            clientSecret: conn.oauth2.clientSecret || undefined,
            redirectUri: conn.oauth2.redirectUri || undefined,
            loginUrl: conn.oauth2.loginUrl || undefined
          } : undefined,
          accessToken: conn.accessToken || undefined,
          instanceUrl: conn.instanceUrl || undefined,
          refreshToken: conn.refreshToken || undefined
        };
        registry.saveConnectionConfig(connName, connConfig);
      }
    }
  }, {
    key: "setLoginServer",
    value: function setLoginServer(loginServer) {
      if (!loginServer) {
        return;
      }
      if (loginServer === 'production') {
        this._defaultLoginUrl = 'https://login.salesforce.com';
      } else if (loginServer === 'sandbox') {
        this._defaultLoginUrl = 'https://test.salesforce.com';
      } else if (!_startsWithInstanceProperty(loginServer).call(loginServer, 'https://')) {
        this._defaultLoginUrl = 'https://' + loginServer;
      } else {
        this._defaultLoginUrl = loginServer;
      }
      this.print("Using \"".concat(this._defaultLoginUrl, "\" as default login URL."));
    }

    /**
     *
     */
  }, {
    key: "connect",
    value: (function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(options) {
        var _this = this;
        var loginServer, connConfig, username, password, identity;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              loginServer = options.loginUrl ? options.loginUrl : options.sandbox ? 'sandbox' : null;
              this.setLoginServer(loginServer);
              this._connName = options.connection;
              _context2.next = 5;
              return registry.getConnectionConfig(options.connection);
            case 5:
              connConfig = _context2.sent;
              username = options.username;
              if (!connConfig) {
                connConfig = {};
                if (this._defaultLoginUrl) {
                  connConfig.loginUrl = this._defaultLoginUrl;
                }
                username = username || options.connection;
              }
              this._conn = new Connection(connConfig);
              password = options.password;
              if (!username) {
                _context2.next = 16;
                break;
              }
              _context2.next = 13;
              return this.startPasswordAuth(username, password);
            case 13:
              this.saveCurrentConnection();
              _context2.next = 34;
              break;
            case 16:
              if (!(this._connName && this._conn.accessToken)) {
                _context2.next = 34;
                break;
              }
              this._conn.on('refresh', function () {
                _this.print('Refreshing access token ... ');
                _this.saveCurrentConnection();
              });
              _context2.prev = 18;
              _context2.next = 21;
              return this._conn.identity();
            case 21:
              identity = _context2.sent;
              this.print("Logged in as : ".concat(identity.username));
              _context2.next = 34;
              break;
            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](18);
              if (_context2.t0 instanceof Error) {
                this.print(_context2.t0.message);
              }
              if (!this._conn.oauth2) {
                _context2.next = 32;
                break;
              }
              throw new Error('Please re-authorize connection.');
            case 32:
              _context2.next = 34;
              return this.startPasswordAuth(this._connName);
            case 34:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[18, 25]]);
      }));
      function connect(_x) {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
    /**
     *
     */
    )
  }, {
    key: "startPasswordAuth",
    value: (function () {
      var _startPasswordAuth = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(username, password) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return this.loginByPassword(username, password, 2);
            case 3:
              _context3.next = 12;
              break;
            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
              if (!(_context3.t0 instanceof Error && _context3.t0.message === 'canceled')) {
                _context3.next = 11;
                break;
              }
              console.error('Password authentication canceled: Not logged in');
              _context3.next = 12;
              break;
            case 11:
              throw _context3.t0;
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 5]]);
      }));
      function startPasswordAuth(_x2, _x3) {
        return _startPasswordAuth.apply(this, arguments);
      }
      return startPasswordAuth;
    }()
    /**
     *
     */
    )
  }, {
    key: "loginByPassword",
    value: (function () {
      var _loginByPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(username, password, retryCount) {
        var pass, result;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(password === '')) {
                _context4.next = 2;
                break;
              }
              throw new Error('canceled');
            case 2:
              if (!(password == null)) {
                _context4.next = 7;
                break;
              }
              _context4.next = 5;
              return this.promptPassword('Password: ');
            case 5:
              pass = _context4.sent;
              return _context4.abrupt("return", this.loginByPassword(username, pass, retryCount));
            case 7:
              _context4.prev = 7;
              _context4.next = 10;
              return this._conn.login(username, password);
            case 10:
              result = _context4.sent;
              this.print("Logged in as : ".concat(username));
              return _context4.abrupt("return", result);
            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](7);
              if (_context4.t0 instanceof Error) {
                console.error(_context4.t0.message);
              }
              if (!(retryCount > 0)) {
                _context4.next = 22;
                break;
              }
              return _context4.abrupt("return", this.loginByPassword(username, undefined, retryCount - 1));
            case 22:
              throw new Error('canceled');
            case 23:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[7, 15]]);
      }));
      function loginByPassword(_x4, _x5, _x6) {
        return _loginByPassword.apply(this, arguments);
      }
      return loginByPassword;
    }()
    /**
     *
     */
    )
  }, {
    key: "disconnect",
    value: (function () {
      var _disconnect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(connName) {
        var name;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              name = connName || this._connName;
              _context5.t0 = name;
              if (!_context5.t0) {
                _context5.next = 6;
                break;
              }
              _context5.next = 5;
              return registry.getConnectionConfig(name);
            case 5:
              _context5.t0 = _context5.sent;
            case 6:
              if (!_context5.t0) {
                _context5.next = 10;
                break;
              }
              _context5.next = 9;
              return registry.removeConnectionConfig(name);
            case 9:
              this.print("Disconnect connection '".concat(name, "'"));
            case 10:
              this._connName = undefined;
              this._conn = new Connection();
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function disconnect(_x7) {
        return _disconnect.apply(this, arguments);
      }
      return disconnect;
    }()
    /**
     *
     */
    )
  }, {
    key: "authorize",
    value: (function () {
      var _authorize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(clientName) {
        var name, oauth2Config, oauth2, verifier, challenge, state, authzUrl, params, identity;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              name = clientName || 'default';
              _context6.next = 3;
              return registry.getClientConfig(name);
            case 3:
              oauth2Config = _context6.sent;
              if (oauth2Config !== null && oauth2Config !== void 0 && oauth2Config.clientId) {
                _context6.next = 9;
                break;
              }
              if (!(name === 'default' || name === 'sandbox')) {
                _context6.next = 8;
                break;
              }
              this.print('No client information registered. Downloading JSforce default client information...');
              return _context6.abrupt("return", this.downloadDefaultClientInfo(name));
            case 8:
              throw new Error("No OAuth2 client information registered : '".concat(name, "'. Please register client info first."));
            case 9:
              oauth2 = new OAuth2(oauth2Config);
              verifier = base64url.encode(crypto.randomBytes(32));
              challenge = base64url.encode(crypto.createHash('sha256').update(verifier).digest());
              state = base64url.encode(crypto.randomBytes(32));
              authzUrl = oauth2.getAuthorizationUrl({
                code_challenge: challenge,
                state: state
              });
              this.print('Opening authorization page in browser...');
              this.print("URL: ".concat(authzUrl));
              this.openUrl(authzUrl);
              _context6.next = 19;
              return this.waitCallback(oauth2Config.redirectUri, state);
            case 19:
              params = _context6.sent;
              if (params.code) {
                _context6.next = 22;
                break;
              }
              throw new Error('No authorization code returned.');
            case 22:
              if (!(params.state !== state)) {
                _context6.next = 24;
                break;
              }
              throw new Error('Invalid state parameter returned.');
            case 24:
              this._conn = new Connection({
                oauth2: oauth2
              });
              this.print('Received authorization code. Please close the opened browser window.');
              _context6.next = 28;
              return this._conn.authorize(params.code, {
                code_verifier: verifier
              });
            case 28:
              this.print('Authorized. Fetching user info...');
              _context6.next = 31;
              return this._conn.identity();
            case 31:
              identity = _context6.sent;
              this.print("Logged in as : ".concat(identity.username));
              this._connName = identity.username;
              this.saveCurrentConnection();
            case 35:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function authorize(_x8) {
        return _authorize.apply(this, arguments);
      }
      return authorize;
    }()
    /**
     *
     */
    )
  }, {
    key: "downloadDefaultClientInfo",
    value: (function () {
      var _downloadDefaultClientInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(clientName) {
        var configUrl, res, clientConfig;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              configUrl = 'https://jsforce.github.io/client-config/default.json';
              _context7.next = 3;
              return new _Promise(function (resolve, reject) {
                request({
                  method: 'GET',
                  url: configUrl
                }).on('complete', resolve).on('error', reject);
              });
            case 3:
              res = _context7.sent;
              clientConfig = JSON.parse(res.body);
              if (clientName === 'sandbox') {
                clientConfig.loginUrl = 'https://test.salesforce.com';
              }
              _context7.next = 8;
              return registry.registerClientConfig(clientName, clientConfig);
            case 8:
              this.print('Client information downloaded successfully.');
              return _context7.abrupt("return", this.authorize(clientName));
            case 10:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function downloadDefaultClientInfo(_x9) {
        return _downloadDefaultClientInfo.apply(this, arguments);
      }
      return downloadDefaultClientInfo;
    }())
  }, {
    key: "waitCallback",
    value: function () {
      var _waitCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(serverUrl, state) {
        var code;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (!(serverUrl && _startsWithInstanceProperty(serverUrl).call(serverUrl, 'http://localhost:'))) {
                _context8.next = 4;
                break;
              }
              return _context8.abrupt("return", new _Promise(function (resolve, reject) {
                var server = http.createServer(function (req, res) {
                  if (!req.url) {
                    return;
                  }
                  var qparams = url.parse(req.url, true).query;
                  res.writeHead(200, {
                    'Content-Type': 'text/html'
                  });
                  res.write('<html><script>location.href="about:blank";</script></html>');
                  res.end();
                  if (qparams.error) {
                    reject(new Error(qparams.error));
                  } else {
                    resolve(qparams);
                  }
                  server.close();
                  req.connection.end();
                  req.connection.destroy();
                });
                var port = Number(url.parse(serverUrl).port);
                server.listen(port, 'localhost');
              }));
            case 4:
              _context8.next = 6;
              return this.promptMessage('Copy & paste authz code passed in redirected URL: ');
            case 6:
              code = _context8.sent;
              return _context8.abrupt("return", {
                code: decodeURIComponent(code),
                state: state
              });
            case 8:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function waitCallback(_x10, _x11) {
        return _waitCallback.apply(this, arguments);
      }
      return waitCallback;
    }()
    /**
     *
     */
  }, {
    key: "register",
    value: (function () {
      var _register = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(clientName, clientConfig) {
        var _context9,
          _this2 = this;
        var name, prompts, registered, msg, ok;
        return _regeneratorRuntime.wrap(function _callee10$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              name = clientName || 'default';
              prompts = {
                clientId: 'Input client ID : ',
                clientSecret: 'Input client secret (optional) : ',
                redirectUri: 'Input redirect URI : ',
                loginUrl: 'Input login URL (default is https://login.salesforce.com) : '
              };
              _context11.next = 4;
              return registry.getClientConfig(name);
            case 4:
              registered = _context11.sent;
              if (!registered) {
                _context11.next = 12;
                break;
              }
              msg = "Client '".concat(name, "' is already registered. Are you sure you want to override ? [yN] : ");
              _context11.next = 9;
              return this.promptConfirm(msg);
            case 9:
              ok = _context11.sent;
              if (ok) {
                _context11.next = 12;
                break;
              }
              throw new Error('Registration canceled.');
            case 12:
              _context11.next = 14;
              return _reduceInstanceProperty(_context9 = _Object$keys(prompts)).call(_context9, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(promise, name) {
                  var cconfig, promptName, message, value;
                  return _regeneratorRuntime.wrap(function _callee9$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return promise;
                      case 2:
                        cconfig = _context10.sent;
                        promptName = name;
                        message = prompts[promptName];
                        if (cconfig[promptName]) {
                          _context10.next = 11;
                          break;
                        }
                        _context10.next = 8;
                        return _this2.promptMessage(message);
                      case 8:
                        value = _context10.sent;
                        if (!value) {
                          _context10.next = 11;
                          break;
                        }
                        return _context10.abrupt("return", _objectSpread(_objectSpread({}, cconfig), {}, _defineProperty({}, promptName, value)));
                      case 11:
                        return _context10.abrupt("return", cconfig);
                      case 12:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee9);
                }));
                return function (_x14, _x15) {
                  return _ref.apply(this, arguments);
                };
              }(), _Promise.resolve(clientConfig));
            case 14:
              clientConfig = _context11.sent;
              _context11.next = 17;
              return registry.registerClientConfig(name, clientConfig);
            case 17:
              this.print('Client registered successfully.');
            case 18:
            case "end":
              return _context11.stop();
          }
        }, _callee10, this);
      }));
      function register(_x12, _x13) {
        return _register.apply(this, arguments);
      }
      return register;
    }()
    /**
     *
     */
    )
  }, {
    key: "listConnections",
    value: (function () {
      var _listConnections = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11() {
        var names, _iterator, _step, name;
        return _regeneratorRuntime.wrap(function _callee11$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return registry.getConnectionNames();
            case 2:
              names = _context12.sent;
              _iterator = _createForOfIteratorHelper(names);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  name = _step.value;
                  this.print((name === this._connName ? '* ' : '  ') + name);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            case 5:
            case "end":
              return _context12.stop();
          }
        }, _callee11, this);
      }));
      function listConnections() {
        return _listConnections.apply(this, arguments);
      }
      return listConnections;
    }()
    /**
     *
     */
    )
  }, {
    key: "getConnectionNames",
    value: (function () {
      var _getConnectionNames = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12() {
        return _regeneratorRuntime.wrap(function _callee12$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", registry.getConnectionNames());
            case 1:
            case "end":
              return _context13.stop();
          }
        }, _callee12);
      }));
      function getConnectionNames() {
        return _getConnectionNames.apply(this, arguments);
      }
      return getConnectionNames;
    }()
    /**
     *
     */
    )
  }, {
    key: "getClientNames",
    value: (function () {
      var _getClientNames = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13() {
        return _regeneratorRuntime.wrap(function _callee13$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", registry.getClientNames());
            case 1:
            case "end":
              return _context14.stop();
          }
        }, _callee13);
      }));
      function getClientNames() {
        return _getClientNames.apply(this, arguments);
      }
      return getClientNames;
    }()
    /**
     *
     */
    )
  }, {
    key: "prompt",
    value: (function () {
      var _prompt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(type, message) {
        var answer;
        return _regeneratorRuntime.wrap(function _callee14$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              this._repl.pause();
              _context15.next = 3;
              return inquirer.prompt([{
                type: type,
                name: 'value',
                message: message
              }]);
            case 3:
              answer = _context15.sent;
              this._repl.resume();
              return _context15.abrupt("return", answer.value);
            case 6:
            case "end":
              return _context15.stop();
          }
        }, _callee14, this);
      }));
      function prompt(_x16, _x17) {
        return _prompt.apply(this, arguments);
      }
      return prompt;
    }()
    /**
     *
     */
    )
  }, {
    key: "promptMessage",
    value: (function () {
      var _promptMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(message) {
        return _regeneratorRuntime.wrap(function _callee15$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", this.prompt('input', message));
            case 1:
            case "end":
              return _context16.stop();
          }
        }, _callee15, this);
      }));
      function promptMessage(_x18) {
        return _promptMessage.apply(this, arguments);
      }
      return promptMessage;
    }())
  }, {
    key: "promptPassword",
    value: function () {
      var _promptPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(message) {
        return _regeneratorRuntime.wrap(function _callee16$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              return _context17.abrupt("return", this.prompt('password', message));
            case 1:
            case "end":
              return _context17.stop();
          }
        }, _callee16, this);
      }));
      function promptPassword(_x19) {
        return _promptPassword.apply(this, arguments);
      }
      return promptPassword;
    }()
    /**
     *
     */
  }, {
    key: "promptConfirm",
    value: (function () {
      var _promptConfirm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(message) {
        return _regeneratorRuntime.wrap(function _callee17$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", this.prompt('confirm', message));
            case 1:
            case "end":
              return _context18.stop();
          }
        }, _callee17, this);
      }));
      function promptConfirm(_x20) {
        return _promptConfirm.apply(this, arguments);
      }
      return promptConfirm;
    }()
    /**
     *
     */
    )
  }, {
    key: "openUrl",
    value: function openUrl(url) {
      _openUrl(url);
    }

    /**
     *
     */
  }, {
    key: "openUrlUsingSession",
    value: function openUrlUsingSession(url) {
      var _context19;
      var frontdoorUrl = _concatInstanceProperty(_context19 = "".concat(this._conn.instanceUrl, "/secur/frontdoor.jsp?sid=")).call(_context19, this._conn.accessToken);
      if (url) {
        frontdoorUrl += '&retURL=' + encodeURIComponent(url);
      }
      this.openUrl(frontdoorUrl);
    }
  }]);
}();

/* ------------------------------------------------------------------------- */

var cli = new Cli();
export default cli;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJodHRwIiwidXJsIiwiY3J5cHRvIiwib3BlblVybCIsIkNvbW1hbmQiLCJpbnF1aXJlciIsInJlcXVlc3QiLCJiYXNlNjR1cmwiLCJSZXBsIiwianNmb3JjZSIsIkNvbm5lY3Rpb24iLCJPQXV0aDIiLCJ2ZXJzaW9uIiwicmVnaXN0cnkiLCJDbGkiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInJlYWRDb21tYW5kIiwib3B0aW9uIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsIl9zdGFydCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwicHJvZ3JhbSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJfb3V0cHV0RW5hYmxlZCIsImV2YWxTY3JpcHQiLCJjb25uZWN0IiwiX3JlcGwiLCJzdGFydCIsImludGVyYWN0aXZlIiwidDAiLCJjb25zb2xlIiwiZXJyb3IiLCJleGl0Iiwic3RvcCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZ2V0Q3VycmVudENvbm5lY3Rpb24iLCJfY29ubiIsInByaW50IiwiX2NvbnNvbGUiLCJsb2ciLCJzYXZlQ3VycmVudENvbm5lY3Rpb24iLCJfY29ubk5hbWUiLCJjb25uIiwiY29ubk5hbWUiLCJjb25uQ29uZmlnIiwib2F1dGgyIiwiY2xpZW50SWQiLCJjbGllbnRTZWNyZXQiLCJyZWRpcmVjdFVyaSIsImxvZ2luVXJsIiwiYWNjZXNzVG9rZW4iLCJpbnN0YW5jZVVybCIsInJlZnJlc2hUb2tlbiIsInNhdmVDb25uZWN0aW9uQ29uZmlnIiwic2V0TG9naW5TZXJ2ZXIiLCJsb2dpblNlcnZlciIsIl9kZWZhdWx0TG9naW5VcmwiLCJfc3RhcnRzV2l0aEluc3RhbmNlUHJvcGVydHkiLCJjYWxsIiwiY29uY2F0IiwiX2Nvbm5lY3QiLCJfY2FsbGVlMiIsIm9wdGlvbnMiLCJfdGhpcyIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpZGVudGl0eSIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInNhbmRib3giLCJjb25uZWN0aW9uIiwiZ2V0Q29ubmVjdGlvbkNvbmZpZyIsInNlbnQiLCJzdGFydFBhc3N3b3JkQXV0aCIsIm9uIiwiRXJyb3IiLCJtZXNzYWdlIiwiX3giLCJfc3RhcnRQYXNzd29yZEF1dGgiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImxvZ2luQnlQYXNzd29yZCIsIl94MiIsIl94MyIsIl9sb2dpbkJ5UGFzc3dvcmQiLCJfY2FsbGVlNCIsInJldHJ5Q291bnQiLCJwYXNzIiwicmVzdWx0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwicHJvbXB0UGFzc3dvcmQiLCJhYnJ1cHQiLCJsb2dpbiIsIl94NCIsIl94NSIsIl94NiIsIl9kaXNjb25uZWN0IiwiX2NhbGxlZTUiLCJuYW1lIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwicmVtb3ZlQ29ubmVjdGlvbkNvbmZpZyIsImRpc2Nvbm5lY3QiLCJfeDciLCJfYXV0aG9yaXplIiwiX2NhbGxlZTYiLCJjbGllbnROYW1lIiwib2F1dGgyQ29uZmlnIiwidmVyaWZpZXIiLCJjaGFsbGVuZ2UiLCJzdGF0ZSIsImF1dGh6VXJsIiwicGFyYW1zIiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZ2V0Q2xpZW50Q29uZmlnIiwiZG93bmxvYWREZWZhdWx0Q2xpZW50SW5mbyIsImVuY29kZSIsInJhbmRvbUJ5dGVzIiwiY3JlYXRlSGFzaCIsInVwZGF0ZSIsImRpZ2VzdCIsImdldEF1dGhvcml6YXRpb25VcmwiLCJjb2RlX2NoYWxsZW5nZSIsIndhaXRDYWxsYmFjayIsImNvZGUiLCJhdXRob3JpemUiLCJjb2RlX3ZlcmlmaWVyIiwiX3g4IiwiX2Rvd25sb2FkRGVmYXVsdENsaWVudEluZm8iLCJfY2FsbGVlNyIsImNvbmZpZ1VybCIsInJlcyIsImNsaWVudENvbmZpZyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsIl9Qcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm1ldGhvZCIsIkpTT04iLCJib2R5IiwicmVnaXN0ZXJDbGllbnRDb25maWciLCJfeDkiLCJfd2FpdENhbGxiYWNrIiwiX2NhbGxlZTgiLCJzZXJ2ZXJVcmwiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJyZXEiLCJxcGFyYW1zIiwicXVlcnkiLCJ3cml0ZUhlYWQiLCJ3cml0ZSIsImVuZCIsImNsb3NlIiwiZGVzdHJveSIsInBvcnQiLCJOdW1iZXIiLCJsaXN0ZW4iLCJwcm9tcHRNZXNzYWdlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiX3gxMCIsIl94MTEiLCJfcmVnaXN0ZXIiLCJfY2FsbGVlMTAiLCJfY29udGV4dDkiLCJfdGhpczIiLCJwcm9tcHRzIiwicmVnaXN0ZXJlZCIsIm1zZyIsIm9rIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTEiLCJwcm9tcHRDb25maXJtIiwiX3JlZHVjZUluc3RhbmNlUHJvcGVydHkiLCJfT2JqZWN0JGtleXMiLCJfcmVmIiwiX2NhbGxlZTkiLCJwcm9taXNlIiwiY2NvbmZpZyIsInByb21wdE5hbWUiLCJfY2FsbGVlOSQiLCJfY29udGV4dDEwIiwiX29iamVjdFNwcmVhZCIsIl94MTQiLCJfeDE1IiwicmVnaXN0ZXIiLCJfeDEyIiwiX3gxMyIsIl9saXN0Q29ubmVjdGlvbnMiLCJfY2FsbGVlMTEiLCJuYW1lcyIsIl9pdGVyYXRvciIsIl9zdGVwIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTIiLCJnZXRDb25uZWN0aW9uTmFtZXMiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsInMiLCJuIiwiZG9uZSIsImVyciIsImUiLCJmIiwibGlzdENvbm5lY3Rpb25zIiwiX2dldENvbm5lY3Rpb25OYW1lcyIsIl9jYWxsZWUxMiIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEzIiwiX2dldENsaWVudE5hbWVzIiwiX2NhbGxlZTEzIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTQiLCJnZXRDbGllbnROYW1lcyIsIl9wcm9tcHQiLCJfY2FsbGVlMTQiLCJ0eXBlIiwiYW5zd2VyIiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTUiLCJwYXVzZSIsInByb21wdCIsInJlc3VtZSIsIl94MTYiLCJfeDE3IiwiX3Byb21wdE1lc3NhZ2UiLCJfY2FsbGVlMTUiLCJfY2FsbGVlMTUkIiwiX2NvbnRleHQxNiIsIl94MTgiLCJfcHJvbXB0UGFzc3dvcmQiLCJfY2FsbGVlMTYiLCJfY2FsbGVlMTYkIiwiX2NvbnRleHQxNyIsIl94MTkiLCJfcHJvbXB0Q29uZmlybSIsIl9jYWxsZWUxNyIsIl9jYWxsZWUxNyQiLCJfY29udGV4dDE4IiwiX3gyMCIsIm9wZW5VcmxVc2luZ1Nlc3Npb24iLCJfY29udGV4dDE5IiwiZnJvbnRkb29yVXJsIiwiX2NvbmNhdEluc3RhbmNlUHJvcGVydHkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJjbGkiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpL2NsaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIENvbW1hbmQgbGluZSBpbnRlcmZhY2UgZm9yIEpTZm9yY2VcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCB1cmwgZnJvbSAndXJsJztcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBvcGVuVXJsIGZyb20gJ29wZW4nO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vcmVxdWVzdCc7XG5pbXBvcnQgYmFzZTY0dXJsIGZyb20gJ2Jhc2U2NHVybCc7XG5pbXBvcnQgUmVwbCBmcm9tICcuL3JlcGwnO1xuaW1wb3J0IGpzZm9yY2UsIHsgQ29ubmVjdGlvbiwgT0F1dGgyIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi4vVkVSU0lPTic7XG5pbXBvcnQgeyBPcHRpb25hbCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IENsaWVudENvbmZpZyB9IGZyb20gJy4uL3JlZ2lzdHJ5L3R5cGVzJztcblxuY29uc3QgcmVnaXN0cnkgPSBqc2ZvcmNlLnJlZ2lzdHJ5O1xuXG50eXBlIENsaUNvbW1hbmQgPSB7XG4gIGNvbm5lY3Rpb24/OiBzdHJpbmc7XG4gIHVzZXJuYW1lPzogc3RyaW5nO1xuICBwYXNzd29yZD86IHN0cmluZztcbiAgbG9naW5Vcmw/OiBzdHJpbmc7XG4gIHNhbmRib3g/OiBib29sZWFuO1xuICBldmFsU2NyaXB0Pzogc3RyaW5nO1xufSAmIENvbW1hbmRcblxuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2xpIHtcbiAgX3JlcGw6IFJlcGwgPSBuZXcgUmVwbCh0aGlzKTtcbiAgX2Nvbm46IENvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbigpO1xuICBfY29ubk5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgX291dHB1dEVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBfZGVmYXVsdExvZ2luVXJsOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICByZWFkQ29tbWFuZCgpOiBDbGlDb21tYW5kIHtcbiAgICByZXR1cm4gbmV3IENvbW1hbmQoKVxuICAgICAgLm9wdGlvbignLXUsIC0tdXNlcm5hbWUgW3VzZXJuYW1lXScsICdTYWxlc2ZvcmNlIHVzZXJuYW1lJylcbiAgICAgIC5vcHRpb24oXG4gICAgICAgICctcCwgLS1wYXNzd29yZCBbcGFzc3dvcmRdJyxcbiAgICAgICAgJ1NhbGVzZm9yY2UgcGFzc3dvcmQgKGFuZCBzZWN1cml0eSB0b2tlbiwgaWYgYXZhaWxhYmxlKScsXG4gICAgICApXG4gICAgICAub3B0aW9uKFxuICAgICAgICAnLWMsIC0tY29ubmVjdGlvbiBbY29ubmVjdGlvbl0nLFxuICAgICAgICAnQ29ubmVjdGlvbiBuYW1lIHN0b3JlZCBpbiBjb25uZWN0aW9uIHJlZ2lzdHJ5JyxcbiAgICAgIClcbiAgICAgIC5vcHRpb24oJy1sLCAtLWxvZ2luVXJsIFtsb2dpblVybF0nLCAnU2FsZXNmb3JjZSBsb2dpbiB1cmwnKVxuICAgICAgLm9wdGlvbignLS1zYW5kYm94JywgJ0xvZ2luIHRvIFNhbGVzZm9yY2Ugc2FuZGJveCcpXG4gICAgICAub3B0aW9uKCctZSwgLS1ldmFsU2NyaXB0IFtldmFsU2NyaXB0XScsICdTY3JpcHQgdG8gZXZhbHVhdGUnKVxuICAgICAgLnZlcnNpb24odmVyc2lvbilcbiAgICAgIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuICB9XG5cbiAgYXN5bmMgc3RhcnQoKSB7XG4gICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMucmVhZENvbW1hbmQoKTtcbiAgICB0aGlzLl9vdXRwdXRFbmFibGVkID0gIXByb2dyYW0uZXZhbFNjcmlwdDtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5jb25uZWN0KHByb2dyYW0pO1xuICAgICAgaWYgKHByb2dyYW0uZXZhbFNjcmlwdCkge1xuICAgICAgICB0aGlzLl9yZXBsLnN0YXJ0KHtcbiAgICAgICAgICBpbnRlcmFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgZXZhbFNjcmlwdDogcHJvZ3JhbS5ldmFsU2NyaXB0LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlcGwuc3RhcnQoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldEN1cnJlbnRDb25uZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25uO1xuICB9XG5cbiAgcHJpbnQoLi4uYXJnczogYW55W10pIHtcbiAgICBpZiAodGhpcy5fb3V0cHV0RW5hYmxlZCkge1xuICAgICAgY29uc29sZS5sb2coLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZUN1cnJlbnRDb25uZWN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jb25uTmFtZSkge1xuICAgICAgY29uc3QgY29ubiA9IHRoaXMuX2Nvbm47XG4gICAgICBjb25zdCBjb25uTmFtZSA9IHRoaXMuX2Nvbm5OYW1lO1xuICAgICAgY29uc3QgY29ubkNvbmZpZyA9IHtcbiAgICAgICAgb2F1dGgyOiBjb25uLm9hdXRoMlxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBjbGllbnRJZDogY29ubi5vYXV0aDIuY2xpZW50SWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBjbGllbnRTZWNyZXQ6IGNvbm4ub2F1dGgyLmNsaWVudFNlY3JldCB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHJlZGlyZWN0VXJpOiBjb25uLm9hdXRoMi5yZWRpcmVjdFVyaSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIGxvZ2luVXJsOiBjb25uLm9hdXRoMi5sb2dpblVybCB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGFjY2Vzc1Rva2VuOiBjb25uLmFjY2Vzc1Rva2VuIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgaW5zdGFuY2VVcmw6IGNvbm4uaW5zdGFuY2VVcmwgfHwgdW5kZWZpbmVkLFxuICAgICAgICByZWZyZXNoVG9rZW46IGNvbm4ucmVmcmVzaFRva2VuIHx8IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgICByZWdpc3RyeS5zYXZlQ29ubmVjdGlvbkNvbmZpZyhjb25uTmFtZSwgY29ubkNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgc2V0TG9naW5TZXJ2ZXIobG9naW5TZXJ2ZXI6IE9wdGlvbmFsPHN0cmluZz4pIHtcbiAgICBpZiAoIWxvZ2luU2VydmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChsb2dpblNlcnZlciA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB0aGlzLl9kZWZhdWx0TG9naW5VcmwgPSAnaHR0cHM6Ly9sb2dpbi5zYWxlc2ZvcmNlLmNvbSc7XG4gICAgfSBlbHNlIGlmIChsb2dpblNlcnZlciA9PT0gJ3NhbmRib3gnKSB7XG4gICAgICB0aGlzLl9kZWZhdWx0TG9naW5VcmwgPSAnaHR0cHM6Ly90ZXN0LnNhbGVzZm9yY2UuY29tJztcbiAgICB9IGVsc2UgaWYgKCFsb2dpblNlcnZlci5zdGFydHNXaXRoKCdodHRwczovLycpKSB7XG4gICAgICB0aGlzLl9kZWZhdWx0TG9naW5VcmwgPSAnaHR0cHM6Ly8nICsgbG9naW5TZXJ2ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRMb2dpblVybCA9IGxvZ2luU2VydmVyO1xuICAgIH1cbiAgICB0aGlzLnByaW50KGBVc2luZyBcIiR7dGhpcy5fZGVmYXVsdExvZ2luVXJsfVwiIGFzIGRlZmF1bHQgbG9naW4gVVJMLmApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBjb25uZWN0KG9wdGlvbnM6IHtcbiAgICB1c2VybmFtZT86IHN0cmluZztcbiAgICBwYXNzd29yZD86IHN0cmluZztcbiAgICBjb25uZWN0aW9uPzogc3RyaW5nO1xuICAgIGxvZ2luVXJsPzogc3RyaW5nO1xuICAgIHNhbmRib3g/OiBib29sZWFuO1xuICB9KSB7XG4gICAgY29uc3QgbG9naW5TZXJ2ZXIgPSBvcHRpb25zLmxvZ2luVXJsXG4gICAgICA/IG9wdGlvbnMubG9naW5VcmxcbiAgICAgIDogb3B0aW9ucy5zYW5kYm94XG4gICAgICA/ICdzYW5kYm94J1xuICAgICAgOiBudWxsO1xuICAgIHRoaXMuc2V0TG9naW5TZXJ2ZXIobG9naW5TZXJ2ZXIpO1xuICAgIHRoaXMuX2Nvbm5OYW1lID0gb3B0aW9ucy5jb25uZWN0aW9uO1xuICAgIGxldCBjb25uQ29uZmlnID0gYXdhaXQgcmVnaXN0cnkuZ2V0Q29ubmVjdGlvbkNvbmZpZyhvcHRpb25zLmNvbm5lY3Rpb24pO1xuICAgIGxldCB1c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgaWYgKCFjb25uQ29uZmlnKSB7XG4gICAgICBjb25uQ29uZmlnID0ge307XG4gICAgICBpZiAodGhpcy5fZGVmYXVsdExvZ2luVXJsKSB7XG4gICAgICAgIGNvbm5Db25maWcubG9naW5VcmwgPSB0aGlzLl9kZWZhdWx0TG9naW5Vcmw7XG4gICAgICB9XG4gICAgICB1c2VybmFtZSA9IHVzZXJuYW1lIHx8IG9wdGlvbnMuY29ubmVjdGlvbjtcbiAgICB9XG4gICAgdGhpcy5fY29ubiA9IG5ldyBDb25uZWN0aW9uKGNvbm5Db25maWcpO1xuICAgIGNvbnN0IHBhc3N3b3JkID0gb3B0aW9ucy5wYXNzd29yZDtcbiAgICBpZiAodXNlcm5hbWUpIHtcbiAgICAgIGF3YWl0IHRoaXMuc3RhcnRQYXNzd29yZEF1dGgodXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgICAgIHRoaXMuc2F2ZUN1cnJlbnRDb25uZWN0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9jb25uTmFtZSAmJiB0aGlzLl9jb25uLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHRoaXMuX2Nvbm4ub24oJ3JlZnJlc2gnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcmludCgnUmVmcmVzaGluZyBhY2Nlc3MgdG9rZW4gLi4uICcpO1xuICAgICAgICAgIHRoaXMuc2F2ZUN1cnJlbnRDb25uZWN0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgdGhpcy5fY29ubi5pZGVudGl0eSgpO1xuICAgICAgICAgIHRoaXMucHJpbnQoYExvZ2dlZCBpbiBhcyA6ICR7aWRlbnRpdHkudXNlcm5hbWV9YCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5wcmludChlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9jb25uLm9hdXRoMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcmUtYXV0aG9yaXplIGNvbm5lY3Rpb24uJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3RhcnRQYXNzd29yZEF1dGgodGhpcy5fY29ubk5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgc3RhcnRQYXNzd29yZEF1dGgodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ/OiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5sb2dpbkJ5UGFzc3dvcmQodXNlcm5hbWUsIHBhc3N3b3JkLCAyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnIubWVzc2FnZSA9PT0gJ2NhbmNlbGVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdQYXNzd29yZCBhdXRoZW50aWNhdGlvbiBjYW5jZWxlZDogTm90IGxvZ2dlZCBpbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgbG9naW5CeVBhc3N3b3JkKFxuICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICAgcGFzc3dvcmQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICByZXRyeUNvdW50OiBudW1iZXIsXG4gICk6IFByb21pc2U8eyBpZDogc3RyaW5nIH0+IHtcbiAgICBpZiAocGFzc3dvcmQgPT09ICcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbmNlbGVkJyk7XG4gICAgfVxuICAgIGlmIChwYXNzd29yZCA9PSBudWxsKSB7XG4gICAgICBjb25zdCBwYXNzID0gYXdhaXQgdGhpcy5wcm9tcHRQYXNzd29yZCgnUGFzc3dvcmQ6ICcpO1xuICAgICAgcmV0dXJuIHRoaXMubG9naW5CeVBhc3N3b3JkKHVzZXJuYW1lLCBwYXNzLCByZXRyeUNvdW50KTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2Nvbm4ubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgICAgIHRoaXMucHJpbnQoYExvZ2dlZCBpbiBhcyA6ICR7dXNlcm5hbWV9YCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHJldHJ5Q291bnQgPiAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luQnlQYXNzd29yZCh1c2VybmFtZSwgdW5kZWZpbmVkLCByZXRyeUNvdW50IC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbmNlbGVkJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkaXNjb25uZWN0KGNvbm5OYW1lPzogc3RyaW5nKSB7XG4gICAgY29uc3QgbmFtZSA9IGNvbm5OYW1lIHx8IHRoaXMuX2Nvbm5OYW1lO1xuICAgIGlmIChuYW1lICYmIChhd2FpdCByZWdpc3RyeS5nZXRDb25uZWN0aW9uQ29uZmlnKG5hbWUpKSkge1xuICAgICAgYXdhaXQgcmVnaXN0cnkucmVtb3ZlQ29ubmVjdGlvbkNvbmZpZyhuYW1lKTtcbiAgICAgIHRoaXMucHJpbnQoYERpc2Nvbm5lY3QgY29ubmVjdGlvbiAnJHtuYW1lfSdgKTtcbiAgICB9XG4gICAgdGhpcy5fY29ubk5hbWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fY29ubiA9IG5ldyBDb25uZWN0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGF1dGhvcml6ZShjbGllbnROYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuYW1lID0gY2xpZW50TmFtZSB8fCAnZGVmYXVsdCc7XG4gICAgY29uc3Qgb2F1dGgyQ29uZmlnID0gYXdhaXQgcmVnaXN0cnkuZ2V0Q2xpZW50Q29uZmlnKG5hbWUpO1xuICAgIGlmICghb2F1dGgyQ29uZmlnPy5jbGllbnRJZCkge1xuICAgICAgaWYgKG5hbWUgPT09ICdkZWZhdWx0JyB8fCBuYW1lID09PSAnc2FuZGJveCcpIHtcbiAgICAgICAgdGhpcy5wcmludChcbiAgICAgICAgICAnTm8gY2xpZW50IGluZm9ybWF0aW9uIHJlZ2lzdGVyZWQuIERvd25sb2FkaW5nIEpTZm9yY2UgZGVmYXVsdCBjbGllbnQgaW5mb3JtYXRpb24uLi4nLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gdGhpcy5kb3dubG9hZERlZmF1bHRDbGllbnRJbmZvKG5hbWUpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTm8gT0F1dGgyIGNsaWVudCBpbmZvcm1hdGlvbiByZWdpc3RlcmVkIDogJyR7bmFtZX0nLiBQbGVhc2UgcmVnaXN0ZXIgY2xpZW50IGluZm8gZmlyc3QuYCxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IG9hdXRoMiA9IG5ldyBPQXV0aDIob2F1dGgyQ29uZmlnKTtcbiAgICBjb25zdCB2ZXJpZmllciA9IGJhc2U2NHVybC5lbmNvZGUoY3J5cHRvLnJhbmRvbUJ5dGVzKDMyKSk7XG4gICAgY29uc3QgY2hhbGxlbmdlID0gYmFzZTY0dXJsLmVuY29kZShcbiAgICAgIGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUodmVyaWZpZXIpLmRpZ2VzdCgpLFxuICAgICk7XG4gICAgY29uc3Qgc3RhdGUgPSBiYXNlNjR1cmwuZW5jb2RlKGNyeXB0by5yYW5kb21CeXRlcygzMikpO1xuICAgIGNvbnN0IGF1dGh6VXJsID0gb2F1dGgyLmdldEF1dGhvcml6YXRpb25Vcmwoe1xuICAgICAgY29kZV9jaGFsbGVuZ2U6IGNoYWxsZW5nZSxcbiAgICAgIHN0YXRlLFxuICAgIH0pO1xuICAgIHRoaXMucHJpbnQoJ09wZW5pbmcgYXV0aG9yaXphdGlvbiBwYWdlIGluIGJyb3dzZXIuLi4nKTtcbiAgICB0aGlzLnByaW50KGBVUkw6ICR7YXV0aHpVcmx9YCk7XG4gICAgdGhpcy5vcGVuVXJsKGF1dGh6VXJsKTtcbiAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCB0aGlzLndhaXRDYWxsYmFjayhvYXV0aDJDb25maWcucmVkaXJlY3RVcmksIHN0YXRlKTtcbiAgICBpZiAoIXBhcmFtcy5jb2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGF1dGhvcml6YXRpb24gY29kZSByZXR1cm5lZC4nKTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5zdGF0ZSAhPT0gc3RhdGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdGF0ZSBwYXJhbWV0ZXIgcmV0dXJuZWQuJyk7XG4gICAgfVxuICAgIHRoaXMuX2Nvbm4gPSBuZXcgQ29ubmVjdGlvbih7IG9hdXRoMiB9KTtcbiAgICB0aGlzLnByaW50KFxuICAgICAgJ1JlY2VpdmVkIGF1dGhvcml6YXRpb24gY29kZS4gUGxlYXNlIGNsb3NlIHRoZSBvcGVuZWQgYnJvd3NlciB3aW5kb3cuJyxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2Nvbm4uYXV0aG9yaXplKHBhcmFtcy5jb2RlLCB7IGNvZGVfdmVyaWZpZXI6IHZlcmlmaWVyIH0pO1xuICAgIHRoaXMucHJpbnQoJ0F1dGhvcml6ZWQuIEZldGNoaW5nIHVzZXIgaW5mby4uLicpO1xuICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgdGhpcy5fY29ubi5pZGVudGl0eSgpO1xuICAgIHRoaXMucHJpbnQoYExvZ2dlZCBpbiBhcyA6ICR7aWRlbnRpdHkudXNlcm5hbWV9YCk7XG4gICAgdGhpcy5fY29ubk5hbWUgPSBpZGVudGl0eS51c2VybmFtZTtcbiAgICB0aGlzLnNhdmVDdXJyZW50Q29ubmVjdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkb3dubG9hZERlZmF1bHRDbGllbnRJbmZvKGNsaWVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvbmZpZ1VybCA9ICdodHRwczovL2pzZm9yY2UuZ2l0aHViLmlvL2NsaWVudC1jb25maWcvZGVmYXVsdC5qc29uJztcbiAgICBjb25zdCByZXM6IHsgYm9keTogc3RyaW5nIH0gPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXF1ZXN0KHsgbWV0aG9kOiAnR0VUJywgdXJsOiBjb25maWdVcmwgfSlcbiAgICAgICAgLm9uKCdjb21wbGV0ZScsIHJlc29sdmUpXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpO1xuICAgIH0pO1xuICAgIGNvbnN0IGNsaWVudENvbmZpZyA9IEpTT04ucGFyc2UocmVzLmJvZHkpO1xuICAgIGlmIChjbGllbnROYW1lID09PSAnc2FuZGJveCcpIHtcbiAgICAgIGNsaWVudENvbmZpZy5sb2dpblVybCA9ICdodHRwczovL3Rlc3Quc2FsZXNmb3JjZS5jb20nO1xuICAgIH1cbiAgICBhd2FpdCByZWdpc3RyeS5yZWdpc3RlckNsaWVudENvbmZpZyhjbGllbnROYW1lLCBjbGllbnRDb25maWcpO1xuICAgIHRoaXMucHJpbnQoJ0NsaWVudCBpbmZvcm1hdGlvbiBkb3dubG9hZGVkIHN1Y2Nlc3NmdWxseS4nKTtcbiAgICByZXR1cm4gdGhpcy5hdXRob3JpemUoY2xpZW50TmFtZSk7XG4gIH1cblxuICBhc3luYyB3YWl0Q2FsbGJhY2soXG4gICAgc2VydmVyVXJsOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgc3RhdGU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTx7IGNvZGU6IHN0cmluZzsgc3RhdGU6IHN0cmluZyB9PiB7XG4gICAgaWYgKHNlcnZlclVybCAmJiBzZXJ2ZXJVcmwuc3RhcnRzV2l0aCgnaHR0cDovL2xvY2FsaG9zdDonKSkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKHJlcSwgcmVzKSA9PiB7XG4gICAgICAgICAgaWYgKCFyZXEudXJsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHFwYXJhbXMgPSB1cmwucGFyc2UocmVxLnVybCwgdHJ1ZSkucXVlcnk7XG4gICAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnIH0pO1xuICAgICAgICAgIHJlcy53cml0ZShcbiAgICAgICAgICAgICc8aHRtbD48c2NyaXB0PmxvY2F0aW9uLmhyZWY9XCJhYm91dDpibGFua1wiOzwvc2NyaXB0PjwvaHRtbD4nLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICAgIGlmIChxcGFyYW1zLmVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKHFwYXJhbXMuZXJyb3IgYXMgc3RyaW5nKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocXBhcmFtcyBhcyB7IGNvZGU6IHN0cmluZzsgc3RhdGU6IHN0cmluZyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VydmVyLmNsb3NlKCk7XG4gICAgICAgICAgcmVxLmNvbm5lY3Rpb24uZW5kKCk7XG4gICAgICAgICAgcmVxLmNvbm5lY3Rpb24uZGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcG9ydCA9IE51bWJlcih1cmwucGFyc2Uoc2VydmVyVXJsKS5wb3J0KTtcbiAgICAgICAgc2VydmVyLmxpc3Rlbihwb3J0LCAnbG9jYWxob3N0Jyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29kZSA9IGF3YWl0IHRoaXMucHJvbXB0TWVzc2FnZShcbiAgICAgICAgJ0NvcHkgJiBwYXN0ZSBhdXRoeiBjb2RlIHBhc3NlZCBpbiByZWRpcmVjdGVkIFVSTDogJyxcbiAgICAgICk7XG4gICAgICByZXR1cm4geyBjb2RlOiBkZWNvZGVVUklDb21wb25lbnQoY29kZSksIHN0YXRlIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyByZWdpc3RlcihjbGllbnROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsIGNsaWVudENvbmZpZzogQ2xpZW50Q29uZmlnKSB7XG4gICAgY29uc3QgbmFtZSA9IGNsaWVudE5hbWUgfHwgJ2RlZmF1bHQnO1xuICAgIGNvbnN0IHByb21wdHMgPSB7XG4gICAgICBjbGllbnRJZDogJ0lucHV0IGNsaWVudCBJRCA6ICcsXG4gICAgICBjbGllbnRTZWNyZXQ6ICdJbnB1dCBjbGllbnQgc2VjcmV0IChvcHRpb25hbCkgOiAnLFxuICAgICAgcmVkaXJlY3RVcmk6ICdJbnB1dCByZWRpcmVjdCBVUkkgOiAnLFxuICAgICAgbG9naW5Vcmw6ICdJbnB1dCBsb2dpbiBVUkwgKGRlZmF1bHQgaXMgaHR0cHM6Ly9sb2dpbi5zYWxlc2ZvcmNlLmNvbSkgOiAnLFxuICAgIH07XG4gICAgY29uc3QgcmVnaXN0ZXJlZCA9IGF3YWl0IHJlZ2lzdHJ5LmdldENsaWVudENvbmZpZyhuYW1lKTtcbiAgICBpZiAocmVnaXN0ZXJlZCkge1xuICAgICAgY29uc3QgbXNnID0gYENsaWVudCAnJHtuYW1lfScgaXMgYWxyZWFkeSByZWdpc3RlcmVkLiBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gb3ZlcnJpZGUgPyBbeU5dIDogYDtcbiAgICAgIGNvbnN0IG9rID0gYXdhaXQgdGhpcy5wcm9tcHRDb25maXJtKG1zZyk7XG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVnaXN0cmF0aW9uIGNhbmNlbGVkLicpO1xuICAgICAgfVxuICAgIH1cbiAgICBjbGllbnRDb25maWcgPSBhd2FpdCBPYmplY3Qua2V5cyhwcm9tcHRzKS5yZWR1Y2UoYXN5bmMgKHByb21pc2UsIG5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGNjb25maWcgPSBhd2FpdCBwcm9taXNlO1xuICAgICAgY29uc3QgcHJvbXB0TmFtZSA9IG5hbWUgYXMga2V5b2YgdHlwZW9mIHByb21wdHM7XG4gICAgICBjb25zdCBtZXNzYWdlID0gcHJvbXB0c1twcm9tcHROYW1lXTtcbiAgICAgIGlmICghY2NvbmZpZ1twcm9tcHROYW1lXSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IHRoaXMucHJvbXB0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmNjb25maWcsXG4gICAgICAgICAgICBbcHJvbXB0TmFtZV06IHZhbHVlLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjY29uZmlnO1xuICAgIH0sIFByb21pc2UucmVzb2x2ZShjbGllbnRDb25maWcpKTtcbiAgICBhd2FpdCByZWdpc3RyeS5yZWdpc3RlckNsaWVudENvbmZpZyhuYW1lLCBjbGllbnRDb25maWcpO1xuICAgIHRoaXMucHJpbnQoJ0NsaWVudCByZWdpc3RlcmVkIHN1Y2Nlc3NmdWxseS4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgbGlzdENvbm5lY3Rpb25zKCkge1xuICAgIGNvbnN0IG5hbWVzID0gYXdhaXQgcmVnaXN0cnkuZ2V0Q29ubmVjdGlvbk5hbWVzKCk7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICB0aGlzLnByaW50KChuYW1lID09PSB0aGlzLl9jb25uTmFtZSA/ICcqICcgOiAnICAnKSArIG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZ2V0Q29ubmVjdGlvbk5hbWVzKCkge1xuICAgIHJldHVybiByZWdpc3RyeS5nZXRDb25uZWN0aW9uTmFtZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZ2V0Q2xpZW50TmFtZXMoKSB7XG4gICAgcmV0dXJuIHJlZ2lzdHJ5LmdldENsaWVudE5hbWVzKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIHByb21wdCh0eXBlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMuX3JlcGwucGF1c2UoKTtcbiAgICBjb25zdCBhbnN3ZXI6IHsgdmFsdWU6IHN0cmluZyB9ID0gYXdhaXQgaW5xdWlyZXIucHJvbXB0KFtcbiAgICAgIHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgbmFtZTogJ3ZhbHVlJyxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgIH0sXG4gICAgXSk7XG4gICAgdGhpcy5fcmVwbC5yZXN1bWUoKTtcbiAgICByZXR1cm4gYW5zd2VyLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBwcm9tcHRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnByb21wdCgnaW5wdXQnLCBtZXNzYWdlKTtcbiAgfVxuXG4gIGFzeW5jIHByb21wdFBhc3N3b3JkKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnByb21wdCgncGFzc3dvcmQnLCBtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgcHJvbXB0Q29uZmlybShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9tcHQoJ2NvbmZpcm0nLCBtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgb3BlblVybCh1cmw6IHN0cmluZykge1xuICAgIG9wZW5VcmwodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgb3BlblVybFVzaW5nU2Vzc2lvbih1cmw/OiBzdHJpbmcpIHtcbiAgICBsZXQgZnJvbnRkb29yVXJsID0gYCR7dGhpcy5fY29ubi5pbnN0YW5jZVVybH0vc2VjdXIvZnJvbnRkb29yLmpzcD9zaWQ9JHt0aGlzLl9jb25uLmFjY2Vzc1Rva2VufWA7XG4gICAgaWYgKHVybCkge1xuICAgICAgZnJvbnRkb29yVXJsICs9ICcmcmV0VVJMPScgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB9XG4gICAgdGhpcy5vcGVuVXJsKGZyb250ZG9vclVybCk7XG4gIH1cbn1cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBjbGkgPSBuZXcgQ2xpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsaTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPQSxJQUFJLE1BQU0sTUFBTTtBQUN2QixPQUFPQyxHQUFHLE1BQU0sS0FBSztBQUNyQixPQUFPQyxNQUFNLE1BQU0sUUFBUTtBQUMzQixPQUFPQyxRQUFPLE1BQU0sTUFBTTtBQUMxQixTQUFTQyxPQUFPLFFBQVEsV0FBVztBQUNuQyxPQUFPQyxRQUFRLE1BQU0sVUFBVTtBQUMvQixPQUFPQyxPQUFPLE1BQU0sWUFBWTtBQUNoQyxPQUFPQyxTQUFTLE1BQU0sV0FBVztBQUNqQyxPQUFPQyxJQUFJLE1BQU0sUUFBUTtBQUN6QixPQUFPQyxPQUFPLElBQUlDLFVBQVUsRUFBRUMsTUFBTSxRQUFRLElBQUk7QUFDaEQsT0FBT0MsT0FBTyxNQUFNLFlBQVk7QUFJaEMsSUFBTUMsUUFBUSxHQUFHSixPQUFPLENBQUNJLFFBQVE7QUFXakM7QUFDQTtBQUNBO0FBQ0EsV0FBYUMsR0FBRztFQUFBLFNBQUFBLElBQUE7SUFBQUMsZUFBQSxP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