import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import { BaseRegistry } from './base';

/**
 *
 */
export var EmptyRegistry = /*#__PURE__*/function (_BaseRegistry) {
  function EmptyRegistry() {
    _classCallCheck(this, EmptyRegistry);
    return _callSuper(this, EmptyRegistry, arguments);
  }
  _inherits(EmptyRegistry, _BaseRegistry);
  return _createClass(EmptyRegistry, [{
    key: "_saveConfig",
    value: function _saveConfig() {
      // ignore all call requests
    }
  }]);
}(BaseRegistry);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCYXNlUmVnaXN0cnkiLCJFbXB0eVJlZ2lzdHJ5IiwiX0Jhc2VSZWdpc3RyeSIsIl9jbGFzc0NhbGxDaGVjayIsIl9jYWxsU3VwZXIiLCJhcmd1bWVudHMiLCJfaW5oZXJpdHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsIl9zYXZlQ29uZmlnIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlZ2lzdHJ5L2VtcHR5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VSZWdpc3RyeSB9IGZyb20gJy4vYmFzZSc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEVtcHR5UmVnaXN0cnkgZXh0ZW5kcyBCYXNlUmVnaXN0cnkge1xuICBfc2F2ZUNvbmZpZygpIHtcbiAgICAvLyBpZ25vcmUgYWxsIGNhbGwgcmVxdWVzdHNcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLFNBQVNBLFlBQVksUUFBUSxRQUFROztBQUVyQztBQUNBO0FBQ0E7QUFDQSxXQUFhQyxhQUFhLDBCQUFBQyxhQUFBO0VBQUEsU0FBQUQsY0FBQTtJQUFBRSxlQUFBLE9BQUFGLGFBQUE7SUFBQSxPQUFBRyxVQUFBLE9BQUFILGFBQUEsRUFBQUksU0FBQTtFQUFBO0VBQUFDLFNBQUEsQ0FBQUwsYUFBQSxFQUFBQyxhQUFBO0VBQUEsT0FBQUssWUFBQSxDQUFBTixhQUFBO0lBQUFPLEdBQUE7SUFBQUMsS0FBQSxFQUN4QixTQUFBQyxZQUFBLEVBQWM7TUFDWjtJQUFBO0VBQ0Q7QUFBQSxFQUhnQ1YsWUFBWSIsImlnbm9yZUxpc3QiOltdfQ==