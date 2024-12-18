import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
var _excluded = ["url", "body"];
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context9; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context9 = Object.prototype.toString.call(o)).call(_context9, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context7, _context8; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context7 = ownKeys(Object(t), !0)).call(_context7, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context8 = ownKeys(Object(t))).call(_context8, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.split.js";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _keysInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/keys";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reduce";
import { createHttpRequestHandlerStreams, executeWithTimeout, isRedirect, performRedirectRequest } from '../request-helper';
import { readAll } from '../util/stream';
/**
 * As the request streming is not yet supported on major browsers,
 * it is set to false for now.
 */
var supportsReadableStream = false;

/*
(async () => {
  try {
    if (
      typeof fetch === 'function' &&
      typeof Request === 'function' &&
      typeof ReadableStream === 'function'
    ) {
      // this feature detection requires dummy POST request
      const req = new Request('data:text/plain,', {
        method: 'POST',
        body: new ReadableStream(),
      });
      // if it has content-type header it doesn't regard body as stream
      if (req.headers.has('Content-Type')) {
        return false;
      }
      await (await fetch(req)).text();
      return true;
    }
  } catch (e) {
    // error might occur in env with CSP without connect-src data:
    return false;
  }
  return false;
})();
*/

/**
 *
 */
function toWhatwgReadableStream(ins) {
  return new ReadableStream({
    start: function start(controller) {
      ins.on('data', function (chunk) {
        return controller.enqueue(chunk);
      });
      ins.on('end', function () {
        return controller.close();
      });
    }
  });
}

/**
 *
 */
function readWhatwgReadableStream(_x, _x2) {
  return _readWhatwgReadableStream.apply(this, arguments);
}
/**
 *
 */
function _readWhatwgReadableStream() {
  _readWhatwgReadableStream = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(rs, outs) {
    var reader, readAndWrite, _readAndWrite;
    return _regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _readAndWrite = function _readAndWrite3() {
            _readAndWrite = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
              var _yield$reader$read, done, value;
              return _regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return reader.read();
                  case 2:
                    _yield$reader$read = _context2.sent;
                    done = _yield$reader$read.done;
                    value = _yield$reader$read.value;
                    if (!done) {
                      _context2.next = 8;
                      break;
                    }
                    outs.end();
                    return _context2.abrupt("return", false);
                  case 8:
                    outs.write(value);
                    return _context2.abrupt("return", true);
                  case 10:
                  case "end":
                    return _context2.stop();
                }
              }, _callee);
            }));
            return _readAndWrite.apply(this, arguments);
          };
          readAndWrite = function _readAndWrite2() {
            return _readAndWrite.apply(this, arguments);
          };
          reader = rs.getReader();
        case 3:
          _context3.next = 5;
          return readAndWrite();
        case 5:
          if (!_context3.sent) {
            _context3.next = 9;
            break;
          }
          ;
          _context3.next = 3;
          break;
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee2);
  }));
  return _readWhatwgReadableStream.apply(this, arguments);
}
function startFetchRequest(_x3, _x4, _x5, _x6, _x7) {
  return _startFetchRequest.apply(this, arguments);
}
/**
 *
 */
