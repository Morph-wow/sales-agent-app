import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/toConsumableArray";
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context6; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context6 = Object.prototype.toString.call(o)).call(_context6, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.string.split.js";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getPrototypeOf from "@babel/runtime-corejs3/core-js-stable/object/get-prototype-of";
import _Object$getOwnPropertyNames from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-names";
import _Object$keys2 from "@babel/runtime-corejs3/core-js-stable/object/keys";
/**
 * @file Creates REPL interface with built in Salesforce API objects and automatically resolves promise object
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 * @private
 */
import { EventEmitter } from 'events';
import { start as startRepl } from 'repl';
import { Transform } from 'stream';
import jsforce from '..';
import { isPromiseLike, isNumber, isFunction, isObject } from '../util/function';
/**
 * Intercept the evaled value returned from repl evaluator, convert and send back to output.
 * @private
 */
function injectBefore(replServer, method, beforeFn) {
  var _orig = replServer[method];
  replServer[method] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var callback = args.pop();
    beforeFn.apply(void 0, _toConsumableArray(_concatInstanceProperty(args).call(args, function (err, res) {
      if (err || res) {
        callback(err, res);
      } else {
        _orig.apply(replServer, _concatInstanceProperty(args).call(args, callback));
      }
    })));
  };
  return replServer;
}

/**
 * @private
 */
function injectAfter(replServer, method, afterFn) {
  var _orig = replServer[method];
  replServer[method] = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var callback = args.pop();
    _orig.apply(replServer, _concatInstanceProperty(args).call(args, function () {
      try {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        afterFn.apply(void 0, _toConsumableArray(_concatInstanceProperty(args).call(args, callback)));
      } catch (e) {
        callback(e);
      }
    }));
  };
  return replServer;
}

/**
 * When the result was "promise", resolve its value
 * @private
 */
function promisify(err, value, callback) {
  // callback immediately if no value passed
  if (!callback && isFunction(value)) {
    callback = value;
    return callback();
  }
  if (err) {
    throw err;
  }
  if (isPromiseLike(value)) {
    value.then(function (v) {
      callback(null, v);
    }, function (err) {
      callback(err);
    });
  } else {
    callback(null, value);
  }
}

/**
 * Output object to stdout in JSON representation
 * @private
 */
function outputToStdout(prettyPrint) {
  if (prettyPrint && !isNumber(prettyPrint)) {
    prettyPrint = 4;
  }
  return function (err, value, callback) {
    if (err) {
      console.error(err);
    } else {
      var str = _JSON$stringify(value, null, prettyPrint);
      console.log(str);
    }
    callback(err, value);
  };
}

/**
 * define get accessor using Object.defineProperty
 * @private
 */
function defineProp(obj, prop, getter) {
  if (_Object$defineProperty) {
    _Object$defineProperty(obj, prop, {
      get: getter
    });
  }
}

/**
 *
 */
