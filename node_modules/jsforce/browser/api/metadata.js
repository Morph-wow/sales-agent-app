import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _get from "@babel/runtime-corejs3/helpers/get";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
var _excluded = ["$"];
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context13, _context14; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context13 = ownKeys(Object(t), !0)).call(_context13, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context14 = ownKeys(Object(t))).call(_context14, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * @file Manages Salesforce Metadata API
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { EventEmitter } from 'events';
import { Readable } from 'stream';
import FormData from 'form-data';
import { registerModule } from '../jsforce';
import SOAP from '../soap';
import { isObject } from '../util/function';
import { ApiSchemas } from './metadata/schema';
export * from './metadata/schema';

/**
 *
 */

/**
 *
 */
function deallocateTypeWithMetadata(metadata) {
  var _ref = metadata,
    $ = _ref.$,
    md = _objectWithoutProperties(_ref, _excluded);
  return md;
}
function assignTypeWithMetadata(metadata, type) {
  var convert = function convert(md) {
    return _objectSpread(_defineProperty({}, '@xsi:type', type), md);
  };
  return _Array$isArray(metadata) ? _mapInstanceProperty(metadata).call(metadata, convert) : convert(metadata);
}

/**
 * Class for Salesforce Metadata API
 */
export var MetadataApi = /*#__PURE__*/function () {
  /**
   *
   */
  function MetadataApi(conn) {
    _classCallCheck(this, MetadataApi);
    /**
     * Polling interval in milliseconds
     */
    _defineProperty(this, "pollInterval", 1000);
    /**
     * Polling timeout in milliseconds
     */
    _defineProperty(this, "pollTimeout", 10000);
    this._conn = conn;
  }

  /**
   * Call Metadata API SOAP endpoint
   *
   * @private
   */
  return _createClass(MetadataApi, [{
    key: "_invoke",
    value: (function () {
      var _invoke2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(method, message, schema) {
        var _context;
        var soapEndpoint, res;
        return _regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              soapEndpoint = new SOAP(this._conn, {
                xmlns: 'http://soap.sforce.com/2006/04/metadata',
                endpointUrl: _concatInstanceProperty(_context = "".concat(this._conn.instanceUrl, "/services/Soap/m/")).call(_context, this._conn.version)
              });
              _context2.next = 3;
              return soapEndpoint.invoke(method, message, schema ? {
                result: schema
              } : undefined, ApiSchemas);
            case 3:
              res = _context2.sent;
              return _context2.abrupt("return", res.result);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee, this);
      }));
      function _invoke(_x, _x2, _x3) {
        return _invoke2.apply(this, arguments);
      }
      return _invoke;
    }()
    /**
     * Add one or more new metadata components to the organization.
     */
    )
  }, {
    key: "create",
    value: function create(type, metadata) {
      var isArray = _Array$isArray(metadata);
      metadata = assignTypeWithMetadata(metadata, type);
      var schema = isArray ? [ApiSchemas.SaveResult] : ApiSchemas.SaveResult;
      return this._invoke('createMetadata', {
        metadata: metadata
      }, schema);
    }

    /**
     * Read specified metadata components in the organization.
     */
  }, {
    key: "read",
    value: function () {
      var _read = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(type, fullNames) {
        var _context3;
        var ReadResultSchema, res;
        return _regeneratorRuntime.wrap(function _callee2$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              ReadResultSchema = type in ApiSchemas ? {
                type: ApiSchemas.ReadResult.type,
                props: {
                  records: [type]
                }
              } : ApiSchemas.ReadResult;
              _context4.next = 3;
              return this._invoke('readMetadata', {
                type: type,
                fullNames: fullNames
              }, ReadResultSchema);
            case 3:
              res = _context4.sent;
              return _context4.abrupt("return", _Array$isArray(fullNames) ? _mapInstanceProperty(_context3 = res.records).call(_context3, deallocateTypeWithMetadata) : deallocateTypeWithMetadata(res.records[0]));
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee2, this);
      }));
      function read(_x4, _x5) {
        return _read.apply(this, arguments);
      }
      return read;
    }()
    /**
     * Update one or more metadata components in the organization.
     */
  }, {
    key: "update",
    value: function update(type, metadata) {
      var isArray = _Array$isArray(metadata);
      metadata = assignTypeWithMetadata(metadata, type);
      var schema = isArray ? [ApiSchemas.SaveResult] : ApiSchemas.SaveResult;
      return this._invoke('updateMetadata', {
        metadata: metadata
      }, schema);
    }

    /**
     * Upsert one or more components in your organization's data.
     */
  }, {
    key: "upsert",
    value: function upsert(type, metadata) {
      var isArray = _Array$isArray(metadata);
      metadata = assignTypeWithMetadata(metadata, type);
      var schema = isArray ? [ApiSchemas.UpsertResult] : ApiSchemas.UpsertResult;
      return this._invoke('upsertMetadata', {
        metadata: metadata
      }, schema);
    }

    /**
     * Deletes specified metadata components in the organization.
     */
  }, {
    key: "delete",
    value: function _delete(type, fullNames) {
      var schema = _Array$isArray(fullNames) ? [ApiSchemas.SaveResult] : ApiSchemas.SaveResult;
      return this._invoke('deleteMetadata', {
        type: type,
        fullNames: fullNames
      }, schema);
    }

    /**
     * Rename fullname of a metadata component in the organization
     */
  }, {
    key: "rename",
    value: function rename(type, oldFullName, newFullName) {
      return this._invoke('renameMetadata', {
        type: type,
        oldFullName: oldFullName,
        newFullName: newFullName
      }, ApiSchemas.SaveResult);
    }

    /**
     * Retrieves the metadata which describes your organization, including Apex classes and triggers,
     * custom objects, custom fields on standard objects, tab sets that define an app,
     * and many other components.
     */
  }, {
    key: "describe",
    value: function describe(asOfVersion) {
      if (!asOfVersion) {
        asOfVersion = this._conn.version;
      }
      return this._invoke('describeMetadata', {
        asOfVersion: asOfVersion
      }, ApiSchemas.DescribeMetadataResult);
    }

    /**
     * Retrieves property information about metadata components in your organization
     */
  }, {
    key: "list",
    value: function list(queries, asOfVersion) {
      if (!asOfVersion) {
        asOfVersion = this._conn.version;
      }
      return this._invoke('listMetadata', {
        queries: queries,
        asOfVersion: asOfVersion
      }, [ApiSchemas.FileProperties]);
    }

    /**
     * Checks the status of asynchronous metadata calls
     */
  }, {
    key: "checkStatus",
    value: function checkStatus(asyncProcessId) {
      var res = this._invoke('checkStatus', {
        asyncProcessId: asyncProcessId
      }, ApiSchemas.AsyncResult);
      return new AsyncResultLocator(this, res);
    }

    /**
     * Retrieves XML file representations of components in an organization
     */
  }, {
    key: "retrieve",
    value: function retrieve(request) {
      var res = this._invoke('retrieve', {
        request: request
      }, ApiSchemas.RetrieveResult);
      return new RetrieveResultLocator(this, res);
    }

    /**
     * Checks the status of declarative metadata call retrieve() and returns the zip file contents
     */
  }, {
    key: "checkRetrieveStatus",
    value: function checkRetrieveStatus(asyncProcessId) {
      return this._invoke('checkRetrieveStatus', {
        asyncProcessId: asyncProcessId
      }, ApiSchemas.RetrieveResult);
    }

    /**
     * Will deploy a recently validated deploy request
     *
     * @param options.id = the deploy ID that's been validated already from a previous checkOnly deploy request
     * @param options.rest = a boolean whether or not to use the REST API
     * @returns the deploy ID of the recent validation request
     */
  }, {
    key: "deployRecentValidation",
    value: (function () {
      var _deployRecentValidation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(options) {
        var id, rest, response, messageBody, requestInfo, requestOptions;
        return _regeneratorRuntime.wrap(function _callee3$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              id = options.id, rest = options.rest;
              if (!rest) {
                _context5.next = 10;
                break;
              }
              messageBody = _JSON$stringify({
                validatedDeployRequestId: id
              });
              requestInfo = {
                method: 'POST',
                url: "".concat(this._conn._baseUrl(), "/metadata/deployRequest"),
                body: messageBody,
                headers: {
                  'content-type': 'application/json'
                }
              };
              requestOptions = {
                headers: 'json'
              }; // This is the deploy ID of the deployRecentValidation response, not
              // the already validated deploy ID (i.e., validateddeployrequestid).
              // REST returns an object with an id property, SOAP returns the id as a string directly.
              _context5.next = 7;
              return this._conn.request(requestInfo, requestOptions);
            case 7:
              response = _context5.sent.id;
              _context5.next = 13;
              break;
            case 10:
              _context5.next = 12;
              return this._invoke('deployRecentValidation', {
                validationId: id
              });
            case 12:
              response = _context5.sent;
            case 13:
              return _context5.abrupt("return", response);
            case 14:
            case "end":
              return _context5.stop();
          }
        }, _callee3, this);
      }));
      function deployRecentValidation(_x6) {
        return _deployRecentValidation.apply(this, arguments);
      }
      return deployRecentValidation;
    }()
    /**
     * Deploy components into an organization using zipped file representations
     * using the REST Metadata API instead of SOAP
     */
    )
  }, {
    key: "deployRest",
    value: function deployRest(zipInput) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var form = new FormData();
      form.append('file', zipInput, {
        contentType: 'application/zip',
        filename: 'package.xml'
      });

      // Add the deploy options
      form.append('entity_content', _JSON$stringify({
        deployOptions: options
      }), {
        contentType: 'application/json'
      });
      var request = {
        url: '/metadata/deployRequest',
        method: 'POST',
        headers: _objectSpread({}, form.getHeaders()),
        body: form.getBuffer()
      };
      var res = this._conn.request(request);
      return new DeployResultLocator(this, res);
    }

    /**
     * Deploy components into an organization using zipped file representations
     */
  }, {
    key: "deploy",
    value: function deploy(zipInput) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var res = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        var zipContentB64;
        return _regeneratorRuntime.wrap(function _callee4$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return new _Promise(function (resolve, reject) {
                if (isObject(zipInput) && 'pipe' in zipInput && typeof zipInput.pipe === 'function') {
                  var bufs = [];
                  zipInput.on('data', function (d) {
                    return bufs.push(d);
                  });
                  zipInput.on('error', reject);
                  zipInput.on('end', function () {
                    resolve(_concatInstanceProperty(Buffer).call(Buffer, bufs).toString('base64'));
                  });
                  // zipInput.resume();
                } else if (zipInput instanceof Buffer) {
                  resolve(zipInput.toString('base64'));
                } else if (zipInput instanceof String || typeof zipInput === 'string') {
                  resolve(zipInput);
                } else {
                  throw 'Unexpected zipInput type';
                }
              });
            case 2:
              zipContentB64 = _context6.sent;
              return _context6.abrupt("return", _this._invoke('deploy', {
                ZipFile: zipContentB64,
                DeployOptions: options
              }, ApiSchemas.DeployResult));
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee4);
      }))();
      return new DeployResultLocator(this, res);
    }

    /**
     * Checks the status of declarative metadata call deploy()
     */
  }, {
    key: "checkDeployStatus",
    value: function checkDeployStatus(asyncProcessId) {
      var includeDetails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this._invoke('checkDeployStatus', {
        asyncProcessId: asyncProcessId,
        includeDetails: includeDetails
      }, ApiSchemas.DeployResult);
    }
  }, {
    key: "cancelDeploy",
    value: function () {
      var _cancelDeploy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(id) {
        return _regeneratorRuntime.wrap(function _callee5$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", this._invoke('cancelDeploy', {
                id: id
              }));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee5, this);
      }));
      function cancelDeploy(_x7) {
        return _cancelDeploy.apply(this, arguments);
      }
      return cancelDeploy;
    }()
  }]);
}();

