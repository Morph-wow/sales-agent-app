import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import { EventEmitter } from 'events';
import VERSION from './VERSION';
import Connection from './connection';
import OAuth2 from './oauth2';
import SfDate from './date';
import registry from './registry';
import client, { BrowserClient } from './browser/client';

/**
 *
 */
var JSforce = /*#__PURE__*/function (_EventEmitter) {
  function JSforce() {
    var _context;
    var _this;
    _classCallCheck(this, JSforce);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, JSforce, _concatInstanceProperty(_context = []).call(_context, args));
    _defineProperty(_this, "VERSION", VERSION);
    _defineProperty(_this, "Connection", Connection);
    _defineProperty(_this, "OAuth2", OAuth2);
    _defineProperty(_this, "SfDate", SfDate);
    _defineProperty(_this, "Date", SfDate);
    _defineProperty(_this, "BrowserClient", BrowserClient);
    _defineProperty(_this, "registry", registry);
    _defineProperty(_this, "browser", client);
    return _this;
  }
  _inherits(JSforce, _EventEmitter);
  return _createClass(JSforce);
}(EventEmitter);
export function registerModule(name, factory) {
  jsforce.on('connection:new', function (conn) {
    var obj = undefined;
    _Object$defineProperty(conn, name, {
      get: function get() {
        var _obj;
        obj = (_obj = obj) !== null && _obj !== void 0 ? _obj : factory(conn);
        return obj;
      },
      enumerable: true,
      configurable: true
    });
  });
}
var jsforce = new JSforce();
export default jsforce;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJWRVJTSU9OIiwiQ29ubmVjdGlvbiIsIk9BdXRoMiIsIlNmRGF0ZSIsInJlZ2lzdHJ5IiwiY2xpZW50IiwiQnJvd3NlckNsaWVudCIsIkpTZm9yY2UiLCJfRXZlbnRFbWl0dGVyIiwiX2NvbnRleHQiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiX2NhbGxTdXBlciIsIl9jb25jYXRJbnN0YW5jZVByb3BlcnR5IiwiY2FsbCIsIl9kZWZpbmVQcm9wZXJ0eSIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsInJlZ2lzdGVyTW9kdWxlIiwibmFtZSIsImZhY3RvcnkiLCJqc2ZvcmNlIiwib24iLCJjb25uIiwib2JqIiwidW5kZWZpbmVkIiwiX09iamVjdCRkZWZpbmVQcm9wZXJ0eSIsImdldCIsIl9vYmoiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIl0sInNvdXJjZXMiOlsiLi4vc3JjL2pzZm9yY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBWRVJTSU9OIGZyb20gJy4vVkVSU0lPTic7XG5pbXBvcnQgQ29ubmVjdGlvbiBmcm9tICcuL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IE9BdXRoMiBmcm9tICcuL29hdXRoMic7XG5pbXBvcnQgU2ZEYXRlIGZyb20gJy4vZGF0ZSc7XG5pbXBvcnQgcmVnaXN0cnksIHsgUmVnaXN0cnkgfSBmcm9tICcuL3JlZ2lzdHJ5JztcbmltcG9ydCBjbGllbnQsIHsgQnJvd3NlckNsaWVudCB9IGZyb20gJy4vYnJvd3Nlci9jbGllbnQnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEpTZm9yY2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBWRVJTSU9OOiB0eXBlb2YgVkVSU0lPTiA9IFZFUlNJT047XG4gIENvbm5lY3Rpb246IHR5cGVvZiBDb25uZWN0aW9uID0gQ29ubmVjdGlvbjtcbiAgT0F1dGgyOiB0eXBlb2YgT0F1dGgyID0gT0F1dGgyO1xuICBTZkRhdGU6IHR5cGVvZiBTZkRhdGUgPSBTZkRhdGU7XG4gIERhdGU6IHR5cGVvZiBTZkRhdGUgPSBTZkRhdGU7XG4gIEJyb3dzZXJDbGllbnQ6IHR5cGVvZiBCcm93c2VyQ2xpZW50ID0gQnJvd3NlckNsaWVudDtcbiAgcmVnaXN0cnk6IFJlZ2lzdHJ5ID0gcmVnaXN0cnk7XG4gIGJyb3dzZXI6IEJyb3dzZXJDbGllbnQgPSBjbGllbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZShcbiAgbmFtZTogc3RyaW5nLFxuICBmYWN0b3J5OiAoY29ubjogQ29ubmVjdGlvbikgPT4gYW55LFxuKSB7XG4gIGpzZm9yY2Uub24oJ2Nvbm5lY3Rpb246bmV3JywgKGNvbm46IENvbm5lY3Rpb24pID0+IHtcbiAgICBsZXQgb2JqOiBhbnkgPSB1bmRlZmluZWQ7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbm4sIG5hbWUsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgb2JqID0gb2JqID8/IGZhY3RvcnkoY29ubik7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNvbnN0IGpzZm9yY2UgPSBuZXcgSlNmb3JjZSgpO1xuZXhwb3J0IGRlZmF1bHQganNmb3JjZTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxZQUFZLFFBQVEsUUFBUTtBQUNyQyxPQUFPQyxPQUFPLE1BQU0sV0FBVztBQUMvQixPQUFPQyxVQUFVLE1BQU0sY0FBYztBQUNyQyxPQUFPQyxNQUFNLE1BQU0sVUFBVTtBQUM3QixPQUFPQyxNQUFNLE1BQU0sUUFBUTtBQUMzQixPQUFPQyxRQUFRLE1BQW9CLFlBQVk7QUFDL0MsT0FBT0MsTUFBTSxJQUFJQyxhQUFhLFFBQVEsa0JBQWtCOztBQUV4RDtBQUNBO0FBQ0E7QUFGQSxJQUdNQyxPQUFPLDBCQUFBQyxhQUFBO0VBQUEsU0FBQUQsUUFBQTtJQUFBLElBQUFFLFFBQUE7SUFBQSxJQUFBQyxLQUFBO0lBQUFDLGVBQUEsT0FBQUosT0FBQTtJQUFBLFNBQUFLLElBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFDLElBQUEsT0FBQUMsS0FBQSxDQUFBSixJQUFBLEdBQUFLLElBQUEsTUFBQUEsSUFBQSxHQUFBTCxJQUFBLEVBQUFLLElBQUE7TUFBQUYsSUFBQSxDQUFBRSxJQUFBLElBQUFKLFNBQUEsQ0FBQUksSUFBQTtJQUFBO0lBQUFQLEtBQUEsR0FBQVEsVUFBQSxPQUFBWCxPQUFBLEVBQUFZLHVCQUFBLENBQUFWLFFBQUEsT0FBQVcsSUFBQSxDQUFBWCxRQUFBLEVBQUFNLElBQUE7SUFBQU0sZUFBQSxDQUFBWCxLQUFBLGFBQ2VWLE9BQU87SUFBQXFCLGVBQUEsQ0FBQVgsS0FBQSxnQkFDRFQsVUFBVTtJQUFBb0IsZUFBQSxDQUFBWCxLQUFBLFlBQ2xCUixNQUFNO0lBQUFtQixlQUFBLENBQUFYLEtBQUEsWUFDTlAsTUFBTTtJQUFBa0IsZUFBQSxDQUFBWCxLQUFBLFVBQ1JQLE1BQU07SUFBQWtCLGVBQUEsQ0FBQVgsS0FBQSxtQkFDVUosYUFBYTtJQUFBZSxlQUFBLENBQUFYLEtBQUEsY0FDOUJOLFFBQVE7SUFBQWlCLGVBQUEsQ0FBQVgsS0FBQSxhQUNKTCxNQUFNO0lBQUEsT0FBQUssS0FBQTtFQUFBO0VBQUFZLFNBQUEsQ0FBQWYsT0FBQSxFQUFBQyxhQUFBO0VBQUEsT0FBQWUsWUFBQSxDQUFBaEIsT0FBQTtBQUFBLEVBUlhSLFlBQVk7QUFXbEMsT0FBTyxTQUFTeUIsY0FBY0EsQ0FDNUJDLElBQVksRUFDWkMsT0FBa0MsRUFDbEM7RUFDQUMsT0FBTyxDQUFDQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBQ0MsSUFBZ0IsRUFBSztJQUNqRCxJQUFJQyxHQUFRLEdBQUdDLFNBQVM7SUFDeEJDLHNCQUFBLENBQXNCSCxJQUFJLEVBQUVKLElBQUksRUFBRTtNQUNoQ1EsR0FBRyxXQUFBQSxJQUFBLEVBQUc7UUFBQSxJQUFBQyxJQUFBO1FBQ0pKLEdBQUcsSUFBQUksSUFBQSxHQUFHSixHQUFHLGNBQUFJLElBQUEsY0FBQUEsSUFBQSxHQUFJUixPQUFPLENBQUNHLElBQUksQ0FBQztRQUMxQixPQUFPQyxHQUFHO01BQ1osQ0FBQztNQUNESyxVQUFVLEVBQUUsSUFBSTtNQUNoQkMsWUFBWSxFQUFFO0lBQ2hCLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKO0FBRUEsSUFBTVQsT0FBTyxHQUFHLElBQUlwQixPQUFPLENBQUMsQ0FBQztBQUM3QixlQUFlb0IsT0FBTyIsImlnbm9yZUxpc3QiOltdfQ==