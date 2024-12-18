import _typeof from "@babel/runtime-corejs3/helpers/typeof";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
/**
 * @file Manages Salesforce Apex REST endpoint calls
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { registerModule } from '../jsforce';
/**
 * API class for Apex REST endpoint call
 */
export var Apex = /*#__PURE__*/function () {
  /**
   *
   */
  function Apex(conn) {
    _classCallCheck(this, Apex);
    /**
     * Synonym of Apex#delete()
     */
    _defineProperty(this, "del", this.delete);
    this._conn = conn;
  }

  /* @private */
  return _createClass(Apex, [{
    key: "_baseUrl",
    value: function _baseUrl() {
      return "".concat(this._conn.instanceUrl, "/services/apexrest");
    }

    /**
     * @private
     */
  }, {
    key: "_createRequestParams",
    value: function _createRequestParams(method, path, body) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = _typeof(options.headers) === 'object' ? options.headers : {};
      if (!/^(GET|DELETE)$/i.test(method)) {
        headers['content-type'] = 'application/json';
      }
      var params = {
        method: method,
        url: this._baseUrl() + path,
        headers: headers
      };
      if (body) {
        params.body = _JSON$stringify(body);
      }
      return params;
    }

    /**
     * Call Apex REST service in GET request
     */
  }, {
    key: "get",
    value: function get(path, options) {
      return this._conn.request(this._createRequestParams('GET', path, undefined, options));
    }

    /**
     * Call Apex REST service in POST request
     */
  }, {
    key: "post",
    value: function post(path, body, options) {
      var params = this._createRequestParams('POST', path, body, options);
      return this._conn.request(params);
    }

    /**
     * Call Apex REST service in PUT request
     */
  }, {
    key: "put",
    value: function put(path, body, options) {
      var params = this._createRequestParams('PUT', path, body, options);
      return this._conn.request(params);
    }

    /**
     * Call Apex REST service in PATCH request
     */
  }, {
    key: "patch",
    value: function patch(path, body, options) {
      var params = this._createRequestParams('PATCH', path, body, options);
      return this._conn.request(params);
    }

    /**
     * Call Apex REST service in DELETE request
     */
  }, {
    key: "delete",
    value: function _delete(path, options) {
      return this._conn.request(this._createRequestParams('DELETE', path, undefined, options));
    }
  }]);
}();