/*--------------------------------------------*/

/**
 * The locator class for Metadata API asynchronous call result
 */
export var AsyncResultLocator = /*#__PURE__*/function (_EventEmitter) {
  /**
   *
   */
  function AsyncResultLocator(meta, promise) {
    var _this2;
    _classCallCheck(this, AsyncResultLocator);
    _this2 = _callSuper(this, AsyncResultLocator);
    _this2._meta = meta;
    _this2._promise = promise;
    return _this2;
  }

  /**
   * Promise/A+ interface
   * http://promises-aplus.github.io/promises-spec/
   *
   * @method Metadata~AsyncResultLocator#then
   */
  _inherits(AsyncResultLocator, _EventEmitter);
  return _createClass(AsyncResultLocator, [{
    key: "then",
    value: function then(onResolve, onReject) {
      return this._promise.then(onResolve, onReject);
    }

    /**
     * Check the status of async request
     */
  }, {
    key: "check",
    value: (function () {
      var _check = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
        var result;
        return _regeneratorRuntime.wrap(function _callee6$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this._promise;
            case 2:
              result = _context8.sent;
              this._id = result.id;
              return _context8.abrupt("return", this._meta.checkStatus(result.id));
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee6, this);
      }));
      function check() {
        return _check.apply(this, arguments);
      }
      return check;
    }()
    /**
     * Polling until async call status becomes complete or error
     */
    )
  }, {
    key: "poll",
    value: function poll(interval, timeout) {
      var _this3 = this;
      var startTime = new Date().getTime();
      var poll = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
          var now, errMsg, result;
          return _regeneratorRuntime.wrap(function _callee7$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                now = new Date().getTime();
                if (!(startTime + timeout < now)) {
                  _context9.next = 7;
                  break;
                }
                errMsg = 'Polling time out.';
                if (_this3._id) {
                  errMsg += ' Process Id = ' + _this3._id;
                }
                _this3.emit('error', new Error(errMsg));
                return _context9.abrupt("return");
              case 7:
                _context9.next = 9;
                return _this3.check();
              case 9:
                result = _context9.sent;
                if (result.done) {
                  _this3.emit('complete', result);
                } else {
                  _this3.emit('progress', result);
                  _setTimeout(poll, interval);
                }
                _context9.next = 16;
                break;
              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9["catch"](0);
                _this3.emit('error', _context9.t0);
              case 16:
              case "end":
                return _context9.stop();
            }
          }, _callee7, null, [[0, 13]]);
        }));
        return function poll() {
          return _ref3.apply(this, arguments);
        };
      }();
      _setTimeout(poll, interval);
    }

    /**
     * Check and wait until the async requests become in completed status
     */
  }, {
    key: "complete",
    value: function complete() {
      var _this4 = this;
      return new _Promise(function (resolve, reject) {
        _this4.on('complete', resolve);
        _this4.on('error', reject);
        _this4.poll(_this4._meta.pollInterval, _this4._meta.pollTimeout);
      });
    }
  }]);
}(EventEmitter);

/*--------------------------------------------*/
/**
 * The locator class to track retreive() Metadata API call result
 */
export var RetrieveResultLocator = /*#__PURE__*/function (_AsyncResultLocator) {
  function RetrieveResultLocator() {
    _classCallCheck(this, RetrieveResultLocator);
    return _callSuper(this, RetrieveResultLocator, arguments);
  }
  _inherits(RetrieveResultLocator, _AsyncResultLocator);
  return _createClass(RetrieveResultLocator, [{
    key: "complete",
    value: (
    /**
     * Check and wait until the async request becomes in completed status,
     * and retrieve the result data.
     */
    function () {
      var _complete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
        var result;
        return _regeneratorRuntime.wrap(function _callee8$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _get(_getPrototypeOf(RetrieveResultLocator.prototype), "complete", this).call(this);
            case 2:
              result = _context10.sent;
              return _context10.abrupt("return", this._meta.checkRetrieveStatus(result.id));
            case 4:
            case "end":
              return _context10.stop();
          }
        }, _callee8, this);
      }));
      function complete() {
        return _complete.apply(this, arguments);
      }
      return complete;
    }()
    /**
     * Change the retrieved result to Node.js readable stream
     */
    )
  }, {
    key: "stream",
    value: function stream() {
      var _this5 = this;
      var resultStream = new Readable();
      var reading = false;
      resultStream._read = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
        var result;
        return _regeneratorRuntime.wrap(function _callee9$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              if (!reading) {
                _context11.next = 2;
                break;
              }
              return _context11.abrupt("return");
            case 2:
              reading = true;
              _context11.prev = 3;
              _context11.next = 6;
              return _this5.complete();
            case 6:
              result = _context11.sent;
              resultStream.push(Buffer.from(result.zipFile, 'base64'));
              resultStream.push(null);
              _context11.next = 14;
              break;
            case 11:
              _context11.prev = 11;
              _context11.t0 = _context11["catch"](3);
              resultStream.emit('error', _context11.t0);
            case 14:
            case "end":
              return _context11.stop();
          }
        }, _callee9, null, [[3, 11]]);
      }));
      return resultStream;
    }
  }]);
}(AsyncResultLocator);

/*--------------------------------------------*/
/**
 * The locator class to track deploy() Metadata API call result
 *
 * @protected
 * @class Metadata~DeployResultLocator
 * @extends Metadata~AsyncResultLocator
 * @param {Metadata} meta - Metadata API object
 * @param {Promise.<Metadata~AsyncResult>} result - Promise object for async result of deploy() call
 */
