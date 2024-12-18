import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.join.js";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _Object$keys2 from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @file Manages asynchronous method response cache
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { EventEmitter } from 'events';

/**
 * type def
 */
/**
 * Class for managing cache entry
 *
 * @private
 * @class
 * @constructor
 * @template T
 */
var CacheEntry = /*#__PURE__*/function (_EventEmitter) {
  function CacheEntry() {
    var _context;
    var _this;
    _classCallCheck(this, CacheEntry);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, CacheEntry, _concatInstanceProperty(_context = []).call(_context, args));
    _defineProperty(_this, "_fetching", false);
    _defineProperty(_this, "_value", undefined);
    return _this;
  }
  _inherits(CacheEntry, _EventEmitter);
  return _createClass(CacheEntry, [{
    key: "get",
    value:
    /**
     * Get value in the cache entry
     *
     * @param {() => Promise<T>} [callback] - Callback function callbacked the cache entry updated
     * @returns {T|undefined}
     */
    function get(callback) {
      if (callback) {
        var cb = callback;
        this.once('value', function (v) {
          return cb(v);
        });
        if (typeof this._value !== 'undefined') {
          this.emit('value', this._value);
        }
      }
      return this._value;
    }

    /**
     * Set value in the cache entry
     */
  }, {
    key: "set",
    value: function set(value) {
      this._value = value;
      this.emit('value', this._value);
    }

    /**
     * Clear cached value
     */
  }, {
    key: "clear",
    value: function clear() {
      this._fetching = false;
      this._value = undefined;
    }
  }]);
}(EventEmitter);
/**
 * create and return cache key from namespace and serialized arguments.
 * @private
 */
function createCacheKey(namespace, args) {
  var _context2, _context3;
  return _concatInstanceProperty(_context2 = "".concat(namespace || '', "(")).call(_context2, _mapInstanceProperty(_context3 = _toConsumableArray(args)).call(_context3, function (a) {
    return _JSON$stringify(a);
  }).join(','), ")");
}
function generateKeyString(options, scope, args) {
  return typeof options.key === 'string' ? options.key : typeof options.key === 'function' ? options.key.apply(scope, args) : createCacheKey(options.namespace, args);
}

/**
 * Caching manager for async methods
 *
 * @class
 * @constructor
 */
