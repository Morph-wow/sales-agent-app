import "core-js/modules/es.array.push.js";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import "core-js/modules/es.error.cause.js";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _Set from "@babel/runtime-corejs3/core-js-stable/set";
import { PassThrough } from 'stream';
import { concatStreamsAsDuplex, readAll } from './util/stream';
import FormData from 'form-data';

/**
 *
 */
export function createHttpRequestHandlerStreams(req) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var reqBody = req.body;
  var input = new PassThrough();
  var output = new PassThrough();
  var duplex = concatStreamsAsDuplex(input, output);
  if (typeof reqBody !== 'undefined') {
    _setTimeout(function () {
      if (reqBody instanceof FormData) {
        duplex.end(reqBody.getBuffer());
      } else {
        duplex.end(reqBody, 'utf8');
      }
    }, 0);
  }
  duplex.on('response', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(res) {
      var resBody;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(duplex.listenerCount('complete') > 0)) {
              _context.next = 5;
              break;
            }
            _context.next = 3;
            return readAll(duplex, options.encoding);
          case 3:
            resBody = _context.sent;
            duplex.emit('complete', _objectSpread(_objectSpread({}, res), {}, {
              body: resBody
            }));
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return {
    input: input,
    output: output,
    stream: duplex
  };
}
var redirectStatuses = new _Set([301, 302, 303, 307, 308]);

/**
 *
 */
export function isRedirect(status) {
  return redirectStatuses.has(status);
}

/**
 *
 */
var MAX_REDIRECT_COUNT = 10;

/**
 *
 */
export function performRedirectRequest(req, res, followRedirect, counter, redirectCallback) {
  if (counter >= MAX_REDIRECT_COUNT) {
    throw new Error('Reached to maximum redirect count');
  }
  var redirectUrl = res.headers['location'];
  if (!redirectUrl) {
    throw new Error('No redirect URI found');
  }
  var getRedirectRequest = typeof followRedirect === 'function' ? followRedirect : function () {
    return {
      method: 'GET',
      url: redirectUrl,
      headers: req.headers
    };
  };
  var nextReqParams = getRedirectRequest(redirectUrl);
  if (!nextReqParams) {
    throw new Error('Cannot handle redirect for ' + redirectUrl);
  }
  redirectCallback(nextReqParams);
}

/**
 *
 */
