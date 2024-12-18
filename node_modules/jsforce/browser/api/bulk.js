import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
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
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _wrapNativeSuper from "@babel/runtime-corejs3/helpers/wrapNativeSuper";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
var _excluded = ["Id", "type", "attributes"],
  _excluded2 = ["path", "responseType"];
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context25; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context25 = Object.prototype.toString.call(o)).call(_context25, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = _Object$keys2(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context23, _context24; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context23 = ownKeys(Object(t), !0)).call(_context23, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context24 = ownKeys(Object(t))).call(_context24, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _Object$keys2 from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _parseInt from "@babel/runtime-corejs3/core-js-stable/parse-int";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/web.dom-exception.constructor.js";
import "core-js/modules/web.dom-exception.stack.js";
import "core-js/modules/web.dom-exception.to-string-tag.js";
import "core-js/modules/web.structured-clone.js";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @file Manages Salesforce Bulk API related operations
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { EventEmitter } from 'events';
import { Writable } from 'stream';
import joinStreams from 'multistream';
import { Serializable, Parsable } from '../record-stream';
import HttpApi from '../http-api';
import { registerModule } from '../jsforce';
import { concatStreamsAsDuplex } from '../util/stream';
import is from '@sindresorhus/is';

/*--------------------------------------------*/

/**
 * Class for Bulk API Job
 */
export var Job = /*#__PURE__*/function (_EventEmitter) {
  /**
   *
   */
  function Job(bulk, type, operation, options, jobId) {
    var _this;
    _classCallCheck(this, Job);
    _this = _callSuper(this, Job);
    _this._bulk = bulk;
    _this.type = type;
    _this.operation = operation;
    _this.options = options || {};
    _this.id = jobId !== null && jobId !== void 0 ? jobId : null;
    _this.state = _this.id ? 'Open' : 'Unknown';
    _this._batches = {};
    // default error handler to keep the latest error
    _this.on('error', function (error) {
      return _this._error = error;
    });
    return _this;
  }

  /**
   * Return latest jobInfo from cache
   */
  _inherits(Job, _EventEmitter);
  return _createClass(Job, [{
    key: "info",
    value: function info() {
      // if cache is not available, check the latest
      if (!this._jobInfo) {
        this._jobInfo = this.check();
      }
      return this._jobInfo;
    }

    /**
     * Open new job and get jobinfo
     */
  }, {
    key: "open",
    value: function open() {
      var _this2 = this;
      var bulk = this._bulk;
      var options = this.options;

      // if sobject type / operation is not provided
      if (!this.type || !this.operation) {
        throw new Error('type / operation is required to open a new job');
      }

      // if not requested opening job
      if (!this._jobInfo) {
        var _context, _context2, _context3, _context4, _context5;
        var _operation = this.operation.toLowerCase();
        if (_operation === 'harddelete') {
          _operation = 'hardDelete';
        }
        if (_operation === 'queryall') {
          _operation = 'queryAll';
        }
        var body = _trimInstanceProperty(_context = _concatInstanceProperty(_context2 = _concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = _concatInstanceProperty(_context5 = "\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<jobInfo  xmlns=\"http://www.force.com/2009/06/asyncapi/dataload\">\n  <operation>".concat(_operation, "</operation>\n  <object>")).call(_context5, this.type, "</object>\n  ")).call(_context4, options.extIdField ? "<externalIdFieldName>".concat(options.extIdField, "</externalIdFieldName>") : '', "\n  ")).call(_context3, options.concurrencyMode ? "<concurrencyMode>".concat(options.concurrencyMode, "</concurrencyMode>") : '', "\n  ")).call(_context2, options.assignmentRuleId ? "<assignmentRuleId>".concat(options.assignmentRuleId, "</assignmentRuleId>") : '', "\n  <contentType>CSV</contentType>\n</jobInfo>\n      ")).call(_context);
        this._jobInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var res;
          return _regeneratorRuntime.wrap(function _callee$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return bulk._request({
                  method: 'POST',
                  path: '/job',
                  body: body,
                  headers: {
                    'Content-Type': 'application/xml; charset=utf-8'
                  },
                  responseType: 'application/xml'
                });
              case 3:
                res = _context6.sent;
                _this2.emit('open', res.jobInfo);
                _this2.id = res.jobInfo.id;
                _this2.state = res.jobInfo.state;
                return _context6.abrupt("return", res.jobInfo);
              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](0);
                _this2.emit('error', _context6.t0);
                throw _context6.t0;
              case 14:
              case "end":
                return _context6.stop();
            }
          }, _callee, null, [[0, 10]]);
        }))();
      }
      return this._jobInfo;
    }

    /**
     * Create a new batch instance in the job
     */
  }, {
    key: "createBatch",
    value: function createBatch() {
      var _this3 = this;
      var batch = new Batch(this);
      batch.on('queue', function () {
        _this3._batches[batch.id] = batch;
      });
      return batch;
    }

    /**
     * Get a batch instance specified by given batch ID
     */
  }, {
    key: "batch",
    value: function batch(batchId) {
      var batch = this._batches[batchId];
      if (!batch) {
        batch = new Batch(this, batchId);
        this._batches[batchId] = batch;
      }
      return batch;
    }

    /**
     * Check the latest job status from server
     */
  }, {
    key: "check",
    value: function check() {
      var _this4 = this;
      var bulk = this._bulk;
      var logger = bulk._logger;
      this._jobInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var jobId, res;
        return _regeneratorRuntime.wrap(function _callee2$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _this4.ready();
            case 2:
              jobId = _context7.sent;
              _context7.next = 5;
              return bulk._request({
                method: 'GET',
                path: '/job/' + jobId,
                responseType: 'application/xml'
              });
            case 5:
              res = _context7.sent;
              logger.debug(res.jobInfo);
              _this4.id = res.jobInfo.id;
              _this4.type = res.jobInfo.object;
              _this4.operation = res.jobInfo.operation;
              _this4.state = res.jobInfo.state;
              return _context7.abrupt("return", res.jobInfo);
            case 12:
            case "end":
              return _context7.stop();
          }
        }, _callee2);
      }))();
      return this._jobInfo;
    }

    /**
     * Wait till the job is assigned to server
     */
  }, {
    key: "ready",
    value: function ready() {
      return this.id ? _Promise.resolve(this.id) : this.open().then(function (_ref3) {
        var id = _ref3.id;
        return id;
      });
    }

    /**
     * List all registered batch info in job
     */
  }, {
    key: "list",
    value: (function () {
      var _list = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var bulk, logger, jobId, res, batchInfoList;
        return _regeneratorRuntime.wrap(function _callee3$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              bulk = this._bulk;
              logger = bulk._logger;
              _context8.next = 4;
              return this.ready();
            case 4:
              jobId = _context8.sent;
              _context8.next = 7;
              return bulk._request({
                method: 'GET',
                path: '/job/' + jobId + '/batch',
                responseType: 'application/xml'
              });
            case 7:
              res = _context8.sent;
              logger.debug(res.batchInfoList.batchInfo);
              batchInfoList = _Array$isArray(res.batchInfoList.batchInfo) ? res.batchInfoList.batchInfo : [res.batchInfoList.batchInfo];
              return _context8.abrupt("return", batchInfoList);
            case 11:
            case "end":
              return _context8.stop();
          }
        }, _callee3, this);
      }));
      function list() {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Close opened job
     */
    )
  }, {
    key: "close",
    value: (function () {
      var _close = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        var jobInfo;
        return _regeneratorRuntime.wrap(function _callee4$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              if (this.id) {
                _context9.next = 2;
                break;
              }
              return _context9.abrupt("return");
            case 2:
              _context9.prev = 2;
              _context9.next = 5;
              return this._changeState('Closed');
            case 5:
              jobInfo = _context9.sent;
              this.id = null;
              this.emit('close', jobInfo);
              return _context9.abrupt("return", jobInfo);
            case 11:
              _context9.prev = 11;
              _context9.t0 = _context9["catch"](2);
              this.emit('error', _context9.t0);
              throw _context9.t0;
            case 15:
            case "end":
              return _context9.stop();
          }
        }, _callee4, this, [[2, 11]]);
      }));
      function close() {
        return _close.apply(this, arguments);
      }
      return close;
    }()
    /**
     * Set the status to abort
     */
    )
  }, {
    key: "abort",
    value: (function () {
      var _abort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        var jobInfo;
        return _regeneratorRuntime.wrap(function _callee5$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              if (this.id) {
                _context10.next = 2;
                break;
              }
              return _context10.abrupt("return");
            case 2:
              _context10.prev = 2;
              _context10.next = 5;
              return this._changeState('Aborted');
            case 5:
              jobInfo = _context10.sent;
              this.id = null;
              this.emit('abort', jobInfo);
              return _context10.abrupt("return", jobInfo);
            case 11:
              _context10.prev = 11;
              _context10.t0 = _context10["catch"](2);
              this.emit('error', _context10.t0);
              throw _context10.t0;
            case 15:
            case "end":
              return _context10.stop();
          }
        }, _callee5, this, [[2, 11]]);
      }));
      function abort() {
        return _abort.apply(this, arguments);
      }
      return abort;
    }()
    /**
     * @private
     */
    )
  }, {
    key: "_changeState",
    value: (function () {
      var _changeState2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(state) {
        var _this5 = this;
        var bulk, logger;
        return _regeneratorRuntime.wrap(function _callee7$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              bulk = this._bulk;
              logger = bulk._logger;
              this._jobInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
                var _context11;
                var jobId, body, res;
                return _regeneratorRuntime.wrap(function _callee6$(_context12) {
                  while (1) switch (_context12.prev = _context12.next) {
                    case 0:
                      _context12.next = 2;
                      return _this5.ready();
                    case 2:
                      jobId = _context12.sent;
                      body = _trimInstanceProperty(_context11 = " \n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n  <jobInfo xmlns=\"http://www.force.com/2009/06/asyncapi/dataload\">\n  <state>".concat(state, "</state>\n</jobInfo>\n      ")).call(_context11);
                      _context12.next = 6;
                      return bulk._request({
                        method: 'POST',
                        path: '/job/' + jobId,
                        body: body,
                        headers: {
                          'Content-Type': 'application/xml; charset=utf-8'
                        },
                        responseType: 'application/xml'
                      });
                    case 6:
                      res = _context12.sent;
                      logger.debug(res.jobInfo);
                      _this5.state = res.jobInfo.state;
                      return _context12.abrupt("return", res.jobInfo);
                    case 10:
                    case "end":
                      return _context12.stop();
                  }
                }, _callee6);
              }))();
              return _context13.abrupt("return", this._jobInfo);
            case 4:
            case "end":
              return _context13.stop();
          }
        }, _callee7, this);
      }));
      function _changeState(_x) {
        return _changeState2.apply(this, arguments);
      }
      return _changeState;
    }())
  }]);
}(EventEmitter);