export var Cache = /*#__PURE__*/function () {
  function Cache() {
    _classCallCheck(this, Cache);
    _defineProperty(this, "_entries", {});
  }
  return _createClass(Cache, [{
    key: "get",
    value:
    /**
     * retrive cache entry, or create if not exists.
     *
     * @param {String} [key] - Key of cache entry
     * @returns {CacheEntry}
     */
    function get(key) {
      if (this._entries[key]) {
        return this._entries[key];
      }
      var entry = new CacheEntry();
      this._entries[key] = entry;
      return entry;
    }

    /**
     * clear cache entries prefix matching given key
     */
  }, {
    key: "clear",
    value: function clear(key) {
      for (var _i = 0, _Object$keys = _Object$keys2(this._entries); _i < _Object$keys.length; _i++) {
        var k = _Object$keys[_i];
        if (!key || _startsWithInstanceProperty(k).call(k, key)) {
          this._entries[k].clear();
        }
      }
    }

    /**
     * Enable caching for async call fn to lookup the response cache first,
     * then invoke original if no cached value.
     */
  }, {
    key: "createCachedFunction",
    value: function createCachedFunction(fn, scope) {
      var _this2 = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        strategy: 'NOCACHE'
      };
      var strategy = options.strategy;
      var $fn = function $fn() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var key = generateKeyString(options, scope, args);
        var entry = _this2.get(key);
        var executeFetch = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var result;
            return _regeneratorRuntime.wrap(function _callee$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  entry._fetching = true;
                  _context4.prev = 1;
                  _context4.next = 4;
                  return fn.apply(scope || _this2, args);
                case 4:
                  result = _context4.sent;
                  entry.set({
                    error: undefined,
                    result: result
                  });
                  return _context4.abrupt("return", result);
                case 9:
                  _context4.prev = 9;
                  _context4.t0 = _context4["catch"](1);
                  entry.set({
                    error: _context4.t0,
                    result: undefined
                  });
                  throw _context4.t0;
                case 13:
                case "end":
                  return _context4.stop();
              }
            }, _callee, null, [[1, 9]]);
          }));
          return function executeFetch() {
            return _ref.apply(this, arguments);
          };
        }();
        var value;
        switch (strategy) {
          case 'IMMEDIATE':
            value = entry.get();
            if (!value) {
              throw new Error('Function call result is not cached yet.');
            }
            if (value.error) {
              throw value.error;
            }
            return value.result;
          case 'HIT':
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
              return _regeneratorRuntime.wrap(function _callee2$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    if (entry._fetching) {
                      _context5.next = 3;
                      break;
                    }
                    _context5.next = 3;
                    return executeFetch();
                  case 3:
                    return _context5.abrupt("return", new _Promise(function (resolve, reject) {
                      entry.get(function (_ref3) {
                        var error = _ref3.error,
                          result = _ref3.result;
                        if (error) reject(error);else resolve(result);
                      });
                    }));
                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }, _callee2);
            }))();
          case 'NOCACHE':
          default:
            return executeFetch();
        }
      };
      $fn.clear = function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var key = generateKeyString(options, scope, args);
        _this2.clear(key);
      };
      return $fn;
    }
  }]);
}();
export default Cache;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDYWNoZUVudHJ5IiwiX0V2ZW50RW1pdHRlciIsIl9jb250ZXh0IiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfbGVuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJncyIsIkFycmF5IiwiX2tleSIsIl9jYWxsU3VwZXIiLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsImNhbGwiLCJfZGVmaW5lUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJfaW5oZXJpdHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsImdldCIsImNhbGxiYWNrIiwiY2IiLCJvbmNlIiwidiIsIl92YWx1ZSIsImVtaXQiLCJzZXQiLCJjbGVhciIsIl9mZXRjaGluZyIsImNyZWF0ZUNhY2hlS2V5IiwibmFtZXNwYWNlIiwiX2NvbnRleHQyIiwiX2NvbnRleHQzIiwiY29uY2F0IiwiX21hcEluc3RhbmNlUHJvcGVydHkiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJhIiwiX0pTT04kc3RyaW5naWZ5Iiwiam9pbiIsImdlbmVyYXRlS2V5U3RyaW5nIiwib3B0aW9ucyIsInNjb3BlIiwiYXBwbHkiLCJDYWNoZSIsIl9lbnRyaWVzIiwiZW50cnkiLCJfaSIsIl9PYmplY3Qka2V5cyIsIl9PYmplY3Qka2V5czIiLCJrIiwiX3N0YXJ0c1dpdGhJbnN0YW5jZVByb3BlcnR5IiwiY3JlYXRlQ2FjaGVkRnVuY3Rpb24iLCJmbiIsIl90aGlzMiIsInN0cmF0ZWd5IiwiJGZuIiwiX2xlbjIiLCJfa2V5MiIsImV4ZWN1dGVGZXRjaCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsInJlc3VsdCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0NCIsInByZXYiLCJuZXh0Iiwic2VudCIsImVycm9yIiwiYWJydXB0IiwidDAiLCJzdG9wIiwiRXJyb3IiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0NSIsIl9Qcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIl9yZWYzIiwiX2xlbjMiLCJfa2V5MyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIE1hbmFnZXMgYXN5bmNocm9ub3VzIG1ldGhvZCByZXNwb25zZSBjYWNoZVxuICogQGF1dGhvciBTaGluaWNoaSBUb21pdGEgPHNoaW5pY2hpLnRvbWl0YUBnbWFpbC5jb20+XG4gKi9cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbi8qKlxuICogdHlwZSBkZWZcbiAqL1xuZXhwb3J0IHR5cGUgQ2FjaGluZ09wdGlvbnMgPSB7XG4gIGtleT86IHN0cmluZyB8ICgoLi4uYXJnczogYW55W10pID0+IHN0cmluZyk7XG4gIG5hbWVzcGFjZT86IHN0cmluZztcbiAgc3RyYXRlZ3k6ICdOT0NBQ0hFJyB8ICdISVQnIHwgJ0lNTUVESUFURSc7XG59O1xuXG50eXBlIENhY2hlVmFsdWU8VD4gPSB7XG4gIGVycm9yPzogRXJyb3I7XG4gIHJlc3VsdDogVDtcbn07XG5cbmV4cG9ydCB0eXBlIENhY2hlZEZ1bmN0aW9uPEZuPiA9IEZuICYgeyBjbGVhcjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkIH07XG5cbi8qKlxuICogQ2xhc3MgZm9yIG1hbmFnaW5nIGNhY2hlIGVudHJ5XG4gKlxuICogQHByaXZhdGVcbiAqIEBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKiBAdGVtcGxhdGUgVFxuICovXG5jbGFzcyBDYWNoZUVudHJ5PFQ+IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgX2ZldGNoaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIF92YWx1ZTogQ2FjaGVWYWx1ZTxUPiB8IHZvaWQgPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBpbiB0aGUgY2FjaGUgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIHsoKSA9PiBQcm9taXNlPFQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb24gY2FsbGJhY2tlZCB0aGUgY2FjaGUgZW50cnkgdXBkYXRlZFxuICAgKiBAcmV0dXJucyB7VHx1bmRlZmluZWR9XG4gICAqL1xuICBnZXQoY2FsbGJhY2s/OiAodjogVCkgPT4gYW55KTogQ2FjaGVWYWx1ZTxUPiB8IHZvaWQge1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY29uc3QgY2IgPSBjYWxsYmFjaztcbiAgICAgIHRoaXMub25jZSgndmFsdWUnLCAodjogVCkgPT4gY2IodikpO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl92YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5lbWl0KCd2YWx1ZScsIHRoaXMuX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZSBpbiB0aGUgY2FjaGUgZW50cnlcbiAgICovXG4gIHNldCh2YWx1ZTogQ2FjaGVWYWx1ZTxUPikge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5lbWl0KCd2YWx1ZScsIHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBjYWNoZWQgdmFsdWVcbiAgICovXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2ZldGNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBjcmVhdGUgYW5kIHJldHVybiBjYWNoZSBrZXkgZnJvbSBuYW1lc3BhY2UgYW5kIHNlcmlhbGl6ZWQgYXJndW1lbnRzLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FjaGVLZXkobmFtZXNwYWNlOiBzdHJpbmcgfCB2b2lkLCBhcmdzOiBhbnlbXSk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtuYW1lc3BhY2UgfHwgJyd9KCR7Wy4uLmFyZ3NdXG4gICAgLm1hcCgoYSkgPT4gSlNPTi5zdHJpbmdpZnkoYSkpXG4gICAgLmpvaW4oJywnKX0pYDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVLZXlTdHJpbmcoXG4gIG9wdGlvbnM6IENhY2hpbmdPcHRpb25zLFxuICBzY29wZTogYW55LFxuICBhcmdzOiBhbnlbXSxcbik6IHN0cmluZyB7XG4gIHJldHVybiB0eXBlb2Ygb3B0aW9ucy5rZXkgPT09ICdzdHJpbmcnXG4gICAgPyBvcHRpb25zLmtleVxuICAgIDogdHlwZW9mIG9wdGlvbnMua2V5ID09PSAnZnVuY3Rpb24nXG4gICAgPyBvcHRpb25zLmtleS5hcHBseShzY29wZSwgYXJncylcbiAgICA6IGNyZWF0ZUNhY2hlS2V5KG9wdGlvbnMubmFtZXNwYWNlLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBDYWNoaW5nIG1hbmFnZXIgZm9yIGFzeW5jIG1ldGhvZHNcbiAqXG4gKiBAY2xhc3NcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgY2xhc3MgQ2FjaGUge1xuICBwcml2YXRlIF9lbnRyaWVzOiB7IFtrZXk6IHN0cmluZ106IENhY2hlRW50cnk8YW55PiB9ID0ge307XG5cbiAgLyoqXG4gICAqIHJldHJpdmUgY2FjaGUgZW50cnksIG9yIGNyZWF0ZSBpZiBub3QgZXhpc3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2tleV0gLSBLZXkgb2YgY2FjaGUgZW50cnlcbiAgICogQHJldHVybnMge0NhY2hlRW50cnl9XG4gICAqL1xuICBnZXQoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fZW50cmllc1trZXldKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZW50cmllc1trZXldO1xuICAgIH1cbiAgICBjb25zdCBlbnRyeSA9IG5ldyBDYWNoZUVudHJ5KCk7XG4gICAgdGhpcy5fZW50cmllc1trZXldID0gZW50cnk7XG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgLyoqXG4gICAqIGNsZWFyIGNhY2hlIGVudHJpZXMgcHJlZml4IG1hdGNoaW5nIGdpdmVuIGtleVxuICAgKi9cbiAgY2xlYXIoa2V5Pzogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKHRoaXMuX2VudHJpZXMpKSB7XG4gICAgICBpZiAoIWtleSB8fCBrLnN0YXJ0c1dpdGgoa2V5KSkge1xuICAgICAgICB0aGlzLl9lbnRyaWVzW2tdLmNsZWFyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZSBjYWNoaW5nIGZvciBhc3luYyBjYWxsIGZuIHRvIGxvb2t1cCB0aGUgcmVzcG9uc2UgY2FjaGUgZmlyc3QsXG4gICAqIHRoZW4gaW52b2tlIG9yaWdpbmFsIGlmIG5vIGNhY2hlZCB2YWx1ZS5cbiAgICovXG4gIGNyZWF0ZUNhY2hlZEZ1bmN0aW9uPEZuIGV4dGVuZHMgRnVuY3Rpb24+KFxuICAgIGZuOiBGbixcbiAgICBzY29wZTogYW55LFxuICAgIG9wdGlvbnM6IENhY2hpbmdPcHRpb25zID0geyBzdHJhdGVneTogJ05PQ0FDSEUnIH0sXG4gICk6IENhY2hlZEZ1bmN0aW9uPEZuPiB7XG4gICAgY29uc3Qgc3RyYXRlZ3kgPSBvcHRpb25zLnN0cmF0ZWd5O1xuICAgIGNvbnN0ICRmbjogYW55ID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBnZW5lcmF0ZUtleVN0cmluZyhvcHRpb25zLCBzY29wZSwgYXJncyk7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICBjb25zdCBleGVjdXRlRmV0Y2ggPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGVudHJ5Ll9mZXRjaGluZyA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZm4uYXBwbHkoc2NvcGUgfHwgdGhpcywgYXJncyk7XG4gICAgICAgICAgZW50cnkuc2V0KHsgZXJyb3I6IHVuZGVmaW5lZCwgcmVzdWx0IH0pO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgZW50cnkuc2V0KHsgZXJyb3I6IGVycm9yIGFzIEVycm9yLCByZXN1bHQ6IHVuZGVmaW5lZCB9KTtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGxldCB2YWx1ZTtcbiAgICAgIHN3aXRjaCAoc3RyYXRlZ3kpIHtcbiAgICAgICAgY2FzZSAnSU1NRURJQVRFJzpcbiAgICAgICAgICB2YWx1ZSA9IGVudHJ5LmdldCgpO1xuICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gY2FsbCByZXN1bHQgaXMgbm90IGNhY2hlZCB5ZXQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWx1ZS5lcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgdmFsdWUuZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB2YWx1ZS5yZXN1bHQ7XG4gICAgICAgIGNhc2UgJ0hJVCc6XG4gICAgICAgICAgcmV0dXJuIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVudHJ5Ll9mZXRjaGluZykge1xuICAgICAgICAgICAgICAvLyBvbmx5IHdoZW4gbm8gb3RoZXIgY2xpZW50IGlzIGNhbGxpbmcgZnVuY3Rpb25cbiAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZUZldGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICBlbnRyeS5nZXQoKHsgZXJyb3IsIHJlc3VsdCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIGNhc2UgJ05PQ0FDSEUnOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBleGVjdXRlRmV0Y2goKTtcbiAgICAgIH1cbiAgICB9O1xuICAgICRmbi5jbGVhciA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gZ2VuZXJhdGVLZXlTdHJpbmcob3B0aW9ucywgc2NvcGUsIGFyZ3MpO1xuICAgICAgdGhpcy5jbGVhcihrZXkpO1xuICAgIH07XG4gICAgcmV0dXJuICRmbiBhcyBDYWNoZWRGdW5jdGlvbjxGbj47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FjaGU7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxZQUFZLFFBQVEsUUFBUTs7QUFFckM7QUFDQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBLElBUU1DLFVBQVUsMEJBQUFDLGFBQUE7RUFBQSxTQUFBRCxXQUFBO0lBQUEsSUFBQUUsUUFBQTtJQUFBLElBQUFDLEtBQUE7SUFBQUMsZUFBQSxPQUFBSixVQUFBO0lBQUEsU0FBQUssSUFBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUMsSUFBQSxPQUFBQyxLQUFBLENBQUFKLElBQUEsR0FBQUssSUFBQSxNQUFBQSxJQUFBLEdBQUFMLElBQUEsRUFBQUssSUFBQTtNQUFBRixJQUFBLENBQUFFLElBQUEsSUFBQUosU0FBQSxDQUFBSSxJQUFBO0lBQUE7SUFBQVAsS0FBQSxHQUFBUSxVQUFBLE9BQUFYLFVBQUEsRUFBQVksdUJBQUEsQ0FBQVYsUUFBQSxPQUFBVyxJQUFBLENBQUFYLFFBQUEsRUFBQU0sSUFBQTtJQUFBTSxlQUFBLENBQUFYLEtBQUEsZUFDTyxLQUFLO0lBQUFXLGVBQUEsQ0FBQVgsS0FBQSxZQUNLWSxTQUFTO0lBQUEsT0FBQVosS0FBQTtFQUFBO0VBQUFhLFNBQUEsQ0FBQWhCLFVBQUEsRUFBQUMsYUFBQTtFQUFBLE9B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