export var Repl = /*#__PURE__*/function () {
  function Repl(cli) {
    var _this = this;
    _classCallCheck(this, Repl);
    _defineProperty(this, "_interactive", true);
    _defineProperty(this, "_paused", false);
    _defineProperty(this, "_replServer", undefined);
    this._cli = cli;
    this._in = new Transform();
    this._out = new Transform();
    this._in._transform = function (chunk, encoding, callback) {
      if (!_this._paused) {
        _this._in.push(chunk);
      }
      callback();
    };
    this._out._transform = function (chunk, encoding, callback) {
      if (!_this._paused && _this._interactive !== false) {
        _this._out.push(chunk);
      }
      callback();
    };
  }

  /**
   *
   */
  return _createClass(Repl, [{
    key: "start",
    value: function start() {
      var _this2 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._interactive = options.interactive !== false;
      process.stdin.resume();
      if (process.stdin.setRawMode) {
        process.stdin.setRawMode(true);
      }
      process.stdin.pipe(this._in);
      this._out.pipe(process.stdout);
      defineProp(this._out, 'columns', function () {
        return process.stdout.columns;
      });
      this._replServer = startRepl({
        input: this._in,
        output: this._out,
        terminal: true
      });
      this._defineAdditionalCommands();
      this._replServer = injectBefore(this._replServer, 'completer', function (line, callback) {
        _this2.complete(line).then(function (rets) {
          callback(null, rets);
        }).catch(function (err) {
          callback(err);
        });
      });
      this._replServer = injectAfter(this._replServer, 'eval', promisify);
      if (options.interactive === false) {
        this._replServer = injectAfter(this._replServer, 'eval', outputToStdout(options.prettyPrint));
        this._replServer = injectAfter(this._replServer, 'eval', function () {
          process.exit();
        });
      }
      this._replServer.on('exit', function () {
        return process.exit();
      });
      this._defineBuiltinVars(this._replServer.context);
      if (options.evalScript) {
        this._in.write(options.evalScript + '\n', 'utf-8');
      }
      return this;
    }

    /**
     *
     */
  }, {
    key: "_defineAdditionalCommands",
    value: function _defineAdditionalCommands() {
      var cli = this._cli;
      var replServer = this._replServer;
      if (!replServer) {
        return;
      }
      replServer.defineCommand('connections', {
        help: 'List currenty registered Salesforce connections',
        action: function () {
          var _action = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return cli.listConnections();
                case 2:
                  replServer.displayPrompt();
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function action() {
            return _action.apply(this, arguments);
          }
          return action;
        }()
      });
      replServer.defineCommand('connect', {
        help: 'Connect to Salesforce instance',
        action: function () {
          var _action2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
            var _len4,
              args,
              _key4,
              name,
              password,
              params,
              _args2 = arguments;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  for (_len4 = _args2.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args[_key4] = _args2[_key4];
                  }
                  name = args[0], password = args[1];
                  params = password ? {
                    connection: name,
                    username: name,
                    password: password
                  } : {
                    connection: name,
                    username: name
                  };
                  _context2.prev = 3;
                  _context2.next = 6;
                  return cli.connect(params);
                case 6:
                  _context2.next = 11;
                  break;
                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2["catch"](3);
                  if (_context2.t0 instanceof Error) {
                    console.error(_context2.t0.message);
                  }
                case 11:
                  replServer.displayPrompt();
                case 12:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, null, [[3, 8]]);
          }));
          function action() {
            return _action2.apply(this, arguments);
          }
          return action;
        }()
      });
      replServer.defineCommand('disconnect', {
        help: 'Disconnect connection and erase it from registry',
        action: function action(name) {
          cli.disconnect(name);
          replServer.displayPrompt();
        }
      });
      replServer.defineCommand('use', {
        help: 'Specify login server to establish connection',
        action: function action(loginServer) {
          cli.setLoginServer(loginServer);
          replServer.displayPrompt();
        }
      });
      replServer.defineCommand('authorize', {
        help: 'Connect to Salesforce using OAuth2 authorization flow',
        action: function () {
          var _action3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(clientName) {
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return cli.authorize(clientName);
                case 3:
                  _context3.next = 8;
                  break;
                case 5:
                  _context3.prev = 5;
                  _context3.t0 = _context3["catch"](0);
                  if (_context3.t0 instanceof Error) {
                    console.error(_context3.t0.message);
                  }
                case 8:
                  replServer.displayPrompt();
                case 9:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, null, [[0, 5]]);
          }));
          function action(_x) {
            return _action3.apply(this, arguments);
          }
          return action;
        }()
      });
      replServer.defineCommand('register', {
        help: 'Register OAuth2 client information',
        action: function () {
          var _action4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
            var _len5,
              args,
              _key5,
              clientName,
              clientId,
              clientSecret,
              redirectUri,
              loginUrl,
              config,
              _args4 = arguments;
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  for (_len5 = _args4.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                    args[_key5] = _args4[_key5];
                  }
                  clientName = args[0], clientId = args[1], clientSecret = args[2], redirectUri = args[3], loginUrl = args[4];
                  config = {
                    clientId: clientId,
                    clientSecret: clientSecret,
                    redirectUri: redirectUri,
                    loginUrl: loginUrl
                  };
                  _context4.prev = 3;
                  _context4.next = 6;
                  return cli.register(clientName, config);
                case 6:
                  _context4.next = 11;
                  break;
                case 8:
                  _context4.prev = 8;
                  _context4.t0 = _context4["catch"](3);
                  if (_context4.t0 instanceof Error) {
                    console.error(_context4.t0.message);
                  }
                case 11:
                  replServer.displayPrompt();
                case 12:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, null, [[3, 8]]);
          }));
          function action() {
            return _action4.apply(this, arguments);
          }
          return action;
        }()
      });
      replServer.defineCommand('open', {
        help: 'Open Salesforce web page using established connection',
        action: function action(url) {
          cli.openUrlUsingSession(url);
          replServer.displayPrompt();
        }
      });
    }

    /**
     *
     */
  }, {
    key: "pause",
    value: function pause() {
      this._paused = true;
      if (process.stdin.setRawMode) {
        process.stdin.setRawMode(false);
      }
    }

    /**
     *
     */
  }, {
    key: "resume",
    value: function resume() {
      this._paused = false;
      process.stdin.resume();
      if (process.stdin.setRawMode) {
        process.stdin.setRawMode(true);
      }
    }

    /**
     *
     */
  }, {
    key: "complete",
    value: (function () {
      var _complete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(line) {
        var tokens, _tokens, command, _tokens$, keyword, candidates;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              tokens = line.replace(/^\s+/, '').split(/\s+/);
              _tokens = _slicedToArray(tokens, 2), command = _tokens[0], _tokens$ = _tokens[1], keyword = _tokens$ === void 0 ? '' : _tokens$;
              if (!(_startsWithInstanceProperty(command).call(command, '.') && tokens.length === 2)) {
                _context5.next = 19;
                break;
              }
              candidates = [];
              if (!(command === '.connect' || command === '.disconnect')) {
                _context5.next = 10;
                break;
              }
              _context5.next = 7;
              return this._cli.getConnectionNames();
            case 7:
              candidates = _context5.sent;
              _context5.next = 17;
              break;
            case 10:
              if (!(command === '.authorize')) {
                _context5.next = 16;
                break;
              }
              _context5.next = 13;
              return this._cli.getClientNames();
            case 13:
              candidates = _context5.sent;
              _context5.next = 17;
              break;
            case 16:
              if (command === '.use') {
                candidates = ['production', 'sandbox'];
              }
            case 17:
              candidates = _filterInstanceProperty(candidates).call(candidates, function (name) {
                return _startsWithInstanceProperty(name).call(name, keyword);
              });
              return _context5.abrupt("return", [candidates, keyword]);
            case 19:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function complete(_x2) {
        return _complete.apply(this, arguments);
      }
      return complete;
    }()
    /**
     * Map all jsforce object to REPL context
     * @private
     */
    )
  }, {
    key: "_defineBuiltinVars",
    value: function _defineBuiltinVars(context) {
      var cli = this._cli;

      // define salesforce package root objects
      for (var key in jsforce) {
        if (Object.prototype.hasOwnProperty.call(jsforce, key) && !global[key]) {
          context[key] = jsforce[key];
        }
      }
      // expose jsforce package root object in context.
      context.jsforce = jsforce;
      function createProxyFunc(prop) {
        return function () {
          var _ref;
          var conn = cli.getCurrentConnection();
          return (_ref = conn)[prop].apply(_ref, arguments);
        };
      }
      function createProxyAccessor(prop) {
        return function () {
          var conn = cli.getCurrentConnection();
          return conn[prop];
        };
      }
      var conn = cli.getCurrentConnection();
      // list all props in connection instance, other than EventEmitter or object built-in methods
      var props = {};
      var o = conn;
      while (o && o !== EventEmitter.prototype && o !== Object.prototype) {
        var _iterator = _createForOfIteratorHelper(_Object$getOwnPropertyNames(o)),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var p = _step.value;
            if (p !== 'constructor') {
              props[p] = true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        o = _Object$getPrototypeOf(o);
      }
      for (var _i = 0, _Object$keys = _Object$keys2(props); _i < _Object$keys.length; _i++) {
        var prop = _Object$keys[_i];
        if (typeof global[prop] !== 'undefined') {
          // avoid global override
          continue;
        }
        if (_startsWithInstanceProperty(prop).call(prop, '_')) {
          // ignore private
          continue;
        }
        if (isFunction(conn[prop])) {
          context[prop] = createProxyFunc(prop);
        } else if (isObject(conn[prop])) {
          defineProp(context, prop, createProxyAccessor(prop));
        }
      }

      // expose default connection as "$conn"
      defineProp(context, '$conn', function () {
        return cli.getCurrentConnection();
      });
    }
  }]);
}();
export default Repl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJzdGFydCIsInN0YXJ0UmVwbCIsIlRyYW5zZm9ybSIsImpzZm9yY2UiLCJpc1Byb21pc2VMaWtlIiwiaXNOdW1iZXIiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJpbmplY3RCZWZvcmUiLCJyZXBsU2VydmVyIiwibWV0aG9kIiwiYmVmb3JlRm4iLCJfb3JpZyIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiY2FsbGJhY2siLCJwb3AiLCJhcHBseSIsIl90b0NvbnN1bWFibGVBcnJheSIsIl9jb25jYXRJbnN0YW5jZVByb3BlcnR5IiwiY2FsbCIsImVyciIsInJlcyIsImluamVjdEFmdGVyIiwiYWZ0ZXJGbiIsIl9sZW4yIiwiX2tleTIiLCJfbGVuMyIsIl9rZXkzIiwiZSIsInByb21pc2lmeSIsInZhbHVlIiwidGhlbiIsInYiLCJvdXRwdXRUb1N0ZG91dCIsInByZXR0eVByaW50IiwiY29uc29sZSIsImVycm9yIiwic3RyIiwiX0pTT04kc3RyaW5naWZ5IiwibG9nIiwiZGVmaW5lUHJvcCIsIm9iaiIsInByb3AiLCJnZXR0ZXIiLCJfT2JqZWN0JGRlZmluZVByb3BlcnR5IiwiZ2V0IiwiUmVwbCIsImNsaSIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwidW5kZWZpbmVkIiwiX2NsaSIsIl9pbiIsIl9vdXQiLCJfdHJhbnNmb3JtIiwiY2h1bmsiLCJlbmNvZGluZyIsIl9wYXVzZWQiLCJwdXNoIiwiX2ludGVyYWN0aXZlIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwiX3RoaXMyIiwib3B0aW9ucyIsImludGVyYWN0aXZlIiwicHJvY2VzcyIsInN0ZGluIiwicmVzdW1lIiwic2V0UmF3TW9kZSIsInBpcGUiLCJzdGRvdXQiLCJjb2x1bW5zIiwiX3JlcGxTZXJ2ZXIiLCJpbnB1dCIsIm91dHB1dCIsInRlcm1pbmFsIiwiX2RlZmluZUFkZGl0aW9uYWxDb21tYW5kcyIsImxpbmUiLCJjb21wbGV0ZSIsInJldHMiLCJjYXRjaCIsImV4aXQiLCJvbiIsIl9kZWZpbmVCdWlsdGluVmFycyIsImNvbnRleHQiLCJldmFsU2NyaXB0Iiwid3JpdGUiLCJkZWZpbmVDb21tYW5kIiwiaGVscCIsImFjdGlvbiIsIl9hY3Rpb24iLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJsaXN0Q29ubmVjdGlvbnMiLCJkaXNwbGF5UHJvbXB0Iiwic3RvcCIsIl9hY3Rpb24yIiwiX2NhbGxlZTIiLCJfbGVuNCIsIl9rZXk0IiwibmFtZSIsInBhc3N3b3JkIiwicGFyYW1zIiwiX2FyZ3MyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiY29ubmVjdGlvbiIsInVzZXJuYW1lIiwiY29ubmVjdCIsInQwIiwiRXJyb3IiLCJtZXNzYWdlIiwiZGlzY29ubmVjdCIsImxvZ2luU2VydmVyIiwic2V0TG9naW5TZXJ2ZXIiLCJfYWN0aW9uMyIsIl9jYWxsZWUzIiwiY2xpZW50TmFtZSIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImF1dGhvcml6ZSIsIl94IiwiX2FjdGlvbjQiLCJfY2FsbGVlNCIsIl9sZW41IiwiX2tleTUiLCJjbGllbnRJZCIsImNsaWVudFNlY3JldCIsInJlZGlyZWN0VXJpIiwibG9naW5VcmwiLCJjb25maWciLCJfYXJnczQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJyZWdpc3RlciIsInVybCIsIm9wZW5VcmxVc2luZ1Nlc3Npb24iLCJwYXVzZSIsIl9jb21wbGV0ZSIsIl9jYWxsZWU1IiwidG9rZW5zIiwiX3Rva2VucyIsImNvbW1hbmQiLCJfdG9rZW5zJCIsImtleXdvcmQiLCJjYW5kaWRhdGVzIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwicmVwbGFjZSIsInNwbGl0IiwiX3NsaWNlZFRvQXJyYXkiLCJfc3RhcnRzV2l0aEluc3RhbmNlUHJvcGVydHkiLCJnZXRDb25uZWN0aW9uTmFtZXMiLCJzZW50IiwiZ2V0Q2xpZW50TmFtZXMiLCJfZmlsdGVySW5zdGFuY2VQcm9wZXJ0eSIsImFicnVwdCIsIl94MiIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiZ2xvYmFsIiwiY3JlYXRlUHJveHlGdW5jIiwiX3JlZiIsImNvbm4iLCJnZXRDdXJyZW50Q29ubmVjdGlvbiIsImNyZWF0ZVByb3h5QWNjZXNzb3IiLCJwcm9wcyIsIm8iLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9PYmplY3QkZ2V0T3duUHJvcGVydHlOYW1lcyIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwicCIsImYiLCJfT2JqZWN0JGdldFByb3RvdHlwZU9mIiwiX2kiLCJfT2JqZWN0JGtleXMiLCJfT2JqZWN0JGtleXMyIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9yZXBsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQ3JlYXRlcyBSRVBMIGludGVyZmFjZSB3aXRoIGJ1aWx0IGluIFNhbGVzZm9yY2UgQVBJIG9iamVjdHMgYW5kIGF1dG9tYXRpY2FsbHkgcmVzb2x2ZXMgcHJvbWlzZSBvYmplY3RcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICogQHByaXZhdGVcbiAqL1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IFJFUExTZXJ2ZXIsIHN0YXJ0IGFzIHN0YXJ0UmVwbCB9IGZyb20gJ3JlcGwnO1xuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCBqc2ZvcmNlIGZyb20gJy4uJztcbmltcG9ydCB7XG4gIGlzUHJvbWlzZUxpa2UsXG4gIGlzTnVtYmVyLFxuICBpc0Z1bmN0aW9uLFxuICBpc09iamVjdCxcbn0gZnJvbSAnLi4vdXRpbC9mdW5jdGlvbic7XG5pbXBvcnQgeyBDbGkgfSBmcm9tICcuL2NsaSc7XG5cbi8qKlxuICogSW50ZXJjZXB0IHRoZSBldmFsZWQgdmFsdWUgcmV0dXJuZWQgZnJvbSByZXBsIGV2YWx1YXRvciwgY29udmVydCBhbmQgc2VuZCBiYWNrIHRvIG91dHB1dC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGluamVjdEJlZm9yZShcbiAgcmVwbFNlcnZlcjogUkVQTFNlcnZlcixcbiAgbWV0aG9kOiBzdHJpbmcsXG4gIGJlZm9yZUZuOiBGdW5jdGlvbixcbikge1xuICBjb25zdCBfb3JpZzogRnVuY3Rpb24gPSAocmVwbFNlcnZlciBhcyBhbnkpW21ldGhvZF07XG4gIChyZXBsU2VydmVyIGFzIGFueSlbbWV0aG9kXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNvbnN0IGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICBiZWZvcmVGbihcbiAgICAgIC4uLmFyZ3MuY29uY2F0KChlcnI6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVyciB8fCByZXMpIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnIsIHJlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX29yaWcuYXBwbHkocmVwbFNlcnZlciwgYXJncy5jb25jYXQoY2FsbGJhY2spKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfTtcbiAgcmV0dXJuIHJlcGxTZXJ2ZXI7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaW5qZWN0QWZ0ZXIoXG4gIHJlcGxTZXJ2ZXI6IFJFUExTZXJ2ZXIsXG4gIG1ldGhvZDogc3RyaW5nLFxuICBhZnRlckZuOiBGdW5jdGlvbixcbikge1xuICBjb25zdCBfb3JpZzogRnVuY3Rpb24gPSAocmVwbFNlcnZlciBhcyBhbnkpW21ldGhvZF07XG4gIChyZXBsU2VydmVyIGFzIGFueSlbbWV0aG9kXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNvbnN0IGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICBfb3JpZy5hcHBseShcbiAgICAgIHJlcGxTZXJ2ZXIsXG4gICAgICBhcmdzLmNvbmNhdCgoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhZnRlckZuKC4uLmFyZ3MuY29uY2F0KGNhbGxiYWNrKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfTtcbiAgcmV0dXJuIHJlcGxTZXJ2ZXI7XG59XG5cbi8qKlxuICogV2hlbiB0aGUgcmVzdWx0IHdhcyBcInByb21pc2VcIiwgcmVzb2x2ZSBpdHMgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHByb21pc2lmeShcbiAgZXJyOiBFcnJvciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIHZhbHVlOiBhbnksXG4gIGNhbGxiYWNrOiBGdW5jdGlvbixcbikge1xuICAvLyBjYWxsYmFjayBpbW1lZGlhdGVseSBpZiBubyB2YWx1ZSBwYXNzZWRcbiAgaWYgKCFjYWxsYmFjayAmJiBpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIGNhbGxiYWNrID0gdmFsdWU7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIH1cbiAgaWYgKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxuICBpZiAoaXNQcm9taXNlTGlrZSh2YWx1ZSkpIHtcbiAgICB2YWx1ZS50aGVuKFxuICAgICAgKHY6IGFueSkgPT4ge1xuICAgICAgICBjYWxsYmFjayhudWxsLCB2KTtcbiAgICAgIH0sXG4gICAgICAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjayhudWxsLCB2YWx1ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBPdXRwdXQgb2JqZWN0IHRvIHN0ZG91dCBpbiBKU09OIHJlcHJlc2VudGF0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBvdXRwdXRUb1N0ZG91dChwcmV0dHlQcmludD86IHN0cmluZyB8IG51bWJlcikge1xuICBpZiAocHJldHR5UHJpbnQgJiYgIWlzTnVtYmVyKHByZXR0eVByaW50KSkge1xuICAgIHByZXR0eVByaW50ID0gNDtcbiAgfVxuICByZXR1cm4gKGVycjogYW55LCB2YWx1ZTogYW55LCBjYWxsYmFjazogRnVuY3Rpb24pID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCBwcmV0dHlQcmludCk7XG4gICAgICBjb25zb2xlLmxvZyhzdHIpO1xuICAgIH1cbiAgICBjYWxsYmFjayhlcnIsIHZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBkZWZpbmUgZ2V0IGFjY2Vzc29yIHVzaW5nIE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVmaW5lUHJvcChvYmo6IE9iamVjdCwgcHJvcDogc3RyaW5nLCBnZXR0ZXI6ICgpID0+IGFueSkge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgeyBnZXQ6IGdldHRlciB9KTtcbiAgfVxufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXBsIHtcbiAgX2NsaTogQ2xpO1xuICBfaW46IFRyYW5zZm9ybTtcbiAgX291dDogVHJhbnNmb3JtO1xuICBfaW50ZXJhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuICBfcGF1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gIF9yZXBsU2VydmVyOiBSRVBMU2VydmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGNsaTogQ2xpKSB7XG4gICAgdGhpcy5fY2xpID0gY2xpO1xuICAgIHRoaXMuX2luID0gbmV3IFRyYW5zZm9ybSgpO1xuICAgIHRoaXMuX291dCA9IG5ldyBUcmFuc2Zvcm0oKTtcbiAgICB0aGlzLl9pbi5fdHJhbnNmb3JtID0gKGNodW5rLCBlbmNvZGluZywgY2FsbGJhY2spID0+IHtcbiAgICAgIGlmICghdGhpcy5fcGF1c2VkKSB7XG4gICAgICAgIHRoaXMuX2luLnB1c2goY2h1bmspO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9O1xuICAgIHRoaXMuX291dC5fdHJhbnNmb3JtID0gKGNodW5rLCBlbmNvZGluZywgY2FsbGJhY2spID0+IHtcbiAgICAgIGlmICghdGhpcy5fcGF1c2VkICYmIHRoaXMuX2ludGVyYWN0aXZlICE9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9vdXQucHVzaChjaHVuayk7XG4gICAgICB9XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHN0YXJ0KFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGludGVyYWN0aXZlPzogYm9vbGVhbjtcbiAgICAgIHByZXR0eVByaW50Pzogc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgZXZhbFNjcmlwdD86IHN0cmluZztcbiAgICB9ID0ge30sXG4gICkge1xuICAgIHRoaXMuX2ludGVyYWN0aXZlID0gb3B0aW9ucy5pbnRlcmFjdGl2ZSAhPT0gZmFsc2U7XG5cbiAgICBwcm9jZXNzLnN0ZGluLnJlc3VtZSgpO1xuICAgIGlmIChwcm9jZXNzLnN0ZGluLnNldFJhd01vZGUpIHtcbiAgICAgIHByb2Nlc3Muc3RkaW4uc2V0UmF3TW9kZSh0cnVlKTtcbiAgICB9XG4gICAgcHJvY2Vzcy5zdGRpbi5waXBlKHRoaXMuX2luKTtcblxuICAgIHRoaXMuX291dC5waXBlKHByb2Nlc3Muc3Rkb3V0KTtcblxuICAgIGRlZmluZVByb3AodGhpcy5fb3V0LCAnY29sdW1ucycsICgpID0+IHByb2Nlc3Muc3Rkb3V0LmNvbHVtbnMpO1xuXG4gICAgdGhpcy5fcmVwbFNlcnZlciA9IHN0YXJ0UmVwbCh7XG4gICAgICBpbnB1dDogdGhpcy5faW4sXG4gICAgICBvdXRwdXQ6IHRoaXMuX291dCxcbiAgICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fZGVmaW5lQWRkaXRpb25hbENvbW1hbmRzKCk7XG5cbiAgICB0aGlzLl9yZXBsU2VydmVyID0gaW5qZWN0QmVmb3JlKFxuICAgICAgdGhpcy5fcmVwbFNlcnZlcixcbiAgICAgICdjb21wbGV0ZXInLFxuICAgICAgKGxpbmU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuY29tcGxldGUobGluZSlcbiAgICAgICAgICAudGhlbigocmV0cykgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmV0cyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgKTtcbiAgICB0aGlzLl9yZXBsU2VydmVyID0gaW5qZWN0QWZ0ZXIodGhpcy5fcmVwbFNlcnZlciwgJ2V2YWwnLCBwcm9taXNpZnkpO1xuXG4gICAgaWYgKG9wdGlvbnMuaW50ZXJhY3RpdmUgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9yZXBsU2VydmVyID0gaW5qZWN0QWZ0ZXIoXG4gICAgICAgIHRoaXMuX3JlcGxTZXJ2ZXIsXG4gICAgICAgICdldmFsJyxcbiAgICAgICAgb3V0cHV0VG9TdGRvdXQob3B0aW9ucy5wcmV0dHlQcmludCksXG4gICAgICApO1xuICAgICAgdGhpcy5fcmVwbFNlcnZlciA9IGluamVjdEFmdGVyKHRoaXMuX3JlcGxTZXJ2ZXIsICdldmFsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9yZXBsU2VydmVyLm9uKCdleGl0JywgKCkgPT4gcHJvY2Vzcy5leGl0KCkpO1xuXG4gICAgdGhpcy5fZGVmaW5lQnVpbHRpblZhcnModGhpcy5fcmVwbFNlcnZlci5jb250ZXh0KTtcblxuICAgIGlmIChvcHRpb25zLmV2YWxTY3JpcHQpIHtcbiAgICAgIHRoaXMuX2luLndyaXRlKG9wdGlvbnMuZXZhbFNjcmlwdCArICdcXG4nLCAndXRmLTgnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgX2RlZmluZUFkZGl0aW9uYWxDb21tYW5kcygpIHtcbiAgICBjb25zdCBjbGkgPSB0aGlzLl9jbGk7XG4gICAgY29uc3QgcmVwbFNlcnZlciA9IHRoaXMuX3JlcGxTZXJ2ZXI7XG4gICAgaWYgKCFyZXBsU2VydmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlcGxTZXJ2ZXIuZGVmaW5lQ29tbWFuZCgnY29ubmVjdGlvbnMnLCB7XG4gICAgICBoZWxwOiAnTGlzdCBjdXJyZW50eSByZWdpc3RlcmVkIFNhbGVzZm9yY2UgY29ubmVjdGlvbnMnLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGNsaS5saXN0Q29ubmVjdGlvbnMoKTtcbiAgICAgICAgcmVwbFNlcnZlci5kaXNwbGF5UHJvbXB0KCk7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlcGxTZXJ2ZXIuZGVmaW5lQ29tbWFuZCgnY29ubmVjdCcsIHtcbiAgICAgIGhlbHA6ICdDb25uZWN0IHRvIFNhbGVzZm9yY2UgaW5zdGFuY2UnLFxuICAgICAgYWN0aW9uOiBhc3luYyAoLi4uYXJnczogc3RyaW5nW10pID0+IHtcbiAgICAgICAgY29uc3QgW25hbWUsIHBhc3N3b3JkXSA9IGFyZ3M7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhc3N3b3JkXG4gICAgICAgICAgPyB7IGNvbm5lY3Rpb246IG5hbWUsIHVzZXJuYW1lOiBuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfVxuICAgICAgICAgIDogeyBjb25uZWN0aW9uOiBuYW1lLCB1c2VybmFtZTogbmFtZSB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGNsaS5jb25uZWN0KHBhcmFtcyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcGxTZXJ2ZXIuZGlzcGxheVByb21wdCgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXBsU2VydmVyLmRlZmluZUNvbW1hbmQoJ2Rpc2Nvbm5lY3QnLCB7XG4gICAgICBoZWxwOiAnRGlzY29ubmVjdCBjb25uZWN0aW9uIGFuZCBlcmFzZSBpdCBmcm9tIHJlZ2lzdHJ5JyxcbiAgICAgIGFjdGlvbjogKG5hbWUpID0+IHtcbiAgICAgICAgY2xpLmRpc2Nvbm5lY3QobmFtZSk7XG4gICAgICAgIHJlcGxTZXJ2ZXIuZGlzcGxheVByb21wdCgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXBsU2VydmVyLmRlZmluZUNvbW1hbmQoJ3VzZScsIHtcbiAgICAgIGhlbHA6ICdTcGVjaWZ5IGxvZ2luIHNlcnZlciB0byBlc3RhYmxpc2ggY29ubmVjdGlvbicsXG4gICAgICBhY3Rpb246IChsb2dpblNlcnZlcikgPT4ge1xuICAgICAgICBjbGkuc2V0TG9naW5TZXJ2ZXIobG9naW5TZXJ2ZXIpO1xuICAgICAgICByZXBsU2VydmVyLmRpc3BsYXlQcm9tcHQoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVwbFNlcnZlci5kZWZpbmVDb21tYW5kKCdhdXRob3JpemUnLCB7XG4gICAgICBoZWxwOiAnQ29ubmVjdCB0byBTYWxlc2ZvcmNlIHVzaW5nIE9BdXRoMiBhdXRob3JpemF0aW9uIGZsb3cnLFxuICAgICAgYWN0aW9uOiBhc3luYyAoY2xpZW50TmFtZSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGNsaS5hdXRob3JpemUoY2xpZW50TmFtZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcGxTZXJ2ZXIuZGlzcGxheVByb21wdCgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXBsU2VydmVyLmRlZmluZUNvbW1hbmQoJ3JlZ2lzdGVyJywge1xuICAgICAgaGVscDogJ1JlZ2lzdGVyIE9BdXRoMiBjbGllbnQgaW5mb3JtYXRpb24nLFxuICAgICAgYWN0aW9uOiBhc3luYyAoLi4uYXJnczogc3RyaW5nW10pID0+IHtcbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgIGNsaWVudE5hbWUsXG4gICAgICAgICAgY2xpZW50SWQsXG4gICAgICAgICAgY2xpZW50U2VjcmV0LFxuICAgICAgICAgIHJlZGlyZWN0VXJpLFxuICAgICAgICAgIGxvZ2luVXJsLFxuICAgICAgICBdID0gYXJncztcbiAgICAgICAgY29uc3QgY29uZmlnID0geyBjbGllbnRJZCwgY2xpZW50U2VjcmV0LCByZWRpcmVjdFVyaSwgbG9naW5VcmwgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBjbGkucmVnaXN0ZXIoY2xpZW50TmFtZSwgY29uZmlnKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVwbFNlcnZlci5kaXNwbGF5UHJvbXB0KCk7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlcGxTZXJ2ZXIuZGVmaW5lQ29tbWFuZCgnb3BlbicsIHtcbiAgICAgIGhlbHA6ICdPcGVuIFNhbGVzZm9yY2Ugd2ViIHBhZ2UgdXNpbmcgZXN0YWJsaXNoZWQgY29ubmVjdGlvbicsXG4gICAgICBhY3Rpb246ICh1cmwpID0+IHtcbiAgICAgICAgY2xpLm9wZW5VcmxVc2luZ1Nlc3Npb24odXJsKTtcbiAgICAgICAgcmVwbFNlcnZlci5kaXNwbGF5UHJvbXB0KCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBwYXVzZSgpIHtcbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuICAgIGlmIChwcm9jZXNzLnN0ZGluLnNldFJhd01vZGUpIHtcbiAgICAgIHByb2Nlc3Muc3RkaW4uc2V0UmF3TW9kZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICByZXN1bWUoKSB7XG4gICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG4gICAgcHJvY2Vzcy5zdGRpbi5yZXN1bWUoKTtcbiAgICBpZiAocHJvY2Vzcy5zdGRpbi5zZXRSYXdNb2RlKSB7XG4gICAgICBwcm9jZXNzLnN0ZGluLnNldFJhd01vZGUodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBjb21wbGV0ZShsaW5lOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0b2tlbnMgPSBsaW5lLnJlcGxhY2UoL15cXHMrLywgJycpLnNwbGl0KC9cXHMrLyk7XG4gICAgY29uc3QgW2NvbW1hbmQsIGtleXdvcmQgPSAnJ10gPSB0b2tlbnM7XG4gICAgaWYgKGNvbW1hbmQuc3RhcnRzV2l0aCgnLicpICYmIHRva2Vucy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGxldCBjYW5kaWRhdGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgaWYgKGNvbW1hbmQgPT09ICcuY29ubmVjdCcgfHwgY29tbWFuZCA9PT0gJy5kaXNjb25uZWN0Jykge1xuICAgICAgICBjYW5kaWRhdGVzID0gYXdhaXQgdGhpcy5fY2xpLmdldENvbm5lY3Rpb25OYW1lcygpO1xuICAgICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnLmF1dGhvcml6ZScpIHtcbiAgICAgICAgY2FuZGlkYXRlcyA9IGF3YWl0IHRoaXMuX2NsaS5nZXRDbGllbnROYW1lcygpO1xuICAgICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnLnVzZScpIHtcbiAgICAgICAgY2FuZGlkYXRlcyA9IFsncHJvZHVjdGlvbicsICdzYW5kYm94J107XG4gICAgICB9XG4gICAgICBjYW5kaWRhdGVzID0gY2FuZGlkYXRlcy5maWx0ZXIoKG5hbWUpID0+IG5hbWUuc3RhcnRzV2l0aChrZXl3b3JkKSk7XG4gICAgICByZXR1cm4gW2NhbmRpZGF0ZXMsIGtleXdvcmRdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXAgYWxsIGpzZm9yY2Ugb2JqZWN0IHRvIFJFUEwgY29udGV4dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2RlZmluZUJ1aWx0aW5WYXJzKGNvbnRleHQ6IHsgW3Zhck5hbWU6IHN0cmluZ106IGFueSB9KSB7XG4gICAgY29uc3QgY2xpID0gdGhpcy5fY2xpO1xuXG4gICAgLy8gZGVmaW5lIHNhbGVzZm9yY2UgcGFja2FnZSByb290IG9iamVjdHNcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBqc2ZvcmNlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChqc2ZvcmNlLCBrZXkpICYmXG4gICAgICAgICEoZ2xvYmFsIGFzIGFueSlba2V5XVxuICAgICAgKSB7XG4gICAgICAgIGNvbnRleHRba2V5XSA9IChqc2ZvcmNlIGFzIGFueSlba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZXhwb3NlIGpzZm9yY2UgcGFja2FnZSByb290IG9iamVjdCBpbiBjb250ZXh0LlxuICAgIGNvbnRleHQuanNmb3JjZSA9IGpzZm9yY2U7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm94eUZ1bmMocHJvcDogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbm4gPSBjbGkuZ2V0Q3VycmVudENvbm5lY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIChjb25uIGFzIGFueSlbcHJvcF0oLi4uYXJncyk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb3h5QWNjZXNzb3IocHJvcDogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25uID0gY2xpLmdldEN1cnJlbnRDb25uZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiAoY29ubiBhcyBhbnkpW3Byb3BdO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjb25uID0gY2xpLmdldEN1cnJlbnRDb25uZWN0aW9uKCk7XG4gICAgLy8gbGlzdCBhbGwgcHJvcHMgaW4gY29ubmVjdGlvbiBpbnN0YW5jZSwgb3RoZXIgdGhhbiBFdmVudEVtaXR0ZXIgb3Igb2JqZWN0IGJ1aWx0LWluIG1ldGhvZHNcbiAgICBjb25zdCBwcm9wczogeyBbcHJvcDogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gICAgbGV0IG86IG9iamVjdCA9IGNvbm47XG4gICAgd2hpbGUgKG8gJiYgbyAhPT0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZSAmJiBvICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICBmb3IgKGNvbnN0IHAgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykpIHtcbiAgICAgICAgaWYgKHAgIT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICBwcm9wc1twXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3Qua2V5cyhwcm9wcykpIHtcbiAgICAgIGlmICh0eXBlb2YgKGdsb2JhbCBhcyBhbnkpW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBhdm9pZCBnbG9iYWwgb3ZlcnJpZGVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAocHJvcC5zdGFydHNXaXRoKCdfJykpIHtcbiAgICAgICAgLy8gaWdub3JlIHByaXZhdGVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNGdW5jdGlvbigoY29ubiBhcyBhbnkpW3Byb3BdKSkge1xuICAgICAgICBjb250ZXh0W3Byb3BdID0gY3JlYXRlUHJveHlGdW5jKHByb3ApO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCgoY29ubiBhcyBhbnkpW3Byb3BdKSkge1xuICAgICAgICBkZWZpbmVQcm9wKGNvbnRleHQsIHByb3AsIGNyZWF0ZVByb3h5QWNjZXNzb3IocHJvcCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV4cG9zZSBkZWZhdWx0IGNvbm5lY3Rpb24gYXMgXCIkY29ublwiXG4gICAgZGVmaW5lUHJvcChjb250ZXh0LCAnJGNvbm4nLCAoKSA9PiB7XG4gICAgICByZXR1cm4gY2xpLmdldEN1cnJlbnRDb25uZWN0aW9uKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVwbDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0EsWUFBWSxRQUFRLFFBQVE7QUFDckMsU0FBcUJDLEtBQUssSUFBSUMsU0FBUyxRQUFRLE1BQU07QUFDckQsU0FBU0MsU0FBUyxRQUFRLFFBQVE7QUFDbEMsT0FBT0MsT0FBTyxNQUFNLElBQUk7QUFDeEIsU0FDRUMsYUFBYSxFQUNiQyxRQUFRLEVBQ1JDLFVBQVUsRUFDVkMsUUFBUSxRQUNILGtCQUFrQjtBQUd6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNDLFlBQVlBLENBQ25CQyxVQUFzQixFQUN0QkMsTUFBYyxFQUNkQyxRQUFrQixFQUNsQjtFQUNBLElBQU1DLEtBQWUsR0FBSUgsVUFB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