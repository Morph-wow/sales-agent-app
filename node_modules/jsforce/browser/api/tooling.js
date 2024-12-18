import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.regexp.to-string.js";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import "core-js/modules/es.function.name.js";
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * @file Manages Tooling APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { registerModule } from '../jsforce';
import Connection from '../connection';
import Cache from '../cache';

/**
 *
 */

/**
 *
 */
var _Connection$prototype = Connection.prototype,
  query = _Connection$prototype.query,
  queryMore = _Connection$prototype.queryMore,
  _ensureVersion = _Connection$prototype._ensureVersion,
  create = _Connection$prototype.create,
  _createSingle = _Connection$prototype._createSingle,
  _createMany = _Connection$prototype._createMany,
  _createParallel = _Connection$prototype._createParallel,
  retrieve = _Connection$prototype.retrieve,
  _retrieveSingle = _Connection$prototype._retrieveSingle,
  _retrieveParallel = _Connection$prototype._retrieveParallel,
  _retrieveMany = _Connection$prototype._retrieveMany,
  update = _Connection$prototype.update,
  _updateSingle = _Connection$prototype._updateSingle,
  _updateParallel = _Connection$prototype._updateParallel,
  _updateMany = _Connection$prototype._updateMany,
  upsert = _Connection$prototype.upsert,
  destroy = _Connection$prototype.destroy,
  _destroySingle = _Connection$prototype._destroySingle,
  _destroyParallel = _Connection$prototype._destroyParallel,
  _destroyMany = _Connection$prototype._destroyMany,
  describe = _Connection$prototype.describe,
  describeGlobal = _Connection$prototype.describeGlobal,
  sobject = _Connection$prototype.sobject;
var describeCacheKey = function describeCacheKey(type) {
  return type ? "describe.".concat(type) : 'describe';
};

/**
 * API class for Tooling API call
 */
