import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _get from "@babel/runtime-corejs3/helpers/get";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
import _typeof from "@babel/runtime-corejs3/helpers/typeof";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
var _excluded = ["nullValue"];
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context8; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context8 = Object.prototype.toString.call(o)).call(_context8, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context6, _context7; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context6 = ownKeys(Object(t), !0)).call(_context6, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context7 = ownKeys(Object(t))).call(_context7, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reduce";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.replace.js";
/**
 * @file Represents stream that handles Salesforce record as stream data
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { Transform, PassThrough } from 'stream';
import { serializeCSVStream, parseCSVStream } from './csv';
import { concatStreamsAsDuplex } from './util/stream';

/**
 * type defs
 */

/**
 * @private
 */
function evalMapping(value, mapping) {
  if (typeof value === 'string') {
    var m = /^\$\{(\w+)\}$/.exec(value);
    if (m) {
      return mapping[m[1]];
    }
    return value.replace(/\$\{(\w+)\}/g, function ($0, prop) {
      var v = mapping[prop];
      return typeof v === 'undefined' || v === null ? '' : String(v);
    });
  }
  return value;
}

/**
 * @private
 */
function convertRecordForSerialization(record) {
  var _context;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _reduceInstanceProperty(_context = _Object$keys(record)).call(_context, function (rec, key) {
    var value = rec[key];
    var urec;
    if (key === 'attributes') {
      // 'attributes' prop will be ignored
      urec = _objectSpread({}, rec);
      delete urec[key];
      return urec;
    } else if (options.nullValue && value === null) {
      return _objectSpread(_objectSpread({}, rec), {}, _defineProperty({}, key, options.nullValue));
    } else if (value !== null && _typeof(value) === 'object') {
      var _context2;
      var precord = convertRecordForSerialization(value, options);
      return _reduceInstanceProperty(_context2 = _Object$keys(precord)).call(_context2, function (prec, pkey) {
        var _context3;
        prec[_concatInstanceProperty(_context3 = "".concat(key, ".")).call(_context3, pkey)] = precord[pkey]; // eslint-disable-line no-param-reassign
        return prec;
      }, _objectSpread({}, rec));
    }
    return rec;
  }, record);
}

/**
 * @private
 */
function createPipelineStream(s1, s2) {
  s1.pipe(s2);
  return concatStreamsAsDuplex(s1, s2, {
    writableObjectMode: true
  });
}
/**
 * @private
 */
var CSVStreamConverter = {
  serialize: function serialize() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var nullValue = options.nullValue,
      csvOpts = _objectWithoutProperties(options, _excluded);
    return createPipelineStream(
    // eslint-disable-next-line no-use-before-define
    _mapInstanceProperty(RecordStream).call(RecordStream, function (record) {
      return convertRecordForSerialization(record, options);
    }), serializeCSVStream(csvOpts));
  },
  parse: function parse() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return parseCSVStream(options);
  }
};

/**
 * @private
 */
var DataStreamConverters = {
  csv: CSVStreamConverter
};

/**
 * Class for Record Stream
 *
 * @class
 * @constructor
 * @extends stream.Transform
 */
