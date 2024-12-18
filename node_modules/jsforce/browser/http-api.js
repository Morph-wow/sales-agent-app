import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _wrapNativeSuper from "@babel/runtime-corejs3/helpers/wrapNativeSuper";
import _typeof from "@babel/runtime-corejs3/helpers/typeof";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Date$now from "@babel/runtime-corejs3/core-js-stable/date/now";
import _Object$keys2 from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
/**
 *
 */
import { EventEmitter } from 'events';
import xml2js from 'xml2js';
import { getLogger } from './util/logger';
import { StreamPromise } from './util/promise';
import { parseCSV } from './csv';
import { createLazyStream } from './util/stream';
import { getBodySize } from './util/get-body-size';

/** @private */
function parseJSON(str) {
  return JSON.parse(str);
}

/** @private */
function parseXML(_x) {
  return _parseXML.apply(this, arguments);
}
/** @private */
function _parseXML() {
  _parseXML = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(str) {
    return _regeneratorRuntime.wrap(function _callee5$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", xml2js.parseStringPromise(str, {
            explicitArray: false
          }));
        case 1:
        case "end":
          return _context10.stop();
      }
    }, _callee5);
  }));
  return _parseXML.apply(this, arguments);
}
function parseText(str) {
  return str;
}

/**
 * HTTP based API class with authorization hook
 */