function _startFetchRequest() {
  _startFetchRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(request, options, input, output, emitter) {
    var _context4;
    var counter,
      followRedirect,
      url,
      reqBody,
      rreq,
      body,
      controller,
      res,
      headers,
      _iterator,
      _step,
      headerName,
      response,
      _args3 = arguments;
    return _regeneratorRuntime.wrap(function _callee3$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          counter = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : 0;
          followRedirect = options.followRedirect;
          url = request.url, reqBody = request.body, rreq = _objectWithoutProperties(request, _excluded);
          if (!(input && /^(post|put|patch)$/i.test(request.method))) {
            _context5.next = 14;
            break;
          }
          if (!supportsReadableStream) {
            _context5.next = 8;
            break;
          }
          _context5.t1 = toWhatwgReadableStream(input);
          _context5.next = 11;
          break;
        case 8:
          _context5.next = 10;
          return readAll(input);
        case 10:
          _context5.t1 = _context5.sent;
        case 11:
          _context5.t0 = _context5.t1;
          _context5.next = 15;
          break;
        case 14:
          _context5.t0 = undefined;
        case 15:
          body = _context5.t0;
          controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
          _context5.next = 19;
          return executeWithTimeout(function () {
            return fetch(url, _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, rreq), body ? {
              body: body
            } : {}), {}, {
              redirect: 'manual'
            }, controller ? {
              signal: controller.signal
            } : {}), {
              allowHTTP1ForStreamingUpload: true
            }));
          }, options.timeout, function () {
            return controller === null || controller === void 0 ? void 0 : controller.abort();
          });
        case 19:
          res = _context5.sent;
          headers = {}; // @ts-expect-error no .keys()?
          _iterator = _createForOfIteratorHelper(_keysInstanceProperty(_context4 = res.headers).call(_context4));
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              headerName = _step.value;
              headers[headerName.toLowerCase()] = res.headers.get(headerName);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          response = {
            statusCode: res.status,
            headers: headers
          };
          if (!(followRedirect && isRedirect(response.statusCode))) {
            _context5.next = 27;
            break;
          }
          try {
            performRedirectRequest(request, response, followRedirect, counter, function (req) {
              return startFetchRequest(req, options, undefined, output, emitter, counter + 1);
            });
          } catch (err) {
            emitter.emit('error', err);
          }
          return _context5.abrupt("return");
        case 27:
          emitter.emit('response', response);
          if (res.body) {
            readWhatwgReadableStream(res.body, output);
          } else {
            output.end();
          }
        case 29:
        case "end":
          return _context5.stop();
      }
    }, _callee3);
  }));
  return _startFetchRequest.apply(this, arguments);
}
function getResponseHeaderNames(xhr) {
  var _context;
  var headerLines = _filterInstanceProperty(_context = (xhr.getAllResponseHeaders() || '').split(/[\r\n]+/)).call(_context, function (l) {
    return _trimInstanceProperty(l).call(l) !== '';
  });
  return _mapInstanceProperty(headerLines).call(headerLines, function (headerLine) {
    return headerLine.split(/\s*:/)[0].toLowerCase();
  });
}

/**
 *
 */
function startXmlHttpRequest(_x8, _x9, _x10, _x11, _x12) {
  return _startXmlHttpRequest.apply(this, arguments);
}
/**
 *
 */
function _startXmlHttpRequest() {
  _startXmlHttpRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(request, options, input, output, emitter) {
    var counter,
      method,
      url,
      reqHeaders,
      followRedirect,
      reqBody,
      xhr,
      headerNames,
      headers,
      response,
      body,
      _args4 = arguments;
    return _regeneratorRuntime.wrap(function _callee4$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          counter = _args4.length > 5 && _args4[5] !== undefined ? _args4[5] : 0;
          method = request.method, url = request.url, reqHeaders = request.headers;
          followRedirect = options.followRedirect;
          if (!(input && /^(post|put|patch)$/i.test(method))) {
            _context6.next = 9;
            break;
          }
          _context6.next = 6;
          return readAll(input);
        case 6:
          _context6.t0 = _context6.sent;
          _context6.next = 10;
          break;
        case 9:
          _context6.t0 = null;
        case 10:
          reqBody = _context6.t0;
          xhr = new XMLHttpRequest();
          _context6.next = 14;
          return executeWithTimeout(function () {
            xhr.open(method, url);
            if (reqHeaders) {
              for (var header in reqHeaders) {
                xhr.setRequestHeader(header, reqHeaders[header]);
              }
            }
            if (options.timeout) {
              xhr.timeout = options.timeout;
            }
            xhr.responseType = 'arraybuffer';
            xhr.send(reqBody);
            return new _Promise(function (resolve, reject) {
              xhr.onload = function () {
                return resolve();
              };
              xhr.onerror = reject;
              xhr.ontimeout = reject;
              xhr.onabort = reject;
            });
          }, options.timeout, function () {
            return xhr.abort();
          });
        case 14:
          headerNames = getResponseHeaderNames(xhr);
          headers = _reduceInstanceProperty(headerNames).call(headerNames, function (headers, headerName) {
            return _objectSpread(_objectSpread({}, headers), {}, _defineProperty({}, headerName, xhr.getResponseHeader(headerName) || ''));
          }, {});
          response = {
            statusCode: xhr.status,
            headers: headers
          };
          if (!(followRedirect && isRedirect(response.statusCode))) {
            _context6.next = 20;
            break;
          }
          try {
            performRedirectRequest(request, response, followRedirect, counter, function (req) {
              return startXmlHttpRequest(req, options, undefined, output, emitter, counter + 1);
            });
          } catch (err) {
            emitter.emit('error', err);
          }
          return _context6.abrupt("return");
        case 20:
          if (!response.statusCode) {
            response.statusCode = 400;
            body = Buffer.from('Access Declined');
          } else {
            body = Buffer.from(xhr.response);
          }
          emitter.emit('response', response);
          output.write(body);
          output.end();
        case 24:
        case "end":
          return _context6.stop();
      }
    }, _callee4);
  }));
  return _startXmlHttpRequest.apply(this, arguments);
}
var defaults = {};

