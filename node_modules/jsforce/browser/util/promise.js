import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _wrapNativeSuper from "@babel/runtime-corejs3/helpers/wrapNativeSuper";
import _Promise2 from "@babel/runtime-corejs3/core-js-stable/promise";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 *
 */
import { Duplex } from 'stream';

/**
 *
 */

/**
 *
 */
export var StreamPromise = /*#__PURE__*/function (_Promise) {
  function StreamPromise() {
    _classCallCheck(this, StreamPromise);
    return _callSuper(this, StreamPromise, arguments);
  }
  _inherits(StreamPromise, _Promise);
  return _createClass(StreamPromise, [{
    key: "stream",
    value: function stream() {
      // dummy
      return new Duplex();
    }
  }], [{
    key: "create",
    value: function create(builder) {
      var _builder = builder(),
        stream = _builder.stream,
        promise = _builder.promise;
      var streamPromise = new StreamPromise(function (resolve, reject) {
        promise.then(resolve, reject);
      });
      streamPromise.stream = function () {
        return stream;
      };
      return streamPromise;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(_Promise2));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEdXBsZXgiLCJTdHJlYW1Qcm9taXNlIiwiX1Byb21pc2UiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiYXJndW1lbnRzIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJzdHJlYW0iLCJjcmVhdGUiLCJidWlsZGVyIiwiX2J1aWxkZXIiLCJwcm9taXNlIiwic3RyZWFtUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aGVuIiwiX3dyYXBOYXRpdmVTdXBlciIsIl9Qcm9taXNlMiJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3Byb21pc2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICovXG5pbXBvcnQgeyBEdXBsZXggfSBmcm9tICdzdHJlYW0nO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCB0eXBlIFN0cmVhbVByb21pc2VCdWlsZGVyPFQ+ID0gKCkgPT4ge1xuICBzdHJlYW06IER1cGxleDtcbiAgcHJvbWlzZTogUHJvbWlzZTxUPjtcbn07XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmVhbVByb21pc2U8VD4gZXh0ZW5kcyBQcm9taXNlPFQ+IHtcbiAgc3RyZWFtKCkge1xuICAgIC8vIGR1bW15XG4gICAgcmV0dXJuIG5ldyBEdXBsZXgoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGU8VD4oYnVpbGRlcjogU3RyZWFtUHJvbWlzZUJ1aWxkZXI8VD4pIHtcbiAgICBjb25zdCB7IHN0cmVhbSwgcHJvbWlzZSB9ID0gYnVpbGRlcigpO1xuICAgIGNvbnN0IHN0cmVhbVByb21pc2UgPSBuZXcgU3RyZWFtUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBwcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgICBzdHJlYW1Qcm9taXNlLnN0cmVhbSA9ICgpID0+IHN0cmVhbTtcbiAgICByZXR1cm4gc3RyZWFtUHJvbWlzZTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsU0FBU0EsTUFBTSxRQUFRLFFBQVE7O0FBRS9CO0FBQ0E7QUFDQTs7QUFNQTtBQUNBO0FBQ0E7QUFDQSxXQUFhQyxhQUFhLDBCQUFBQyxRQUFBO0VBQUEsU0FBQUQsY0FBQTtJQUFBRSxlQUFBLE9BQUFGLGFBQUE7SUFBQSxPQUFBRyxVQUFBLE9BQUFILGFBQUEsRUFBQUksU0FBQTtFQUFBO0VBQUFDLFNBQUEsQ0FBQUwsYUFBQSxFQUFBQyxRQUFBO0VBQUEsT0FBQUssWUFBQSxDQUFBTixhQUFBO0lBQUFPLEdBQUE7SUFBQUMsS0FBQSxFQUN4QixTQUFBQyxPQUFBLEVBQVM7TUFDUDtNQUNBLE9BQU8sSUFBSVYsTUFBTSxDQUFDLENBQUM7SUFDckI7RUFBQztJQUFBUSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBRSxPQUFpQkMsT0FBZ0MsRUFBRTtNQUNqRCxJQUFBQyxRQUFBLEdBQTRCRCxPQUFPLENBQUMsQ0FBQztRQUE3QkYsTUFBTSxHQUFBRyxRQUFBLENBQU5ILE1BQU07UUFBRUksT0FBTyxHQUFBRCxRQUFBLENBQVBDLE9BQU87TUFDdkIsSUFBTUMsYUFBYSxHQUFHLElBQUlkLGFBQWEsQ0FBSSxVQUFDZSxPQUFPLEVBQUVDLE1BQU0sRUFBSztRQUM5REgsT0FBTyxDQUFDSSxJQUFJLENBQUNGLE9BQU8sRUFBRUMsTUFBTSxDQUFDO01BQy9CLENBQUMsQ0FBQztNQUNGRixhQUFhLENBQUNMLE1BQU0sR0FBRztRQUFBLE9BQU1BLE1BQU07TUFBQTtNQUNuQyxPQUFPSyxhQUFhO0lBQ3RCO0VBQUM7QUFBQSxnQkFBQUksZ0JBQUEsQ0FBQUMsU0FBQSIsImlnbm9yZUxpc3QiOltdfQ==