export var HttpApi = /*#__PURE__*/function (_EventEmitter) {
  function HttpApi(conn, options) {
    var _this;
    _classCallCheck(this, HttpApi);
    _this = _callSuper(this, HttpApi);
    _this._conn = conn;
    _this._logger = conn._logLevel ? HttpApi._logger.createInstance(conn._logLevel) : HttpApi._logger;
    _this._responseType = options.responseType;
    _this._transport = options.transport || conn._transport;
    _this._noContentResponse = options.noContentResponse;
    _this._options = options;
    return _this;
  }

  /**
   * Callout to API endpoint using http
   */
  _inherits(HttpApi, _EventEmitter);
  return _createClass(HttpApi, [{
    key: "request",
    value: function request(_request) {
      var _this2 = this;
      return StreamPromise.create(function () {
        var _createLazyStream = createLazyStream(),
          stream = _createLazyStream.stream,
          setStream = _createLazyStream.setStream;
        var promise = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var _context, _context2;
          var refreshDelegate, bodyPromise, _body2, requestTime, requestPromise, response, responseTime, err, body;
          return _regeneratorRuntime.wrap(function _callee$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                refreshDelegate = _this2.getRefreshDelegate();
                /* TODO decide remove or not this section */
                /*
                // remember previous instance url in case it changes after a refresh
                const lastInstanceUrl = conn.instanceUrl;
                 // check to see if the token refresh has changed the instance url
                if(lastInstanceUrl !== conn.instanceUrl){
                  // if the instance url has changed
                  // then replace the current request urls instance url fragment
                  // with the updated instance url
                  request.url = request.url.replace(lastInstanceUrl,conn.instanceUrl);
                }
                */
                if (!(refreshDelegate && refreshDelegate.isRefreshing())) {
                  _context3.next = 10;
                  break;
                }
                _context3.next = 4;
                return refreshDelegate.waitRefresh();
              case 4:
                bodyPromise = _this2.request(_request);
                setStream(bodyPromise.stream());
                _context3.next = 8;
                return bodyPromise;
              case 8:
                _body2 = _context3.sent;
                return _context3.abrupt("return", _body2);
              case 10:
                // hook before sending
                _this2.beforeSend(_request);
                _this2.emit('request', _request);
                _this2._logger.debug(_concatInstanceProperty(_context = "<request> method=".concat(_request.method, ", url=")).call(_context, _request.url));
                requestTime = _Date$now();
                requestPromise = _this2._transport.httpRequest(_request, _this2._options);
                setStream(requestPromise.stream());
                _context3.prev = 16;
                _context3.next = 19;
                return requestPromise;
              case 19:
                response = _context3.sent;
                _context3.next = 26;
                break;
              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](16);
                _this2._logger.error(_context3.t0);
                throw _context3.t0;
              case 26:
                _context3.prev = 26;
                responseTime = _Date$now();
                _this2._logger.debug("elapsed time: ".concat(responseTime - requestTime, " msec"));
                return _context3.finish(26);
              case 30:
                if (response) {
                  _context3.next = 32;
                  break;
                }
                return _context3.abrupt("return");
              case 32:
                _this2._logger.debug(_concatInstanceProperty(_context2 = "<response> status=".concat(String(response.statusCode), ", url=")).call(_context2, _request.url));
                _this2.emit('response', response);
                // Refresh token if session has been expired and requires authentication
                // when session refresh delegate is available
                if (!(_this2.isSessionExpired(response) && refreshDelegate)) {
                  _context3.next = 39;
                  break;
                }
                _context3.next = 37;
                return refreshDelegate.refresh(requestTime);
              case 37:
                /* remove the `content-length` header after token refresh
                 *
                 * SOAP requests include the access token their the body,
                 * if the first req had an invalid token and jsforce successfully
                 * refreshed it we need to remove the `content-length` header
                 * so that it get's re-calculated again with the new body.
                 *
                 * REST request aren't affected by this because the access token
                 * is sent via HTTP headers
                 *
                 * `_message` is only present in SOAP requests
                 */
                if ('_message' in _request && _request.headers && 'content-length' in _request.headers) {
                  delete _request.headers['content-length'];
                }
                return _context3.abrupt("return", _this2.request(_request));
              case 39:
                if (!_this2.isErrorResponse(response)) {
                  _context3.next = 44;
                  break;
                }
                _context3.next = 42;
                return _this2.getError(response);
              case 42:
                err = _context3.sent;
                throw err;
              case 44:
                _context3.next = 46;
                return _this2.getResponseBody(response);
              case 46:
                body = _context3.sent;
                return _context3.abrupt("return", body);
              case 48:
              case "end":
                return _context3.stop();
            }
          }, _callee, null, [[16, 22, 26, 30]]);
        }))();
        return {
          stream: stream,
          promise: promise
        };
      });
    }

    /**
     * @protected
     */
  }, {
    key: "getRefreshDelegate",
    value: function getRefreshDelegate() {
      return this._conn._refreshDelegate;
    }

    /**
     * @protected
     */
  }, {
    key: "beforeSend",
    value: function beforeSend(request) {
      var _context5;
      /* eslint-disable no-param-reassign */
      var headers = request.headers || {};
      if (this._conn.accessToken) {
        headers.Authorization = "Bearer ".concat(this._conn.accessToken);
      }
      if (this._conn._callOptions) {
        var callOptions = [];
        for (var _i = 0, _Object$keys = _Object$keys2(this._conn._callOptions); _i < _Object$keys.length; _i++) {
          var _context4;
          var name = _Object$keys[_i];
          callOptions.push(_concatInstanceProperty(_context4 = "".concat(name, "=")).call(_context4, this._conn._callOptions[name]));
        }
        headers['Sforce-Call-Options'] = callOptions.join(', ');
      }
      var bodySize = getBodySize(request.body, headers);
      var cannotHaveBody = _includesInstanceProperty(_context5 = ['GET', 'HEAD', 'OPTIONS']).call(_context5, request.method);
      if (!cannotHaveBody && !!request.body && !('transfer-encoding' in headers) && !('content-length' in headers) && !!bodySize) {
        this._logger.debug("missing 'content-length' header, setting it to: ".concat(bodySize));
        headers['content-length'] = String(bodySize);
      }
      request.headers = headers;
    }

    /**
     * Detect response content mime-type
     * @protected
     */
  }, {
    key: "getResponseContentType",
    value: function getResponseContentType(response) {
      return this._responseType || response.headers && response.headers['content-type'];
    }

    /**
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/require-await
  }, {
    key: "parseResponseBody",
    value: (function () {
      var _parseResponseBody = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(response) {
        var contentType, parseBody, _context6;
        return _regeneratorRuntime.wrap(function _callee2$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              contentType = this.getResponseContentType(response) || '';
              parseBody = /^(text|application)\/xml(;|$)/.test(contentType) ? parseXML : /^application\/json(;|$)/.test(contentType) ? parseJSON : /^text\/csv(;|$)/.test(contentType) ? parseCSV : parseText;
              _context7.prev = 2;
              return _context7.abrupt("return", parseBody(response.body));
            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7["catch"](2);
              // TODO(next major): we could throw a new "invalid response body" error instead.
              this._logger.debug(_concatInstanceProperty(_context6 = "Failed to parse body of content-type: ".concat(contentType, ". Error: ")).call(_context6, _context7.t0.message));
              return _context7.abrupt("return", response.body);
            case 10:
            case "end":
              return _context7.stop();
          }
        }, _callee2, this, [[2, 6]]);
      }));
      function parseResponseBody(_x2) {
        return _parseResponseBody.apply(this, arguments);
      }
      return parseResponseBody;
    }()
    /**
     * Get response body
     * @protected
     */
    )
  }, {
    key: "getResponseBody",
    value: (function () {
      var _getResponseBody = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(response) {
        var body, err;
        return _regeneratorRuntime.wrap(function _callee3$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (!(response.statusCode === 204)) {
                _context8.next = 2;
                break;
              }
              return _context8.abrupt("return", this._noContentResponse);
            case 2:
              _context8.next = 4;
              return this.parseResponseBody(response);
            case 4:
              body = _context8.sent;
              if (!this.hasErrorInResponseBody(body)) {
                _context8.next = 10;
                break;
              }
              _context8.next = 8;
              return this.getError(response, body);
            case 8:
              err = _context8.sent;
              throw err;
            case 10:
              if (!(response.statusCode === 300)) {
                _context8.next = 12;
                break;
              }
              throw new HttpApiError('Multiple records found', 'MULTIPLE_CHOICES', body);
            case 12:
              return _context8.abrupt("return", body);
            case 13:
            case "end":
              return _context8.stop();
          }
        }, _callee3, this);
      }));
      function getResponseBody(_x3) {
        return _getResponseBody.apply(this, arguments);
      }
      return getResponseBody;
    }()
    /**
     * Detect session expiry
     * @protected
     */
    )
  }, {
    key: "isSessionExpired",
    value: function isSessionExpired(response) {
      return response.statusCode === 401;
    }

    /**
     * Detect error response
     * @protected
     */
  }, {
    key: "isErrorResponse",
    value: function isErrorResponse(response) {
      return response.statusCode >= 400;
    }

    /**
     * Detect error in response body
     * @protected
     */
  }, {
    key: "hasErrorInResponseBody",
    value: function hasErrorInResponseBody(_body) {
      return false;
    }

    /**
     * Parsing error message in response
     * @protected
     */
  }, {
    key: "parseError",
    value: function parseError(body) {
      var errors = body;

      // XML response
      if (errors.Errors) {
        return errors.Errors.Error;
      }
      return errors;
    }

    /**
     * Get error message in response
     * @protected
     */
  }, {
    key: "getError",
    value: (function () {
      var _getError = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(response, body) {
        var error;
        return _regeneratorRuntime.wrap(function _callee4$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.t0 = this;
              _context9.t1 = body;
              if (_context9.t1) {
                _context9.next = 7;
                break;
              }
              _context9.next = 6;
              return this.parseResponseBody(response);
            case 6:
              _context9.t1 = _context9.sent;
            case 7:
              _context9.t2 = _context9.t1;
              error = _context9.t0.parseError.call(_context9.t0, _context9.t2);
              _context9.next = 13;
              break;
            case 11:
              _context9.prev = 11;
              _context9.t3 = _context9["catch"](0);
            case 13:
              if (!_Array$isArray(error)) {
                _context9.next = 19;
                break;
              }
              if (!(error.length === 1)) {
                _context9.next = 18;
                break;
              }
              error = error[0];
              _context9.next = 19;
              break;
            case 18:
              return _context9.abrupt("return", new HttpApiError("Multiple errors returned.\n  Check `error.data` for the error details", 'MULTIPLE_API_ERRORS', error));
            case 19:
              error = _typeof(error) === 'object' && error !== null && typeof error.message === 'string' ? error : {
                errorCode: "ERROR_HTTP_".concat(response.statusCode),
                message: response.body
              };
              if (!(response.headers['content-type'] === 'text/html')) {
                _context9.next = 23;
                break;
              }
              this._logger.debug("html response.body: ".concat(response.body));
              return _context9.abrupt("return", new HttpApiError("HTTP response contains html content.\nCheck that the org exists and can be reached.\nSee `error.data` for the full html response.", error.errorCode, error.message));
            case 23:
              return _context9.abrupt("return", error instanceof HttpApiError ? error : new HttpApiError(error.message, error.errorCode, error));
            case 24:
            case "end":
              return _context9.stop();
          }
        }, _callee4, this, [[0, 11]]);
      }));
      function getError(_x4, _x5) {
        return _getError.apply(this, arguments);
      }
      return getError;
    }())
  }]);
}(EventEmitter);

