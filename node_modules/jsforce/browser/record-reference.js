import "core-js/modules/es.array.push.js";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import "core-js/modules/es.array.join.js";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
/**
 *
 */

/**
 * Remote reference to record information
 */
export var RecordReference = /*#__PURE__*/function () {
  /**
   *
   */
  function RecordReference(conn, type, id) {
    _classCallCheck(this, RecordReference);
    /**
     * Synonym of Record#destroy()
     */
    _defineProperty(this, "delete", this.destroy);
    /**
     * Synonym of Record#destroy()
     */
    _defineProperty(this, "del", this.destroy);
    this._conn = conn;
    this.type = type;
    this.id = id;
  }

  /**
   * Retrieve record field information
   */
  return _createClass(RecordReference, [{
    key: "retrieve",
    value: (function () {
      var _retrieve = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(options) {
        var rec;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._conn.retrieve(this.type, this.id, options);
            case 2:
              rec = _context.sent;
              return _context.abrupt("return", rec);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve(_x) {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
    /**
     * Update record field information
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(record, options) {
        var record_;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              record_ = _objectSpread(_objectSpread({}, record), {}, {
                Id: this.id
              });
              return _context2.abrupt("return", this._conn.update(this.type, record_, options));
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function update(_x2, _x3) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Delete record field
     */
    )
  }, {
    key: "destroy",
    value: function destroy(options) {
      return this._conn.destroy(this.type, this.id, options);
    }
  }, {
    key: "blob",
    value:
    /**
     * Get blob field as stream
     *
     * @param {String} fieldName - Blob field name
     * @returns {stream.Stream}
     */
    function blob(fieldName) {
      var url = [this._conn._baseUrl(), 'sobjects', this.type, this.id, fieldName].join('/');
      return this._conn.request(url).stream();
    }
  }]);
}();
export default RecordReference;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWNvcmRSZWZlcmVuY2UiLCJjb25uIiwidHlwZSIsImlkIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiZGVzdHJveSIsIl9jb25uIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJfcmV0cmlldmUiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIm9wdGlvbnMiLCJyZWMiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicmV0cmlldmUiLCJzZW50IiwiYWJydXB0Iiwic3RvcCIsIl94IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfdXBkYXRlIiwiX2NhbGxlZTIiLCJyZWNvcmQiLCJyZWNvcmRfIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiX29iamVjdFNwcmVhZCIsIklkIiwidXBkYXRlIiwiX3gyIiwiX3gzIiwiYmxvYiIsImZpZWxkTmFtZSIsInVybCIsIl9iYXNlVXJsIiwiam9pbiIsInJlcXVlc3QiLCJzdHJlYW0iXSwic291cmNlcyI6WyIuLi9zcmMvcmVjb3JkLXJlZmVyZW5jZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKi9cbmltcG9ydCBDb25uZWN0aW9uIGZyb20gJy4vY29ubmVjdGlvbic7XG5pbXBvcnQge1xuICBSZXRyaWV2ZU9wdGlvbnMsXG4gIERtbE9wdGlvbnMsXG4gIFNjaGVtYSxcbiAgU09iamVjdE5hbWVzLFxuICBTT2JqZWN0SW5wdXRSZWNvcmQsXG4gIFNPYmplY3RVcGRhdGVSZWNvcmQsXG59IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFJlbW90ZSByZWZlcmVuY2UgdG8gcmVjb3JkIGluZm9ybWF0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWNvcmRSZWZlcmVuY2U8XG4gIFMgZXh0ZW5kcyBTY2hlbWEsXG4gIE4gZXh0ZW5kcyBTT2JqZWN0TmFtZXM8Uz4sXG4gIElucHV0UmVjb3JkIGV4dGVuZHMgU09iamVjdElucHV0UmVjb3JkPFMsIE4+ID0gU09iamVjdElucHV0UmVjb3JkPFMsIE4+LFxuICBSZXRyaWV2ZVJlY29yZCBleHRlbmRzIFNPYmplY3RVcGRhdGVSZWNvcmQ8UywgTj4gPSBTT2JqZWN0VXBkYXRlUmVjb3JkPFMsIE4+XG4+IHtcbiAgdHlwZTogTjtcbiAgaWQ6IHN0cmluZztcbiAgX2Nvbm46IENvbm5lY3Rpb248Uz47XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25uOiBDb25uZWN0aW9uPFM+LCB0eXBlOiBOLCBpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29ubiA9IGNvbm47XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgcmVjb3JkIGZpZWxkIGluZm9ybWF0aW9uXG4gICAqL1xuICBhc3luYyByZXRyaWV2ZShvcHRpb25zPzogUmV0cmlldmVPcHRpb25zKSB7XG4gICAgY29uc3QgcmVjID0gYXdhaXQgdGhpcy5fY29ubi5yZXRyaWV2ZSh0aGlzLnR5cGUsIHRoaXMuaWQsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZWMgYXMgUmV0cmlldmVSZWNvcmQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHJlY29yZCBmaWVsZCBpbmZvcm1hdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlKHJlY29yZDogSW5wdXRSZWNvcmQsIG9wdGlvbnM/OiBEbWxPcHRpb25zKSB7XG4gICAgY29uc3QgcmVjb3JkXyA9IHsgLi4ucmVjb3JkLCBJZDogdGhpcy5pZCB9O1xuICAgIHJldHVybiB0aGlzLl9jb25uLnVwZGF0ZSh0aGlzLnR5cGUsIHJlY29yZF8sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSByZWNvcmQgZmllbGRcbiAgICovXG4gIGRlc3Ryb3kob3B0aW9ucz86IERtbE9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5kZXN0cm95KHRoaXMudHlwZSwgdGhpcy5pZCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogU3lub255bSBvZiBSZWNvcmQjZGVzdHJveSgpXG4gICAqL1xuICBkZWxldGUgPSB0aGlzLmRlc3Ryb3k7XG5cbiAgLyoqXG4gICAqIFN5bm9ueW0gb2YgUmVjb3JkI2Rlc3Ryb3koKVxuICAgKi9cbiAgZGVsID0gdGhpcy5kZXN0cm95O1xuXG4gIC8qKlxuICAgKiBHZXQgYmxvYiBmaWVsZCBhcyBzdHJlYW1cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkTmFtZSAtIEJsb2IgZmllbGQgbmFtZVxuICAgKiBAcmV0dXJucyB7c3RyZWFtLlN0cmVhbX1cbiAgICovXG4gIGJsb2IoZmllbGROYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmwgPSBbXG4gICAgICB0aGlzLl9jb25uLl9iYXNlVXJsKCksXG4gICAgICAnc29iamVjdHMnLFxuICAgICAgdGhpcy50eXBlLFxuICAgICAgdGhpcy5pZCxcbiAgICAgIGZpZWxkTmFtZSxcbiAgICBdLmpvaW4oJy8nKTtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHVybCkuc3RyZWFtKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVjb3JkUmVmZXJlbmNlO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFXQTtBQUNBO0FBQ0E7QUFDQSxXQUFhQSxlQUFlO0VBVTFCO0FBQ0Y7QUFDQTtFQUNFLFNBQUFBLGdCQUFZQyxJQUFtQixFQUFFQyxJQUFPLEVBQUVDLEVBQVUsRUFBRTtJQUFBQyxlQUFBLE9BQUFKLGVBQUE7SUE2QnREO0FBQ0Y7QUFDQTtJQUZFSyxlQUFBLGlCQUdTLElBQUksQ0FBQ0MsT0FBTztJQUVyQjtBQUNGO0FBQ0E7SUFGRUQsZUFBQSxjQUdNLElBQUksQ0FBQ0MsT0FBTztJQXBDaEIsSUFBSSxDQUFDQyxLQUFLLEdBQUdOLElBQUk7SUFDakIsSUFBSSxDQUFDQyxJ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