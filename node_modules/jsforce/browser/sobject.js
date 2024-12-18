import "core-js/modules/es.array.push.js";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
var _excluded = ["sort", "limit", "offset"];
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context14, _context15; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context14 = ownKeys(Object(t), !0)).call(_context14, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context15 = ownKeys(Object(t))).call(_context15, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
/**
 *
 */
import { getLogger } from './util/logger';
import RecordReference from './record-reference';
import Query, { ResponseTargets } from './query';
import QuickAction from './quick-action';
/**
 * A class for organizing all SObject access
 */
export var SObject = /*#__PURE__*/function () {
  // layouts: (ln?: string) => Promise<DescribeLayoutResult>;

  // compactLayouts: () => Promise<DescribeCompactLayoutsResult>;

  // approvalLayouts: () => Promise<DescribeApprovalLayoutsResult>;

  /**
   *
   */
  function SObject(conn, type) {
    var _this = this;
    _classCallCheck(this, SObject);
    /**
     * Synonym of SObject#create()
     */
    _defineProperty(this, "insert", this.create);
    /**
     * Synonym of SObject#destroy()
     */
    _defineProperty(this, "delete", this.destroy);
    /**
     * Synonym of SObject#destroy()
     */
    _defineProperty(this, "del", this.destroy);
    /**
     * Synonym of SObject#createBulk()
     */
    _defineProperty(this, "insertBulk", this.createBulk);
    /**
     * Synonym of SObject#destroyBulk()
     */
    _defineProperty(this, "deleteBulk", this.destroyBulk);
    /**
     * Synonym of SObject#destroyHardBulk()
     */
    _defineProperty(this, "deleteHardBulk", this.destroyHardBulk);
    this.type = type;
    this._conn = conn;
    this._logger = conn._logLevel ? SObject._logger.createInstance(conn._logLevel) : SObject._logger;
    var cache = this._conn.cache;
    var layoutCacheKey = function layoutCacheKey(layoutName) {
      return layoutName ? "layouts.namedLayouts.".concat(layoutName) : "layouts.".concat(_this.type);
    };
    var layouts = SObject.prototype.layouts;
    this.layouts = cache.createCachedFunction(layouts, this, {
      key: layoutCacheKey,
      strategy: 'NOCACHE'
    });
    this.layouts$ = cache.createCachedFunction(layouts, this, {
      key: layoutCacheKey,
      strategy: 'HIT'
    });
    this.layouts$$ = cache.createCachedFunction(layouts, this, {
      key: layoutCacheKey,
      strategy: 'IMMEDIATE'
    });
    var compactLayoutCacheKey = "compactLayouts.".concat(this.type);
    var compactLayouts = SObject.prototype.compactLayouts;
    this.compactLayouts = cache.createCachedFunction(compactLayouts, this, {
      key: compactLayoutCacheKey,
      strategy: 'NOCACHE'
    });
    this.compactLayouts$ = cache.createCachedFunction(compactLayouts, this, {
      key: compactLayoutCacheKey,
      strategy: 'HIT'
    });
    this.compactLayouts$$ = cache.createCachedFunction(compactLayouts, this, {
      key: compactLayoutCacheKey,
      strategy: 'IMMEDIATE'
    });
    var approvalLayoutCacheKey = "approvalLayouts.".concat(this.type);
    var approvalLayouts = SObject.prototype.approvalLayouts;
    this.approvalLayouts = cache.createCachedFunction(approvalLayouts, this, {
      key: approvalLayoutCacheKey,
      strategy: 'NOCACHE'
    });
    this.approvalLayouts$ = cache.createCachedFunction(approvalLayouts, this, {
      key: approvalLayoutCacheKey,
      strategy: 'HIT'
    });
    this.approvalLayouts$$ = cache.createCachedFunction(approvalLayouts, this, {
      key: approvalLayoutCacheKey,
      strategy: 'IMMEDIATE'
    });
  }

  /**
   * Create records
   */
  return _createClass(SObject, [{
    key: "create",
    value: function create(records, options) {
      return this._conn.create(this.type, records, options);
    }
  }, {
    key: "retrieve",
    value: function retrieve(ids, options) {
      return this._conn.retrieve(this.type, ids, options);
    }

    /**
     * Update records
     */
  }, {
    key: "update",
    value: function update(records, options) {
      return this._conn.update(this.type, records, options);
    }

    /**
     * Upsert records
     */
  }, {
    key: "upsert",
    value: function upsert(records, extIdField, options) {
      return this._conn.upsert(this.type, records, extIdField, options);
    }

    /**
     * Delete records
     */
  }, {
    key: "destroy",
    value: function destroy(ids, options) {
      return this._conn.destroy(this.type, ids, options);
    }
  }, {
    key: "bulkload",
    value:
    /**
     * Call Bulk#load() to execute bulkload, returning batch object
     */
    function bulkload(operation, optionsOrInput, input) {
      return this._conn.bulk.load(this.type, operation, optionsOrInput, input);
    }

    /**
     * Bulkly insert input data using bulk API
     */
  }, {
    key: "createBulk",
    value: function createBulk(input) {
      return this.bulkload('insert', input);
    }
  }, {
    key: "updateBulk",
    value:
    /**
     * Bulkly update records by input data using bulk API
     */
    function updateBulk(input) {
      return this.bulkload('update', input);
    }

    /**
     * Bulkly upsert records by input data using bulk API
     */
  }, {
    key: "upsertBulk",
    value: function upsertBulk(input, extIdField) {
      return this.bulkload('upsert', {
        extIdField: extIdField
      }, input);
    }

    /**
     * Bulkly delete records specified by input data using bulk API
     */
  }, {
    key: "destroyBulk",
    value: function destroyBulk(input) {
      return this.bulkload('delete', input);
    }
  }, {
    key: "destroyHardBulk",
    value:
    /**
     * Bulkly hard delete records specified in input data using bulk API
     */
    function destroyHardBulk(input) {
      return this.bulkload('hardDelete', input);
    }
  }, {
    key: "describe",
    value:
    /**
     * Describe SObject metadata
     */
    function describe() {
      return this._conn.describe(this.type);
    }

    /**
     *
     */
  }, {
    key: "describe$",
    value: function describe$() {
      return this._conn.describe$(this.type);
    }

    /**
     *
     */
  }, {
    key: "describe$$",
    value: function describe$$() {
      return this._conn.describe$$(this.type);
    }

    /**
     * Get record representation instance by given id
     */
  }, {
    key: "record",
    value: function record(id) {
      return new RecordReference(this._conn, this.type, id);
    }

    /**
     * Retrieve recently accessed records
     */
  }, {
    key: "recent",
    value: function recent() {
      return this._conn.recent(this.type);
    }

    /**
     * Retrieve the updated records
     */
  }, {
    key: "updated",
    value: function updated(start, end) {
      return this._conn.updated(this.type, start, end);
    }

    /**
     * Retrieve the deleted records
     */
  }, {
    key: "deleted",
    value: function deleted(start, end) {
      return this._conn.deleted(this.type, start, end);
    }

    /**
     * Describe layout information for SObject
     */
  }, {
    key: "layouts",
    value: (function () {
      var _layouts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(layoutName) {
        var _context;
        var url, body;
        return _regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              url = _concatInstanceProperty(_context = "/sobjects/".concat(this.type, "/describe/")).call(_context, layoutName ? "namedLayouts/".concat(layoutName) : 'layouts');
              _context2.next = 3;
              return this._conn.request(url);
            case 3:
              body = _context2.sent;
              return _context2.abrupt("return", body);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee, this);
      }));
      function layouts(_x) {
        return _layouts.apply(this, arguments);
      }
      return layouts;
    }()
    /**
     * @typedef {Object} CompactLayoutInfo
     * @prop {Array.<Object>} compactLayouts - Array of compact layouts
     * @prop {String} defaultCompactLayoutId - ID of default compact layout
     * @prop {Array.<Object>} recordTypeCompactLayoutMappings - Array of record type mappings
     */
    /**
     * Describe compact layout information defined for SObject
     *
     * @param {Callback.<CompactLayoutInfo>} [callback] - Callback function
     * @returns {Promise.<CompactLayoutInfo>}
     */
    )
  }, {
    key: "compactLayouts",
    value: (function () {
      var _compactLayouts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var url, body;
        return _regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              url = "/sobjects/".concat(this.type, "/describe/compactLayouts");
              _context3.next = 3;
              return this._conn.request(url);
            case 3:
              body = _context3.sent;
              return _context3.abrupt("return", body);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee2, this);
      }));
      function compactLayouts() {
        return _compactLayouts.apply(this, arguments);
      }
      return compactLayouts;
    }()
    /**
     * Describe compact layout information defined for SObject
     *
     * @param {Callback.<ApprovalLayoutInfo>} [callback] - Callback function
     * @returns {Promise.<ApprovalLayoutInfo>}
     */
    )
  }, {
    key: "approvalLayouts",
    value: (function () {
      var _approvalLayouts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var url, body;
        return _regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              url = "/sobjects/".concat(this.type, "/describe/approvalLayouts");
              _context4.next = 3;
              return this._conn.request(url);
            case 3:
              body = _context4.sent;
              return _context4.abrupt("return", body);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee3, this);
      }));
      function approvalLayouts() {
        return _approvalLayouts.apply(this, arguments);
      }
      return approvalLayouts;
    }()
    /**
     * Find and fetch records which matches given conditions
     */
    )
  }, {
    key: "find",
    value: function find(conditions, fields) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var sort = _sortInstanceProperty(options),
        limit = options.limit,
        offset = options.offset,
        qoptions = _objectWithoutProperties(options, _excluded);
      var config = {
        fields: fields == null ? undefined : fields,
        includes: _includesInstanceProperty(options),
        table: this.type,
        conditions: conditions == null ? undefined : conditions,
        sort: sort,
        limit: limit,
        offset: offset
      };
      var query = new Query(this._conn, config, qoptions);
      return query.setResponseTarget(ResponseTargets.Records);
    }

    /**
     * Fetch one record which matches given conditions
     */
  }, {
    key: "findOne",
    value: function findOne(conditions, fields) {
      var _context5;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var query = _findInstanceProperty(_context5 = this).call(_context5, conditions, fields, _objectSpread(_objectSpread({}, options), {}, {
        limit: 1
      }));
      return query.setResponseTarget(ResponseTargets.SingleRecord);
    }

    /**
     * Find and fetch records only by specifying fields to fetch.
     */
  }, {
    key: "select",
    value: function select(fields) {
      var _context6;
      return _findInstanceProperty(_context6 = this).call(_context6, null, fields);
    }

    /**
     * Count num of records which matches given conditions
     */
  }, {
    key: "count",
    value: function count(conditions) {
      var _context7;
      var query = _findInstanceProperty(_context7 = this).call(_context7, conditions, 'count()');
      return query.setResponseTarget(ResponseTargets.Count);
    }

    /**
     * Returns the list of list views for the SObject
     *
     * @param {Callback.<ListViewsInfo>} [callback] - Callback function
     * @returns {Promise.<ListViewsInfo>}
     */
  }, {
    key: "listviews",
    value: function listviews() {
      var _context8;
      var url = _concatInstanceProperty(_context8 = "".concat(this._conn._baseUrl(), "/sobjects/")).call(_context8, this.type, "/listviews");
      return this._conn.request(url);
    }

    /**
     * Returns the list view info in specifed view id
     *
     * @param {String} id - List view ID
     * @returns {ListView}
     */
  }, {
    key: "listview",
    value: function listview(id) {
      return new ListView(this._conn, this.type, id); // eslint-disable-line no-use-before-define
    }

    /**
     * Returns all registered quick actions for the SObject
     *
     * @param {Callback.<Array.<QuickAction~QuickActionInfo>>} [callback] - Callback function
     * @returns {Promise.<Array.<QuickAction~QuickActionInfo>>}
     */
  }, {
    key: "quickActions",
    value: function quickActions() {
      return this._conn.request("/sobjects/".concat(this.type, "/quickActions"));
    }

    /**
     * Get reference for specified quick aciton in the SObject
     *
     * @param {String} actionName - Name of the quick action
     * @returns {QuickAction}
     */
  }, {
    key: "quickAction",
    value: function quickAction(actionName) {
      var _context9;
      return new QuickAction(this._conn, _concatInstanceProperty(_context9 = "/sobjects/".concat(this.type, "/quickActions/")).call(_context9, actionName));
    }
  }]);
}();

