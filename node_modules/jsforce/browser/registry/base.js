import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
var _excluded = ["client"],
  _excluded2 = ["oauth2"];
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context10, _context11; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context10 = ownKeys(Object(t), !0)).call(_context10, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context11 = ownKeys(Object(t))).call(_context11, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.push.js";
import Connection from '../connection';
/**
 *
 */
export var BaseRegistry = /*#__PURE__*/function () {
  function BaseRegistry() {
    _classCallCheck(this, BaseRegistry);
    _defineProperty(this, "_registryConfig", {});
  }
  return _createClass(BaseRegistry, [{
    key: "_saveConfig",
    value: function _saveConfig() {
      throw new Error('_saveConfig must be implemented in subclass');
    }
  }, {
    key: "_getClients",
    value: function _getClients() {
      return this._registryConfig.clients || (this._registryConfig.clients = {});
    }
  }, {
    key: "_getConnections",
    value: function _getConnections() {
      return this._registryConfig.connections || (this._registryConfig.connections = {});
    }

    // eslint-disable-next-line @typescript-eslint/require-await
  }, {
    key: "getConnectionNames",
    value: function () {
      var _getConnectionNames = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _Object$keys(this._getConnections()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getConnectionNames() {
        return _getConnectionNames.apply(this, arguments);
      }
      return getConnectionNames;
    }()
  }, {
    key: "getConnection",
    value: function () {
      var _getConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(name) {
        var config;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getConnectionConfig(name);
            case 2:
              config = _context2.sent;
              return _context2.abrupt("return", config ? new Connection(config) : null);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getConnection(_x) {
        return _getConnection.apply(this, arguments);
      }
      return getConnection;
    }()
  }, {
    key: "getConnectionConfig",
    value: function () {
      var _getConnectionConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(name) {
        var connections, connConfig, client, connConfig_;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!name) {
                name = this._registryConfig['default'];
              }
              connections = this._getConnections();
              connConfig = name ? connections[name] : undefined;
              if (connConfig) {
                _context3.next = 5;
                break;
              }
              return _context3.abrupt("return", null);
            case 5:
              client = connConfig.client, connConfig_ = _objectWithoutProperties(connConfig, _excluded);
              if (!client) {
                _context3.next = 18;
                break;
              }
              _context3.t0 = _objectSpread;
              _context3.t1 = _objectSpread({}, connConfig_);
              _context3.t2 = {};
              _context3.t3 = _objectSpread;
              _context3.t4 = {};
              _context3.next = 14;
              return this.getClientConfig(client);
            case 14:
              _context3.t5 = _context3.sent;
              _context3.t6 = (0, _context3.t3)(_context3.t4, _context3.t5);
              _context3.t7 = {
                oauth2: _context3.t6
              };
              return _context3.abrupt("return", (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t7));
            case 18:
              return _context3.abrupt("return", connConfig_);
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getConnectionConfig(_x2) {
        return _getConnectionConfig.apply(this, arguments);
      }
      return getConnectionConfig;
    }() // eslint-disable-next-line @typescript-eslint/require-await
  }, {
    key: "saveConnectionConfig",
    value: function () {
      var _saveConnectionConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(name, connConfig) {
        var connections, oauth2, connConfig_, persistConnConfig, clientName;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              connections = this._getConnections();
              oauth2 = connConfig.oauth2, connConfig_ = _objectWithoutProperties(connConfig, _excluded2);
              persistConnConfig = connConfig_;
              if (oauth2) {
                clientName = this._findClientName(oauth2);
                if (clientName) {
                  persistConnConfig = _objectSpread(_objectSpread({}, persistConnConfig), {}, {
                    client: clientName
                  });
                }
                delete connConfig.oauth2;
              }
              connections[name] = persistConnConfig;
              this._saveConfig();
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function saveConnectionConfig(_x3, _x4) {
        return _saveConnectionConfig.apply(this, arguments);
      }
      return saveConnectionConfig;
    }()
  }, {
    key: "_findClientName",
    value: function _findClientName(_ref) {
      var clientId = _ref.clientId,
        loginUrl = _ref.loginUrl;
      var clients = this._getClients();
      for (var _i = 0, _Object$keys2 = _Object$keys(clients); _i < _Object$keys2.length; _i++) {
        var name = _Object$keys2[_i];
        var client = clients[name];
        if (client.clientId === clientId && (client.loginUrl || 'https://login.salesforce.com') === loginUrl) {
          return name;
        }
      }
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
  }, {
    key: "setDefaultConnection",
    value: function () {
      var _setDefaultConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(name) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              this._registryConfig['default'] = name;
              this._saveConfig();
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function setDefaultConnection(_x5) {
        return _setDefaultConnection.apply(this, arguments);
      }
      return setDefaultConnection;
    }() // eslint-disable-next-line @typescript-eslint/require-await
  }, {
    key: "removeConnectionConfig",
    value: function () {
      var _removeConnectionConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(name) {
        var connections;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              connections = this._getConnections();
              delete connections[name];
              this._saveConfig();
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function removeConnectionConfig(_x6) {
        return _removeConnectionConfig.apply(this, arguments);
      }
      return removeConnectionConfig;
    }() // eslint-disable-next-line @typescript-eslint/require-await
  }, {
    key: "getClientConfig",
    value: function () {
      var _getClientConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(name) {
        var clients, clientConfig;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              clients = this._getClients();
              clientConfig = clients[name];
              return _context7.abrupt("return", clientConfig && _objectSpread({}, clientConfig));
            case 3:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function getClientConfig(_x7) {
        return _getClientConfig.apply(this, arguments);
      }
      return getClientConfig;
    }() // eslint-disable-next-line @typescript-eslint/require-await
  }, {
    key: "getClientNames",
    value: function () {
      var _getClientNames = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", _Object$keys(this._getClients()));
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function getClientNames() {
        return _getClientNames.apply(this, arguments);
      }
      return getClientNames;
    }() // eslint-disable-next-line @typescript-eslint/require-await
  }, {
    key: "registerClientConfig",
    value: function () {
      var _registerClientConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(name, clientConfig) {
        var clients;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              clients = this._getClients();
              clients[name] = clientConfig;
              this._saveConfig();
            case 3:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function registerClientConfig(_x8, _x9) {
        return _registerClientConfig.apply(this, arguments);
      }
      return registerClientConfig;
    }()
  }]);
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb25uZWN0aW9uIiwiQmFzZVJlZ2lzdHJ5IiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJfc2F2ZUNvbmZpZyIsIkVycm9yIiwiX2dldENsaWVudHMiLCJfcmVnaXN0cnlDb25maWciLCJjbGllbnRzIiwiX2dldENvbm5lY3Rpb25zIiwiY29ubmVjdGlvbnMiLCJfZ2V0Q29ubmVjdGlvbk5hbWVzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiYWJydXB0IiwiX09iamVjdCRrZXlzIiwic3RvcCIsImdldENvbm5lY3Rpb25OYW1lcyIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2dldENvbm5lY3Rpb24iLCJfY2FsbGVlMiIsIm5hbWUiLCJjb25maWciLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJnZXRDb25uZWN0aW9uQ29uZmlnIiwic2VudCIsImdldENvbm5lY3Rpb24iLCJfeCIsIl9nZXRDb25uZWN0aW9uQ29uZmlnIiwiX2NhbGxlZTMiLCJjb25uQ29uZmlnIiwiY2xpZW50IiwiY29ubkNvbmZpZ18iLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJ1bmRlZmluZWQiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfZXhjbHVkZWQiLCJ0MCIsIl9vYmplY3RTcHJlYWQiLCJ0MSIsInQyIiwidDMiLCJ0NCIsImdldENsaWVudENvbmZpZyIsInQ1IiwidDYiLCJ0NyIsIm9hdXRoMiIsIl94MiIsIl9zYXZlQ29ubmVjdGlvbkNvbmZpZyIsIl9jYWxsZWU0IiwicGVyc2lzdENvbm5Db25maWciLCJjbGllbnROYW1lIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiX2V4Y2x1ZGVkMiIsIl9maW5kQ2xpZW50TmFtZSIsInNhdmVDb25uZWN0aW9uQ29uZmlnIiwiX3gzIiwiX3g0IiwiX3JlZiIsImNsaWVudElkIiwibG9naW5VcmwiLCJfaSIsIl9PYmplY3Qka2V5czIiLCJsZW5ndGgiLCJfc2V0RGVmYXVsdENvbm5lY3Rpb24iLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInNldERlZmF1bHRDb25uZWN0aW9uIiwiX3g1IiwiX3JlbW92ZUNvbm5lY3Rpb25Db25maWciLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsInJlbW92ZUNvbm5lY3Rpb25Db25maWciLCJfeDYiLCJfZ2V0Q2xpZW50Q29uZmlnIiwiX2NhbGxlZTciLCJjbGllbnRDb25maWciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJfeDciLCJfZ2V0Q2xpZW50TmFtZXMiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsImdldENsaWVudE5hbWVzIiwiX3JlZ2lzdGVyQ2xpZW50Q29uZmlnIiwiX2NhbGxlZTkiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJyZWdpc3RlckNsaWVudENvbmZpZyIsIl94OCIsIl94OSJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWdpc3RyeS9iYXNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25uZWN0aW9uIGZyb20gJy4uL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IHtcbiAgUmVnaXN0cnlDb25maWcsXG4gIFJlZ2lzdHJ5LFxuICBDb25uZWN0aW9uQ29uZmlnLFxuICBQZXJzaXN0Q29ubmVjdGlvbkNvbmZpZyxcbiAgQ2xpZW50Q29uZmlnLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQmFzZVJlZ2lzdHJ5IGltcGxlbWVudHMgUmVnaXN0cnkge1xuICBfcmVnaXN0cnlDb25maWc6IFJlZ2lzdHJ5Q29uZmlnID0ge307XG5cbiAgX3NhdmVDb25maWcoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdfc2F2ZUNvbmZpZyBtdXN0IGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzJyk7XG4gIH1cblxuICBfZ2V0Q2xpZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnlDb25maWcuY2xpZW50cyB8fCAodGhpcy5fcmVnaXN0cnlDb25maWcuY2xpZW50cyA9IHt9KTtcbiAgfVxuXG4gIF9nZXRDb25uZWN0aW9ucygpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5fcmVnaXN0cnlDb25maWcuY29ubmVjdGlvbnMgfHxcbiAgICAgICh0aGlzLl9yZWdpc3RyeUNvbmZpZy5jb25uZWN0aW9ucyA9IHt9KVxuICAgICk7XG4gIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvcmVxdWlyZS1hd2FpdFxuYXN5bmMgZ2V0Q29ubmVjdGlvbk5hbWVzKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9nZXRDb25uZWN0aW9ucygpKTtcbiAgfVxuXG4gIGFzeW5jIGdldENvbm5lY3Rpb248UyBleHRlbmRzIFNjaGVtYSA9IFNjaGVtYT4obmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgY29uZmlnID0gYXdhaXQgdGhpcy5nZXRDb25uZWN0aW9uQ29uZmlnKG5hbWUpO1xuICAgIHJldHVybiBjb25maWcgPyBuZXcgQ29ubmVjdGlvbjxTPihjb25maWcpIDogbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGdldENvbm5lY3Rpb25Db25maWcobmFtZT86IHN0cmluZykge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgbmFtZSA9IHRoaXMuX3JlZ2lzdHJ5Q29uZmlnWydkZWZhdWx0J107XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gdGhpcy5fZ2V0Q29ubmVjdGlvbnMoKTtcbiAgICBjb25zdCBjb25uQ29uZmlnID0gbmFtZSA/IGNvbm5lY3Rpb25zW25hbWVdIDogdW5kZWZpbmVkO1xuICAgIGlmICghY29ubkNvbmZpZykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHsgY2xpZW50LCAuLi5jb25uQ29uZmlnXyB9ID0gY29ubkNvbmZpZztcbiAgICBpZiAoY2xpZW50KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5jb25uQ29uZmlnXyxcbiAgICAgICAgb2F1dGgyOiB7IC4uLihhd2FpdCB0aGlzLmdldENsaWVudENvbmZpZyhjbGllbnQpKSB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbm5Db25maWdfO1xuICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3JlcXVpcmUtYXdhaXRcbmFzeW5jIHNhdmVDb25uZWN0aW9uQ29uZmlnKG5hbWU6IHN0cmluZywgY29ubkNvbmZpZzogQ29ubmVjdGlvbkNvbmZpZykge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gdGhpcy5fZ2V0Q29ubmVjdGlvbnMoKTtcbiAgICBjb25zdCB7IG9hdXRoMiwgLi4uY29ubkNvbmZpZ18gfSA9IGNvbm5Db25maWc7XG4gICAgbGV0IHBlcnNpc3RDb25uQ29uZmlnOiBQZXJzaXN0Q29ubmVjdGlvbkNvbmZpZyA9IGNvbm5Db25maWdfO1xuICAgIGlmIChvYXV0aDIpIHtcbiAgICAgIGNvbnN0IGNsaWVudE5hbWUgPSB0aGlzLl9maW5kQ2xpZW50TmFtZShvYXV0aDIpO1xuICAgICAgaWYgKGNsaWVudE5hbWUpIHtcbiAgICAgICAgcGVyc2lzdENvbm5Db25maWcgPSB7IC4uLnBlcnNpc3RDb25uQ29uZmlnLCBjbGllbnQ6IGNsaWVudE5hbWUgfTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSBjb25uQ29uZmlnLm9hdXRoMjtcbiAgICB9XG4gICAgY29ubmVjdGlvbnNbbmFtZV0gPSBwZXJzaXN0Q29ubkNvbmZpZztcbiAgICB0aGlzLl9zYXZlQ29uZmlnKCk7XG4gIH1cblxuICBfZmluZENsaWVudE5hbWUoeyBjbGllbnRJZCwgbG9naW5VcmwgfTogQ2xpZW50Q29uZmlnKSB7XG4gICAgY29uc3QgY2xpZW50cyA9IHRoaXMuX2dldENsaWVudHMoKTtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMoY2xpZW50cykpIHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGNsaWVudHNbbmFtZV07XG4gICAgICBpZiAoXG4gICAgICAgIGNsaWVudC5jbGllbnRJZCA9PT0gY2xpZW50SWQgJiZcbiAgICAgICAgKGNsaWVudC5sb2dpblVybCB8fCAnaHR0cHM6Ly9sb2dpbi5zYWxlc2ZvcmNlLmNvbScpID09PSBsb2dpblVybFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9yZXF1aXJlLWF3YWl0XG5hc3luYyBzZXREZWZhdWx0Q29ubmVjdGlvbihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9yZWdpc3RyeUNvbmZpZ1snZGVmYXVsdCddID0gbmFtZTtcbiAgICB0aGlzLl9zYXZlQ29uZmlnKCk7XG4gIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvcmVxdWlyZS1hd2FpdFxuYXN5bmMgcmVtb3ZlQ29ubmVjdGlvbkNvbmZpZyhuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb25uZWN0aW9ucyA9IHRoaXMuX2dldENvbm5lY3Rpb25zKCk7XG4gICAgZGVsZXRlIGNvbm5lY3Rpb25zW25hbWVdO1xuICAgIHRoaXMuX3NhdmVDb25maWcoKTtcbiAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9yZXF1aXJlLWF3YWl0XG5hc3luYyBnZXRDbGllbnRDb25maWcobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgY2xpZW50cyA9IHRoaXMuX2dldENsaWVudHMoKTtcbiAgICBjb25zdCBjbGllbnRDb25maWcgPSBjbGllbnRzW25hbWVdO1xuICAgIHJldHVybiBjbGllbnRDb25maWcgJiYgeyAuLi5jbGllbnRDb25maWcgfTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvcmVxdWlyZS1hd2FpdFxuICBhc3luYyBnZXRDbGllbnROYW1lcygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fZ2V0Q2xpZW50cygpKTtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3JlcXVpcmUtYXdhaXRcbiAgYXN5bmMgcmVnaXN0ZXJDbGllbnRDb25maWcobmFtZTogc3RyaW5nLCBjbGllbnRDb25maWc6IENsaWVudENvbmZpZykge1xuICAgIGNvbnN0IGNsaWVudHMgPSB0aGlzLl9nZXRDbGllbnRzKCk7XG4gICAgY2xpZW50c1tuYW1lXSA9IGNsaWVudENvbmZpZztcbiAgICB0aGlzLl9zYXZlQ29uZmlnKCk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxVQUFVLE1BQU0sZUFBZTtBQVV0QztBQUNBO0FBQ0E7QUFDQSxXQUFhQyxZQUFZO0VBQUEsU0FBQUEsYUFBQTtJQUFBQyxlQUFBLE9BQUFELFlBQUE7SUFBQUUsZUFBQSwwQkFDVyxDQUFDLENBQUM7RUFBQTtFQUFBLE9BQUFDLFlBQUEsQ0FBQUgsWUFBQTtJQUFBSSxHQUFBO0lBQUFDLEtBQUEsRUFFcEMsU0FBQUMsWUFBQSxFQUFjO01BQ1osTUFBTSxJQUFJQyxLQUFLLENBQUMsNkNBQTZDLENBQUM7SUFDaEU7RUFBQztJQUFBSCxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBRyxZQUFBLEVBQWM7TUFDWixPQUFPLElBQUksQ0FBQ0MsZUFBZSxDQUFDQyxPQUFPLEtBQUssSUFBSSxDQUFDRCxlQUFlLENBQUNDLE9BQU8sR0FBRyxDQUFDLENBQUMs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