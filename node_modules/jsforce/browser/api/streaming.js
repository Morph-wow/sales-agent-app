import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context3; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context3 = Object.prototype.toString.call(o)).call(_context3, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.regexp.to-string.js";
/**
 * @file Manages Streaming APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
import { EventEmitter } from 'events';
import { Client, Subscription } from 'faye';
import { registerModule } from '../jsforce';
import * as StreamingExtension from './streaming/extension';

/**
 *
 */

export { Client, Subscription };

/*--------------------------------------------*/
/**
 * Streaming API topic class
 */
var Topic = /*#__PURE__*/function () {
  function Topic(streaming, name) {
    _classCallCheck(this, Topic);
    this._streaming = streaming;
    this.name = name;
  }

  /**
   * Subscribe listener to topic
   */
  return _createClass(Topic, [{
    key: "subscribe",
    value: function subscribe(listener) {
      return this._streaming.subscribe(this.name, listener);
    }

    /**
     * Unsubscribe listener from topic
     */
  }, {
    key: "unsubscribe",
    value: function unsubscribe(subscr) {
      this._streaming.unsubscribe(this.name, subscr);
      return this;
    }
  }]);
}();
/*--------------------------------------------*/
/**
 * Streaming API Generic Streaming Channel
 */
var Channel = /*#__PURE__*/function () {
  function Channel(streaming, name) {
    _classCallCheck(this, Channel);
    this._streaming = streaming;
    this.name = name;
  }

  /**
   * Subscribe to channel
   */
  return _createClass(Channel, [{
    key: "subscribe",
    value: function subscribe(listener) {
      return this._streaming.subscribe(this.name, listener);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(subscr) {
      this._streaming.unsubscribe(this.name, subscr);
      return this;
    }
  }, {
    key: "push",
    value: function () {
      var _push = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(events) {
        var isArray, pushEvents, conn, id, channelUrl, rets;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              isArray = _Array$isArray(events);
              pushEvents = _Array$isArray(events) ? events : [events];
              conn = this._streaming._conn;
              if (!this._id) {
                this._id = conn.sobject('StreamingChannel').findOne({
                  Name: this.name
                }, ['Id']).then(function (rec) {
                  return rec === null || rec === void 0 ? void 0 : rec.Id;
                });
              }
              _context.next = 6;
              return this._id;
            case 6:
              id = _context.sent;
              if (id) {
                _context.next = 9;
                break;
              }
              throw new Error("No streaming channel available for name: ".concat(this.name));
            case 9:
              channelUrl = "/sobjects/StreamingChannel/".concat(id, "/push");
              _context.next = 12;
              return conn.requestPost(channelUrl, {
                pushEvents: pushEvents
              });
            case 12:
              rets = _context.sent;
              return _context.abrupt("return", isArray ? rets : rets[0]);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function push(_x) {
        return _push.apply(this, arguments);
      }
      return push;
    }()
  }]);
}();
/*--------------------------------------------*/
/**
 * Streaming API class
 */
export var Streaming = /*#__PURE__*/function (_EventEmitter) {
  /**
   *
   */
  function Streaming(conn) {
    var _this;
    _classCallCheck(this, Streaming);
    _this = _callSuper(this, Streaming);
    _defineProperty(_this, "_topics", {});
    _defineProperty(_this, "_fayeClients", {});
    _this._conn = conn;
    return _this;
  }

  /* @private */
  _inherits(Streaming, _EventEmitter);
  return _createClass(Streaming, [{
    key: "_createClient",
    value: function _createClient(forChannelName, extensions) {
      var _context2;
      // forChannelName is advisory, for an API workaround. It does not restrict or select the channel.
      var needsReplayFix = typeof forChannelName === 'string' && _startsWithInstanceProperty(forChannelName).call(forChannelName, '/u/');
      var endpointUrl = [this._conn.instanceUrl,
      // special endpoint "/cometd/replay/xx.x" is only available in 36.0.
      // See https://releasenotes.docs.salesforce.com/en-us/summer16/release-notes/rn_api_streaming_classic_replay.htm
      'cometd' + (needsReplayFix && this._conn.version === '36.0' ? '/replay' : ''), this._conn.version].join('/');
      var fayeClient = new Client(endpointUrl, {});
      fayeClient.setHeader('Authorization', 'OAuth ' + this._conn.accessToken);
      if (_Array$isArray(extensions)) {
        var _iterator = _createForOfIteratorHelper(extensions),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var extension = _step.value;
            fayeClient.addExtension(extension);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      // prevent streaming API server error
      var dispatcher = fayeClient._dispatcher;
      if (_indexOfInstanceProperty(_context2 = dispatcher.getConnectionTypes()).call(_context2, 'callback-polling') === -1) {
        dispatcher.selectTransport('long-polling');
        dispatcher._transport.batching = false;
      }
      return fayeClient;
    }

    /** @private **/
  }, {
    key: "_getFayeClient",
    value: function _getFayeClient(channelName) {
      var isGeneric = _startsWithInstanceProperty(channelName).call(channelName, '/u/');
      var clientType = isGeneric ? 'generic' : 'pushTopic';
      if (!this._fayeClients[clientType]) {
        this._fayeClients[clientType] = this._createClient(channelName);
      }
      return this._fayeClients[clientType];
    }

    /**
     * Get named topic
     */
  }, {
    key: "topic",
    value: function topic(name) {
      this._topics = this._topics || {};
      var topic = this._topics[name] = this._topics[name] || new Topic(this, name);
      return topic;
    }

    /**
     * Get channel for channel name
     */
  }, {
    key: "channel",
    value: function channel(name) {
      return new Channel(this, name);
    }

    /**
     * Subscribe topic/channel
     */
  }, {
    key: "subscribe",
    value: function subscribe(name, listener) {
      var channelName = _startsWithInstanceProperty(name).call(name, '/') ? name : '/topic/' + name;
      var fayeClient = this._getFayeClient(channelName);
      return fayeClient.subscribe(channelName, listener);
    }

    /**
     * Unsubscribe topic
     */
  }, {
    key: "unsubscribe",
    value: function unsubscribe(name, subscription) {
      var channelName = _startsWithInstanceProperty(name).call(name, '/') ? name : '/topic/' + name;
      var fayeClient = this._getFayeClient(channelName);
      fayeClient.unsubscribe(channelName, subscription);
      return this;
    }

    /**
     * Create a Streaming client, optionally with extensions
     *
     * See Faye docs for implementation details: https://faye.jcoglan.com/browser/extensions.html
     *
     * Example usage:
     *
     * ```javascript
     * const jsforce = require('jsforce');
     *
     * // Establish a Salesforce connection. (Details elided)
     * const conn = new jsforce.Connection({ … });
     *
     * const fayeClient = conn.streaming.createClient();
     *
     * const subscription = fayeClient.subscribe(channel, data => {
     *   console.log('topic received data', data);
     * });
     *
     * subscription.cancel();
     * ```
     *
     * Example with extensions, using Replay & Auth Failure extensions in a server-side Node.js app:
     *
     * ```javascript
     * const jsforce = require('jsforce');
     * const { StreamingExtension } = require('jsforce/api/streaming');
     *
     * // Establish a Salesforce connection. (Details elided)
     * const conn = new jsforce.Connection({ … });
     *
     * const channel = "/event/My_Event__e";
     * const replayId = -2; // -2 is all retained events
     *
     * const exitCallback = () => process.exit(1);
     * const authFailureExt = new StreamingExtension.AuthFailure(exitCallback);
     *
     * const replayExt = new StreamingExtension.Replay(channel, replayId);
     *
     * const fayeClient = conn.streaming.createClient([
     *   authFailureExt,
     *   replayExt
     * ]);
     *
     * const subscription = fayeClient.subscribe(channel, data => {
     *   console.log('topic received data', data);
     * });
     *
     * subscription.cancel();
     * ```
     */
  }, {
    key: "createClient",
    value: function createClient(extensions) {
      return this._createClient(null, extensions);
    }
  }]);
}(EventEmitter);
export { StreamingExtension };

/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
registerModule('streaming', function (conn) {
  return new Streaming(conn);
});
export default Streaming;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDbGllbnQiLCJTdWJzY3JpcHRpb24iLCJyZWdpc3Rlck1vZHVsZSIsIlN0cmVhbWluZ0V4dGVuc2lvbiIsIlRvcGljIiwic3RyZWFtaW5nIiwibmFtZSIsIl9jbGFzc0NhbGxDaGVjayIsIl9zdHJlYW1pbmciLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInN1YnNjcmliZSIsImxpc3RlbmVyIiwidW5zdWJzY3JpYmUiLCJzdWJzY3IiLCJDaGFubmVsIiwiX3B1c2giLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsImV2ZW50cyIsImlzQXJyYXkiLCJwdXNoRXZlbnRzIiwiY29ubiIsImlkIiwiY2hhbm5lbFVybCIsInJldHMiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiX0FycmF5JGlzQXJyYXkiLCJfY29ubiIsIl9pZCIsInNvYmplY3QiLCJmaW5kT25lIiwiTmFtZSIsInRoZW4iLCJyZWMiLCJJZCIsInNlbnQiLCJFcnJvciIsImNvbmNhdCIsInJlcXVlc3RQb3N0IiwiYWJydXB0Iiwic3RvcCIsInB1c2giLCJfeCIsImFwcGx5IiwiYXJndW1lbnRzIiwiU3RyZWFtaW5nIiwiX0V2ZW50RW1pdHRlciIsIl90aGlzIiwiX2NhbGxTdXBlciIsIl9kZWZpbmVQcm9wZXJ0eSIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGllbnQiLCJmb3JDaGFubmVsTmFtZSIsImV4dGVuc2lvbnMiLCJfY29udGV4dDIiLCJuZWVkc1JlcGxheUZpeCIsIl9zdGFydHNXaXRoSW5zdGFuY2VQcm9wZXJ0eSIsImNhbGwiLCJlbmRwb2ludFVybCIsImluc3RhbmNlVXJsIiwidmVyc2lvbiIsImpvaW4iLCJmYXllQ2xpZW50Iiwic2V0SGVhZGVyIiwiYWNjZXNzVG9rZW4iLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwiZXh0ZW5zaW9uIiwiYWRkRXh0ZW5zaW9uIiwiZXJyIiwiZSIsImYiLCJkaXNwYXRjaGVyIiwiX2Rpc3BhdGNoZXIiLCJfaW5kZXhPZkluc3RhbmNlUHJvcGVydHkiLCJnZXRDb25uZWN0aW9uVHlwZXMiLCJzZWxlY3RUcmFuc3BvcnQiLCJfdHJhbnNwb3J0IiwiYmF0Y2hpbmciLCJfZ2V0RmF5ZUNsaWVudCIsImNoYW5uZWxOYW1lIiwiaXNHZW5lcmljIiwiY2xpZW50VHlwZSIsIl9mYXllQ2xpZW50cyIsInRvcGljIiwiX3RvcGljcyIsImNoYW5uZWwiLCJzdWJzY3JpcHRpb24iLCJjcmVhdGVDbGllbnQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL3N0cmVhbWluZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIE1hbmFnZXMgU3RyZWFtaW5nIEFQSXNcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgQ2xpZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdmYXllJztcbmltcG9ydCB7IHJlZ2lzdGVyTW9kdWxlIH0gZnJvbSAnLi4vanNmb3JjZSc7XG5pbXBvcnQgQ29ubmVjdGlvbiBmcm9tICcuLi9jb25uZWN0aW9uJztcbmltcG9ydCB7IFJlY29yZCwgU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0ICogYXMgU3RyZWFtaW5nRXh0ZW5zaW9uIGZyb20gJy4vc3RyZWFtaW5nL2V4dGVuc2lvbic7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgU3RyZWFtaW5nTWVzc2FnZTxSIGV4dGVuZHMgUmVjb3JkPiA9IHtcbiAgZXZlbnQ6IHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgY3JlYXRlZERhdGU6IHN0cmluZztcbiAgICByZXBsYXlJZDogbnVtYmVyO1xuICB9O1xuICBzb2JqZWN0OiBSO1xufTtcblxuZXhwb3J0IHR5cGUgR2VuZXJpY1N0cmVhbWluZ01lc3NhZ2UgPSB7XG4gIGV2ZW50OiB7XG4gICAgY3JlYXRlZERhdGU6IHN0cmluZztcbiAgICByZXBsYXlJZDogbnVtYmVyO1xuICB9O1xuICBwYXlsb2FkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBQdXNoRXZlbnQgPSB7XG4gIHBheWxvYWQ6IHN0cmluZztcbiAgdXNlcklkczogc3RyaW5nW107XG59O1xuXG5leHBvcnQgdHlwZSBQdXNoRXZlbnRSZXN1bHQgPSB7XG4gIGZhbm91dENvdW50OiBudW1iZXI7XG4gIHVzZXJPbmxpbmVTdGF0dXM6IHtcbiAgICBbdXNlcklkOiBzdHJpbmddOiBib29sZWFuO1xuICB9O1xufTtcblxuZXhwb3J0IHsgQ2xpZW50LCBTdWJzY3JpcHRpb24gfTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIFN0cmVhbWluZyBBUEkgdG9waWMgY2xhc3NcbiAqL1xuY2xhc3MgVG9waWM8UyBleHRlbmRzIFNjaGVtYSwgUiBleHRlbmRzIFJlY29yZD4ge1xuICBfc3RyZWFtaW5nOiBTdHJlYW1pbmc8Uz47XG4gIG5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzdHJlYW1pbmc6IFN0cmVhbWluZzxTPiwgbmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc3RyZWFtaW5nID0gc3RyZWFtaW5nO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIGxpc3RlbmVyIHRvIHRvcGljXG4gICAqL1xuICBzdWJzY3JpYmUobGlzdGVuZXI6IChtZXNzYWdlOiBTdHJlYW1pbmdNZXNzYWdlPFI+KSA9PiB2b2lkKTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyZWFtaW5nLnN1YnNjcmliZSh0aGlzLm5hbWUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBsaXN0ZW5lciBmcm9tIHRvcGljXG4gICAqL1xuICB1bnN1YnNjcmliZShzdWJzY3I6IFN1YnNjcmlwdGlvbikge1xuICAgIHRoaXMuX3N0cmVhbWluZy51bnN1YnNjcmliZSh0aGlzLm5hbWUsIHN1YnNjcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIFN0cmVhbWluZyBBUEkgR2VuZXJpYyBTdHJlYW1pbmcgQ2hhbm5lbFxuICovXG5jbGFzcyBDaGFubmVsPFMgZXh0ZW5kcyBTY2hlbWE+IHtcbiAgX3N0cmVhbWluZzogU3RyZWFtaW5nPFM+O1xuICBfaWQ6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB8IHVuZGVmaW5lZDtcbiAgbmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHN0cmVhbWluZzogU3RyZWFtaW5nPFM+LCBuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdHJlYW1pbmcgPSBzdHJlYW1pbmc7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gY2hhbm5lbFxuICAgKi9cbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiBGdW5jdGlvbik6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmVhbWluZy5zdWJzY3JpYmUodGhpcy5uYW1lLCBsaXN0ZW5lcik7XG4gIH1cblxuICB1bnN1YnNjcmliZShzdWJzY3I6IFN1YnNjcmlwdGlvbikge1xuICAgIHRoaXMuX3N0cmVhbWluZy51bnN1YnNjcmliZSh0aGlzLm5hbWUsIHN1YnNjcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdXNoKGV2ZW50czogUHVzaEV2ZW50KTogUHJvbWlzZTxQdXNoRXZlbnRSZXN1bHQ+O1xuICBwdXNoKGV2ZW50czogUHVzaEV2ZW50KTogUHJvbWlzZTxQdXNoRXZlbnRSZXN1bHRbXT47XG4gIGFzeW5jIHB1c2goZXZlbnRzOiBQdXNoRXZlbnQgfCBQdXNoRXZlbnRbXSkge1xuICAgIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGV2ZW50cyk7XG4gICAgY29uc3QgcHVzaEV2ZW50cyA9IEFycmF5LmlzQXJyYXkoZXZlbnRzKSA/IGV2ZW50cyA6IFtldmVudHNdO1xuICAgIGNvbnN0IGNvbm46IENvbm5lY3Rpb24gPSAodGhpcy5fc3RyZWFtaW5nLl9jb25uIGFzIHVua25vd24pIGFzIENvbm5lY3Rpb247XG4gICAgaWYgKCF0aGlzLl9pZCkge1xuICAgICAgdGhpcy5faWQgPSBjb25uXG4gICAgICAgIC5zb2JqZWN0KCdTdHJlYW1pbmdDaGFubmVsJylcbiAgICAgICAgLmZpbmRPbmUoeyBOYW1lOiB0aGlzLm5hbWUgfSwgWydJZCddKVxuICAgICAgICAudGhlbigocmVjKSA9PiByZWM/LklkKTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSBhd2FpdCB0aGlzLl9pZDtcbiAgICBpZiAoIWlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHN0cmVhbWluZyBjaGFubmVsIGF2YWlsYWJsZSBmb3IgbmFtZTogJHt0aGlzLm5hbWV9YCk7XG4gICAgfVxuICAgIGNvbnN0IGNoYW5uZWxVcmwgPSBgL3NvYmplY3RzL1N0cmVhbWluZ0NoYW5uZWwvJHtpZH0vcHVzaGA7XG4gICAgY29uc3QgcmV0cyA9IGF3YWl0IGNvbm4ucmVxdWVzdFBvc3Q8UHVzaEV2ZW50UmVzdWx0W10+KGNoYW5uZWxVcmwsIHtcbiAgICAgIHB1c2hFdmVudHMsXG4gICAgfSk7XG4gICAgcmV0dXJuIGlzQXJyYXkgPyByZXRzIDogcmV0c1swXTtcbiAgfVxufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogU3RyZWFtaW5nIEFQSSBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgU3RyZWFtaW5nPFMgZXh0ZW5kcyBTY2hlbWE+IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgX2Nvbm46IENvbm5lY3Rpb248Uz47XG4gIF90b3BpY3M6IHsgW25hbWU6IHN0cmluZ106IFRvcGljPFMsIFJlY29yZD4gfSA9IHt9O1xuICBfZmF5ZUNsaWVudHM6IHsgW2NsaWVudFR5cGU6IHN0cmluZ106IENsaWVudCB9ID0ge307XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25uOiBDb25uZWN0aW9uPFM+KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jb25uID0gY29ubjtcbiAgfVxuXG4gIC8qIEBwcml2YXRlICovXG4gIF9jcmVhdGVDbGllbnQoZm9yQ2hhbm5lbE5hbWU/OiBzdHJpbmcgfCBudWxsLCBleHRlbnNpb25zPzogYW55W10pIHtcbiAgICAvLyBmb3JDaGFubmVsTmFtZSBpcyBhZHZpc29yeSwgZm9yIGFuIEFQSSB3b3JrYXJvdW5kLiBJdCBkb2VzIG5vdCByZXN0cmljdCBvciBzZWxlY3QgdGhlIGNoYW5uZWwuXG4gICAgY29uc3QgbmVlZHNSZXBsYXlGaXggPVxuICAgICAgdHlwZW9mIGZvckNoYW5uZWxOYW1lID09PSAnc3RyaW5nJyAmJiBmb3JDaGFubmVsTmFtZS5zdGFydHNXaXRoKCcvdS8nKTtcbiAgICBjb25zdCBlbmRwb2ludFVybCA9IFtcbiAgICAgIHRoaXMuX2Nvbm4uaW5zdGFuY2VVcmwsXG4gICAgICAvLyBzcGVjaWFsIGVuZHBvaW50IFwiL2NvbWV0ZC9yZXBsYXkveHgueFwiIGlzIG9ubHkgYXZhaWxhYmxlIGluIDM2LjAuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9yZWxlYXNlbm90ZXMuZG9jcy5zYWxlc2ZvcmNlLmNvbS9lbi11cy9zdW1tZXIxNi9yZWxlYXNlLW5vdGVzL3JuX2FwaV9zdHJlYW1pbmdfY2xhc3NpY19yZXBsYXkuaHRtXG4gICAgICAnY29tZXRkJyArXG4gICAgICAgIChuZWVkc1JlcGxheUZpeCAmJiB0aGlzLl9jb25uLnZlcnNpb24gPT09ICczNi4wJ1xuICAgICAgICAgID8gJy9yZXBsYXknXG4gICAgICAgICAgOiAnJyksXG4gICAgICB0aGlzLl9jb25uLnZlcnNpb24sXG4gICAgXS5qb2luKCcvJyk7XG4gICAgY29uc3QgZmF5ZUNsaWVudCA9IG5ldyBDbGllbnQoZW5kcG9pbnRVcmwsIHt9KTtcbiAgICBmYXllQ2xpZW50LnNldEhlYWRlcignQXV0aG9yaXphdGlvbicsICdPQXV0aCAnICsgdGhpcy5fY29ubi5hY2Nlc3NUb2tlbik7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXh0ZW5zaW9ucykpIHtcbiAgICAgIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcbiAgICAgICAgZmF5ZUNsaWVudC5hZGRFeHRlbnNpb24oZXh0ZW5zaW9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcHJldmVudCBzdHJlYW1pbmcgQVBJIHNlcnZlciBlcnJvclxuICAgIGNvbnN0IGRpc3BhdGNoZXIgPSAoZmF5ZUNsaWVudCBhcyBhbnkpLl9kaXNwYXRjaGVyO1xuICAgIGlmIChkaXNwYXRjaGVyLmdldENvbm5lY3Rpb25UeXBlcygpLmluZGV4T2YoJ2NhbGxiYWNrLXBvbGxpbmcnKSA9PT0gLTEpIHtcbiAgICAgIGRpc3BhdGNoZXIuc2VsZWN0VHJhbnNwb3J0KCdsb25nLXBvbGxpbmcnKTtcbiAgICAgIGRpc3BhdGNoZXIuX3RyYW5zcG9ydC5iYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmF5ZUNsaWVudDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqKi9cbiAgX2dldEZheWVDbGllbnQoY2hhbm5lbE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGlzR2VuZXJpYyA9IGNoYW5uZWxOYW1lLnN0YXJ0c1dpdGgoJy91LycpO1xuICAgIGNvbnN0IGNsaWVudFR5cGUgPSBpc0dlbmVyaWMgPyAnZ2VuZXJpYycgOiAncHVzaFRvcGljJztcbiAgICBpZiAoIXRoaXMuX2ZheWVDbGllbnRzW2NsaWVudFR5cGVdKSB7XG4gICAgICB0aGlzLl9mYXllQ2xpZW50c1tjbGllbnRUeXBlXSA9IHRoaXMuX2NyZWF0ZUNsaWVudChjaGFubmVsTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9mYXllQ2xpZW50c1tjbGllbnRUeXBlXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbmFtZWQgdG9waWNcbiAgICovXG4gIHRvcGljPFIgZXh0ZW5kcyBSZWNvcmQgPSBSZWNvcmQ+KG5hbWU6IHN0cmluZyk6IFRvcGljPFMsIFI+IHtcbiAgICB0aGlzLl90b3BpY3MgPSB0aGlzLl90b3BpY3MgfHwge307XG4gICAgY29uc3QgdG9waWMgPSAodGhpcy5fdG9waWNzW25hbWVdID1cbiAgICAgIHRoaXMuX3RvcGljc1tuYW1lXSB8fCBuZXcgVG9waWM8UywgUj4odGhpcywgbmFtZSkpO1xuICAgIHJldHVybiB0b3BpYyBhcyBUb3BpYzxTLCBSPjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2hhbm5lbCBmb3IgY2hhbm5lbCBuYW1lXG4gICAqL1xuICBjaGFubmVsKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgQ2hhbm5lbCh0aGlzLCBuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG9waWMvY2hhbm5lbFxuICAgKi9cbiAgc3Vic2NyaWJlKG5hbWU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IG5hbWUuc3RhcnRzV2l0aCgnLycpID8gbmFtZSA6ICcvdG9waWMvJyArIG5hbWU7XG4gICAgY29uc3QgZmF5ZUNsaWVudCA9IHRoaXMuX2dldEZheWVDbGllbnQoY2hhbm5lbE5hbWUpO1xuICAgIHJldHVybiBmYXllQ2xpZW50LnN1YnNjcmliZShjaGFubmVsTmFtZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIHRvcGljXG4gICAqL1xuICB1bnN1YnNjcmliZShuYW1lOiBzdHJpbmcsIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSB7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBuYW1lLnN0YXJ0c1dpdGgoJy8nKSA/IG5hbWUgOiAnL3RvcGljLycgKyBuYW1lO1xuICAgIGNvbnN0IGZheWVDbGllbnQgPSB0aGlzLl9nZXRGYXllQ2xpZW50KGNoYW5uZWxOYW1lKTtcbiAgICBmYXllQ2xpZW50LnVuc3Vic2NyaWJlKGNoYW5uZWxOYW1lLCBzdWJzY3JpcHRpb24pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIFN0cmVhbWluZyBjbGllbnQsIG9wdGlvbmFsbHkgd2l0aCBleHRlbnNpb25zXG4gICAqXG4gICAqIFNlZSBGYXllIGRvY3MgZm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHM6IGh0dHBzOi8vZmF5ZS5qY29nbGFuLmNvbS9icm93c2VyL2V4dGVuc2lvbnMuaHRtbFxuICAgKlxuICAgKiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiBgYGBqYXZhc2NyaXB0XG4gICAqIGNvbnN0IGpzZm9yY2UgPSByZXF1aXJlKCdqc2ZvcmNlJyk7XG4gICAqXG4gICAqIC8vIEVzdGFibGlzaCBhIFNhbGVzZm9yY2UgY29ubmVjdGlvbi4gKERldGFpbHMgZWxpZGVkKVxuICAgKiBjb25zdCBjb25uID0gbmV3IGpzZm9yY2UuQ29ubmVjdGlvbih7IOKApiB9KTtcbiAgICpcbiAgICogY29uc3QgZmF5ZUNsaWVudCA9IGNvbm4uc3RyZWFtaW5nLmNyZWF0ZUNsaWVudCgpO1xuICAgKlxuICAgKiBjb25zdCBzdWJzY3JpcHRpb24gPSBmYXllQ2xpZW50LnN1YnNjcmliZShjaGFubmVsLCBkYXRhID0+IHtcbiAgICogICBjb25zb2xlLmxvZygndG9waWMgcmVjZWl2ZWQgZGF0YScsIGRhdGEpO1xuICAgKiB9KTtcbiAgICpcbiAgICogc3Vic2NyaXB0aW9uLmNhbmNlbCgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogRXhhbXBsZSB3aXRoIGV4dGVuc2lvbnMsIHVzaW5nIFJlcGxheSAmIEF1dGggRmFpbHVyZSBleHRlbnNpb25zIGluIGEgc2VydmVyLXNpZGUgTm9kZS5qcyBhcHA6XG4gICAqXG4gICAqIGBgYGphdmFzY3JpcHRcbiAgICogY29uc3QganNmb3JjZSA9IHJlcXVpcmUoJ2pzZm9yY2UnKTtcbiAgICogY29uc3QgeyBTdHJlYW1pbmdFeHRlbnNpb24gfSA9IHJlcXVpcmUoJ2pzZm9yY2UvYXBpL3N0cmVhbWluZycpO1xuICAgKlxuICAgKiAvLyBFc3RhYmxpc2ggYSBTYWxlc2ZvcmNlIGNvbm5lY3Rpb24uIChEZXRhaWxzIGVsaWRlZClcbiAgICogY29uc3QgY29ubiA9IG5ldyBqc2ZvcmNlLkNvbm5lY3Rpb24oeyDigKYgfSk7XG4gICAqXG4gICAqIGNvbnN0IGNoYW5uZWwgPSBcIi9ldmVudC9NeV9FdmVudF9fZVwiO1xuICAgKiBjb25zdCByZXBsYXlJZCA9IC0yOyAvLyAtMiBpcyBhbGwgcmV0YWluZWQgZXZlbnRzXG4gICAqXG4gICAqIGNvbnN0IGV4aXRDYWxsYmFjayA9ICgpID0+IHByb2Nlc3MuZXhpdCgxKTtcbiAgICogY29uc3QgYXV0aEZhaWx1cmVFeHQgPSBuZXcgU3RyZWFtaW5nRXh0ZW5zaW9uLkF1dGhGYWlsdXJlKGV4aXRDYWxsYmFjayk7XG4gICAqXG4gICAqIGNvbnN0IHJlcGxheUV4dCA9IG5ldyBTdHJlYW1pbmdFeHRlbnNpb24uUmVwbGF5KGNoYW5uZWwsIHJlcGxheUlkKTtcbiAgICpcbiAgICogY29uc3QgZmF5ZUNsaWVudCA9IGNvbm4uc3RyZWFtaW5nLmNyZWF0ZUNsaWVudChbXG4gICAqICAgYXV0aEZhaWx1cmVFeHQsXG4gICAqICAgcmVwbGF5RXh0XG4gICAqIF0pO1xuICAgKlxuICAgKiBjb25zdCBzdWJzY3JpcHRpb24gPSBmYXllQ2xpZW50LnN1YnNjcmliZShjaGFubmVsLCBkYXRhID0+IHtcbiAgICogICBjb25zb2xlLmxvZygndG9waWMgcmVjZWl2ZWQgZGF0YScsIGRhdGEpO1xuICAgKiB9KTtcbiAgICpcbiAgICogc3Vic2NyaXB0aW9uLmNhbmNlbCgpO1xuICAgKiBgYGBcbiAgICovXG4gIGNyZWF0ZUNsaWVudChleHRlbnNpb25zOiBhbnlbXSkge1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVDbGllbnQobnVsbCwgZXh0ZW5zaW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgU3RyZWFtaW5nRXh0ZW5zaW9uIH07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbnJlZ2lzdGVyTW9kdWxlKCdzdHJlYW1pbmcnLCAoY29ubikgPT4gbmV3IFN0cmVhbWluZyhjb25uKSk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0cmVhbWluZztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0EsWUFBWSxRQUFRLFFBQVE7QUFDckMsU0FBU0MsTUFBTSxFQUFFQyxZQUFZLFFBQVEsTUFBTTtBQUMzQyxTQUFTQyxjQUFjLFFBQVEsWUFBWTtBQUczQyxPQUFPLEtBQUtDLGtCQUFrQixNQUFNLHVCQUF1Qjs7QUFFM0Q7QUFDQTtBQUNBOztBQThCQSxTQUFTSCxNQUFNLEVBQUVDLFlBQVk7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBRkEsSUFHTUcsS0FBSztFQUlULFNBQUFBLE1BQVlDLFNBQXVCLEVBQUVDLElBQVksRUFBRTtJQUFBQyxlQUFBLE9BQUFILEtBQUE7SUFDakQsSUFBSSxDQUFDSSxVQUFVLEdBQUdILFNBQVM7SUFDM0IsSUFBSSxDQUFDQyxJQUFJLEdBQUdBLElBQUk7RUFDbEI7O0VBRUE7QUFDRjtBQUNBO0VBRkUsT0FBQUcsWUFBQSxDQUFBTCxLQUFBO0lBQUFNLEdBQUE7SUFBQUMsS0FBQSxFQUdBLFNBQUFDLFVBQVVDLFFBQWdE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QUFVTixJQUFZLEVBQUVPLFFBQWtCLEVBQWdCO01BQ3hELElBQU0rRSxXQUFXLEdBQUc1QiwyQkFBQSxDQUFBMUQsSUFBSSxFQUFBMkQsSUFBQSxDQUFKM0QsSUFBSSxFQUFZLEdBQUcsQ0FBQyxHQUFHQSxJQUFJLEdBQUcsU0FBUyxHQUFHQSxJQUFJO01BQ2xFLElBQU1nRSxVQUFVLEdBQUcsSUFBSSxDQUFDcUIsY0FBYyxDQUFDQyxXQUFXLENBQUM7TUFDbkQsT0FBT3RCLFVBQVUsQ0FBQzFELFNBQVMsQ0FBQ2dGLFdBQVcsRUFBRS9FLFFBQVEsQ0FBQztJQUNwRDs7SUFFQTtBQUNGO0FBQ0E7RUFGRTtJQUFBSCxHQUFBO0lBQUFDLEtBQUEsRUFHQSxTQUFBRyxZQUFZUixJQUFZLEVBQUU2RixZQUEwQixFQUFFO01BQ3BELElBQU1QLFdBQVcsR0FBRzVCLDJCQUFBLENBQUExRCxJQUFJLEVBQUEyRCxJQUFBLENBQUozRCxJQUFJLEVBQVksR0FBRyxDQUFDLEdBQUdBLElBQUksR0FBRyxTQUFTLEdBQUdBLElBQUk7TUFDbEUsSUFBTWdFLFVBQVUsR0FBRyxJQUFJLENBQUNxQixjQUFjLENBQUNDLFdBQVcsQ0FBQztNQUNuRHRCLFVBQVUsQ0FBQ3hELFdBQVcsQ0FBQzhFLFdBQVcsRUFBRU8sWUFBWSxDQUFDO01BQ2pELE9BQU8sSUFBSTtJQUNiOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQWxERTtJQUFBekYsR0FBQTtJQUFBQyxLQUFBLEVBbURBLFNBQUF5RixhQUFhdkMsVUFBaUIsRUFBRTtNQUM5QixPQUFPLElBQUksQ0FBQ0YsYUFBYSxDQUFDLElBQUksRUFBRUUsVUFBVSxDQUFDO0lBQzdDO0VBQUM7QUFBQSxFQS9JOEM5RCxZQUFZO0FBa0o3RCxTQUFTSSxrQkFBa0I7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0FELGNBQWMsQ0FBQyxXQUFXLEVBQUUsVUFBQ3VCLElBQUk7RUFBQSxPQUFLLElBQUk0QixTQUFTLENBQUM1QixJQUFJLENBQUM7QUFBQSxFQUFDO0FBRTFELGVBQWU0QixTQUFTIiwiaWdub3JlTGlzdCI6W119