export function executeWithTimeout(_x2, _x3, _x4) {
  return _executeWithTimeout.apply(this, arguments);
}
function _executeWithTimeout() {
  _executeWithTimeout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(execFn, msec, cancelCallback) {
    var timeout, pid, res;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          timeout = false;
          pid = msec != null ? _setTimeout(function () {
            timeout = true;
            cancelCallback === null || cancelCallback === void 0 || cancelCallback();
          }, msec) : undefined;
          _context2.prev = 2;
          _context2.next = 5;
          return execFn();
        case 5:
          res = _context2.sent;
        case 6:
          _context2.prev = 6;
          if (pid) {
            clearTimeout(pid);
          }
          return _context2.finish(6);
        case 9:
          if (!timeout) {
            _context2.next = 11;
            break;
          }
          throw new Error('Request Timeout');
        case 11:
          return _context2.abrupt("return", res);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2,, 6, 9]]);
  }));
  return _executeWithTimeout.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQYXNzVGhyb3VnaCIsImNvbmNhdFN0cmVhbXNBc0R1cGxleCIsInJlYWRBbGwiLCJGb3JtRGF0YSIsImNyZWF0ZUh0dHBSZXF1ZXN0SGFuZGxlclN0cmVhbXMiLCJyZXEiLCJvcHRpb25zIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwicmVxQm9keSIsImJvZHkiLCJpbnB1dCIsIm91dHB1dCIsImR1cGxleCIsIl9zZXRUaW1lb3V0IiwiZW5kIiwiZ2V0QnVmZmVyIiwib24iLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJyZXMiLCJyZXNCb2R5Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImxpc3RlbmVyQ291bnQiLCJlbmNvZGluZyIsInNlbnQiLCJlbWl0IiwiX29iamVjdFNwcmVhZCIsInN0b3AiLCJfeCIsImFwcGx5Iiwic3RyZWFtIiwicmVkaXJlY3RTdGF0dXNlcyIsIl9TZXQiLCJpc1JlZGlyZWN0Iiwic3RhdHVzIiwiaGFzIiwiTUFYX1JFRElSRUNUX0NPVU5UIiwicGVyZm9ybVJlZGlyZWN0UmVxdWVzdCIsImZvbGxvd1JlZGlyZWN0IiwiY291bnRlciIsInJlZGlyZWN0Q2FsbGJhY2siLCJFcnJvciIsInJlZGlyZWN0VXJsIiwiaGVhZGVycyIsImdldFJlZGlyZWN0UmVxdWVzdCIsIm1ldGhvZCIsInVybCIsIm5leHRSZXFQYXJhbXMiLCJleGVjdXRlV2l0aFRpbWVvdXQiLCJfeDIiLCJfeDMiLCJfeDQiLCJfZXhlY3V0ZVdpdGhUaW1lb3V0IiwiX2NhbGxlZTIiLCJleGVjRm4iLCJtc2VjIiwiY2FuY2VsQ2FsbGJhY2siLCJ0aW1lb3V0IiwicGlkIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiY2xlYXJUaW1lb3V0IiwiZmluaXNoIiwiYWJydXB0Il0sInNvdXJjZXMiOlsiLi4vc3JjL3JlcXVlc3QtaGVscGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhc3NUaHJvdWdoIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCB7IGNvbmNhdFN0cmVhbXNBc0R1cGxleCwgcmVhZEFsbCB9IGZyb20gJy4vdXRpbC9zdHJlYW0nO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3QsIEh0dHBSZXF1ZXN0T3B0aW9ucywgSHR0cFJlc3BvbnNlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSHR0cFJlcXVlc3RIYW5kbGVyU3RyZWFtcyhcbiAgcmVxOiBIdHRwUmVxdWVzdCxcbiAgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30sXG4pIHtcbiAgY29uc3QgeyBib2R5OiByZXFCb2R5IH0gPSByZXE7XG4gIGNvbnN0IGlucHV0ID0gbmV3IFBhc3NUaHJvdWdoKCk7XG4gIGNvbnN0IG91dHB1dCA9IG5ldyBQYXNzVGhyb3VnaCgpO1xuICBjb25zdCBkdXBsZXggPSBjb25jYXRTdHJlYW1zQXNEdXBsZXgoaW5wdXQsIG91dHB1dCk7XG5cbiAgaWYgKHR5cGVvZiByZXFCb2R5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHJlcUJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICBkdXBsZXguZW5kKHJlcUJvZHkuZ2V0QnVmZmVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHVwbGV4LmVuZChyZXFCb2R5LCAndXRmOCcpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG4gIGR1cGxleC5vbigncmVzcG9uc2UnLCBhc3luYyAocmVzKSA9PiB7XG4gICAgaWYgKGR1cGxleC5saXN0ZW5lckNvdW50KCdjb21wbGV0ZScpID4gMCkge1xuICAgICAgY29uc3QgcmVzQm9keSA9IGF3YWl0IHJlYWRBbGwoZHVwbGV4LCBvcHRpb25zLmVuY29kaW5nKTtcbiAgICAgIGR1cGxleC5lbWl0KCdjb21wbGV0ZScsIHtcbiAgICAgICAgLi4ucmVzLFxuICAgICAgICBib2R5OiByZXNCb2R5LFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHsgaW5wdXQsIG91dHB1dCwgc3RyZWFtOiBkdXBsZXggfTtcbn1cblxuY29uc3QgcmVkaXJlY3RTdGF0dXNlcyA9IG5ldyBTZXQoWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XSk7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVkaXJlY3Qoc3RhdHVzOiBudW1iZXIpIHtcbiAgcmV0dXJuIHJlZGlyZWN0U3RhdHVzZXMuaGFzKHN0YXR1cyk7XG59XG5cbi8qKlxuICpcbiAqL1xuY29uc3QgTUFYX1JFRElSRUNUX0NPVU5UID0gMTA7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm1SZWRpcmVjdFJlcXVlc3QoXG4gIHJlcTogSHR0cFJlcXVlc3QsXG4gIHJlczogT21pdDxIdHRwUmVzcG9uc2UsICdib2R5Jz4sXG4gIGZvbGxvd1JlZGlyZWN0OiBOb25OdWxsYWJsZTxIdHRwUmVxdWVzdE9wdGlvbnNbJ2ZvbGxvd1JlZGlyZWN0J10+LFxuICBjb3VudGVyOiBudW1iZXIsXG4gIHJlZGlyZWN0Q2FsbGJhY2s6IChyZXE6IEh0dHBSZXF1ZXN0KSA9PiB2b2lkLFxuKSB7XG4gIGlmIChjb3VudGVyID49IE1BWF9SRURJUkVDVF9DT1VOVCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUmVhY2hlZCB0byBtYXhpbXVtIHJlZGlyZWN0IGNvdW50Jyk7XG4gIH1cbiAgY29uc3QgcmVkaXJlY3RVcmwgPSByZXMuaGVhZGVyc1snbG9jYXRpb24nXTtcbiAgaWYgKCFyZWRpcmVjdFVybCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gcmVkaXJlY3QgVVJJIGZvdW5kJyk7XG4gIH1cbiAgY29uc3QgZ2V0UmVkaXJlY3RSZXF1ZXN0ID1cbiAgICB0eXBlb2YgZm9sbG93UmVkaXJlY3QgPT09ICdmdW5jdGlvbidcbiAgICAgID8gZm9sbG93UmVkaXJlY3RcbiAgICAgIDogKCkgPT4gKHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnIGFzIGNvbnN0LFxuICAgICAgICAgIHVybDogcmVkaXJlY3RVcmwsXG4gICAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMsXG4gICAgICAgIH0pO1xuICBjb25zdCBuZXh0UmVxUGFyYW1zID0gZ2V0UmVkaXJlY3RSZXF1ZXN0KHJlZGlyZWN0VXJsKTtcbiAgaWYgKCFuZXh0UmVxUGFyYW1zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaGFuZGxlIHJlZGlyZWN0IGZvciAnICsgcmVkaXJlY3RVcmwpO1xuICB9XG4gIHJlZGlyZWN0Q2FsbGJhY2sobmV4dFJlcVBhcmFtcyk7XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVXaXRoVGltZW91dDxUPihcbiAgZXhlY0ZuOiAoKSA9PiBQcm9taXNlPFQ+LFxuICBtc2VjOiBudW1iZXIgfCB1bmRlZmluZWQsXG4gIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gdm9pZCxcbik6IFByb21pc2U8VD4ge1xuICBsZXQgdGltZW91dCA9IGZhbHNlO1xuICBjb25zdCBwaWQgPVxuICAgIG1zZWMgIT0gbnVsbFxuICAgICAgPyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICBjYW5jZWxDYWxsYmFjaz8uKCk7XG4gICAgICAgIH0sIG1zZWMpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgbGV0IHJlcztcbiAgdHJ5IHtcbiAgICByZXMgPSBhd2FpdCBleGVjRm4oKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAocGlkKSB7XG4gICAgICBjbGVhclRpbWVvdXQocGlkKTtcbiAgICB9XG4gIH1cbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVlc3QgVGltZW91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