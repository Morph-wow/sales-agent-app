import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.object.keys.js";
import fs from 'fs';
import path from 'path';
import { BaseRegistry } from './base';

/**
 *
 */
function getDefaultConfigFilePath() {
  var homeDir = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  if (!homeDir) {
    throw new Error('cannot find user home directory to store configuration files');
  }
  return path.join(homeDir, '.jsforce', 'config.json');
}

/**
 *
 */
export var FileRegistry = /*#__PURE__*/function (_BaseRegistry) {
  function FileRegistry(_ref) {
    var _this;
    var configFilePath = _ref.configFilePath;
    _classCallCheck(this, FileRegistry);
    _this = _callSuper(this, FileRegistry);
    _this._configFilePath = configFilePath || getDefaultConfigFilePath();
    try {
      var data = fs.readFileSync(_this._configFilePath, 'utf-8');
      _this._registryConfig = JSON.parse(data);
    } catch (e) {
      //
    }
    return _this;
  }
  _inherits(FileRegistry, _BaseRegistry);
  return _createClass(FileRegistry, [{
    key: "_saveConfig",
    value: function _saveConfig() {
      var data = _JSON$stringify(this._registryConfig, null, 4);
      try {
        fs.writeFileSync(this._configFilePath, data);
        fs.chmodSync(this._configFilePath, '600');
      } catch (e) {
        var configDir = path.dirname(this._configFilePath);
        fs.mkdirSync(configDir);
        fs.chmodSync(configDir, '700');
        fs.writeFileSync(this._configFilePath, data);
        fs.chmodSync(this._configFilePath, '600');
      }
    }
  }]);
}(BaseRegistry);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcyIsInBhdGgiLCJCYXNlUmVnaXN0cnkiLCJnZXREZWZhdWx0Q29uZmlnRmlsZVBhdGgiLCJob21lRGlyIiwicHJvY2VzcyIsImVudiIsInBsYXRmb3JtIiwiRXJyb3IiLCJqb2luIiwiRmlsZVJlZ2lzdHJ5IiwiX0Jhc2VSZWdpc3RyeSIsIl9yZWYiLCJfdGhpcyIsImNvbmZpZ0ZpbGVQYXRoIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsIl9jb25maWdGaWxlUGF0aCIsImRhdGEiLCJyZWFkRmlsZVN5bmMiLCJfcmVnaXN0cnlDb25maWciLCJKU09OIiwicGFyc2UiLCJlIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJfc2F2ZUNvbmZpZyIsIl9KU09OJHN0cmluZ2lmeSIsIndyaXRlRmlsZVN5bmMiLCJjaG1vZFN5bmMiLCJjb25maWdEaXIiLCJkaXJuYW1lIiwibWtkaXJTeW5jIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlZ2lzdHJ5L2ZpbGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQmFzZVJlZ2lzdHJ5IH0gZnJvbSAnLi9iYXNlJztcblxuLyoqXG4gKlxuICovXG5mdW5jdGlvbiBnZXREZWZhdWx0Q29uZmlnRmlsZVBhdGgoKSB7XG4gIGNvbnN0IGhvbWVEaXIgPVxuICAgIHByb2Nlc3MuZW52W3Byb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicgPyAnVVNFUlBST0ZJTEUnIDogJ0hPTUUnXTtcbiAgaWYgKCFob21lRGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2Nhbm5vdCBmaW5kIHVzZXIgaG9tZSBkaXJlY3RvcnkgdG8gc3RvcmUgY29uZmlndXJhdGlvbiBmaWxlcycsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcGF0aC5qb2luKGhvbWVEaXIsICcuanNmb3JjZScsICdjb25maWcuanNvbicpO1xufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWxlUmVnaXN0cnkgZXh0ZW5kcyBCYXNlUmVnaXN0cnkge1xuICBfY29uZmlnRmlsZVBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih7IGNvbmZpZ0ZpbGVQYXRoIH06IHsgY29uZmlnRmlsZVBhdGg/OiBzdHJpbmcgfSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY29uZmlnRmlsZVBhdGggPSBjb25maWdGaWxlUGF0aCB8fCBnZXREZWZhdWx0Q29uZmlnRmlsZVBhdGgoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyh0aGlzLl9jb25maWdGaWxlUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICB0aGlzLl9yZWdpc3RyeUNvbmZpZyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy9cbiAgICB9XG4gIH1cblxuICBfc2F2ZUNvbmZpZygpIHtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fcmVnaXN0cnlDb25maWcsIG51bGwsIDQpO1xuICAgIHRyeSB7XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHRoaXMuX2NvbmZpZ0ZpbGVQYXRoLCBkYXRhKTtcbiAgICAgIGZzLmNobW9kU3luYyh0aGlzLl9jb25maWdGaWxlUGF0aCwgJzYwMCcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IGNvbmZpZ0RpciA9IHBhdGguZGlybmFtZSh0aGlzLl9jb25maWdGaWxlUGF0aCk7XG4gICAgICBmcy5ta2RpclN5bmMoY29uZmlnRGlyKTtcbiAgICAgIGZzLmNobW9kU3luYyhjb25maWdEaXIsICc3MDAnKTtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmModGhpcy5fY29uZmlnRmlsZVBhdGgsIGRhdGEpO1xuICAgICAgZnMuY2htb2RTeW5jKHRoaXMuX2NvbmZpZ0ZpbGVQYXRoLCAnNjAwJyk7XG4gICAgfVxuICB9XG59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