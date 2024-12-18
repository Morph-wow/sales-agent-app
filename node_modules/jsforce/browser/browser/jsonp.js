import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.push.js";
/**
 *
 */
import { Transform } from 'stream';
var _index = 0;
function processJsonpRequest(_x, _x2, _x3) {
  return _processJsonpRequest.apply(this, arguments);
}
function _processJsonpRequest() {
  _processJsonpRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(params, jsonpParam, timeout) {
    var _context2;
    var cbFuncName, callbacks, url, script, pid, res;
    return _regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(params.method.toUpperCase() !== 'GET')) {
            _context3.next = 2;
            break;
          }
          throw new Error('JSONP only supports GET request.');
        case 2:
          _index += 1;
          cbFuncName = "_jsforce_jsonpCallback_".concat(_index);
          callbacks = window;
          url = params.url;
          url += _indexOfInstanceProperty(url).call(url, '?') > 0 ? '&' : '?';
          url += _concatInstanceProperty(_context2 = "".concat(jsonpParam, "=")).call(_context2, cbFuncName);
          script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;
          if (document.documentElement) {
            document.documentElement.appendChild(script);
          }
          _context3.prev = 12;
          _context3.next = 15;
          return new _Promise(function (resolve, reject) {
            pid = _setTimeout(function () {
              reject(new Error('JSONP call time out.'));
            }, timeout);
            callbacks[cbFuncName] = resolve;
          });
        case 15:
          res = _context3.sent;
          return _context3.abrupt("return", {
            statusCode: 200,
            headers: {
              'content-type': 'application/json'
            },
            body: _JSON$stringify(res)
          });
        case 17:
          _context3.prev = 17;
          clearTimeout(pid);
          if (document.documentElement) {
            document.documentElement.removeChild(script);
          }
          delete callbacks[cbFuncName];
          return _context3.finish(17);
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee2, null, [[12,, 17, 22]]);
  }));
  return _processJsonpRequest.apply(this, arguments);
}
function createRequest() {
  var jsonpParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'callback';
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
  return function (params) {
    var stream = new Transform({
      transform: function transform(chunk, encoding, callback) {
        callback();
      },
      flush: function flush() {
        _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var response;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return processJsonpRequest(params, jsonpParam, timeout);
              case 2:
                response = _context.sent;
                stream.emit('response', response);
                stream.emit('complete', response);
                stream.push(response.body);
                stream.push(null);
              case 7:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      }
    });
    stream.end();
    return stream;
  };
}
export default {
  supported: typeof window !== 'undefined' && typeof document !== 'undefined',
  createRequest: createRequest
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUcmFuc2Zvcm0iLCJfaW5kZXgiLCJwcm9jZXNzSnNvbnBSZXF1ZXN0IiwiX3giLCJfeDIiLCJfeDMiLCJfcHJvY2Vzc0pzb25wUmVxdWVzdCIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUyIiwicGFyYW1zIiwianNvbnBQYXJhbSIsInRpbWVvdXQiLCJfY29udGV4dDIiLCJjYkZ1bmNOYW1lIiwiY2FsbGJhY2tzIiwidXJsIiwic2NyaXB0IiwicGlkIiwicmVzIiwid3JhcCIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MyIsInByZXYiLCJuZXh0IiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJFcnJvciIsImNvbmNhdCIsIndpbmRvdyIsIl9pbmRleE9mSW5zdGFuY2VQcm9wZXJ0eSIsImNhbGwiLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJzcmMiLCJkb2N1bWVudEVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsIl9Qcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIl9zZXRUaW1lb3V0Iiwic2VudCIsImFicnVwdCIsInN0YXR1c0NvZGUiLCJoZWFkZXJzIiwiYm9keSIsIl9KU09OJHN0cmluZ2lmeSIsImNsZWFyVGltZW91dCIsInJlbW92ZUNoaWxkIiwiZmluaXNoIiwic3RvcCIsImNyZWF0ZVJlcXVlc3QiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJzdHJlYW0iLCJ0cmFuc2Zvcm0iLCJjaHVuayIsImVuY29kaW5nIiwiY2FsbGJhY2siLCJmbHVzaCIsIl9jYWxsZWUiLCJyZXNwb25zZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJlbWl0IiwicHVzaCIsImVuZCIsInN1cHBvcnRlZCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9icm93c2VyL2pzb25wLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqL1xuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5sZXQgX2luZGV4ID0gMDtcblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0pzb25wUmVxdWVzdChcbiAgcGFyYW1zOiBIdHRwUmVxdWVzdCxcbiAganNvbnBQYXJhbTogc3RyaW5nLFxuICB0aW1lb3V0OiBudW1iZXIsXG4pIHtcbiAgaWYgKHBhcmFtcy5tZXRob2QudG9VcHBlckNhc2UoKSAhPT0gJ0dFVCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0pTT05QIG9ubHkgc3VwcG9ydHMgR0VUIHJlcXVlc3QuJyk7XG4gIH1cbiAgX2luZGV4ICs9IDE7XG4gIGNvbnN0IGNiRnVuY05hbWUgPSBgX2pzZm9yY2VfanNvbnBDYWxsYmFja18ke19pbmRleH1gO1xuICBjb25zdCBjYWxsYmFja3M6IGFueSA9IHdpbmRvdztcbiAgbGV0IHVybCA9IHBhcmFtcy51cmw7XG4gIHVybCArPSB1cmwuaW5kZXhPZignPycpID4gMCA/ICcmJyA6ICc/JztcbiAgdXJsICs9IGAke2pzb25wUGFyYW19PSR7Y2JGdW5jTmFtZX1gO1xuICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgc2NyaXB0LnNyYyA9IHVybDtcbiAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9XG4gIGxldCBwaWQ7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0pTT05QIGNhbGwgdGltZSBvdXQuJykpO1xuICAgICAgfSwgdGltZW91dCk7XG4gICAgICBjYWxsYmFja3NbY2JGdW5jTmFtZV0gPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcyksXG4gICAgfTtcbiAgfSBmaW5hbGx5IHtcbiAgICBjbGVhclRpbWVvdXQocGlkKTtcbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG4gICAgZGVsZXRlIGNhbGxiYWNrc1tjYkZ1bmNOYW1lXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVSZXF1ZXN0KFxuICBqc29ucFBhcmFtOiBzdHJpbmcgPSAnY2FsbGJhY2snLFxuICB0aW1lb3V0OiBudW1iZXIgPSAxMDAwMCxcbikge1xuICByZXR1cm4gKHBhcmFtczogSHR0cFJlcXVlc3QpID0+IHtcbiAgICBjb25zdCBzdHJlYW0gPSBuZXcgVHJhbnNmb3JtKHtcbiAgICAgIHRyYW5zZm9ybShjaHVuaywgZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9LFxuICAgICAgZmx1c2goKSB7XG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwcm9jZXNzSnNvbnBSZXF1ZXN0KFxuICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAganNvbnBQYXJhbSxcbiAgICAgICAgICAgIHRpbWVvdXQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzdHJlYW0uZW1pdCgncmVzcG9uc2UnLCByZXNwb25zZSk7XG4gICAgICAgICAgc3RyZWFtLmVtaXQoJ2NvbXBsZXRlJywgcmVzcG9uc2UpO1xuICAgICAgICAgIHN0cmVhbS5wdXNoKHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgIHN0cmVhbS5wdXNoKG51bGwpO1xuICAgICAgICB9KSgpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICBzdHJlYW0uZW5kKCk7XG4gICAgcmV0dXJuIHN0cmVhbTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdXBwb3J0ZWQ6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcsXG4gIGNyZWF0ZVJlcXVlc3QsXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxTQUFTLFFBQVEsUUFBUTtBQUdsQyxJQUFJQyxNQUFNLEdBQUcsQ0FBQztBQUFDLFNBRUFDLG1CQUFtQkEsQ0FBQUMsRUFBQSxFQUFBQyxHQUFBLEVBQUFDLEdBQUE7RUFBQSxPQUFBQyxvQkFBQSxDQUFBQyxLQUFBLE9BQUFDLFNBQUE7QUFBQTtBQUFBLFNBQUFGLHFCQUFBO0VBQUFBLG9CQUFBLEdBQUFHLGlCQUFBLGVBQUFDLG1CQUFBLENBQUFDLElBQUEsQ0FBbEMsU0FBQUMsU0FDRUMsTUFBbUIsRUFDbkJDLFVBQWtCLEVBQ2xCQyxPQUFlO0lBQUEsSUFBQUMsU0FBQTtJQUFBLElBQUFDLFVBQUEsRUFBQUMsU0FBQSxFQUFBQyxHQUFBLEVBQUFDLE1BQUEsRUFBQUMsR0FBQSxFQUFBQyxHQUFBO0lBQUEsT0FBQVosbUJBQUEsQ0FBQWEsSUFBQSxVQUFBQyxVQUFBQyxTQUFBO01BQUEsa0JBQUFBLFNBQUEsQ0FBQUMsSUFBQSxHQUFBRCxTQUFBLENBQUFFLElBQUE7UUFBQTtVQUFBLE1BRVhkLE1BQU0sQ0FBQ2UsTUFBTSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEtBQUs7WUFBQUosU0FBQSxDQUFBRSxJQUFBO1lBQUE7VUFBQTtVQUFBLE1BQ2pDLElBQUlHLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQztRQUFB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