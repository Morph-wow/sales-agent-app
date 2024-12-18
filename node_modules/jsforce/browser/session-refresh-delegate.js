import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import "core-js/modules/es.error.cause.js";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _Date$now from "@babel/runtime-corejs3/core-js-stable/date/now";
/**
 *
 */
import { getLogger } from './util/logger';

/**
 *
 */

/**
 *
 */
export var SessionRefreshDelegate = /*#__PURE__*/function () {
  function SessionRefreshDelegate(conn, refreshFn) {
    _classCallCheck(this, SessionRefreshDelegate);
    _defineProperty(this, "_lastRefreshedAt", undefined);
    _defineProperty(this, "_refreshPromise", undefined);
    this._conn = conn;
    this._logger = conn._logLevel ? SessionRefreshDelegate._logger.createInstance(conn._logLevel) : SessionRefreshDelegate._logger;
    this._refreshFn = refreshFn;
  }

  /**
   * Refresh access token
   * @private
   */
  return _createClass(SessionRefreshDelegate, [{
    key: "refresh",
    value: (function () {
      var _refresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(since) {
        var _this = this;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(this._lastRefreshedAt && this._lastRefreshedAt > since)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              if (!this._refreshPromise) {
                _context.next = 6;
                break;
              }
              _context.next = 5;
              return this._refreshPromise;
            case 5:
              return _context.abrupt("return");
            case 6:
              _context.prev = 6;
              this._logger.info('<refresh token>');
              this._refreshPromise = new _Promise(function (resolve, reject) {
                _this._refreshFn(_this._conn, function (err, accessToken, res) {
                  if (!err) {
                    _this._logger.debug('Connection refresh completed.');
                    _this._conn.accessToken = accessToken;
                    _this._conn.emit('refresh', accessToken, res);
                    resolve();
                  } else {
                    reject(err);
                  }
                });
              });
              _context.next = 11;
              return this._refreshPromise;
            case 11:
              this._logger.info('<refresh complete>');
              _context.next = 17;
              break;
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](6);
              throw new Error("Unable to refresh session due to: ".concat(_context.t0.message));
            case 17:
              _context.prev = 17;
              this._refreshPromise = undefined;
              this._lastRefreshedAt = _Date$now();
              return _context.finish(17);
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[6, 14, 17, 21]]);
      }));
      function refresh(_x) {
        return _refresh.apply(this, arguments);
      }
      return refresh;
    }())
  }, {
    key: "isRefreshing",
    value: function isRefreshing() {
      return !!this._refreshPromise;
    }
  }, {
    key: "waitRefresh",
    value: function () {
      var _waitRefresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this._refreshPromise);
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function waitRefresh() {
        return _waitRefresh.apply(this, arguments);
      }
      return waitRefresh;
    }()
  }]);
}();
_defineProperty(SessionRefreshDelegate, "_logger", getLogger('session-refresh-delegate'));
export default SessionRefreshDelegate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXRMb2dnZXIiLCJTZXNzaW9uUmVmcmVzaERlbGVnYXRlIiwiY29ubiIsInJlZnJlc2hGbiIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsInVuZGVmaW5lZCIsIl9jb25uIiwiX2xvZ2dlciIsIl9sb2dMZXZlbCIsImNyZWF0ZUluc3RhbmNlIiwiX3JlZnJlc2hGbiIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiX3JlZnJlc2giLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsInNpbmNlIiwiX3RoaXMiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiX2xhc3RSZWZyZXNoZWRBdCIsImFicnVwdCIsIl9yZWZyZXNoUHJvbWlzZSIsImluZm8iLCJfUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJhY2Nlc3NUb2tlbiIsInJlcyIsImRlYnVnIiwiZW1pdCIsInQwIiwiRXJyb3IiLCJjb25jYXQiLCJtZXNzYWdlIiwiX0RhdGUkbm93IiwiZmluaXNoIiwic3RvcCIsInJlZnJlc2giLCJfeCIsImFwcGx5IiwiYXJndW1lbnRzIiwiaXNSZWZyZXNoaW5nIiwiX3dhaXRSZWZyZXNoIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJ3YWl0UmVmcmVzaCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXNzaW9uLXJlZnJlc2gtZGVsZWdhdGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICovXG5pbXBvcnQgeyBnZXRMb2dnZXIsIExvZ2dlciB9IGZyb20gJy4vdXRpbC9sb2dnZXInO1xuaW1wb3J0IHsgQ2FsbGJhY2ssIFNjaGVtYSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IENvbm5lY3Rpb24gZnJvbSAnLi9jb25uZWN0aW9uJztcbmltcG9ydCB7IFRva2VuUmVzcG9uc2UgfSBmcm9tICcuL29hdXRoMic7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgU2Vzc2lvblJlZnJlc2hGdW5jPFMgZXh0ZW5kcyBTY2hlbWE+ID0gKFxuICBjb25uOiBDb25uZWN0aW9uPFM+LFxuICBjYWxsYmFjazogQ2FsbGJhY2s8c3RyaW5nLCBUb2tlblJlc3BvbnNlPixcbikgPT4gdm9pZDtcblxuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgU2Vzc2lvblJlZnJlc2hEZWxlZ2F0ZTxTIGV4dGVuZHMgU2NoZW1hPiB7XG4gIHN0YXRpYyBfbG9nZ2VyOiBMb2dnZXIgPSBnZXRMb2dnZXIoJ3Nlc3Npb24tcmVmcmVzaC1kZWxlZ2F0ZScpO1xuXG4gIHByaXZhdGUgX3JlZnJlc2hGbjogU2Vzc2lvblJlZnJlc2hGdW5jPFM+O1xuICBwcml2YXRlIF9jb25uOiBDb25uZWN0aW9uPFM+O1xuICBwcml2YXRlIF9sb2dnZXI6IExvZ2dlcjtcbiAgcHJpdmF0ZSBfbGFzdFJlZnJlc2hlZEF0OiBudW1iZXIgfCB2b2lkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIF9yZWZyZXNoUHJvbWlzZTogUHJvbWlzZTx2b2lkPiB8IHZvaWQgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoY29ubjogQ29ubmVjdGlvbjxTPiwgcmVmcmVzaEZuOiBTZXNzaW9uUmVmcmVzaEZ1bmM8Uz4pIHtcbiAgICB0aGlzLl9jb25uID0gY29ubjtcbiAgICB0aGlzLl9sb2dnZXIgPSBjb25uLl9sb2dMZXZlbFxuICAgICAgPyBTZXNzaW9uUmVmcmVzaERlbGVnYXRlLl9sb2dnZXIuY3JlYXRlSW5zdGFuY2UoY29ubi5fbG9nTGV2ZWwpXG4gICAgICA6IFNlc3Npb25SZWZyZXNoRGVsZWdhdGUuX2xvZ2dlcjtcbiAgICB0aGlzLl9yZWZyZXNoRm4gPSByZWZyZXNoRm47XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCBhY2Nlc3MgdG9rZW5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIHJlZnJlc2goc2luY2U6IG51bWJlcikge1xuICAgIC8vIENhbGxiYWNrIGltbWVkaWF0ZWx5IFdoZW4gcmVmcmVzaGVkIGFmdGVyIGRlc2lnbmF0ZWQgdGltZVxuICAgIGlmICh0aGlzLl9sYXN0UmVmcmVzaGVkQXQgJiYgdGhpcy5fbGFzdFJlZnJlc2hlZEF0ID4gc2luY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3JlZnJlc2hQcm9taXNlKSB7XG4gICAgICBhd2FpdCB0aGlzLl9yZWZyZXNoUHJvbWlzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCc8cmVmcmVzaCB0b2tlbj4nKTtcbiAgICAgIHRoaXMuX3JlZnJlc2hQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLl9yZWZyZXNoRm4odGhpcy5fY29ubiwgKGVyciwgYWNjZXNzVG9rZW4sIHJlcykgPT4ge1xuICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZGVidWcoJ0Nvbm5lY3Rpb24gcmVmcmVzaCBjb21wbGV0ZWQuJyk7XG4gICAgICAgICAgICB0aGlzLl9jb25uLmFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XG4gICAgICAgICAgICB0aGlzLl9jb25uLmVtaXQoJ3JlZnJlc2gnLCBhY2Nlc3NUb2tlbiwgcmVzKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdGhpcy5fcmVmcmVzaFByb21pc2U7XG4gICAgICB0aGlzLl9sb2dnZXIuaW5mbygnPHJlZnJlc2ggY29tcGxldGU+Jyk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHJlZnJlc2ggc2Vzc2lvbiBkdWUgdG86ICR7KGVyciBhcyBFcnJvcikubWVzc2FnZX1gKVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9yZWZyZXNoUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2xhc3RSZWZyZXNoZWRBdCA9IERhdGUubm93KCk7XG4gICAgfVxuICB9XG5cbiAgaXNSZWZyZXNoaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX3JlZnJlc2hQcm9taXNlO1xuICB9XG5cbiAgYXN5bmMgd2FpdFJlZnJlc2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZnJlc2hQcm9taXNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlc3Npb25SZWZyZXNoRGVsZWdhdGU7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsU0FBU0EsU0FBUyxRQUFnQixlQUFlOztBQUtqRDtBQUNBO0FBQ0E7O0FBTUE7QUFDQTtBQUNBO0FBQ0EsV0FBYUMsc0JBQXNCO0VBU2pDLFNBQUFBLHVCQUFZQyxJQUFtQixFQUFFQyxTQUFnQyxFQUFFO0lBQUFDLGVBQUEsT0FBQUgsc0JBQUE7SUFBQUksZUFBQSwyQkFIekJDLFNBQVM7SUFBQUQsZUFBQSwwQkFDSEMsU0FBUztJQUd2RCxJQUFJLENBQUNDLEtBQUssR0FBR0wsSUFBSTtJQUNqQixJQUFJLENBQUNNLE9BQU8sR0FBR04sSUFBSSxDQUFDTyxTQUFTLEdBQ3pCUixzQkFBc0IsQ0FBQ08sT0FBTyxDQUFDRSxjQUFjLENBQUNSLElBQUksQ0FBQ08sU0FBUyxDQUFDLEdBQzdEUixzQkFBc0IsQ0FBQ08sT0FBTztJQUNsQyxJQUFJLENBQUNHLFVBQVUsR0FBR1IsU0FBUztFQUM3Qjs7RUFFQTtBQUNGO0FBQ0E7QUFDQTtFQUhFLE9BQUFTLFlBQUEsQ0FBQVgsc0JBQUE7SUFBQVksR0FBQTtJQUFBQyxLQUFBO01BQUEsSUFBQUMsUUFBQSxHQUFBQyxpQkFBQSxlQUFBQyxtQkFBQSxDQUFBQyxJQUFBLENBSUEsU0FBQUMsUUFBY0MsS0FBYTtRQUFBLElBQUFDLEtBQUE7UUFBQSxPQUFBSixtQkFBQSxDQUFBSyxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7VUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtZQUFBO2NBQUEsTUFFckIsSUFBSSxDQUFDQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUNBLGdCQUFnQixHQUFHUCxLQUFLO2dCQUFBSSxRQUFBLENBQUFFLElBQUE7Z0JBQUE7Y0FBQTtjQUFBLE9BQUFGLFFBQUEsQ0FBQUksTUFBQTtZQUFBO2NBQUEsS0FHdEQsSUFBSSxDQUFDQyxlQUFlO2dCQUFBTCxRQUFBLENBQUFFLElBQUE7Z0JBQUE7Y0FBQTtjQUFBRixRQUFBLENBQUFFLElBQUE7Y0FBQSxPQUNoQixJQUFJLENBQUNHLGVBQWU7WUFBQTtjQUFBLE9BQUFMLFFBQUEsQ0FBQUksTUFBQTtZQUFBO2NBQUFKLFFBQUEsQ0FBQUMsSUFBQTtjQUkxQixJQUFJLENBQUNqQixPQUFPLENBQUNzQixJQUFJLENBQUMsaUJBQWlCLENBQUM7Y0FDcEMsSUFBSSxDQUFDRCxlQUFlLEdBQUcsSUFBQUUsUUFBQSxDQUFZLFVBQUNDLE9BQU8sRUFBRUMsTUFBTSxFQUFLO2dCQUN0RFosS0FBSSxDQUFDVixVQUFVLENBQUNVLEtBQUksQ0FBQ2QsS0FBSyxFQUFFLFVBQUMyQixHQUFHLEVBQUVDLFdBQVcsRUFBRUMsR0FBRyxFQUFLO2tCQUNyRCxJQUFJLENBQUNGLEdBQUcsRUFBRTtvQkFDUmIsS0FBSSxDQUFDYixPQUFPLENBQUM2QixLQUFLLENBQUMsK0JBQStCLENBQUM7b0JBQ25EaEIsS0FBSSxDQUFDZCxLQUFLLENBQUM0QixXQUFXLEdBQUdBLFdBQVc7b0JBQ3BDZCxLQUFJLENBQUNkLEtBQUssQ0FBQytCLElBQUksQ0FBQyxTQUFTLEVBQUVILFdBQVcsRUFBRUMsR0FBRyxDQUFDO29CQUM1Q0osT0FBTyxDQUFDLENBQUM7a0JBQ1gsQ0FBQyxNQUFNO29CQUNMQyxNQUFNLENBQUNDLEdBQUcsQ0FBQztrQkFDYjtnQkFDRixDQUFDLENBQUM7Y0FDSixDQUFDLENBQUM7Y0FBQ1YsUUFBQSxDQUFBRSxJQUFBO2NBQUEsT0FDRyxJQUFJLENBQUNHLGVBQWU7WUFBQTtjQUMxQixJQUFJLENBQUNyQixPQUFPLENBQUNzQixJQUFJLENBQUMsb0JBQW9CLENBQUM7Y0FBQ04sUUFBQSxDQUFBRSxJQUFBO2NBQUE7WUFBQTtjQUFBRixRQUFBLENBQUFDLElBQUE7Y0FBQUQsUUFBQSxDQUFBZSxFQUFBLEdBQUFmLFFBQUE7Y0FBQSxNQUVsQyxJQUFJZ0IsS0FBSyxzQ0FBQUMsTUFBQSxDQUFzQ2pCLFFBQUEsQ0FBQWUsRUFBQSxDQUFlRyxPQUFPLENBQUUsQ0FBQztZQUFBO2NBQUFsQixRQUFBLENBQUFDLElBQUE7Y0FFOUUsSUFBSSxDQUFDSSxlQUFlLEdBQUd2QixTQUFTO2NBQ2hDLElBQUksQ0FBQ3FCLGdCQUFnQixHQUFHZ0IsU0FBQSxDQUFTLENBQUM7Y0FBQyxPQUFBbkIsUUFBQSxDQUFBb0IsTUFBQTtZQUFBO1lBQUE7Y0FBQSxPQUFBcEIsUUFBQSxDQUFBcUIsSUFBQTtVQUFBO1FBQUEsR0FBQTFCLE9BQUE7TUFBQSxDQUV0QztNQUFBLFNBQUEyQixRQUFBQyxFQUFBO1FBQUEsT0FBQWhDLFFBQUEsQ0FBQWlDLEtBQUEsT0FBQUMsU0FBQTtNQUFBO01BQUEsT0FBQUgsT0FBQTtJQUFBO0VBQUE7SUFBQWpDLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFvQyxhQUFBLEVBQXdCO01BQ3RCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQ3JCLGVBQWU7SUFDL0I7RUFBQztJQUFBaEIsR0FBQTtJQUFBQyxLQUFBO01BQUEsSUFBQXFDLFlBQUEsR0FBQW5DLGlCQUFBLGVBQUFDLG1CQUFBLENBQUFDLElBQUEsQ0FFRCxTQUFBa0MsU0FBQTtRQUFBLE9BQUFuQyxtQkFBQSxDQUFBSyxJQUFBLFVBQUErQixVQUFBQyxTQUFBO1VBQUEsa0JBQUFBLFNBQUEsQ0FBQTdCLElBQUEsR0FBQTZCLFNBQUEsQ0FBQTVCLElBQUE7WUFBQTtjQUFBLE9BQUE0QixTQUFBLENBQUExQixNQUFBLFdBQ1MsSUFBSSxDQUFDQyxlQUFlO1lBQUE7WUFBQTtjQUFBLE9BQUF5QixTQUFBLENBQUFULElBQUE7VUFBQTtRQUFBLEdBQUFPLFFBQUE7TUFBQSxDQUM1QjtNQUFBLFNBQUFHLFlBQUE7UUFBQSxPQUFBSixZQUFBLENBQUFILEtBQUEsT0FBQUMsU0FBQTtNQUFBO01BQUEsT0FBQU0sV0FBQTtJQUFBO0VBQUE7QUFBQTtBQUNGbEQsZUFBQSxDQTdEWUosc0JBQXNCLGFBQ1JELFNBQVMsQ0FBQywwQkFBMEIsQ0FBQztBQThEaEUsZUFBZUMsc0JBQXNCIiwiaWdub3JlTGlzdCI6W119