/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
registerModule('apex', function (conn) {
  return new Apex(conn);
});
export default Apex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWdpc3Rlck1vZHVsZSIsIkFwZXgiLCJjb25uIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiZGVsZXRlIiwiX2Nvbm4iLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsIl9iYXNlVXJsIiwiY29uY2F0IiwiaW5zdGFuY2VVcmwiLCJfY3JlYXRlUmVxdWVzdFBhcmFtcyIsIm1ldGhvZCIsInBhdGgiLCJib2R5Iiwib3B0aW9ucyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImhlYWRlcnMiLCJfdHlwZW9mIiwidGVzdCIsInBhcmFtcyIsInVybCIsIl9KU09OJHN0cmluZ2lmeSIsImdldCIsInJlcXVlc3QiLCJwb3N0IiwicHV0IiwicGF0Y2giLCJfZGVsZXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS9hcGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgTWFuYWdlcyBTYWxlc2ZvcmNlIEFwZXggUkVTVCBlbmRwb2ludCBjYWxsc1xuICogQGF1dGhvciBTaGluaWNoaSBUb21pdGEgPHNoaW5pY2hpLnRvbWl0YUBnbWFpbC5jb20+XG4gKi9cbmltcG9ydCB7IHJlZ2lzdGVyTW9kdWxlIH0gZnJvbSAnLi4vanNmb3JjZSc7XG5pbXBvcnQgQ29ubmVjdGlvbiBmcm9tICcuLi9jb25uZWN0aW9uJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0LCBIdHRwTWV0aG9kcywgU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIEFQSSBjbGFzcyBmb3IgQXBleCBSRVNUIGVuZHBvaW50IGNhbGxcbiAqL1xuZXhwb3J0IGNsYXNzIEFwZXg8UyBleHRlbmRzIFNjaGVtYT4ge1xuICBfY29ubjogQ29ubmVjdGlvbjxTPjtcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbm46IENvbm5lY3Rpb248Uz4pIHtcbiAgICB0aGlzLl9jb25uID0gY29ubjtcbiAgfVxuXG4gIC8qIEBwcml2YXRlICovXG4gIF9iYXNlVXJsKCkge1xuICAgIHJldHVybiBgJHt0aGlzLl9jb25uLmluc3RhbmNlVXJsfS9zZXJ2aWNlcy9hcGV4cmVzdGA7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jcmVhdGVSZXF1ZXN0UGFyYW1zKFxuICAgIG1ldGhvZDogSHR0cE1ldGhvZHMsXG4gICAgcGF0aDogc3RyaW5nLFxuICAgIGJvZHk/OiBPYmplY3QsXG4gICAgb3B0aW9uczogeyBoZWFkZXJzPzogSHR0cFJlcXVlc3RbJ2hlYWRlcnMnXSB9ID0ge30sXG4gICk6IEh0dHBSZXF1ZXN0IHtcbiAgICBjb25zdCBoZWFkZXJzOiBIdHRwUmVxdWVzdFsnaGVhZGVycyddID1cbiAgICAgIHR5cGVvZiBvcHRpb25zLmhlYWRlcnMgPT09ICdvYmplY3QnID8gb3B0aW9ucy5oZWFkZXJzIDoge307XG4gICAgaWYgKCEvXihHRVR8REVMRVRFKSQvaS50ZXN0KG1ldGhvZCkpIHtcbiAgICAgIGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IEh0dHBSZXF1ZXN0ID0ge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsOiB0aGlzLl9iYXNlVXJsKCkgKyBwYXRoLFxuICAgICAgaGVhZGVycyxcbiAgICB9O1xuICAgIGlmIChib2R5KSB7XG4gICAgICBwYXJhbXMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgQXBleCBSRVNUIHNlcnZpY2UgaW4gR0VUIHJlcXVlc3RcbiAgICovXG4gIGdldDxSID0gdW5rbm93bj4ocGF0aDogc3RyaW5nLCBvcHRpb25zPzogT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdDxSPihcbiAgICAgIHRoaXMuX2NyZWF0ZVJlcXVlc3RQYXJhbXMoJ0dFVCcsIHBhdGgsIHVuZGVmaW5lZCwgb3B0aW9ucyksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIEFwZXggUkVTVCBzZXJ2aWNlIGluIFBPU1QgcmVxdWVzdFxuICAgKi9cbiAgcG9zdDxSID0gdW5rbm93bj4ocGF0aDogc3RyaW5nLCBib2R5PzogT2JqZWN0LCBvcHRpb25zPzogT2JqZWN0KSB7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5fY3JlYXRlUmVxdWVzdFBhcmFtcygnUE9TVCcsIHBhdGgsIGJvZHksIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8Uj4ocGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIEFwZXggUkVTVCBzZXJ2aWNlIGluIFBVVCByZXF1ZXN0XG4gICAqL1xuICBwdXQ8UiA9IHVua25vd24+KHBhdGg6IHN0cmluZywgYm9keT86IE9iamVjdCwgb3B0aW9ucz86IE9iamVjdCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuX2NyZWF0ZVJlcXVlc3RQYXJhbXMoJ1BVVCcsIHBhdGgsIGJvZHksIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8Uj4ocGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIEFwZXggUkVTVCBzZXJ2aWNlIGluIFBBVENIIHJlcXVlc3RcbiAgICovXG4gIHBhdGNoPFIgPSB1bmtub3duPihwYXRoOiBzdHJpbmcsIGJvZHk/OiBPYmplY3QsIG9wdGlvbnM/OiBPYmplY3QpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLl9jcmVhdGVSZXF1ZXN0UGFyYW1zKCdQQVRDSCcsIHBhdGgsIGJvZHksIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8Uj4ocGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIEFwZXggUkVTVCBzZXJ2aWNlIGluIERFTEVURSByZXF1ZXN0XG4gICAqL1xuICBkZWxldGU8UiA9IHVua25vd24+KHBhdGg6IHN0cmluZywgb3B0aW9ucz86IE9iamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8Uj4oXG4gICAgICB0aGlzLl9jcmVhdGVSZXF1ZXN0UGFyYW1zKCdERUxFVEUnLCBwYXRoLCB1bmRlZmluZWQsIG9wdGlvbnMpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3lub255bSBvZiBBcGV4I2RlbGV0ZSgpXG4gICAqL1xuICBkZWwgPSB0aGlzLmRlbGV0ZTtcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKlxuICogUmVnaXN0ZXIgaG9vayBpbiBjb25uZWN0aW9uIGluc3RhbnRpYXRpb24gZm9yIGR5bmFtaWNhbGx5IGFkZGluZyB0aGlzIEFQSSBtb2R1bGUgZmVhdHVyZXNcbiAqL1xucmVnaXN0ZXJNb2R1bGUoJ2FwZXgnLCAoY29ubikgPT4gbmV3IEFwZXgoY29ubikpO1xuXG5leHBvcnQgZGVmYXVsdCBBcGV4O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxjQUFjLFFBQVEsWUFBWTtBQUkzQztBQUNBO0FBQ0E7QUFDQSxXQUFhQyxJQUFJO0VBR2Y7QUFDRjtBQUNBO0VBQ0UsU0FBQUEsS0FBWUMsSUFBbUIsRUFBRTtJQUFBQyxlQUFBLE9BQUFGLElBQUE7SUE0RWpDO0FBQ0Y7QUFDQTtJQUZFRyxlQUFBLGNBR00sSUFBSSxDQUFDQyxNQUFNO0lBOUVmLElBQUksQ0FBQ0MsS0FBSyxHQUFHSixJQUFJO0VBQ25COztFQUVBO0VBQUEsT0FBQUssWUFBQSxDQUFBTixJQUFBO0lBQUFPLEdBQUE7SUFBQUMsS0FBQSxFQUNBLFNBQUFDLFNBQUEsRUFBVztNQUNULFVBQUFDLE1BQUEsQ0FBVSxJQUFJLENBQUNMLEtBQUssQ0FBQ00sV0FBVztJQUNsQzs7SUFFQTtBQUNGO0FBQ0E7RUFGRTtJQUFBSixHQUFBO0lBQUFDLEtBQUEsRUFHQSxTQUFBSSxxQkFDRUMsTUFBbUIsRUFD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