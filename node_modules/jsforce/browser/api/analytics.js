import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.push.js";
/**
 * @file Manages Salesforce Analytics API
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { registerModule } from '../jsforce';

/*----------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------*/
/**
 * Report object class in Analytics API
 */
export var ReportInstance = /*#__PURE__*/function () {
  /**
   *
   */
  function ReportInstance(report, id) {
    _classCallCheck(this, ReportInstance);
    this._report = report;
    this._conn = report._conn;
    this.id = id;
  }

  /**
   * Retrieve report result asynchronously executed
   */
  return _createClass(ReportInstance, [{
    key: "retrieve",
    value: function retrieve() {
      var url = [this._conn._baseUrl(), 'analytics', 'reports', this._report.id, 'instances', this.id].join('/');
      return this._conn.request(url);
    }
  }]);
}();

/*----------------------------------------------------------------------------------*/
/**
 * Report object class in Analytics API
 */
export var Report = /*#__PURE__*/function () {
  /**
   *
   */
  function Report(conn, id) {
    _classCallCheck(this, Report);
    /**
     * Synonym of Analytics~Report#destroy()
     */
    _defineProperty(this, "delete", this.destroy);
    /**
     * Synonym of Analytics~Report#destroy()
     */
    _defineProperty(this, "del", this.destroy);
    /**
     * Synonym of Analytics~Report#execute()
     */
    _defineProperty(this, "run", this.execute);
    /**
     * Synonym of Analytics~Report#execute()
     */
    _defineProperty(this, "exec", this.execute);
    this._conn = conn;
    this.id = id;
  }

  /**
   * Describe report metadata
   */
  return _createClass(Report, [{
    key: "describe",
    value: function describe() {
      var url = [this._conn._baseUrl(), 'analytics', 'reports', this.id, 'describe'].join('/');
      return this._conn.request(url);
    }

    /**
     * Destroy a report
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var url = [this._conn._baseUrl(), 'analytics', 'reports', this.id].join('/');
      return this._conn.request({
        method: 'DELETE',
        url: url
      });
    }
  }, {
    key: "clone",
    value:
    /**
     * Clones a given report
     */
    function clone(name) {
      var url = [this._conn._baseUrl(), 'analytics', 'reports'].join('/') + '?cloneId=' + this.id;
      var config = {
        reportMetadata: {
          name: name
        }
      };
      return this._conn.request({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        body: _JSON$stringify(config)
      });
    }

    /**
     * Explain plan for executing report
     */
  }, {
    key: "explain",
    value: function explain() {
      var url = '/query/?explain=' + this.id;
      return this._conn.request(url);
    }

    /**
     * Run report synchronously
     */
  }, {
    key: "execute",
    value: function execute() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = [this._conn._baseUrl(), 'analytics', 'reports', this.id].join('/') + '?includeDetails=' + (options.details ? 'true' : 'false');
      return this._conn.request(_objectSpread({
        url: url
      }, options.metadata ? {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: _JSON$stringify(options.metadata)
      } : {
        method: 'GET'
      }));
    }
  }, {
    key: "executeAsync",
    value:
    /**
     * Run report asynchronously
     */
    function executeAsync() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = [this._conn._baseUrl(), 'analytics', 'reports', this.id, 'instances'].join('/') + (options.details ? '?includeDetails=true' : '');
      return this._conn.request(_objectSpread({
        method: 'POST',
        url: url
      }, options.metadata ? {
        headers: {
          'Content-Type': 'application/json'
        },
        body: _JSON$stringify(options.metadata)
      } : {
        body: ''
      }));
    }

    /**
     * Get report instance for specified instance ID
     */
  }, {
    key: "instance",
    value: function instance(id) {
      return new ReportInstance(this, id);
    }

    /**
     * List report instances which had been executed asynchronously
     */
  }, {
    key: "instances",
    value: function instances() {
      var url = [this._conn._baseUrl(), 'analytics', 'reports', this.id, 'instances'].join('/');
      return this._conn.request(url);
    }
  }]);
}();