/**
 * A class for organizing list view information
 *
 * @protected
 * @class ListView
 * @param {Connection} conn - Connection instance
 * @param {SObject} type - SObject type
 * @param {String} id - List view ID
 */
_defineProperty(SObject, "_logger", getLogger('sobject'));
var ListView = /*#__PURE__*/function () {
  /**
   *
   */
  function ListView(conn, type, id) {
    _classCallCheck(this, ListView);
    this._conn = conn;
    this.type = type;
    this.id = id;
  }

  /**
   * Executes query for the list view and returns the resulting data and presentation information.
   */
  return _createClass(ListView, [{
    key: "results",
    value: function results() {
      var _context10, _context11;
      var url = _concatInstanceProperty(_context10 = _concatInstanceProperty(_context11 = "".concat(this._conn._baseUrl(), "/sobjects/")).call(_context11, this.type, "/listviews/")).call(_context10, this.id, "/results");
      return this._conn.request(url);
    }

    /**
     * Returns detailed information about a list view
     */
  }, {
    key: "describe",
    value: function describe() {
      var _context12, _context13;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = _concatInstanceProperty(_context12 = _concatInstanceProperty(_context13 = "".concat(this._conn._baseUrl(), "/sobjects/")).call(_context13, this.type, "/listviews/")).call(_context12, this.id, "/describe");
      return this._conn.request({
        method: 'GET',
        url: url,
        headers: options.headers
      });
    }

    /**
     * Explain plan for executing list view
     */
  }, {
    key: "explain",
    value: function explain() {
      var url = "/query/?explain=".concat(this.id);
      return this._conn.request(url);
    }
  }]);
}();
export default SObject;