/**
 *
 */
_defineProperty(HttpApi, "_logger", getLogger('http-api'));
var HttpApiError = /*#__PURE__*/function (_Error) {
  /**
   * This contains error-specific details, usually returned from the API.
   */

  function HttpApiError(message, errorCode, data) {
    var _this3;
    _classCallCheck(this, HttpApiError);
    _this3 = _callSuper(this, HttpApiError, [message]);
    _this3.name = errorCode || _this3.name;
    _this3.errorCode = _this3.name;
    _this3.data = data;
    return _this3;
  }

  /**
   * This will be removed in the next major (v4)
   *
   * @deprecated use `error.data` instead
   */
  _inherits(HttpApiError, _Error);
  return _createClass(HttpApiError, [{
    key: "content",
    get: function get() {
      return this.data;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(Error));
export default HttpApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJ4bWwyanMiLCJnZXRMb2dnZXIiLCJTdHJlYW1Qcm9taXNlIiwicGFyc2VDU1YiLCJjcmVhdGVMYXp5U3RyZWFtIiwiZ2V0Qm9keVNpemUiLCJwYXJzZUpTT04iLCJzdHIiLCJKU09OIiwicGFyc2UiLCJwYXJzZVhNTCIsIl94IiwiX3BhcnNlWE1MIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZTUiLCJ3cmFwIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQxMCIsInByZXYiLCJuZXh0IiwiYWJydXB0IiwicGFyc2VTdHJpbmdQcm9taXNlIiwiZXhwbGljaXRBcnJheSIsInN0b3AiLCJwYXJzZVRleHQiLCJIdHRwQXBpIiwiX0V2ZW50RW1pdHRlciIsImNvbm4iLCJvcHRpb25zIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiX2Nvbm4iLCJfbG9nZ2VyIiwiX2xvZ0xldmVsIiwiY3JlYXRlSW5zdGFuY2UiLCJfcmVzcG9uc2VUeXBlIiwicmVzcG9uc2VUeXBlIiwiX3RyYW5zcG9ydCIsInRyYW5zcG9ydCIsIl9ub0NvbnRlbnRSZXNwb25zZSIsIm5vQ29udGVudFJlc3BvbnNlIiwiX29wdGlvbnMiLCJfaW5oZXJpdHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInJlcXVlc3QiLCJfdGhpczIiLCJjcmVhdGUiLCJfY3JlYXRlTGF6eVN0cmVhbSIsInN0cmVhbSIsInNldFN0cmVhbSIsInByb21pc2UiLCJfY2FsbGVlIiwiX2NvbnRleHQiLCJfY29udGV4dDIiLCJyZWZyZXNoRGVsZWdhdGUiLCJib2R5UHJvbWlzZSIsIl9ib2R5MiIsInJlcXVlc3RUaW1lIiwicmVxdWVzdFByb21pc2UiLCJyZXNwb25zZSIsInJlc3BvbnNlVGltZSIsImVyciIsImJvZHkiLCJfY2FsbGVlJCIsIl9jb250ZXh0MyIsImdldFJlZnJlc2hEZWxlZ2F0ZSIsImlzUmVmcmVzaGluZyIsIndhaXRSZWZyZXNoIiwic2VudCIsImJlZm9yZVNlbmQiLCJlbWl0IiwiZGVidWciLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsImNvbmNhdCIsIm1ldGhvZCIsImNhbGwiLCJ1cmwiLCJfRGF0ZSRub3ciLCJodHRwUmVxdWVzdCIsInQwIiwiZXJyb3IiLCJmaW5pc2giLCJTdHJpbmciLCJzdGF0dXNDb2RlIiwiaXNTZXNzaW9uRXhwaXJlZCIsInJlZnJlc2giLCJoZWFkZXJzIiwiaXNFcnJvclJlc3BvbnNlIiwiZ2V0RXJyb3IiLCJnZXRSZXNwb25zZUJvZHkiLCJfcmVmcmVzaERlbGVnYXRlIiwiX2NvbnRleHQ1IiwiYWNjZXNzVG9rZW4iLCJBdXRob3JpemF0aW9uIiwiX2NhbGxPcHRpb25zIiwiY2FsbE9wdGlvbnMiLCJfaSIsIl9PYmplY3Qka2V5cyIsIl9PYmplY3Qka2V5czIiLCJsZW5ndGgiLCJfY29udGV4dDQiLCJuYW1lIiwicHVzaCIsImpvaW4iLCJib2R5U2l6ZSIsImNhbm5vdEhhdmVCb2R5IiwiX2luY2x1ZGVzSW5zdGFuY2VQcm9wZXJ0eSIsImdldFJlc3BvbnNlQ29udGVudFR5cGUiLCJfcGFyc2VSZXNwb25zZUJvZHkiLCJfY2FsbGVlMiIsImNvbnRlbnRUeXBlIiwicGFyc2VCb2R5IiwiX2NvbnRleHQ2IiwiX2NhbGxlZTIkIiwiX2NvbnRleHQ3IiwidGVzdCIsIm1lc3NhZ2UiLCJwYXJzZVJlc3BvbnNlQm9keSIsIl94MiIsIl9nZXRSZXNwb25zZUJvZHkiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0OCIsImhhc0Vycm9ySW5SZXNwb25zZUJvZHkiLCJIdHRwQXBpRXJyb3IiLCJfeDMiLCJfYm9keSIsInBhcnNlRXJyb3IiLCJlcnJvcnMiLCJFcnJvcnMiLCJFcnJvciIsIl9nZXRFcnJvciIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ5IiwidDEiLCJ0MiIsInQzIiwiX0FycmF5JGlzQXJyYXkiLCJfdHlwZW9mIiwiZXJyb3JDb2RlIiwiX3g0IiwiX3g1IiwiX2RlZmluZVByb3BlcnR5IiwiX0Vycm9yIiwiZGF0YSIsIl90aGlzMyIsImdldCIsIl93cmFwTmF0aXZlU3VwZXIiXSwic291cmNlcyI6WyIuLi9zcmMvaHR0cC1hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICovXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHhtbDJqcyBmcm9tICd4bWwyanMnO1xuaW1wb3J0IHsgTG9nZ2VyLCBnZXRMb2dnZXIgfSBmcm9tICcuL3V0aWwvbG9nZ2VyJztcbmltcG9ydCB7IFN0cmVhbVByb21pc2UgfSBmcm9tICcuL3V0aWwvcHJvbWlzZSc7XG5pbXBvcnQgQ29ubmVjdGlvbiBmcm9tICcuL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IFRyYW5zcG9ydCBmcm9tICcuL3RyYW5zcG9ydCc7XG5pbXBvcnQgeyBwYXJzZUNTViB9IGZyb20gJy4vY3N2JztcbmltcG9ydCB7XG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwUmVxdWVzdE9wdGlvbnMsXG4gIEh0dHBSZXNwb25zZSxcbiAgT3B0aW9uYWwsXG4gIFNjaGVtYSxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVMYXp5U3RyZWFtIH0gZnJvbSAnLi91dGlsL3N0cmVhbSc7XG5pbXBvcnQgeyBnZXRCb2R5U2l6ZSB9IGZyb20gJy4vdXRpbC9nZXQtYm9keS1zaXplJztcblxuLyoqIEBwcml2YXRlICovXG5mdW5jdGlvbiBwYXJzZUpTT04oc3RyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyKTtcbn1cblxuLyoqIEBwcml2YXRlICovXG5hc3luYyBmdW5jdGlvbiBwYXJzZVhNTChzdHI6IHN0cmluZykge1xuICByZXR1cm4geG1sMmpzLnBhcnNlU3RyaW5nUHJvbWlzZShzdHIsIHsgZXhwbGljaXRBcnJheTogZmFsc2UgfSk7XG59XG5cbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gcGFyc2VUZXh0KHN0cjogc3RyaW5nKSB7XG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogSFRUUCBiYXNlZCBBUEkgY2xhc3Mgd2l0aCBhdXRob3JpemF0aW9uIGhvb2tcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBBcGk8UyBleHRlbmRzIFNjaGVtYT4gZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBzdGF0aWMgX2xvZ2dlciA9IGdldExvZ2dlcignaHR0cC1hcGknKTtcblxuICBfY29ubjogQ29ubmVjdGlvbjxTPjtcbiAgX2xvZ2dlcjogTG9nZ2VyO1xuICBfdHJhbnNwb3J0OiBUcmFuc3BvcnQ7XG4gIF9yZXNwb25zZVR5cGU6IHN0cmluZyB8IHZvaWQ7XG4gIF9ub0NvbnRlbnRSZXNwb25zZTogc3RyaW5nIHwgdm9pZDtcbiAgX29wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucztcblxuICBjb25zdHJ1Y3Rvcihjb25uOiBDb25uZWN0aW9uPFM+LCBvcHRpb25zOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2Nvbm4gPSBjb25uO1xuICAgIHRoaXMuX2xvZ2dlciA9IGNvbm4uX2xvZ0xldmVsXG4gICAgICA/IEh0dHBBcGkuX2xvZ2dlci5jcmVhdGVJbnN0YW5jZShjb25uLl9sb2dMZXZlbClcbiAgICAgIDogSHR0cEFwaS5fbG9nZ2VyO1xuICAgIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlO1xuICAgIHRoaXMuX3RyYW5zcG9ydCA9IG9wdGlvbnMudHJhbnNwb3J0IHx8IGNvbm4uX3RyYW5zcG9ydDtcbiAgICB0aGlzLl9ub0NvbnRlbnRSZXNwb25zZSA9IG9wdGlvbnMubm9Db250ZW50UmVzcG9uc2U7XG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbG91dCB0byBBUEkgZW5kcG9pbnQgdXNpbmcgaHR0cFxuICAgKi9cbiAgcmVxdWVzdDxSID0gdW5rbm93bj4ocmVxdWVzdDogSHR0cFJlcXVlc3QpOiBTdHJlYW1Qcm9taXNlPFI+IHtcbiAgICByZXR1cm4gU3RyZWFtUHJvbWlzZS5jcmVhdGU8Uj4oKCkgPT4ge1xuICAgICAgY29uc3QgeyBzdHJlYW0sIHNldFN0cmVhbSB9ID0gY3JlYXRlTGF6eVN0cmVhbSgpO1xuICAgICAgY29uc3QgcHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZnJlc2hEZWxlZ2F0ZSA9IHRoaXMuZ2V0UmVmcmVzaERlbGVnYXRlKCk7XG4gICAgICAgIC8qIFRPRE8gZGVjaWRlIHJlbW92ZSBvciBub3QgdGhpcyBzZWN0aW9uICovXG4gICAgICAgIC8qXG4gICAgICAgIC8vIHJlbWVtYmVyIHByZXZpb3VzIGluc3RhbmNlIHVybCBpbiBjYXNlIGl0IGNoYW5nZXMgYWZ0ZXIgYSByZWZyZXNoXG4gICAgICAgIGNvbnN0IGxhc3RJbnN0YW5jZVVybCA9IGNvbm4uaW5zdGFuY2VVcmw7XG5cbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSB0b2tlbiByZWZyZXNoIGhhcyBjaGFuZ2VkIHRoZSBpbnN0YW5jZSB1cmxcbiAgICAgICAgaWYobGFzdEluc3RhbmNlVXJsICE9PSBjb25uLmluc3RhbmNlVXJsKXtcbiAgICAgICAgICAvLyBpZiB0aGUgaW5zdGFuY2UgdXJsIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgLy8gdGhlbiByZXBsYWNlIHRoZSBjdXJyZW50IHJlcXVlc3QgdXJscyBpbnN0YW5jZSB1cmwgZnJhZ21lbnRcbiAgICAgICAgICAvLyB3aXRoIHRoZSB1cGRhdGVkIGluc3RhbmNlIHVybFxuICAgICAgICAgIHJlcXVlc3QudXJsID0gcmVxdWVzdC51cmwucmVwbGFjZShsYXN0SW5zdGFuY2VVcmwsY29ubi5pbnN0YW5jZVVybCk7XG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHJlZnJlc2hEZWxlZ2F0ZSAmJiByZWZyZXNoRGVsZWdhdGUuaXNSZWZyZXNoaW5nKCkpIHtcbiAgICAgICAgICBhd2FpdCByZWZyZXNoRGVsZWdhdGUud2FpdFJlZnJlc2goKTtcbiAgICAgICAgICBjb25zdCBib2R5UHJvbWlzZSA9IHRoaXMucmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgICAgICBzZXRTdHJlYW0oYm9keVByb21pc2Uuc3RyZWFtKCkpO1xuICAgICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBib2R5UHJvbWlzZTtcbiAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhvb2sgYmVmb3JlIHNlbmRpbmdcbiAgICAgICAgdGhpcy5iZWZvcmVTZW5kKHJlcXVlc3QpO1xuXG4gICAgICAgIHRoaXMuZW1pdCgncmVxdWVzdCcsIHJlcXVlc3QpO1xuICAgICAgICB0aGlzLl9sb2dnZXIuZGVidWcoXG4gICAgICAgICAgYDxyZXF1ZXN0PiBtZXRob2Q9JHtyZXF1ZXN0Lm1ldGhvZH0sIHVybD0ke3JlcXVlc3QudXJsfWAsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdFByb21pc2UgPSB0aGlzLl90cmFuc3BvcnQuaHR0cFJlcXVlc3QoXG4gICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICB0aGlzLl9vcHRpb25zLFxuICAgICAgICApO1xuXG4gICAgICAgIHNldFN0cmVhbShyZXF1ZXN0UHJvbWlzZS5zdHJlYW0oKSk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlOiBIdHRwUmVzcG9uc2UgfCB2b2lkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFByb21pc2U7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihlcnIpO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZVRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgIHRoaXMuX2xvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgIGBlbGFwc2VkIHRpbWU6ICR7cmVzcG9uc2VUaW1lIC0gcmVxdWVzdFRpbWV9IG1zZWNgLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2dnZXIuZGVidWcoXG4gICAgICAgICAgYDxyZXNwb25zZT4gc3RhdHVzPSR7U3RyaW5nKHJlc3BvbnNlLnN0YXR1c0NvZGUpfSwgdXJsPSR7XG4gICAgICAgICAgICByZXF1ZXN0LnVybFxuICAgICAgICAgIH1gLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmVtaXQoJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAvLyBSZWZyZXNoIHRva2VuIGlmIHNlc3Npb24gaGFzIGJlZW4gZXhwaXJlZCBhbmQgcmVxdWlyZXMgYXV0aGVudGljYXRpb25cbiAgICAgICAgLy8gd2hlbiBzZXNzaW9uIHJlZnJlc2ggZGVsZWdhdGUgaXMgYXZhaWxhYmxlXG4gICAgICAgIGlmICh0aGlzLmlzU2Vzc2lvbkV4cGlyZWQocmVzcG9uc2UpICYmIHJlZnJlc2hEZWxlZ2F0ZSkge1xuICAgICAgICAgIGF3YWl0IHJlZnJlc2hEZWxlZ2F0ZS5yZWZyZXNoKHJlcXVlc3RUaW1lKTtcbiAgICAgICAgICAvKiByZW1vdmUgdGhlIGBjb250ZW50LWxlbmd0aGAgaGVhZGVyIGFmdGVyIHRva2VuIHJlZnJlc2hcbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFNPQVAgcmVxdWVzdHMgaW5jbHVkZSB0aGUgYWNjZXNzIHRva2VuIHRoZWlyIHRoZSBib2R5LFxuICAgICAgICAgICAqIGlmIHRoZSBmaXJzdCByZXEgaGFkIGFuIGludmFsaWQgdG9rZW4gYW5kIGpzZm9yY2Ugc3VjY2Vzc2Z1bGx5XG4gICAgICAgICAgICogcmVmcmVzaGVkIGl0IHdlIG5lZWQgdG8gcmVtb3ZlIHRoZSBgY29udGVudC1sZW5ndGhgIGhlYWRlclxuICAgICAgICAgICAqIHNvIHRoYXQgaXQgZ2V0J3MgcmUtY2FsY3VsYXRlZCBhZ2FpbiB3aXRoIHRoZSBuZXcgYm9keS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFJFU1QgcmVxdWVzdCBhcmVuJ3QgYWZmZWN0ZWQgYnkgdGhpcyBiZWNhdXNlIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgKiBpcyBzZW50IHZpYSBIVFRQIGhlYWRlcnNcbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIGBfbWVzc2FnZWAgaXMgb25seSBwcmVzZW50IGluIFNPQVAgcmVxdWVzdHNcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAnX21lc3NhZ2UnIGluIHJlcXVlc3QgJiZcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycyAmJlxuICAgICAgICAgICAgJ2NvbnRlbnQtbGVuZ3RoJyBpbiByZXF1ZXN0LmhlYWRlcnNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0LmhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QocmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSkge1xuICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHRoaXMuZ2V0RXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgdGhpcy5nZXRSZXNwb25zZUJvZHkocmVzcG9uc2UpO1xuICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgIH0pKCk7XG4gICAgICByZXR1cm4geyBzdHJlYW0sIHByb21pc2UgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBnZXRSZWZyZXNoRGVsZWdhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4uX3JlZnJlc2hEZWxlZ2F0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBiZWZvcmVTZW5kKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0KSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICBjb25zdCBoZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xuICAgIGlmICh0aGlzLl9jb25uLmFjY2Vzc1Rva2VuKSB7XG4gICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dGhpcy5fY29ubi5hY2Nlc3NUb2tlbn1gO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY29ubi5fY2FsbE9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IGNhbGxPcHRpb25zID0gW107XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5fY29ubi5fY2FsbE9wdGlvbnMpKSB7XG4gICAgICAgIGNhbGxPcHRpb25zLnB1c2goYCR7bmFtZX09JHt0aGlzLl9jb25uLl9jYWxsT3B0aW9uc1tuYW1lXX1gKTtcbiAgICAgIH1cbiAgICAgIGhlYWRlcnNbJ1Nmb3JjZS1DYWxsLU9wdGlvbnMnXSA9IGNhbGxPcHRpb25zLmpvaW4oJywgJyk7XG4gICAgfVxuXG4gICAgY29uc3QgYm9keVNpemUgPSBnZXRCb2R5U2l6ZShyZXF1ZXN0LmJvZHksIGhlYWRlcnMpO1xuXG4gICAgY29uc3QgY2Fubm90SGF2ZUJvZHkgPSBbJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnXS5pbmNsdWRlcyhyZXF1ZXN0Lm1ldGhvZCk7XG5cbiAgICBpZiAoXG4gICAgICAhY2Fubm90SGF2ZUJvZHkgJiZcbiAgICAgICEhcmVxdWVzdC5ib2R5ICYmXG4gICAgICAhKCd0cmFuc2Zlci1lbmNvZGluZycgaW4gaGVhZGVycykgJiZcbiAgICAgICEoJ2NvbnRlbnQtbGVuZ3RoJyBpbiBoZWFkZXJzKSAmJlxuICAgICAgISFib2R5U2l6ZVxuICAgICkge1xuICAgICAgdGhpcy5fbG9nZ2VyLmRlYnVnKFxuICAgICAgICBgbWlzc2luZyAnY29udGVudC1sZW5ndGgnIGhlYWRlciwgc2V0dGluZyBpdCB0bzogJHtib2R5U2l6ZX1gLFxuICAgICAgKTtcbiAgICAgIGhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ10gPSBTdHJpbmcoYm9keVNpemUpO1xuICAgIH1cbiAgICByZXF1ZXN0LmhlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCByZXNwb25zZSBjb250ZW50IG1pbWUtdHlwZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBnZXRSZXNwb25zZUNvbnRlbnRUeXBlKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2UpOiBPcHRpb25hbDxzdHJpbmc+IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5fcmVzcG9uc2VUeXBlIHx8XG4gICAgICAocmVzcG9uc2UuaGVhZGVycyAmJiByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3JlcXVpcmUtYXdhaXRcbiAgYXN5bmMgcGFyc2VSZXNwb25zZUJvZHkocmVzcG9uc2U6IEh0dHBSZXNwb25zZSkge1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gdGhpcy5nZXRSZXNwb25zZUNvbnRlbnRUeXBlKHJlc3BvbnNlKSB8fCAnJztcbiAgICBjb25zdCBwYXJzZUJvZHkgPSAvXih0ZXh0fGFwcGxpY2F0aW9uKVxcL3htbCg7fCQpLy50ZXN0KGNvbnRlbnRUeXBlKVxuICAgICAgPyBwYXJzZVhNTFxuICAgICAgOiAvXmFwcGxpY2F0aW9uXFwvanNvbig7fCQpLy50ZXN0KGNvbnRlbnRUeXBlKVxuICAgICAgPyBwYXJzZUpTT05cbiAgICAgIDogL150ZXh0XFwvY3N2KDt8JCkvLnRlc3QoY29udGVudFR5cGUpXG4gICAgICA/IHBhcnNlQ1NWXG4gICAgICA6IHBhcnNlVGV4dDtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHBhcnNlQm9keShyZXNwb25zZS5ib2R5KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPKG5leHQgbWFqb3IpOiB3ZSBjb3VsZCB0aHJvdyBhIG5ldyBcImludmFsaWQgcmVzcG9uc2UgYm9keVwiIGVycm9yIGluc3RlYWQuXG4gICAgICB0aGlzLl9sb2dnZXIuZGVidWcoYEZhaWxlZCB0byBwYXJzZSBib2R5IG9mIGNvbnRlbnQtdHlwZTogJHtjb250ZW50VHlwZX0uIEVycm9yOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWApXG4gICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJlc3BvbnNlIGJvZHlcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgYXN5bmMgZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlOiBIdHRwUmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjA0KSB7XG4gICAgICAvLyBObyBDb250ZW50XG4gICAgICByZXR1cm4gdGhpcy5fbm9Db250ZW50UmVzcG9uc2U7XG4gICAgfVxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCB0aGlzLnBhcnNlUmVzcG9uc2VCb2R5KHJlc3BvbnNlKTtcbiAgICBsZXQgZXJyO1xuICAgIGlmICh0aGlzLmhhc0Vycm9ySW5SZXNwb25zZUJvZHkoYm9keSkpIHtcbiAgICAgIGVyciA9IGF3YWl0IHRoaXMuZ2V0RXJyb3IocmVzcG9uc2UsIGJvZHkpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMzAwKSB7XG4gICAgICAvLyBNdWx0aXBsZSBDaG9pY2VzXG4gICAgICB0aHJvdyBuZXcgSHR0cEFwaUVycm9yKFxuICAgICAgICAnTXVsdGlwbGUgcmVjb3JkcyBmb3VuZCcsXG4gICAgICAgICdNVUxUSVBMRV9DSE9JQ0VTJyxcbiAgICAgICAgYm9keSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBzZXNzaW9uIGV4cGlyeVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBpc1Nlc3Npb25FeHBpcmVkKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAxO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBlcnJvciByZXNwb25zZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBpc0Vycm9yUmVzcG9uc2UocmVzcG9uc2U6IEh0dHBSZXNwb25zZSkge1xuICAgIHJldHVybiByZXNwb25zZS5zdGF0dXNDb2RlID49IDQwMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3QgZXJyb3IgaW4gcmVzcG9uc2UgYm9keVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBoYXNFcnJvckluUmVzcG9uc2VCb2R5KF9ib2R5OiBPcHRpb25hbDxzdHJpbmc+KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNpbmcgZXJyb3IgbWVzc2FnZSBpbiByZXNwb25zZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwYXJzZUVycm9yKGJvZHk6IGFueSkge1xuICAgIGNvbnN0IGVycm9ycyA9IGJvZHk7XG5cbiAgICAvLyBYTUwgcmVzcG9uc2VcbiAgICBpZiAoZXJyb3JzLkVycm9ycykge1xuICAgICAgcmV0dXJuIGVycm9ycy5FcnJvcnMuRXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZXJyb3IgbWVzc2FnZSBpbiByZXNwb25zZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBhc3luYyBnZXRFcnJvcihyZXNwb25zZTogSHR0cFJlc3BvbnNlLCBib2R5PzogYW55KTogUHJvbWlzZTxFcnJvcj4ge1xuICAgIGxldCBlcnJvcjtcbiAgICB0cnkge1xuICAgICAgZXJyb3IgPSB0aGlzLnBhcnNlRXJyb3IoYm9keSB8fCAoYXdhaXQgdGhpcy5wYXJzZVJlc3BvbnNlQm9keShyZXNwb25zZSkpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eVxuICAgIH1cbiAgICBcbiAgICBpZiAoQXJyYXkuaXNBcnJheShlcnJvcikpIHtcbiAgICAgIGlmIChlcnJvci5sZW5ndGggPT09IDEpe1xuICAgICAgICBlcnJvciA9IGVycm9yWzBdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IEh0dHBBcGlFcnJvcihcbiAgICAgICAgICBgTXVsdGlwbGUgZXJyb3JzIHJldHVybmVkLlxuICBDaGVjayBcXGBlcnJvci5kYXRhXFxgIGZvciB0aGUgZXJyb3IgZGV0YWlsc2AsICdNVUxUSVBMRV9BUElfRVJST1JTJywgZXJyb3IpICAgXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXJyb3IgPVxuICAgICAgdHlwZW9mIGVycm9yID09PSAnb2JqZWN0JyAmJlxuICAgICAgZXJyb3IgIT09IG51bGwgJiZcbiAgICAgIHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGVycm9yXG4gICAgICAgIDoge1xuICAgICAgICAgICAgZXJyb3JDb2RlOiBgRVJST1JfSFRUUF8ke3Jlc3BvbnNlLnN0YXR1c0NvZGV9YCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHksXG4gICAgICAgICAgfTtcblxuICAgIGlmIChyZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9PT0gJ3RleHQvaHRtbCcpIHtcbiAgICAgIHRoaXMuX2xvZ2dlci5kZWJ1ZyhgaHRtbCByZXNwb25zZS5ib2R5OiAke3Jlc3BvbnNlLmJvZHl9YCk7XG4gICAgICByZXR1cm4gbmV3IEh0dHBBcGlFcnJvcihcbiAgICAgICAgYEhUVFAgcmVzcG9uc2UgY29udGFpbnMgaHRtbCBjb250ZW50LlxuQ2hlY2sgdGhhdCB0aGUgb3JnIGV4aXN0cyBhbmQgY2FuIGJlIHJlYWNoZWQuXG5TZWUgXFxgZXJyb3IuZGF0YVxcYCBmb3IgdGhlIGZ1bGwgaHRtbCByZXNwb25zZS5gLFxuICAgICAgICBlcnJvci5lcnJvckNvZGUsXG4gICAgICAgIGVycm9yLm1lc3NhZ2UsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEh0dHBBcGlFcnJvciA/IGVycm9yIDogbmV3IEh0dHBBcGlFcnJvcihlcnJvci5tZXNzYWdlLCBlcnJvci5lcnJvckNvZGUsIGVycm9yKTtcbiAgfVxufVxuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEh0dHBBcGlFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgLyoqXG4gICAqIFRoaXMgY29udGFpbnMgZXJyb3Itc3BlY2lmaWMgZGV0YWlscywgdXN1YWxseSByZXR1cm5lZCBmcm9tIHRoZSBBUEkuXG4gICAqL1xuICBkYXRhOiBhbnlcbiAgZXJyb3JDb2RlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBlcnJvckNvZGU/OiBzdHJpbmcgfCB1bmRlZmluZWQsIGRhdGE/OiBhbnkpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSBlcnJvckNvZGUgfHwgdGhpcy5uYW1lO1xuICAgIHRoaXMuZXJyb3JDb2RlID0gdGhpcy5uYW1lO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgKHY0KVxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgYGVycm9yLmRhdGFgIGluc3RlYWRcbiAgICovXG4gIGdldCBjb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cbn1cblxuZXhwb3J0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