/*----------------------------------------------------------------------------------*/
/**
 * Dashboard object class in the Analytics API
 */
export var Dashboard = /*#__PURE__*/function () {
  /**
   *
   */
  function Dashboard(conn, id) {
    _classCallCheck(this, Dashboard);
    /**
     * Synonym of Analytics~Dashboard#destroy()
     */
    _defineProperty(this, "delete", this.destroy);
    /**
     * Synonym of Analytics~Dashboard#destroy()
     */
    _defineProperty(this, "del", this.destroy);
    this._conn = conn;
    this.id = id;
  }

  /**
   * Describe dashboard metadata
   *
   * @method Analytics~Dashboard#describe
   * @param {Callback.<Analytics-DashboardMetadata>} [callback] - Callback function
   * @returns {Promise.<Analytics-DashboardMetadata>}
   */
  return _createClass(Dashboard, [{
    key: "describe",
    value: function describe() {
      var url = [this._conn._baseUrl(), 'analytics', 'dashboards', this.id, 'describe'].join('/');
      return this._conn.request(url);
    }

    /**
     * Get details about dashboard components
     */
  }, {
    key: "components",
    value: function components(componentIds) {
      var url = [this._conn._baseUrl(), 'analytics', 'dashboards', this.id].join('/');
      var config = {
        componentIds: _Array$isArray(componentIds) ? componentIds : typeof componentIds === 'string' ? [componentIds] : undefined
      };
      return this._conn.request({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        body: _JSON$stringify(config)
      });
    }

    /**
     * Get dashboard status
     */
  }, {
    key: "status",
    value: function status() {
      var url = [this._conn._baseUrl(), 'analytics', 'dashboards', this.id, 'status'].join('/');
      return this._conn.request(url);
    }

    /**
     * Refresh a dashboard
     */
  }, {
    key: "refresh",
    value: function refresh() {
      var url = [this._conn._baseUrl(), 'analytics', 'dashboards', this.id].join('/');
      return this._conn.request({
        method: 'PUT',
        url: url,
        body: ''
      });
    }

    /**
     * Clone a dashboard
     */
  }, {
    key: "clone",
    value: function clone(config, folderId) {
      var url = [this._conn._baseUrl(), 'analytics', 'dashboards'].join('/') + '?cloneId=' + this.id;
      if (typeof config === 'string') {
        config = {
          name: config,
          folderId: folderId
        };
      }
      return this._conn.request({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        body: _JSON$stringify(config)
      });
    }

    /**
     * Destroy a dashboard
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var url = [this._conn._baseUrl(), 'analytics', 'dashboards', this.id].join('/');
      return this._conn.request({
        method: 'DELETE',
        url: url
      });
    }
  }]);
}();

/*----------------------------------------------------------------------------------*/
/**
 * API class for Analytics API
 */
export var Analytics = /*#__PURE__*/function () {
  /**
   *
   */
  function Analytics(conn) {
    _classCallCheck(this, Analytics);
    this._conn = conn;
  }

  /**
   * Get report object of Analytics API
   */
  return _createClass(Analytics, [{
    key: "report",
    value: function report(id) {
      return new Report(this._conn, id);
    }

    /**
     * Get recent report list
     */
  }, {
    key: "reports",
    value: function reports() {
      var url = [this._conn._baseUrl(), 'analytics', 'reports'].join('/');
      return this._conn.request(url);
    }

    /**
     * Get dashboard object of Analytics API
     */
  }, {
    key: "dashboard",
    value: function dashboard(id) {
      return new Dashboard(this._conn, id);
    }

    /**
     * Get recent dashboard list
     */
  }, {
    key: "dashboards",
    value: function dashboards() {
      var url = [this._conn._baseUrl(), 'analytics', 'dashboards'].join('/');
      return this._conn.request(url);
    }
  }]);
}();

/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
registerModule('analytics', function (conn) {
  return new Analytics(conn);
});
export default Analytics;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWdpc3Rlck1vZHVsZSIsIlJlcG9ydEluc3RhbmNlIiwicmVwb3J0IiwiaWQiLCJfY2xhc3NDYWxsQ2hlY2siLCJfcmVwb3J0IiwiX2Nvbm4iLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInJldHJpZXZlIiwidXJsIiwiX2Jhc2VVcmwiLCJqb2luIiwicmVxdWVzdCIsIlJlcG9ydCIsImNvbm4iLCJfZGVmaW5lUHJvcGVydHkiLCJkZXN0cm95IiwiZXhlY3V0ZSIsImRlc2NyaWJlIiwibWV0aG9kIiwiY2xvbmUiLCJuYW1lIiwiY29uZmlnIiwicmVwb3J0TWV0YWRhdGEiLCJoZWFkZXJzIiwiYm9keSIsIl9KU09OJHN0cmluZ2lmeSIsImV4cGxhaW4iLCJvcHRpb25zIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiZGV0YWlscyIsIl9vYmplY3RTcHJlYWQiLCJtZXRhZGF0YSIsImV4ZWN1dGVBc3luYyIsImluc3RhbmNlIiwiaW5zdGFuY2VzIiwiRGFzaGJvYXJkIiwiY29tcG9uZW50cyIsImNvbXBvbmVudElkcyIsIl9BcnJheSRpc0FycmF5Iiwic3RhdHVzIiwicmVmcmVzaCIsImZvbGRlcklkIiwiQW5hbHl0aWNzIiwicmVwb3J0cyIsImRhc2hib2FyZCIsImRhc2hib2FyZHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2FuYWx5dGljcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIE1hbmFnZXMgU2FsZXNmb3JjZSBBbmFseXRpY3MgQVBJXG4gKiBAYXV0aG9yIFNoaW5pY2hpIFRvbWl0YSA8c2hpbmljaGkudG9taXRhQGdtYWlsLmNvbT5cbiAqL1xuaW1wb3J0IHsgcmVnaXN0ZXJNb2R1bGUgfSBmcm9tICcuLi9qc2ZvcmNlJztcbmltcG9ydCBDb25uZWN0aW9uIGZyb20gJy4uL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgUmVwb3J0TWV0YWRhdGEsXG4gIFJlcG9ydEV4ZWN1dGVSZXN1bHQsXG4gIFJlcG9ydFJldHJpZXZlUmVzdWx0LFxuICBSZXBvcnREZXNjcmliZVJlc3VsdCxcbiAgUmVwb3J0SW5mbyxcbiAgUmVwb3J0SW5zdGFuY2VJbmZvLFxuICBEYXNoYm9hcmRNZXRhZGF0YSxcbiAgRGFzaGJvYXJkUmVzdWx0LFxuICBEYXNoYm9hcmRTdGF0dXNSZXN1bHQsXG4gIERhc2hib2FyZFJlZnJlc2hSZXN1bHQsXG4gIERhc2hib2FyZEluZm8sXG59IGZyb20gJy4vYW5hbHl0aWNzL3R5cGVzJztcbmltcG9ydCB7IFF1ZXJ5RXhwbGFpblJlc3VsdCB9IGZyb20gJy4uL3F1ZXJ5JztcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCB0eXBlIHtcbiAgUmVwb3J0TWV0YWRhdGEsXG4gIFJlcG9ydEV4ZWN1dGVSZXN1bHQsXG4gIFJlcG9ydFJldHJpZXZlUmVzdWx0LFxuICBSZXBvcnREZXNjcmliZVJlc3VsdCxcbiAgUmVwb3J0SW5mbyxcbiAgUmVwb3J0SW5zdGFuY2VJbmZvLFxuICBEYXNoYm9hcmRNZXRhZGF0YSxcbiAgRGFzaGJvYXJkUmVzdWx0LFxuICBEYXNoYm9hcmRTdGF0dXNSZXN1bHQsXG4gIERhc2hib2FyZFJlZnJlc2hSZXN1bHQsXG4gIERhc2hib2FyZEluZm8sXG59O1xuXG5leHBvcnQgdHlwZSBSZXBvcnRFeGVjdXRlT3B0aW9ucyA9IHtcbiAgZGV0YWlscz86IGJvb2xlYW47XG4gIG1ldGFkYXRhPzoge1xuICAgIHJlcG9ydE1ldGFkYXRhOiBQYXJ0aWFsPFJlcG9ydE1ldGFkYXRhPjtcbiAgfTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIFJlcG9ydCBvYmplY3QgY2xhc3MgaW4gQW5hbHl0aWNzIEFQSVxuICovXG5leHBvcnQgY2xhc3MgUmVwb3J0SW5zdGFuY2U8UyBleHRlbmRzIFNjaGVtYT4ge1xuICBfcmVwb3J0OiBSZXBvcnQ8Uz47XG4gIF9jb25uOiBDb25uZWN0aW9uPFM+O1xuICBpZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IocmVwb3J0OiBSZXBvcnQ8Uz4sIGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9yZXBvcnQgPSByZXBvcnQ7XG4gICAgdGhpcy5fY29ubiA9IHJlcG9ydC5fY29ubjtcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgcmVwb3J0IHJlc3VsdCBhc3luY2hyb25vdXNseSBleGVjdXRlZFxuICAgKi9cbiAgcmV0cmlldmUoKTogUHJvbWlzZTxSZXBvcnRSZXRyaWV2ZVJlc3VsdD4ge1xuICAgIGNvbnN0IHVybCA9IFtcbiAgICAgIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSxcbiAgICAgICdhbmFseXRpY3MnLFxuICAgICAgJ3JlcG9ydHMnLFxuICAgICAgdGhpcy5fcmVwb3J0LmlkLFxuICAgICAgJ2luc3RhbmNlcycsXG4gICAgICB0aGlzLmlkLFxuICAgIF0uam9pbignLycpO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8UmVwb3J0UmV0cmlldmVSZXN1bHQ+KHVybCk7XG4gIH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogUmVwb3J0IG9iamVjdCBjbGFzcyBpbiBBbmFseXRpY3MgQVBJXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXBvcnQ8UyBleHRlbmRzIFNjaGVtYT4ge1xuICBfY29ubjogQ29ubmVjdGlvbjxTPjtcbiAgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbm46IENvbm5lY3Rpb248Uz4sIGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb25uID0gY29ubjtcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cblxuICAvKipcbiAgICogRGVzY3JpYmUgcmVwb3J0IG1ldGFkYXRhXG4gICAqL1xuICBkZXNjcmliZSgpOiBQcm9taXNlPFJlcG9ydERlc2NyaWJlUmVzdWx0PiB7XG4gICAgY29uc3QgdXJsID0gW1xuICAgICAgdGhpcy5fY29ubi5fYmFzZVVybCgpLFxuICAgICAgJ2FuYWx5dGljcycsXG4gICAgICAncmVwb3J0cycsXG4gICAgICB0aGlzLmlkLFxuICAgICAgJ2Rlc2NyaWJlJyxcbiAgICBdLmpvaW4oJy8nKTtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0PFJlcG9ydERlc2NyaWJlUmVzdWx0Pih1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYSByZXBvcnRcbiAgICovXG4gIGRlc3Ryb3koKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdXJsID0gW3RoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgJ2FuYWx5dGljcycsICdyZXBvcnRzJywgdGhpcy5pZF0uam9pbihcbiAgICAgICcvJyxcbiAgICApO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8dm9pZD4oeyBtZXRob2Q6ICdERUxFVEUnLCB1cmwgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3lub255bSBvZiBBbmFseXRpY3N+UmVwb3J0I2Rlc3Ryb3koKVxuICAgKi9cbiAgZGVsZXRlID0gdGhpcy5kZXN0cm95O1xuXG4gIC8qKlxuICAgKiBTeW5vbnltIG9mIEFuYWx5dGljc35SZXBvcnQjZGVzdHJveSgpXG4gICAqL1xuICBkZWwgPSB0aGlzLmRlc3Ryb3k7XG5cbiAgLyoqXG4gICAqIENsb25lcyBhIGdpdmVuIHJlcG9ydFxuICAgKi9cbiAgY2xvbmUobmFtZTogc3RyaW5nKTogUHJvbWlzZTxSZXBvcnREZXNjcmliZVJlc3VsdD4ge1xuICAgIGNvbnN0IHVybCA9XG4gICAgICBbdGhpcy5fY29ubi5fYmFzZVVybCgpLCAnYW5hbHl0aWNzJywgJ3JlcG9ydHMnXS5qb2luKCcvJykgK1xuICAgICAgJz9jbG9uZUlkPScgK1xuICAgICAgdGhpcy5pZDtcbiAgICBjb25zdCBjb25maWcgPSB7IHJlcG9ydE1ldGFkYXRhOiB7IG5hbWUgfSB9O1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8UmVwb3J0RGVzY3JpYmVSZXN1bHQ+KHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsLFxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb25maWcpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cGxhaW4gcGxhbiBmb3IgZXhlY3V0aW5nIHJlcG9ydFxuICAgKi9cbiAgZXhwbGFpbigpOiBQcm9taXNlPFF1ZXJ5RXhwbGFpblJlc3VsdD4ge1xuICAgIGNvbnN0IHVybCA9ICcvcXVlcnkvP2V4cGxhaW49JyArIHRoaXMuaWQ7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdDxRdWVyeUV4cGxhaW5SZXN1bHQ+KHVybCk7XG4gIH1cblxuICAvKipcbiAgICogUnVuIHJlcG9ydCBzeW5jaHJvbm91c2x5XG4gICAqL1xuICBleGVjdXRlKG9wdGlvbnM6IFJlcG9ydEV4ZWN1dGVPcHRpb25zID0ge30pOiBQcm9taXNlPFJlcG9ydEV4ZWN1dGVSZXN1bHQ+IHtcbiAgICBjb25zdCB1cmwgPVxuICAgICAgW3RoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgJ2FuYWx5dGljcycsICdyZXBvcnRzJywgdGhpcy5pZF0uam9pbignLycpICtcbiAgICAgICc/aW5jbHVkZURldGFpbHM9JyArXG4gICAgICAob3B0aW9ucy5kZXRhaWxzID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdDxSZXBvcnRFeGVjdXRlUmVzdWx0Pih7XG4gICAgICB1cmwsXG4gICAgICAuLi4ob3B0aW9ucy5tZXRhZGF0YVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcHRpb25zLm1ldGFkYXRhKSxcbiAgICAgICAgICB9XG4gICAgICAgIDogeyBtZXRob2Q6ICdHRVQnIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN5bm9ueW0gb2YgQW5hbHl0aWNzflJlcG9ydCNleGVjdXRlKClcbiAgICovXG4gIHJ1biA9IHRoaXMuZXhlY3V0ZTtcblxuICAvKipcbiAgICogU3lub255bSBvZiBBbmFseXRpY3N+UmVwb3J0I2V4ZWN1dGUoKVxuICAgKi9cbiAgZXhlYyA9IHRoaXMuZXhlY3V0ZTtcblxuICAvKipcbiAgICogUnVuIHJlcG9ydCBhc3luY2hyb25vdXNseVxuICAgKi9cbiAgZXhlY3V0ZUFzeW5jKFxuICAgIG9wdGlvbnM6IFJlcG9ydEV4ZWN1dGVPcHRpb25zID0ge30sXG4gICk6IFByb21pc2U8UmVwb3J0SW5zdGFuY2VJbmZvPiB7XG4gICAgY29uc3QgdXJsID1cbiAgICAgIFtcbiAgICAgICAgdGhpcy5fY29ubi5fYmFzZVVybCgpLFxuICAgICAgICAnYW5hbHl0aWNzJyxcbiAgICAgICAgJ3JlcG9ydHMnLFxuICAgICAgICB0aGlzLmlkLFxuICAgICAgICAnaW5zdGFuY2VzJyxcbiAgICAgIF0uam9pbignLycpICsgKG9wdGlvbnMuZGV0YWlscyA/ICc/aW5jbHVkZURldGFpbHM9dHJ1ZScgOiAnJyk7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdDxSZXBvcnRJbnN0YW5jZUluZm8+KHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsLFxuICAgICAgLi4uKG9wdGlvbnMubWV0YWRhdGFcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMubWV0YWRhdGEpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7IGJvZHk6ICcnIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCByZXBvcnQgaW5zdGFuY2UgZm9yIHNwZWNpZmllZCBpbnN0YW5jZSBJRFxuICAgKi9cbiAgaW5zdGFuY2UoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUmVwb3J0SW5zdGFuY2UodGhpcywgaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3QgcmVwb3J0IGluc3RhbmNlcyB3aGljaCBoYWQgYmVlbiBleGVjdXRlZCBhc3luY2hyb25vdXNseVxuICAgKi9cbiAgaW5zdGFuY2VzKCk6IFByb21pc2U8UmVwb3J0SW5zdGFuY2VJbmZvW10+IHtcbiAgICBjb25zdCB1cmwgPSBbXG4gICAgICB0aGlzLl9jb25uLl9iYXNlVXJsKCksXG4gICAgICAnYW5hbHl0aWNzJyxcbiAgICAgICdyZXBvcnRzJyxcbiAgICAgIHRoaXMuaWQsXG4gICAgICAnaW5zdGFuY2VzJyxcbiAgICBdLmpvaW4oJy8nKTtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0PFJlcG9ydEluc3RhbmNlSW5mb1tdPih1cmwpO1xuICB9XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIERhc2hib2FyZCBvYmplY3QgY2xhc3MgaW4gdGhlIEFuYWx5dGljcyBBUElcbiAqL1xuZXhwb3J0IGNsYXNzIERhc2hib2FyZDxTIGV4dGVuZHMgU2NoZW1hPiB7XG4gIF9jb25uOiBDb25uZWN0aW9uPFM+O1xuICBpZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IoY29ubjogQ29ubmVjdGlvbjxTPiwgaWQ6IHN0cmluZykge1xuICAgIHRoaXMuX2Nvbm4gPSBjb25uO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNjcmliZSBkYXNoYm9hcmQgbWV0YWRhdGFcbiAgICpcbiAgICogQG1ldGhvZCBBbmFseXRpY3N+RGFzaGJvYXJkI2Rlc2NyaWJlXG4gICAqIEBwYXJhbSB7Q2FsbGJhY2suPEFuYWx5dGljcy1EYXNoYm9hcmRNZXRhZGF0YT59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZS48QW5hbHl0aWNzLURhc2hib2FyZE1ldGFkYXRhPn1cbiAgICovXG4gIGRlc2NyaWJlKCk6IFByb21pc2U8RGFzaGJvYXJkTWV0YWRhdGE+IHtcbiAgICBjb25zdCB1cmwgPSBbXG4gICAgICB0aGlzLl9jb25uLl9iYXNlVXJsKCksXG4gICAgICAnYW5hbHl0aWNzJyxcbiAgICAgICdkYXNoYm9hcmRzJyxcbiAgICAgIHRoaXMuaWQsXG4gICAgICAnZGVzY3JpYmUnLFxuICAgIF0uam9pbignLycpO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8RGFzaGJvYXJkTWV0YWRhdGE+KHVybCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRldGFpbHMgYWJvdXQgZGFzaGJvYXJkIGNvbXBvbmVudHNcbiAgICovXG4gIGNvbXBvbmVudHMoY29tcG9uZW50SWRzPzogc3RyaW5nIHwgc3RyaW5nW10pOiBQcm9taXNlPERhc2hib2FyZFJlc3VsdD4ge1xuICAgIGNvbnN0IHVybCA9IFtcbiAgICAgIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSxcbiAgICAgICdhbmFseXRpY3MnLFxuICAgICAgJ2Rhc2hib2FyZHMnLFxuICAgICAgdGhpcy5pZCxcbiAgICBdLmpvaW4oJy8nKTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBjb21wb25lbnRJZHM6IEFycmF5LmlzQXJyYXkoY29tcG9uZW50SWRzKVxuICAgICAgICA/IGNvbXBvbmVudElkc1xuICAgICAgICA6IHR5cGVvZiBjb21wb25lbnRJZHMgPT09ICdzdHJpbmcnXG4gICAgICAgID8gW2NvbXBvbmVudElkc11cbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0PERhc2hib2FyZFJlc3VsdD4oe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmwsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbmZpZyksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhc2hib2FyZCBzdGF0dXNcbiAgICovXG4gIHN0YXR1cygpOiBQcm9taXNlPERhc2hib2FyZFN0YXR1c1Jlc3VsdD4ge1xuICAgIGNvbnN0IHVybCA9IFtcbiAgICAgIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSxcbiAgICAgICdhbmFseXRpY3MnLFxuICAgICAgJ2Rhc2hib2FyZHMnLFxuICAgICAgdGhpcy5pZCxcbiAgICAgICdzdGF0dXMnLFxuICAgIF0uam9pbignLycpO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8RGFzaGJvYXJkU3RhdHVzUmVzdWx0Pih1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggYSBkYXNoYm9hcmRcbiAgICovXG4gIHJlZnJlc2goKTogUHJvbWlzZTxEYXNoYm9hcmRSZWZyZXNoUmVzdWx0PiB7XG4gICAgY29uc3QgdXJsID0gW1xuICAgICAgdGhpcy5fY29ubi5fYmFzZVVybCgpLFxuICAgICAgJ2FuYWx5dGljcycsXG4gICAgICAnZGFzaGJvYXJkcycsXG4gICAgICB0aGlzLmlkLFxuICAgIF0uam9pbignLycpO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8RGFzaGJvYXJkUmVmcmVzaFJlc3VsdD4oe1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHVybCxcbiAgICAgIGJvZHk6ICcnLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb25lIGEgZGFzaGJvYXJkXG4gICAqL1xuICBjbG9uZShcbiAgICBjb25maWc6IHsgbmFtZTogc3RyaW5nOyBmb2xkZXJJZD86IHN0cmluZyB9IHwgc3RyaW5nLFxuICAgIGZvbGRlcklkPzogc3RyaW5nLFxuICApOiBQcm9taXNlPERhc2hib2FyZE1ldGFkYXRhPiB7XG4gICAgY29uc3QgdXJsID1cbiAgICAgIFt0aGlzLl9jb25uLl9iYXNlVXJsKCksICdhbmFseXRpY3MnLCAnZGFzaGJvYXJkcyddLmpvaW4oJy8nKSArXG4gICAgICAnP2Nsb25lSWQ9JyArXG4gICAgICB0aGlzLmlkO1xuICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0geyBuYW1lOiBjb25maWcsIGZvbGRlcklkIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8RGFzaGJvYXJkTWV0YWRhdGE+KHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsLFxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb25maWcpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYSBkYXNoYm9hcmRcbiAgICovXG4gIGRlc3Ryb3koKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdXJsID0gW1xuICAgICAgdGhpcy5fY29ubi5fYmFzZVVybCgpLFxuICAgICAgJ2FuYWx5dGljcycsXG4gICAgICAnZGFzaGJvYXJkcycsXG4gICAgICB0aGlzLmlkLFxuICAgIF0uam9pbignLycpO1xuICAgIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Q8dm9pZD4oeyBtZXRob2Q6ICdERUxFVEUnLCB1cmwgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3lub255bSBvZiBBbmFseXRpY3N+RGFzaGJvYXJkI2Rlc3Ryb3koKVxuICAgKi9cbiAgZGVsZXRlID0gdGhpcy5kZXN0cm95O1xuXG4gIC8qKlxuICAgKiBTeW5vbnltIG9mIEFuYWx5dGljc35EYXNoYm9hcmQjZGVzdHJveSgpXG4gICAqL1xuICBkZWwgPSB0aGlzLmRlc3Ryb3k7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEFQSSBjbGFzcyBmb3IgQW5hbHl0aWNzIEFQSVxuICovXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzPFMgZXh0ZW5kcyBTY2hlbWE+IHtcbiAgX2Nvbm46IENvbm5lY3Rpb248Uz47XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25uOiBDb25uZWN0aW9uPFM+KSB7XG4gICAgdGhpcy5fY29ubiA9IGNvbm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJlcG9ydCBvYmplY3Qgb2YgQW5hbHl0aWNzIEFQSVxuICAgKi9cbiAgcmVwb3J0KGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFJlcG9ydCh0aGlzLl9jb25uLCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJlY2VudCByZXBvcnQgbGlzdFxuICAgKi9cbiAgcmVwb3J0cygpIHtcbiAgICBjb25zdCB1cmwgPSBbdGhpcy5fY29ubi5fYmFzZVVybCgpLCAnYW5hbHl0aWNzJywgJ3JlcG9ydHMnXS5qb2luKCcvJyk7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdDxSZXBvcnRJbmZvW10+KHVybCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhc2hib2FyZCBvYmplY3Qgb2YgQW5hbHl0aWNzIEFQSVxuICAgKi9cbiAgZGFzaGJvYXJkKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IERhc2hib2FyZCh0aGlzLl9jb25uLCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJlY2VudCBkYXNoYm9hcmQgbGlzdFxuICAgKi9cbiAgZGFzaGJvYXJkcygpIHtcbiAgICBjb25zdCB1cmwgPSBbdGhpcy5fY29ubi5fYmFzZVVybCgpLCAnYW5hbHl0aWNzJywgJ2Rhc2hib2FyZHMnXS5qb2luKCcvJyk7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdDxEYXNoYm9hcmRJbmZvW10+KHVybCk7XG4gIH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKlxuICogUmVnaXN0ZXIgaG9vayBpbiBjb25uZWN0aW9uIGluc3RhbnRpYXRpb24gZm9yIGR5bmFtaWNhbGx5IGFkZGluZyB0aGlzIEFQSSBtb2R1bGUgZmVhdHVyZXNcbiAqL1xucmVnaXN0ZXJNb2R1bGUoJ2FuYWx5dGljcycsIChjb25uKSA9PiBuZXcgQW5hbHl0aWNzKGNvbm4pKTtcblxuZXhwb3J0IGRlZmF1bHQgQW5hbHl0aWNzO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0EsY0FBYyxRQUFRLFlBQVk7O0FBa0IzQzs7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFhQyxjQUFjO0VBS3pCO0FBQ0Y7QUFDQTtFQUNFLFNBQUFBLGVBQVlDLE1BQWlCLEVBQUVDLEVBQVUsRUFBRTtJQUFBQyxlQUFBLE9BQUFILGNBQUE7SUFDekMsSUFBSSxDQUFDSSxPQUFPLEdBQUdILE1BQU07SUFDckIsSUFBSSxDQUFDSSxLQUFLLEdBQUdKLE1BQU0sQ0FBQ0ksS0FBSztJQUN6QixJQUFJLENBQUNILEVBQUUsR0FBR0EsRUFBRTtFQUNkOztFQUVBO0FBQ0Y7QUFDQTtFQUZFLE9BQUFJLFlBQUEsQ0FBQU4sY0FBQTtJQUFBTyxHQUFBO0lBQUFDLEtBQUEsRUFHQSxT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