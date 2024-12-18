import "core-js/modules/es.array.push.js";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
import _get from "@babel/runtime-corejs3/helpers/get";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
var _excluded = ["url", "body"];
var _ref, _ref2, _ref3, _process$env$https_pr;
function ownKeys(e, r) { var t = _Object$keys2(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import _parseInt from "@babel/runtime-corejs3/core-js-stable/parse-int";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _Object$keys2 from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Date$now from "@babel/runtime-corejs3/core-js-stable/date/now";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import "core-js/modules/es.regexp.exec.js";
/**
 *
 */

import request, { setDefaults } from './request';
import { StreamPromise } from './util/promise';
import jsonp from './browser/jsonp';
import canvas from './browser/canvas';

/**
 * Normarize Salesforce API host name
 * @private
 */
function normalizeApiHost(apiHost) {
  var m = /(\w+)\.(visual\.force|salesforce)\.com$/.exec(apiHost);
  if (m) {
    return "".concat(m[1], ".salesforce.com");
  }
  return apiHost;
}
setDefaults({
  httpProxy: (_ref = (_ref2 = (_ref3 = (_process$env$https_pr = process.env.https_proxy) !== null && _process$env$https_pr !== void 0 ? _process$env$https_pr : process.env.http_proxy) !== null && _ref3 !== void 0 ? _ref3 : process.env.HTTPS_PROXY) !== null && _ref2 !== void 0 ? _ref2 : process.env.HTTP_PROXY) !== null && _ref !== void 0 ? _ref : undefined,
  timeout: process.env.HTTP_TIMEOUT ? _parseInt(process.env.HTTP_TIMEOUT, 10) : undefined,
  followRedirect: true
});
var baseUrl = typeof window !== 'undefined' && window.location && window.location.host ? "https://".concat(normalizeApiHost(window.location.host)) : process.env.LOCATION_BASE_URL || '';

/**
 * Class for HTTP request transport
 *
 * @class
 * @protected
 */
export var Transport = /*#__PURE__*/function () {
  function Transport() {
    _classCallCheck(this, Transport);
  }
  return _createClass(Transport, [{
    key: "httpRequest",
    value:
    /**
     */
    function httpRequest(req) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return StreamPromise.create(function () {
        var createStream = _this.getRequestStreamCreator();
        var stream = createStream(req, options);
        var promise = new _Promise(function (resolve, reject) {
          stream.on('complete', function (res) {
            return resolve(res);
          }).on('error', reject);
        });
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
    key: "getRequestStreamCreator",
    value: function getRequestStreamCreator() {
      return request;
    }
  }]);
}();

/**
 * Class for JSONP request transport
 */
export var JsonpTransport = /*#__PURE__*/function (_Transport) {
  function JsonpTransport(jsonpParam) {
    var _this2;
    _classCallCheck(this, JsonpTransport);
    _this2 = _callSuper(this, JsonpTransport);
    _this2._jsonpParam = jsonpParam;
    return _this2;
  }
  _inherits(JsonpTransport, _Transport);
  return _createClass(JsonpTransport, [{
    key: "getRequestStreamCreator",
    value: function getRequestStreamCreator() {
      var jsonpRequest = jsonp.createRequest(this._jsonpParam);
      return function (params) {
        return jsonpRequest(params);
      };
    }
  }]);
}(Transport);

/**
 * Class for Sfdc Canvas request transport
 */
_defineProperty(JsonpTransport, "supprted", jsonp.supported);
export var CanvasTransport = /*#__PURE__*/function (_Transport2) {
  function CanvasTransport(signedRequest) {
    var _this3;
    _classCallCheck(this, CanvasTransport);
    _this3 = _callSuper(this, CanvasTransport);
    _this3._signedRequest = signedRequest;
    return _this3;
  }
  _inherits(CanvasTransport, _Transport2);
  return _createClass(CanvasTransport, [{
    key: "getRequestStreamCreator",
    value: function getRequestStreamCreator() {
      var canvasRequest = canvas.createRequest(this._signedRequest);
      return function (params) {
        return canvasRequest(params);
      };
    }
  }]);
}(Transport);

/* @private */
_defineProperty(CanvasTransport, "supported", canvas.supported);
function createXdProxyRequest(req, proxyUrl) {
  var _context, _context2;
  var headers = {
    'salesforceproxy-endpoint': req.url
  };
  if (req.headers) {
    for (var _i = 0, _Object$keys = _Object$keys2(req.headers); _i < _Object$keys.length; _i++) {
      var name = _Object$keys[_i];
      headers[name] = req.headers[name];
    }
  }
  var nocache = _concatInstanceProperty(_context = "".concat(_Date$now(), ".")).call(_context, String(Math.random()).substring(2));
  return _objectSpread({
    method: req.method,
    url: _concatInstanceProperty(_context2 = "".concat(proxyUrl, "?")).call(_context2, nocache),
    headers: headers
  }, req.body != null ? {
    body: req.body
  } : {});
}

/**
 * Class for HTTP request transport using cross-domain AJAX proxy service
 */
export var XdProxyTransport = /*#__PURE__*/function (_Transport3) {
  function XdProxyTransport(xdProxyUrl) {
    var _this4;
    _classCallCheck(this, XdProxyTransport);
    _this4 = _callSuper(this, XdProxyTransport);
    _this4._xdProxyUrl = xdProxyUrl;
    return _this4;
  }

  /**
   * Make HTTP request via AJAX proxy
   */
  _inherits(XdProxyTransport, _Transport3);
  return _createClass(XdProxyTransport, [{
    key: "httpRequest",
    value: function httpRequest(req) {
      var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var xdProxyUrl = this._xdProxyUrl;
      var url = req.url,
        body = req.body,
        rreq = _objectWithoutProperties(req, _excluded);
      var canonicalUrl = _startsWithInstanceProperty(url).call(url, '/') ? baseUrl + url : url;
      var xdProxyReq = createXdProxyRequest(_objectSpread(_objectSpread({}, rreq), {}, {
        url: canonicalUrl,
        body: body
      }), xdProxyUrl);
      return _get(_getPrototypeOf(XdProxyTransport.prototype), "httpRequest", this).call(this, xdProxyReq, {
        followRedirect: function followRedirect(redirectUrl) {
          return createXdProxyRequest(_objectSpread(_objectSpread({}, rreq), {}, {
            method: 'GET',
            url: redirectUrl
          }), xdProxyUrl);
        }
      });
    }
  }]);
}(Transport);

/**
 * Class for HTTP request transport using a proxy server
 */
export var HttpProxyTransport = /*#__PURE__*/function (_Transport4) {
  function HttpProxyTransport(httpProxy) {
    var _this5;
    _classCallCheck(this, HttpProxyTransport);
    _this5 = _callSuper(this, HttpProxyTransport);
    _this5._httpProxy = httpProxy;
    return _this5;
  }

  /**
   * Make HTTP request via proxy server
   */
  _inherits(HttpProxyTransport, _Transport4);
  return _createClass(HttpProxyTransport, [{
    key: "httpRequest",
    value: function httpRequest(req) {
      var options_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = _objectSpread(_objectSpread({}, options_), {}, {
        httpProxy: this._httpProxy
      });
      return _get(_getPrototypeOf(HttpProxyTransport.prototype), "httpRequest", this).call(this, req, options);
    }
  }]);
}(Transport);
export default Transport;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1ZXN0Iiwic2V0RGVmYXVsdHMiLCJTdHJlYW1Qcm9taXNlIiwianNvbnAiLCJjYW52YXMiLCJub3JtYWxpemVBcGlIb3N0IiwiYXBpSG9zdCIsIm0iLCJleGVjIiwiY29uY2F0IiwiaHR0cFByb3h5IiwiX3JlZiIsIl9yZWYyIiwiX3JlZjMiLCJfcHJvY2VzcyRlbnYkaHR0cHNfcHIiLCJwcm9jZXNzIiwiZW52IiwiaHR0cHNfcHJveHkiLCJodHRwX3Byb3h5IiwiSFRUUFNfUFJPWFkiLCJIVFRQX1BST1hZIiwidW5kZWZpbmVkIiwidGltZW91dCIsIkhUVFBfVElNRU9VVCIsIl9wYXJzZUludCIsImZvbGxvd1JlZGlyZWN0IiwiYmFzZVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaG9zdCIsIkxPQ0FUSU9OX0JBU0VfVVJMIiwiVHJhbnNwb3J0IiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJodHRwUmVxdWVzdCIsInJlcSIsIl90aGlzIiwib3B0aW9ucyIsImFyZ3VtZW50cyIsImxlbmd0aCIsImNyZWF0ZSIsImNyZWF0ZVN0cmVhbSIsImdldFJlcXVlc3RTdHJlYW1DcmVhdG9yIiwic3RyZWFtIiwicHJvbWlzZSIsIl9Qcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uIiwicmVzIiwiSnNvbnBUcmFuc3BvcnQiLCJfVHJhbnNwb3J0IiwianNvbnBQYXJhbSIsIl90aGlzMiIsIl9jYWxsU3VwZXIiLCJfanNvbnBQYXJhbSIsIl9pbmhlcml0cyIsImpzb25wUmVxdWVzdCIsImNyZWF0ZVJlcXVlc3QiLCJwYXJhbXMiLCJfZGVmaW5lUHJvcGVydHkiLCJzdXBwb3J0ZWQiLCJDYW52YXNUcmFuc3BvcnQiLCJfVHJhbnNwb3J0MiIsInNpZ25lZFJlcXVlc3QiLCJfdGhpczMiLCJfc2lnbmVkUmVxdWVzdCIsImNhbnZhc1JlcXVlc3QiLCJjcmVhdGVYZFByb3h5UmVxdWVzdCIsInByb3h5VXJsIiwiX2NvbnRleHQiLCJfY29udGV4dDIiLCJoZWFkZXJzIiwidXJsIiwiX2kiLCJfT2JqZWN0JGtleXMiLCJfT2JqZWN0JGtleXMyIiwibmFtZSIsIm5vY2FjaGUiLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsIl9EYXRlJG5vdyIsImNhbGwiLCJTdHJpbmciLCJNYXRoIiwicmFuZG9tIiwic3Vic3RyaW5nIiwiX29iamVjdFNwcmVhZCIsIm1ldGhvZCIsImJvZHkiLCJYZFByb3h5VHJhbnNwb3J0IiwiX1RyYW5zcG9ydDMiLCJ4ZFByb3h5VXJsIiwiX3RoaXM0IiwiX3hkUHJveHlVcmwiLCJfb3B0aW9ucyIsInJyZXEiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfZXhjbHVkZWQiLCJjYW5vbmljYWxVcmwiLCJfc3RhcnRzV2l0aEluc3RhbmNlUHJvcGVydHkiLCJ4ZFByb3h5UmVxIiwiX2dldCIsIl9nZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsInJlZGlyZWN0VXJsIiwiSHR0cFByb3h5VHJhbnNwb3J0IiwiX1RyYW5zcG9ydDQiLCJfdGhpczUiLCJfaHR0cFByb3h5Iiwib3B0aW9uc18iXSwic291cmNlcyI6WyIuLi9zcmMvdHJhbnNwb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqL1xuaW1wb3J0IHsgRHVwbGV4IH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCByZXF1ZXN0LCB7IHNldERlZmF1bHRzIH0gZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0LCBIdHRwUmVxdWVzdE9wdGlvbnMsIEh0dHBSZXNwb25zZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgU3RyZWFtUHJvbWlzZSB9IGZyb20gJy4vdXRpbC9wcm9taXNlJztcbmltcG9ydCBqc29ucCBmcm9tICcuL2Jyb3dzZXIvanNvbnAnO1xuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2Jyb3dzZXIvY2FudmFzJztcblxuLyoqXG4gKiBOb3JtYXJpemUgU2FsZXNmb3JjZSBBUEkgaG9zdCBuYW1lXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVBcGlIb3N0KGFwaUhvc3Q6IHN0cmluZykge1xuICBjb25zdCBtID0gLyhcXHcrKVxcLih2aXN1YWxcXC5mb3JjZXxzYWxlc2ZvcmNlKVxcLmNvbSQvLmV4ZWMoYXBpSG9zdCk7XG4gIGlmIChtKSB7XG4gICAgcmV0dXJuIGAke21bMV19LnNhbGVzZm9yY2UuY29tYDtcbiAgfVxuICByZXR1cm4gYXBpSG9zdDtcbn1cblxuc2V0RGVmYXVsdHMoe1xuICBodHRwUHJveHk6IHByb2Nlc3MuZW52Lmh0dHBzX3Byb3h5ID8/IHByb2Nlc3MuZW52Lmh0dHBfcHJveHkgPz8gcHJvY2Vzcy5lbnYuSFRUUFNfUFJPWFkgPz8gcHJvY2Vzcy5lbnYuSFRUUF9QUk9YWSA/PyB1bmRlZmluZWQsXG4gIHRpbWVvdXQ6IHByb2Nlc3MuZW52LkhUVFBfVElNRU9VVFxuICAgID8gcGFyc2VJbnQocHJvY2Vzcy5lbnYuSFRUUF9USU1FT1VULCAxMClcbiAgICA6IHVuZGVmaW5lZCxcbiAgZm9sbG93UmVkaXJlY3Q6IHRydWUsXG59KTtcblxuY29uc3QgYmFzZVVybCA9XG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaG9zdFxuICAgID8gYGh0dHBzOi8vJHtub3JtYWxpemVBcGlIb3N0KHdpbmRvdy5sb2NhdGlvbi5ob3N0KX1gXG4gICAgOiBwcm9jZXNzLmVudi5MT0NBVElPTl9CQVNFX1VSTCB8fCAnJztcblxuLyoqXG4gKiBDbGFzcyBmb3IgSFRUUCByZXF1ZXN0IHRyYW5zcG9ydFxuICpcbiAqIEBjbGFzc1xuICogQHByb3RlY3RlZFxuICovXG5leHBvcnQgY2xhc3MgVHJhbnNwb3J0IHtcbiAgLyoqXG4gICAqL1xuICBodHRwUmVxdWVzdChcbiAgICByZXE6IEh0dHBSZXF1ZXN0LFxuICAgIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9LFxuICApOiBTdHJlYW1Qcm9taXNlPEh0dHBSZXNwb25zZT4ge1xuICAgIHJldHVybiBTdHJlYW1Qcm9taXNlLmNyZWF0ZSgoKSA9PiB7XG4gICAgICBjb25zdCBjcmVhdGVTdHJlYW0gPSB0aGlzLmdldFJlcXVlc3RTdHJlYW1DcmVhdG9yKCk7XG4gICAgICBjb25zdCBzdHJlYW0gPSBjcmVhdGVTdHJlYW0ocmVxLCBvcHRpb25zKTtcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxIdHRwUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RyZWFtXG4gICAgICAgICAgLm9uKCdjb21wbGV0ZScsIChyZXM6IEh0dHBSZXNwb25zZSkgPT4gcmVzb2x2ZShyZXMpKVxuICAgICAgICAgIC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4geyBzdHJlYW0sIHByb21pc2UgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBnZXRSZXF1ZXN0U3RyZWFtQ3JlYXRvcigpOiAoXG4gICAgcmVxOiBIdHRwUmVxdWVzdCxcbiAgICBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMsXG4gICkgPT4gRHVwbGV4IHtcbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIGZvciBKU09OUCByZXF1ZXN0IHRyYW5zcG9ydFxuICovXG5leHBvcnQgY2xhc3MgSnNvbnBUcmFuc3BvcnQgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICBzdGF0aWMgc3VwcHJ0ZWQ6IGJvb2xlYW4gPSBqc29ucC5zdXBwb3J0ZWQ7XG4gIF9qc29ucFBhcmFtOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoanNvbnBQYXJhbTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9qc29ucFBhcmFtID0ganNvbnBQYXJhbTtcbiAgfVxuXG4gIGdldFJlcXVlc3RTdHJlYW1DcmVhdG9yKCk6IChcbiAgICByZXE6IEh0dHBSZXF1ZXN0LFxuICAgIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyxcbiAgKSA9PiBEdXBsZXgge1xuICAgIGNvbnN0IGpzb25wUmVxdWVzdCA9IGpzb25wLmNyZWF0ZVJlcXVlc3QodGhpcy5fanNvbnBQYXJhbSk7XG4gICAgcmV0dXJuIChwYXJhbXMpID0+IGpzb25wUmVxdWVzdChwYXJhbXMpO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgZm9yIFNmZGMgQ2FudmFzIHJlcXVlc3QgdHJhbnNwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBDYW52YXNUcmFuc3BvcnQgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICBzdGF0aWMgc3VwcG9ydGVkOiBib29sZWFuID0gY2FudmFzLnN1cHBvcnRlZDtcbiAgX3NpZ25lZFJlcXVlc3Q6IGFueTtcblxuICBjb25zdHJ1Y3RvcihzaWduZWRSZXF1ZXN0OiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3NpZ25lZFJlcXVlc3QgPSBzaWduZWRSZXF1ZXN0O1xuICB9XG5cbiAgZ2V0UmVxdWVzdFN0cmVhbUNyZWF0b3IoKTogKFxuICAgIHJlcTogSHR0cFJlcXVlc3QsXG4gICAgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zLFxuICApID0+IER1cGxleCB7XG4gICAgY29uc3QgY2FudmFzUmVxdWVzdCA9IGNhbnZhcy5jcmVhdGVSZXF1ZXN0KHRoaXMuX3NpZ25lZFJlcXVlc3QpO1xuICAgIHJldHVybiAocGFyYW1zKSA9PiBjYW52YXNSZXF1ZXN0KHBhcmFtcyk7XG4gIH1cbn1cblxuLyogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIGNyZWF0ZVhkUHJveHlSZXF1ZXN0KHJlcTogSHR0cFJlcXVlc3QsIHByb3h5VXJsOiBzdHJpbmcpOiBIdHRwUmVxdWVzdCB7XG4gIGNvbnN0IGhlYWRlcnM6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgICdzYWxlc2ZvcmNlcHJveHktZW5kcG9pbnQnOiByZXEudXJsLFxuICB9O1xuICBpZiAocmVxLmhlYWRlcnMpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMocmVxLmhlYWRlcnMpKSB7XG4gICAgICBoZWFkZXJzW25hbWVdID0gcmVxLmhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9XG4gIGNvbnN0IG5vY2FjaGUgPSBgJHtEYXRlLm5vdygpfS4ke1N0cmluZyhNYXRoLnJhbmRvbSgpKS5zdWJzdHJpbmcoMil9YDtcbiAgcmV0dXJuIHtcbiAgICBtZXRob2Q6IHJlcS5tZXRob2QsXG4gICAgdXJsOiBgJHtwcm94eVVybH0/JHtub2NhY2hlfWAsXG4gICAgaGVhZGVycyxcbiAgICAuLi4ocmVxLmJvZHkgIT0gbnVsbCA/IHsgYm9keTogcmVxLmJvZHkgfSA6IHt9KSxcbiAgfTtcbn1cblxuLyoqXG4gKiBDbGFzcyBmb3IgSFRUUCByZXF1ZXN0IHRyYW5zcG9ydCB1c2luZyBjcm9zcy1kb21haW4gQUpBWCBwcm94eSBzZXJ2aWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBYZFByb3h5VHJhbnNwb3J0IGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgX3hkUHJveHlVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih4ZFByb3h5VXJsOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3hkUHJveHlVcmwgPSB4ZFByb3h5VXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgSFRUUCByZXF1ZXN0IHZpYSBBSkFYIHByb3h5XG4gICAqL1xuICBodHRwUmVxdWVzdChyZXE6IEh0dHBSZXF1ZXN0LCBfb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB4ZFByb3h5VXJsID0gdGhpcy5feGRQcm94eVVybDtcbiAgICBjb25zdCB7IHVybCwgYm9keSwgLi4ucnJlcSB9ID0gcmVxO1xuICAgIGNvbnN0IGNhbm9uaWNhbFVybCA9IHVybC5zdGFydHNXaXRoKCcvJykgPyBiYXNlVXJsICsgdXJsIDogdXJsO1xuICAgIGNvbnN0IHhkUHJveHlSZXEgPSBjcmVhdGVYZFByb3h5UmVxdWVzdChcbiAgICAgIHsgLi4ucnJlcSwgdXJsOiBjYW5vbmljYWxVcmwsIGJvZHkgfSxcbiAgICAgIHhkUHJveHlVcmwsXG4gICAgKTtcbiAgICByZXR1cm4gc3VwZXIuaHR0cFJlcXVlc3QoeGRQcm94eVJlcSwge1xuICAgICAgZm9sbG93UmVkaXJlY3Q6IChyZWRpcmVjdFVybCkgPT5cbiAgICAgICAgY3JlYXRlWGRQcm94eVJlcXVlc3QoXG4gICAgICAgICAgeyAuLi5ycmVxLCBtZXRob2Q6ICdHRVQnLCB1cmw6IHJlZGlyZWN0VXJsIH0sXG4gICAgICAgICAgeGRQcm94eVVybCxcbiAgICAgICAgKSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIGZvciBIVFRQIHJlcXVlc3QgdHJhbnNwb3J0IHVzaW5nIGEgcHJveHkgc2VydmVyXG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwUHJveHlUcmFuc3BvcnQgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICBfaHR0cFByb3h5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoaHR0cFByb3h5OiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2h0dHBQcm94eSA9IGh0dHBQcm94eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIEhUVFAgcmVxdWVzdCB2aWEgcHJveHkgc2VydmVyXG4gICAqL1xuICBodHRwUmVxdWVzdChyZXE6IEh0dHBSZXF1ZXN0LCBvcHRpb25zXzogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBvcHRpb25zID0geyAuLi5vcHRpb25zXywgaHR0cFByb3h5OiB0aGlzLl9odHRwUHJveHkgfTtcbiAgICByZXR1cm4gc3VwZXIuaHR0cFJlcXVlc3QocmVxLCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmFuc3BvcnQ7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSxPQUFP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