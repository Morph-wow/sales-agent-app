import "core-js/modules/es.array.push.js";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context5, _context6; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context5 = ownKeys(Object(t), !0)).call(_context5, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context6 = ownKeys(Object(t))).call(_context6, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * @file Manages Salesforce Chatter REST API calls
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { registerModule } from '../jsforce';
import { isObject } from '../util/function';

/**
 *
 */
/*--------------------------------------------*/
/**
 * A class representing chatter API request
 */
var Request = /*#__PURE__*/function () {
  function Request(chatter, request) {
    _classCallCheck(this, Request);
    this._chatter = chatter;
    this._request = request;
  }

  /**
   * Retrieve parameters in batch request form
   */
  return _createClass(Request, [{
    key: "batchParams",
    value: function batchParams() {
      var _this$_request = this._request,
        method = _this$_request.method,
        url = _this$_request.url,
        body = _this$_request.body;
      return _objectSpread({
        method: method,
        url: this._chatter._normalizeUrl(url)
      }, typeof body !== 'undefined' ? {
        richInput: body
      } : {});
    }

    /**
     * Retrieve parameters in batch request form
     *
     * @method Chatter~Request#promise
     * @returns {Promise.<Chatter~RequestResult>}
     */
  }, {
    key: "promise",
    value: function promise() {
      return this._promise || (this._promise = this._chatter._request(this._request));
    }

    /**
     * Returns Node.js Stream object for request
     *
     * @method Chatter~Request#stream
     * @returns {stream.Stream}
     */
  }, {
    key: "stream",
    value: function stream() {
      return this._chatter._request(this._request).stream();
    }

    /**
     * Promise/A+ interface
     * http://promises-aplus.github.io/promises-spec/
     *
     * Delegate to deferred promise, return promise instance for batch result
     */
  }, {
    key: "then",
    value: function then(onResolve, onReject) {
      return this.promise().then(onResolve, onReject);
    }
  }]);
}();
function apppendQueryParamsToUrl(url, queryParams) {
  if (queryParams) {
    var _context;
    var qstring = _mapInstanceProperty(_context = _Object$keys(queryParams)).call(_context, function (name) {
      var _context2, _queryParams$name;
      return _concatInstanceProperty(_context2 = "".concat(name, "=")).call(_context2, encodeURIComponent(String((_queryParams$name = queryParams[name]) !== null && _queryParams$name !== void 0 ? _queryParams$name : '')));
    }).join('&');
    url += (_indexOfInstanceProperty(url).call(url, '?') > 0 ? '&' : '?') + qstring;
  }
  return url;
}

/*------------------------------*/
export var Resource = /*#__PURE__*/function (_Request) {
  /**
   *
   */
  function Resource(chatter, url, queryParams) {
    var _this;
    _classCallCheck(this, Resource);
    _this = _callSuper(this, Resource, [chatter, {
      method: 'GET',
      url: apppendQueryParamsToUrl(url, queryParams)
    }]);
    /**
     * Synonym of Resource#destroy()
     */
    _defineProperty(_this, "delete", _this.destroy);
    /**
     * Synonym of Resource#destroy()
     */
    _defineProperty(_this, "del", _this.destroy);
    _this._url = _this._request.url;
    return _this;
  }

  /**
   * Create a new resource
   */
  _inherits(Resource, _Request);
  return _createClass(Resource, [{
    key: "create",
    value: function create(data) {
      return this._chatter.request({
        method: 'POST',
        url: this._url,
        body: data
      });
    }

    /**
     * Retrieve resource content
     */
  }, {
    key: "retrieve",
    value: function retrieve() {
      return this._chatter.request({
        method: 'GET',
        url: this._url
      });
    }

    /**
     * Update specified resource
     */
  }, {
    key: "update",
    value: function update(data) {
      return this._chatter.request({
        method: 'POST',
        url: this._url,
        body: data
      });
    }

    /**
     * Delete specified resource
     */
  }, {
    key: "destroy",
    value: function destroy() {
      return this._chatter.request({
        method: 'DELETE',
        url: this._url
      });
    }
  }]);
}(Request);

/*------------------------------*/
/**
 * API class for Chatter REST API call
 */
export var Chatter = /*#__PURE__*/function () {
  /**
   *
   */
  function Chatter(conn) {
    _classCallCheck(this, Chatter);
    this._conn = conn;
  }

  /**
   * Sending request to API endpoint
   * @private
   */
  return _createClass(Chatter, [{
    key: "_request",
    value: function _request(req_) {
      var method = req_.method,
        url_ = req_.url,
        headers_ = req_.headers,
        body_ = req_.body;
      var headers = headers_ !== null && headers_ !== void 0 ? headers_ : {};
      var body;
      if (/^(put|post|patch)$/i.test(method)) {
        if (isObject(body_)) {
          headers = _objectSpread(_objectSpread({}, headers_), {}, {
            'Content-Type': 'application/json'
          });
          body = _JSON$stringify(body_);
        } else {
          body = body_;
        }
      }
      var url = this._normalizeUrl(url_);
      return this._conn.request({
        method: method,
        url: url,
        headers: headers,
        body: body
      });
    }

    /**
     * Convert path to site root relative url
     * @private
     */
  }, {
    key: "_normalizeUrl",
    value: function _normalizeUrl(url) {
      if (_startsWithInstanceProperty(url).call(url, '/chatter/') || _startsWithInstanceProperty(url).call(url, '/connect/')) {
        return '/services/data/v' + this._conn.version + url;
      } else if (/^\/v[\d]+\.[\d]+\//.test(url)) {
        return '/services/data' + url;
      } else if (!_startsWithInstanceProperty(url).call(url, '/services/') && _startsWithInstanceProperty(url).call(url, '/')) {
        return '/services/data/v' + this._conn.version + '/chatter' + url;
      } else {
        return url;
      }
    }

    /**
     * Make a request for chatter API resource
     */
  }, {
    key: "request",
    value: function request(req) {
      return new Request(this, req);
    }

    /**
     * Make a resource request to chatter API
     */
  }, {
    key: "resource",
    value: function resource(url, queryParams) {
      return new Resource(this, url, queryParams);
    }

    /**
     * Make a batch request to chatter API
     */
  }, {
    key: "batch",
    value: (function () {
      var _batch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(requests) {
        var _context3;
        var deferreds, res;
        return _regeneratorRuntime.wrap(function _callee$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              deferreds = _mapInstanceProperty(requests).call(requests, function (request) {
                var deferred = defer();
                request._promise = deferred.promise;
                return deferred;
              });
              _context4.next = 3;
              return this.request({
                method: 'POST',
                url: this._normalizeUrl('/connect/batch'),
                body: {
                  batchRequests: _mapInstanceProperty(requests).call(requests, function (request) {
                    return request.batchParams();
                  })
                }
              });
            case 3:
              res = _context4.sent;
              _forEachInstanceProperty(_context3 = res.results).call(_context3, function (result, i) {
                var deferred = deferreds[i];
                if (result.statusCode >= 400) {
                  deferred.reject(result.result);
                } else {
                  deferred.resolve(result.result);
                }
              });
              return _context4.abrupt("return", res);
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee, this);
      }));
      function batch(_x) {
        return _batch.apply(this, arguments);
      }
      return batch;
    }())
  }]);
}();
function defer() {
  var resolve_ = function resolve_() {};
  var reject_ = function reject_() {};
  var promise = new _Promise(function (resolve, reject) {
    resolve_ = resolve;
    reject_ = reject;
  });
  return {
    promise: promise,
    resolve: resolve_,
    reject: reject_
  };
}