/*--------------------------------------------*/
var PollingTimeoutError = /*#__PURE__*/function (_Error) {
  /**
   *
   */
  function PollingTimeoutError(message, jobId, batchId) {
    var _this6;
    _classCallCheck(this, PollingTimeoutError);
    _this6 = _callSuper(this, PollingTimeoutError, [message]);
    _this6.name = 'PollingTimeout';
    _this6.jobId = jobId;
    _this6.batchId = batchId;
    return _this6;
  }
  _inherits(PollingTimeoutError, _Error);
  return _createClass(PollingTimeoutError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/*--------------------------------------------*/
/**
 * Batch (extends Writable)
 */
export var Batch = /*#__PURE__*/function (_Writable) {
  /**
   *
   */
  function Batch(job, id) {
    var _this7;
    _classCallCheck(this, Batch);
    _this7 = _callSuper(this, Batch, [{
      objectMode: true
    }]);
    _defineProperty(_this7, "run", _this7.execute);
    _defineProperty(_this7, "exec", _this7.execute);
    _this7.job = job;
    _this7.id = id;
    _this7._bulk = job._bulk;

    // default error handler to keep the latest error
    _this7.on('error', function (error) {
      return _this7._error = error;
    });

    //
    // setup data streams
    //
    var converterOptions = {
      nullValue: '#N/A'
    };
    var uploadStream = _this7._uploadStream = new Serializable();
    var uploadDataStream = uploadStream.stream('csv', converterOptions);
    var downloadStream = _this7._downloadStream = new Parsable();
    var downloadDataStream = downloadStream.stream('csv', converterOptions);
    _this7.on('finish', function () {
      return uploadStream.end();
    });
    uploadDataStream.once('readable', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
      return _regeneratorRuntime.wrap(function _callee8$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _this7.job.ready();
          case 3:
            // pipe upload data to batch API request stream
            uploadDataStream.pipe(_this7._createRequestStream());
            _context14.next = 9;
            break;
          case 6:
            _context14.prev = 6;
            _context14.t0 = _context14["catch"](0);
            _this7.emit('error', _context14.t0);
          case 9:
          case "end":
            return _context14.stop();
        }
      }, _callee8, null, [[0, 6]]);
    })));

    // duplex data stream, opened access to API programmers by Batch#stream()
    _this7._dataStream = concatStreamsAsDuplex(uploadDataStream, downloadDataStream);
    return _this7;
  }

  /**
   * Connect batch API and create stream instance of request/response
   *
   * @private
   */
  _inherits(Batch, _Writable);
  return _createClass(Batch, [{
    key: "_createRequestStream",
    value: function _createRequestStream() {
      var _this8 = this;
      var bulk = this._bulk;
      var logger = bulk._logger;
      var req = bulk._request({
        method: 'POST',
        path: '/job/' + this.job.id + '/batch',
        headers: {
          'Content-Type': 'text/csv'
        },
        responseType: 'application/xml'
      });
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
        var res;
        return _regeneratorRuntime.wrap(function _callee9$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              _context15.next = 3;
              return req;
            case 3:
              res = _context15.sent;
              logger.debug(res.batchInfo);
              _this8.id = res.batchInfo.id;
              _this8.emit('queue', res.batchInfo);
              _context15.next = 12;
              break;
            case 9:
              _context15.prev = 9;
              _context15.t0 = _context15["catch"](0);
              _this8.emit('error', _context15.t0);
            case 12:
            case "end":
              return _context15.stop();
          }
        }, _callee9, null, [[0, 9]]);
      }))();
      return req.stream();
    }

    /**
     * Implementation of Writable
     */
  }, {
    key: "_write",
    value: function _write(record_, enc, cb) {
      var Id = record_.Id,
        type = record_.type,
        attributes = record_.attributes,
        rrec = _objectWithoutProperties(record_, _excluded);
      var record;
      switch (this.job.operation) {
        case 'insert':
          record = rrec;
          break;
        case 'delete':
        case 'hardDelete':
          record = {
            Id: Id
          };
          break;
        default:
          record = _objectSpread({
            Id: Id
          }, rrec);
      }
      this._uploadStream.write(record, enc, cb);
    }

    /**
     * Returns duplex stream which accepts CSV data input and batch result output
     */
  }, {
    key: "stream",
    value: function stream() {
      return this._dataStream;
    }

    /**
     * Execute batch operation
     */
  }, {
    key: "execute",
    value: function execute(input) {
      var _this9 = this;
      // if batch is already executed
      if (this._result) {
        throw new Error('Batch already executed.');
      }
      this._result = new _Promise(function (resolve, reject) {
        _this9.once('response', resolve);
        _this9.once('error', reject);
      });
      if (is.nodeStream(input)) {
        // if input has stream.Readable interface
        input.pipe(this._dataStream);
      } else {
        var recordData = structuredClone(input);
        if (_Array$isArray(recordData)) {
          var _iterator = _createForOfIteratorHelper(recordData),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var record = _step.value;
              for (var _i = 0, _Object$keys = _Object$keys2(record); _i < _Object$keys.length; _i++) {
                var key = _Object$keys[_i];
                if (typeof record[key] === 'boolean') {
                  record[key] = String(record[key]);
                }
              }
              this.write(record);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          this.end();
        } else if (typeof recordData === 'string') {
          this._dataStream.write(recordData, 'utf8');
          this._dataStream.end();
        }
      }

      // return Batch instance for chaining
      return this;
    }
  }, {
    key: "then",
    value:
    /**
     * Promise/A+ interface
     * Delegate to promise, return promise instance for batch result
     */
    function then(onResolved, onReject) {
      if (!this._result) {
        this.execute();
      }
      return this._result.then(onResolved, onReject);
    }

    /**
     * Check the latest batch status in server
     */
  }, {
    key: "check",
    value: (function () {
      var _check = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10() {
        var bulk, logger, jobId, batchId, res;
        return _regeneratorRuntime.wrap(function _callee10$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              bulk = this._bulk;
              logger = bulk._logger;
              jobId = this.job.id;
              batchId = this.id;
              if (!(!jobId || !batchId)) {
                _context16.next = 6;
                break;
              }
              throw new Error('Batch not started.');
            case 6:
              _context16.next = 8;
              return bulk._request({
                method: 'GET',
                path: '/job/' + jobId + '/batch/' + batchId,
                responseType: 'application/xml'
              });
            case 8:
              res = _context16.sent;
              logger.debug(res.batchInfo);
              return _context16.abrupt("return", res.batchInfo);
            case 11:
            case "end":
              return _context16.stop();
          }
        }, _callee10, this);
      }));
      function check() {
        return _check.apply(this, arguments);
      }
      return check;
    }()
    /**
     * Polling the batch result and retrieve
     */
    )
  }, {
    key: "poll",
    value: function poll(interval, timeout) {
      var _this10 = this;
      var jobId = this.job.id;
      var batchId = this.id;
      if (!jobId || !batchId) {
        throw new Error('Batch not started.');
      }
      var startTime = new Date().getTime();
      var endTime = startTime + timeout;
      if (timeout === 0) {
        var _context17;
        throw new PollingTimeoutError(_concatInstanceProperty(_context17 = "Skipping polling because of timeout = 0ms. Job Id = ".concat(jobId, " | Batch Id = ")).call(_context17, batchId), jobId, batchId);
      }
      var poll = /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11() {
          var now, err, res;
          return _regeneratorRuntime.wrap(function _callee11$(_context18) {
            while (1) switch (_context18.prev = _context18.next) {
              case 0:
                now = new Date().getTime();
                if (!(endTime < now)) {
                  _context18.next = 5;
                  break;
                }
                err = new PollingTimeoutError('Polling time out. Job Id = ' + jobId + ' , batch Id = ' + batchId, jobId, batchId);
                _this10.emit('error', err);
                return _context18.abrupt("return");
              case 5:
                _context18.prev = 5;
                _context18.next = 8;
                return _this10.check();
              case 8:
                res = _context18.sent;
                _context18.next = 15;
                break;
              case 11:
                _context18.prev = 11;
                _context18.t0 = _context18["catch"](5);
                _this10.emit('error', _context18.t0);
                return _context18.abrupt("return");
              case 15:
                if (res.state === 'Failed') {
                  if (_parseInt(res.numberRecordsProcessed, 10) > 0) {
                    _this10.retrieve();
                  } else {
                    _this10.emit('error', new Error(res.stateMessage));
                  }
                } else if (res.state === 'Completed') {
                  _this10.retrieve();
                } else if (res.state === 'NotProcessed') {
                  _this10.emit('error', new Error('Job has been aborted'));
                } else {
                  _this10.emit('inProgress', res);
                  _setTimeout(poll, interval);
                }
              case 16:
              case "end":
                return _context18.stop();
            }
          }, _callee11, null, [[5, 11]]);
        }));
        return function poll() {
          return _ref7.apply(this, arguments);
        };
      }();
      _setTimeout(poll, interval);
    }

    /**
     * Retrieve batch result
     */
  }, {
    key: "retrieve",
    value: (function () {
      var _retrieve = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12() {
        var bulk, jobId, job, batchId, resp, results, _context19, res, resultId, _res;
        return _regeneratorRuntime.wrap(function _callee12$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              bulk = this._bulk;
              jobId = this.job.id;
              job = this.job;
              batchId = this.id;
              if (!(!jobId || !batchId)) {
                _context20.next = 6;
                break;
              }
              throw new Error('Batch not started.');
            case 6:
              _context20.prev = 6;
              _context20.next = 9;
              return bulk._request({
                method: 'GET',
                path: '/job/' + jobId + '/batch/' + batchId + '/result'
              });
            case 9:
              resp = _context20.sent;
              if (job.operation === 'query' || job.operation === 'queryAll') {
                res = resp;
                resultId = res['result-list'].result;
                results = _mapInstanceProperty(_context19 = _Array$isArray(resultId) ? resultId : [resultId]).call(_context19, function (id) {
                  return {
                    id: id,
                    batchId: batchId,
                    jobId: jobId
                  };
                });
              } else {
                _res = resp;
                results = _mapInstanceProperty(_res).call(_res, function (ret) {
                  return {
                    id: ret.Id || null,
                    success: ret.Success === 'true',
                    created: ret.Created === 'true',
                    errors: ret.Error ? [ret.Error] : []
                  };
                });
              }
              this.emit('response', results);
              return _context20.abrupt("return", results);
            case 15:
              _context20.prev = 15;
              _context20.t0 = _context20["catch"](6);
              this.emit('error', _context20.t0);
              throw _context20.t0;
            case 19:
            case "end":
              return _context20.stop();
          }
        }, _callee12, this, [[6, 15]]);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
    /**
     * Fetch query batch result as a record stream
     *
     * @param {String} resultId - Result id
     * @returns {RecordStream} - Record stream, convertible to CSV data stream
     */
    )
  }, {
    key: "result",
    value: function result(resultId) {
      var jobId = this.job.id;
      var batchId = this.id;
      if (!jobId || !batchId) {
        throw new Error('Batch not started.');
      }
      var resultStream = new Parsable();
      var resultDataStream = resultStream.stream('csv');
      this._bulk._request({
        method: 'GET',
        path: '/job/' + jobId + '/batch/' + batchId + '/result/' + resultId,
        responseType: 'application/octet-stream'
      }).stream().pipe(resultDataStream);
      return resultStream;
    }
  }]);
}(Writable);

/*--------------------------------------------*/
/**
 *
 */