// TODO Bulk
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXRMb2dnZXIiLCJSZWNvcmRSZWZlcmVuY2UiLCJRdWVyeSIsIlJlc3BvbnNlVGFyZ2V0cyIsIlF1aWNrQWN0aW9uIiwiU09iamVjdCIsImNvbm4iLCJ0eXBlIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJjcmVhdGUiLCJkZXN0cm95IiwiY3JlYXRlQnVsayIsImRlc3Ryb3lCdWxrIiwiZGVzdHJveUhhcmRCdWxrIiwiX2Nvbm4iLCJfbG9nZ2VyIiwiX2xvZ0xldmVsIiwiY3JlYXRlSW5zdGFuY2UiLCJjYWNoZSIsImxheW91dENhY2hlS2V5IiwibGF5b3V0TmFtZSIsImNvbmNhdCIsImxheW91dHMiLCJwcm90b3R5cGUiLCJjcmVhdGVDYWNoZWRGdW5jdGlvbiIsImtleSIsInN0cmF0ZWd5IiwibGF5b3V0cyQiLCJsYXlvdXRzJCQiLCJjb21wYWN0TGF5b3V0Q2FjaGVLZXkiLCJjb21wYWN0TGF5b3V0cyIsImNvbXBhY3RMYXlvdXRzJCIsImNvbXBhY3RMYXlvdXRzJCQiLCJhcHByb3ZhbExheW91dENhY2hlS2V5IiwiYXBwcm92YWxMYXlvdXRzIiwiYXBwcm92YWxMYXlvdXRzJCIsImFwcHJvdmFsTGF5b3V0cyQkIiwiX2NyZWF0ZUNsYXNzIiwidmFsdWUiLCJyZWNvcmRzIiwib3B0aW9ucyIsInJldHJpZXZlIiwiaWRzIiwidXBkYXRlIiwidXBzZXJ0IiwiZXh0SWRGaWVsZCIsImJ1bGtsb2FkIiwib3BlcmF0aW9uIiwib3B0aW9uc09ySW5wdXQiLCJpbnB1dCIsImJ1bGsiLCJsb2FkIiwidXBkYXRlQnVsayIsInVwc2VydEJ1bGsiLCJkZXNjcmliZSIsImRlc2NyaWJlJCIsImRlc2NyaWJlJCQiLCJyZWNvcmQiLCJpZCIsInJlY2VudCIsInVwZGF0ZWQiLCJzdGFydCIsImVuZCIsImRlbGV0ZWQiLCJfbGF5b3V0cyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwiX2NvbnRleHQiLCJ1cmwiLCJib2R5Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQyIiwicHJldiIsIm5leHQiLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsImNhbGwiLCJyZXF1ZXN0Iiwic2VudCIsImFicnVwdCIsInN0b3AiLCJfeCIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2NvbXBhY3RMYXlvdXRzIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDMiLCJfYXBwcm92YWxMYXlvdXRzIiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDQiLCJmaW5kIiwiY29uZGl0aW9ucyIsImZpZWxkcyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInNvcnQiLCJfc29ydEluc3RhbmNlUHJvcGVydHkiLCJsaW1pdCIsIm9mZnNldCIsInFvcHRpb25zIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2V4Y2x1ZGVkIiwiY29uZmlnIiwiaW5jbHVkZXMiLCJfaW5jbHVkZXNJbnN0YW5jZVByb3BlcnR5IiwidGFibGUiLCJxdWVyeSIsInNldFJlc3BvbnNlVGFyZ2V0IiwiUmVjb3JkcyIsImZpbmRPbmUiLCJfY29udGV4dDUiLCJfZmluZEluc3RhbmNlUHJvcGVydHkiLCJfb2JqZWN0U3ByZWFkIiwiU2luZ2xlUmVjb3JkIiwic2VsZWN0IiwiX2NvbnRleHQ2IiwiY291bnQiLCJfY29udGV4dDciLCJDb3VudCIsImxpc3R2aWV3cyIsIl9jb250ZXh0OCIsIl9iYXNlVXJsIiwibGlzdHZpZXciLCJMaXN0VmlldyIsInF1aWNrQWN0aW9ucyIsInF1aWNrQWN0aW9uIiwiYWN0aW9uTmFtZSIsIl9jb250ZXh0OSIsInJlc3VsdHMiLCJfY29udGV4dDEwIiwiX2NvbnRleHQxMSIsIl9jb250ZXh0MTIiLCJfY29udGV4dDEzIiwibWV0aG9kIiwiaGVhZGVycyIsImV4cGxhaW4iXSwic291cmNlcyI6WyIuLi9zcmMvc29iamVjdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKi9cbmltcG9ydCB7IExvZ2dlciwgZ2V0TG9nZ2VyIH0gZnJvbSAnLi91dGlsL2xvZ2dlcic7XG5pbXBvcnQge1xuICBSZWNvcmQsXG4gIERlc2NyaWJlTGF5b3V0UmVzdWx0LFxuICBEZXNjcmliZUNvbXBhY3RMYXlvdXRzUmVzdWx0LFxuICBEZXNjcmliZUFwcHJvdmFsTGF5b3V0c1Jlc3VsdCxcbiAgT3B0aW9uYWwsXG4gIERtbE9wdGlvbnMsXG4gIFNhdmVSZXN1bHQsXG4gIFVwc2VydFJlc3VsdCxcbiAgUmV0cmlldmVPcHRpb25zLFxuICBTY2hlbWEsXG4gIFNPYmplY3ROYW1lcyxcbiAgU09iamVjdFJlY29yZCxcbiAgU09iamVjdElucHV0UmVjb3JkLFxuICBTT2JqZWN0VXBkYXRlUmVjb3JkLFxuICBTT2JqZWN0RmllbGROYW1lcyxcbiAgRmllbGRQcm9qZWN0aW9uQ29uZmlnLFxuICBGaWVsZFBhdGhTcGVjaWZpZXIsXG4gIEZpZWxkUGF0aFNjb3BlZFByb2plY3Rpb24sXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IENvbm5lY3Rpb24gZnJvbSAnLi9jb25uZWN0aW9uJztcbmltcG9ydCBSZWNvcmRSZWZlcmVuY2UgZnJvbSAnLi9yZWNvcmQtcmVmZXJlbmNlJztcbmltcG9ydCBRdWVyeSwge1xuICBSZXNwb25zZVRhcmdldHMsXG4gIFF1ZXJ5T3B0aW9ucyxcbiAgUXVlcnlGaWVsZCxcbiAgUXVlcnlDb25kaXRpb24sXG4gIFF1ZXJ5Q29uZmlnLFxufSBmcm9tICcuL3F1ZXJ5JztcbmltcG9ydCBRdWlja0FjdGlvbiBmcm9tICcuL3F1aWNrLWFjdGlvbic7XG5pbXBvcnQgeyBDYWNoZWRGdW5jdGlvbiB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tICdzdHJlYW0nO1xuXG5leHBvcnQgdHlwZSBGaW5kT3B0aW9uczxTIGV4dGVuZHMgU2NoZW1hLCBOIGV4dGVuZHMgU09iamVjdE5hbWVzPFM+PiA9IFBhcnRpYWw8XG4gIFF1ZXJ5T3B0aW9ucyAmXG4gICAgUGljazxRdWVyeUNvbmZpZzxTLCBOPiwgJ3NvcnQnIHwgJ2luY2x1ZGVzJz4gJiB7XG4gICAgICBsaW1pdDogbnVtYmVyO1xuICAgICAgb2Zmc2V0OiBudW1iZXI7XG4gICAgfVxuPjtcblxuLyoqXG4gKiBBIGNsYXNzIGZvciBvcmdhbml6aW5nIGFsbCBTT2JqZWN0IGFjY2Vzc1xuICovXG5leHBvcnQgY2xhc3MgU09iamVjdDxcbiAgUyBleHRlbmRzIFNjaGVtYSxcbiAgTiBleHRlbmRzIFNPYmplY3ROYW1lczxTPixcbiAgRmllbGROYW1lcyBleHRlbmRzIFNPYmplY3RGaWVsZE5hbWVzPFMsIE4+ID0gU09iamVjdEZpZWxkTmFtZXM8UywgTj4sXG4gIFJldHJpZXZlUmVjb3JkIGV4dGVuZHMgU09iamVjdFJlY29yZDxTLCBOLCAnKic+ID0gU09iamVjdFJlY29yZDxTLCBOLCAnKic+LFxuICBJbnB1dFJlY29yZCBleHRlbmRzIFNPYmplY3RJbnB1dFJlY29yZDxTLCBOPiA9IFNPYmplY3RJbnB1dFJlY29yZDxTLCBOPixcbiAgVXBkYXRlUmVjb3JkIGV4dGVuZHMgU09iamVjdFVwZGF0ZVJlY29yZDxTLCBOPiA9IFNPYmplY3RVcGRhdGVSZWNvcmQ8UywgTj5cbj4ge1xuICBzdGF0aWMgX2xvZ2dlciA9IGdldExvZ2dlcignc29iamVjdCcpO1xuXG4gIHR5cGU6IE47XG4gIF9jb25uOiBDb25uZWN0aW9uPFM+O1xuICBfbG9nZ2VyOiBMb2dnZXI7XG5cbiAgLy8gbGF5b3V0czogKGxuPzogc3RyaW5nKSA9PiBQcm9taXNlPERlc2NyaWJlTGF5b3V0UmVzdWx0PjtcbiAgbGF5b3V0cyQ6IENhY2hlZEZ1bmN0aW9uPChsbj86IHN0cmluZykgPT4gUHJvbWlzZTxEZXNjcmliZUxheW91dFJlc3VsdD4+O1xuICBsYXlvdXRzJCQ6IENhY2hlZEZ1bmN0aW9uPChsbj86IHN0cmluZykgPT4gRGVzY3JpYmVMYXlvdXRSZXN1bHQ+O1xuICAvLyBjb21wYWN0TGF5b3V0czogKCkgPT4gUHJvbWlzZTxEZXNjcmliZUNvbXBhY3RMYXlvdXRzUmVzdWx0PjtcbiAgY29tcGFjdExheW91dHMkOiBDYWNoZWRGdW5jdGlvbjwoKSA9PiBQcm9taXNlPERlc2NyaWJlQ29tcGFjdExheW91dHNSZXN1bHQ+PjtcbiAgY29tcGFjdExheW91dHMkJDogQ2FjaGVkRnVuY3Rpb248KCkgPT4gRGVzY3JpYmVDb21wYWN0TGF5b3V0c1Jlc3VsdD47XG4gIC8vIGFwcHJvdmFsTGF5b3V0czogKCkgPT4gUHJvbWlzZTxEZXNjcmliZUFwcHJvdmFsTGF5b3V0c1Jlc3VsdD47XG4gIGFwcHJvdmFsTGF5b3V0cyQ6IENhY2hlZEZ1bmN0aW9uPFxuICAgICgpID0+IFByb21pc2U8RGVzY3JpYmVBcHByb3ZhbExheW91dHNSZXN1bHQ+XG4gID47XG4gIGFwcHJvdmFsTGF5b3V0cyQkOiBDYWNoZWRGdW5jdGlvbjwoKSA9PiBEZXNjcmliZUFwcHJvdmFsTGF5b3V0c1Jlc3VsdD47XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25uOiBDb25uZWN0aW9uPFM+LCB0eXBlOiBOKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLl9jb25uID0gY29ubjtcbiAgICB0aGlzLl9sb2dnZXIgPSBjb25uLl9sb2dMZXZlbFxuICAgICAgPyBTT2JqZWN0Ll9sb2dnZXIuY3JlYXRlSW5zdGFuY2UoY29ubi5fbG9nTGV2ZWwpXG4gICAgICA6IFNPYmplY3QuX2xvZ2dlcjtcbiAgICBjb25zdCBjYWNoZSA9IHRoaXMuX2Nvbm4uY2FjaGU7XG4gICAgY29uc3QgbGF5b3V0Q2FjaGVLZXkgPSAobGF5b3V0TmFtZTogc3RyaW5nKSA9PlxuICAgICAgbGF5b3V0TmFtZVxuICAgICAgICA/IGBsYXlvdXRzLm5hbWVkTGF5b3V0cy4ke2xheW91dE5hbWV9YFxuICAgICAgICA6IGBsYXlvdXRzLiR7dGhpcy50eXBlfWA7XG4gICAgY29uc3QgbGF5b3V0cyA9IFNPYmplY3QucHJvdG90eXBlLmxheW91dHM7XG4gICAgdGhpcy5sYXlvdXRzID0gY2FjaGUuY3JlYXRlQ2FjaGVkRnVuY3Rpb24obGF5b3V0cywgdGhpcywge1xuICAgICAga2V5OiBsYXlvdXRDYWNoZUtleSxcbiAgICAgIHN0cmF0ZWd5OiAnTk9DQUNIRScsXG4gICAgfSk7XG4gICAgdGhpcy5sYXlvdXRzJCA9IGNhY2hlLmNyZWF0ZUNhY2hlZEZ1bmN0aW9uKGxheW91dHMsIHRoaXMsIHtcbiAgICAgIGtleTogbGF5b3V0Q2FjaGVLZXksXG4gICAgICBzdHJhdGVneTogJ0hJVCcsXG4gICAgfSk7XG4gICAgdGhpcy5sYXlvdXRzJCQgPSBjYWNoZS5jcmVhdGVDYWNoZWRGdW5jdGlvbihsYXlvdXRzLCB0aGlzLCB7XG4gICAgICBrZXk6IGxheW91dENhY2hlS2V5LFxuICAgICAgc3RyYXRlZ3k6ICdJTU1FRElBVEUnLFxuICAgIH0pIGFzIGFueTtcbiAgICBjb25zdCBjb21wYWN0TGF5b3V0Q2FjaGVLZXkgPSBgY29tcGFjdExheW91dHMuJHt0aGlzLnR5cGV9YDtcbiAgICBjb25zdCBjb21wYWN0TGF5b3V0cyA9IFNPYmplY3QucHJvdG90eXBlLmNvbXBhY3RMYXlvdXRzO1xuICAgIHRoaXMuY29tcGFjdExheW91dHMgPSBjYWNoZS5jcmVhdGVDYWNoZWRGdW5jdGlvbihjb21wYWN0TGF5b3V0cywgdGhpcywge1xuICAgICAga2V5OiBjb21wYWN0TGF5b3V0Q2FjaGVLZXksXG4gICAgICBzdHJhdGVneTogJ05PQ0FDSEUnLFxuICAgIH0pO1xuICAgIHRoaXMuY29tcGFjdExheW91dHMkID0gY2FjaGUuY3JlYXRlQ2FjaGVkRnVuY3Rpb24oY29tcGFjdExheW91dHMsIHRoaXMsIHtcbiAgICAgIGtleTogY29tcGFjdExheW91dENhY2hlS2V5LFxuICAgICAgc3RyYXRlZ3k6ICdISVQnLFxuICAgIH0pO1xuICAgIHRoaXMuY29tcGFjdExheW91dHMkJCA9IGNhY2hlLmNyZWF0ZUNhY2hlZEZ1bmN0aW9uKGNvbXBhY3RMYXlvdXRzLCB0aGlzLCB7XG4gICAgICBrZXk6IGNvbXBhY3RMYXlvdXRDYWNoZUtleSxcbiAgICAgIHN0cmF0ZWd5OiAnSU1NRURJQVRFJyxcbiAgICB9KSBhcyBhbnk7XG4gICAgY29uc3QgYXBwcm92YWxMYXlvdXRDYWNoZUtleSA9IGBhcHByb3ZhbExheW91dHMuJHt0aGlzLnR5cGV9YDtcbiAgICBjb25zdCBhcHByb3ZhbExheW91dHMgPSBTT2JqZWN0LnByb3RvdHlwZS5hcHByb3ZhbExheW91dHM7XG4gICAgdGhpcy5hcHByb3ZhbExheW91dHMgPSBjYWNoZS5jcmVhdGVDYWNoZWRGdW5jdGlvbihhcHByb3ZhbExheW91dHMsIHRoaXMsIHtcbiAgICAgIGtleTogYXBwcm92YWxMYXlvdXRDYWNoZUtleSxcbiAgICAgIHN0cmF0ZWd5OiAnTk9DQUNIRScsXG4gICAgfSk7XG4gICAgdGhpcy5hcHByb3ZhbExheW91dHMkID0gY2FjaGUuY3JlYXRlQ2FjaGVkRnVuY3Rpb24oYXBwcm92YWxMYXlvdXRzLCB0aGlzLCB7XG4gICAgICBrZXk6IGFwcHJvdmFsTGF5b3V0Q2FjaGVLZXksXG4gICAgICBzdHJhdGVneTogJ0hJVCcsXG4gICAgfSk7XG4gICAgdGhpcy5hcHByb3ZhbExheW91dHMkJCA9IGNhY2hlLmNyZWF0ZUNhY2hlZEZ1bmN0aW9uKGFwcHJvdmFsTGF5b3V0cywgdGhpcywge1xuICAgICAga2V5OiBhcHByb3ZhbExheW91dENhY2hlS2V5LFxuICAgICAgc3RyYXRlZ3k6ICdJTU1FRElBVEUnLFxuICAgIH0pIGFzIGFueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgcmVjb3Jkc1xuICAgKi9cbiAgY3JlYXRlKHJlY29yZHM6IElucHV0UmVjb3JkW10sIG9wdGlvbnM/OiBEbWxPcHRpb25zKTogUHJvbWlzZTxTYXZlUmVzdWx0W10+O1xuICBjcmVhdGUocmVjb3JkczogSW5wdXRSZWNvcmQsIG9wdGlvbnM/OiBEbWxPcHRpb25zKTogUHJvbWlzZTxTYXZlUmVzdWx0PjtcbiAgY3JlYXRlKFxuICAgIHJlY29yZHM6IElucHV0UmVjb3JkIHwgSW5wdXRSZWNvcmRbXSxcbiAgICBvcHRpb25zPzogRG1sT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxTYXZlUmVzdWx0IHwgU2F2ZVJlc3VsdFtdPjtcbiAgY3JlYXRlKHJlY29yZHM6IElucHV0UmVjb3JkIHwgSW5wdXRSZWNvcmRbXSwgb3B0aW9ucz86IERtbE9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5jcmVhdGUodGhpcy50eXBlLCByZWNvcmRzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5vbnltIG9mIFNPYmplY3QjY3JlYXRlKClcbiAgICovXG4gIGluc2VydCA9IHRoaXMuY3JlYXRlO1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBzcGVjaWZpZWQgcmVjb3Jkc1xuICAgKi9cbiAgcmV0cmlldmUoaWRzOiBzdHJpbmdbXSwgb3B0aW9ucz86IFJldHJpZXZlT3B0aW9ucyk6IFByb21pc2U8UmV0cmlldmVSZWNvcmRbXT47XG4gIHJldHJpZXZlKGlkczogc3RyaW5nLCBvcHRpb25zPzogUmV0cmlldmVPcHRpb25zKTogUHJvbWlzZTxSZXRyaWV2ZVJlY29yZD47XG4gIHJldHJpZXZlKFxuICAgIGlkczogc3RyaW5nIHwgc3RyaW5nW10sXG4gICAgb3B0aW9ucz86IFJldHJpZXZlT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxSZXRyaWV2ZVJlY29yZCB8IFJldHJpZXZlUmVjb3JkW10+O1xuICByZXRyaWV2ZShpZHM6IHN0cmluZyB8IHN0cmluZ1tdLCBvcHRpb25zPzogUmV0cmlldmVPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmV0cmlldmUodGhpcy50eXBlLCBpZHMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSByZWNvcmRzXG4gICAqL1xuICB1cGRhdGUocmVjb3JkczogVXBkYXRlUmVjb3JkW10sIG9wdGlvbnM/OiBEbWxPcHRpb25zKTogUHJvbWlzZTxTYXZlUmVzdWx0W10+O1xuICB1cGRhdGUocmVjb3JkczogVXBkYXRlUmVjb3JkLCBvcHRpb25zPzogRG1sT3B0aW9ucyk6IFByb21pc2U8U2F2ZVJlc3VsdD47XG4gIHVwZGF0ZShcbiAgICByZWNvcmRzOiBVcGRhdGVSZWNvcmQgfCBVcGRhdGVSZWNvcmRbXSxcbiAgICBvcHRpb25zPzogRG1sT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxTYXZlUmVzdWx0IHwgU2F2ZVJlc3VsdFtdPjtcbiAgdXBkYXRlKHJlY29yZHM6IFVwZGF0ZVJlY29yZCB8IFVwZGF0ZVJlY29yZFtdLCBvcHRpb25zPzogRG1sT3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9jb25uLnVwZGF0ZSh0aGlzLnR5cGUsIHJlY29yZHMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwc2VydCByZWNvcmRzXG4gICAqL1xuICB1cHNlcnQoXG4gICAgcmVjb3JkczogSW5wdXRSZWNvcmRbXSxcbiAgICBleHRJZEZpZWxkOiBGaWVsZE5hbWVzLFxuICAgIG9wdGlvbnM/OiBEbWxPcHRpb25zLFxuICApOiBQcm9taXNlPFVwc2VydFJlc3VsdFtdPjtcbiAgdXBzZXJ0KFxuICAgIHJlY29yZHM6IElucHV0UmVjb3JkLFxuICAgIGV4dElkRmllbGQ6IEZpZWxkTmFtZXMsXG4gICAgb3B0aW9ucz86IERtbE9wdGlvbnMsXG4gICk6IFByb21pc2U8VXBzZXJ0UmVzdWx0PjtcbiAgdXBzZXJ0KFxuICAgIHJlY29yZHM6IElucHV0UmVjb3JkIHwgSW5wdXRSZWNvcmRbXSxcbiAgICBleHRJZEZpZWxkOiBGaWVsZE5hbWVzLFxuICAgIG9wdGlvbnM/OiBEbWxPcHRpb25zLFxuICApOiBQcm9taXNlPFVwc2VydFJlc3VsdCB8IFVwc2VydFJlc3VsdFtdPjtcbiAgdXBzZXJ0KFxuICAgIHJlY29yZHM6IElucHV0UmVjb3JkIHwgSW5wdXRSZWNvcmRbXSxcbiAgICBleHRJZEZpZWxkOiBGaWVsZE5hbWVzLFxuICAgIG9wdGlvbnM/OiBEbWxPcHRpb25zLFxuICApIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubi51cHNlcnQodGhpcy50eXBlLCByZWNvcmRzLCBleHRJZEZpZWxkLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgcmVjb3Jkc1xuICAgKi9cbiAgZGVzdHJveShpZHM6IHN0cmluZ1tdLCBvcHRpb25zPzogRG1sT3B0aW9ucyk6IFByb21pc2U8U2F2ZVJlc3VsdFtdPjtcbiAgZGVzdHJveShpZHM6IHN0cmluZywgb3B0aW9ucz86IERtbE9wdGlvbnMpOiBQcm9taXNlPFNhdmVSZXN1bHQ+O1xuICBkZXN0cm95KFxuICAgIGlkczogc3RyaW5nIHwgc3RyaW5nW10sXG4gICAgb3B0aW9ucz86IERtbE9wdGlvbnMsXG4gICk6IFByb21pc2U8U2F2ZVJlc3VsdCB8IFNhdmVSZXN1bHRbXT47XG4gIGRlc3Ryb3koaWRzOiBzdHJpbmcgfCBzdHJpbmdbXSwgb3B0aW9ucz86IERtbE9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5kZXN0cm95KHRoaXMudHlwZSwgaWRzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5vbnltIG9mIFNPYmplY3QjZGVzdHJveSgpXG4gICAqL1xuICBkZWxldGUgPSB0aGlzLmRlc3Ryb3k7XG5cbiAgLyoqXG4gICAqIFN5bm9ueW0gb2YgU09iamVjdCNkZXN0cm95KClcbiAgICovXG4gIGRlbCA9IHRoaXMuZGVzdHJveTtcblxuICAvKipcbiAgICogQ2FsbCBCdWxrI2xvYWQoKSB0byBleGVjdXRlIGJ1bGtsb2FkLCByZXR1cm5pbmcgYmF0Y2ggb2JqZWN0XG4gICAqL1xuICBidWxrbG9hZChcbiAgICBvcGVyYXRpb246ICdpbnNlcnQnIHwgJ3VwZGF0ZScgfCAndXBzZXJ0JyB8ICdkZWxldGUnIHwgJ2hhcmREZWxldGUnLFxuICAgIG9wdGlvbnNPcklucHV0PzogT2JqZWN0IHwgUmVjb3JkW10gfCBSZWFkYWJsZSB8IHN0cmluZyxcbiAgICBpbnB1dD86IFJlY29yZFtdIHwgUmVhZGFibGUgfCBzdHJpbmcsXG4gICkge1xuICAgIHJldHVybiB0aGlzLl9jb25uLmJ1bGsubG9hZCh0aGlzLnR5cGUsIG9wZXJhdGlvbiwgb3B0aW9uc09ySW5wdXQsIGlucHV0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWxrbHkgaW5zZXJ0IGlucHV0IGRhdGEgdXNpbmcgYnVsayBBUElcbiAgICovXG4gIGNyZWF0ZUJ1bGsoaW5wdXQ/OiBSZWNvcmRbXSB8IFJlYWRhYmxlIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVsa2xvYWQoJ2luc2VydCcsIGlucHV0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5vbnltIG9mIFNPYmplY3QjY3JlYXRlQnVsaygpXG4gICAqL1xuICBpbnNlcnRCdWxrID0gdGhpcy5jcmVhdGVCdWxrO1xuXG4gIC8qKlxuICAgKiBCdWxrbHkgdXBkYXRlIHJlY29yZHMgYnkgaW5wdXQgZGF0YSB1c2luZyBidWxrIEFQSVxuICAgKi9cbiAgdXBkYXRlQnVsayhpbnB1dD86IFJlY29yZFtdIHwgUmVhZGFibGUgfCBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5idWxrbG9hZCgndXBkYXRlJywgaW5wdXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1bGtseSB1cHNlcnQgcmVjb3JkcyBieSBpbnB1dCBkYXRhIHVzaW5nIGJ1bGsgQVBJXG4gICAqL1xuICB1cHNlcnRCdWxrKGlucHV0PzogUmVjb3JkW10gfCBSZWFkYWJsZSB8IHN0cmluZywgZXh0SWRGaWVsZD86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmJ1bGtsb2FkKCd1cHNlcnQnLCB7IGV4dElkRmllbGQgfSwgaW5wdXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1bGtseSBkZWxldGUgcmVjb3JkcyBzcGVjaWZpZWQgYnkgaW5wdXQgZGF0YSB1c2luZyBidWxrIEFQSVxuICAgKi9cbiAgZGVzdHJveUJ1bGsoaW5wdXQ/OiBSZWNvcmRbXSB8IFJlYWRhYmxlIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVsa2xvYWQoJ2RlbGV0ZScsIGlucHV0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5vbnltIG9mIFNPYmplY3QjZGVzdHJveUJ1bGsoKVxuICAgKi9cbiAgZGVsZXRlQnVsayA9IHRoaXMuZGVzdHJveUJ1bGs7XG5cbiAgLyoqXG4gICAqIEJ1bGtseSBoYXJkIGRlbGV0ZSByZWNvcmRzIHNwZWNpZmllZCBpbiBpbnB1dCBkYXRhIHVzaW5nIGJ1bGsgQVBJXG4gICAqL1xuICBkZXN0cm95SGFyZEJ1bGsoaW5wdXQ6IFJlY29yZFtdIHwgUmVhZGFibGUpIHtcbiAgICByZXR1cm4gdGhpcy5idWxrbG9hZCgnaGFyZERlbGV0ZScsIGlucHV0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5vbnltIG9mIFNPYmplY3QjZGVzdHJveUhhcmRCdWxrKClcbiAgICovXG4gIGRlbGV0ZUhhcmRCdWxrID0gdGhpcy5kZXN0cm95SGFyZEJ1bGs7XG5cbiAgLyoqXG4gICAqIERlc2NyaWJlIFNPYmplY3QgbWV0YWRhdGFcbiAgICovXG4gIGRlc2NyaWJlKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25uLmRlc2NyaWJlKHRoaXMudHlwZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGRlc2NyaWJlJCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5kZXNjcmliZSQodGhpcy50eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZGVzY3JpYmUkJCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5kZXNjcmliZSQkKHRoaXMudHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJlY29yZCByZXByZXNlbnRhdGlvbiBpbnN0YW5jZSBieSBnaXZlbiBpZFxuICAgKi9cbiAgcmVjb3JkKGlkOiBzdHJpbmcpOiBSZWNvcmRSZWZlcmVuY2U8UywgTj4ge1xuICAgIHJldHVybiBuZXcgUmVjb3JkUmVmZXJlbmNlKHRoaXMuX2Nvbm4sIHRoaXMudHlwZSwgaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHJlY2VudGx5IGFjY2Vzc2VkIHJlY29yZHNcbiAgICovXG4gIHJlY2VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5yZWNlbnQodGhpcy50eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgdXBkYXRlZCByZWNvcmRzXG4gICAqL1xuICB1cGRhdGVkKHN0YXJ0OiBzdHJpbmcgfCBEYXRlLCBlbmQ6IHN0cmluZyB8IERhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubi51cGRhdGVkKHRoaXMudHlwZSwgc3RhcnQsIGVuZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIGRlbGV0ZWQgcmVjb3Jkc1xuICAgKi9cbiAgZGVsZXRlZChzdGFydDogc3RyaW5nIHwgRGF0ZSwgZW5kOiBzdHJpbmcgfCBEYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4uZGVsZXRlZCh0aGlzLnR5cGUsIHN0YXJ0LCBlbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2NyaWJlIGxheW91dCBpbmZvcm1hdGlvbiBmb3IgU09iamVjdFxuICAgKi9cbiAgYXN5bmMgbGF5b3V0cyhsYXlvdXROYW1lPzogc3RyaW5nKTogUHJvbWlzZTxEZXNjcmliZUxheW91dFJlc3VsdD4ge1xuICAgIGNvbnN0IHVybCA9IGAvc29iamVjdHMvJHt0aGlzLnR5cGV9L2Rlc2NyaWJlLyR7XG4gICAgICBsYXlvdXROYW1lID8gYG5hbWVkTGF5b3V0cy8ke2xheW91dE5hbWV9YCA6ICdsYXlvdXRzJ1xuICAgIH1gO1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCB0aGlzLl9jb25uLnJlcXVlc3QodXJsKTtcbiAgICByZXR1cm4gYm9keSBhcyBEZXNjcmliZUxheW91dFJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBDb21wYWN0TGF5b3V0SW5mb1xuICAgKiBAcHJvcCB7QXJyYXkuPE9iamVjdD59IGNvbXBhY3RMYXlvdXRzIC0gQXJyYXkgb2YgY29tcGFjdCBsYXlvdXRzXG4gICAqIEBwcm9wIHtTdHJpbmd9IGRlZmF1bHRDb21wYWN0TGF5b3V0SWQgLSBJRCBvZiBkZWZhdWx0IGNvbXBhY3QgbGF5b3V0XG4gICAqIEBwcm9wIHtBcnJheS48T2JqZWN0Pn0gcmVjb3JkVHlwZUNvbXBhY3RMYXlvdXRNYXBwaW5ncyAtIEFycmF5IG9mIHJlY29yZCB0eXBlIG1hcHBpbmdzXG4gICAqL1xuICAvKipcbiAgICogRGVzY3JpYmUgY29tcGFjdCBsYXlvdXQgaW5mb3JtYXRpb24gZGVmaW5lZCBmb3IgU09iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge0NhbGxiYWNrLjxDb21wYWN0TGF5b3V0SW5mbz59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZS48Q29tcGFjdExheW91dEluZm8+fVxuICAgKi9cbiAgYXN5bmMgY29tcGFjdExheW91dHMoKTogUHJvbWlzZTxEZXNjcmliZUNvbXBhY3RMYXlvdXRzUmVzdWx0PiB7XG4gICAgY29uc3QgdXJsID0gYC9zb2JqZWN0cy8ke3RoaXMudHlwZX0vZGVzY3JpYmUvY29tcGFjdExheW91dHNgO1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCB0aGlzLl9jb25uLnJlcXVlc3QodXJsKTtcbiAgICByZXR1cm4gYm9keSBhcyBEZXNjcmliZUNvbXBhY3RMYXlvdXRzUmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2NyaWJlIGNvbXBhY3QgbGF5b3V0IGluZm9ybWF0aW9uIGRlZmluZWQgZm9yIFNPYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtDYWxsYmFjay48QXBwcm92YWxMYXlvdXRJbmZvPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlLjxBcHByb3ZhbExheW91dEluZm8+fVxuICAgKi9cbiAgYXN5bmMgYXBwcm92YWxMYXlvdXRzKCk6IFByb21pc2U8RGVzY3JpYmVBcHByb3ZhbExheW91dHNSZXN1bHQ+IHtcbiAgICBjb25zdCB1cmwgPSBgL3NvYmplY3RzLyR7dGhpcy50eXBlfS9kZXNjcmliZS9hcHByb3ZhbExheW91dHNgO1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCB0aGlzLl9jb25uLnJlcXVlc3QodXJsKTtcbiAgICByZXR1cm4gYm9keSBhcyBEZXNjcmliZUFwcHJvdmFsTGF5b3V0c1Jlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFuZCBmZXRjaCByZWNvcmRzIHdoaWNoIG1hdGNoZXMgZ2l2ZW4gY29uZGl0aW9uc1xuICAgKi9cbiAgZmluZDxSIGV4dGVuZHMgUmVjb3JkID0gUmVjb3JkPihcbiAgICBjb25kaXRpb25zPzogT3B0aW9uYWw8UXVlcnlDb25kaXRpb248UywgTj4+LFxuICApOiBRdWVyeTxTLCBOLCBTT2JqZWN0UmVjb3JkPFMsIE4sICcqJywgUj4sICdSZWNvcmRzJz47XG4gIGZpbmQ8XG4gICAgUiBleHRlbmRzIFJlY29yZCA9IFJlY29yZCxcbiAgICBGUCBleHRlbmRzIEZpZWxkUGF0aFNwZWNpZmllcjxTLCBOPiA9IEZpZWxkUGF0aFNwZWNpZmllcjxTLCBOPixcbiAgICBGUEMgZXh0ZW5kcyBGaWVsZFByb2plY3Rpb25Db25maWcgPSBGaWVsZFBhdGhTY29wZWRQcm9qZWN0aW9uPFMsIE4sIEZQPlxuICA+KFxuICAgIGNvbmRpdGlvbnM6IE9wdGlvbmFsPFF1ZXJ5Q29uZGl0aW9uPFMsIE4+PixcbiAgICBmaWVsZHM/OiBPcHRpb25hbDxRdWVyeUZpZWxkPFMsIE4sIEZQPj4sXG4gICAgb3B0aW9ucz86IEZpbmRPcHRpb25zPFMsIE4+LFxuICApOiBRdWVyeTxTLCBOLCBTT2JqZWN0UmVjb3JkPFMsIE4sIEZQQywgUj4sICdSZWNvcmRzJz47XG4gIGZpbmQoXG4gICAgY29uZGl0aW9ucz86IE9wdGlvbmFsPFF1ZXJ5Q29uZGl0aW9uPFMsIE4+PixcbiAgICBmaWVsZHM/OiBPcHRpb25hbDxRdWVyeUZpZWxkPFMsIE4sIEZpZWxkUGF0aFNwZWNpZmllcjxTLCBOPj4+LFxuICAgIG9wdGlvbnM6IEZpbmRPcHRpb25zPFMsIE4+ID0ge30sXG4gICk6IFF1ZXJ5PFMsIE4sIGFueSwgJ1JlY29yZHMnPiB7XG4gICAgY29uc3QgeyBzb3J0LCBsaW1pdCwgb2Zmc2V0LCAuLi5xb3B0aW9ucyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBjb25maWc6IFF1ZXJ5Q29uZmlnPFMsIE4+ID0ge1xuICAgICAgZmllbGRzOiBmaWVsZHMgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGZpZWxkcyxcbiAgICAgIGluY2x1ZGVzOiBvcHRpb25zLmluY2x1ZGVzLFxuICAgICAgdGFibGU6IHRoaXMudHlwZSxcbiAgICAgIGNvbmRpdGlvbnM6IGNvbmRpdGlvbnMgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGNvbmRpdGlvbnMsXG4gICAgICBzb3J0LFxuICAgICAgbGltaXQsXG4gICAgICBvZmZzZXQsXG4gICAgfTtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBRdWVyeTxTLCBOPih0aGlzLl9jb25uLCBjb25maWcsIHFvcHRpb25zKTtcbiAgICByZXR1cm4gcXVlcnkuc2V0UmVzcG9uc2VUYXJnZXQoUmVzcG9uc2VUYXJnZXRzLlJlY29yZHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIG9uZSByZWNvcmQgd2hpY2ggbWF0Y2hlcyBnaXZlbiBjb25kaXRpb25zXG4gICAqL1xuICBmaW5kT25lPFIgZXh0ZW5kcyBSZWNvcmQgPSBSZWNvcmQ+KFxuICAgIGNvbmRpdGlvbnM/OiBPcHRpb25hbDxRdWVyeUNvbmRpdGlvbjxTLCBOPj4sXG4gICk6IFF1ZXJ5PFMsIE4sIFNPYmplY3RSZWNvcmQ8UywgTiwgJyonLCBSPiwgJ1NpbmdsZVJlY29yZCc+O1xuICBmaW5kT25lPFxuICAgIFIgZXh0ZW5kcyBSZWNvcmQgPSBSZWNvcmQsXG4gICAgRlAgZXh0ZW5kcyBGaWVsZFBhdGhTcGVjaWZpZXI8UywgTj4gPSBGaWVsZFBhdGhTcGVjaWZpZXI8UywgTj4sXG4gICAgRlBDIGV4dGVuZHMgRmllbGRQcm9qZWN0aW9uQ29uZmlnID0gRmllbGRQYXRoU2NvcGVkUHJvamVjdGlvbjxTLCBOLCBGUD5cbiAgPihcbiAgICBjb25kaXRpb25zOiBPcHRpb25hbDxRdWVyeUNvbmRpdGlvbjxTLCBOPj4sXG4gICAgZmllbGRzPzogT3B0aW9uYWw8UXVlcnlGaWVsZDxTLCBOLCBGUD4+LFxuICAgIG9wdGlvbnM/OiBGaW5kT3B0aW9uczxTLCBOPixcbiAgKTogUXVlcnk8UywgTiwgU09iamVjdFJlY29yZDxTLCBOLCBGUEMsIFI+LCAnU2luZ2xlUmVjb3JkJz47XG4gIGZpbmRPbmUoXG4gICAgY29uZGl0aW9ucz86IE9wdGlvbmFsPFF1ZXJ5Q29uZGl0aW9uPFMsIE4+PixcbiAgICBmaWVsZHM/OiBPcHRpb25hbDxRdWVyeUZpZWxkPFMsIE4sIEZpZWxkUGF0aFNwZWNpZmllcjxTLCBOPj4+LFxuICAgIG9wdGlvbnM6IEZpbmRPcHRpb25zPFMsIE4+ID0ge30sXG4gICk6IFF1ZXJ5PFMsIE4sIGFueSwgJ1NpbmdsZVJlY29yZCc+IHtcbiAgICBjb25zdCBxdWVyeSA9IHRoaXMuZmluZChjb25kaXRpb25zLCBmaWVsZHMsIHsgLi4ub3B0aW9ucywgbGltaXQ6IDEgfSk7XG4gICAgcmV0dXJuIHF1ZXJ5LnNldFJlc3BvbnNlVGFyZ2V0KFJlc3BvbnNlVGFyZ2V0cy5TaW5nbGVSZWNvcmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYW5kIGZldGNoIHJlY29yZHMgb25seSBieSBzcGVjaWZ5aW5nIGZpZWxkcyB0byBmZXRjaC5cbiAgICovXG4gIHNlbGVjdDxcbiAgICBSIGV4dGVuZHMgUmVjb3JkID0gUmVjb3JkLFxuICAgIEZQIGV4dGVuZHMgRmllbGRQYXRoU3BlY2lmaWVyPFMsIE4+ID0gRmllbGRQYXRoU3BlY2lmaWVyPFMsIE4+LFxuICAgIEZQQyBleHRlbmRzIEZpZWxkUHJvamVjdGlvbkNvbmZpZyA9IEZpZWxkUGF0aFNjb3BlZFByb2plY3Rpb248UywgTiwgRlA+XG4gID4oXG4gICAgZmllbGRzOiBRdWVyeUZpZWxkPFMsIE4sIEZQPixcbiAgKTogUXVlcnk8UywgTiwgU09iamVjdFJlY29yZDxTLCBOLCBGUEMsIFI+LCAnUmVjb3Jkcyc+IHtcbiAgICByZXR1cm4gdGhpcy5maW5kKG51bGwsIGZpZWxkcyk7XG4gIH1cblxuICAvKipcbiAgICogQ291bnQgbnVtIG9mIHJlY29yZHMgd2hpY2ggbWF0Y2hlcyBnaXZlbiBjb25kaXRpb25zXG4gICAqL1xuICBjb3VudChjb25kaXRpb25zPzogT3B0aW9uYWw8UXVlcnlDb25kaXRpb248UywgTj4+KSB7XG4gICAgY29uc3QgcXVlcnkgPSB0aGlzLmZpbmQoY29uZGl0aW9ucywgJ2NvdW50KCknKTtcbiAgICByZXR1cm4gcXVlcnkuc2V0UmVzcG9uc2VUYXJnZXQoUmVzcG9uc2VUYXJnZXRzLkNvdW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsaXN0IG9mIGxpc3Qgdmlld3MgZm9yIHRoZSBTT2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2suPExpc3RWaWV3c0luZm8+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHJldHVybnMge1Byb21pc2UuPExpc3RWaWV3c0luZm8+fVxuICAgKi9cbiAgbGlzdHZpZXdzKCkge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuX2Nvbm4uX2Jhc2VVcmwoKX0vc29iamVjdHMvJHt0aGlzLnR5cGV9L2xpc3R2aWV3c2A7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdCh1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxpc3QgdmlldyBpbmZvIGluIHNwZWNpZmVkIHZpZXcgaWRcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIC0gTGlzdCB2aWV3IElEXG4gICAqIEByZXR1cm5zIHtMaXN0Vmlld31cbiAgICovXG4gIGxpc3R2aWV3KGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IExpc3RWaWV3KHRoaXMuX2Nvbm4sIHRoaXMudHlwZSwgaWQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgcmVnaXN0ZXJlZCBxdWljayBhY3Rpb25zIGZvciB0aGUgU09iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge0NhbGxiYWNrLjxBcnJheS48UXVpY2tBY3Rpb25+UXVpY2tBY3Rpb25JbmZvPj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZS48QXJyYXkuPFF1aWNrQWN0aW9uflF1aWNrQWN0aW9uSW5mbz4+fVxuICAgKi9cbiAgcXVpY2tBY3Rpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QoYC9zb2JqZWN0cy8ke3RoaXMudHlwZX0vcXVpY2tBY3Rpb25zYCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJlZmVyZW5jZSBmb3Igc3BlY2lmaWVkIHF1aWNrIGFjaXRvbiBpbiB0aGUgU09iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTmFtZSAtIE5hbWUgb2YgdGhlIHF1aWNrIGFjdGlvblxuICAgKiBAcmV0dXJucyB7UXVpY2tBY3Rpb259XG4gICAqL1xuICBxdWlja0FjdGlvbihhY3Rpb25OYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFF1aWNrQWN0aW9uKFxuICAgICAgdGhpcy5fY29ubixcbiAgICAgIGAvc29iamVjdHMvJHt0aGlzLnR5cGV9L3F1aWNrQWN0aW9ucy8ke2FjdGlvbk5hbWV9YCxcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogQSBjbGFzcyBmb3Igb3JnYW5pemluZyBsaXN0IHZpZXcgaW5mb3JtYXRpb25cbiAqXG4gKiBAcHJvdGVjdGVkXG4gKiBAY2xhc3MgTGlzdFZpZXdcbiAqIEBwYXJhbSB7Q29ubmVjdGlvbn0gY29ubiAtIENvbm5lY3Rpb24gaW5zdGFuY2VcbiAqIEBwYXJhbSB7U09iamVjdH0gdHlwZSAtIFNPYmplY3QgdHlwZVxuICogQHBhcmFtIHtTdHJpbmd9IGlkIC0gTGlzdCB2aWV3IElEXG4gKi9cbmNsYXNzIExpc3RWaWV3IHtcbiAgX2Nvbm46IENvbm5lY3Rpb247XG4gIHR5cGU6IHN0cmluZztcbiAgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbm46IENvbm5lY3Rpb24sIHR5cGU6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgIHRoaXMuX2Nvbm4gPSBjb25uO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHF1ZXJ5IGZvciB0aGUgbGlzdCB2aWV3IGFuZCByZXR1cm5zIHRoZSByZXN1bHRpbmcgZGF0YSBhbmQgcHJlc2VudGF0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVzdWx0cygpIHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLl9jb25uLl9iYXNlVXJsKCl9L3NvYmplY3RzLyR7dGhpcy50eXBlfS9saXN0dmlld3MvJHtcbiAgICAgIHRoaXMuaWRcbiAgICB9L3Jlc3VsdHNgO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGRldGFpbGVkIGluZm9ybWF0aW9uIGFib3V0IGEgbGlzdCB2aWV3XG4gICAqL1xuICBkZXNjcmliZShvcHRpb25zOiB7IGhlYWRlcnM/OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSB9ID0ge30pIHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLl9jb25uLl9iYXNlVXJsKCl9L3NvYmplY3RzLyR7dGhpcy50eXBlfS9saXN0dmlld3MvJHtcbiAgICAgIHRoaXMuaWRcbiAgICB9L2Rlc2NyaWJlYDtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHsgbWV0aG9kOiAnR0VUJywgdXJsLCBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMgfSk7XG4gIH1cblxuICAvKipcbiAgICogRXhwbGFpbiBwbGFuIGZvciBleGVjdXRpbmcgbGlzdCB2aWV3XG4gICAqL1xuICBleHBsYWluKCkge1xuICAgIGNvbnN0IHVybCA9IGAvcXVlcnkvP2V4cGxhaW49JHt0aGlzLmlkfWA7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdDxhbnk+KHVybCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU09iamVjdDtcblxuLy8gVE9ETyBCdWxrXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxTQUFpQkEsU0FBUyxRQUFRLGVBQWU7QUFzQmpELE9BQU9DLGVBQWUsTUFBTSxvQkFBb0I7QUFDaEQsT0FBT0MsS0FBSyxJQUNWQyxlQUFlLFFBS1YsU0FBUztBQUNoQixPQUFPQyxXQUFXLE1BQU0sZ0JBQWdCO0FBWXhDO0FBQ0E7QUFDQTtBQUNBLFdBQWFDLE9BQU87RUFjbEI7O0VBR0E7O0VBR0E7O0VBTUE7QUFDRjtBQUNBO0VBQ0UsU0FBQUEsUUFBWUMsSUFBbUIsRUFBRUMsSUFBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUFBQyxlQUFBLE9BQUFKLE9BQUE7SUFtRTFDO0FBQ0Y7QUFDQTtJQUZFSyxlQUFBLGlCQUdTLElBQUksQ0FBQ0MsTUFBTTtJQW1FcEI7QUFDRjtBQUNBO0lBRkVELGVBQUEsaUJBR1MsSUFBSSxDQUFDRSxPQUFPO0lBRXJCO0FBQ0Y7QUFDQTtJQUZFRixlQUFBLGNBR00sSUFBSSxDQUFDRSxPQUFPO0lBb0JsQjtBQUNGO0FBQ0E7SUFGRUYsZUFBQSxxQkFHYSxJQUFJLENBQUNHLFVBQVU7SUF1QjVCO0FBQ0Y7QUFDQTtJQUZFSCxlQUFBLHFCQUdhLElBQUksQ0FBQ0ksV0FBVztJQVM3QjtBQUNGO0FBQ0E7SUFGRUosZUFBQSx5QkFHaUIsSUFBSSxDQUFDSyxlQUFlO0lBN01uQyxJQUFJLENBQUNSLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNTLEtBQUssR0FBR1YsSUFBSTtJQUNqQixJQUFJLENBQUNX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