export var Tooling = /*#__PURE__*/function () {
  /**
   *
   */
  function Tooling(conn) {
    _classCallCheck(this, Tooling);
    /**
     * Execute query by using SOQL
     */
    _defineProperty(this, "query", query);
    /**
     * Query next record set by using query locator
     */
    _defineProperty(this, "queryMore", queryMore);
    _defineProperty(this, "_ensureVersion", _ensureVersion);
    /**
     * Create records
     */
    _defineProperty(this, "create", create);
    _defineProperty(this, "_createSingle", _createSingle);
    _defineProperty(this, "_createParallel", _createParallel);
    _defineProperty(this, "_createMany", _createMany);
    /**
     * Synonym of Tooling#create()
     */
    _defineProperty(this, "insert", create);
    /**
     * Retrieve specified records
     */
    _defineProperty(this, "retrieve", retrieve);
    _defineProperty(this, "_retrieveSingle", _retrieveSingle);
    _defineProperty(this, "_retrieveParallel", _retrieveParallel);
    _defineProperty(this, "_retrieveMany", _retrieveMany);
    /**
     * Update records
     */
    _defineProperty(this, "update", update);
    _defineProperty(this, "_updateSingle", _updateSingle);
    _defineProperty(this, "_updateParallel", _updateParallel);
    _defineProperty(this, "_updateMany", _updateMany);
    /**
     * Upsert records
     */
    _defineProperty(this, "upsert", upsert);
    /**
     * Delete records
     */
    _defineProperty(this, "destroy", destroy);
    _defineProperty(this, "_destroySingle", _destroySingle);
    _defineProperty(this, "_destroyParallel", _destroyParallel);
    _defineProperty(this, "_destroyMany", _destroyMany);
    /**
     * Synonym of Tooling#destroy()
     */
    _defineProperty(this, "delete", destroy);
    /**
     * Synonym of Tooling#destroy()
     */
    _defineProperty(this, "del", destroy);
    _defineProperty(this, "cache", new Cache());
    /**
     * Describe SObject metadata
     */
    _defineProperty(this, "describe", this.cache.createCachedFunction(describe, this, {
      key: describeCacheKey,
      strategy: 'NOCACHE'
    }));
    _defineProperty(this, "describe$", this.cache.createCachedFunction(describe, this, {
      key: describeCacheKey,
      strategy: 'HIT'
    }));
    _defineProperty(this, "describe$$", this.cache.createCachedFunction(describe, this, {
      key: describeCacheKey,
      strategy: 'IMMEDIATE'
    }));
    /**
     * Synonym of Tooling#describe()
     */
    _defineProperty(this, "describeSObject", this.describe);
    _defineProperty(this, "describeSObject$", this.describe$);
    _defineProperty(this, "describeSObject$$", this.describe$$);
    /**
     * Describe global SObjects
     */
    _defineProperty(this, "describeGlobal", this.cache.createCachedFunction(describeGlobal, this, {
      key: 'describeGlobal',
      strategy: 'NOCACHE'
    }));
    _defineProperty(this, "describeGlobal$", this.cache.createCachedFunction(describeGlobal, this, {
      key: 'describeGlobal',
      strategy: 'HIT'
    }));
    _defineProperty(this, "describeGlobal$$", this.cache.createCachedFunction(describeGlobal, this, {
      key: 'describeGlobal',
      strategy: 'IMMEDIATE'
    }));
    /**
     * Get SObject instance
     */
    _defineProperty(this, "sobject", sobject);
    _defineProperty(this, "sobjects", {});
    this._conn = conn;
  }

  /**
   * @private
   */
  return _createClass(Tooling, [{
    key: "version",
    get: function get() {
      return this._conn.version;
    }
  }, {
    key: "_establish",
    value: function _establish() {
      var _this = this;
      this.sobjects = {};
      this.cache.clear();
      this.cache.get('describeGlobal').removeAllListeners('value');
      this.cache.get('describeGlobal').on('value', function (res) {
        if (res.result) {
          var _iterator = _createForOfIteratorHelper(res.result.sobjects),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var type = _step.value.name;
              _this.sobject(type);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      });
    }

    /**
     * @private
     */
  }, {
    key: "_baseUrl",
    value: function _baseUrl() {
      return this._conn._baseUrl() + '/tooling';
    }

    /**
     * @private
     */
  }, {
    key: "_supports",
    value: function _supports(feature) {
      return this._conn._supports(feature);
    }

    /**
     *
     */
  }, {
    key: "request",
    value: function request(_request, options) {
      return this._conn.request(_request, options);
    }

    /**
     * Executes Apex code anonymously
     */
  }, {
    key: "executeAnonymous",
    value: function executeAnonymous(body) {
      var url = this._baseUrl() + '/executeAnonymous?anonymousBody=' + encodeURIComponent(body);
      return this.request(url);
    }

    /**
     * Executes Apex tests asynchronously
     */
  }, {
    key: "runTestsAsynchronous",
    value: function runTestsAsynchronous(req) {
      var url = this._baseUrl() + '/runTestsAsynchronous/';
      return this._conn.requestPost(url, req);
    }

    /**
     * Executes Apex tests synchronously
     */
  }, {
    key: "runTestsSynchronous",
    value: function runTestsSynchronous(req) {
      var url = this._baseUrl() + '/runTestsSynchronous/';
      return this._conn.requestPost(url, req);
    }

    /**
     * Retrieves available code completions of the referenced type
     */
  }, {
    key: "completions",
    value: function completions() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'apex';
      var url = this._baseUrl() + '/completions?type=' + encodeURIComponent(type);
      return this.request({
        method: 'GET',
        url: url,
        headers: {
          Accept: 'application/json'
        }
      });
    }
  }]);
}();