var BulkApi = /*#__PURE__*/function (_HttpApi) {
  function BulkApi() {
    _classCallCheck(this, BulkApi);
    return _callSuper(this, BulkApi, arguments);
  }
  _inherits(BulkApi, _HttpApi);
  return _createClass(BulkApi, [{
    key: "beforeSend",
    value: function beforeSend(request) {
      var _this$_conn$accessTok;
      request.headers = _objectSpread(_objectSpread({}, request.headers), {}, {
        'X-SFDC-SESSION': (_this$_conn$accessTok = this._conn.accessToken) !== null && _this$_conn$accessTok !== void 0 ? _this$_conn$accessTok : ''
      });
    }
  }, {
    key: "isSessionExpired",
    value: function isSessionExpired(response) {
      var _context21;
      return response.statusCode === 400 && _includesInstanceProperty(_context21 = response.body).call(_context21, '<exceptionCode>InvalidSessionId</exceptionCode>');
    }
  }, {
    key: "hasErrorInResponseBody",
    value: function hasErrorInResponseBody(body) {
      return !!body.error;
    }
  }, {
    key: "parseError",
    value: function parseError(body) {
      return {
        errorCode: body.error.exceptionCode,
        message: body.error.exceptionMessage
      };
    }
  }]);
}(HttpApi);
/*--------------------------------------------*/
/**
 * Class for Bulk API
 *
 * @class
 */
export var Bulk = /*#__PURE__*/function () {
  /**
   *
   */
  function Bulk(conn) {
    _classCallCheck(this, Bulk);
    /**
     * Polling interval in milliseconds
     *
     * Default: 1000 (1 second)
     */
    _defineProperty(this, "pollInterval", 1000);
    /**
     * Polling timeout in milliseconds
     *
     * Default: 30000 (30 seconds)
     */
    _defineProperty(this, "pollTimeout", 30000);
    this._conn = conn;
    this._logger = conn._logger;
  }

  /**
   *
   */
  return _createClass(Bulk, [{
    key: "_request",
    value: function _request(request_) {
      var conn = this._conn;
      var path = request_.path,
        responseType = request_.responseType,
        rreq = _objectWithoutProperties(request_, _excluded2);
      var baseUrl = [conn.instanceUrl, 'services/async', conn.version].join('/');
      var request = _objectSpread(_objectSpread({}, rreq), {}, {
        url: baseUrl + path
      });
      return new BulkApi(this._conn, {
        responseType: responseType
      }).request(request);
    }

    /**
     * Create and start bulkload job and batch
     *
     * This method will return a Batch instance (writable stream)
     * which you can write records into as a CSV string.
     *
     * Batch also implements the a promise interface so you can `await` this method to get the job results.
     *
     * @example
     * // Insert an array of records and get the job results
     *
     * const res = await connection.bulk.load('Account', 'insert', accounts)
     *
     * @example
     * // Insert records from a csv file using the returned batch stream
     *
     * const csvFile = fs.createReadStream('accounts.csv')
     *
     * const batch = conn.bulk.load('Account', 'insert')
     * 
     * // The `response` event is emitted when the job results are retrieved
     * batch.on('response', res => {
     *   console.log(res)
     * })
      * csvFile.pipe(batch.stream())
     *
     *
     */
  }, {
    key: "load",
    value: function load(type, operation, optionsOrInput, input) {
      var _this11 = this;
      var options = {};
      if (typeof optionsOrInput === 'string' || _Array$isArray(optionsOrInput) || is.nodeStream(optionsOrInput)) {
        // when options is not plain hash object, it is omitted
        input = optionsOrInput;
      } else {
        options = optionsOrInput;
      }
      var job = this.createJob(type, operation, options);
      var batch = job.createBatch();
      var cleanup = function cleanup() {
        return job.close();
      };
      var cleanupOnError = function cleanupOnError(err) {
        if (err.name !== 'PollingTimeout') {
          cleanup();
        }
      };
      batch.on('response', cleanup);
      batch.on('error', cleanupOnError);
      batch.on('queue', function () {
        batch === null || batch === void 0 || batch.poll(_this11.pollInterval, _this11.pollTimeout);
      });
      return batch.execute(input);
    }

    /**
     * Execute bulk query and get record stream
     */
  }, {
    key: "query",
    value: (function () {
      var _query = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(soql) {
        var _this12 = this;
        var m, type, recordStream, dataStream, results, streams;
        return _regeneratorRuntime.wrap(function _callee13$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              m = soql.replace(/\([\s\S]+\)/g, '').match(/FROM\s+(\w+)/i);
              if (m) {
                _context22.next = 3;
                break;
              }
              throw new Error('No sobject type found in query, maybe caused by invalid SOQL.');
            case 3:
              type = m[1];
              recordStream = new Parsable();
              dataStream = recordStream.stream('csv');
              _context22.next = 8;
              return this.load(type, 'query', soql);
            case 8:
              results = _context22.sent;
              streams = _mapInstanceProperty(results).call(results, function (result) {
                return _this12.job(result.jobId).batch(result.batchId).result(result.id).stream();
              });
              joinStreams(streams).pipe(dataStream);
              return _context22.abrupt("return", recordStream);
            case 12:
            case "end":
              return _context22.stop();
          }
        }, _callee13, this);
      }));
      function query(_x2) {
        return _query.apply(this, arguments);
      }
      return query;
    }()
    /**
     * Create a new job instance
     */
    )
  }, {
    key: "createJob",
    value: function createJob(type, operation) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return new Job(this, type, operation, options);
    }

    /**
     * Get a job instance specified by given job ID
     *
     * @param {String} jobId - Job ID
     * @returns {Bulk~Job}
     */
  }, {
    key: "job",
    value: function job(jobId) {
      return new Job(this, null, null, null, jobId);
    }
  }]);
}();