/**
 *
 */
export function setDefaults(defaults_) {
  defaults = defaults_;
}

/**
 *
 */
export default function request(req) {
  var options_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = _objectSpread(_objectSpread({}, defaults), options_);
  var _createHttpRequestHan = createHttpRequestHandlerStreams(req, options),
    input = _createHttpRequestHan.input,
    output = _createHttpRequestHan.output,
    stream = _createHttpRequestHan.stream;
  if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
    startFetchRequest(req, options, input, output, stream);
  } else {
    startXmlHttpRequest(req, options, input, output, stream);
  }
  return stream;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjcmVhdGVIdHRwUmVxdWVzdEhhbmRsZXJTdHJlYW1zIiwiZXhlY3V0ZVdpdGhUaW1lb3V0IiwiaXNSZWRpcmVjdCIsInBlcmZvcm1SZWRpcmVjdFJlcXVlc3QiLCJyZWFkQWxsIiwic3VwcG9ydHNSZWFkYWJsZVN0cmVhbSIsInRvV2hhdHdnUmVhZGFibGVTdHJlYW0iLCJpbnMiLCJSZWFkYWJsZVN0cmVhbSIsInN0YXJ0IiwiY29udHJvbGxlciIsIm9uIiwiY2h1bmsiLCJlbnF1ZXVlIiwiY2xvc2UiLCJyZWFkV2hhdHdnUmVhZGFibGVTdHJlYW0iLCJfeCIsIl94MiIsIl9yZWFkV2hhdHdnUmVhZGFibGVTdHJlYW0iLCJhcHBseSIsImFyZ3VtZW50cyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlMiIsInJzIiwib3V0cyIsInJlYWRlciIsInJlYWRBbmRXcml0ZSIsIl9yZWFkQW5kV3JpdGUiLCJ3cmFwIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQzIiwicHJldiIsIm5leHQiLCJfcmVhZEFuZFdyaXRlMyIsIl9jYWxsZWUiLCJfeWllbGQkcmVhZGVyJHJlYWQiLCJkb25lIiwidmFsdWUiLCJfY2FsbGVlJCIsIl9jb250ZXh0MiIsInJlYWQiLCJzZW50IiwiZW5kIiwiYWJydXB0Iiwid3JpdGUiLCJzdG9wIiwiX3JlYWRBbmRXcml0ZTIiLCJnZXRSZWFkZXIiLCJzdGFydEZldGNoUmVxdWVzdCIsIl94MyIsIl94NCIsIl94NSIsIl94NiIsIl94NyIsIl9zdGFydEZldGNoUmVxdWVzdCIsIl9jYWxsZWUzIiwicmVxdWVzdCIsIm9wdGlvbnMiLCJpbnB1dCIsIm91dHB1dCIsImVtaXR0ZXIiLCJfY29udGV4dDQiLCJjb3VudGVyIiwiZm9sbG93UmVkaXJlY3QiLCJ1cmwiLCJyZXFCb2R5IiwicnJlcSIsImJvZHkiLCJyZXMiLCJoZWFkZXJzIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJoZWFkZXJOYW1lIiwicmVzcG9uc2UiLCJfYXJnczMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDUiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfZXhjbHVkZWQiLCJ0ZXN0IiwibWV0aG9kIiwidDEiLCJ0MCIsIkFib3J0Q29udHJvbGxlciIsImZldGNoIiwiX29iamVjdFNwcmVhZCIsInJlZGlyZWN0Iiwic2lnbmFsIiwiYWxsb3dIVFRQMUZvclN0cmVhbWluZ1VwbG9hZCIsInRpbWVvdXQiLCJhYm9ydCIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX2tleXNJbnN0YW5jZVByb3BlcnR5IiwiY2FsbCIsInMiLCJuIiwidG9Mb3dlckNhc2UiLCJnZXQiLCJlcnIiLCJlIiwiZiIsInN0YXR1c0NvZGUiLCJzdGF0dXMiLCJyZXEiLCJlbWl0IiwiZ2V0UmVzcG9uc2VIZWFkZXJOYW1lcyIsInhociIsIl9jb250ZXh0IiwiaGVhZGVyTGluZXMiLCJfZmlsdGVySW5zdGFuY2VQcm9wZXJ0eSIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInNwbGl0IiwibCIsIl90cmltSW5zdGFuY2VQcm9wZXJ0eSIsIl9tYXBJbnN0YW5jZVByb3BlcnR5IiwiaGVhZGVyTGluZSIsInN0YXJ0WG1sSHR0cFJlcXVlc3QiLCJfeDgiLCJfeDkiLCJfeDEwIiwiX3gxMSIsIl94MTIiLCJfc3RhcnRYbWxIdHRwUmVxdWVzdCIsIl9jYWxsZWU0IiwicmVxSGVhZGVycyIsImhlYWRlck5hbWVzIiwiX2FyZ3M0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ2IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsInJlc3BvbnNlVHlwZSIsInNlbmQiLCJfUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbmxvYWQiLCJvbmVycm9yIiwib250aW1lb3V0Iiwib25hYm9ydCIsIl9yZWR1Y2VJbnN0YW5jZVByb3BlcnR5IiwiX2RlZmluZVByb3BlcnR5IiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJCdWZmZXIiLCJmcm9tIiwiZGVmYXVsdHMiLCJzZXREZWZhdWx0cyIsImRlZmF1bHRzXyIsIm9wdGlvbnNfIiwiX2NyZWF0ZUh0dHBSZXF1ZXN0SGFuIiwic3RyZWFtIiwid2luZG93Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Jyb3dzZXIvcmVxdWVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgUmVhZGFibGUsIFdyaXRhYmxlIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCB7XG4gIGNyZWF0ZUh0dHBSZXF1ZXN0SGFuZGxlclN0cmVhbXMsXG4gIGV4ZWN1dGVXaXRoVGltZW91dCxcbiAgaXNSZWRpcmVjdCxcbiAgcGVyZm9ybVJlZGlyZWN0UmVxdWVzdCxcbn0gZnJvbSAnLi4vcmVxdWVzdC1oZWxwZXInO1xuaW1wb3J0IHsgcmVhZEFsbCB9IGZyb20gJy4uL3V0aWwvc3RyZWFtJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0LCBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogQXMgdGhlIHJlcXVlc3Qgc3RyZW1pbmcgaXMgbm90IHlldCBzdXBwb3J0ZWQgb24gbWFqb3IgYnJvd3NlcnMsXG4gKiBpdCBpcyBzZXQgdG8gZmFsc2UgZm9yIG5vdy5cbiAqL1xuY29uc3Qgc3VwcG9ydHNSZWFkYWJsZVN0cmVhbSA9IGZhbHNlO1xuXG4vKlxuKGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2YgUmVhZGFibGVTdHJlYW0gPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIC8vIHRoaXMgZmVhdHVyZSBkZXRlY3Rpb24gcmVxdWlyZXMgZHVtbXkgUE9TVCByZXF1ZXN0XG4gICAgICBjb25zdCByZXEgPSBuZXcgUmVxdWVzdCgnZGF0YTp0ZXh0L3BsYWluLCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IG5ldyBSZWFkYWJsZVN0cmVhbSgpLFxuICAgICAgfSk7XG4gICAgICAvLyBpZiBpdCBoYXMgY29udGVudC10eXBlIGhlYWRlciBpdCBkb2Vzbid0IHJlZ2FyZCBib2R5IGFzIHN0cmVhbVxuICAgICAgaWYgKHJlcS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYXdhaXQgKGF3YWl0IGZldGNoKHJlcSkpLnRleHQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGVycm9yIG1pZ2h0IG9jY3VyIGluIGVudiB3aXRoIENTUCB3aXRob3V0IGNvbm5lY3Qtc3JjIGRhdGE6XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pKCk7XG4qL1xuXG4vKipcbiAqXG4gKi9cbmZ1bmN0aW9uIHRvV2hhdHdnUmVhZGFibGVTdHJlYW0oaW5zOiBSZWFkYWJsZSk6IFJlYWRhYmxlU3RyZWFtIHtcbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgc3RhcnQoY29udHJvbGxlcikge1xuICAgICAgaW5zLm9uKCdkYXRhJywgKGNodW5rKSA9PiBjb250cm9sbGVyLmVucXVldWUoY2h1bmspKTtcbiAgICAgIGlucy5vbignZW5kJywgKCkgPT4gY29udHJvbGxlci5jbG9zZSgpKTtcbiAgICB9LFxuICB9KTtcbn1cblxuLyoqXG4gKlxuICovXG5hc3luYyBmdW5jdGlvbiByZWFkV2hhdHdnUmVhZGFibGVTdHJlYW0ocnM6IFJlYWRhYmxlU3RyZWFtLCBvdXRzOiBXcml0YWJsZSkge1xuICBjb25zdCByZWFkZXIgPSBycy5nZXRSZWFkZXIoKTtcbiAgYXN5bmMgZnVuY3Rpb24gcmVhZEFuZFdyaXRlKCkge1xuICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgaWYgKGRvbmUpIHtcbiAgICAgIG91dHMuZW5kKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIG91dHMud3JpdGUodmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHdoaWxlIChhd2FpdCByZWFkQW5kV3JpdGUoKSk7XG59XG5cbi8qKlxuICpcbiAqL1xuYXN5bmMgZnVuY3Rpb24gc3RhcnRGZXRjaFJlcXVlc3QoXG4gIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0LFxuICBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMsXG4gIGlucHV0OiBSZWFkYWJsZSB8IHVuZGVmaW5lZCxcbiAgb3V0cHV0OiBXcml0YWJsZSxcbiAgZW1pdHRlcjogRXZlbnRFbWl0dGVyLFxuICBjb3VudGVyOiBudW1iZXIgPSAwLFxuKSB7XG4gIGNvbnN0IHsgZm9sbG93UmVkaXJlY3QgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHsgdXJsLCBib2R5OiByZXFCb2R5LCAuLi5ycmVxIH0gPSByZXF1ZXN0O1xuICBjb25zdCBib2R5ID1cbiAgICBpbnB1dCAmJiAvXihwb3N0fHB1dHxwYXRjaCkkL2kudGVzdChyZXF1ZXN0Lm1ldGhvZClcbiAgICAgID8gc3VwcG9ydHNSZWFkYWJsZVN0cmVhbVxuICAgICAgICA/IHRvV2hhdHdnUmVhZGFibGVTdHJlYW0oaW5wdXQpXG4gICAgICAgIDogYXdhaXQgcmVhZEFsbChpbnB1dClcbiAgICAgIDogdW5kZWZpbmVkO1xuICBjb25zdCBjb250cm9sbGVyID1cbiAgICB0eXBlb2YgQWJvcnRDb250cm9sbGVyICE9PSAndW5kZWZpbmVkJyA/IG5ldyBBYm9ydENvbnRyb2xsZXIoKSA6IHVuZGVmaW5lZDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZXhlY3V0ZVdpdGhUaW1lb3V0KFxuICAgICgpID0+XG4gICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgLi4ucnJlcSxcbiAgICAgICAgLi4uKGJvZHkgPyB7IGJvZHkgfSA6IHt9KSxcbiAgICAgICAgcmVkaXJlY3Q6ICdtYW51YWwnLFxuICAgICAgICAuLi4oY29udHJvbGxlciA/IHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9IDoge30pLFxuICAgICAgICAuLi4oeyBhbGxvd0hUVFAxRm9yU3RyZWFtaW5nVXBsb2FkOiB0cnVlIH0gYXMgYW55KSwgLy8gQ2hyb21lIGFsbG93cyByZXF1ZXN0IHN0cmVhbSBvbmx5IGluIEhUVFAyL1FVSUMgdW5sZXNzIHRoaXMgb3B0LWluIGZsYWdcbiAgICAgIH0pLFxuICAgIG9wdGlvbnMudGltZW91dCxcbiAgICAoKSA9PiBjb250cm9sbGVyPy5hYm9ydCgpLFxuICApO1xuICBjb25zdCBoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG4gIC8vIEB0cy1leHBlY3QtZXJyb3Igbm8gLmtleXMoKT9cbiAgZm9yIChjb25zdCBoZWFkZXJOYW1lIG9mIHJlcy5oZWFkZXJzLmtleXMoKSkge1xuICAgIGhlYWRlcnNbaGVhZGVyTmFtZS50b0xvd2VyQ2FzZSgpXSA9IHJlcy5oZWFkZXJzLmdldChoZWFkZXJOYW1lKTtcbiAgfVxuICBjb25zdCByZXNwb25zZSA9IHtcbiAgICBzdGF0dXNDb2RlOiByZXMuc3RhdHVzLFxuICAgIGhlYWRlcnMsXG4gIH07XG4gIGlmIChmb2xsb3dSZWRpcmVjdCAmJiBpc1JlZGlyZWN0KHJlc3BvbnNlLnN0YXR1c0NvZGUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHBlcmZvcm1SZWRpcmVjdFJlcXVlc3QoXG4gICAgICAgIHJlcXVlc3QsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgICBmb2xsb3dSZWRpcmVjdCxcbiAgICAgICAgY291bnRlcixcbiAgICAgICAgKHJlcSkgPT5cbiAgICAgICAgICBzdGFydEZldGNoUmVxdWVzdChcbiAgICAgICAgICAgIHJlcSxcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICBvdXRwdXQsXG4gICAgICAgICAgICBlbWl0dGVyLFxuICAgICAgICAgICAgY291bnRlciArIDEsXG4gICAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBlbWl0dGVyLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGVtaXR0ZXIuZW1pdCgncmVzcG9uc2UnLCByZXNwb25zZSk7XG4gIGlmIChyZXMuYm9keSkge1xuICAgIHJlYWRXaGF0d2dSZWFkYWJsZVN0cmVhbShyZXMuYm9keSwgb3V0cHV0KTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQuZW5kKCk7XG4gIH1cbn1cblxuLyoqXG4gKlxuICovXG5mdW5jdGlvbiBnZXRSZXNwb25zZUhlYWRlck5hbWVzKHhocjogWE1MSHR0cFJlcXVlc3QpIHtcbiAgY29uc3QgaGVhZGVyTGluZXMgPSAoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgIC5zcGxpdCgvW1xcclxcbl0rLylcbiAgICAuZmlsdGVyKChsKSA9PiBsLnRyaW0oKSAhPT0gJycpO1xuICByZXR1cm4gaGVhZGVyTGluZXMubWFwKChoZWFkZXJMaW5lKSA9PlxuICAgIGhlYWRlckxpbmUuc3BsaXQoL1xccyo6LylbMF0udG9Mb3dlckNhc2UoKSxcbiAgKTtcbn1cblxuLyoqXG4gKlxuICovXG5hc3luYyBmdW5jdGlvbiBzdGFydFhtbEh0dHBSZXF1ZXN0KFxuICByZXF1ZXN0OiBIdHRwUmVxdWVzdCxcbiAgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zLFxuICBpbnB1dDogUmVhZGFibGUgfCB1bmRlZmluZWQsXG4gIG91dHB1dDogV3JpdGFibGUsXG4gIGVtaXR0ZXI6IEV2ZW50RW1pdHRlcixcbiAgY291bnRlcjogbnVtYmVyID0gMCxcbikge1xuICBjb25zdCB7IG1ldGhvZCwgdXJsLCBoZWFkZXJzOiByZXFIZWFkZXJzIH0gPSByZXF1ZXN0O1xuICBjb25zdCB7IGZvbGxvd1JlZGlyZWN0IH0gPSBvcHRpb25zO1xuICBjb25zdCByZXFCb2R5ID1cbiAgICBpbnB1dCAmJiAvXihwb3N0fHB1dHxwYXRjaCkkL2kudGVzdChtZXRob2QpID8gYXdhaXQgcmVhZEFsbChpbnB1dCkgOiBudWxsO1xuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgYXdhaXQgZXhlY3V0ZVdpdGhUaW1lb3V0KFxuICAgICgpID0+IHtcbiAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgIGlmIChyZXFIZWFkZXJzKSB7XG4gICAgICAgIGZvciAoY29uc3QgaGVhZGVyIGluIHJlcUhlYWRlcnMpIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIHJlcUhlYWRlcnNbaGVhZGVyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnRpbWVvdXQpIHtcbiAgICAgICAgeGhyLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgICB9XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgIHhoci5zZW5kKHJlcUJvZHkpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoKTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSByZWplY3Q7XG4gICAgICAgIHhoci5vbmFib3J0ID0gcmVqZWN0O1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBvcHRpb25zLnRpbWVvdXQsXG4gICAgKCkgPT4geGhyLmFib3J0KCksXG4gICk7XG4gIGNvbnN0IGhlYWRlck5hbWVzID0gZ2V0UmVzcG9uc2VIZWFkZXJOYW1lcyh4aHIpO1xuICBjb25zdCBoZWFkZXJzID0gaGVhZGVyTmFtZXMucmVkdWNlPHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9PihcbiAgICAoaGVhZGVycywgaGVhZGVyTmFtZSkgPT4gKHtcbiAgICAgIC4uLmhlYWRlcnMsXG4gICAgICBbaGVhZGVyTmFtZV06IHhoci5nZXRSZXNwb25zZUhlYWRlcihoZWFkZXJOYW1lKSB8fCAnJyxcbiAgICB9KSxcbiAgICB7fSxcbiAgKTtcbiAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzQ29kZTogeGhyLnN0YXR1cyxcbiAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICB9O1xuICBpZiAoZm9sbG93UmVkaXJlY3QgJiYgaXNSZWRpcmVjdChyZXNwb25zZS5zdGF0dXNDb2RlKSkge1xuICAgIHRyeSB7XG4gICAgICBwZXJmb3JtUmVkaXJlY3RSZXF1ZXN0KFxuICAgICAgICByZXF1ZXN0LFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICAgZm9sbG93UmVkaXJlY3QsXG4gICAgICAgIGNvdW50ZXIsXG4gICAgICAgIChyZXEpID0+XG4gICAgICAgICAgc3RhcnRYbWxIdHRwUmVxdWVzdChcbiAgICAgICAgICAgIHJlcSxcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICBvdXRwdXQsXG4gICAgICAgICAgICBlbWl0dGVyLFxuICAgICAgICAgICAgY291bnRlciArIDEsXG4gICAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBlbWl0dGVyLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBib2R5OiBCdWZmZXI7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzQ29kZSkge1xuICAgIHJlc3BvbnNlLnN0YXR1c0NvZGUgPSA0MDA7XG4gICAgYm9keSA9IEJ1ZmZlci5mcm9tKCdBY2Nlc3MgRGVjbGluZWQnKTtcbiAgfSBlbHNlIHtcbiAgICBib2R5ID0gQnVmZmVyLmZyb20oeGhyLnJlc3BvbnNlKTtcbiAgfVxuICBlbWl0dGVyLmVtaXQoJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICBvdXRwdXQud3JpdGUoYm9keSk7XG4gIG91dHB1dC5lbmQoKTtcbn1cblxuLyoqXG4gKlxuICovXG5sZXQgZGVmYXVsdHM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9O1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0cyhkZWZhdWx0c186IEh0dHBSZXF1ZXN0T3B0aW9ucykge1xuICBkZWZhdWx0cyA9IGRlZmF1bHRzXztcbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0KFxuICByZXE6IEh0dHBSZXF1ZXN0LFxuICBvcHRpb25zXzogSHR0cFJlcXVlc3RPcHRpb25zID0ge30sXG4pIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHsgLi4uZGVmYXVsdHMsIC4uLm9wdGlvbnNfIH07XG4gIGNvbnN0IHsgaW5wdXQsIG91dHB1dCwgc3RyZWFtIH0gPSBjcmVhdGVIdHRwUmVxdWVzdEhhbmRsZXJTdHJlYW1zKFxuICAgIHJlcSxcbiAgICBvcHRpb25zLFxuICApO1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5mZXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHN0YXJ0RmV0Y2hSZXF1ZXN0KHJlcSwgb3B0aW9ucywgaW5wdXQsIG91dHB1dCwgc3RyZWFtKTtcbiAgfSBlbHNlIHtcbiAgICBzdGFydFhtbEh0dHBSZXF1ZXN0KHJlcSwgb3B0aW9ucywgaW5wdXQsIG91dHB1dCwgc3RyZWFtKTtcbiAgfVxuICByZXR1cm4gc3RyZWFtO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FDRUEsK0JBQStCLEVBQy9CQyxrQkFBa0IsRUFDbEJDLFVBQVUsRUFDVkMsc0JBQXNCLFFBQ2pCLG1CQUFtQjtBQUMxQixTQUFTQyxPQUFPLFFBQVEsZ0JBQWdCO0FBR3hDO0FBQ0E7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