/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
registerModule('chatter', function (conn) {
  return new Chatter(conn);
});
export default Chatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWdpc3Rlck1vZHVsZSIsImlzT2JqZWN0IiwiUmVxdWVzdCIsImNoYXR0ZXIiLCJyZXF1ZXN0IiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NoYXR0ZXIiLCJfcmVxdWVzdCIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiYmF0Y2hQYXJhbXMiLCJfdGhpcyRfcmVxdWVzdCIsIm1ldGhvZCIsInVybCIsImJvZHkiLCJfb2JqZWN0U3ByZWFkIiwiX25vcm1hbGl6ZVVybCIsInJpY2hJbnB1dCIsInByb21pc2UiLCJfcHJvbWlzZSIsInN0cmVhbSIsInRoZW4iLCJvblJlc29sdmUiLCJvblJlamVjdCIsImFwcHBlbmRRdWVyeVBhcmFtc1RvVXJsIiwicXVlcnlQYXJhbXMiLCJfY29udGV4dCIsInFzdHJpbmciLCJfbWFwSW5zdGFuY2VQcm9wZXJ0eSIsIl9PYmplY3Qka2V5cyIsImNhbGwiLCJuYW1lIiwiX2NvbnRleHQyIiwiX3F1ZXJ5UGFyYW1zJG5hbWUiLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsImNvbmNhdCIsImVuY29kZVVSSUNvbXBvbmVudCIsIlN0cmluZyIsImpvaW4iLCJfaW5kZXhPZkluc3RhbmNlUHJvcGVydHkiLCJSZXNvdXJjZSIsIl9SZXF1ZXN0IiwiX3RoaXMiLCJfY2FsbFN1cGVyIiwiX2RlZmluZVByb3BlcnR5IiwiZGVzdHJveSIsIl91cmwiLCJfaW5oZXJpdHMiLCJjcmVhdGUiLCJkYXRhIiwicmV0cmlldmUiLCJ1cGRhdGUiLCJDaGF0dGVyIiwiY29ubiIsIl9jb25uIiwicmVxXyIsInVybF8iLCJoZWFkZXJzXyIsImhlYWRlcnMiLCJib2R5XyIsInRlc3QiLCJfSlNPTiRzdHJpbmdpZnkiLCJfc3RhcnRzV2l0aEluc3RhbmNlUHJvcGVydHkiLCJ2ZXJzaW9uIiwicmVxIiwicmVzb3VyY2UiLCJfYmF0Y2giLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsInJlcXVlc3RzIiwiX2NvbnRleHQzIiwiZGVmZXJyZWRzIiwicmVzIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQ0IiwicHJldiIsIm5leHQiLCJkZWZlcnJlZCIsImRlZmVyIiwiYmF0Y2hSZXF1ZXN0cyIsInNlbnQiLCJfZm9yRWFjaEluc3RhbmNlUHJvcGVydHkiLCJyZXN1bHRzIiwicmVzdWx0IiwiaSIsInN0YXR1c0NvZGUiLCJyZWplY3QiLCJyZXNvbHZlIiwiYWJydXB0Iiwic3RvcCIsImJhdGNoIiwiX3giLCJhcHBseSIsImFyZ3VtZW50cyIsInJlc29sdmVfIiwicmVqZWN0XyIsIl9Qcm9taXNlIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS9jaGF0dGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgTWFuYWdlcyBTYWxlc2ZvcmNlIENoYXR0ZXIgUkVTVCBBUEkgY2FsbHNcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5pbXBvcnQgeyByZWdpc3Rlck1vZHVsZSB9IGZyb20gJy4uL2pzZm9yY2UnO1xuaW1wb3J0IENvbm5lY3Rpb24gZnJvbSAnLi4vY29ubmVjdGlvbic7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdCwgU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi91dGlsL2Z1bmN0aW9uJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgdHlwZSBDaGF0dGVyUmVxdWVzdFBhcmFtcyA9IE9taXQ8SHR0cFJlcXVlc3QsICdib2R5Jz4gJiB7XG4gIGJvZHk/OiBzdHJpbmcgfCBvYmplY3QgfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgQmF0Y2hSZXF1ZXN0UGFyYW1zID0ge1xuICBtZXRob2Q6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIHJpY2hJbnB1dD86IGFueTtcbn07XG5cbnR5cGUgQmF0Y2hSZXF1ZXN0VHVwcGxlPFMgZXh0ZW5kcyBTY2hlbWEsIFJUIGV4dGVuZHMgYW55W10+ID0ge1xuICBbSyBpbiBrZXlvZiBSVF06IFJlcXVlc3Q8UywgUlRbS10+O1xufTtcblxudHlwZSBCYXRjaFJlc3VsdFR1cHBsZTxSVCBleHRlbmRzIGFueVtdPiA9IHtcbiAgW0sgaW4ga2V5b2YgUlRdOiB7XG4gICAgc3RhdHVzQ29kZTogbnVtYmVyO1xuICAgIHJlc3VsdDogUlRbS107XG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBCYXRjaFJlc3BvbnNlPFJUIGV4dGVuZHMgYW55W10+ID0ge1xuICBoYXNFcnJvcnM6IGJvb2xlYW47XG4gIHJlc3VsdHM6IEJhdGNoUmVzdWx0VHVwcGxlPFJUPjtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudGluZyBjaGF0dGVyIEFQSSByZXF1ZXN0XG4gKi9cbmNsYXNzIFJlcXVlc3Q8UyBleHRlbmRzIFNjaGVtYSwgUj4ge1xuICBfY2hhdHRlcjogQ2hhdHRlcjxTPjtcbiAgX3JlcXVlc3Q6IENoYXR0ZXJSZXF1ZXN0UGFyYW1zO1xuICBfcHJvbWlzZTogUHJvbWlzZTxSPiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihjaGF0dGVyOiBDaGF0dGVyPFM+LCByZXF1ZXN0OiBDaGF0dGVyUmVxdWVzdFBhcmFtcykge1xuICAgIHRoaXMuX2NoYXR0ZXIgPSBjaGF0dGVyO1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHBhcmFtZXRlcnMgaW4gYmF0Y2ggcmVxdWVzdCBmb3JtXG4gICAqL1xuICBiYXRjaFBhcmFtcygpIHtcbiAgICBjb25zdCB7IG1ldGhvZCwgdXJsLCBib2R5IH0gPSB0aGlzLl9yZXF1ZXN0O1xuICAgIHJldHVybiB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmw6IHRoaXMuX2NoYXR0ZXIuX25vcm1hbGl6ZVVybCh1cmwpLFxuICAgICAgLi4uKHR5cGVvZiBib2R5ICE9PSAndW5kZWZpbmVkJyA/IHsgcmljaElucHV0OiBib2R5IH0gOiB7fSksXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBwYXJhbWV0ZXJzIGluIGJhdGNoIHJlcXVlc3QgZm9ybVxuICAgKlxuICAgKiBAbWV0aG9kIENoYXR0ZXJ+UmVxdWVzdCNwcm9taXNlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlLjxDaGF0dGVyflJlcXVlc3RSZXN1bHQ+fVxuICAgKi9cbiAgcHJvbWlzZSgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5fcHJvbWlzZSB8fCAodGhpcy5fcHJvbWlzZSA9IHRoaXMuX2NoYXR0ZXIuX3JlcXVlc3QodGhpcy5fcmVxdWVzdCkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIE5vZGUuanMgU3RyZWFtIG9iamVjdCBmb3IgcmVxdWVzdFxuICAgKlxuICAgKiBAbWV0aG9kIENoYXR0ZXJ+UmVxdWVzdCNzdHJlYW1cbiAgICogQHJldHVybnMge3N0cmVhbS5TdHJlYW19XG4gICAqL1xuICBzdHJlYW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYXR0ZXIuX3JlcXVlc3Q8Uj4odGhpcy5fcmVxdWVzdCkuc3RyZWFtKCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvbWlzZS9BKyBpbnRlcmZhY2VcbiAgICogaHR0cDovL3Byb21pc2VzLWFwbHVzLmdpdGh1Yi5pby9wcm9taXNlcy1zcGVjL1xuICAgKlxuICAgKiBEZWxlZ2F0ZSB0byBkZWZlcnJlZCBwcm9taXNlLCByZXR1cm4gcHJvbWlzZSBpbnN0YW5jZSBmb3IgYmF0Y2ggcmVzdWx0XG4gICAqL1xuICB0aGVuPFU+KFxuICAgIG9uUmVzb2x2ZT86ICh2YWx1ZTogUikgPT4gVSB8IFByb21pc2VMaWtlPFU+LFxuICAgIG9uUmVqZWN0PzogKGU6IGFueSkgPT4gVSB8IFByb21pc2VMaWtlPFU+LFxuICApIHtcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlKCkudGhlbihvblJlc29sdmUsIG9uUmVqZWN0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBwZW5kUXVlcnlQYXJhbXNUb1VybChcbiAgdXJsOiBzdHJpbmcsXG4gIHF1ZXJ5UGFyYW1zPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfSB8IG51bGwsXG4pIHtcbiAgaWYgKHF1ZXJ5UGFyYW1zKSB7XG4gICAgY29uc3QgcXN0cmluZyA9IE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKVxuICAgICAgLm1hcChcbiAgICAgICAgKG5hbWUpID0+XG4gICAgICAgICAgYCR7bmFtZX09JHtlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHF1ZXJ5UGFyYW1zW25hbWVdID8/ICcnKSl9YCxcbiAgICAgIClcbiAgICAgIC5qb2luKCcmJyk7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID4gMCA/ICcmJyA6ICc/JykgKyBxc3RyaW5nO1xuICB9XG4gIHJldHVybiB1cmw7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZTxTIGV4dGVuZHMgU2NoZW1hLCBSPiBleHRlbmRzIFJlcXVlc3Q8UywgUj4ge1xuICBfdXJsOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBjaGF0dGVyOiBDaGF0dGVyPFM+LFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5UGFyYW1zPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfSB8IG51bGwsXG4gICkge1xuICAgIHN1cGVyKGNoYXR0ZXIsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6IGFwcHBlbmRRdWVyeVBhcmFtc1RvVXJsKHVybCwgcXVlcnlQYXJhbXMpLFxuICAgIH0pO1xuICAgIHRoaXMuX3VybCA9IHRoaXMuX3JlcXVlc3QudXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyByZXNvdXJjZVxuICAgKi9cbiAgY3JlYXRlPFIxID0gYW55PihkYXRhOiBzdHJpbmcgfCBvYmplY3QgfCBudWxsKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYXR0ZXIucmVxdWVzdDxSMT4oe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6IHRoaXMuX3VybCxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgcmVzb3VyY2UgY29udGVudFxuICAgKi9cbiAgcmV0cmlldmU8UjEgPSBSPigpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhdHRlci5yZXF1ZXN0PFIxPih7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiB0aGlzLl91cmwsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHNwZWNpZmllZCByZXNvdXJjZVxuICAgKi9cbiAgdXBkYXRlPFIxID0gYW55PihkYXRhOiBvYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhdHRlci5yZXF1ZXN0PFIxPih7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogdGhpcy5fdXJsLFxuICAgICAgYm9keTogZGF0YSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgc3BlY2lmaWVkIHJlc291cmNlXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHJldHVybiB0aGlzLl9jaGF0dGVyLnJlcXVlc3Q8dm9pZD4oe1xuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIHVybDogdGhpcy5fdXJsLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN5bm9ueW0gb2YgUmVzb3VyY2UjZGVzdHJveSgpXG4gICAqL1xuICBkZWxldGUgPSB0aGlzLmRlc3Ryb3k7XG5cbiAgLyoqXG4gICAqIFN5bm9ueW0gb2YgUmVzb3VyY2UjZGVzdHJveSgpXG4gICAqL1xuICBkZWwgPSB0aGlzLmRlc3Ryb3k7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQVBJIGNsYXNzIGZvciBDaGF0dGVyIFJFU1QgQVBJIGNhbGxcbiAqL1xuZXhwb3J0IGNsYXNzIENoYXR0ZXI8UyBleHRlbmRzIFNjaGVtYT4ge1xuICBfY29ubjogQ29ubmVjdGlvbjxTPjtcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbm46IENvbm5lY3Rpb248Uz4pIHtcbiAgICB0aGlzLl9jb25uID0gY29ubjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kaW5nIHJlcXVlc3QgdG8gQVBJIGVuZHBvaW50XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVxdWVzdDxSPihyZXFfOiBDaGF0dGVyUmVxdWVzdFBhcmFtcykge1xuICAgIGNvbnN0IHsgbWV0aG9kLCB1cmw6IHVybF8sIGhlYWRlcnM6IGhlYWRlcnNfLCBib2R5OiBib2R5XyB9ID0gcmVxXztcbiAgICBsZXQgaGVhZGVycyA9IGhlYWRlcnNfID8/IHt9O1xuICAgIGxldCBib2R5O1xuICAgIGlmICgvXihwdXR8cG9zdHxwYXRjaCkkL2kudGVzdChtZXRob2QpKSB7XG4gICAgICBpZiAoaXNPYmplY3QoYm9keV8pKSB7XG4gICAgICAgIGhlYWRlcnMgPSB7XG4gICAgICAgICAgLi4uaGVhZGVyc18sXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfTtcbiAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHlfKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHkgPSBib2R5XztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdXJsID0gdGhpcy5fbm9ybWFsaXplVXJsKHVybF8pO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8Uj4oe1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgaGVhZGVycyxcbiAgICAgIGJvZHksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBwYXRoIHRvIHNpdGUgcm9vdCByZWxhdGl2ZSB1cmxcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ub3JtYWxpemVVcmwodXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodXJsLnN0YXJ0c1dpdGgoJy9jaGF0dGVyLycpIHx8IHVybC5zdGFydHNXaXRoKCcvY29ubmVjdC8nKSkge1xuICAgICAgcmV0dXJuICcvc2VydmljZXMvZGF0YS92JyArIHRoaXMuX2Nvbm4udmVyc2lvbiArIHVybDtcbiAgICB9IGVsc2UgaWYgKC9eXFwvdltcXGRdK1xcLltcXGRdK1xcLy8udGVzdCh1cmwpKSB7XG4gICAgICByZXR1cm4gJy9zZXJ2aWNlcy9kYXRhJyArIHVybDtcbiAgICB9IGVsc2UgaWYgKCF1cmwuc3RhcnRzV2l0aCgnL3NlcnZpY2VzLycpICYmIHVybC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgIHJldHVybiAnL3NlcnZpY2VzL2RhdGEvdicgKyB0aGlzLl9jb25uLnZlcnNpb24gKyAnL2NoYXR0ZXInICsgdXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGEgcmVxdWVzdCBmb3IgY2hhdHRlciBBUEkgcmVzb3VyY2VcbiAgICovXG4gIHJlcXVlc3Q8UiA9IHVua25vd24+KHJlcTogQ2hhdHRlclJlcXVlc3RQYXJhbXMpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3Q8UywgUj4odGhpcywgcmVxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGEgcmVzb3VyY2UgcmVxdWVzdCB0byBjaGF0dGVyIEFQSVxuICAgKi9cbiAgcmVzb3VyY2U8UiA9IHVua25vd24+KFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5UGFyYW1zPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfSB8IG51bGwsXG4gICkge1xuICAgIHJldHVybiBuZXcgUmVzb3VyY2U8UywgUj4odGhpcywgdXJsLCBxdWVyeVBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBhIGJhdGNoIHJlcXVlc3QgdG8gY2hhdHRlciBBUElcbiAgICovXG4gIGFzeW5jIGJhdGNoPFJUIGV4dGVuZHMgYW55W10+KFxuICAgIHJlcXVlc3RzOiBCYXRjaFJlcXVlc3RUdXBwbGU8UywgUlQ+LFxuICApOiBQcm9taXNlPEJhdGNoUmVzcG9uc2U8UlQ+PiB7XG4gICAgY29uc3QgZGVmZXJyZWRzID0gcmVxdWVzdHMubWFwKChyZXF1ZXN0KSA9PiB7XG4gICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgICByZXF1ZXN0Ll9wcm9taXNlID0gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIHJldHVybiBkZWZlcnJlZDtcbiAgICB9KTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnJlcXVlc3Q8QmF0Y2hSZXNwb25zZTxSVD4+KHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiB0aGlzLl9ub3JtYWxpemVVcmwoJy9jb25uZWN0L2JhdGNoJyksXG4gICAgICBib2R5OiB7XG4gICAgICAgIGJhdGNoUmVxdWVzdHM6IHJlcXVlc3RzLm1hcCgocmVxdWVzdCkgPT4gcmVxdWVzdC5iYXRjaFBhcmFtcygpKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzLnJlc3VsdHMuZm9yRWFjaCgocmVzdWx0LCBpKSA9PiB7XG4gICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVycmVkc1tpXTtcbiAgICAgIGlmIChyZXN1bHQuc3RhdHVzQ29kZSA+PSA0MDApIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3VsdC5yZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmVyPFQ+KCkge1xuICBsZXQgcmVzb2x2ZV86IChyOiBUIHwgUHJvbWlzZUxpa2U8VD4pID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgbGV0IHJlamVjdF86IChlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXNvbHZlXyA9IHJlc29sdmU7XG4gICAgcmVqZWN0XyA9IHJlamVjdDtcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgcHJvbWlzZSxcbiAgICByZXNvbHZlOiByZXNvbHZlXyxcbiAgICByZWplY3Q6IHJlamVjdF8sXG4gIH07XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbnJlZ2lzdGVyTW9kdWxlKCdjaGF0dGVyJywgKGNvbm4pID0+IG5ldyBDaGF0dGVyKGNvbm4pKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhdHRlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0EsY0FBYyxRQUFRLFlBQVk7QUFHM0MsU0FBU0MsUUFBUSxRQUFRLGtCQUFrQjs7QUFFM0M7QUFDQTtBQUNBO0FBMkJBO0FBQ0E7QUFDQTtBQUNBO0FBRkEsSUFHTUMsT0FBTztFQUtYLFNBQUFBLFFBQVlDLE9BQW1CLEVBQUVDLE9BQTZCLEVBQUU7SUFBQUMsZUFBQSxPQUFBSCxPQUFBO0lBQzlELElBQUksQ0FBQ0ksUUFBUSxHQUFHSCxPQUFPO0lBQ3ZCLElBQUksQ0FBQ0ksUUFBUSxHQUFHSCxPQUFPO0VBQ3pCOztFQUVBO0FBQ0Y7QUFDQTtFQUZFLE9BQUFJLFlBQUEsQ0FBQU4sT0FBQTtJQUFB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QUFBLE9BQUtBLE9BQU8sQ0FBQ08sV0FBVyxDQUFDLENBQUM7a0JBQUE7Z0JBQ2hFO2NBQ0YsQ0FBQyxDQUFDO1lBQUE7Y0FOSWdFLEdBQUcsR0FBQUcsU0FBQSxDQUFBTSxJQUFBO2NBT1RDLHdCQUFBLENBQUFaLFNBQUEsR0FBQUUsR0FBRyxDQUFDVyxPQUFPLEVBQUF2RCxJQUFBLENBQUEwQyxTQUFBLEVBQVMsVUFBQ2MsTUFBTSxFQUFFQyxDQUFDLEVBQUs7Z0JBQ2pDLElBQU1QLFFBQVEsR0FBR1AsU0FBUyxDQUFDYyxDQUFDLENBQUM7Z0JBQzdCLElBQUlELE1BQU0sQ0FBQ0UsVUFBVSxJQUFJLEdBQUcsRUFBRTtrQkFDNUJSLFFBQVEsQ0FBQ1MsTUFBTSxDQUFDSCxNQUFNLENBQUNBLE1BQU0sQ0FBQztnQkFDaEMsQ0FBQyxNQUFNO2tCQUNMTixRQUFRLENBQUNVLE9BQU8sQ0FBQ0osTUFBTSxDQUFDQSxNQUFNLENBQUM7Z0JBQ2pDO2NBQ0YsQ0FBQyxDQUFDO2NBQUMsT0FBQVQsU0FBQSxDQUFBYyxNQUFBLFdBQ0lqQixHQUFHO1lBQUE7WUFBQTtjQUFBLE9BQUFHLFNBQUEsQ0FBQWUsSUFBQTtVQUFBO1FBQUEsR0FBQXRCLE9BQUE7TUFBQSxDQUNYO01BQUEsU0FBQXVCLE1BQUFDLEVBQUE7UUFBQSxPQUFBNUIsTUFBQSxDQUFBNkIsS0FBQSxPQUFBQyxTQUFBO01BQUE7TUFBQSxPQUFBSCxLQUFBO0lBQUE7RUFBQTtBQUFBO0FBR0gsU0FBU1osS0FBS0EsQ0FBQSxFQUFNO0VBQ2xCLElBQUlnQixRQUF5QyxHQUFHLFNBQUFBLFNBQUEsRUFBTSxDQUFDLENBQUM7RUFDeEQsSUFBSUMsT0FBeUIsR0FBRyxTQUFBQSxRQUFBLEVBQU0sQ0FBQyxDQUFDO0VBQ3hDLElBQU1oRixPQUFPLEdBQUcsSUFBQWlGLFFBQUEsQ0FBZSxVQUFDVCxPQUFPLEVBQUVELE1BQU0sRUFBSztJQUNsRFEsUUFBUSxHQUFHUCxPQUFPO0lBQ2xCUSxPQUFPLEdBQUdULE1BQU07RUFDbEIsQ0FBQyxDQUFDO0VBQ0YsT0FBTztJQUNMdkUsT0FBTyxFQUFQQSxPQUFPO0lBQ1B3RSxPQUFPLEVBQUVPLFFBQVE7SUFDakJSLE1BQU0sRUFBRVM7RUFDVixDQUFDO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQW5HLGNBQWMsQ0FBQyxTQUFTLEVBQUUsVUFBQ3NELElBQUk7RUFBQSxPQUFLLElBQUlELE9BQU8sQ0FBQ0MsSUFBSSxDQUFDO0FBQUEsRUFBQztBQUV0RCxlQUFlRCxPQUFPIiwiaWdub3JlTGlzdCI6W119