/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
registerModule('tooling', function (conn) {
  return new Tooling(conn);
});
export default Tooling;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWdpc3Rlck1vZHVsZSIsIkNvbm5lY3Rpb24iLCJDYWNoZSIsIl9Db25uZWN0aW9uJHByb3RvdHlwZSIsInByb3RvdHlwZSIsInF1ZXJ5IiwicXVlcnlNb3JlIiwiX2Vuc3VyZVZlcnNpb24iLCJjcmVhdGUiLCJfY3JlYXRlU2luZ2xlIiwiX2NyZWF0ZU1hbnkiLCJfY3JlYXRlUGFyYWxsZWwiLCJyZXRyaWV2ZSIsIl9yZXRyaWV2ZVNpbmdsZSIsIl9yZXRyaWV2ZVBhcmFsbGVsIiwiX3JldHJpZXZlTWFueSIsInVwZGF0ZSIsIl91cGRhdGVTaW5nbGUiLCJfdXBkYXRlUGFyYWxsZWwiLCJfdXBkYXRlTWFueSIsInVwc2VydCIsImRlc3Ryb3kiLCJfZGVzdHJveVNpbmdsZSIsIl9kZXN0cm95UGFyYWxsZWwiLCJfZGVzdHJveU1hbnkiLCJkZXNjcmliZSIsImRlc2NyaWJlR2xvYmFsIiwic29iamVjdCIsImRlc2NyaWJlQ2FjaGVLZXkiLCJ0eXBlIiwiY29uY2F0IiwiVG9vbGluZyIsImNvbm4iLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJjYWNoZSIsImNyZWF0ZUNhY2hlZEZ1bmN0aW9uIiwia2V5Iiwic3RyYXRlZ3kiLCJkZXNjcmliZSQiLCJkZXNjcmliZSQkIiwiX2Nvbm4iLCJfY3JlYXRlQ2xhc3MiLCJnZXQiLCJ2ZXJzaW9uIiwidmFsdWUiLCJfZXN0YWJsaXNoIiwiX3RoaXMiLCJzb2JqZWN0cyIsImNsZWFyIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwib24iLCJyZXMiLCJyZXN1bHQiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwibmFtZSIsImVyciIsImUiLCJmIiwiX2Jhc2VVcmwiLCJfc3VwcG9ydHMiLCJmZWF0dXJlIiwicmVxdWVzdCIsIm9wdGlvbnMiLCJleGVjdXRlQW5vbnltb3VzIiwiYm9keSIsInVybCIsImVuY29kZVVSSUNvbXBvbmVudCIsInJ1blRlc3RzQXN5bmNocm9ub3VzIiwicmVxIiwicmVxdWVzdFBvc3QiLCJydW5UZXN0c1N5bmNocm9ub3VzIiwiY29tcGxldGlvbnMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtZXRob2QiLCJoZWFkZXJzIiwiQWNjZXB0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS90b29saW5nLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgTWFuYWdlcyBUb29saW5nIEFQSXNcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5pbXBvcnQgeyByZWdpc3Rlck1vZHVsZSB9IGZyb20gJy4uL2pzZm9yY2UnO1xuaW1wb3J0IENvbm5lY3Rpb24gZnJvbSAnLi4vY29ubmVjdGlvbic7XG5pbXBvcnQgQ2FjaGUsIHsgQ2FjaGVkRnVuY3Rpb24gfSBmcm9tICcuLi9jYWNoZSc7XG5pbXBvcnQgU09iamVjdCBmcm9tICcuLi9zb2JqZWN0JztcbmltcG9ydCB7XG4gIERlc2NyaWJlR2xvYmFsUmVzdWx0LFxuICBEZXNjcmliZVNPYmplY3RSZXN1bHQsXG4gIEh0dHBSZXF1ZXN0LFxuICBTY2hlbWEsXG4gIFNPYmplY3ROYW1lcyxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCB0eXBlIEV4ZWN1dGVBbm9ueW1vdXNSZXN1bHQgPSB7XG4gIGNvbXBpbGVkOiBib29sZWFuO1xuICBjb21waWxlUHJvYmxlbTogc3RyaW5nIHwgbnVsbDtcbiAgc3VjY2VzczogYm9vbGVhbjtcbiAgbGluZTogbnVtYmVyO1xuICBjb2x1bW46IG51bWJlcjtcbiAgZXhjZXB0aW9uTWVzc2FnZTogc3RyaW5nIHwgbnVsbDtcbiAgZXhjZXB0aW9uU3RhY2tUcmFjZTogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIFJ1blRlc3RMZXZlbCA9XG4gIHwgJ1J1blNwZWNpZmllZFRlc3RzJ1xuICB8ICdSdW5Mb2NhbFRlc3RzJ1xuICB8ICdSdW5BbGxUZXN0c0luT3JnJztcblxudHlwZSBUZXN0c05vZGUgPVxuICB8IHtcbiAgICAgIGNsYXNzSWQ6IHN0cmluZztcbiAgICAgIHRlc3RNZXRob2RzPzogc3RyaW5nW107XG4gICAgfVxuICB8IHtcbiAgICAgIGNsYXNzTmFtZTogc3RyaW5nO1xuICAgICAgdGVzdE1ldGhvZHM/OiBzdHJpbmdbXTtcbiAgICB9O1xuXG5leHBvcnQgdHlwZSBSdW5UZXN0c1JlcXVlc3QgPSB7XG4gIHRlc3RzOiBUZXN0c05vZGVbXTtcbiAgbWF4RmFpbGVkVGVzdHM/OiBudW1iZXI7XG4gIHRlc3RMZXZlbD86IFJ1blRlc3RMZXZlbDtcbiAgc2tpcENvZGVDb3ZlcmFnZT86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBSdW5UZXN0c0FzeW5jUmVxdWVzdCA9XG4gIHwge1xuICAgICAgY2xhc3NpZHM/OiBzdHJpbmc7XG4gICAgICBjbGFzc05hbWVzPzogc3RyaW5nO1xuICAgICAgc3VpdGVpZHM/OiBzdHJpbmc7XG4gICAgICBzdWl0ZU5hbWVzPzogc3RyaW5nO1xuICAgICAgbWF4RmFpbGVkVGVzdHM/OiBudW1iZXI7XG4gICAgICB0ZXN0TGV2ZWw/OiBSdW5UZXN0TGV2ZWw7XG4gICAgICBza2lwQ29kZUNvdmVyYWdlPzogYm9vbGVhbjtcbiAgICB9XG4gIHwge1xuICAgICAgdGVzdHM6IFRlc3RzTm9kZVtdO1xuICAgICAgbWF4RmFpbGVkVGVzdHM/OiBudW1iZXI7XG4gICAgICB0ZXN0TGV2ZWw/OiBSdW5UZXN0TGV2ZWw7XG4gICAgICBza2lwQ29kZUNvdmVyYWdlPzogYm9vbGVhbjtcbiAgICB9O1xuXG50eXBlIENvZGVDb3ZlcmFnZVJlc3VsdCA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbG9jYXRpb25zTm90Q292ZXJlZDogYW55W107XG4gIG5hbWU6IHN0cmluZztcbiAgbmFtZXNwYWNlOiBzdHJpbmcgfCBudWxsO1xuICBudW1Mb2NhdGlvbnM6IG51bWJlcjtcbiAgbnVtTG9jYXRpb25zTm90Q292ZXJlZDogbnVtYmVyO1xuICB0eXBlOiBzdHJpbmc7XG59O1xuXG50eXBlIENvZGVDb3ZlcmFnZVdhcm5pbmcgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgbmFtZXNwYWNlOiBzdHJpbmcgfCBudWxsO1xufTtcblxudHlwZSBGbG93Q292ZXJhZ2VSZXN1bHQgPSB7XG4gIGVsZW1lbnRzTm90Q292ZXJlZDogc3RyaW5nW107XG4gIGZsb3dJZDogc3RyaW5nO1xuICBmbG93TmFtZTogc3RyaW5nO1xuICBmbG93TmFtZXNwYWNlOiBzdHJpbmcgfCBudWxsO1xuICBudW1FbGVtZW50czogbnVtYmVyO1xuICBudW1FbGVtZW50c05vdENvdmVyZWQ6IG51bWJlcjtcbiAgcHJvY2Vzc1R5cGU6IHN0cmluZztcbn07XG5cbnR5cGUgRmxvd0NvdmVyYWdlV2FybmluZyA9IHtcbiAgZmxvd0lkOiBzdHJpbmc7XG4gIGZsb3dOYW1lOiBzdHJpbmc7XG4gIGZsb3dOYW1lc3BhY2U6IHN0cmluZyB8IG51bGw7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn07XG5cbnR5cGUgUnVuVGVzdFN1Y2Nlc3MgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIG1ldGhvZE5hbWU6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBuYW1lc3BhY2U6IHN0cmluZyB8IG51bGw7XG4gIHNlZUFsbERhdGE6IGJvb2xlYW47XG4gIHRpbWU6IG51bWJlcjtcbn07XG5cbnR5cGUgUnVuVGVzdEZhaWx1cmUgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgbWV0aG9kTmFtZTogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIG5hbWVzcGFjZTogc3RyaW5nIHwgbnVsbDtcbiAgc2VlQWxsRGF0YTogYm9vbGVhbjtcbiAgc3RhY2tUcmFjZTogc3RyaW5nO1xuICB0aW1lOiBudW1iZXI7XG4gIHR5cGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFJ1blRlc3RzUmVzdWx0ID0ge1xuICBhcGV4TG9nSWQ6IHN0cmluZztcbiAgY29kZUNvdmVyYWdlOiBDb2RlQ292ZXJhZ2VSZXN1bHRbXTtcbiAgY29kZUNvdmVyYWdlV2FybmluZ3M6IENvZGVDb3ZlcmFnZVdhcm5pbmdbXTtcbiAgZmxvd0NvdmVyYWdlOiBGbG93Q292ZXJhZ2VSZXN1bHRbXTtcbiAgZmxvd0NvdmVyYWdlV2FybmluZ3M6IEZsb3dDb3ZlcmFnZVdhcm5pbmdbXTtcbiAgbnVtRmFpbHVyZXM6IG51bWJlcjtcbiAgbnVtVGVzdHNSdW46IG51bWJlcjtcbiAgc3VjY2Vzc2VzOiBSdW5UZXN0U3VjY2Vzc1tdO1xuICBmYWlsdXJlczogUnVuVGVzdEZhaWx1cmVbXTtcbiAgdG90YWxUaW1lOiBudW1iZXI7XG59O1xuXG50eXBlIENvbnN0cnVjdG9yRGVjbGFyYXRpb24gPSB7XG4gIG1ldGhvZERvYzogc3RyaW5nIHwgbnVsbDtcbiAgbmFtZTogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBBcnJheTx7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgfT47XG4gIHJlZmVyZW5jZXM6IGFueVtdO1xufTtcblxudHlwZSBNZXRob2REZWNsYXJhdGlvbiA9IHtcbiAgYXJnVHlwZXM6IHN0cmluZ1tdO1xuICBpc1N0YXRpYzogYm9vbGVhbjtcbiAgbWV0aG9kRG9jOiBzdHJpbmcgfCBudWxsO1xuICBuYW1lOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IEFycmF5PHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICB9PjtcbiAgcmVmZXJlbmNlczogYW55W107XG59O1xuXG50eXBlIFByb3BlcnR5RGVjbGFyYXRpb24gPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVmZXJlbmNlczogYW55W107XG59O1xuXG50eXBlIENsYXNzRGVjbGFyYXRpb24gPSB7XG4gIGNvbnN0cnVjdG9yczogQ29uc3RydWN0b3JEZWNsYXJhdGlvbltdO1xuICBtZXRob2RzOiBNZXRob2REZWNsYXJhdGlvbltdO1xuICBwcm9wZXJ0aWVzOiBQcm9wZXJ0eURlY2xhcmF0aW9uW107XG59O1xuXG5leHBvcnQgdHlwZSBDb21wbGV0aW9uc1Jlc3VsdCA9IHtcbiAgcHVibGljRGVjbGFyYXRpb25zPzoge1xuICAgIFtuYW1lc3BhY2U6IHN0cmluZ106IHtcbiAgICAgIFtuYW1lOiBzdHJpbmddOiBDbGFzc0RlY2xhcmF0aW9uO1xuICAgIH07XG4gIH07XG4gIGNvbXBsZXRpb25zPzoge1xuICAgIFtjb21wb25lbnQ6IHN0cmluZ106IHtcbiAgICAgIHNpbXBsZTogYm9vbGVhbjtcbiAgICAgIGF0dHJpYnM6IHtcbiAgICAgICAgW2F0dHI6IHN0cmluZ106IHt9O1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufTtcblxuLyoqXG4gKlxuICovXG5jb25zdCB7XG4gIHF1ZXJ5LFxuICBxdWVyeU1vcmUsXG4gIF9lbnN1cmVWZXJzaW9uLFxuICBjcmVhdGUsXG4gIF9jcmVhdGVTaW5nbGUsXG4gIF9jcmVhdGVNYW55LFxuICBfY3JlYXRlUGFyYWxsZWwsXG4gIHJldHJpZXZlLFxuICBfcmV0cmlldmVTaW5nbGUsXG4gIF9yZXRyaWV2ZVBhcmFsbGVsLFxuICBfcmV0cmlldmVNYW55LFxuICB1cGRhdGUsXG4gIF91cGRhdGVTaW5nbGUsXG4gIF91cGRhdGVQYXJhbGxlbCxcbiAgX3VwZGF0ZU1hbnksXG4gIHVwc2VydCxcbiAgZGVzdHJveSxcbiAgX2Rlc3Ryb3lTaW5nbGUsXG4gIF9kZXN0cm95UGFyYWxsZWwsXG4gIF9kZXN0cm95TWFueSxcbiAgZGVzY3JpYmUsXG4gIGRlc2NyaWJlR2xvYmFsLFxuICBzb2JqZWN0LFxufSA9IENvbm5lY3Rpb24ucHJvdG90eXBlO1xuXG5jb25zdCBkZXNjcmliZUNhY2hlS2V5ID0gKHR5cGU/OiBzdHJpbmcpID0+XG4gIHR5cGUgPyBgZGVzY3JpYmUuJHt0eXBlfWAgOiAnZGVzY3JpYmUnO1xuXG4vKipcbiAqIEFQSSBjbGFzcyBmb3IgVG9vbGluZyBBUEkgY2FsbFxuICovXG5leHBvcnQgY2xhc3MgVG9vbGluZzxTIGV4dGVuZHMgU2NoZW1hPiB7XG4gIF9jb25uOiBDb25uZWN0aW9uPFM+O1xuXG4gIGdldCB2ZXJzaW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4udmVyc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIHF1ZXJ5IGJ5IHVzaW5nIFNPUUxcbiAgICovXG4gIHF1ZXJ5OiBDb25uZWN0aW9uPFM+WydxdWVyeSddID0gcXVlcnk7XG5cbiAgLyoqXG4gICAqIFF1ZXJ5IG5leHQgcmVjb3JkIHNldCBieSB1c2luZyBxdWVyeSBsb2NhdG9yXG4gICAqL1xuICBxdWVyeU1vcmU6IENvbm5lY3Rpb248Uz5bJ3F1ZXJ5TW9yZSddID0gcXVlcnlNb3JlO1xuXG4gIF9lbnN1cmVWZXJzaW9uOiBDb25uZWN0aW9uPFM+WydfZW5zdXJlVmVyc2lvbiddID0gX2Vuc3VyZVZlcnNpb247XG5cbiAgLyoqXG4gICAqIENyZWF0ZSByZWNvcmRzXG4gICAqL1xuICBjcmVhdGU6IENvbm5lY3Rpb248Uz5bJ2NyZWF0ZSddID0gY3JlYXRlO1xuICBfY3JlYXRlU2luZ2xlID0gX2NyZWF0ZVNpbmdsZTtcbiAgX2NyZWF0ZVBhcmFsbGVsID0gX2NyZWF0ZVBhcmFsbGVsO1xuICBfY3JlYXRlTWFueSA9IF9jcmVhdGVNYW55O1xuXG4gIC8qKlxuICAgKiBTeW5vbnltIG9mIFRvb2xpbmcjY3JlYXRlKClcbiAgICovXG4gIGluc2VydCA9IGNyZWF0ZTtcblxuICAvKipcbiAgICogUmV0cmlldmUgc3BlY2lmaWVkIHJlY29yZHNcbiAgICovXG4gIHJldHJpZXZlOiBDb25uZWN0aW9uPFM+WydyZXRyaWV2ZSddID0gcmV0cmlldmU7XG4gIF9yZXRyaWV2ZVNpbmdsZSA9IF9yZXRyaWV2ZVNpbmdsZTtcbiAgX3JldHJpZXZlUGFyYWxsZWwgPSBfcmV0cmlldmVQYXJhbGxlbDtcbiAgX3JldHJpZXZlTWFueSA9IF9yZXRyaWV2ZU1hbnk7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSByZWNvcmRzXG4gICAqL1xuICB1cGRhdGU6IENvbm5lY3Rpb248Uz5bJ3VwZGF0ZSddID0gdXBkYXRlO1xuICBfdXBkYXRlU2luZ2xlID0gX3VwZGF0ZVNpbmdsZTtcbiAgX3VwZGF0ZVBhcmFsbGVsID0gX3VwZGF0ZVBhcmFsbGVsO1xuICBfdXBkYXRlTWFueSA9IF91cGRhdGVNYW55O1xuXG4gIC8qKlxuICAgKiBVcHNlcnQgcmVjb3Jkc1xuICAgKi9cbiAgdXBzZXJ0OiBDb25uZWN0aW9uPFM+Wyd1cHNlcnQnXSA9IHVwc2VydDtcblxuICAvKipcbiAgICogRGVsZXRlIHJlY29yZHNcbiAgICovXG4gIGRlc3Ryb3k6IENvbm5lY3Rpb248Uz5bJ2Rlc3Ryb3knXSA9IGRlc3Ryb3k7XG4gIF9kZXN0cm95U2luZ2xlID0gX2Rlc3Ryb3lTaW5nbGU7XG4gIF9kZXN0cm95UGFyYWxsZWwgPSBfZGVzdHJveVBhcmFsbGVsO1xuICBfZGVzdHJveU1hbnkgPSBfZGVzdHJveU1hbnk7XG5cbiAgLyoqXG4gICAqIFN5bm9ueW0gb2YgVG9vbGluZyNkZXN0cm95KClcbiAgICovXG4gIGRlbGV0ZSA9IGRlc3Ryb3k7XG5cbiAgLyoqXG4gICAqIFN5bm9ueW0gb2YgVG9vbGluZyNkZXN0cm95KClcbiAgICovXG4gIGRlbCA9IGRlc3Ryb3k7XG5cbiAgY2FjaGUgPSBuZXcgQ2FjaGUoKTtcblxuICAvKipcbiAgICogRGVzY3JpYmUgU09iamVjdCBtZXRhZGF0YVxuICAgKi9cbiAgZGVzY3JpYmUgPSB0aGlzLmNhY2hlLmNyZWF0ZUNhY2hlZEZ1bmN0aW9uKGRlc2NyaWJlLCB0aGlzLCB7XG4gICAga2V5OiBkZXNjcmliZUNhY2hlS2V5LFxuICAgIHN0cmF0ZWd5OiAnTk9DQUNIRScsXG4gIH0pO1xuICBkZXNjcmliZSQgPSB0aGlzLmNhY2hlLmNyZWF0ZUNhY2hlZEZ1bmN0aW9uKGRlc2NyaWJlLCB0aGlzLCB7XG4gICAga2V5OiBkZXNjcmliZUNhY2hlS2V5LFxuICAgIHN0cmF0ZWd5OiAnSElUJyxcbiAgfSk7XG4gIGRlc2NyaWJlJCQgPSAodGhpcy5jYWNoZS5jcmVhdGVDYWNoZWRGdW5jdGlvbihkZXNjcmliZSwgdGhpcywge1xuICAgIGtleTogZGVzY3JpYmVDYWNoZUtleSxcbiAgICBzdHJhdGVneTogJ0lNTUVESUFURScsXG4gIH0pIGFzIHVua25vd24pIGFzIENhY2hlZEZ1bmN0aW9uPChuYW1lOiBzdHJpbmcpID0+IERlc2NyaWJlU09iamVjdFJlc3VsdD47XG5cbiAgLyoqXG4gICAqIFN5bm9ueW0gb2YgVG9vbGluZyNkZXNjcmliZSgpXG4gICAqL1xuICBkZXNjcmliZVNPYmplY3QgPSB0aGlzLmRlc2NyaWJlO1xuICBkZXNjcmliZVNPYmplY3QkID0gdGhpcy5kZXNjcmliZSQ7XG4gIGRlc2NyaWJlU09iamVjdCQkID0gdGhpcy5kZXNjcmliZSQkO1xuXG4gIC8qKlxuICAgKiBEZXNjcmliZSBnbG9iYWwgU09iamVjdHNcbiAgICovXG4gIGRlc2NyaWJlR2xvYmFsID0gdGhpcy5jYWNoZS5jcmVhdGVDYWNoZWRGdW5jdGlvbihkZXNjcmliZUdsb2JhbCwgdGhpcywge1xuICAgIGtleTogJ2Rlc2NyaWJlR2xvYmFsJyxcbiAgICBzdHJhdGVneTogJ05PQ0FDSEUnLFxuICB9KTtcbiAgZGVzY3JpYmVHbG9iYWwkID0gdGhpcy5jYWNoZS5jcmVhdGVDYWNoZWRGdW5jdGlvbihkZXNjcmliZUdsb2JhbCwgdGhpcywge1xuICAgIGtleTogJ2Rlc2NyaWJlR2xvYmFsJyxcbiAgICBzdHJhdGVneTogJ0hJVCcsXG4gIH0pO1xuICBkZXNjcmliZUdsb2JhbCQkID0gKHRoaXMuY2FjaGUuY3JlYXRlQ2FjaGVkRnVuY3Rpb24oZGVzY3JpYmVHbG9iYWwsIHRoaXMsIHtcbiAgICBrZXk6ICdkZXNjcmliZUdsb2JhbCcsXG4gICAgc3RyYXRlZ3k6ICdJTU1FRElBVEUnLFxuICB9KSBhcyB1bmtub3duKSBhcyBDYWNoZWRGdW5jdGlvbjwobmFtZTogc3RyaW5nKSA9PiBEZXNjcmliZUdsb2JhbFJlc3VsdD47XG5cbiAgLyoqXG4gICAqIEdldCBTT2JqZWN0IGluc3RhbmNlXG4gICAqL1xuICBzb2JqZWN0OiBDb25uZWN0aW9uPFM+Wydzb2JqZWN0J10gPSBzb2JqZWN0O1xuXG4gIHNvYmplY3RzOiB7IFtOIGluIFNPYmplY3ROYW1lczxTPl0/OiBTT2JqZWN0PFMsIE4+IH0gPSB7fTtcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbm46IENvbm5lY3Rpb248Uz4pIHtcbiAgICB0aGlzLl9jb25uID0gY29ubjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2VzdGFibGlzaCgpIHtcbiAgICB0aGlzLnNvYmplY3RzID0ge307XG4gICAgdGhpcy5jYWNoZS5jbGVhcigpO1xuICAgIHRoaXMuY2FjaGUuZ2V0KCdkZXNjcmliZUdsb2JhbCcpLnJlbW92ZUFsbExpc3RlbmVycygndmFsdWUnKTtcbiAgICB0aGlzLmNhY2hlLmdldCgnZGVzY3JpYmVHbG9iYWwnKS5vbigndmFsdWUnLCAocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLnJlc3VsdCkge1xuICAgICAgICBmb3IgKGNvbnN0IHsgbmFtZTogdHlwZSB9IG9mIHJlcy5yZXN1bHQuc29iamVjdHMpIHtcbiAgICAgICAgICB0aGlzLnNvYmplY3QodHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2Jhc2VVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSArICcvdG9vbGluZyc7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zdXBwb3J0cyhmZWF0dXJlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5fc3VwcG9ydHMoZmVhdHVyZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHJlcXVlc3Q8UiA9IHVua25vd24+KHJlcXVlc3Q6IHN0cmluZyB8IEh0dHBSZXF1ZXN0LCBvcHRpb25zPzogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdDxSPihyZXF1ZXN0LCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBBcGV4IGNvZGUgYW5vbnltb3VzbHlcbiAgICovXG4gIGV4ZWN1dGVBbm9ueW1vdXMoYm9keTogc3RyaW5nKSB7XG4gICAgY29uc3QgdXJsID1cbiAgICAgIHRoaXMuX2Jhc2VVcmwoKSArXG4gICAgICAnL2V4ZWN1dGVBbm9ueW1vdXM/YW5vbnltb3VzQm9keT0nICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChib2R5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PEV4ZWN1dGVBbm9ueW1vdXNSZXN1bHQ+KHVybCk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgQXBleCB0ZXN0cyBhc3luY2hyb25vdXNseVxuICAgKi9cbiAgcnVuVGVzdHNBc3luY2hyb25vdXMocmVxOiBSdW5UZXN0c0FzeW5jUmVxdWVzdCkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2Jhc2VVcmwoKSArICcvcnVuVGVzdHNBc3luY2hyb25vdXMvJztcbiAgICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0UG9zdDxzdHJpbmcgfCBudWxsPih1cmwsIHJlcSk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgQXBleCB0ZXN0cyBzeW5jaHJvbm91c2x5XG4gICAqL1xuICBydW5UZXN0c1N5bmNocm9ub3VzKHJlcTogUnVuVGVzdHNSZXF1ZXN0KSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5fYmFzZVVybCgpICsgJy9ydW5UZXN0c1N5bmNocm9ub3VzLyc7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdFBvc3Q8UnVuVGVzdHNSZXN1bHQgfCBudWxsPih1cmwsIHJlcSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGF2YWlsYWJsZSBjb2RlIGNvbXBsZXRpb25zIG9mIHRoZSByZWZlcmVuY2VkIHR5cGVcbiAgICovXG4gIGNvbXBsZXRpb25zKHR5cGU6ICdhcGV4JyB8ICd2aXN1YWxmb3JjZScgPSAnYXBleCcpIHtcbiAgICBjb25zdCB1cmwgPVxuICAgICAgdGhpcy5fYmFzZVVybCgpICsgJy9jb21wbGV0aW9ucz90eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxDb21wbGV0aW9uc1Jlc3VsdD4oe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybCxcbiAgICAgIGhlYWRlcnM6IHsgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4gKiBSZWdpc3RlciBob29rIGluIGNvbm5lY3Rpb24gaW5zdGFudGlhdGlvbiBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIHRoaXMgQVBJIG1vZHVsZSBmZWF0dXJlc1xuICovXG5yZWdpc3Rlck1vZHVsZSgndG9vbGluZycsIChjb25uKSA9PiBuZXcgVG9vbGluZyhjb25uKSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvb2xpbmc7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxjQUFjLFFBQVEsWUFBWTtBQUMzQyxPQUFPQyxVQUFVLE1BQU0sZUFBZTtBQUN0QyxPQUFPQyxLQUFLLE1BQTBCLFVBQVU7O0FBVWhEO0FBQ0E7QUFDQTs7QUF1S0E7QUFDQTtBQUNBO0FBQ0EsSUFBQUMscUJBQUEsR0F3QklGLFVBQVUsQ0FBQ0csU0FBUztFQXZCdEJDLEtBQUssR0FBQUYscUJBQUEsQ0FBTEUsS0FBSztFQUNMQyxTQUFTLEdBQUFILHFCQUFBLENBQVRHLFNBQVM7RUFDVEMsY0FBYyxHQUFBSixxQkFBQSxDQUFkSSxjQUFjO0VBQ2RD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