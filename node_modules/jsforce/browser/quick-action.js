import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
/**
 * @file Represents Salesforce QuickAction
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

/**
 * type definitions
 */

/**
 * A class for quick action
 */
export var QuickAction = /*#__PURE__*/function () {
  /**
   *
   */
  function QuickAction(conn, path) {
    _classCallCheck(this, QuickAction);
    this._conn = conn;
    this._path = path;
  }

  /**
   * Describe the action's information (including layout, etc.)
   */
  return _createClass(QuickAction, [{
    key: "describe",
    value: (function () {
      var _describe = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var url, body;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              url = "".concat(this._path, "/describe");
              _context.next = 3;
              return this._conn.request(url);
            case 3:
              body = _context.sent;
              return _context.abrupt("return", body);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function describe() {
        return _describe.apply(this, arguments);
      }
      return describe;
    }()
    /**
     * Retrieve default field values in the action (for given record, if specified)
     */
    )
  }, {
    key: "defaultValues",
    value: (function () {
      var _defaultValues = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(contextId) {
        var url, body;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              url = "".concat(this._path, "/defaultValues");
              if (contextId) {
                url += "/".concat(contextId);
              }
              _context2.next = 4;
              return this._conn.request(url);
            case 4:
              body = _context2.sent;
              return _context2.abrupt("return", body);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function defaultValues(_x) {
        return _defaultValues.apply(this, arguments);
      }
      return defaultValues;
    }()
    /**
     * Execute the action for given context Id and record information
     */
    )
  }, {
    key: "execute",
    value: (function () {
      var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(contextId, record) {
        var requestBody, resBody;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              requestBody = {
                contextId: contextId,
                record: record
              };
              _context3.next = 3;
              return this._conn.requestPost(this._path, requestBody);
            case 3:
              resBody = _context3.sent;
              return _context3.abrupt("return", resBody);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function execute(_x2, _x3) {
        return _execute.apply(this, arguments);
      }
      return execute;
    }())
  }]);
}();
export default QuickAction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJRdWlja0FjdGlvbiIsImNvbm4iLCJwYXRoIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2Nvbm4iLCJfcGF0aCIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiX2Rlc2NyaWJlIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJ1cmwiLCJib2R5Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImNvbmNhdCIsInJlcXVlc3QiLCJzZW50IiwiYWJydXB0Iiwic3RvcCIsImRlc2NyaWJlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfZGVmYXVsdFZhbHVlcyIsIl9jYWxsZWUyIiwiY29udGV4dElkIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZGVmYXVsdFZhbHVlcyIsIl94IiwiX2V4ZWN1dGUiLCJfY2FsbGVlMyIsInJlY29yZCIsInJlcXVlc3RCb2R5IiwicmVzQm9keSIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInJlcXVlc3RQb3N0IiwiZXhlY3V0ZSIsIl94MiIsIl94MyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWljay1hY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBSZXByZXNlbnRzIFNhbGVzZm9yY2UgUXVpY2tBY3Rpb25cbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5pbXBvcnQgQ29ubmVjdGlvbiBmcm9tICcuL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IHtcbiAgRGVzY3JpYmVRdWlja0FjdGlvbkRldGFpbFJlc3VsdCxcbiAgUmVjb3JkLFxuICBPcHRpb25hbCxcbiAgU2NoZW1hLFxufSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiB0eXBlIGRlZmluaXRpb25zXG4gKi9cbmV4cG9ydCB0eXBlIFF1aWNrQWN0aW9uRGVmYXVsdFZhbHVlcyA9IHsgW25hbWU6IHN0cmluZ106IGFueSB9O1xuXG5leHBvcnQgdHlwZSBRdWlja0FjdGlvblJlc3VsdCA9IHtcbiAgaWQ6IHN0cmluZztcbiAgZmVlZEl0ZW1JZHM6IE9wdGlvbmFsPHN0cmluZ1tdPjtcbiAgc3VjY2VzczogYm9vbGVhbjtcbiAgY3JlYXRlZDogYm9vbGVhbjtcbiAgY29udGV4dElkOiBzdHJpbmc7XG4gIGVycm9yczogT2JqZWN0W107XG59O1xuXG4vKipcbiAqIEEgY2xhc3MgZm9yIHF1aWNrIGFjdGlvblxuICovXG5leHBvcnQgY2xhc3MgUXVpY2tBY3Rpb248UyBleHRlbmRzIFNjaGVtYT4ge1xuICBfY29ubjogQ29ubmVjdGlvbjxTPjtcbiAgX3BhdGg6IHN0cmluZztcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbm46IENvbm5lY3Rpb248Uz4sIHBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuX2Nvbm4gPSBjb25uO1xuICAgIHRoaXMuX3BhdGggPSBwYXRoO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2NyaWJlIHRoZSBhY3Rpb24ncyBpbmZvcm1hdGlvbiAoaW5jbHVkaW5nIGxheW91dCwgZXRjLilcbiAgICovXG4gIGFzeW5jIGRlc2NyaWJlKCk6IFByb21pc2U8RGVzY3JpYmVRdWlja0FjdGlvbkRldGFpbFJlc3VsdD4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuX3BhdGh9L2Rlc2NyaWJlYDtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgdGhpcy5fY29ubi5yZXF1ZXN0KHVybCk7XG4gICAgcmV0dXJuIGJvZHkgYXMgRGVzY3JpYmVRdWlja0FjdGlvbkRldGFpbFJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBkZWZhdWx0IGZpZWxkIHZhbHVlcyBpbiB0aGUgYWN0aW9uIChmb3IgZ2l2ZW4gcmVjb3JkLCBpZiBzcGVjaWZpZWQpXG4gICAqL1xuICBhc3luYyBkZWZhdWx0VmFsdWVzKGNvbnRleHRJZD86IHN0cmluZyk6IFByb21pc2U8UXVpY2tBY3Rpb25EZWZhdWx0VmFsdWVzPiB7XG4gICAgbGV0IHVybCA9IGAke3RoaXMuX3BhdGh9L2RlZmF1bHRWYWx1ZXNgO1xuICAgIGlmIChjb250ZXh0SWQpIHtcbiAgICAgIHVybCArPSBgLyR7Y29udGV4dElkfWA7XG4gICAgfVxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCB0aGlzLl9jb25uLnJlcXVlc3QodXJsKTtcbiAgICByZXR1cm4gYm9keSBhcyBRdWlja0FjdGlvbkRlZmF1bHRWYWx1ZXM7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgYWN0aW9uIGZvciBnaXZlbiBjb250ZXh0IElkIGFuZCByZWNvcmQgaW5mb3JtYXRpb25cbiAgICovXG4gIGFzeW5jIGV4ZWN1dGUoY29udGV4dElkOiBzdHJpbmcsIHJlY29yZDogUmVjb3JkKTogUHJvbWlzZTxRdWlja0FjdGlvblJlc3VsdD4ge1xuICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0geyBjb250ZXh0SWQsIHJlY29yZCB9O1xuICAgIGNvbnN0IHJlc0JvZHkgPSBhd2FpdCB0aGlzLl9jb25uLnJlcXVlc3RQb3N0KHRoaXMuX3BhdGgsIHJlcXVlc3RCb2R5KTtcbiAgICByZXR1cm4gcmVzQm9keSBhcyBRdWlja0FjdGlvblJlc3VsdDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWlja0FjdGlvbjtcbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQVNBO0FBQ0E7QUFDQTs7QUFZQTtBQUNBO0FBQ0E7QUFDQSxXQUFhQSxXQUFXO0VBSXRCO0FBQ0Y7QUFDQTtFQUNFLFNBQUFBLFlBQVlDLElBQW1CLEVBQUVDLElBQVksRUFBRTtJQUFBQyxlQUFBLE9BQUFILFdBQUE7SUFDN0MsSUFBSSxDQUFDSSxLQUFLLEdBQUdILElBQUk7SUFDakIsSUFBSSxDQUFDSSxLQUFLLEdBQUdILElBQUk7RUFDbkI7O0VBRUE7QUFDRjtBQUNBO0VBRkUsT0FBQUksWUFBQSxDQUFBTixXQUFBO0lBQUFPLEdBQUE7SUFBQUMsS0FBQTtNQUFBLElBQUFDLFNBQUEsR0FBQUMsaUJBQUEsZUFBQUMsbUJBQUEsQ0FBQUMsSUFBQSxDQUdBLFNBQUFDLFFBQUE7UUFBQSxJQUFBQyxHQUFBLEVBQUFDLElBQUE7UUFBQSxPQUFBSixtQkFBQSxDQUFBSyxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7VUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtZQUFBO2NBQ1FOLEdBQUcsTUFBQU8sTUFBQSxDQUFNLElBQUksQ0FBQ2hCLEtBQUs7Y0FBQWEsUUFBQSxDQUFBRSxJQUFBO2NBQUEsT0FDTixJQUFJLENBQUNoQixLQUFLLENBQUNrQixPQUFPLENBQUNSLEdBQUcsQ0FBQztZQUFBO2NBQXBDQyxJQUFJLEdBQUFHLFFBQUEsQ0FBQUssSUFBQTtjQUFBLE9BQUFMLFFBQUEsQ0FBQU0sTUFBQSxXQUNIVCxJQUFJO1lBQUE7WUFBQTtjQUFBLE9BQUFHLFFBQUEsQ0FBQU8sSUFBQTtVQUFBO1FBQUEsR0FBQVosT0FBQTtNQUFBLENBQ1o7TUFBQSxTQUFBYSxTQUFBO1FBQUEsT0FBQWpCLFNBQUEsQ0FBQWtCLEtBQUEsT0FBQUMsU0FBQTtNQUFBO01BQUEsT0FBQUYsUUFBQTtJQUFBO0lBRUQ7QUFDRjtBQUNBO0lBRkU7RUFBQTtJQUFBbkIsR0FBQTtJQUFBQyxLQUFBO01BQUEsSUFBQXFCLGNBQUEsR0FBQW5CLGlCQUFBLGVBQUFDLG1CQUFBLENBQUFDLElBQUEsQ0FHQSxTQUFBa0IsU0FBb0JDLFNBQWtCO1FBQUEsSUFBQWpCLEdBQUEsRUFBQUMsSUFBQTtRQUFBLE9BQUFKLG1CQUFBLENBQUFLLElBQUEsVUFBQWdCLFVBQUFDLFNBQUE7VUFBQSxrQkFBQUEsU0FBQSxDQUFBZCxJQUFBLEdBQUFjLFNBQUEsQ0FBQWIsSUFBQTtZQUFBO2NBQ2hDTixHQUFHLE1BQUFPLE1BQUEsQ0FBTSxJQUFJLENBQUNoQixLQUFLO2NBQ3ZCLElBQUkwQixTQUFTLEVBQUU7Z0JBQ2JqQixHQUFHLFFBQUFPLE1BQUEsQ0FBUVUsU0FBUyxDQUFFO2NBQ3hCO2NBQUNFLFNBQUEsQ0FBQWIsSUFBQTtjQUFBLE9BQ2tCLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ2tCLE9BQU8sQ0FBQ1IsR0FBRyxDQUFDO1lBQUE7Y0FBcENDLElBQUksR0FBQWtCLFNBQUEsQ0FBQVYsSUFBQTtjQUFBLE9BQUFVLFNBQUEsQ0FBQVQsTUFBQSxXQUNIVCxJQUFJO1lBQUE7WUFBQTtjQUFBLE9BQUFrQixTQUFBLENBQUFSLElBQUE7VUFBQTtRQUFBLEdBQUFLLFFBQUE7TUFBQSxDQUNaO01BQUEsU0FBQUksY0FBQUMsRUFBQTtRQUFBLE9BQUFOLGNBQUEsQ0FBQUYsS0FBQSxPQUFBQyxTQUFBO01BQUE7TUFBQSxPQUFBTSxhQUFBO0lBQUE7SUFFRDtBQUNGO0FBQ0E7SUFGRTtFQUFBO0lBQUEzQixHQUFBO0lBQUFDLEtBQUE7TUFBQSxJQUFBNEIsUUFBQSxHQUFBMUIsaUJBQUEsZUFBQUMsbUJBQUEsQ0FBQUMsSUFBQSxDQUdBLFNBQUF5QixTQUFjTixTQUFpQixFQUFFTyxNQUFjO1FBQUEsSUFBQUMsV0FBQSxFQUFBQyxPQUFBO1FBQUEsT0FBQTdCLG1CQUFBLENBQUFLLElBQUEsVUFBQXlCLFVBQUFDLFNBQUE7VUFBQSxrQkFBQUEsU0FBQSxDQUFBdkIsSUFBQSxHQUFBdUIsU0FBQSxDQUFBdEIsSUFBQTtZQUFBO2NBQ3ZDbUIsV0FBVyxHQUFHO2dCQUFFUixTQUFTLEVBQVRBLFNBQVM7Z0JBQUVPLE1BQU0sRUFBTkE7Y0FBTyxDQUFDO2NBQUFJLFNBQUEsQ0FBQXRCLElBQUE7Y0FBQSxPQUNuQixJQUFJLENBQUNoQixLQUFLLENBQUN1QyxXQUFXLENBQUMsSUFBSSxDQUFDdEMsS0FBSyxFQUFFa0MsV0FBVyxDQUFDO1lBQUE7Y0FBL0RDLE9BQU8sR0FBQUUsU0FBQSxDQUFBbkIsSUFBQTtjQUFBLE9BQUFtQixTQUFBLENBQUFsQixNQUFBLFdBQ05nQixPQUFPO1lBQUE7WUFBQTtjQUFBLE9BQUFFLFNBQUEsQ0FBQWpCLElBQUE7VUFBQTtRQUFBLEdBQUFZLFFBQUE7TUFBQSxDQUNmO01BQUEsU0FBQU8sUUFBQUMsR0FBQSxFQUFBQyxHQUFBO1FBQUEsT0FBQVYsUUFBQSxDQUFBVCxLQUFBLE9BQUFDLFNBQUE7TUFBQTtNQUFBLE9BQUFnQixPQUFBO0lBQUE7RUFBQTtBQUFBO0FBR0gsZUFBZTVDLFdBQVciLCJpZ25vcmVMaXN0IjpbXX0=