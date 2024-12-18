import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import { Duplex, PassThrough, Writable } from 'stream';
export function createLazyStream() {
  var ins = new PassThrough();
  var outs = new PassThrough();
  var stream = concatStreamsAsDuplex(ins, outs);
  var piped = false;
  var setStream = function setStream(str) {
    if (piped) {
      throw new Error('stream is already piped to actual stream');
    }
    piped = true;
    ins.pipe(str).pipe(outs);
  };
  return {
    stream: stream,
    setStream: setStream
  };
}
var MemoryWriteStream = /*#__PURE__*/function (_Writable) {
  function MemoryWriteStream() {
    var _this;
    _classCallCheck(this, MemoryWriteStream);
    _this = _callSuper(this, MemoryWriteStream);
    _this._buf = Buffer.alloc(0);
    return _this;
  }
  _inherits(MemoryWriteStream, _Writable);
  return _createClass(MemoryWriteStream, [{
    key: "_write",
    value: function _write(chunk, encoding, callback) {
      this._buf = _concatInstanceProperty(Buffer).call(Buffer, [this._buf, chunk]);
      callback();
    }
  }, {
    key: "_writev",
    value: function _writev(data, callback) {
      var _context;
      this._buf = _concatInstanceProperty(Buffer).call(Buffer, _concatInstanceProperty(_context = [this._buf]).call(_context, _toConsumableArray(_mapInstanceProperty(data).call(data, function (_ref) {
        var chunk = _ref.chunk;
        return chunk;
      }))));
      callback();
    }
  }, {
    key: "toString",
    value: function toString() {
      var encoding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'utf-8';
      return this._buf.toString(encoding);
    }
  }]);
}(Writable);
export function readAll(_x) {
  return _readAll.apply(this, arguments);
}
function _readAll() {
  _readAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(rs) {
    var encoding,
      _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          encoding = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'utf-8';
          return _context2.abrupt("return", new _Promise(function (resolve, reject) {
            var ws = new MemoryWriteStream();
            rs.on('error', reject).pipe(ws).on('finish', function () {
              return resolve(ws.toString(encoding));
            });
          }));
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee);
  }));
  return _readAll.apply(this, arguments);
}
var DuplexifiedStream = /*#__PURE__*/function (_Duplex) {
  function DuplexifiedStream(ws, rs) {
    var _opts$writableObjectM, _opts$readableObjectM;
    var _this2;
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, DuplexifiedStream);
    _this2 = _callSuper(this, DuplexifiedStream, [{
      writableObjectMode: (_opts$writableObjectM = opts.writableObjectMode) !== null && _opts$writableObjectM !== void 0 ? _opts$writableObjectM : ws.writableObjectMode,
      readableObjectMode: (_opts$readableObjectM = opts.readableObjectMode) !== null && _opts$readableObjectM !== void 0 ? _opts$readableObjectM : rs.readableObjectMode
    }]);
    _this2._writable = ws;
    _this2._readable = rs;
    ws.once('finish', function () {
      _this2.end();
    });
    _this2.once('finish', function () {
      ws.end();
    });
    rs.on('readable', function () {
      _this2._readStream();
    });
    rs.once('end', function () {
      _this2.push(null);
    });
    ws.on('error', function (err) {
      return _this2.emit('error', err);
    });
    rs.on('error', function (err) {
      return _this2.emit('error', err);
    });
    return _this2;
  }
  _inherits(DuplexifiedStream, _Duplex);
  return _createClass(DuplexifiedStream, [{
    key: "_write",
    value: function _write(chunk, encoding, callback) {
      this._writable.write(chunk, encoding, callback);
    }
  }, {
    key: "_read",
    value: function _read(n) {
      this._readStream(n);
    }
  }, {
    key: "_readStream",
    value: function _readStream(n) {
      var data;
      while ((data = this._readable.read(n)) !== null) {
        this.push(data);
      }
    }
  }]);
}(Duplex);
export function concatStreamsAsDuplex(ws, rs, opts) {
  return new DuplexifiedStream(ws, rs, opts);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEdXBsZXgiLCJQYXNzVGhyb3VnaCIsIldyaXRhYmxlIiwiY3JlYXRlTGF6eVN0cmVhbSIsImlucyIsIm91dHMiLCJzdHJlYW0iLCJjb25jYXRTdHJlYW1zQXNEdXBsZXgiLCJwaXBlZCIsInNldFN0cmVhbSIsInN0ciIsIkVycm9yIiwicGlwZSIsIk1lbW9yeVdyaXRlU3RyZWFtIiwiX1dyaXRhYmxlIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiX2J1ZiIsIkJ1ZmZlciIsImFsbG9jIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJfd3JpdGUiLCJjaHVuayIsImVuY29kaW5nIiwiY2FsbGJhY2siLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsImNhbGwiLCJfd3JpdGV2IiwiZGF0YSIsIl9jb250ZXh0IiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiX21hcEluc3RhbmNlUHJvcGVydHkiLCJfcmVmIiwidG9TdHJpbmciLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJyZWFkQWxsIiwiX3giLCJfcmVhZEFsbCIsImFwcGx5IiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJycyIsIl9hcmdzIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQyIiwicHJldiIsIm5leHQiLCJhYnJ1cHQiLCJfUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3cyIsIm9uIiwic3RvcCIsIkR1cGxleGlmaWVkU3RyZWFtIiwiX0R1cGxleCIsIl9vcHRzJHdyaXRhYmxlT2JqZWN0TSIsIl9vcHRzJHJlYWRhYmxlT2JqZWN0TSIsIl90aGlzMiIsIm9wdHMiLCJ3cml0YWJsZU9iamVjdE1vZGUiLCJyZWFkYWJsZU9iamVjdE1vZGUiLCJfd3JpdGFibGUiLCJfcmVhZGFibGUiLCJvbmNlIiwiZW5kIiwiX3JlYWRTdHJlYW0iLCJwdXNoIiwiZXJyIiwiZW1pdCIsIndyaXRlIiwiX3JlYWQiLCJuIiwicmVhZCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3N0cmVhbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEdXBsZXgsIFBhc3NUaHJvdWdoLCBSZWFkYWJsZSwgV3JpdGFibGUgfSBmcm9tICdzdHJlYW0nO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGF6eVN0cmVhbSgpIHtcbiAgY29uc3QgaW5zID0gbmV3IFBhc3NUaHJvdWdoKCk7XG4gIGNvbnN0IG91dHMgPSBuZXcgUGFzc1Rocm91Z2goKTtcbiAgY29uc3Qgc3RyZWFtID0gY29uY2F0U3RyZWFtc0FzRHVwbGV4KGlucywgb3V0cyk7XG4gIGxldCBwaXBlZCA9IGZhbHNlO1xuICBjb25zdCBzZXRTdHJlYW0gPSAoc3RyOiBEdXBsZXgpID0+IHtcbiAgICBpZiAocGlwZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc3RyZWFtIGlzIGFscmVhZHkgcGlwZWQgdG8gYWN0dWFsIHN0cmVhbScpO1xuICAgIH1cbiAgICBwaXBlZCA9IHRydWU7XG4gICAgaW5zLnBpcGUoc3RyKS5waXBlKG91dHMpO1xuICB9O1xuICByZXR1cm4geyBzdHJlYW0sIHNldFN0cmVhbSB9O1xufVxuXG5jbGFzcyBNZW1vcnlXcml0ZVN0cmVhbSBleHRlbmRzIFdyaXRhYmxlIHtcbiAgX2J1ZjogQnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYnVmID0gQnVmZmVyLmFsbG9jKDApO1xuICB9XG5cbiAgX3dyaXRlKGNodW5rOiBCdWZmZXIsIGVuY29kaW5nOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIHRoaXMuX2J1ZiA9IEJ1ZmZlci5jb25jYXQoW3RoaXMuX2J1ZiwgY2h1bmtdKTtcbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgX3dyaXRldihcbiAgICBkYXRhOiBBcnJheTx7IGNodW5rOiBCdWZmZXI7IGVuY29kaW5nOiBzdHJpbmcgfT4sXG4gICAgY2FsbGJhY2s6IEZ1bmN0aW9uLFxuICApIHtcbiAgICB0aGlzLl9idWYgPSBCdWZmZXIuY29uY2F0KFt0aGlzLl9idWYsIC4uLmRhdGEubWFwKCh7IGNodW5rIH0pID0+IGNodW5rKV0pO1xuICAgIGNhbGxiYWNrKCk7XG4gIH1cblxuICB0b1N0cmluZyhlbmNvZGluZzogQnVmZmVyRW5jb2RpbmcgPSAndXRmLTgnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2J1Zi50b1N0cmluZyhlbmNvZGluZyk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWRBbGwoXG4gIHJzOiBSZWFkYWJsZSxcbiAgZW5jb2Rpbmc6IEJ1ZmZlckVuY29kaW5nID0gJ3V0Zi04Jyxcbikge1xuICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgd3MgPSBuZXcgTWVtb3J5V3JpdGVTdHJlYW0oKTtcbiAgICBycy5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAucGlwZSh3cylcbiAgICAgIC5vbignZmluaXNoJywgKCkgPT4gcmVzb2x2ZSh3cy50b1N0cmluZyhlbmNvZGluZykpKTtcbiAgfSk7XG59XG5cbmNsYXNzIER1cGxleGlmaWVkU3RyZWFtIGV4dGVuZHMgRHVwbGV4IHtcbiAgX3dyaXRhYmxlOiBXcml0YWJsZTtcbiAgX3JlYWRhYmxlOiBSZWFkYWJsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB3czogV3JpdGFibGUsXG4gICAgcnM6IFJlYWRhYmxlLFxuICAgIG9wdHM6IHsgd3JpdGFibGVPYmplY3RNb2RlPzogYm9vbGVhbjsgcmVhZGFibGVPYmplY3RNb2RlPzogYm9vbGVhbiB9ID0ge30sXG4gICkge1xuICAgIHN1cGVyKHtcbiAgICAgIHdyaXRhYmxlT2JqZWN0TW9kZTogb3B0cy53cml0YWJsZU9iamVjdE1vZGUgPz8gd3Mud3JpdGFibGVPYmplY3RNb2RlLFxuICAgICAgcmVhZGFibGVPYmplY3RNb2RlOiBvcHRzLnJlYWRhYmxlT2JqZWN0TW9kZSA/PyBycy5yZWFkYWJsZU9iamVjdE1vZGUsXG4gICAgfSk7XG4gICAgdGhpcy5fd3JpdGFibGUgPSB3cztcbiAgICB0aGlzLl9yZWFkYWJsZSA9IHJzO1xuICAgIHdzLm9uY2UoJ2ZpbmlzaCcsICgpID0+IHtcbiAgICAgIHRoaXMuZW5kKCk7XG4gICAgfSk7XG4gICAgdGhpcy5vbmNlKCdmaW5pc2gnLCAoKSA9PiB7XG4gICAgICB3cy5lbmQoKTtcbiAgICB9KTtcbiAgICBycy5vbigncmVhZGFibGUnLCAoKSA9PiB7XG4gICAgICB0aGlzLl9yZWFkU3RyZWFtKCk7XG4gICAgfSk7XG4gICAgcnMub25jZSgnZW5kJywgKCkgPT4ge1xuICAgICAgdGhpcy5wdXNoKG51bGwpO1xuICAgIH0pO1xuICAgIHdzLm9uKCdlcnJvcicsIChlcnIpID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKTtcbiAgICBycy5vbignZXJyb3InLCAoZXJyKSA9PiB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKSk7XG4gIH1cblxuICBfd3JpdGUoY2h1bms6IGFueSwgZW5jb2Rpbmc6IGFueSwgY2FsbGJhY2s6IGFueSkge1xuICAgIHRoaXMuX3dyaXRhYmxlLndyaXRlKGNodW5rLCBlbmNvZGluZywgY2FsbGJhY2spO1xuICB9XG5cbiAgX3JlYWQobjogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVhZFN0cmVhbShuKTtcbiAgfVxuXG4gIF9yZWFkU3RyZWFtKG4/OiBudW1iZXIpIHtcbiAgICBsZXQgZGF0YTtcbiAgICB3aGlsZSAoKGRhdGEgPSB0aGlzLl9yZWFkYWJsZS5yZWFkKG4pKSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5wdXNoKGRhdGEpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0U3RyZWFtc0FzRHVwbGV4KFxuICB3czogV3JpdGFibGUsXG4gIHJzOiBSZWFkYWJsZSxcbiAgb3B0cz86IHsgd3JpdGFibGVPYmplY3RNb2RlPzogYm9vbGVhbjsgcmVhZGFibGVPYmplY3RNb2RlPzogYm9vbGVhbiB9LFxuKTogRHVwbGV4IHtcbiAgcmV0dXJuIG5ldyBEdXBsZXhpZmllZFN0cmVhbSh3cywgcnMsIG9wdHMpO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxNQUFNLEVBQUVDLFdBQVcsRUFBWUMsUUFBUSxRQUFRLFFBQVE7QUFFaEUsT0FBTyxTQUFTQyxnQkFBZ0JBLENBQUEsRUFBRztFQUNqQyxJQUFNQyxHQUFHLEdBQUcsSUFBSUgsV0FBVyxDQUFDLENBQUM7RUFDN0IsSUFBTUksSUFBSSxHQUFHLElBQUlKLFdBQVcsQ0FBQyxDQUFDO0VBQzlCLElBQU1LLE1BQU0sR0FBR0MscUJBQXFCLENBQUNILEdBQUcsRUFBRUMsSUFBSSxDQUFDO0VBQy9DLElBQUlHLEtBQUssR0FBRyxLQUFLO0VBQ2pCLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFJQyxHQUFXLEVBQUs7SUFDakMsSUFBSUYsS0FBSyxFQUFFO01BQ1QsTUFBTSxJQUFJRyxLQUFLLENBQUMsMENBQTBDLENBQUM7SUFDN0Q7SUFDQUgsS0FBSyxHQUFHLElBQUk7SUFDWkosR0FBRyxDQUFDUSxJQUFJLENBQUNGLEdBQUcsQ0FBQyxDQUFDRSxJQUFJLENBQUNQLElBQUksQ0FBQztFQUMxQixDQUFDO0VBQ0QsT0FBTztJQUFFQyxNQUFNLEVBQU5BLE1BQU07SUFBRUcsU0FBUyxFQUFUQTtFQUFVLENBQUM7QUFDOUI7QUFBQyxJQUVLSSxpQkFBaUIsMEJBQUFDLFNBQUE7RUFHckIsU0FBQUQsa0JBQUEsRUFBYztJQUFBLElBQUFFLEtBQUE7SUFBQUMsZUFBQSxPQUFBSCxpQkFBQTtJQUNaRSxLQUFBLEdBQUFFLFVBQUEsT0FBQUosaUJBQUE7SUFDQUUsS0FBQSxDQUFLRyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUFDLE9BQUFMLEtBQUE7RUFDOUI7RUFBQ00sU0FBQSxDQUFBUixpQkFBQSxFQUFB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