export var DeployResultLocator = /*#__PURE__*/function (_AsyncResultLocator2) {
  function DeployResultLocator() {
    _classCallCheck(this, DeployResultLocator);
    return _callSuper(this, DeployResultLocator, arguments);
  }
  _inherits(DeployResultLocator, _AsyncResultLocator2);
  return _createClass(DeployResultLocator, [{
    key: "complete",
    value: (
    /**
     * Check and wait until the async request becomes in completed status,
     * and retrieve the result data.
     */
    function () {
      var _complete2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(includeDetails) {
        var result;
        return _regeneratorRuntime.wrap(function _callee10$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _get(_getPrototypeOf(DeployResultLocator.prototype), "complete", this).call(this);
            case 2:
              result = _context12.sent;
              return _context12.abrupt("return", this._meta.checkDeployStatus(result.id, includeDetails));
            case 4:
            case "end":
              return _context12.stop();
          }
        }, _callee10, this);
      }));
      function complete(_x8) {
        return _complete2.apply(this, arguments);
      }
      return complete;
    }())
  }]);
}(AsyncResultLocator);

/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
registerModule('metadata', function (conn) {
  return new MetadataApi(conn);
});
export default MetadataApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJSZWFkYWJsZSIsIkZvcm1EYXRhIiwicmVnaXN0ZXJNb2R1bGUiLCJTT0FQIiwiaXNPYmplY3QiLCJBcGlTY2hlbWFzIiwiZGVhbGxvY2F0ZVR5cGVXaXRoTWV0YWRhdGEiLCJtZXRhZGF0YSIsIl9yZWYiLCIkIiwibWQiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfZXhjbHVkZWQiLCJhc3NpZ25UeXBlV2l0aE1ldGFkYXRhIiwidHlwZSIsImNvbnZlcnQiLCJfb2JqZWN0U3ByZWFkIiwiX2RlZmluZVByb3BlcnR5IiwiX0FycmF5JGlzQXJyYXkiLCJfbWFwSW5zdGFuY2VQcm9wZXJ0eSIsImNhbGwiLCJNZXRhZGF0YUFwaSIsImNvbm4iLCJfY2xhc3NDYWxsQ2hlY2siLCJfY29ubiIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiX2ludm9rZTIiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIm1ldGhvZCIsIm1lc3NhZ2UiLCJzY2hlbWEiLCJfY29udGV4dCIsInNvYXBFbmRwb2ludCIsInJlcyIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0MiIsInByZXYiLCJuZXh0IiwieG1sbnMiLCJlbmRwb2ludFVybCIsIl9jb25jYXRJbnN0YW5jZVByb3BlcnR5IiwiY29uY2F0IiwiaW5zdGFuY2VVcmwiLCJ2ZXJzaW9uIiwiaW52b2tlIiwicmVzdWx0IiwidW5kZWZpbmVkIiwic2VudCIsImFicnVwdCIsInN0b3AiLCJfaW52b2tlIiwiX3giLCJfeDIiLCJfeDMiLCJhcHBseSIsImFyZ3VtZW50cyIsImNyZWF0ZSIsImlzQXJyYXkiLCJTYXZlUmVzdWx0IiwiX3JlYWQiLCJfY2FsbGVlMiIsImZ1bGxOYW1lcyIsIl9jb250ZXh0MyIsIlJlYWRSZXN1bHRTY2hlbWEiLCJfY2FsbGVlMiQiLCJfY29udGV4dDQiLCJSZWFkUmVzdWx0IiwicHJvcHMiLCJyZWNvcmRzIiwicmVhZCIsIl94NCIsIl94NSIsInVwZGF0ZSIsInVwc2VydCIsIlVwc2VydFJlc3VsdCIsIl9kZWxldGUiLCJyZW5hbWUiLCJvbGRGdWxsTmFtZSIsIm5ld0Z1bGxOYW1lIiwiZGVzY3JpYmUiLCJhc09mVmVyc2lvbiIsIkRlc2NyaWJlTWV0YWRhdGFSZXN1bHQiLCJsaXN0IiwicXVlcmllcyIsIkZpbGVQcm9wZXJ0aWVzIiwiY2hlY2tTdGF0dXMiLCJhc3luY1Byb2Nlc3NJZCIsIkFzeW5jUmVzdWx0IiwiQXN5bmNSZXN1bHRMb2NhdG9yIiwicmV0cmlldmUiLCJyZXF1ZXN0IiwiUmV0cmlldmVSZXN1bHQiLCJSZXRyaWV2ZVJlc3VsdExvY2F0b3IiLCJjaGVja1JldHJpZXZlU3RhdHVzIiwiX2RlcGxveVJlY2VudFZhbGlkYXRpb24iLCJfY2FsbGVlMyIsIm9wdGlvbnMiLCJpZCIsInJlc3QiLCJyZXNwb25zZSIsIm1lc3NhZ2VCb2R5IiwicmVxdWVzdEluZm8iLCJyZXF1ZXN0T3B0aW9ucyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0NSIsIl9KU09OJHN0cmluZ2lmeSIsInZhbGlkYXRlZERlcGxveVJlcXVlc3RJZCIsInVybCIsIl9iYXNlVXJsIiwiYm9keSIsImhlYWRlcnMiLCJ2YWxpZGF0aW9uSWQiLCJkZXBsb3lSZWNlbnRWYWxpZGF0aW9uIiwiX3g2IiwiZGVwbG95UmVzdCIsInppcElucHV0IiwibGVuZ3RoIiwiZm9ybSIsImFwcGVuZCIsImNvbnRlbnRUeXBlIiwiZmlsZW5hbWUiLCJkZXBsb3lPcHRpb25zIiwiZ2V0SGVhZGVycyIsImdldEJ1ZmZlciIsIkRlcGxveVJlc3VsdExvY2F0b3IiLCJkZXBsb3kiLCJfdGhpcyIsIl9jYWxsZWU0IiwiemlwQ29udGVudEI2NCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NiIsIl9Qcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInBpcGUiLCJidWZzIiwib24iLCJkIiwicHVzaCIsIkJ1ZmZlciIsInRvU3RyaW5nIiwiU3RyaW5nIiwiWmlwRmlsZSIsIkRlcGxveU9wdGlvbnMiLCJEZXBsb3lSZXN1bHQiLCJjaGVja0RlcGxveVN0YXR1cyIsImluY2x1ZGVEZXRhaWxzIiwiX2NhbmNlbERlcGxveSIsIl9jYWxsZWU1IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ3IiwiY2FuY2VsRGVwbG95IiwiX3g3IiwiX0V2ZW50RW1pdHRlciIsIm1ldGEiLCJwcm9taXNlIiwiX3RoaXMyIiwiX2NhbGxTdXBlciIsIl9tZXRhIiwiX3Byb21pc2UiLCJfaW5oZXJpdHMiLCJ0aGVuIiwib25SZXNvbHZlIiwib25SZWplY3QiLCJfY2hlY2siLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0OCIsIl9pZCIsImNoZWNrIiwicG9sbCIsImludGVydmFsIiwidGltZW91dCIsIl90aGlzMyIsInN0YXJ0VGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiX3JlZjMiLCJfY2FsbGVlNyIsIm5vdyIsImVyck1zZyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0OSIsImVtaXQiLCJFcnJvciIsImRvbmUiLCJfc2V0VGltZW91dCIsInQwIiwiY29tcGxldGUiLCJfdGhpczQiLCJwb2xsSW50ZXJ2YWwiLCJwb2xsVGltZW91dCIsIl9Bc3luY1Jlc3VsdExvY2F0b3IiLCJfY29tcGxldGUiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0MTAiLCJfZ2V0IiwiX2dldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwic3RyZWFtIiwiX3RoaXM1IiwicmVzdWx0U3RyZWFtIiwicmVhZGluZyIsIl9jYWxsZWU5IiwiX2NhbGxlZTkkIiwiX2NvbnRleHQxMSIsImZyb20iLCJ6aXBGaWxlIiwiX0FzeW5jUmVzdWx0TG9jYXRvcjIiLCJfY29tcGxldGUyIiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTIiLCJfeDgiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL21ldGFkYXRhLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgTWFuYWdlcyBTYWxlc2ZvcmNlIE1ldGFkYXRhIEFQSVxuICogQGF1dGhvciBTaGluaWNoaSBUb21pdGEgPHNoaW5pY2hpLnRvbWl0YUBnbWFpbC5jb20+XG4gKi9cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IHJlZ2lzdGVyTW9kdWxlIH0gZnJvbSAnLi4vanNmb3JjZSc7XG5pbXBvcnQgQ29ubmVjdGlvbiBmcm9tICcuLi9jb25uZWN0aW9uJztcbmltcG9ydCBTT0FQIGZyb20gJy4uL3NvYXAnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi91dGlsL2Z1bmN0aW9uJztcbmltcG9ydCB7IFNjaGVtYSwgU29hcFNjaGVtYURlZiwgU29hcFNjaGVtYSwgSHR0cFJlcXVlc3QgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICBBcGlTY2hlbWFzLFxuICBNZXRhZGF0YSxcbiAgUmVhZFJlc3VsdCxcbiAgU2F2ZVJlc3VsdCxcbiAgVXBzZXJ0UmVzdWx0LFxuICBMaXN0TWV0YWRhdGFRdWVyeSxcbiAgRmlsZVByb3BlcnRpZXMsXG4gIERlc2NyaWJlTWV0YWRhdGFSZXN1bHQsXG4gIFJldHJpZXZlUmVxdWVzdCxcbiAgRGVwbG95T3B0aW9ucyxcbiAgUmV0cmlldmVSZXN1bHQsXG4gIERlcGxveVJlc3VsdCxcbiAgQXN5bmNSZXN1bHQsXG4gIEFwaVNjaGVtYVR5cGVzLCBDYW5jZWxEZXBsb3lSZXN1bHQsXG59IGZyb20gJy4vbWV0YWRhdGEvc2NoZW1hJztcbmV4cG9ydCAqIGZyb20gJy4vbWV0YWRhdGEvc2NoZW1hJztcblxuLyoqXG4gKlxuICovXG50eXBlIE1ldGFkYXRhVHlwZV88XG4gIEsgZXh0ZW5kcyBrZXlvZiBBcGlTY2hlbWFUeXBlcyA9IGtleW9mIEFwaVNjaGVtYVR5cGVzXG4+ID0gSyBleHRlbmRzIGtleW9mIEFwaVNjaGVtYVR5cGVzXG4gID8gQXBpU2NoZW1hVHlwZXNbS10gZXh0ZW5kcyBNZXRhZGF0YVxuICAgID8gS1xuICAgIDogbmV2ZXJcbiAgOiBuZXZlcjtcblxuZXhwb3J0IHR5cGUgTWV0YWRhdGFUeXBlID0gTWV0YWRhdGFUeXBlXztcblxuZXhwb3J0IHR5cGUgTWV0YWRhdGFEZWZpbml0aW9uPFxuICBUIGV4dGVuZHMgc3RyaW5nLFxuICBNIGV4dGVuZHMgTWV0YWRhdGEgPSBNZXRhZGF0YVxuPiA9IE1ldGFkYXRhIGV4dGVuZHMgTVxuICA/IFQgZXh0ZW5kcyBrZXlvZiBBcGlTY2hlbWFUeXBlcyAmIE1ldGFkYXRhVHlwZVxuICAgID8gQXBpU2NoZW1hVHlwZXNbVF0gZXh0ZW5kcyBNZXRhZGF0YVxuICAgICAgPyBBcGlTY2hlbWFUeXBlc1tUXVxuICAgICAgOiBNZXRhZGF0YVxuICAgIDogTWV0YWRhdGFcbiAgOiBNO1xuXG50eXBlIERlZXBQYXJ0aWFsPFQ+ID0gVCBleHRlbmRzIGFueVtdXG4gID8gQXJyYXk8RGVlcFBhcnRpYWw8VFtudW1iZXJdPj5cbiAgOiBUIGV4dGVuZHMgb2JqZWN0XG4gID8geyBbSyBpbiBrZXlvZiBUXT86IERlZXBQYXJ0aWFsPFRbS10+IH1cbiAgOiBUO1xuXG5leHBvcnQgdHlwZSBJbnB1dE1ldGFkYXRhRGVmaW5pdGlvbjxcbiAgVCBleHRlbmRzIHN0cmluZyxcbiAgTSBleHRlbmRzIE1ldGFkYXRhID0gTWV0YWRhdGFcbj4gPSBEZWVwUGFydGlhbDxNZXRhZGF0YURlZmluaXRpb248VCwgTT4+O1xuXG4vKipcbiAqXG4gKi9cbmZ1bmN0aW9uIGRlYWxsb2NhdGVUeXBlV2l0aE1ldGFkYXRhPE0gZXh0ZW5kcyBNZXRhZGF0YT4obWV0YWRhdGE6IE0pOiBNIHtcbiAgY29uc3QgeyAkLCAuLi5tZCB9ID0gbWV0YWRhdGEgYXMgYW55O1xuICByZXR1cm4gbWQ7XG59XG5cbmZ1bmN0aW9uIGFzc2lnblR5cGVXaXRoTWV0YWRhdGEobWV0YWRhdGE6IE1ldGFkYXRhIHwgTWV0YWRhdGFbXSwgdHlwZTogc3RyaW5nKSB7XG4gIGNvbnN0IGNvbnZlcnQgPSAobWQ6IE1ldGFkYXRhKSA9PiAoeyBbJ0B4c2k6dHlwZSddOiB0eXBlLCAuLi5tZCB9KTtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkobWV0YWRhdGEpID8gbWV0YWRhdGEubWFwKGNvbnZlcnQpIDogY29udmVydChtZXRhZGF0YSk7XG59XG5cbi8qKlxuICogQ2xhc3MgZm9yIFNhbGVzZm9yY2UgTWV0YWRhdGEgQVBJXG4gKi9cbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUFwaTxTIGV4dGVuZHMgU2NoZW1hPiB7XG4gIF9jb25uOiBDb25uZWN0aW9uPFM+O1xuXG4gIC8qKlxuICAgKiBQb2xsaW5nIGludGVydmFsIGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgcG9sbEludGVydmFsOiBudW1iZXIgPSAxMDAwO1xuXG4gIC8qKlxuICAgKiBQb2xsaW5nIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXG4gICAqL1xuICBwb2xsVGltZW91dDogbnVtYmVyID0gMTAwMDA7XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25uOiBDb25uZWN0aW9uPFM+KSB7XG4gICAgdGhpcy5fY29ubiA9IGNvbm47XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCBNZXRhZGF0YSBBUEkgU09BUCBlbmRwb2ludFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXN5bmMgX2ludm9rZShcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBvYmplY3QsXG4gICAgc2NoZW1hPzogU29hcFNjaGVtYSB8IFNvYXBTY2hlbWFEZWYsXG4gICkge1xuICAgIGNvbnN0IHNvYXBFbmRwb2ludCA9IG5ldyBTT0FQKHRoaXMuX2Nvbm4sIHtcbiAgICAgIHhtbG5zOiAnaHR0cDovL3NvYXAuc2ZvcmNlLmNvbS8yMDA2LzA0L21ldGFkYXRhJyxcbiAgICAgIGVuZHBvaW50VXJsOiBgJHt0aGlzLl9jb25uLmluc3RhbmNlVXJsfS9zZXJ2aWNlcy9Tb2FwL20vJHt0aGlzLl9jb25uLnZlcnNpb259YCxcbiAgICB9KTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBzb2FwRW5kcG9pbnQuaW52b2tlKFxuICAgICAgbWV0aG9kLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHNjaGVtYSA/ICh7IHJlc3VsdDogc2NoZW1hIH0gYXMgU29hcFNjaGVtYSkgOiB1bmRlZmluZWQsXG4gICAgICBBcGlTY2hlbWFzLFxuICAgICk7XG4gICAgcmV0dXJuIHJlcy5yZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG9uZSBvciBtb3JlIG5ldyBtZXRhZGF0YSBjb21wb25lbnRzIHRvIHRoZSBvcmdhbml6YXRpb24uXG4gICAqL1xuICBjcmVhdGU8XG4gICAgTSBleHRlbmRzIE1ldGFkYXRhID0gTWV0YWRhdGEsXG4gICAgVCBleHRlbmRzIE1ldGFkYXRhVHlwZSA9IE1ldGFkYXRhVHlwZSxcbiAgICBNRCBleHRlbmRzIElucHV0TWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+ID0gSW5wdXRNZXRhZGF0YURlZmluaXRpb248VCwgTT5cbiAgPih0eXBlOiBULCBtZXRhZGF0YTogTURbXSk6IFByb21pc2U8U2F2ZVJlc3VsdFtdPjtcbiAgY3JlYXRlPFxuICAgIE0gZXh0ZW5kcyBNZXRhZGF0YSA9IE1ldGFkYXRhLFxuICAgIFQgZXh0ZW5kcyBNZXRhZGF0YVR5cGUgPSBNZXRhZGF0YVR5cGUsXG4gICAgTUQgZXh0ZW5kcyBJbnB1dE1ldGFkYXRhRGVmaW5pdGlvbjxULCBNPiA9IElucHV0TWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+XG4gID4odHlwZTogVCwgbWV0YWRhdGE6IE1EKTogUHJvbWlzZTxTYXZlUmVzdWx0PjtcbiAgY3JlYXRlPFxuICAgIE0gZXh0ZW5kcyBNZXRhZGF0YSA9IE1ldGFkYXRhLFxuICAgIFQgZXh0ZW5kcyBNZXRhZGF0YVR5cGUgPSBNZXRhZGF0YVR5cGUsXG4gICAgTUQgZXh0ZW5kcyBJbnB1dE1ldGFkYXRhRGVmaW5pdGlvbjxULCBNPiA9IElucHV0TWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+XG4gID4odHlwZTogVCwgbWV0YWRhdGE6IE1EIHwgTURbXSk6IFByb21pc2U8U2F2ZVJlc3VsdCB8IFNhdmVSZXN1bHRbXT47XG4gIGNyZWF0ZSh0eXBlOiBzdHJpbmcsIG1ldGFkYXRhOiBNZXRhZGF0YSB8IE1ldGFkYXRhW10pIHtcbiAgICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShtZXRhZGF0YSk7XG4gICAgbWV0YWRhdGEgPSBhc3NpZ25UeXBlV2l0aE1ldGFkYXRhKG1ldGFkYXRhLCB0eXBlKTtcbiAgICBjb25zdCBzY2hlbWEgPSBpc0FycmF5ID8gW0FwaVNjaGVtYXMuU2F2ZVJlc3VsdF0gOiBBcGlTY2hlbWFzLlNhdmVSZXN1bHQ7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZSgnY3JlYXRlTWV0YWRhdGEnLCB7IG1ldGFkYXRhIH0sIHNjaGVtYSk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZCBzcGVjaWZpZWQgbWV0YWRhdGEgY29tcG9uZW50cyBpbiB0aGUgb3JnYW5pemF0aW9uLlxuICAgKi9cbiAgcmVhZDxcbiAgICBNIGV4dGVuZHMgTWV0YWRhdGEgPSBNZXRhZGF0YSxcbiAgICBUIGV4dGVuZHMgTWV0YWRhdGFUeXBlID0gTWV0YWRhdGFUeXBlLFxuICAgIE1EIGV4dGVuZHMgTWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+ID0gTWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+XG4gID4odHlwZTogVCwgZnVsbE5hbWVzOiBzdHJpbmdbXSk6IFByb21pc2U8TURbXT47XG4gIHJlYWQ8XG4gICAgTSBleHRlbmRzIE1ldGFkYXRhID0gTWV0YWRhdGEsXG4gICAgVCBleHRlbmRzIE1ldGFkYXRhVHlwZSA9IE1ldGFkYXRhVHlwZSxcbiAgICBNRCBleHRlbmRzIE1ldGFkYXRhRGVmaW5pdGlvbjxULCBNPiA9IE1ldGFkYXRhRGVmaW5pdGlvbjxULCBNPlxuICA+KHR5cGU6IFQsIGZ1bGxOYW1lczogc3RyaW5nKTogUHJvbWlzZTxNRD47XG4gIHJlYWQ8XG4gICAgTSBleHRlbmRzIE1ldGFkYXRhID0gTWV0YWRhdGEsXG4gICAgVCBleHRlbmRzIE1ldGFkYXRhVHlwZSA9IE1ldGFkYXRhVHlwZSxcbiAgICBNRCBleHRlbmRzIE1ldGFkYXRhRGVmaW5pdGlvbjxULCBNPiA9IE1ldGFkYXRhRGVmaW5pdGlvbjxULCBNPlxuICA+KHR5cGU6IFQsIGZ1bGxOYW1lczogc3RyaW5nIHwgc3RyaW5nW10pOiBQcm9taXNlPE1EIHwgTURbXT47XG4gIGFzeW5jIHJlYWQodHlwZTogc3RyaW5nLCBmdWxsTmFtZXM6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgUmVhZFJlc3VsdFNjaGVtYSA9XG4gICAgICB0eXBlIGluIEFwaVNjaGVtYXNcbiAgICAgICAgPyAoe1xuICAgICAgICAgICAgdHlwZTogQXBpU2NoZW1hcy5SZWFkUmVzdWx0LnR5cGUsXG4gICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICByZWNvcmRzOiBbdHlwZV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0gYXMgY29uc3QpXG4gICAgICAgIDogQXBpU2NoZW1hcy5SZWFkUmVzdWx0O1xuICAgIGNvbnN0IHJlczogUmVhZFJlc3VsdCA9IGF3YWl0IHRoaXMuX2ludm9rZShcbiAgICAgICdyZWFkTWV0YWRhdGEnLFxuICAgICAgeyB0eXBlLCBmdWxsTmFtZXMgfSxcbiAgICAgIFJlYWRSZXN1bHRTY2hlbWEsXG4gICAgKTtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShmdWxsTmFtZXMpXG4gICAgICA/IHJlcy5yZWNvcmRzLm1hcChkZWFsbG9jYXRlVHlwZVdpdGhNZXRhZGF0YSlcbiAgICAgIDogZGVhbGxvY2F0ZVR5cGVXaXRoTWV0YWRhdGEocmVzLnJlY29yZHNbMF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBvbmUgb3IgbW9yZSBtZXRhZGF0YSBjb21wb25lbnRzIGluIHRoZSBvcmdhbml6YXRpb24uXG4gICAqL1xuICB1cGRhdGU8XG4gICAgTSBleHRlbmRzIE1ldGFkYXRhID0gTWV0YWRhdGEsXG4gICAgVCBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgICBNRCBleHRlbmRzIElucHV0TWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+ID0gSW5wdXRNZXRhZGF0YURlZmluaXRpb248VCwgTT5cbiAgPih0eXBlOiBULCBtZXRhZGF0YTogQXJyYXk8UGFydGlhbDxNRD4+KTogUHJvbWlzZTxTYXZlUmVzdWx0W10+O1xuICB1cGRhdGU8XG4gICAgTSBleHRlbmRzIE1ldGFkYXRhID0gTWV0YWRhdGEsXG4gICAgVCBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgICBNRCBleHRlbmRzIElucHV0TWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+ID0gSW5wdXRNZXRhZGF0YURlZmluaXRpb248VCwgTT5cbiAgPih0eXBlOiBULCBtZXRhZGF0YTogUGFydGlhbDxNRD4pOiBQcm9taXNlPFNhdmVSZXN1bHQ+O1xuICB1cGRhdGU8XG4gICAgTSBleHRlbmRzIE1ldGFkYXRhID0gTWV0YWRhdGEsXG4gICAgVCBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgICBNRCBleHRlbmRzIElucHV0TWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+ID0gSW5wdXRNZXRhZGF0YURlZmluaXRpb248VCwgTT5cbiAgPihcbiAgICB0eXBlOiBULFxuICAgIG1ldGFkYXRhOiBQYXJ0aWFsPE1EPiB8IEFycmF5PFBhcnRpYWw8TUQ+PixcbiAgKTogUHJvbWlzZTxTYXZlUmVzdWx0IHwgU2F2ZVJlc3VsdFtdPjtcbiAgdXBkYXRlKHR5cGU6IHN0cmluZywgbWV0YWRhdGE6IE1ldGFkYXRhIHwgTWV0YWRhdGFbXSkge1xuICAgIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KG1ldGFkYXRhKTtcbiAgICBtZXRhZGF0YSA9IGFzc2lnblR5cGVXaXRoTWV0YWRhdGEobWV0YWRhdGEsIHR5cGUpO1xuICAgIGNvbnN0IHNjaGVtYSA9IGlzQXJyYXkgPyBbQXBpU2NoZW1hcy5TYXZlUmVzdWx0XSA6IEFwaVNjaGVtYXMuU2F2ZVJlc3VsdDtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKCd1cGRhdGVNZXRhZGF0YScsIHsgbWV0YWRhdGEgfSwgc2NoZW1hKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcHNlcnQgb25lIG9yIG1vcmUgY29tcG9uZW50cyBpbiB5b3VyIG9yZ2FuaXphdGlvbidzIGRhdGEuXG4gICAqL1xuICB1cHNlcnQ8XG4gICAgTSBleHRlbmRzIE1ldGFkYXRhID0gTWV0YWRhdGEsXG4gICAgVCBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgICBNRCBleHRlbmRzIElucHV0TWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+ID0gSW5wdXRNZXRhZGF0YURlZmluaXRpb248VCwgTT5cbiAgPih0eXBlOiBULCBtZXRhZGF0YTogTURbXSk6IFByb21pc2U8VXBzZXJ0UmVzdWx0W10+O1xuICB1cHNlcnQ8XG4gICAgTSBleHRlbmRzIE1ldGFkYXRhID0gTWV0YWRhdGEsXG4gICAgVCBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgICBNRCBleHRlbmRzIElucHV0TWV0YWRhdGFEZWZpbml0aW9uPFQsIE0+ID0gSW5wdXRNZXRhZGF0YURlZmluaXRpb248VCwgTT5cbiAgPih0eXBlOiBULCBtZXRhZGF0YTogTUQpOiBQcm9taXNlPFVwc2VydFJlc3VsdD47XG4gIHVwc2VydDxcbiAgICBNIGV4dGVuZHMgTWV0YWRhdGEgPSBNZXRhZGF0YSxcbiAgICBUIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICAgIE1EIGV4dGVuZHMgSW5wdXRNZXRhZGF0YURlZmluaXRpb248VCwgTT4gPSBJbnB1dE1ldGFkYXRhRGVmaW5pdGlvbjxULCBNPlxuICA+KHR5cGU6IFQsIG1ldGFkYXRhOiBNRCB8IE1EW10pOiBQcm9taXNlPFVwc2VydFJlc3VsdCB8IFVwc2VydFJlc3VsdFtdPjtcbiAgdXBzZXJ0KHR5cGU6IHN0cmluZywgbWV0YWRhdGE6IE1ldGFkYXRhIHwgTWV0YWRhdGFbXSkge1xuICAgIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KG1ldGFkYXRhKTtcbiAgICBtZXRhZGF0YSA9IGFzc2lnblR5cGVXaXRoTWV0YWRhdGEobWV0YWRhdGEsIHR5cGUpO1xuICAgIGNvbnN0IHNjaGVtYSA9IGlzQXJyYXlcbiAgICAgID8gW0FwaVNjaGVtYXMuVXBzZXJ0UmVzdWx0XVxuICAgICAgOiBBcGlTY2hlbWFzLlVwc2VydFJlc3VsdDtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKCd1cHNlcnRNZXRhZGF0YScsIHsgbWV0YWRhdGEgfSwgc2NoZW1hKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIHNwZWNpZmllZCBtZXRhZGF0YSBjb21wb25lbnRzIGluIHRoZSBvcmdhbml6YXRpb24uXG4gICAqL1xuICBkZWxldGUodHlwZTogc3RyaW5nLCBmdWxsTmFtZXM6IHN0cmluZ1tdKTogUHJvbWlzZTxTYXZlUmVzdWx0W10+O1xuICBkZWxldGUodHlwZTogc3RyaW5nLCBmdWxsTmFtZXM6IHN0cmluZyk6IFByb21pc2U8U2F2ZVJlc3VsdD47XG4gIGRlbGV0ZShcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZnVsbE5hbWVzOiBzdHJpbmcgfCBzdHJpbmdbXSxcbiAgKTogUHJvbWlzZTxTYXZlUmVzdWx0IHwgU2F2ZVJlc3VsdFtdPjtcbiAgZGVsZXRlKHR5cGU6IHN0cmluZywgZnVsbE5hbWVzOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgIGNvbnN0IHNjaGVtYSA9IEFycmF5LmlzQXJyYXkoZnVsbE5hbWVzKVxuICAgICAgPyBbQXBpU2NoZW1hcy5TYXZlUmVzdWx0XVxuICAgICAgOiBBcGlTY2hlbWFzLlNhdmVSZXN1bHQ7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZSgnZGVsZXRlTWV0YWRhdGEnLCB7IHR5cGUsIGZ1bGxOYW1lcyB9LCBzY2hlbWEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmFtZSBmdWxsbmFtZSBvZiBhIG1ldGFkYXRhIGNvbXBvbmVudCBpbiB0aGUgb3JnYW5pemF0aW9uXG4gICAqL1xuICByZW5hbWUoXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIG9sZEZ1bGxOYW1lOiBzdHJpbmcsXG4gICAgbmV3RnVsbE5hbWU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxTYXZlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcbiAgICAgICdyZW5hbWVNZXRhZGF0YScsXG4gICAgICB7IHR5cGUsIG9sZEZ1bGxOYW1lLCBuZXdGdWxsTmFtZSB9LFxuICAgICAgQXBpU2NoZW1hcy5TYXZlUmVzdWx0LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBtZXRhZGF0YSB3aGljaCBkZXNjcmliZXMgeW91ciBvcmdhbml6YXRpb24sIGluY2x1ZGluZyBBcGV4IGNsYXNzZXMgYW5kIHRyaWdnZXJzLFxuICAgKiBjdXN0b20gb2JqZWN0cywgY3VzdG9tIGZpZWxkcyBvbiBzdGFuZGFyZCBvYmplY3RzLCB0YWIgc2V0cyB0aGF0IGRlZmluZSBhbiBhcHAsXG4gICAqIGFuZCBtYW55IG90aGVyIGNvbXBvbmVudHMuXG4gICAqL1xuICBkZXNjcmliZShhc09mVmVyc2lvbj86IHN0cmluZyk6IFByb21pc2U8RGVzY3JpYmVNZXRhZGF0YVJlc3VsdD4ge1xuICAgIGlmICghYXNPZlZlcnNpb24pIHtcbiAgICAgIGFzT2ZWZXJzaW9uID0gdGhpcy5fY29ubi52ZXJzaW9uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faW52b2tlKFxuICAgICAgJ2Rlc2NyaWJlTWV0YWRhdGEnLFxuICAgICAgeyBhc09mVmVyc2lvbiB9LFxuICAgICAgQXBpU2NoZW1hcy5EZXNjcmliZU1ldGFkYXRhUmVzdWx0LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHByb3BlcnR5IGluZm9ybWF0aW9uIGFib3V0IG1ldGFkYXRhIGNvbXBvbmVudHMgaW4geW91ciBvcmdhbml6YXRpb25cbiAgICovXG4gIGxpc3QoXG4gICAgcXVlcmllczogTGlzdE1ldGFkYXRhUXVlcnkgfCBMaXN0TWV0YWRhdGFRdWVyeVtdLFxuICAgIGFzT2ZWZXJzaW9uPzogc3RyaW5nLFxuICApOiBQcm9taXNlPEZpbGVQcm9wZXJ0aWVzW10+IHtcbiAgICBpZiAoIWFzT2ZWZXJzaW9uKSB7XG4gICAgICBhc09mVmVyc2lvbiA9IHRoaXMuX2Nvbm4udmVyc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZSgnbGlzdE1ldGFkYXRhJywgeyBxdWVyaWVzLCBhc09mVmVyc2lvbiB9LCBbXG4gICAgICBBcGlTY2hlbWFzLkZpbGVQcm9wZXJ0aWVzLFxuICAgIF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgc3RhdHVzIG9mIGFzeW5jaHJvbm91cyBtZXRhZGF0YSBjYWxsc1xuICAgKi9cbiAgY2hlY2tTdGF0dXMoYXN5bmNQcm9jZXNzSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMuX2ludm9rZShcbiAgICAgICdjaGVja1N0YXR1cycsXG4gICAgICB7IGFzeW5jUHJvY2Vzc0lkIH0sXG4gICAgICBBcGlTY2hlbWFzLkFzeW5jUmVzdWx0LFxuICAgICk7XG4gICAgcmV0dXJuIG5ldyBBc3luY1Jlc3VsdExvY2F0b3IodGhpcywgcmVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgWE1MIGZpbGUgcmVwcmVzZW50YXRpb25zIG9mIGNvbXBvbmVudHMgaW4gYW4gb3JnYW5pemF0aW9uXG4gICAqL1xuICByZXRyaWV2ZShyZXF1ZXN0OiBQYXJ0aWFsPFJldHJpZXZlUmVxdWVzdD4pIHtcbiAgICBjb25zdCByZXMgPSB0aGlzLl9pbnZva2UoXG4gICAgICAncmV0cmlldmUnLFxuICAgICAgeyByZXF1ZXN0IH0sXG4gICAgICBBcGlTY2hlbWFzLlJldHJpZXZlUmVzdWx0LFxuICAgICk7XG4gICAgcmV0dXJuIG5ldyBSZXRyaWV2ZVJlc3VsdExvY2F0b3IodGhpcywgcmVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIHN0YXR1cyBvZiBkZWNsYXJhdGl2ZSBtZXRhZGF0YSBjYWxsIHJldHJpZXZlKCkgYW5kIHJldHVybnMgdGhlIHppcCBmaWxlIGNvbnRlbnRzXG4gICAqL1xuICBjaGVja1JldHJpZXZlU3RhdHVzKGFzeW5jUHJvY2Vzc0lkOiBzdHJpbmcpOiBQcm9taXNlPFJldHJpZXZlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcbiAgICAgICdjaGVja1JldHJpZXZlU3RhdHVzJyxcbiAgICAgIHsgYXN5bmNQcm9jZXNzSWQgfSxcbiAgICAgIEFwaVNjaGVtYXMuUmV0cmlldmVSZXN1bHQsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaWxsIGRlcGxveSBhIHJlY2VudGx5IHZhbGlkYXRlZCBkZXBsb3kgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucy5pZCA9IHRoZSBkZXBsb3kgSUQgdGhhdCdzIGJlZW4gdmFsaWRhdGVkIGFscmVhZHkgZnJvbSBhIHByZXZpb3VzIGNoZWNrT25seSBkZXBsb3kgcmVxdWVzdFxuICAgKiBAcGFyYW0gb3B0aW9ucy5yZXN0ID0gYSBib29sZWFuIHdoZXRoZXIgb3Igbm90IHRvIHVzZSB0aGUgUkVTVCBBUElcbiAgICogQHJldHVybnMgdGhlIGRlcGxveSBJRCBvZiB0aGUgcmVjZW50IHZhbGlkYXRpb24gcmVxdWVzdFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlcGxveVJlY2VudFZhbGlkYXRpb24ob3B0aW9uczoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcmVzdD86IGJvb2xlYW47XG4gIH0pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHsgaWQsIHJlc3QgfSA9IG9wdGlvbnM7XG4gICAgbGV0IHJlc3BvbnNlOiBzdHJpbmc7XG4gICAgaWYgKHJlc3QpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VCb2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB2YWxpZGF0ZWREZXBsb3lSZXF1ZXN0SWQ6IGlkLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlcXVlc3RJbmZvOiBIdHRwUmVxdWVzdCA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogYCR7dGhpcy5fY29ubi5fYmFzZVVybCgpfS9tZXRhZGF0YS9kZXBsb3lSZXF1ZXN0YCxcbiAgICAgICAgYm9keTogbWVzc2FnZUJvZHksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0geyBoZWFkZXJzOiAnanNvbicgfTtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIGRlcGxveSBJRCBvZiB0aGUgZGVwbG95UmVjZW50VmFsaWRhdGlvbiByZXNwb25zZSwgbm90XG4gICAgICAvLyB0aGUgYWxyZWFkeSB2YWxpZGF0ZWQgZGVwbG95IElEIChpLmUuLCB2YWxpZGF0ZWRkZXBsb3lyZXF1ZXN0aWQpLlxuICAgICAgLy8gUkVTVCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGFuIGlkIHByb3BlcnR5LCBTT0FQIHJldHVybnMgdGhlIGlkIGFzIGEgc3RyaW5nIGRpcmVjdGx5LlxuICAgICAgcmVzcG9uc2UgPSAoXG4gICAgICAgIGF3YWl0IHRoaXMuX2Nvbm4ucmVxdWVzdDx7IGlkOiBzdHJpbmcgfT4ocmVxdWVzdEluZm8sIHJlcXVlc3RPcHRpb25zKVxuICAgICAgKS5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9pbnZva2UoJ2RlcGxveVJlY2VudFZhbGlkYXRpb24nLCB7XG4gICAgICAgIHZhbGlkYXRpb25JZDogaWQsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICAvKipcbiAgICogRGVwbG95IGNvbXBvbmVudHMgaW50byBhbiBvcmdhbml6YXRpb24gdXNpbmcgemlwcGVkIGZpbGUgcmVwcmVzZW50YXRpb25zXG4gICAqIHVzaW5nIHRoZSBSRVNUIE1ldGFkYXRhIEFQSSBpbnN0ZWFkIG9mIFNPQVBcbiAgICovXG4gIGRlcGxveVJlc3QoXG4gICAgemlwSW5wdXQ6IEJ1ZmZlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPERlcGxveU9wdGlvbnM+ID0ge30sXG4gICk6IERlcGxveVJlc3VsdExvY2F0b3I8Uz4ge1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtLmFwcGVuZCgnZmlsZScsIHppcElucHV0LCB7XG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3ppcCcsXG4gICAgICBmaWxlbmFtZTogJ3BhY2thZ2UueG1sJyxcbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgZGVwbG95IG9wdGlvbnNcbiAgICBmb3JtLmFwcGVuZCgnZW50aXR5X2NvbnRlbnQnLCBKU09OLnN0cmluZ2lmeSh7IGRlcGxveU9wdGlvbnM6IG9wdGlvbnMgfSksIHtcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXF1ZXN0OiBIdHRwUmVxdWVzdCA9IHtcbiAgICAgIHVybDogJy9tZXRhZGF0YS9kZXBsb3lSZXF1ZXN0JyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogeyAuLi5mb3JtLmdldEhlYWRlcnMoKSB9LFxuICAgICAgYm9keTogZm9ybS5nZXRCdWZmZXIoKSxcbiAgICB9O1xuICAgIGNvbnN0IHJlcyA9IHRoaXMuX2Nvbm4ucmVxdWVzdDxBc3luY1Jlc3VsdD4ocmVxdWVzdCk7XG5cbiAgICByZXR1cm4gbmV3IERlcGxveVJlc3VsdExvY2F0b3IodGhpcywgcmVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXBsb3kgY29tcG9uZW50cyBpbnRvIGFuIG9yZ2FuaXphdGlvbiB1c2luZyB6aXBwZWQgZmlsZSByZXByZXNlbnRhdGlvbnNcbiAgICovXG4gIGRlcGxveShcbiAgICB6aXBJbnB1dDogUmVhZGFibGUgfCBCdWZmZXIgfCBzdHJpbmcsXG4gICAgb3B0aW9uczogUGFydGlhbDxEZXBsb3lPcHRpb25zPiA9IHt9LFxuICApOiBEZXBsb3lSZXN1bHRMb2NhdG9yPFM+IHtcbiAgICBjb25zdCByZXMgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgemlwQ29udGVudEI2NCA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzT2JqZWN0KHppcElucHV0KSAmJlxuICAgICAgICAgICdwaXBlJyBpbiB6aXBJbnB1dCAmJlxuICAgICAgICAgIHR5cGVvZiB6aXBJbnB1dC5waXBlID09PSAnZnVuY3Rpb24nXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGJ1ZnM6IEJ1ZmZlcltdID0gW107XG4gICAgICAgICAgemlwSW5wdXQub24oJ2RhdGEnLCAoZCkgPT4gYnVmcy5wdXNoKGQpKTtcbiAgICAgICAgICB6aXBJbnB1dC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgICAgIHppcElucHV0Lm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKEJ1ZmZlci5jb25jYXQoYnVmcykudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyB6aXBJbnB1dC5yZXN1bWUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh6aXBJbnB1dCBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgICAgICAgIHJlc29sdmUoemlwSW5wdXQudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgfSBlbHNlIGlmICh6aXBJbnB1dCBpbnN0YW5jZW9mIFN0cmluZyB8fCB0eXBlb2YgemlwSW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmVzb2x2ZSh6aXBJbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ1VuZXhwZWN0ZWQgemlwSW5wdXQgdHlwZSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcy5faW52b2tlKFxuICAgICAgICAnZGVwbG95JyxcbiAgICAgICAge1xuICAgICAgICAgIFppcEZpbGU6IHppcENvbnRlbnRCNjQsXG4gICAgICAgICAgRGVwbG95T3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgICAgQXBpU2NoZW1hcy5EZXBsb3lSZXN1bHQsXG4gICAgICApO1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gbmV3IERlcGxveVJlc3VsdExvY2F0b3IodGhpcywgcmVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIHN0YXR1cyBvZiBkZWNsYXJhdGl2ZSBtZXRhZGF0YSBjYWxsIGRlcGxveSgpXG4gICAqL1xuICBjaGVja0RlcGxveVN0YXR1cyhcbiAgICBhc3luY1Byb2Nlc3NJZDogc3RyaW5nLFxuICAgIGluY2x1ZGVEZXRhaWxzOiBib29sZWFuID0gZmFsc2UsXG4gICk6IFByb21pc2U8RGVwbG95UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcbiAgICAgICdjaGVja0RlcGxveVN0YXR1cycsXG4gICAgICB7XG4gICAgICAgIGFzeW5jUHJvY2Vzc0lkLFxuICAgICAgICBpbmNsdWRlRGV0YWlscyxcbiAgICAgIH0sXG4gICAgICBBcGlTY2hlbWFzLkRlcGxveVJlc3VsdCxcbiAgICApO1xuICB9XG5cbiBhc3luYyBjYW5jZWxEZXBsb3koaWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsRGVwbG95UmVzdWx0PntcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKCdjYW5jZWxEZXBsb3knLCB7IGlkIH0pXG4gIH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIGxvY2F0b3IgY2xhc3MgZm9yIE1ldGFkYXRhIEFQSSBhc3luY2hyb25vdXMgY2FsbCByZXN1bHRcbiAqL1xuZXhwb3J0IGNsYXNzIEFzeW5jUmVzdWx0TG9jYXRvcjxcbiAgUyBleHRlbmRzIFNjaGVtYSxcbiAgUiBleHRlbmRzIHt9ID0gQXN5bmNSZXN1bHRcbj4gZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBfbWV0YTogTWV0YWRhdGFBcGk8Uz47XG4gIF9wcm9taXNlOiBQcm9taXNlPEFzeW5jUmVzdWx0PjtcbiAgX2lkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXRhOiBNZXRhZGF0YUFwaTxTPiwgcHJvbWlzZTogUHJvbWlzZTxBc3luY1Jlc3VsdD4pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX21ldGEgPSBtZXRhO1xuICAgIHRoaXMuX3Byb21pc2UgPSBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb21pc2UvQSsgaW50ZXJmYWNlXG4gICAqIGh0dHA6Ly9wcm9taXNlcy1hcGx1cy5naXRodWIuaW8vcHJvbWlzZXMtc3BlYy9cbiAgICpcbiAgICogQG1ldGhvZCBNZXRhZGF0YX5Bc3luY1Jlc3VsdExvY2F0b3IjdGhlblxuICAgKi9cbiAgdGhlbjxVLCBWPihcbiAgICBvblJlc29sdmU/OiAoKHJlc3VsdDogQXN5bmNSZXN1bHQpID0+IFUgfCBQcm9taXNlPFU+KSB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgb25SZWplY3Q/OiAoKGVycjogRXJyb3IpID0+IFYgfCBQcm9taXNlPFY+KSB8IG51bGwgfCB1bmRlZmluZWQsXG4gICk6IFByb21pc2U8VSB8IFY+IHtcbiAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKG9uUmVzb2x2ZSwgb25SZWplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSBzdGF0dXMgb2YgYXN5bmMgcmVxdWVzdFxuICAgKi9cbiAgYXN5bmMgY2hlY2soKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fcHJvbWlzZTtcbiAgICB0aGlzLl9pZCA9IHJlc3VsdC5pZDtcbiAgICByZXR1cm4gdGhpcy5fbWV0YS5jaGVja1N0YXR1cyhyZXN1bHQuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvbGxpbmcgdW50aWwgYXN5bmMgY2FsbCBzdGF0dXMgYmVjb21lcyBjb21wbGV0ZSBvciBlcnJvclxuICAgKi9cbiAgcG9sbChpbnRlcnZhbDogbnVtYmVyLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCBwb2xsID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGlmIChzdGFydFRpbWUgKyB0aW1lb3V0IDwgbm93KSB7XG4gICAgICAgICAgbGV0IGVyck1zZyA9ICdQb2xsaW5nIHRpbWUgb3V0Lic7XG4gICAgICAgICAgaWYgKHRoaXMuX2lkKSB7XG4gICAgICAgICAgICBlcnJNc2cgKz0gJyBQcm9jZXNzIElkID0gJyArIHRoaXMuX2lkO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKGVyck1zZykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNoZWNrKCk7XG4gICAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICAgIHRoaXMuZW1pdCgnY29tcGxldGUnLCByZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZW1pdCgncHJvZ3Jlc3MnLCByZXN1bHQpO1xuICAgICAgICAgIHNldFRpbWVvdXQocG9sbCwgaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICB9XG4gICAgfTtcbiAgICBzZXRUaW1lb3V0KHBvbGwsIGludGVydmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBhbmQgd2FpdCB1bnRpbCB0aGUgYXN5bmMgcmVxdWVzdHMgYmVjb21lIGluIGNvbXBsZXRlZCBzdGF0dXNcbiAgICovXG4gIGNvbXBsZXRlKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLm9uKCdjb21wbGV0ZScsIHJlc29sdmUpO1xuICAgICAgdGhpcy5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgdGhpcy5wb2xsKHRoaXMuX21ldGEucG9sbEludGVydmFsLCB0aGlzLl9tZXRhLnBvbGxUaW1lb3V0KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogVGhlIGxvY2F0b3IgY2xhc3MgdG8gdHJhY2sgcmV0cmVpdmUoKSBNZXRhZGF0YSBBUEkgY2FsbCByZXN1bHRcbiAqL1xuZXhwb3J0IGNsYXNzIFJldHJpZXZlUmVzdWx0TG9jYXRvcjxTIGV4dGVuZHMgU2NoZW1hPiBleHRlbmRzIEFzeW5jUmVzdWx0TG9jYXRvcjxcbiAgUyxcbiAgUmV0cmlldmVSZXN1bHRcbj4ge1xuICAvKipcbiAgICogQ2hlY2sgYW5kIHdhaXQgdW50aWwgdGhlIGFzeW5jIHJlcXVlc3QgYmVjb21lcyBpbiBjb21wbGV0ZWQgc3RhdHVzLFxuICAgKiBhbmQgcmV0cmlldmUgdGhlIHJlc3VsdCBkYXRhLlxuICAgKi9cbiAgYXN5bmMgY29tcGxldGUoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3VwZXIuY29tcGxldGUoKTtcbiAgICByZXR1cm4gdGhpcy5fbWV0YS5jaGVja1JldHJpZXZlU3RhdHVzKHJlc3VsdC5pZCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSByZXRyaWV2ZWQgcmVzdWx0IHRvIE5vZGUuanMgcmVhZGFibGUgc3RyZWFtXG4gICAqL1xuICBzdHJlYW0oKSB7XG4gICAgY29uc3QgcmVzdWx0U3RyZWFtID0gbmV3IFJlYWRhYmxlKCk7XG4gICAgbGV0IHJlYWRpbmcgPSBmYWxzZTtcbiAgICByZXN1bHRTdHJlYW0uX3JlYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAocmVhZGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZWFkaW5nID0gdHJ1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY29tcGxldGUoKTtcbiAgICAgICAgcmVzdWx0U3RyZWFtLnB1c2goQnVmZmVyLmZyb20ocmVzdWx0LnppcEZpbGUsICdiYXNlNjQnKSk7XG4gICAgICAgIHJlc3VsdFN0cmVhbS5wdXNoKG51bGwpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXN1bHRTdHJlYW0uZW1pdCgnZXJyb3InLCBlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiByZXN1bHRTdHJlYW07XG4gIH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIFRoZSBsb2NhdG9yIGNsYXNzIHRvIHRyYWNrIGRlcGxveSgpIE1ldGFkYXRhIEFQSSBjYWxsIHJlc3VsdFxuICpcbiAqIEBwcm90ZWN0ZWRcbiAqIEBjbGFzcyBNZXRhZGF0YX5EZXBsb3lSZXN1bHRMb2NhdG9yXG4gKiBAZXh0ZW5kcyBNZXRhZGF0YX5Bc3luY1Jlc3VsdExvY2F0b3JcbiAqIEBwYXJhbSB7TWV0YWRhdGF9IG1ldGEgLSBNZXRhZGF0YSBBUEkgb2JqZWN0XG4gKiBAcGFyYW0ge1Byb21pc2UuPE1ldGFkYXRhfkFzeW5jUmVzdWx0Pn0gcmVzdWx0IC0gUHJvbWlzZSBvYmplY3QgZm9yIGFzeW5jIHJlc3VsdCBvZiBkZXBsb3koKSBjYWxsXG4gKi9cbmV4cG9ydCBjbGFzcyBEZXBsb3lSZXN1bHRMb2NhdG9yPFMgZXh0ZW5kcyBTY2hlbWE+IGV4dGVuZHMgQXN5bmNSZXN1bHRMb2NhdG9yPFxuICBTLFxuICBEZXBsb3lSZXN1bHRcbj4ge1xuICAvKipcbiAgICogQ2hlY2sgYW5kIHdhaXQgdW50aWwgdGhlIGFzeW5jIHJlcXVlc3QgYmVjb21lcyBpbiBjb21wbGV0ZWQgc3RhdHVzLFxuICAgKiBhbmQgcmV0cmlldmUgdGhlIHJlc3VsdCBkYXRhLlxuICAgKi9cbiAgYXN5bmMgY29tcGxldGUoaW5jbHVkZURldGFpbHM/OiBib29sZWFuKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3VwZXIuY29tcGxldGUoKTtcbiAgICByZXR1cm4gdGhpcy5fbWV0YS5jaGVja0RlcGxveVN0YXR1cyhyZXN1bHQuaWQsIGluY2x1ZGVEZXRhaWxzKTtcbiAgfVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4gKiBSZWdpc3RlciBob29rIGluIGNvbm5lY3Rpb24gaW5zdGFudGlhdGlvbiBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIHRoaXMgQVBJIG1vZHVsZSBmZWF0dXJlc1xuICovXG5yZWdpc3Rlck1vZHVsZSgnbWV0YWRhdGEnLCAoY29ubikgPT4gbmV3IE1ldGFkYXRhQXBpKGNvbm4pKTtcblxuZXhwb3J0IGRlZmF1bHQgTWV0YWRhdGFBcGk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNBLFlBQVksUUFBUSxRQUFRO0FBQ3JDLFNBQVNDLFFBQVEsUUFBUSxRQUFRO0FBQ2pDLE9BQU9DLFFBQVEsTUFBTSxXQUFXO0FBQ2hDLFNBQVNDLGNBQWMsUUFBUSxZQUFZO0FBRTNDLE9BQU9DLElBQUksTUFBTSxTQUFTO0FBQzFCLFNBQVNDLFFBQVEsUUFBUSxrQkFBa0I7QUFFM0MsU0FDRUMsVUFBVSxRQWNMLG1CQUFtQjtBQUMxQixjQUFjLG1CQUFtQjs7QUFFakM7QUFDQTtBQUNBOztBQWlDQTtBQUNBO0FBQ0E7QUFDQSxT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