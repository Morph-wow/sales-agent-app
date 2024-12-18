import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.test.js";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _typeof from "@babel/runtime-corejs3/helpers/typeof";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _Object$keys2 from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.split.js";
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context3; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context3 = Object.prototype.toString.call(o)).call(_context3, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 *
 */
import { Transform } from 'stream';
function parseHeaders(hs) {
  var headers = {};
  var _iterator = _createForOfIteratorHelper(hs.split(/\n/)),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var line = _step.value;
      var _line$split = line.split(/\s*:\s*/),
        _line$split2 = _slicedToArray(_line$split, 2),
        name = _line$split2[0],
        value = _line$split2[1];
      headers[name.toLowerCase()] = value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return headers;
}
function processCanvasRequest(_x, _x2, _x3) {
  return _processCanvasRequest.apply(this, arguments);
}
function _processCanvasRequest() {
  _processCanvasRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(params, signedRequest, requestBody) {
    var settings, paramHeaders, _i, _Object$keys, name, data, headers, responseBody;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          settings = {
            client: signedRequest.client,
            method: params.method,
            data: requestBody
          };
          paramHeaders = params.headers;
          if (paramHeaders) {
            settings.headers = {};
            for (_i = 0, _Object$keys = _Object$keys2(paramHeaders); _i < _Object$keys.length; _i++) {
              name = _Object$keys[_i];
              if (name.toLowerCase() === 'content-type') {
                settings.contentType = paramHeaders[name];
              } else {
                settings.headers[name] = paramHeaders[name];
              }
            }
          }
          _context2.next = 5;
          return new _Promise(function (resolve, reject) {
            settings.success = resolve;
            settings.failure = reject;
            Sfdc.canvas.client.ajax(params.url, settings);
          });
        case 5:
          data = _context2.sent;
          headers = parseHeaders(data.responseHeaders);
          responseBody = data.payload;
          if (typeof responseBody !== 'string') {
            responseBody = _JSON$stringify(responseBody);
          }
          return _context2.abrupt("return", {
            statusCode: data.status,
            headers: headers,
            body: responseBody
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _processCanvasRequest.apply(this, arguments);
}
function createRequest(signedRequest) {
  return function (params) {
    var buf = [];
    var stream = new Transform({
      transform: function transform(chunk, encoding, callback) {
        buf.push(typeof chunk === 'string' ? chunk : chunk.toString('utf8'));
        callback();
      },
      flush: function flush() {
        _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var body, response;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                body = buf.join('');
                _context.next = 3;
                return processCanvasRequest(params, signedRequest, body);
              case 3:
                response = _context.sent;
                stream.emit('response', response);
                stream.emit('complete', response);
                stream.push(response.body);
                stream.push(null);
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      }
    });
    if (params.body) {
      stream.end(params.body);
    }
    return stream;
  };
}
export default {
  supported: (typeof Sfdc === "undefined" ? "undefined" : _typeof(Sfdc)) === 'object' && typeof Sfdc.canvas !== 'undefined',
  createRequest: createRequest
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUcmFuc2Zvcm0iLCJwYXJzZUhlYWRlcnMiLCJocyIsImhlYWRlcnMiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsInNwbGl0IiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJsaW5lIiwidmFsdWUiLCJfbGluZSRzcGxpdCIsIl9saW5lJHNwbGl0MiIsIl9zbGljZWRUb0FycmF5IiwibmFtZSIsInRvTG93ZXJDYXNlIiwiZXJyIiwiZSIsImYiLCJwcm9jZXNzQ2FudmFzUmVxdWVzdCIsIl94IiwiX3gyIiwiX3gzIiwiX3Byb2Nlc3NDYW52YXNSZXF1ZXN0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZTIiLCJwYXJhbXMiLCJzaWduZWRSZXF1ZXN0IiwicmVxdWVzdEJvZHkiLCJzZXR0aW5ncyIsInBhcmFtSGVhZGVycyIsIl9pIiwiX09iamVjdCRrZXlzIiwiZGF0YSIsInJlc3BvbnNlQm9keSIsIndyYXAiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJwcmV2IiwibmV4dCIsImNsaWVudCIsIm1ldGhvZCIsIl9PYmplY3Qka2V5czIiLCJsZW5ndGgiLCJjb250ZW50VHlwZSIsIl9Qcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwiU2ZkYyIsImNhbnZhcyIsImFqYXgiLCJ1cmwiLCJzZW50IiwicmVzcG9uc2VIZWFkZXJzIiwicGF5bG9hZCIsIl9KU09OJHN0cmluZ2lmeSIsImFicnVwdCIsInN0YXR1c0NvZGUiLCJzdGF0dXMiLCJib2R5Iiwic3RvcCIsImNyZWF0ZVJlcXVlc3QiLCJidWYiLCJzdHJlYW0iLCJ0cmFuc2Zvcm0iLCJjaHVuayIsImVuY29kaW5nIiwiY2FsbGJhY2siLCJwdXNoIiwidG9TdHJpbmciLCJmbHVzaCIsIl9jYWxsZWUiLCJyZXNwb25zZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJqb2luIiwiZW1pdCIsImVuZCIsInN1cHBvcnRlZCIsIl90eXBlb2YiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvYnJvd3Nlci9jYW52YXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICovXG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3QsIFNpZ25lZFJlcXVlc3RPYmplY3QgfSBmcm9tICcuLi90eXBlcyc7XG5cbmRlY2xhcmUgbGV0IFNmZGM6IGFueTtcblxudHlwZSBDYW52YXNSZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIHJlc3BvbnNlSGVhZGVyczogc3RyaW5nO1xuICBwYXlsb2FkOiBhbnk7XG59O1xuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcnMoaHM6IHN0cmluZykge1xuICBjb25zdCBoZWFkZXJzOiBIdHRwUmVxdWVzdFsnaGVhZGVycyddID0ge307XG4gIGZvciAoY29uc3QgbGluZSBvZiBocy5zcGxpdCgvXFxuLykpIHtcbiAgICBjb25zdCBbbmFtZSwgdmFsdWVdID0gbGluZS5zcGxpdCgvXFxzKjpcXHMqLyk7XG4gICAgaGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGhlYWRlcnM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NDYW52YXNSZXF1ZXN0KFxuICBwYXJhbXM6IEh0dHBSZXF1ZXN0LFxuICBzaWduZWRSZXF1ZXN0OiBTaWduZWRSZXF1ZXN0T2JqZWN0LFxuICByZXF1ZXN0Qm9keTogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHNldHRpbmdzOiBhbnkgPSB7XG4gICAgY2xpZW50OiBzaWduZWRSZXF1ZXN0LmNsaWVudCxcbiAgICBtZXRob2Q6IHBhcmFtcy5tZXRob2QsXG4gICAgZGF0YTogcmVxdWVzdEJvZHksXG4gIH07XG4gIGNvbnN0IHBhcmFtSGVhZGVycyA9IHBhcmFtcy5oZWFkZXJzO1xuICBpZiAocGFyYW1IZWFkZXJzKSB7XG4gICAgc2V0dGluZ3MuaGVhZGVycyA9IHt9O1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyhwYXJhbUhlYWRlcnMpKSB7XG4gICAgICBpZiAobmFtZS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICBzZXR0aW5ncy5jb250ZW50VHlwZSA9IHBhcmFtSGVhZGVyc1tuYW1lXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldHRpbmdzLmhlYWRlcnNbbmFtZV0gPSBwYXJhbUhlYWRlcnNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBuZXcgUHJvbWlzZTxDYW52YXNSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNldHRpbmdzLnN1Y2Nlc3MgPSByZXNvbHZlO1xuICAgIHNldHRpbmdzLmZhaWx1cmUgPSByZWplY3Q7XG4gICAgU2ZkYy5jYW52YXMuY2xpZW50LmFqYXgocGFyYW1zLnVybCwgc2V0dGluZ3MpO1xuICB9KTtcbiAgY29uc3QgaGVhZGVycyA9IHBhcnNlSGVhZGVycyhkYXRhLnJlc3BvbnNlSGVhZGVycyk7XG4gIGxldCByZXNwb25zZUJvZHkgPSBkYXRhLnBheWxvYWQ7XG4gIGlmICh0eXBlb2YgcmVzcG9uc2VCb2R5ICE9PSAnc3RyaW5nJykge1xuICAgIHJlc3BvbnNlQm9keSA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlQm9keSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXNDb2RlOiBkYXRhLnN0YXR1cyxcbiAgICBoZWFkZXJzLFxuICAgIGJvZHk6IHJlc3BvbnNlQm9keSBhcyBzdHJpbmcsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3Qoc2lnbmVkUmVxdWVzdDogU2lnbmVkUmVxdWVzdE9iamVjdCkge1xuICByZXR1cm4gKHBhcmFtczogSHR0cFJlcXVlc3QpID0+IHtcbiAgICBjb25zdCBidWY6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3Qgc3RyZWFtID0gbmV3IFRyYW5zZm9ybSh7XG4gICAgICB0cmFuc2Zvcm0oY2h1bmssIGVuY29kaW5nLCBjYWxsYmFjaykge1xuICAgICAgICBidWYucHVzaCh0eXBlb2YgY2h1bmsgPT09ICdzdHJpbmcnID8gY2h1bmsgOiBjaHVuay50b1N0cmluZygndXRmOCcpKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0sXG4gICAgICBmbHVzaCgpIHtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBib2R5ID0gYnVmLmpvaW4oJycpO1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcHJvY2Vzc0NhbnZhc1JlcXVlc3QoXG4gICAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgICBzaWduZWRSZXF1ZXN0LFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHN0cmVhbS5lbWl0KCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAgICAgICBzdHJlYW0uZW1pdCgnY29tcGxldGUnLCByZXNwb25zZSk7XG4gICAgICAgICAgc3RyZWFtLnB1c2gocmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgc3RyZWFtLnB1c2gobnVsbCk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIGlmIChwYXJhbXMuYm9keSkge1xuICAgICAgc3RyZWFtLmVuZChwYXJhbXMuYm9keSk7XG4gICAgfVxuICAgIHJldHVybiBzdHJlYW07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3VwcG9ydGVkOiB0eXBlb2YgU2ZkYyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIFNmZGMuY2FudmFzICE9PSAndW5kZWZpbmVkJyxcbiAgY3JlYXRlUmVxdWVzdCxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLFNBQVNBLFNBQVMsUUFBUSxRQUFRO0FBV2xD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