export var RecordStream = /*#__PURE__*/function (_PassThrough) {
  /**
   *
   */
  function RecordStream() {
    var _this;
    _classCallCheck(this, RecordStream);
    _this = _callSuper(this, RecordStream, [{
      objectMode: true
    }]);
    /* @override */
    _defineProperty(_this, "addListener", _this.on);
    return _this;
  }

  /**
   * Get record stream of queried records applying the given mapping function
   */
  _inherits(RecordStream, _PassThrough);
  return _createClass(RecordStream, [{
    key: "map",
    value: function map(fn) {
      return this.pipe(_mapInstanceProperty(RecordStream).call(RecordStream, fn));
    }

    /**
     * Get record stream of queried records, applying the given filter function
     */
  }, {
    key: "filter",
    value: function filter(fn) {
      return this.pipe(_filterInstanceProperty(RecordStream).call(RecordStream, fn));
    }

    /* @override */
  }, {
    key: "on",
    value: function on(ev, fn) {
      return _get(_getPrototypeOf(RecordStream.prototype), "on", this).call(this, ev === 'record' ? 'data' : ev, fn);
    }
  }], [{
    key: "map",
    value: /* --------------------------------------------------- */

    /**
     * Create a record stream which maps records and pass them to downstream
     */
    function map(fn) {
      var mapStream = new Transform({
        objectMode: true,
        transform: function transform(record, enc, callback) {
          var rec = fn(record) || record; // if not returned record, use same record
          mapStream.push(rec);
          callback();
        }
      });
      return mapStream;
    }

    /**
     * Create mapping stream using given record template
     */
  }, {
    key: "recordMapStream",
    value: function recordMapStream(record, noeval) {
      return _mapInstanceProperty(RecordStream).call(RecordStream, function (rec) {
        var mapped = {
          Id: rec.Id
        };
        for (var _i = 0, _Object$keys2 = _Object$keys(record); _i < _Object$keys2.length; _i++) {
          var prop = _Object$keys2[_i];
          mapped[prop] = noeval ? record[prop] : evalMapping(record[prop], rec);
        }
        return mapped;
      });
    }

    /**
     * Create a record stream which filters records and pass them to downstream
     *
     * @param {RecordFilterFunction} fn - Record filtering function
     * @returns {RecordStream.Serializable}
     */
  }, {
    key: "filter",
    value: function filter(fn) {
      var filterStream = new Transform({
        objectMode: true,
        transform: function transform(record, enc, callback) {
          if (fn(record)) {
            filterStream.push(record);
          }
          callback();
        }
      });
      return filterStream;
    }
  }]);
}(PassThrough);

/**
 * @class RecordStream.Serializable
 * @extends {RecordStream}
 */
export var Serializable = /*#__PURE__*/function (_RecordStream2) {
  function Serializable() {
    var _context4;
    var _this2;
    _classCallCheck(this, Serializable);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _callSuper(this, Serializable, _concatInstanceProperty(_context4 = []).call(_context4, args));
    _defineProperty(_this2, "_dataStreams", {});
    return _this2;
  }
  _inherits(Serializable, _RecordStream2);
  return _createClass(Serializable, [{
    key: "stream",
    value:
    /**
     * Get readable data stream which emits serialized record data
     */
    function stream() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'csv';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this._dataStreams[type]) {
        return this._dataStreams[type];
      }
      var converter = DataStreamConverters[type];
      if (!converter) {
        throw new Error("Converting [".concat(type, "] data stream is not supported."));
      }
      var dataStream = new PassThrough();
      this.pipe(converter.serialize(options)).pipe(dataStream);
      this._dataStreams[type] = dataStream;
      return dataStream;
    }
  }]);
}(RecordStream);

/**
 * @class RecordStream.Parsable
 * @extends {RecordStream}
 */