/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
registerModule('bulk', function (conn) {
  return new Bulk(conn);
});
export default Bulk;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJXcml0YWJsZSIsImpvaW5TdHJlYW1zIiwiU2VyaWFsaXphYmxlIiwiUGFyc2FibGUiLCJIdHRwQXBpIiwicmVnaXN0ZXJNb2R1bGUiLCJjb25jYXRTdHJlYW1zQXNEdXBsZXgiLCJpcyIsIkpvYiIsIl9FdmVudEVtaXR0ZXIiLCJidWxrIiwidHlwZSIsIm9wZXJhdGlvbiIsIm9wdGlvbnMiLCJqb2JJZCIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsIl9idWxrIiwiaWQiLCJzdGF0ZSIsIl9iYXRjaGVzIiwib24iLCJlcnJvciIsIl9lcnJvciIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiaW5mbyIsIl9qb2JJbmZvIiwiY2hlY2siLCJvcGVuIiwiX3RoaXMyIiwiRXJyb3IiLCJfY29udGV4dCIsIl9jb250ZXh0MiIsIl9jb250ZXh0MyIsIl9jb250ZXh0NCIsIl9jb250ZXh0NSIsInRvTG93ZXJDYXNlIiwiYm9keSIsIl90cmltSW5zdGFuY2VQcm9wZXJ0eSIsIl9jb25jYXRJbnN0YW5jZVByb3BlcnR5IiwiY29uY2F0IiwiY2FsbCIsImV4dElkRmllbGQiLCJjb25jdXJyZW5jeU1vZGUiLCJhc3NpZ25tZW50UnVsZUlkIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJyZXMiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dDYiLCJwcmV2IiwibmV4dCIsIl9yZXF1ZXN0IiwibWV0aG9kIiwicGF0aCIsImhlYWRlcnMiLCJyZXNwb25zZVR5cGUiLCJzZW50IiwiZW1pdCIsImpvYkluZm8iLCJhYnJ1cHQiLCJ0MCIsInN0b3AiLCJjcmVhdGVCYXRjaCIsIl90aGlzMyIsImJhdGNoIiwiQmF0Y2giLCJiYXRjaElkIiwiX3RoaXM0IiwibG9nZ2VyIiwiX2xvZ2dlciIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQ3IiwicmVhZHkiLCJkZWJ1ZyIsIm9iamVjdCIsIl9Qcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfcmVmMyIsIl9saXN0IiwiX2NhbGxlZTMiLCJiYXRjaEluZm9MaXN0IiwiX2NhbGxlZTMkIiwiX2NvbnRleHQ4IiwiYmF0Y2hJbmZvIiwiX0FycmF5JGlzQXJyYXkiLCJsaXN0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfY2xvc2UiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0OSIsIl9jaGFuZ2VTdGF0ZSIsImNsb3NlIiwiX2Fib3J0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDEwIiwiYWJvcnQiLCJfY2hhbmdlU3RhdGUyIiwiX2NhbGxlZTciLCJfdGhpczUiLCJfY2FsbGVlNyQiLCJfY29udGV4dDEzIiwiX2NhbGxlZTYiLCJfY29udGV4dDExIiwiX2NhbGxlZTYkIiwiX2NvbnRleHQxMiIsIl94IiwiUG9sbGluZ1RpbWVvdXRFcnJvciIsIl9FcnJvciIsIm1lc3NhZ2UiLCJfdGhpczYiLCJuYW1lIiwiX3dyYXBOYXRpdmVTdXBlciIsIl9Xcml0YWJsZSIsImpvYiIsIl90aGlzNyIsIm9iamVjdE1vZGUiLCJfZGVmaW5lUHJvcGVydHkiLCJleGVjdXRlIiwiY29udmVydGVyT3B0aW9ucyIsIm51bGxWYWx1ZSIsInVwbG9hZFN0cmVhbSIsIl91cGxvYWRTdHJlYW0iLCJ1cGxvYWREYXRhU3RyZWFtIiwic3RyZWFtIiwiZG93bmxvYWRTdHJlYW0iLCJfZG93bmxvYWRTdHJlYW0iLCJkb3dubG9hZERhdGFTdHJlYW0iLCJlbmQiLCJvbmNlIiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDE0IiwicGlwZSIsIl9jcmVhdGVSZXF1ZXN0U3RyZWFtIiwiX2RhdGFTdHJlYW0iLCJfdGhpczgiLCJyZXEiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0MTUiLCJfd3JpdGUiLCJyZWNvcmRfIiwiZW5jIiwiY2IiLCJJZCIsImF0dHJpYnV0ZXMiLCJycmVjIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2V4Y2x1ZGVkIiwicmVjb3JkIiwiX29iamVjdFNwcmVhZCIsIndyaXRlIiwiaW5wdXQiLCJfdGhpczkiLCJfcmVzdWx0IiwicmVqZWN0Iiwibm9kZVN0cmVhbSIsInJlY29yZERhdGEiLCJzdHJ1Y3R1cmVkQ2xvbmUiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwiX2kiLCJfT2JqZWN0JGtleXMiLCJfT2JqZWN0JGtleXMyIiwibGVuZ3RoIiwiU3RyaW5nIiwiZXJyIiwiZSIsImYiLCJvblJlc29sdmVkIiwib25SZWplY3QiLCJfY2hlY2siLCJfY2FsbGVlMTAiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxNiIsInBvbGwiLCJpbnRlcnZhbCIsInRpbWVvdXQiLCJfdGhpczEwIiwic3RhcnRUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJlbmRUaW1lIiwiX2NvbnRleHQxNyIsIl9yZWY3IiwiX2NhbGxlZTExIiwibm93IiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTgiLCJfcGFyc2VJbnQiLCJudW1iZXJSZWNvcmRzUHJvY2Vzc2VkIiwicmV0cmlldmUiLCJzdGF0ZU1lc3NhZ2UiLCJfc2V0VGltZW91dCIsIl9yZXRyaWV2ZSIsIl9jYWxsZWUxMiIsInJlc3AiLCJyZXN1bHRzIiwiX2NvbnRleHQxOSIsInJlc3VsdElkIiwiX3JlcyIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDIwIiwicmVzdWx0IiwiX21hcEluc3RhbmNlUHJvcGVydHkiLCJyZXQiLCJzdWNjZXNzIiwiU3VjY2VzcyIsImNyZWF0ZWQiLCJDcmVhdGVkIiwiZXJyb3JzIiwicmVzdWx0U3RyZWFtIiwicmVzdWx0RGF0YVN0cmVhbSIsIkJ1bGtBcGkiLCJfSHR0cEFwaSIsImJlZm9yZVNlbmQiLCJyZXF1ZXN0IiwiX3RoaXMkX2Nvbm4kYWNjZXNzVG9rIiwiX2Nvbm4iLCJhY2Nlc3NUb2tlbiIsImlzU2Vzc2lvbkV4cGlyZWQiLCJyZXNwb25zZSIsIl9jb250ZXh0MjEiLCJzdGF0dXNDb2RlIiwiX2luY2x1ZGVzSW5zdGFuY2VQcm9wZXJ0eSIsImhhc0Vycm9ySW5SZXNwb25zZUJvZHkiLCJwYXJzZUVycm9yIiwiZXJyb3JDb2RlIiwiZXhjZXB0aW9uQ29kZSIsImV4Y2VwdGlvbk1lc3NhZ2UiLCJCdWxrIiwiY29ubiIsInJlcXVlc3RfIiwicnJlcSIsIl9leGNsdWRlZDIiLCJiYXNlVXJsIiwiaW5zdGFuY2VVcmwiLCJ2ZXJzaW9uIiwiam9pbiIsInVybCIsImxvYWQiLCJvcHRpb25zT3JJbnB1dCIsIl90aGlzMTEiLCJjcmVhdGVKb2IiLCJjbGVhbnVwIiwiY2xlYW51cE9uRXJyb3IiLCJwb2xsSW50ZXJ2YWwiLCJwb2xsVGltZW91dCIsIl9xdWVyeSIsIl9jYWxsZWUxMyIsInNvcWwiLCJfdGhpczEyIiwibSIsInJlY29yZFN0cmVhbSIsImRhdGFTdHJlYW0iLCJzdHJlYW1zIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MjIiLCJyZXBsYWNlIiwibWF0Y2giLCJxdWVyeSIsIl94MiIsInVuZGVmaW5lZCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvYnVsay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIE1hbmFnZXMgU2FsZXNmb3JjZSBCdWxrIEFQSSByZWxhdGVkIG9wZXJhdGlvbnNcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgRHVwbGV4LCBSZWFkYWJsZSwgV3JpdGFibGUgfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IGpvaW5TdHJlYW1zIGZyb20gJ211bHRpc3RyZWFtJztcbmltcG9ydCBDb25uZWN0aW9uIGZyb20gJy4uL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IHsgU2VyaWFsaXphYmxlLCBQYXJzYWJsZSB9IGZyb20gJy4uL3JlY29yZC1zdHJlYW0nO1xuaW1wb3J0IEh0dHBBcGkgZnJvbSAnLi4vaHR0cC1hcGknO1xuaW1wb3J0IHsgcmVnaXN0ZXJNb2R1bGUgfSBmcm9tICcuLi9qc2ZvcmNlJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL3V0aWwvbG9nZ2VyJztcbmltcG9ydCB7IGNvbmNhdFN0cmVhbXNBc0R1cGxleCB9IGZyb20gJy4uL3V0aWwvc3RyZWFtJztcbmltcG9ydCB7XG4gIEh0dHBNZXRob2RzLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cFJlc3BvbnNlLFxuICBSZWNvcmQsXG4gIFNjaGVtYSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IGlzIGZyb20gJ0BzaW5kcmVzb3JodXMvaXMnO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZXhwb3J0IHR5cGUgQnVsa09wZXJhdGlvbiA9XG4gIHwgJ2luc2VydCdcbiAgfCAndXBkYXRlJ1xuICB8ICd1cHNlcnQnXG4gIHwgJ2RlbGV0ZSdcbiAgfCAnaGFyZERlbGV0ZSdcbiAgfCAncXVlcnknXG4gIHwgJ3F1ZXJ5QWxsJztcblxuZXhwb3J0IHR5cGUgQnVsa09wdGlvbnMgPSB7XG4gIGV4dElkRmllbGQ/OiBzdHJpbmc7XG4gIGNvbmN1cnJlbmN5TW9kZT86ICdTZXJpYWwnIHwgJ1BhcmFsbGVsJztcbiAgYXNzaWdubWVudFJ1bGVJZD86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEpvYlN0YXRlID0gJ09wZW4nIHwgJ0Nsb3NlZCcgfCAnQWJvcnRlZCcgfCAnRmFpbGVkJyB8ICdVbmtub3duJyB8ICdOb3RQcm9jZXNzZWQnO1xuXG5leHBvcnQgdHlwZSBKb2JJbmZvID0ge1xuICBpZDogc3RyaW5nO1xuICBvYmplY3Q6IHN0cmluZztcbiAgb3BlcmF0aW9uOiBCdWxrT3BlcmF0aW9uO1xuICBzdGF0ZTogSm9iU3RhdGU7XG59O1xuXG50eXBlIEpvYkluZm9SZXNwb25zZSA9IHtcbiAgam9iSW5mbzogSm9iSW5mbztcbn07XG5cbmV4cG9ydCB0eXBlIEJhdGNoU3RhdGUgPVxuICB8ICdRdWV1ZWQnXG4gIHwgJ0luUHJvZ3Jlc3MnXG4gIHwgJ0NvbXBsZXRlZCdcbiAgfCAnRmFpbGVkJ1xuICB8ICdOb3RQcm9jZXNzZWQnO1xuXG5leHBvcnQgdHlwZSBCYXRjaEluZm8gPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGpvYklkOiBzdHJpbmc7XG4gIHN0YXRlOiBCYXRjaFN0YXRlO1xuICBzdGF0ZU1lc3NhZ2U6IHN0cmluZztcbiAgbnVtYmVyUmVjb3Jkc1Byb2Nlc3NlZDogc3RyaW5nO1xuICBudW1iZXJSZWNvcmRzRmFpbGVkOiBzdHJpbmc7XG4gIHRvdGFsUHJvY2Vzc2luZ1RpbWU6IHN0cmluZztcbn07XG5cbnR5cGUgQmF0Y2hJbmZvUmVzcG9uc2UgPSB7XG4gIGJhdGNoSW5mbzogQmF0Y2hJbmZvO1xufTtcblxudHlwZSBCYXRjaEluZm9MaXN0UmVzcG9uc2UgPSB7XG4gIGJhdGNoSW5mb0xpc3Q6IHtcbiAgICBiYXRjaEluZm86IEJhdGNoSW5mbyB8IEJhdGNoSW5mb1tdO1xuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgQnVsa1F1ZXJ5QmF0Y2hSZXN1bHQgPSBBcnJheTx7XG4gIGlkOiBzdHJpbmc7XG4gIGJhdGNoSWQ6IHN0cmluZztcbiAgam9iSWQ6IHN0cmluZztcbn0+O1xuXG5leHBvcnQgdHlwZSBCdWxrSW5nZXN0QmF0Y2hSZXN1bHQgPSBBcnJheTx7XG4gIGlkOiBzdHJpbmcgfCBudWxsO1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBjcmVhdGVkOiBib29sZWFuO1xuICBlcnJvcnM6IHN0cmluZ1tdO1xufT47XG5cbmV4cG9ydCB0eXBlIEJhdGNoUmVzdWx0PE9wciBleHRlbmRzIEJ1bGtPcGVyYXRpb24+ID0gT3ByIGV4dGVuZHNcbiAgfCAncXVlcnknXG4gIHwgJ3F1ZXJ5QWxsJ1xuICA/IEJ1bGtRdWVyeUJhdGNoUmVzdWx0XG4gIDogQnVsa0luZ2VzdEJhdGNoUmVzdWx0O1xuXG50eXBlIEJ1bGtJbmdlc3RSZXN1bHRSZXNwb25zZSA9IEFycmF5PHtcbiAgSWQ6IHN0cmluZztcbiAgU3VjY2Vzczogc3RyaW5nO1xuICBDcmVhdGVkOiBzdHJpbmc7XG4gIEVycm9yOiBzdHJpbmc7XG59PjtcblxudHlwZSBCdWxrUXVlcnlSZXN1bHRSZXNwb25zZSA9IHtcbiAgJ3Jlc3VsdC1saXN0Jzoge1xuICAgIHJlc3VsdDogc3RyaW5nIHwgc3RyaW5nW107XG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBCdWxrUmVxdWVzdCA9IHtcbiAgbWV0aG9kOiBIdHRwTWV0aG9kcztcbiAgcGF0aD86IHN0cmluZztcbiAgYm9keT86IHN0cmluZztcbiAgaGVhZGVycz86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xuICByZXNwb25zZVR5cGU/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIENsYXNzIGZvciBCdWxrIEFQSSBKb2JcbiAqL1xuZXhwb3J0IGNsYXNzIEpvYjxcbiAgUyBleHRlbmRzIFNjaGVtYSxcbiAgT3ByIGV4dGVuZHMgQnVsa09wZXJhdGlvblxuPiBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHR5cGU6IHN0cmluZyB8IG51bGw7XG4gIG9wZXJhdGlvbjogT3ByIHwgbnVsbDtcbiAgb3B0aW9uczogQnVsa09wdGlvbnM7XG4gIGlkOiBzdHJpbmcgfCBudWxsO1xuICBzdGF0ZTogSm9iU3RhdGU7XG4gIF9idWxrOiBCdWxrPFM+O1xuICBfYmF0Y2hlczogeyBbaWQ6IHN0cmluZ106IEJhdGNoPFMsIE9wcj4gfTtcbiAgX2pvYkluZm86IFByb21pc2U8Sm9iSW5mbz4gfCB1bmRlZmluZWQ7XG4gIF9lcnJvcjogRXJyb3IgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBidWxrOiBCdWxrPFM+LFxuICAgIHR5cGU6IHN0cmluZyB8IG51bGwsXG4gICAgb3BlcmF0aW9uOiBPcHIgfCBudWxsLFxuICAgIG9wdGlvbnM6IEJ1bGtPcHRpb25zIHwgbnVsbCxcbiAgICBqb2JJZD86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9idWxrID0gYnVsaztcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMub3BlcmF0aW9uID0gb3BlcmF0aW9uO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5pZCA9IGpvYklkID8/IG51bGw7XG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuaWQgPyAnT3BlbicgOiAnVW5rbm93bic7XG4gICAgdGhpcy5fYmF0Y2hlcyA9IHt9O1xuICAgIC8vIGRlZmF1bHQgZXJyb3IgaGFuZGxlciB0byBrZWVwIHRoZSBsYXRlc3QgZXJyb3JcbiAgICB0aGlzLm9uKCdlcnJvcicsIChlcnJvcikgPT4gKHRoaXMuX2Vycm9yID0gZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gbGF0ZXN0IGpvYkluZm8gZnJvbSBjYWNoZVxuICAgKi9cbiAgaW5mbygpIHtcbiAgICAvLyBpZiBjYWNoZSBpcyBub3QgYXZhaWxhYmxlLCBjaGVjayB0aGUgbGF0ZXN0XG4gICAgaWYgKCF0aGlzLl9qb2JJbmZvKSB7XG4gICAgICB0aGlzLl9qb2JJbmZvID0gdGhpcy5jaGVjaygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fam9iSW5mbztcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIG5ldyBqb2IgYW5kIGdldCBqb2JpbmZvXG4gICAqL1xuICBvcGVuKCk6IFByb21pc2U8Sm9iSW5mbz4ge1xuICAgIGNvbnN0IGJ1bGsgPSB0aGlzLl9idWxrO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAvLyBpZiBzb2JqZWN0IHR5cGUgLyBvcGVyYXRpb24gaXMgbm90IHByb3ZpZGVkXG4gICAgaWYgKCF0aGlzLnR5cGUgfHwgIXRoaXMub3BlcmF0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3R5cGUgLyBvcGVyYXRpb24gaXMgcmVxdWlyZWQgdG8gb3BlbiBhIG5ldyBqb2InKTtcbiAgICB9XG5cbiAgICAvLyBpZiBub3QgcmVxdWVzdGVkIG9wZW5pbmcgam9iXG4gICAgaWYgKCF0aGlzLl9qb2JJbmZvKSB7XG4gICAgICBsZXQgb3BlcmF0aW9uID0gdGhpcy5vcGVyYXRpb24udG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChvcGVyYXRpb24gPT09ICdoYXJkZGVsZXRlJykge1xuICAgICAgICBvcGVyYXRpb24gPSAnaGFyZERlbGV0ZSc7XG4gICAgICB9XG4gICAgICBpZiAob3BlcmF0aW9uID09PSAncXVlcnlhbGwnKSB7XG4gICAgICAgIG9wZXJhdGlvbiA9ICdxdWVyeUFsbCc7XG4gICAgICB9XG4gICAgICBjb25zdCBib2R5ID0gYFxuPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+XG48am9iSW5mbyAgeG1sbnM9XCJodHRwOi8vd3d3LmZvcmNlLmNvbS8yMDA5LzA2L2FzeW5jYXBpL2RhdGFsb2FkXCI+XG4gIDxvcGVyYXRpb24+JHtvcGVyYXRpb259PC9vcGVyYXRpb24+XG4gIDxvYmplY3Q+JHt0aGlzLnR5cGV9PC9vYmplY3Q+XG4gICR7XG4gICAgb3B0aW9ucy5leHRJZEZpZWxkXG4gICAgICA/IGA8ZXh0ZXJuYWxJZEZpZWxkTmFtZT4ke29wdGlvbnMuZXh0SWRGaWVsZH08L2V4dGVybmFsSWRGaWVsZE5hbWU+YFxuICAgICAgOiAnJ1xuICB9XG4gICR7XG4gICAgb3B0aW9ucy5jb25jdXJyZW5jeU1vZGVcbiAgICAgID8gYDxjb25jdXJyZW5jeU1vZGU+JHtvcHRpb25zLmNvbmN1cnJlbmN5TW9kZX08L2NvbmN1cnJlbmN5TW9kZT5gXG4gICAgICA6ICcnXG4gIH1cbiAgJHtcbiAgICBvcHRpb25zLmFzc2lnbm1lbnRSdWxlSWRcbiAgICAgID8gYDxhc3NpZ25tZW50UnVsZUlkPiR7b3B0aW9ucy5hc3NpZ25tZW50UnVsZUlkfTwvYXNzaWdubWVudFJ1bGVJZD5gXG4gICAgICA6ICcnXG4gIH1cbiAgPGNvbnRlbnRUeXBlPkNTVjwvY29udGVudFR5cGU+XG48L2pvYkluZm8+XG4gICAgICBgLnRyaW0oKTtcblxuICAgICAgdGhpcy5fam9iSW5mbyA9IChhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYnVsay5fcmVxdWVzdDxKb2JJbmZvUmVzcG9uc2U+KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgcGF0aDogJy9qb2InLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94bWw7IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2FwcGxpY2F0aW9uL3htbCcsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5lbWl0KCdvcGVuJywgcmVzLmpvYkluZm8pO1xuICAgICAgICAgIHRoaXMuaWQgPSByZXMuam9iSW5mby5pZDtcbiAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzLmpvYkluZm8uc3RhdGU7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qb2JJbmZvO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9qb2JJbmZvO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBiYXRjaCBpbnN0YW5jZSBpbiB0aGUgam9iXG4gICAqL1xuICBjcmVhdGVCYXRjaCgpOiBCYXRjaDxTLCBPcHI+IHtcbiAgICBjb25zdCBiYXRjaCA9IG5ldyBCYXRjaCh0aGlzKTtcbiAgICBiYXRjaC5vbigncXVldWUnLCAoKSA9PiB7XG4gICAgICB0aGlzLl9iYXRjaGVzW2JhdGNoLmlkIV0gPSBiYXRjaDtcbiAgICB9KTtcbiAgICByZXR1cm4gYmF0Y2g7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgYmF0Y2ggaW5zdGFuY2Ugc3BlY2lmaWVkIGJ5IGdpdmVuIGJhdGNoIElEXG4gICAqL1xuICBiYXRjaChiYXRjaElkOiBzdHJpbmcpOiBCYXRjaDxTLCBPcHI+IHtcbiAgICBsZXQgYmF0Y2ggPSB0aGlzLl9iYXRjaGVzW2JhdGNoSWRdO1xuICAgIGlmICghYmF0Y2gpIHtcbiAgICAgIGJhdGNoID0gbmV3IEJhdGNoKHRoaXMsIGJhdGNoSWQpO1xuICAgICAgdGhpcy5fYmF0Y2hlc1tiYXRjaElkXSA9IGJhdGNoO1xuICAgIH1cbiAgICByZXR1cm4gYmF0Y2g7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdGhlIGxhdGVzdCBqb2Igc3RhdHVzIGZyb20gc2VydmVyXG4gICAqL1xuICBjaGVjaygpIHtcbiAgICBjb25zdCBidWxrID0gdGhpcy5fYnVsaztcbiAgICBjb25zdCBsb2dnZXIgPSBidWxrLl9sb2dnZXI7XG5cbiAgICB0aGlzLl9qb2JJbmZvID0gKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGpvYklkID0gYXdhaXQgdGhpcy5yZWFkeSgpO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgYnVsay5fcmVxdWVzdDxKb2JJbmZvUmVzcG9uc2U+KHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcGF0aDogJy9qb2IvJyArIGpvYklkLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdhcHBsaWNhdGlvbi94bWwnLFxuICAgICAgfSk7XG4gICAgICBsb2dnZXIuZGVidWcocmVzLmpvYkluZm8pO1xuICAgICAgdGhpcy5pZCA9IHJlcy5qb2JJbmZvLmlkO1xuICAgICAgdGhpcy50eXBlID0gcmVzLmpvYkluZm8ub2JqZWN0O1xuICAgICAgdGhpcy5vcGVyYXRpb24gPSByZXMuam9iSW5mby5vcGVyYXRpb24gYXMgT3ByO1xuICAgICAgdGhpcy5zdGF0ZSA9IHJlcy5qb2JJbmZvLnN0YXRlO1xuICAgICAgcmV0dXJuIHJlcy5qb2JJbmZvO1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gdGhpcy5fam9iSW5mbztcbiAgfVxuXG4gIC8qKlxuICAgKiBXYWl0IHRpbGwgdGhlIGpvYiBpcyBhc3NpZ25lZCB0byBzZXJ2ZXJcbiAgICovXG4gIHJlYWR5KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuaWRcbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHRoaXMuaWQpXG4gICAgICA6IHRoaXMub3BlbigpLnRoZW4oKHsgaWQgfSkgPT4gaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3QgYWxsIHJlZ2lzdGVyZWQgYmF0Y2ggaW5mbyBpbiBqb2JcbiAgICovXG4gIGFzeW5jIGxpc3QoKSB7XG4gICAgY29uc3QgYnVsayA9IHRoaXMuX2J1bGs7XG4gICAgY29uc3QgbG9nZ2VyID0gYnVsay5fbG9nZ2VyO1xuICAgIGNvbnN0IGpvYklkID0gYXdhaXQgdGhpcy5yZWFkeSgpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGJ1bGsuX3JlcXVlc3Q8QmF0Y2hJbmZvTGlzdFJlc3BvbnNlPih7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGF0aDogJy9qb2IvJyArIGpvYklkICsgJy9iYXRjaCcsXG4gICAgICByZXNwb25zZVR5cGU6ICdhcHBsaWNhdGlvbi94bWwnLFxuICAgIH0pO1xuICAgIGxvZ2dlci5kZWJ1ZyhyZXMuYmF0Y2hJbmZvTGlzdC5iYXRjaEluZm8pO1xuICAgIGNvbnN0IGJhdGNoSW5mb0xpc3QgPSBBcnJheS5pc0FycmF5KHJlcy5iYXRjaEluZm9MaXN0LmJhdGNoSW5mbylcbiAgICAgID8gcmVzLmJhdGNoSW5mb0xpc3QuYmF0Y2hJbmZvXG4gICAgICA6IFtyZXMuYmF0Y2hJbmZvTGlzdC5iYXRjaEluZm9dO1xuICAgIHJldHVybiBiYXRjaEluZm9MaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIG9wZW5lZCBqb2JcbiAgICovXG4gIGFzeW5jIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgY29uc3Qgam9iSW5mbyA9IGF3YWl0IHRoaXMuX2NoYW5nZVN0YXRlKCdDbG9zZWQnKTtcbiAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgdGhpcy5lbWl0KCdjbG9zZScsIGpvYkluZm8pO1xuICAgICAgcmV0dXJuIGpvYkluZm87XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzdGF0dXMgdG8gYWJvcnRcbiAgICovXG4gIGFzeW5jIGFib3J0KCkge1xuICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgY29uc3Qgam9iSW5mbyA9IGF3YWl0IHRoaXMuX2NoYW5nZVN0YXRlKCdBYm9ydGVkJyk7XG4gICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgIHRoaXMuZW1pdCgnYWJvcnQnLCBqb2JJbmZvKTtcbiAgICAgIHJldHVybiBqb2JJbmZvO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfY2hhbmdlU3RhdGUoc3RhdGU6IEpvYlN0YXRlKSB7XG4gICAgY29uc3QgYnVsayA9IHRoaXMuX2J1bGs7XG4gICAgY29uc3QgbG9nZ2VyID0gYnVsay5fbG9nZ2VyO1xuXG4gICAgdGhpcy5fam9iSW5mbyA9IChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBqb2JJZCA9IGF3YWl0IHRoaXMucmVhZHkoKTtcbiAgICAgIGNvbnN0IGJvZHkgPSBgIFxuPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+XG4gIDxqb2JJbmZvIHhtbG5zPVwiaHR0cDovL3d3dy5mb3JjZS5jb20vMjAwOS8wNi9hc3luY2FwaS9kYXRhbG9hZFwiPlxuICA8c3RhdGU+JHtzdGF0ZX08L3N0YXRlPlxuPC9qb2JJbmZvPlxuICAgICAgYC50cmltKCk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBidWxrLl9yZXF1ZXN0PEpvYkluZm9SZXNwb25zZT4oe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgcGF0aDogJy9qb2IvJyArIGpvYklkLFxuICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94bWw7IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZVR5cGU6ICdhcHBsaWNhdGlvbi94bWwnLFxuICAgICAgfSk7XG4gICAgICBsb2dnZXIuZGVidWcocmVzLmpvYkluZm8pO1xuICAgICAgdGhpcy5zdGF0ZSA9IHJlcy5qb2JJbmZvLnN0YXRlO1xuICAgICAgcmV0dXJuIHJlcy5qb2JJbmZvO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIHRoaXMuX2pvYkluZm87XG4gIH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5jbGFzcyBQb2xsaW5nVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBqb2JJZDogc3RyaW5nO1xuICBiYXRjaElkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGpvYklkOiBzdHJpbmcsIGJhdGNoSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9ICdQb2xsaW5nVGltZW91dCc7XG4gICAgdGhpcy5qb2JJZCA9IGpvYklkO1xuICAgIHRoaXMuYmF0Y2hJZCA9IGJhdGNoSWQ7XG4gIH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEJhdGNoIChleHRlbmRzIFdyaXRhYmxlKVxuICovXG5leHBvcnQgY2xhc3MgQmF0Y2g8XG4gIFMgZXh0ZW5kcyBTY2hlbWEsXG4gIE9wciBleHRlbmRzIEJ1bGtPcGVyYXRpb25cbj4gZXh0ZW5kcyBXcml0YWJsZSB7XG4gIGpvYjogSm9iPFMsIE9wcj47XG4gIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIF9idWxrOiBCdWxrPFM+O1xuICBfdXBsb2FkU3RyZWFtOiBTZXJpYWxpemFibGU7XG4gIF9kb3dubG9hZFN0cmVhbTogUGFyc2FibGU7XG4gIF9kYXRhU3RyZWFtOiBEdXBsZXg7XG4gIF9yZXN1bHQ6IFByb21pc2U8QmF0Y2hSZXN1bHQ8T3ByPj4gfCB1bmRlZmluZWQ7XG4gIF9lcnJvcjogRXJyb3IgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihqb2I6IEpvYjxTLCBPcHI+LCBpZD86IHN0cmluZykge1xuICAgIHN1cGVyKHsgb2JqZWN0TW9kZTogdHJ1ZSB9KTtcbiAgICB0aGlzLmpvYiA9IGpvYjtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5fYnVsayA9IGpvYi5fYnVsaztcblxuICAgIC8vIGRlZmF1bHQgZXJyb3IgaGFuZGxlciB0byBrZWVwIHRoZSBsYXRlc3QgZXJyb3JcbiAgICB0aGlzLm9uKCdlcnJvcicsIChlcnJvcikgPT4gKHRoaXMuX2Vycm9yID0gZXJyb3IpKTtcblxuICAgIC8vXG4gICAgLy8gc2V0dXAgZGF0YSBzdHJlYW1zXG4gICAgLy9cbiAgICBjb25zdCBjb252ZXJ0ZXJPcHRpb25zID0geyBudWxsVmFsdWU6ICcjTi9BJyB9O1xuICAgIGNvbnN0IHVwbG9hZFN0cmVhbSA9ICh0aGlzLl91cGxvYWRTdHJlYW0gPSBuZXcgU2VyaWFsaXphYmxlKCkpO1xuICAgIGNvbnN0IHVwbG9hZERhdGFTdHJlYW0gPSB1cGxvYWRTdHJlYW0uc3RyZWFtKCdjc3YnLCBjb252ZXJ0ZXJPcHRpb25zKTtcbiAgICBjb25zdCBkb3dubG9hZFN0cmVhbSA9ICh0aGlzLl9kb3dubG9hZFN0cmVhbSA9IG5ldyBQYXJzYWJsZSgpKTtcbiAgICBjb25zdCBkb3dubG9hZERhdGFTdHJlYW0gPSBkb3dubG9hZFN0cmVhbS5zdHJlYW0oJ2NzdicsIGNvbnZlcnRlck9wdGlvbnMpO1xuXG4gICAgdGhpcy5vbignZmluaXNoJywgKCkgPT4gdXBsb2FkU3RyZWFtLmVuZCgpKTtcbiAgICB1cGxvYWREYXRhU3RyZWFtLm9uY2UoJ3JlYWRhYmxlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gZW5zdXJlIHRoZSBqb2IgaXMgb3BlbmVkIGluIHNlcnZlciBvciBqb2IgaWQgaXMgYWxyZWFkeSBhc3NpZ25lZFxuICAgICAgICBhd2FpdCB0aGlzLmpvYi5yZWFkeSgpO1xuICAgICAgICAvLyBwaXBlIHVwbG9hZCBkYXRhIHRvIGJhdGNoIEFQSSByZXF1ZXN0IHN0cmVhbVxuICAgICAgICB1cGxvYWREYXRhU3RyZWFtLnBpcGUodGhpcy5fY3JlYXRlUmVxdWVzdFN0cmVhbSgpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGR1cGxleCBkYXRhIHN0cmVhbSwgb3BlbmVkIGFjY2VzcyB0byBBUEkgcHJvZ3JhbW1lcnMgYnkgQmF0Y2gjc3RyZWFtKClcbiAgICB0aGlzLl9kYXRhU3RyZWFtID0gY29uY2F0U3RyZWFtc0FzRHVwbGV4KFxuICAgICAgdXBsb2FkRGF0YVN0cmVhbSxcbiAgICAgIGRvd25sb2FkRGF0YVN0cmVhbSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3QgYmF0Y2ggQVBJIGFuZCBjcmVhdGUgc3RyZWFtIGluc3RhbmNlIG9mIHJlcXVlc3QvcmVzcG9uc2VcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jcmVhdGVSZXF1ZXN0U3RyZWFtKCkge1xuICAgIGNvbnN0IGJ1bGsgPSB0aGlzLl9idWxrO1xuICAgIGNvbnN0IGxvZ2dlciA9IGJ1bGsuX2xvZ2dlcjtcbiAgICBjb25zdCByZXEgPSBidWxrLl9yZXF1ZXN0PEJhdGNoSW5mb1Jlc3BvbnNlPih7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHBhdGg6ICcvam9iLycgKyB0aGlzLmpvYi5pZCArICcvYmF0Y2gnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvY3N2JyxcbiAgICAgIH0sXG4gICAgICByZXNwb25zZVR5cGU6ICdhcHBsaWNhdGlvbi94bWwnLFxuICAgIH0pO1xuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCByZXE7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhyZXMuYmF0Y2hJbmZvKTtcbiAgICAgICAgdGhpcy5pZCA9IHJlcy5iYXRjaEluZm8uaWQ7XG4gICAgICAgIHRoaXMuZW1pdCgncXVldWUnLCByZXMuYmF0Y2hJbmZvKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KSgpO1xuICAgIHJldHVybiByZXEuc3RyZWFtKCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50YXRpb24gb2YgV3JpdGFibGVcbiAgICovXG4gIF93cml0ZShyZWNvcmRfOiBSZWNvcmQsIGVuYzogQnVmZmVyRW5jb2RpbmcsIGNiOiAoKSA9PiB2b2lkKSB7XG4gICAgY29uc3QgeyBJZCwgdHlwZSwgYXR0cmlidXRlcywgLi4ucnJlYyB9ID0gcmVjb3JkXztcbiAgICBsZXQgcmVjb3JkO1xuICAgIHN3aXRjaCAodGhpcy5qb2Iub3BlcmF0aW9uKSB7XG4gICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICByZWNvcmQgPSBycmVjO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICBjYXNlICdoYXJkRGVsZXRlJzpcbiAgICAgICAgcmVjb3JkID0geyBJZCB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlY29yZCA9IHsgSWQsIC4uLnJyZWMgfTtcbiAgICB9XG4gICAgdGhpcy5fdXBsb2FkU3RyZWFtLndyaXRlKHJlY29yZCwgZW5jLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBkdXBsZXggc3RyZWFtIHdoaWNoIGFjY2VwdHMgQ1NWIGRhdGEgaW5wdXQgYW5kIGJhdGNoIHJlc3VsdCBvdXRwdXRcbiAgICovXG4gIHN0cmVhbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVN0cmVhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIGJhdGNoIG9wZXJhdGlvblxuICAgKi9cbiAgZXhlY3V0ZShpbnB1dD86IHN0cmluZyB8IFJlY29yZFtdIHwgUmVhZGFibGUpIHtcbiAgICAvLyBpZiBiYXRjaCBpcyBhbHJlYWR5IGV4ZWN1dGVkXG4gICAgaWYgKHRoaXMuX3Jlc3VsdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXRjaCBhbHJlYWR5IGV4ZWN1dGVkLicpO1xuICAgIH1cblxuICAgIHRoaXMuX3Jlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMub25jZSgncmVzcG9uc2UnLCByZXNvbHZlKTtcbiAgICAgIHRoaXMub25jZSgnZXJyb3InLCByZWplY3QpO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzLm5vZGVTdHJlYW0oaW5wdXQpKSB7XG4gICAgICAvLyBpZiBpbnB1dCBoYXMgc3RyZWFtLlJlYWRhYmxlIGludGVyZmFjZVxuICAgICAgaW5wdXQucGlwZSh0aGlzLl9kYXRhU3RyZWFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVjb3JkRGF0YSA9IHN0cnVjdHVyZWRDbG9uZShpbnB1dCk7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlY29yZERhdGEpKSB7XG4gICAgICAgIGZvciAoY29uc3QgcmVjb3JkIG9mIHJlY29yZERhdGEpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZWNvcmQpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlY29yZFtrZXldID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgcmVjb3JkW2tleV0gPSBTdHJpbmcocmVjb3JkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLndyaXRlKHJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmQoKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlY29yZERhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2RhdGFTdHJlYW0ud3JpdGUocmVjb3JkRGF0YSwgJ3V0ZjgnKTtcbiAgICAgICAgdGhpcy5fZGF0YVN0cmVhbS5lbmQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm4gQmF0Y2ggaW5zdGFuY2UgZm9yIGNoYWluaW5nXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBydW4gPSB0aGlzLmV4ZWN1dGU7XG5cbiAgZXhlYyA9IHRoaXMuZXhlY3V0ZTtcblxuICAvKipcbiAgICogUHJvbWlzZS9BKyBpbnRlcmZhY2VcbiAgICogRGVsZWdhdGUgdG8gcHJvbWlzZSwgcmV0dXJuIHByb21pc2UgaW5zdGFuY2UgZm9yIGJhdGNoIHJlc3VsdFxuICAgKi9cbiAgdGhlbihcbiAgICBvblJlc29sdmVkOiAocmVzOiBCYXRjaFJlc3VsdDxPcHI+KSA9PiB2b2lkLFxuICAgIG9uUmVqZWN0OiAoZXJyOiBhbnkpID0+IHZvaWQsXG4gICkge1xuICAgIGlmICghdGhpcy5fcmVzdWx0KSB7XG4gICAgICB0aGlzLmV4ZWN1dGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdCEudGhlbihvblJlc29sdmVkLCBvblJlamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdGhlIGxhdGVzdCBiYXRjaCBzdGF0dXMgaW4gc2VydmVyXG4gICAqL1xuICBhc3luYyBjaGVjaygpIHtcbiAgICBjb25zdCBidWxrID0gdGhpcy5fYnVsaztcbiAgICBjb25zdCBsb2dnZXIgPSBidWxrLl9sb2dnZXI7XG4gICAgY29uc3Qgam9iSWQgPSB0aGlzLmpvYi5pZDtcbiAgICBjb25zdCBiYXRjaElkID0gdGhpcy5pZDtcblxuICAgIGlmICgham9iSWQgfHwgIWJhdGNoSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQmF0Y2ggbm90IHN0YXJ0ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGJ1bGsuX3JlcXVlc3Q8QmF0Y2hJbmZvUmVzcG9uc2U+KHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXRoOiAnL2pvYi8nICsgam9iSWQgKyAnL2JhdGNoLycgKyBiYXRjaElkLFxuICAgICAgcmVzcG9uc2VUeXBlOiAnYXBwbGljYXRpb24veG1sJyxcbiAgICB9KTtcbiAgICBsb2dnZXIuZGVidWcocmVzLmJhdGNoSW5mbyk7XG4gICAgcmV0dXJuIHJlcy5iYXRjaEluZm87XG4gIH1cblxuICAvKipcbiAgICogUG9sbGluZyB0aGUgYmF0Y2ggcmVzdWx0IGFuZCByZXRyaWV2ZVxuICAgKi9cbiAgcG9sbChpbnRlcnZhbDogbnVtYmVyLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICBjb25zdCBqb2JJZCA9IHRoaXMuam9iLmlkO1xuICAgIGNvbnN0IGJhdGNoSWQgPSB0aGlzLmlkO1xuXG4gICAgaWYgKCFqb2JJZCB8fCAhYmF0Y2hJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXRjaCBub3Qgc3RhcnRlZC4nKTtcbiAgICB9XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgY29uc3QgZW5kVGltZSA9IHN0YXJ0VGltZSArIHRpbWVvdXQ7XG5cbiAgICBpZiAodGltZW91dCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFBvbGxpbmdUaW1lb3V0RXJyb3IoXG4gICAgICAgIGBTa2lwcGluZyBwb2xsaW5nIGJlY2F1c2Ugb2YgdGltZW91dCA9IDBtcy4gSm9iIElkID0gJHtqb2JJZH0gfCBCYXRjaCBJZCA9ICR7YmF0Y2hJZH1gLFxuICAgICAgICBqb2JJZCxcbiAgICAgICAgYmF0Y2hJZCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcG9sbCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgaWYgKGVuZFRpbWUgPCBub3cpIHtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IFBvbGxpbmdUaW1lb3V0RXJyb3IoXG4gICAgICAgICAgJ1BvbGxpbmcgdGltZSBvdXQuIEpvYiBJZCA9ICcgKyBqb2JJZCArICcgLCBiYXRjaCBJZCA9ICcgKyBiYXRjaElkLFxuICAgICAgICAgIGpvYklkLFxuICAgICAgICAgIGJhdGNoSWQsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQgcmVzO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzID0gYXdhaXQgdGhpcy5jaGVjaygpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAocmVzLnN0YXRlID09PSAnRmFpbGVkJykge1xuICAgICAgICBpZiAocGFyc2VJbnQocmVzLm51bWJlclJlY29yZHNQcm9jZXNzZWQsIDEwKSA+IDApIHtcbiAgICAgICAgICB0aGlzLnJldHJpZXZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcihyZXMuc3RhdGVNZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXRlID09PSAnQ29tcGxldGVkJykge1xuICAgICAgICB0aGlzLnJldHJpZXZlKCk7XG4gICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0ZSA9PT0gJ05vdFByb2Nlc3NlZCcpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignSm9iIGhhcyBiZWVuIGFib3J0ZWQnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVtaXQoJ2luUHJvZ3Jlc3MnLCByZXMpO1xuICAgICAgICBzZXRUaW1lb3V0KHBvbGwsIGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHNldFRpbWVvdXQocG9sbCwgaW50ZXJ2YWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGJhdGNoIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgcmV0cmlldmUoKSB7XG4gICAgY29uc3QgYnVsayA9IHRoaXMuX2J1bGs7XG4gICAgY29uc3Qgam9iSWQgPSB0aGlzLmpvYi5pZDtcbiAgICBjb25zdCBqb2IgPSB0aGlzLmpvYjtcbiAgICBjb25zdCBiYXRjaElkID0gdGhpcy5pZDtcblxuICAgIGlmICgham9iSWQgfHwgIWJhdGNoSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQmF0Y2ggbm90IHN0YXJ0ZWQuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBidWxrLl9yZXF1ZXN0PFxuICAgICAgICBCdWxrSW5nZXN0UmVzdWx0UmVzcG9uc2UgfCBCdWxrUXVlcnlSZXN1bHRSZXNwb25zZVxuICAgICAgPih7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6ICcvam9iLycgKyBqb2JJZCArICcvYmF0Y2gvJyArIGJhdGNoSWQgKyAnL3Jlc3VsdCcsXG4gICAgICB9KTtcbiAgICAgIGxldCByZXN1bHRzOiBCdWxrSW5nZXN0QmF0Y2hSZXN1bHQgfCBCdWxrUXVlcnlCYXRjaFJlc3VsdDtcbiAgICAgIGlmIChqb2Iub3BlcmF0aW9uID09PSAncXVlcnknIHx8IGpvYi5vcGVyYXRpb24gPT09ICdxdWVyeUFsbCcpIHtcbiAgICAgICAgY29uc3QgcmVzID0gcmVzcCBhcyBCdWxrUXVlcnlSZXN1bHRSZXNwb25zZTtcbiAgICAgICAgY29uc3QgcmVzdWx0SWQgPSByZXNbJ3Jlc3VsdC1saXN0J10ucmVzdWx0O1xuICAgICAgICByZXN1bHRzID0gKEFycmF5LmlzQXJyYXkocmVzdWx0SWQpXG4gICAgICAgICAgPyByZXN1bHRJZFxuICAgICAgICAgIDogW3Jlc3VsdElkXVxuICAgICAgICApLm1hcCgoaWQpID0+ICh7IGlkLCBiYXRjaElkLCBqb2JJZCB9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXMgPSByZXNwIGFzIEJ1bGtJbmdlc3RSZXN1bHRSZXNwb25zZTtcbiAgICAgICAgcmVzdWx0cyA9IHJlcy5tYXAoKHJldCkgPT4gKHtcbiAgICAgICAgICBpZDogcmV0LklkIHx8IG51bGwsXG4gICAgICAgICAgc3VjY2VzczogcmV0LlN1Y2Nlc3MgPT09ICd0cnVlJyxcbiAgICAgICAgICBjcmVhdGVkOiByZXQuQ3JlYXRlZCA9PT0gJ3RydWUnLFxuICAgICAgICAgIGVycm9yczogcmV0LkVycm9yID8gW3JldC5FcnJvcl0gOiBbXSxcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5lbWl0KCdyZXNwb25zZScsIHJlc3VsdHMpO1xuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggcXVlcnkgYmF0Y2ggcmVzdWx0IGFzIGEgcmVjb3JkIHN0cmVhbVxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVzdWx0SWQgLSBSZXN1bHQgaWRcbiAgICogQHJldHVybnMge1JlY29yZFN0cmVhbX0gLSBSZWNvcmQgc3RyZWFtLCBjb252ZXJ0aWJsZSB0byBDU1YgZGF0YSBzdHJlYW1cbiAgICovXG4gIHB1YmxpYyByZXN1bHQocmVzdWx0SWQ6IHN0cmluZyk6IFBhcnNhYmxlPFJlY29yZD4ge1xuICAgIGNvbnN0IGpvYklkID0gdGhpcy5qb2IuaWQ7XG4gICAgY29uc3QgYmF0Y2hJZCA9IHRoaXMuaWQ7XG4gICAgaWYgKCFqb2JJZCB8fCAhYmF0Y2hJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXRjaCBub3Qgc3RhcnRlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0U3RyZWFtID0gbmV3IFBhcnNhYmxlKCk7XG4gICAgY29uc3QgcmVzdWx0RGF0YVN0cmVhbSA9IHJlc3VsdFN0cmVhbS5zdHJlYW0oJ2NzdicpO1xuICAgIHRoaXMuX2J1bGtcbiAgICAgIC5fcmVxdWVzdCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6ICcvam9iLycgKyBqb2JJZCArICcvYmF0Y2gvJyArIGJhdGNoSWQgKyAnL3Jlc3VsdC8nICsgcmVzdWx0SWQsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICAgICB9KVxuICAgICAgLnN0cmVhbSgpXG4gICAgICAucGlwZShyZXN1bHREYXRhU3RyZWFtKTtcbiAgICByZXR1cm4gcmVzdWx0U3RyZWFtO1xuICB9XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKlxuICovXG5jbGFzcyBCdWxrQXBpPFMgZXh0ZW5kcyBTY2hlbWE+IGV4dGVuZHMgSHR0cEFwaTxTPiB7XG4gIGJlZm9yZVNlbmQocmVxdWVzdDogSHR0cFJlcXVlc3QpIHtcbiAgICByZXF1ZXN0LmhlYWRlcnMgPSB7XG4gICAgICAuLi5yZXF1ZXN0LmhlYWRlcnMsXG4gICAgICAnWC1TRkRDLVNFU1NJT04nOiB0aGlzLl9jb25uLmFjY2Vzc1Rva2VuID8/ICcnLFxuICAgIH07XG4gIH1cblxuICBpc1Nlc3Npb25FeHBpcmVkKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gKFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAwICYmXG4gICAgICByZXNwb25zZS5ib2R5LmluY2x1ZGVzKCc8ZXhjZXB0aW9uQ29kZT5JbnZhbGlkU2Vzc2lvbklkPC9leGNlcHRpb25Db2RlPicpXG4gICAgKTtcbiAgfVxuXG4gIGhhc0Vycm9ySW5SZXNwb25zZUJvZHkoYm9keTogYW55KSB7XG4gICAgcmV0dXJuICEhYm9keS5lcnJvcjtcbiAgfVxuXG4gIHBhcnNlRXJyb3IoYm9keTogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yQ29kZTogYm9keS5lcnJvci5leGNlcHRpb25Db2RlLFxuICAgICAgbWVzc2FnZTogYm9keS5lcnJvci5leGNlcHRpb25NZXNzYWdlLFxuICAgIH07XG4gIH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogQ2xhc3MgZm9yIEJ1bGsgQVBJXG4gKlxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBCdWxrPFMgZXh0ZW5kcyBTY2hlbWE+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBfY29ubjogQ29ubmVjdGlvbjxTPjtcbiAgcHVibGljIHJlYWRvbmx5IF9sb2dnZXI6IExvZ2dlcjtcblxuICAvKipcbiAgICogUG9sbGluZyBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHNcbiAgICpcbiAgICogRGVmYXVsdDogMTAwMCAoMSBzZWNvbmQpXG4gICAqL1xuICBwdWJsaWMgcG9sbEludGVydmFsID0gMTAwMDtcblxuICAvKipcbiAgICogUG9sbGluZyB0aW1lb3V0IGluIG1pbGxpc2Vjb25kc1xuICAgKlxuICAgKiBEZWZhdWx0OiAzMDAwMCAoMzAgc2Vjb25kcylcbiAgICovXG4gIHB1YmxpYyBwb2xsVGltZW91dCA9IDMwMDAwO1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IoY29ubjogQ29ubmVjdGlvbjxTPikge1xuICAgIHRoaXMuX2Nvbm4gPSBjb25uO1xuICAgIHRoaXMuX2xvZ2dlciA9IGNvbm4uX2xvZ2dlcjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgcHVibGljIF9yZXF1ZXN0PFQ+KHJlcXVlc3RfOiBCdWxrUmVxdWVzdCkge1xuICAgIGNvbnN0IGNvbm4gPSB0aGlzLl9jb25uO1xuICAgIGNvbnN0IHsgcGF0aCwgcmVzcG9uc2VUeXBlLCAuLi5ycmVxIH0gPSByZXF1ZXN0XztcbiAgICBjb25zdCBiYXNlVXJsID0gW2Nvbm4uaW5zdGFuY2VVcmwsICdzZXJ2aWNlcy9hc3luYycsIGNvbm4udmVyc2lvbl0uam9pbihcbiAgICAgICcvJyxcbiAgICApO1xuICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICAuLi5ycmVxLFxuICAgICAgdXJsOiBiYXNlVXJsICsgcGF0aCxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgQnVsa0FwaSh0aGlzLl9jb25uLCB7IHJlc3BvbnNlVHlwZSB9KS5yZXF1ZXN0PFQ+KHJlcXVlc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbmQgc3RhcnQgYnVsa2xvYWQgam9iIGFuZCBiYXRjaFxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBhIEJhdGNoIGluc3RhbmNlICh3cml0YWJsZSBzdHJlYW0pXG4gICAqIHdoaWNoIHlvdSBjYW4gd3JpdGUgcmVjb3JkcyBpbnRvIGFzIGEgQ1NWIHN0cmluZy5cbiAgICpcbiAgICogQmF0Y2ggYWxzbyBpbXBsZW1lbnRzIHRoZSBhIHByb21pc2UgaW50ZXJmYWNlIHNvIHlvdSBjYW4gYGF3YWl0YCB0aGlzIG1ldGhvZCB0byBnZXQgdGhlIGpvYiByZXN1bHRzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBJbnNlcnQgYW4gYXJyYXkgb2YgcmVjb3JkcyBhbmQgZ2V0IHRoZSBqb2IgcmVzdWx0c1xuICAgKlxuICAgKiBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0aW9uLmJ1bGsubG9hZCgnQWNjb3VudCcsICdpbnNlcnQnLCBhY2NvdW50cylcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gSW5zZXJ0IHJlY29yZHMgZnJvbSBhIGNzdiBmaWxlIHVzaW5nIHRoZSByZXR1cm5lZCBiYXRjaCBzdHJlYW1cbiAgICpcbiAgICogY29uc3QgY3N2RmlsZSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oJ2FjY291bnRzLmNzdicpXG4gICAqXG4gICAqIGNvbnN0IGJhdGNoID0gY29ubi5idWxrLmxvYWQoJ0FjY291bnQnLCAnaW5zZXJ0JylcbiAgICogXG4gICAqIC8vIFRoZSBgcmVzcG9uc2VgIGV2ZW50IGlzIGVtaXR0ZWQgd2hlbiB0aGUgam9iIHJlc3VsdHMgYXJlIHJldHJpZXZlZFxuICAgKiBiYXRjaC5vbigncmVzcG9uc2UnLCByZXMgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKHJlcylcbiAgICogfSlcblxuICAgKiBjc3ZGaWxlLnBpcGUoYmF0Y2guc3RyZWFtKCkpXG4gICAqXG4gICAqXG4gICAqL1xuICBsb2FkPE9wciBleHRlbmRzIEJ1bGtPcGVyYXRpb24+KFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBvcGVyYXRpb246IE9wcixcbiAgICBpbnB1dD86IFJlY29yZFtdIHwgUmVhZGFibGUgfCBzdHJpbmcsXG4gICk6IEJhdGNoPFMsIE9wcj47XG4gIGxvYWQ8T3ByIGV4dGVuZHMgQnVsa09wZXJhdGlvbj4oXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIG9wZXJhdGlvbjogT3ByLFxuICAgIG9wdGlvbnNPcklucHV0PzogQnVsa09wdGlvbnMgfCBSZWNvcmRbXSB8IFJlYWRhYmxlIHwgc3RyaW5nLFxuICAgIGlucHV0PzogUmVjb3JkW10gfCBSZWFkYWJsZSB8IHN0cmluZyxcbiAgKTogQmF0Y2g8UywgT3ByPjtcbiAgbG9hZDxPcHIgZXh0ZW5kcyBCdWxrT3BlcmF0aW9uPihcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgb3BlcmF0aW9uOiBPcHIsXG4gICAgb3B0aW9uc09ySW5wdXQ/OiBCdWxrT3B0aW9ucyB8IFJlY29yZFtdIHwgUmVhZGFibGUgfCBzdHJpbmcsXG4gICAgaW5wdXQ/OiBSZWNvcmRbXSB8IFJlYWRhYmxlIHwgc3RyaW5nLFxuICApIHtcbiAgICBsZXQgb3B0aW9uczogQnVsa09wdGlvbnMgPSB7fTtcbiAgICBpZiAoXG4gICAgICB0eXBlb2Ygb3B0aW9uc09ySW5wdXQgPT09ICdzdHJpbmcnIHx8XG4gICAgICBBcnJheS5pc0FycmF5KG9wdGlvbnNPcklucHV0KSB8fFxuICAgICAgaXMubm9kZVN0cmVhbShvcHRpb25zT3JJbnB1dClcbiAgICApIHtcbiAgICAgIC8vIHdoZW4gb3B0aW9ucyBpcyBub3QgcGxhaW4gaGFzaCBvYmplY3QsIGl0IGlzIG9taXR0ZWRcbiAgICAgIGlucHV0ID0gb3B0aW9uc09ySW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zT3JJbnB1dCBhcyBCdWxrT3B0aW9ucztcbiAgICB9XG4gICAgY29uc3Qgam9iID0gdGhpcy5jcmVhdGVKb2IodHlwZSwgb3BlcmF0aW9uLCBvcHRpb25zKTtcbiAgICBjb25zdCBiYXRjaCA9IGpvYi5jcmVhdGVCYXRjaCgpO1xuICAgIGNvbnN0IGNsZWFudXAgPSAoKSA9PiBqb2IuY2xvc2UoKTtcbiAgICBjb25zdCBjbGVhbnVwT25FcnJvciA9IChlcnI6IEVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyLm5hbWUgIT09ICdQb2xsaW5nVGltZW91dCcpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgfVxuICAgIH07XG4gICAgYmF0Y2gub24oJ3Jlc3BvbnNlJywgY2xlYW51cCk7XG4gICAgYmF0Y2gub24oJ2Vycm9yJywgY2xlYW51cE9uRXJyb3IpO1xuICAgIGJhdGNoLm9uKCdxdWV1ZScsICgpID0+IHtcbiAgICAgIGJhdGNoPy5wb2xsKHRoaXMucG9sbEludGVydmFsLCB0aGlzLnBvbGxUaW1lb3V0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYmF0Y2guZXhlY3V0ZShpbnB1dCk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZSBidWxrIHF1ZXJ5IGFuZCBnZXQgcmVjb3JkIHN0cmVhbVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHF1ZXJ5KHNvcWw6IHN0cmluZyk6IFByb21pc2U8UGFyc2FibGU8UmVjb3JkPj4ge1xuICAgIGNvbnN0IG0gPSBzb3FsLnJlcGxhY2UoL1xcKFtcXHNcXFNdK1xcKS9nLCAnJykubWF0Y2goL0ZST01cXHMrKFxcdyspL2kpO1xuICAgIGlmICghbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnTm8gc29iamVjdCB0eXBlIGZvdW5kIGluIHF1ZXJ5LCBtYXliZSBjYXVzZWQgYnkgaW52YWxpZCBTT1FMLicsXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gbVsxXTtcbiAgICBjb25zdCByZWNvcmRTdHJlYW0gPSBuZXcgUGFyc2FibGUoKTtcbiAgICBjb25zdCBkYXRhU3RyZWFtID0gcmVjb3JkU3RyZWFtLnN0cmVhbSgnY3N2Jyk7XG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5sb2FkKHR5cGUsICdxdWVyeScsIHNvcWwpO1xuICAgIGNvbnN0IHN0cmVhbXMgPSByZXN1bHRzLm1hcCgocmVzdWx0KSA9PlxuICAgICAgdGhpcy5qb2IocmVzdWx0LmpvYklkKS5iYXRjaChyZXN1bHQuYmF0Y2hJZCkucmVzdWx0KHJlc3VsdC5pZCkuc3RyZWFtKCksXG4gICAgKTtcbiAgICBqb2luU3RyZWFtcyhzdHJlYW1zKS5waXBlKGRhdGFTdHJlYW0pO1xuXG4gICAgcmV0dXJuIHJlY29yZFN0cmVhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgam9iIGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlSm9iPE9wciBleHRlbmRzIEJ1bGtPcGVyYXRpb24+KFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBvcGVyYXRpb246IE9wcixcbiAgICBvcHRpb25zOiBCdWxrT3B0aW9ucyA9IHt9LFxuICApIHtcbiAgICByZXR1cm4gbmV3IEpvYih0aGlzLCB0eXBlLCBvcGVyYXRpb24sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGpvYiBpbnN0YW5jZSBzcGVjaWZpZWQgYnkgZ2l2ZW4gam9iIElEXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBqb2JJZCAtIEpvYiBJRFxuICAgKiBAcmV0dXJucyB7QnVsa35Kb2J9XG4gICAqL1xuICBwdWJsaWMgam9iPE9wciBleHRlbmRzIEJ1bGtPcGVyYXRpb24+KGpvYklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IEpvYjxTLCBPcHI+KHRoaXMsIG51bGwsIG51bGwsIG51bGwsIGpvYklkKTtcbiAgfVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4gKiBSZWdpc3RlciBob29rIGluIGNvbm5lY3Rpb24gaW5zdGFudGlhdGlvbiBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIHRoaXMgQVBJIG1vZHVsZSBmZWF0dXJlc1xuICovXG5yZWdpc3Rlck1vZHVsZSgnYnVsaycsIChjb25uKSA9PiBuZXcgQnVsayhjb25uKSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGs7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNBLFlBQVksUUFBUSxRQUFRO0FBQ3JDLFNBQTJCQyxRQUFRLFFBQVEsUUFBUTtBQUNuRCxPQUFPQyxXQUFXLE1BQU0sYUFBYTtBQUVyQyxTQUFTQyxZQUFZLEVBQUVDLFFBQVEsUUFBUSxrQkFB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