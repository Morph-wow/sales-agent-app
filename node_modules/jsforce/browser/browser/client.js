import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context5, _context6; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context5 = ownKeys(Object(t), !0)).call(_context5, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context6 = ownKeys(Object(t))).call(_context6, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.constructor.js";
import "core-js/modules/es.regexp.dot-all.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.sticky.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.string.search.js";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Object$fromEntries from "@babel/runtime-corejs3/core-js-stable/object/from-entries";
import _URLSearchParams from "@babel/runtime-corejs3/core-js-stable/url-search-params";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _setInterval from "@babel/runtime-corejs3/core-js-stable/set-interval";
import _Date$now from "@babel/runtime-corejs3/core-js-stable/date/now";
import _reverseInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reverse";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
/**
 * @file Browser client connection management class
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { EventEmitter } from 'events';
import Connection from '../connection';
import OAuth2 from '../oauth2';

/**
 * @private
 */
function popupWin(url, w, h) {
  var _context, _context2, _context3;
  var left = screen.width / 2 - w / 2;
  var top = screen.height / 2 - h / 2;
  return window.open(url, undefined, _concatInstanceProperty(_context = _concatInstanceProperty(_context2 = _concatInstanceProperty(_context3 = "location=yes,toolbar=no,status=no,menubar=no,width=".concat(w, ",height=")).call(_context3, h, ",top=")).call(_context2, top, ",left=")).call(_context, left));
}

/**
 * @private
 */
function handleCallbackResponse() {
  var res = checkCallbackResponse();
  var state = localStorage.getItem('jsforce_state');
  if (res && state && res.body.get('state') === state) {
    localStorage.removeItem('jsforce_state');
    var _state$split = state.split('.'),
      _state$split2 = _slicedToArray(_state$split, 2),
      prefix = _state$split2[0],
      promptType = _state$split2[1];
    var cli = new BrowserClient(prefix);
    if (res.success) {
      cli._storeTokens(_Object$fromEntries(res.body));
      location.hash = '';
    } else {
      cli._storeError(res.body);
    }
    if (promptType === 'popup') {
      window.close();
    }
    return true;
  }
}

/**
 * @private
 */
function checkCallbackResponse() {
  var params;
  if (window.location.hash) {
    params = new _URLSearchParams(window.location.hash.substring(1));
    if (params.get('access_token')) {
      return {
        success: true,
        body: params
      };
    }
  } else if (window.location.search) {
    params = new _URLSearchParams(window.location.search.substring(1));
    if (params.get('error')) {
      return {
        success: false,
        body: params
      };
    }
  }
}

/**
 *
 */

/**
 *
 */
var DEFAULT_POPUP_WIN_WIDTH = 912;
var DEFAULT_POPUP_WIN_HEIGHT = 513;

/** @private **/
var clientIdx = 0;

/**
 *
 */
export var BrowserClient = /*#__PURE__*/function (_EventEmitter) {
  /**
   *
   */
  function BrowserClient(prefix) {
    var _this;
    _classCallCheck(this, BrowserClient);
    _this = _callSuper(this, BrowserClient);
    _this._prefix = prefix || 'jsforce' + clientIdx++;
    return _this;
  }
  _inherits(BrowserClient, _EventEmitter);
  return _createClass(BrowserClient, [{
    key: "connection",
    get: function get() {
      if (!this._connection) {
        this._connection = new Connection(this._config);
      }
      return this._connection;
    }

    /**
     *
     */
  }, {
    key: "init",
    value: function init(config) {
      var _this2 = this;
      if (handleCallbackResponse()) {
        return;
      }
      this._config = config;
      var tokens = this._getTokens();
      if (tokens) {
        this.connection._establish(tokens);
        _setTimeout(function () {
          _this2.emit('connect', _this2.connection);
        }, 10);
      }
    }

    /**
     *
     */
  }, {
    key: "login",
    value: function login() {
      var _this$_config,
        _size$width,
        _size$height,
        _this3 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var scope = options.scope,
        size = options.size;
      var oauth2 = new OAuth2((_this$_config = this._config) !== null && _this$_config !== void 0 ? _this$_config : {});
      var rand = Math.random().toString(36).substring(2);
      var state = [this._prefix, 'popup', rand].join('.');
      localStorage.setItem('jsforce_state', state);
      var authzUrl = oauth2.getAuthorizationUrl(_objectSpread({
        response_type: 'token',
        state: state
      }, scope ? {
        scope: scope
      } : {}));
      var pw = popupWin(authzUrl, (_size$width = size === null || size === void 0 ? void 0 : size.width) !== null && _size$width !== void 0 ? _size$width : DEFAULT_POPUP_WIN_WIDTH, (_size$height = size === null || size === void 0 ? void 0 : size.height) !== null && _size$height !== void 0 ? _size$height : DEFAULT_POPUP_WIN_HEIGHT);
      return new _Promise(function (resolve, reject) {
        if (!pw) {
          var _state = [_this3._prefix, 'redirect', rand].join('.');
          localStorage.setItem('jsforce_state', _state);
          var _authzUrl = oauth2.getAuthorizationUrl(_objectSpread({
            response_type: 'token',
            state: _state
          }, scope ? {
            scope: scope
          } : {}));
          location.href = _authzUrl;
          return;
        }
        _this3._removeTokens();
        var pid = _setInterval(function () {
          try {
            if (!pw || pw.closed) {
              clearInterval(pid);
              var tokens = _this3._getTokens();
              if (tokens) {
                _this3.connection._establish(tokens);
                _this3.emit('connect', _this3.connection);
                resolve({
                  status: 'connect'
                });
              } else {
                var err = _this3._getError();
                if (err) {
                  reject(new Error(err.error + ': ' + err.error_description));
                } else {
                  resolve({
                    status: 'cancel'
                  });
                }
              }
            }
          } catch (e) {
            //
          }
        }, 1000);
      });
    }

    /**
     *
     */
  }, {
    key: "isLoggedIn",
    value: function isLoggedIn() {
      return !!this.connection.accessToken;
    }

    /**
     *
     */
  }, {
    key: "logout",
    value: function logout() {
      this.connection.logout();
      this._removeTokens();
      this.emit('disconnect');
    }

    /**
     * @private
     */
  }, {
    key: "_getTokens",
    value: function _getTokens() {
      var regexp = new RegExp('(^|;\\s*)' + this._prefix + '_loggedin=true(;|$)');
      if (document.cookie.match(regexp)) {
        var issuedAt = Number(localStorage.getItem(this._prefix + '_issued_at'));
        // 2 hours
        if (_Date$now() < issuedAt + 2 * 60 * 60 * 1000) {
          var userInfo;
          var idUrl = localStorage.getItem(this._prefix + '_id');
          if (idUrl) {
            var _context4;
            var _idUrl$split$reverse = _reverseInstanceProperty(_context4 = idUrl.split('/')).call(_context4),
              _idUrl$split$reverse2 = _slicedToArray(_idUrl$split$reverse, 2),
              id = _idUrl$split$reverse2[0],
              organizationId = _idUrl$split$reverse2[1];
            userInfo = {
              id: id,
              organizationId: organizationId,
              url: idUrl
            };
          }
          return {
            accessToken: localStorage.getItem(this._prefix + '_access_token'),
            instanceUrl: localStorage.getItem(this._prefix + '_instance_url'),
            userInfo: userInfo
          };
        }
      }
      return null;
    }

    /**
     * @private
     */
  }, {
    key: "_storeTokens",
    value: function _storeTokens(params) {
      localStorage.setItem(this._prefix + '_access_token', params.access_token);
      localStorage.setItem(this._prefix + '_instance_url', params.instance_url);
      localStorage.setItem(this._prefix + '_issued_at', params.issued_at);
      localStorage.setItem(this._prefix + '_id', params.id);
      document.cookie = this._prefix + '_loggedin=true;';
    }

    /**
     * @private
     */
  }, {
    key: "_removeTokens",
    value: function _removeTokens() {
      localStorage.removeItem(this._prefix + '_access_token');
      localStorage.removeItem(this._prefix + '_instance_url');
      localStorage.removeItem(this._prefix + '_issued_at');
      localStorage.removeItem(this._prefix + '_id');
      document.cookie = this._prefix + '_loggedin=';
    }

    /**
     * @private
     */
  }, {
    key: "_getError",
    value: function _getError() {
      try {
        var _localStorage$getItem;
        var err = JSON.parse((_localStorage$getItem = localStorage.getItem(this._prefix + '_error')) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : '');
        localStorage.removeItem(this._prefix + '_error');
        return err;
      } catch (e) {
        //
      }
    }

    /**
     * @private
     */
  }, {
    key: "_storeError",
    value: function _storeError(err) {
      localStorage.setItem(this._prefix + '_error', _JSON$stringify(err));
    }
  }]);
}(EventEmitter);

/**
 *
 */
var client = new BrowserClient();
export default client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDb25uZWN0aW9uIiwiT0F1dGgyIiwicG9wdXBXaW4iLCJ1cmwiLCJ3IiwiaCIsIl9jb250ZXh0IiwiX2NvbnRleHQyIiwiX2NvbnRleHQzIiwibGVmdCIsInNjcmVlbiIsIndpZHRoIiwidG9wIiwiaGVpZ2h0Iiwid2luZG93Iiwib3BlbiIsInVuZGVmaW5lZCIsIl9jb25jYXRJbnN0YW5jZVByb3BlcnR5IiwiY29uY2F0IiwiY2FsbCIsImhhbmRsZUNhbGxiYWNrUmVzcG9uc2UiLCJyZXMiLCJjaGVja0NhbGxiYWNrUmVzcG9uc2UiLCJzdGF0ZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJib2R5IiwiZ2V0IiwicmVtb3ZlSXRlbSIsIl9zdGF0ZSRzcGxpdCIsInNwbGl0IiwiX3N0YXRlJHNwbGl0MiIsIl9zbGljZWRUb0FycmF5IiwicHJlZml4IiwicHJvbXB0VHlwZSIsImNsaSIsIkJyb3dzZXJDbGllbnQiLCJzdWNjZXNzIiwiX3N0b3JlVG9rZW5zIiwiX09iamVjdCRmcm9tRW50cmllcyIsImxvY2F0aW9uIiwiaGFzaCIsIl9zdG9yZUVycm9yIiwiY2xvc2UiLCJwYXJhbXMiLCJfVVJMU2VhcmNoUGFyYW1zIiwic3Vic3RyaW5nIiwic2VhcmNoIiwiREVGQVVMVF9QT1BVUF9XSU5fV0lEVEgiLCJERUZBVUxUX1BPUFVQX1dJTl9IRUlHSFQiLCJjbGllbnRJZHgiLCJfRXZlbnRFbWl0dGVyIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiX3ByZWZpeCIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsIl9jb25uZWN0aW9uIiwiX2NvbmZpZyIsInZhbHVlIiwiaW5pdCIsImNvbmZpZyIsIl90aGlzMiIsInRva2VucyIsIl9nZXRUb2tlbnMiLCJjb25uZWN0aW9uIiwiX2VzdGFibGlzaCIsIl9zZXRUaW1lb3V0IiwiZW1pdCIsImxvZ2luIiwiX3RoaXMkX2NvbmZpZyIsIl9zaXplJHdpZHRoIiwiX3NpemUkaGVpZ2h0IiwiX3RoaXMzIiwib3B0aW9ucyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNjb3BlIiwic2l6ZSIsIm9hdXRoMiIsInJhbmQiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJqb2luIiwic2V0SXRlbSIsImF1dGh6VXJsIiwiZ2V0QXV0aG9yaXphdGlvblVybCIsIl9vYmplY3RTcHJlYWQiLCJyZXNwb25zZV90eXBlIiwicHciLCJfUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJocmVmIiwiX3JlbW92ZVRva2VucyIsInBpZCIsIl9zZXRJbnRlcnZhbCIsImNsb3NlZCIsImNsZWFySW50ZXJ2YWwiLCJzdGF0dXMiLCJlcnIiLCJfZ2V0RXJyb3IiLCJFcnJvciIsImVycm9yIiwiZXJyb3JfZGVzY3JpcHRpb24iLCJlIiwiaXNMb2dnZWRJbiIsImFjY2Vzc1Rva2VuIiwibG9nb3V0IiwicmVnZXhwIiwiUmVnRXhwIiwiZG9jdW1lbnQiLCJjb29raWUiLCJtYXRjaCIsImlzc3VlZEF0IiwiTnVtYmVyIiwiX0RhdGUkbm93IiwidXNlckluZm8iLCJpZFVybCIsIl9jb250ZXh0NCIsIl9pZFVybCRzcGxpdCRyZXZlcnNlIiwiX3JldmVyc2VJbnN0YW5jZVByb3BlcnR5IiwiX2lkVXJsJHNwbGl0JHJldmVyc2UyIiwiaWQiLCJvcmdhbml6YXRpb25JZCIsImluc3RhbmNlVXJsIiwiYWNjZXNzX3Rva2VuIiwiaW5zdGFuY2VfdXJsIiwiaXNzdWVkX2F0IiwiX2xvY2FsU3RvcmFnZSRnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwiX0pTT04kc3RyaW5naWZ5IiwiY2xpZW50Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Jyb3dzZXIvY2xpZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQnJvd3NlciBjbGllbnQgY29ubmVjdGlvbiBtYW5hZ2VtZW50IGNsYXNzXG4gKiBAYXV0aG9yIFNoaW5pY2hpIFRvbWl0YSA8c2hpbmljaGkudG9taXRhQGdtYWlsLmNvbT5cbiAqL1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBDb25uZWN0aW9uLCB7IENvbm5lY3Rpb25Db25maWcgfSBmcm9tICcuLi9jb25uZWN0aW9uJztcbmltcG9ydCBPQXV0aDIsIHsgVG9rZW5SZXNwb25zZSB9IGZyb20gJy4uL29hdXRoMic7XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcG9wdXBXaW4odXJsOiBzdHJpbmcsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XG4gIGNvbnN0IGxlZnQgPSBzY3JlZW4ud2lkdGggLyAyIC0gdyAvIDI7XG4gIGNvbnN0IHRvcCA9IHNjcmVlbi5oZWlnaHQgLyAyIC0gaCAvIDI7XG4gIHJldHVybiB3aW5kb3cub3BlbihcbiAgICB1cmwsXG4gICAgdW5kZWZpbmVkLFxuICAgIGBsb2NhdGlvbj15ZXMsdG9vbGJhcj1ubyxzdGF0dXM9bm8sbWVudWJhcj1ubyx3aWR0aD0ke3d9LGhlaWdodD0ke2h9LHRvcD0ke3RvcH0sbGVmdD0ke2xlZnR9YCxcbiAgKTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBoYW5kbGVDYWxsYmFja1Jlc3BvbnNlKCkge1xuICBjb25zdCByZXMgPSBjaGVja0NhbGxiYWNrUmVzcG9uc2UoKTtcbiAgY29uc3Qgc3RhdGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNmb3JjZV9zdGF0ZScpO1xuICBpZiAocmVzICYmIHN0YXRlICYmIHJlcy5ib2R5LmdldCgnc3RhdGUnKSA9PT0gc3RhdGUpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnanNmb3JjZV9zdGF0ZScpO1xuICAgIGNvbnN0IFtwcmVmaXgsIHByb21wdFR5cGVdID0gc3RhdGUuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBjbGkgPSBuZXcgQnJvd3NlckNsaWVudChwcmVmaXgpO1xuICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgY2xpLl9zdG9yZVRva2VucyhPYmplY3QuZnJvbUVudHJpZXMocmVzLmJvZHkpIGFzIFRva2VuUmVzcG9uc2UpO1xuICAgICAgbG9jYXRpb24uaGFzaCA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbGkuX3N0b3JlRXJyb3IocmVzLmJvZHkpO1xuICAgIH1cbiAgICBpZiAocHJvbXB0VHlwZSA9PT0gJ3BvcHVwJykge1xuICAgICAgd2luZG93LmNsb3NlKCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tDYWxsYmFja1Jlc3BvbnNlKCkge1xuICBsZXQgcGFyYW1zO1xuICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKSk7XG4gICAgaWYgKHBhcmFtcy5nZXQoJ2FjY2Vzc190b2tlbicpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBib2R5OiBwYXJhbXMgfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xuICAgIHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkpO1xuICAgIGlmIChwYXJhbXMuZ2V0KCdlcnJvcicpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgYm9keTogcGFyYW1zIH07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgTG9naW5PcHRpb25zID0ge1xuICBzY29wZT86IHN0cmluZztcbiAgc2l6ZT86IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfTtcbn07XG5cbi8qKlxuICpcbiAqL1xuY29uc3QgREVGQVVMVF9QT1BVUF9XSU5fV0lEVEggPSA5MTI7XG5jb25zdCBERUZBVUxUX1BPUFVQX1dJTl9IRUlHSFQgPSA1MTM7XG5cbi8qKiBAcHJpdmF0ZSAqKi9cbmxldCBjbGllbnRJZHggPSAwO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBCcm93c2VyQ2xpZW50IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgX3ByZWZpeDogc3RyaW5nO1xuICBfY29uZmlnOiBDb25uZWN0aW9uQ29uZmlnIHwgdW5kZWZpbmVkO1xuICBfY29ubmVjdGlvbjogQ29ubmVjdGlvbiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByZWZpeD86IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fcHJlZml4ID0gcHJlZml4IHx8ICdqc2ZvcmNlJyArIGNsaWVudElkeCsrO1xuICB9XG5cbiAgZ2V0IGNvbm5lY3Rpb24oKTogQ29ubmVjdGlvbiB7XG4gICAgaWYgKCF0aGlzLl9jb25uZWN0aW9uKSB7XG4gICAgICB0aGlzLl9jb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24odGhpcy5fY29uZmlnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rpb247XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGluaXQoY29uZmlnOiBDb25uZWN0aW9uQ29uZmlnKSB7XG4gICAgaWYgKGhhbmRsZUNhbGxiYWNrUmVzcG9uc2UoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgY29uc3QgdG9rZW5zID0gdGhpcy5fZ2V0VG9rZW5zKCk7XG4gICAgaWYgKHRva2Vucykge1xuICAgICAgdGhpcy5jb25uZWN0aW9uLl9lc3RhYmxpc2godG9rZW5zKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3QnLCB0aGlzLmNvbm5lY3Rpb24pO1xuICAgICAgfSwgMTApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgbG9naW4ob3B0aW9uczogTG9naW5PcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IHNjb3BlLCBzaXplIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IG9hdXRoMiA9IG5ldyBPQXV0aDIodGhpcy5fY29uZmlnID8/IHt9KTtcbiAgICBjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIpO1xuICAgIGNvbnN0IHN0YXRlID0gW3RoaXMuX3ByZWZpeCwgJ3BvcHVwJywgcmFuZF0uam9pbignLicpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdqc2ZvcmNlX3N0YXRlJywgc3RhdGUpO1xuICAgIGNvbnN0IGF1dGh6VXJsID0gb2F1dGgyLmdldEF1dGhvcml6YXRpb25Vcmwoe1xuICAgICAgcmVzcG9uc2VfdHlwZTogJ3Rva2VuJyxcbiAgICAgIHN0YXRlLFxuICAgICAgLi4uKHNjb3BlID8geyBzY29wZSB9IDoge30pLFxuICAgIH0pO1xuICAgIGNvbnN0IHB3ID0gcG9wdXBXaW4oXG4gICAgICBhdXRoelVybCxcbiAgICAgIHNpemU/LndpZHRoID8/IERFRkFVTFRfUE9QVVBfV0lOX1dJRFRILFxuICAgICAgc2l6ZT8uaGVpZ2h0ID8/IERFRkFVTFRfUE9QVVBfV0lOX0hFSUdIVCxcbiAgICApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx7IHN0YXR1czogc3RyaW5nIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghcHcpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBbdGhpcy5fcHJlZml4LCAncmVkaXJlY3QnLCByYW5kXS5qb2luKCcuJyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdqc2ZvcmNlX3N0YXRlJywgc3RhdGUpO1xuICAgICAgICBjb25zdCBhdXRoelVybCA9IG9hdXRoMi5nZXRBdXRob3JpemF0aW9uVXJsKHtcbiAgICAgICAgICByZXNwb25zZV90eXBlOiAndG9rZW4nLFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIC4uLihzY29wZSA/IHsgc2NvcGUgfSA6IHt9KSxcbiAgICAgICAgfSk7XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSBhdXRoelVybDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fcmVtb3ZlVG9rZW5zKCk7XG4gICAgICBjb25zdCBwaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFwdyB8fCBwdy5jbG9zZWQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocGlkKTtcbiAgICAgICAgICAgIGNvbnN0IHRva2VucyA9IHRoaXMuX2dldFRva2VucygpO1xuICAgICAgICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uX2VzdGFibGlzaCh0b2tlbnMpO1xuICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3QnLCB0aGlzLmNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICByZXNvbHZlKHsgc3RhdHVzOiAnY29ubmVjdCcgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBlcnIgPSB0aGlzLl9nZXRFcnJvcigpO1xuICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihlcnIuZXJyb3IgKyAnOiAnICsgZXJyLmVycm9yX2Rlc2NyaXB0aW9uKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHN0YXR1czogJ2NhbmNlbCcgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvL1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaXNMb2dnZWRJbigpIHtcbiAgICByZXR1cm4gISF0aGlzLmNvbm5lY3Rpb24uYWNjZXNzVG9rZW47XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGxvZ291dCgpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24ubG9nb3V0KCk7XG4gICAgdGhpcy5fcmVtb3ZlVG9rZW5zKCk7XG4gICAgdGhpcy5lbWl0KCdkaXNjb25uZWN0Jyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRUb2tlbnMoKSB7XG4gICAgY29uc3QgcmVnZXhwID0gbmV3IFJlZ0V4cChcbiAgICAgICcoXnw7XFxcXHMqKScgKyB0aGlzLl9wcmVmaXggKyAnX2xvZ2dlZGluPXRydWUoO3wkKScsXG4gICAgKTtcbiAgICBpZiAoZG9jdW1lbnQuY29va2llLm1hdGNoKHJlZ2V4cCkpIHtcbiAgICAgIGNvbnN0IGlzc3VlZEF0ID0gTnVtYmVyKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9wcmVmaXggKyAnX2lzc3VlZF9hdCcpLFxuICAgICAgKTtcbiAgICAgIC8vIDIgaG91cnNcbiAgICAgIGlmIChEYXRlLm5vdygpIDwgaXNzdWVkQXQgKyAyICogNjAgKiA2MCAqIDEwMDApIHtcbiAgICAgICAgbGV0IHVzZXJJbmZvO1xuICAgICAgICBjb25zdCBpZFVybCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX3ByZWZpeCArICdfaWQnKTtcbiAgICAgICAgaWYgKGlkVXJsKSB7XG4gICAgICAgICAgY29uc3QgW2lkLCBvcmdhbml6YXRpb25JZF0gPSBpZFVybC5zcGxpdCgnLycpLnJldmVyc2UoKTtcbiAgICAgICAgICB1c2VySW5mbyA9IHsgaWQsIG9yZ2FuaXphdGlvbklkLCB1cmw6IGlkVXJsIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fcHJlZml4ICsgJ19hY2Nlc3NfdG9rZW4nKSxcbiAgICAgICAgICBpbnN0YW5jZVVybDogbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fcHJlZml4ICsgJ19pbnN0YW5jZV91cmwnKSxcbiAgICAgICAgICB1c2VySW5mbyxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zdG9yZVRva2VucyhwYXJhbXM6IFRva2VuUmVzcG9uc2UpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9wcmVmaXggKyAnX2FjY2Vzc190b2tlbicsIHBhcmFtcy5hY2Nlc3NfdG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX3ByZWZpeCArICdfaW5zdGFuY2VfdXJsJywgcGFyYW1zLmluc3RhbmNlX3VybCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fcHJlZml4ICsgJ19pc3N1ZWRfYXQnLCBwYXJhbXMuaXNzdWVkX2F0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9wcmVmaXggKyAnX2lkJywgcGFyYW1zLmlkKTtcbiAgICBkb2N1bWVudC5jb29raWUgPSB0aGlzLl9wcmVmaXggKyAnX2xvZ2dlZGluPXRydWU7JztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbW92ZVRva2VucygpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9wcmVmaXggKyAnX2FjY2Vzc190b2tlbicpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX3ByZWZpeCArICdfaW5zdGFuY2VfdXJsJyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fcHJlZml4ICsgJ19pc3N1ZWRfYXQnKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9wcmVmaXggKyAnX2lkJyk7XG4gICAgZG9jdW1lbnQuY29va2llID0gdGhpcy5fcHJlZml4ICsgJ19sb2dnZWRpbj0nO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0RXJyb3IoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGVyciA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX3ByZWZpeCArICdfZXJyb3InKSA/PyAnJyxcbiAgICAgICk7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl9wcmVmaXggKyAnX2Vycm9yJyk7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3RvcmVFcnJvcihlcnI6IGFueSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX3ByZWZpeCArICdfZXJyb3InLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgfVxufVxuXG4vKipcbiAqXG4gKi9cbmNvbnN0IGNsaWVudCA9IG5ldyBCcm93c2VyQ2xpZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsaWVudDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxZQUFZLFFBQVEsUUFBUTtBQUNyQyxPQUFPQyxVQUFVLE1BQTRCLGVBQWU7QUFDNUQsT0FBT0MsTUFBTSxNQUF5QixXQUFXOztBQUVqRDtBQUNBO0FBQ0E7QUFDQSxTQUFTQyxRQUFRQSxDQUFDQyxHQUFXLEVBQUVDLENBQVMsRUFBRUMsQ0FBUyxFQUFFO0VBQUEsSUFBQUMsUUFBQSxFQUFBQyxTQUFBLEVBQUFDLFNBQUE7RUFDbkQsSUFBTUMsSUFBSSxHQUFHQyxNQUFNLENBQUNDLEtBQUssR0FBRyxDQUFDLEdBQUdQLENBQUMsR0FBRyxDQUFDO0VBQ3JDLElBQU1RLEdBQUcsR0FBR0YsTUFBTSxDQUFDRyxNQUFNLEdBQUcsQ0FBQyxHQUFHUixDQUFDLEdBQUcsQ0FBQztFQUNy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