export var Parsable = /*#__PURE__*/function (_RecordStream3) {
  function Parsable() {
    var _context5;
    var _this3;
    _classCallCheck(this, Parsable);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this3 = _callSuper(this, Parsable, _concatInstanceProperty(_context5 = []).call(_context5, args));
    _defineProperty(_this3, "_dataStreams", {});
    _defineProperty(_this3, "_execParse", false);
    _defineProperty(_this3, "_incomings", []);
    /* @override */
    _defineProperty(_this3, "addListener", _this3.on);
    return _this3;
  }
  _inherits(Parsable, _RecordStream3);
  return _createClass(Parsable, [{
    key: "stream",
    value:
    /**
     * Get writable data stream which accepts serialized record data
     */
    function stream() {
      var _this4 = this;
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'csv';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this._dataStreams[type]) {
        return this._dataStreams[type];
      }
      var converter = DataStreamConverters[type];
      if (!converter) {
        throw new Error("Converting [".concat(type, "] data stream is not supported."));
      }
      var dataStream = new PassThrough();
      var parserStream = converter.parse(options);
      parserStream.on('error', function (err) {
        return _this4.emit('error', err);
      });
      parserStream.pipe(this).pipe(new PassThrough({
        objectMode: true,
        highWaterMark: 500 * 1000
      }));
      if (this._execParse) {
        dataStream.pipe(parserStream);
      } else {
        this._incomings.push([dataStream, parserStream]);
      }
      this._dataStreams[type] = dataStream;
      return dataStream;
    }

    /* @override */
  }, {
    key: "on",
    value: function on(ev, fn) {
      if (ev === 'readable' || ev === 'record') {
        if (!this._execParse) {
          this._execParse = true;
          var _iterator = _createForOfIteratorHelper(this._incomings),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _slicedToArray(_step.value, 2),
                dataStream = _step$value[0],
                parserStream = _step$value[1];
              dataStream.pipe(parserStream);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
      return _get(_getPrototypeOf(Parsable.prototype), "on", this).call(this, ev, fn);
    }
  }]);
}(RecordStream);
export default RecordStream;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUcmFuc2Zvcm0iLCJQYXNzVGhyb3VnaCIsInNlcmlhbGl6ZUNTVlN0cmVhbSIsInBhcnNlQ1NWU3RyZWFtIiwiY29uY2F0U3RyZWFtc0FzRHVwbGV4IiwiZXZhbE1hcHBpbmciLCJ2YWx1ZSIsIm1hcHBpbmciLCJtIiwiZXhlYyIsInJlcGxhY2UiLCIkMCIsInByb3AiLCJ2IiwiU3RyaW5nIiwiY29udmVydFJlY29yZEZvclNlcmlhbGl6YXRpb24iLCJyZWNvcmQiLCJfY29udGV4dCIsIm9wdGlvbnMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJfcmVkdWNlSW5zdGFuY2VQcm9wZXJ0eSIsIl9PYmplY3Qka2V5cyIsImNhbGwiLCJyZWMiLCJrZXkiLCJ1cmVjIiwiX29iamVjdFNwcmVhZCIsIm51bGxWYWx1ZSIsIl9kZWZpbmVQcm9wZXJ0eSIsIl90eXBlb2YiLCJfY29udGV4dDIiLCJwcmVjb3JkIiwicHJlYyIsInBrZXkiLCJfY29udGV4dDMiLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsImNvbmNhdCIsImNyZWF0ZVBpcGVsaW5lU3RyZWFtIiwiczEiLCJzMiIsInBpcGUiLCJ3cml0YWJsZU9iamVjdE1vZGUiLCJDU1ZTdHJlYW1Db252ZXJ0ZXIiLCJzZXJpYWxpemUiLCJjc3ZPcHRzIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2V4Y2x1ZGVkIiwiX21hcEluc3RhbmNlUHJvcGVydHkiLCJSZWNvcmRTdHJlYW0iLCJwYXJzZSIsIkRhdGFTdHJlYW1Db252ZXJ0ZXJzIiwiY3N2IiwiX1Bhc3NUaHJvdWdoIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwib2JqZWN0TW9kZSIsIm9uIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwibWFwIiwiZm4iLCJmaWx0ZXIiLCJfZmlsdGVySW5zdGFuY2VQcm9wZXJ0eSIsImV2IiwiX2dldCIsIl9nZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsIm1hcFN0cmVhbSIsInRyYW5zZm9ybSIsImVuYyIsImNhbGxiYWNrIiwicHVzaCIsInJlY29yZE1hcFN0cmVhbSIsIm5vZXZhbCIsIm1hcHBlZCIsIklkIiwiX2kiLCJfT2JqZWN0JGtleXMyIiwiZmlsdGVyU3RyZWFtIiwiU2VyaWFsaXphYmxlIiwiX1JlY29yZFN0cmVhbTIiLCJfY29udGV4dDQiLCJfdGhpczIiLCJfbGVuIiwiYXJncyIsIkFycmF5IiwiX2tleSIsInN0cmVhbSIsInR5cGUiLCJfZGF0YVN0cmVhbXMiLCJjb252ZXJ0ZXIiLCJFcnJvciIsImRhdGFTdHJlYW0iLCJQYXJzYWJsZSIsIl9SZWNvcmRTdHJlYW0zIiwiX2NvbnRleHQ1IiwiX3RoaXMzIiwiX2xlbjIiLCJfa2V5MiIsIl90aGlzNCIsInBhcnNlclN0cmVhbSIsImVyciIsImVtaXQiLCJoaWdoV2F0ZXJNYXJrIiwiX2V4ZWNQYXJzZSIsIl9pbmNvbWluZ3MiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwiX3N0ZXAkdmFsdWUiLCJfc2xpY2VkVG9BcnJheSIsImUiLCJmIl0sInNvdXJjZXMiOlsiLi4vc3JjL3JlY29yZC1zdHJlYW0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBSZXByZXNlbnRzIHN0cmVhbSB0aGF0IGhhbmRsZXMgU2FsZXNmb3JjZSByZWNvcmQgYXMgc3RyZWFtIGRhdGFcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5pbXBvcnQgeyBSZWFkYWJsZSwgV3JpdGFibGUsIER1cGxleCwgVHJhbnNmb3JtLCBQYXNzVGhyb3VnaCB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgeyBSZWNvcmQsIE9wdGlvbmFsIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBzZXJpYWxpemVDU1ZTdHJlYW0sIHBhcnNlQ1NWU3RyZWFtIH0gZnJvbSAnLi9jc3YnO1xuaW1wb3J0IHsgY29uY2F0U3RyZWFtc0FzRHVwbGV4IH0gZnJvbSAnLi91dGlsL3N0cmVhbSc7XG5cbi8qKlxuICogdHlwZSBkZWZzXG4gKi9cbmV4cG9ydCB0eXBlIFJlY29yZFN0cmVhbVNlcmlhbGl6ZU9wdGlvbiA9IHtcbiAgbnVsbFZhbHVlPzogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgUmVjb3JkU3RyZWFtUGFyc2VPcHRpb24gPSB7fTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBldmFsTWFwcGluZyh2YWx1ZTogYW55LCBtYXBwaW5nOiB7IFtwcm9wOiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IG0gPSAvXlxcJFxceyhcXHcrKVxcfSQvLmV4ZWModmFsdWUpO1xuICAgIGlmIChtKSB7XG4gICAgICByZXR1cm4gbWFwcGluZ1ttWzFdXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcJFxceyhcXHcrKVxcfS9nLCAoJDAsIHByb3ApID0+IHtcbiAgICAgIGNvbnN0IHYgPSBtYXBwaW5nW3Byb3BdO1xuICAgICAgcmV0dXJuIHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsID8gJycgOiBTdHJpbmcodik7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRSZWNvcmRGb3JTZXJpYWxpemF0aW9uKFxuICByZWNvcmQ6IFJlY29yZCxcbiAgb3B0aW9uczogeyBudWxsVmFsdWU/OiBib29sZWFuIH0gPSB7fSxcbik6IFJlY29yZCB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhyZWNvcmQpLnJlZHVjZSgocmVjOiBSZWNvcmQsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSAocmVjIGFzIGFueSlba2V5XTtcbiAgICBsZXQgdXJlYzogUmVjb3JkO1xuICAgIGlmIChrZXkgPT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgLy8gJ2F0dHJpYnV0ZXMnIHByb3Agd2lsbCBiZSBpZ25vcmVkXG4gICAgICB1cmVjID0geyAuLi5yZWMgfTtcbiAgICAgIGRlbGV0ZSB1cmVjW2tleV07XG4gICAgICByZXR1cm4gdXJlYztcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMubnVsbFZhbHVlICYmIHZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4geyAuLi5yZWMsIFtrZXldOiBvcHRpb25zLm51bGxWYWx1ZSB9IGFzIFJlY29yZDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHByZWNvcmQgPSBjb252ZXJ0UmVjb3JkRm9yU2VyaWFsaXphdGlvbih2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMocHJlY29yZCkucmVkdWNlKFxuICAgICAgICAocHJlYzogUmVjb3JkLCBwa2V5KSA9PiB7XG4gICAgICAgICAgcHJlY1tgJHtrZXl9LiR7cGtleX1gXSA9IHByZWNvcmRbcGtleV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICByZXR1cm4gcHJlYztcbiAgICAgICAgfSxcbiAgICAgICAgeyAuLi5yZWMgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiByZWM7XG4gIH0sIHJlY29yZCk7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUGlwZWxpbmVTdHJlYW0oczE6IER1cGxleCwgczI6IER1cGxleCkge1xuICBzMS5waXBlKHMyKTtcbiAgcmV0dXJuIGNvbmNhdFN0cmVhbXNBc0R1cGxleChzMSwgczIsIHsgd3JpdGFibGVPYmplY3RNb2RlOiB0cnVlIH0pO1xufVxuXG50eXBlIFN0cmVhbUNvbnZlcnRlciA9IHtcbiAgc2VyaWFsaXplOiAob3B0aW9ucz86IFJlY29yZFN0cmVhbVNlcmlhbGl6ZU9wdGlvbikgPT4gRHVwbGV4O1xuICBwYXJzZTogKG9wdGlvbnM/OiBSZWNvcmRTdHJlYW1QYXJzZU9wdGlvbikgPT4gRHVwbGV4O1xufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBDU1ZTdHJlYW1Db252ZXJ0ZXI6IFN0cmVhbUNvbnZlcnRlciA9IHtcbiAgc2VyaWFsaXplKG9wdGlvbnM6IFJlY29yZFN0cmVhbVNlcmlhbGl6ZU9wdGlvbiA9IHt9KSB7XG4gICAgY29uc3QgeyBudWxsVmFsdWUsIC4uLmNzdk9wdHMgfSA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIGNyZWF0ZVBpcGVsaW5lU3RyZWFtKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgICBSZWNvcmRTdHJlYW0ubWFwKChyZWNvcmQpID0+XG4gICAgICAgIGNvbnZlcnRSZWNvcmRGb3JTZXJpYWxpemF0aW9uKHJlY29yZCwgb3B0aW9ucyksXG4gICAgICApLFxuICAgICAgc2VyaWFsaXplQ1NWU3RyZWFtKGNzdk9wdHMpLFxuICAgICk7XG4gIH0sXG4gIHBhcnNlKG9wdGlvbnM6IFJlY29yZFN0cmVhbVBhcnNlT3B0aW9uID0ge30pIHtcbiAgICByZXR1cm4gcGFyc2VDU1ZTdHJlYW0ob3B0aW9ucyk7XG4gIH0sXG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IERhdGFTdHJlYW1Db252ZXJ0ZXJzOiB7IFtrZXk6IHN0cmluZ106IFN0cmVhbUNvbnZlcnRlciB9ID0ge1xuICBjc3Y6IENTVlN0cmVhbUNvbnZlcnRlcixcbn07XG5cbi8qKlxuICogQ2xhc3MgZm9yIFJlY29yZCBTdHJlYW1cbiAqXG4gKiBAY2xhc3NcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgc3RyZWFtLlRyYW5zZm9ybVxuICovXG5leHBvcnQgY2xhc3MgUmVjb3JkU3RyZWFtPFIgZXh0ZW5kcyBSZWNvcmQgPSBSZWNvcmQ+IGV4dGVuZHMgUGFzc1Rocm91Z2gge1xuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHsgb2JqZWN0TW9kZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcmVjb3JkIHN0cmVhbSBvZiBxdWVyaWVkIHJlY29yZHMgYXBwbHlpbmcgdGhlIGdpdmVuIG1hcHBpbmcgZnVuY3Rpb25cbiAgICovXG4gIG1hcDxSUiBleHRlbmRzIFJlY29yZD4oZm46IChyZWM6IFIpID0+IE9wdGlvbmFsPFJSPikge1xuICAgIHJldHVybiB0aGlzLnBpcGUoUmVjb3JkU3RyZWFtLm1hcDxSLCBSUj4oZm4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcmVjb3JkIHN0cmVhbSBvZiBxdWVyaWVkIHJlY29yZHMsIGFwcGx5aW5nIHRoZSBnaXZlbiBmaWx0ZXIgZnVuY3Rpb25cbiAgICovXG4gIGZpbHRlcihmbjogKHJlYzogUikgPT4gYm9vbGVhbik6IER1cGxleCB7XG4gICAgcmV0dXJuIHRoaXMucGlwZShSZWNvcmRTdHJlYW0uZmlsdGVyPFI+KGZuKSk7XG4gIH1cblxuICAvKiBAb3ZlcnJpZGUgKi9cbiAgb24oZXY6IHN0cmluZywgZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCkge1xuICAgIHJldHVybiBzdXBlci5vbihldiA9PT0gJ3JlY29yZCcgPyAnZGF0YScgOiBldiwgZm4pO1xuICB9XG5cbiAgLyogQG92ZXJyaWRlICovXG4gIGFkZExpc3RlbmVyID0gdGhpcy5vbjtcblxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmVjb3JkIHN0cmVhbSB3aGljaCBtYXBzIHJlY29yZHMgYW5kIHBhc3MgdGhlbSB0byBkb3duc3RyZWFtXG4gICAqL1xuICBzdGF0aWMgbWFwPFIxIGV4dGVuZHMgUmVjb3JkID0gUmVjb3JkLCBSMiBleHRlbmRzIFJlY29yZCA9IFJlY29yZD4oXG4gICAgZm46IChyZWM6IFIxKSA9PiBPcHRpb25hbDxSMj4sXG4gICkge1xuICAgIGNvbnN0IG1hcFN0cmVhbSA9IG5ldyBUcmFuc2Zvcm0oe1xuICAgICAgb2JqZWN0TW9kZTogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybShyZWNvcmQsIGVuYywgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgcmVjID0gZm4ocmVjb3JkKSB8fCByZWNvcmQ7IC8vIGlmIG5vdCByZXR1cm5lZCByZWNvcmQsIHVzZSBzYW1lIHJlY29yZFxuICAgICAgICBtYXBTdHJlYW0ucHVzaChyZWMpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gbWFwU3RyZWFtO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBtYXBwaW5nIHN0cmVhbSB1c2luZyBnaXZlbiByZWNvcmQgdGVtcGxhdGVcbiAgICovXG4gIHN0YXRpYyByZWNvcmRNYXBTdHJlYW08XG4gICAgUjEgZXh0ZW5kcyBSZWNvcmQgPSBSZWNvcmQsXG4gICAgUjIgZXh0ZW5kcyBSZWNvcmQgPSBSZWNvcmRcbiAgPihyZWNvcmQ6IFIyLCBub2V2YWw/OiBib29sZWFuKSB7XG4gICAgcmV0dXJuIFJlY29yZFN0cmVhbS5tYXA8UjEsIFIyPigocmVjKSA9PiB7XG4gICAgICBjb25zdCBtYXBwZWQ6IFJlY29yZCA9IHsgSWQ6IHJlYy5JZCB9O1xuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKHJlY29yZCkpIHtcbiAgICAgICAgbWFwcGVkW3Byb3BdID0gbm9ldmFsID8gcmVjb3JkW3Byb3BdIDogZXZhbE1hcHBpbmcocmVjb3JkW3Byb3BdLCByZWMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hcHBlZCBhcyBSMjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByZWNvcmQgc3RyZWFtIHdoaWNoIGZpbHRlcnMgcmVjb3JkcyBhbmQgcGFzcyB0aGVtIHRvIGRvd25zdHJlYW1cbiAgICpcbiAgICogQHBhcmFtIHtSZWNvcmRGaWx0ZXJGdW5jdGlvbn0gZm4gLSBSZWNvcmQgZmlsdGVyaW5nIGZ1bmN0aW9uXG4gICAqIEByZXR1cm5zIHtSZWNvcmRTdHJlYW0uU2VyaWFsaXphYmxlfVxuICAgKi9cbiAgc3RhdGljIGZpbHRlcjxSMSBleHRlbmRzIFJlY29yZCA9IFJlY29yZD4oZm46IChyZWM6IFIxKSA9PiBib29sZWFuKTogRHVwbGV4IHtcbiAgICBjb25zdCBmaWx0ZXJTdHJlYW0gPSBuZXcgVHJhbnNmb3JtKHtcbiAgICAgIG9iamVjdE1vZGU6IHRydWUsXG4gICAgICB0cmFuc2Zvcm0ocmVjb3JkLCBlbmMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChmbihyZWNvcmQpKSB7XG4gICAgICAgICAgZmlsdGVyU3RyZWFtLnB1c2gocmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyU3RyZWFtO1xuICB9XG59XG5cbi8qKlxuICogQGNsYXNzIFJlY29yZFN0cmVhbS5TZXJpYWxpemFibGVcbiAqIEBleHRlbmRzIHtSZWNvcmRTdHJlYW19XG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJpYWxpemFibGU8UiBleHRlbmRzIFJlY29yZCA9IFJlY29yZD4gZXh0ZW5kcyBSZWNvcmRTdHJlYW08Uj4ge1xuICBfZGF0YVN0cmVhbXM6IHsgW3R5cGU6IHN0cmluZ106IER1cGxleCB9ID0ge307XG5cbiAgLyoqXG4gICAqIEdldCByZWFkYWJsZSBkYXRhIHN0cmVhbSB3aGljaCBlbWl0cyBzZXJpYWxpemVkIHJlY29yZCBkYXRhXG4gICAqL1xuICBzdHJlYW0odHlwZTogc3RyaW5nID0gJ2NzdicsIG9wdGlvbnM6IE9iamVjdCA9IHt9KTogRHVwbGV4IHtcbiAgICBpZiAodGhpcy5fZGF0YVN0cmVhbXNbdHlwZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhU3RyZWFtc1t0eXBlXTtcbiAgICB9XG4gICAgY29uc3QgY29udmVydGVyOiBPcHRpb25hbDxTdHJlYW1Db252ZXJ0ZXI+ID0gRGF0YVN0cmVhbUNvbnZlcnRlcnNbdHlwZV07XG4gICAgaWYgKCFjb252ZXJ0ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ29udmVydGluZyBbJHt0eXBlfV0gZGF0YSBzdHJlYW0gaXMgbm90IHN1cHBvcnRlZC5gKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YVN0cmVhbSA9IG5ldyBQYXNzVGhyb3VnaCgpO1xuICAgIHRoaXMucGlwZShjb252ZXJ0ZXIuc2VyaWFsaXplKG9wdGlvbnMpKS5waXBlKGRhdGFTdHJlYW0pO1xuICAgIHRoaXMuX2RhdGFTdHJlYW1zW3R5cGVdID0gZGF0YVN0cmVhbTtcbiAgICByZXR1cm4gZGF0YVN0cmVhbTtcbiAgfVxufVxuXG4vKipcbiAqIEBjbGFzcyBSZWNvcmRTdHJlYW0uUGFyc2FibGVcbiAqIEBleHRlbmRzIHtSZWNvcmRTdHJlYW19XG4gKi9cbmV4cG9ydCBjbGFzcyBQYXJzYWJsZTxSIGV4dGVuZHMgUmVjb3JkID0gUmVjb3JkPiBleHRlbmRzIFJlY29yZFN0cmVhbTxSPiB7XG4gIF9kYXRhU3RyZWFtczogeyBbdHlwZTogc3RyaW5nXTogRHVwbGV4IH0gPSB7fTtcbiAgX2V4ZWNQYXJzZTogYm9vbGVhbiA9IGZhbHNlO1xuICBfaW5jb21pbmdzOiBBcnJheTxbUmVhZGFibGUsIFdyaXRhYmxlXT4gPSBbXTtcblxuICAvKipcbiAgICogR2V0IHdyaXRhYmxlIGRhdGEgc3RyZWFtIHdoaWNoIGFjY2VwdHMgc2VyaWFsaXplZCByZWNvcmQgZGF0YVxuICAgKi9cbiAgc3RyZWFtKHR5cGU6IHN0cmluZyA9ICdjc3YnLCBvcHRpb25zOiBPYmplY3QgPSB7fSk6IER1cGxleCB7XG4gICAgaWYgKHRoaXMuX2RhdGFTdHJlYW1zW3R5cGVdKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVN0cmVhbXNbdHlwZV07XG4gICAgfVxuICAgIGNvbnN0IGNvbnZlcnRlcjogT3B0aW9uYWw8U3RyZWFtQ29udmVydGVyPiA9IERhdGFTdHJlYW1Db252ZXJ0ZXJzW3R5cGVdO1xuICAgIGlmICghY29udmVydGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbnZlcnRpbmcgWyR7dHlwZX1dIGRhdGEgc3RyZWFtIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGFTdHJlYW0gPSBuZXcgUGFzc1Rocm91Z2goKTtcbiAgICBjb25zdCBwYXJzZXJTdHJlYW0gPSBjb252ZXJ0ZXIucGFyc2Uob3B0aW9ucyk7XG4gICAgcGFyc2VyU3RyZWFtLm9uKCdlcnJvcicsIChlcnIpID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKTtcbiAgICBwYXJzZXJTdHJlYW1cbiAgICAgIC5waXBlKHRoaXMpXG4gICAgICAucGlwZShuZXcgUGFzc1Rocm91Z2goeyBvYmplY3RNb2RlOiB0cnVlLCBoaWdoV2F0ZXJNYXJrOiA1MDAgKiAxMDAwIH0pKTtcbiAgICBpZiAodGhpcy5fZXhlY1BhcnNlKSB7XG4gICAgICBkYXRhU3RyZWFtLnBpcGUocGFyc2VyU3RyZWFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW5jb21pbmdzLnB1c2goW2RhdGFTdHJlYW0sIHBhcnNlclN0cmVhbV0pO1xuICAgIH1cbiAgICB0aGlzLl9kYXRhU3RyZWFtc1t0eXBlXSA9IGRhdGFTdHJlYW07XG4gICAgcmV0dXJuIGRhdGFTdHJlYW07XG4gIH1cblxuICAvKiBAb3ZlcnJpZGUgKi9cbiAgb24oZXY6IHN0cmluZywgZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCkge1xuICAgIGlmIChldiA9PT0gJ3JlYWRhYmxlJyB8fCBldiA9PT0gJ3JlY29yZCcpIHtcbiAgICAgIGlmICghdGhpcy5fZXhlY1BhcnNlKSB7XG4gICAgICAgIHRoaXMuX2V4ZWNQYXJzZSA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgW2RhdGFTdHJlYW0sIHBhcnNlclN0cmVhbV0gb2YgdGhpcy5faW5jb21pbmdzKSB7XG4gICAgICAgICAgZGF0YVN0cmVhbS5waXBlKHBhcnNlclN0cmVhbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLm9uKGV2LCBmbik7XG4gIH1cblxuICAvKiBAb3ZlcnJpZGUgKi9cbiAgYWRkTGlzdGVuZXIgPSB0aGlzLm9uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvcmRTdHJlYW07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQXFDQSxTQUFTLEVBQUVDLFdBQVcsUUFBUSxRQUFRO0FBRTNFLFNBQVNDLGtCQUFrQixFQUFFQyxjQUFjLFFBQVEsT0FBTztBQUMxRCxTQUFTQyxxQkFBcUIsUUFBUSxlQUFlOztBQUVyRDtBQUNBO0FBQ0E7O0FBT0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0MsV0FBV0EsQ0FBQ0MsS0FBVSxFQUFFQyxPQUFtQyxFQUFFO0VBQ3BFLElBQUksT0FBT0QsS0FBSyxLQUFLLFFBQVEsRUFBRTtJQUM3QixJQUFNRSxDQUFDLEdBQUcsZUFBZSxDQUFDQyxJQUFJLENBQUNILEtBQUssQ0FBQztJQUNyQyxJQUFJRSxDQUFDLEVBQUU7TUFDTCxPQUFPRCxPQUFPLENBQUNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QjtJQUNBLE9BQU9GLEtBQUssQ0FBQ0ksT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFDQyxFQUFFLEVBQUVDLElBQUksRUFBSztNQUNqRCxJQUFNQyxDQUFDLEdBQUdOLE9BQU8sQ0FBQ0ssSUFBSSxDQUFDO01BQ3ZCLE9BQU8sT0FBT0MsQ0FBQyxLQUFLLFdBQVcsSUFBSUEsQ0FBQyxLQUFLLElBQUksR0FBRyxFQUFFLEdBQUdDLE1BQU0sQ0FBQ0QsQ0FBQyxDQUFDO0lBQ2hFLENBQUMsQ0FBQztFQUNKO0VBQ0EsT0FBT1AsS0FBSztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVNTLDZCQUE2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