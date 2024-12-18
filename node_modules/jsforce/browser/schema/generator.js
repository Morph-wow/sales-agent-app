import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.regexp.to-string.js";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _endsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/ends-with";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context16; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context16 = Object.prototype.toString.call(o)).call(_context16, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.keys.js";
import os from 'os';
import fs from 'node:fs';
import path from 'path';
import { Cli } from '../cli/cli';
import { VERSION } from '..';
import { Command } from 'commander';
function getCacheFileDir() {
  return path.join(os.tmpdir(), 'jsforce-gen-schema-cache');
}
function getCacheFilePath(orgId) {
  return path.join(getCacheFileDir(), orgId, 'describe.json');
}
function readDescribedCache(_x) {
  return _readDescribedCache.apply(this, arguments);
}
function _readDescribedCache() {
  _readDescribedCache = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(orgId) {
    var cacheFile, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          cacheFile = getCacheFilePath(orgId);
          _context.next = 4;
          return fs.promises.readFile(cacheFile, 'utf8');
        case 4:
          data = _context.sent;
          return _context.abrupt("return", JSON.parse(data));
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", null);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _readDescribedCache.apply(this, arguments);
}
function loadDescribeResult(_x2, _x3, _x4) {
  return _loadDescribeResult.apply(this, arguments);
}
function _loadDescribeResult() {
  _loadDescribeResult = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(conn, orgId, cache) {
    var _yield$conn$describeG, sos, sobjects, _iterator2, _step2, name, so, cacheFile;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.info('describing global');
          _context2.next = 3;
          return conn.describeGlobal();
        case 3:
          _yield$conn$describeG = _context2.sent;
          sos = _yield$conn$describeG.sobjects;
          sobjects = [];
          _iterator2 = _createForOfIteratorHelper(sos);
          _context2.prev = 7;
          _iterator2.s();
        case 9:
          if ((_step2 = _iterator2.n()).done) {
            _context2.next = 18;
            break;
          }
          name = _step2.value.name;
          console.info('describing ' + name);
          _context2.next = 14;
          return conn.describe(name);
        case 14:
          so = _context2.sent;
          sobjects.push(so);
        case 16:
          _context2.next = 9;
          break;
        case 18:
          _context2.next = 23;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](7);
          _iterator2.e(_context2.t0);
        case 23:
          _context2.prev = 23;
          _iterator2.f();
          return _context2.finish(23);
        case 26:
          if (!cache) {
            _context2.next = 32;
            break;
          }
          cacheFile = getCacheFilePath(orgId);
          _context2.next = 30;
          return fs.promises.mkdir(path.dirname(cacheFile), {
            recursive: true
          });
        case 30:
          _context2.next = 32;
          return fs.promises.writeFile(cacheFile, _JSON$stringify(sobjects, null, 2), 'utf8');
        case 32:
          return _context2.abrupt("return", sobjects);
        case 33:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[7, 20, 23, 26]]);
  }));
  return _loadDescribeResult.apply(this, arguments);
}
function getParentReferences(sobject) {
  var parentReferences = [];
  var _iterator = _createForOfIteratorHelper(sobject.fields),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
        type = _step$value.type,
        nillable = _step$value.nillable,
        relationshipName = _step$value.relationshipName,
        referenceTo = _step$value.referenceTo;
      if (type === 'reference' && relationshipName && referenceTo && referenceTo.length > 0) {
        var parentSObject = referenceTo.length > 1 ? 'Name' : referenceTo[0];
        parentReferences.push({
          nillable: nillable,
          parentSObject: parentSObject,
          relationshipName: relationshipName
        });
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return parentReferences;
}
function getTSTypeString(type) {
  return type === 'double' || type === 'int' || type === 'currency' || type === 'percent' ? 'number' : type === 'boolean' ? 'boolean' : type === 'date' || type === 'datetime' || type === 'time' ? 'DateString' : type === 'base64' ? 'BlobString' : type === 'address' ? 'Address' : type === 'complexvalue' ? 'any' : 'string';
}
function dumpSchema(_x5, _x6, _x7, _x8, _x9) {
  return _dumpSchema.apply(this, arguments);
}
function _dumpSchema() {
  _dumpSchema = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(conn, orgId, outputFile, schemaName, cache) {
    var sobjects, out;
    return _regeneratorRuntime.wrap(function _callee3$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          if (!cache) {
            _context14.next = 6;
            break;
          }
          _context14.next = 3;
          return readDescribedCache(orgId);
        case 3:
          _context14.t1 = _context14.sent;
          _context14.next = 7;
          break;
        case 6:
          _context14.t1 = null;
        case 7:
          _context14.t0 = _context14.t1;
          if (_context14.t0) {
            _context14.next = 12;
            break;
          }
          _context14.next = 11;
          return loadDescribeResult(conn, orgId, cache);
        case 11:
          _context14.t0 = _context14.sent;
        case 12:
          sobjects = _context14.t0;
          if (fs.existsSync(outputFile)) {
            _context14.next = 18;
            break;
          }
          _context14.next = 16;
          return fs.promises.mkdir(path.dirname(outputFile), {
            recursive: true
          });
        case 16:
          _context14.next = 18;
          return fs.promises.writeFile(outputFile, '', 'utf8');
        case 18:
          out = fs.createWriteStream(outputFile, 'utf8');
          return _context14.abrupt("return", new _Promise(function (resolve, reject) {
            out.on('error', function (err) {
              return reject(err);
            });
            out.on('finish', resolve);
            var writeLine = function writeLine(message) {
              return out.write(message + '\n');
            };
            writeLine("import { Schema, SObjectDefinition, DateString, BlobString, Address } from 'jsforce';");
            writeLine('');
            var _iterator3 = _createForOfIteratorHelper(sobjects),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _context3, _context4, _context5, _context6, _context7;
                var sobject = _step3.value;
                var name = sobject.name,
                  fields = sobject.fields,
                  childRelationships = sobject.childRelationships;
                writeLine("type Fields$".concat(name, " = {"));
                writeLine('  //');
                var _iterator5 = _createForOfIteratorHelper(fields),
                  _step5;
                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    var _context8, _context9;
                    var _step5$value = _step5.value,
                      _name = _step5$value.name,
                      type = _step5$value.type,
                      nillable = _step5$value.nillable;
                    var tsType = getTSTypeString(type);
                    var orNull = nillable ? ' | null' : '';
                    writeLine(_concatInstanceProperty(_context8 = _concatInstanceProperty(_context9 = "  ".concat(_name, ": ")).call(_context9, tsType)).call(_context8, orNull, ";"));
                  }
                } catch (err) {
                  _iterator5.e(err);
                } finally {
                  _iterator5.f();
                }
                writeLine('};');
                writeLine('');
                writeLine("type ParentReferences$".concat(name, " = {"));
                writeLine('  //');
                var parentReferences = getParentReferences(sobject);
                var _iterator6 = _createForOfIteratorHelper(parentReferences),
                  _step6;
                try {
                  for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                    var _context10, _context11;
                    var _step6$value = _step6.value,
                      _nillable = _step6$value.nillable,
                      parentSObject = _step6$value.parentSObject,
                      relationshipName = _step6$value.relationshipName;
                    var _orNull = _nillable ? ' | null' : '';
                    writeLine(_concatInstanceProperty(_context10 = _concatInstanceProperty(_context11 = "  ".concat(relationshipName, ": SObjectDefinition$")).call(_context11, parentSObject)).call(_context10, _orNull, ";"));
                  }
                } catch (err) {
                  _iterator6.e(err);
                } finally {
                  _iterator6.f();
                }
                writeLine('};');
                writeLine('');
                writeLine("type ChildRelationships$".concat(name, " = {"));
                writeLine('  //');
                var _iterator7 = _createForOfIteratorHelper(childRelationships),
                  _step7;
                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    var _step7$value = _step7.value,
                      field = _step7$value.field,
                      childSObject = _step7$value.childSObject,
                      _relationshipName = _step7$value.relationshipName;
                    if (field && childSObject && _relationshipName && !_endsWithInstanceProperty(field).call(field, '__c')) {
                      var _context12;
                      writeLine(_concatInstanceProperty(_context12 = "  ".concat(_relationshipName, ": SObjectDefinition$")).call(_context12, childSObject, ";"));
                    }
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
                writeLine('};');
                writeLine('');
                writeLine(_concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = _concatInstanceProperty(_context5 = _concatInstanceProperty(_context6 = _concatInstanceProperty(_context7 = "interface SObjectDefinition$".concat(name, " extends SObjectDefinition<'")).call(_context7, name, "'> {\n    Name: '")).call(_context6, name, "';\n    Fields: Fields$")).call(_context5, name, ";\n    ParentReferences: ParentReferences$")).call(_context4, name, ";\n    ChildRelationships: ChildRelationships$")).call(_context3, name, ";\n  }"));
                writeLine('');
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            writeLine('');
            writeLine("export interface ".concat(schemaName, " extends Schema {"));
            writeLine('  SObjects: {');
            var _iterator4 = _createForOfIteratorHelper(sobjects),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _context13;
                var _name2 = _step4.value.name;
                writeLine(_concatInstanceProperty(_context13 = "    ".concat(_name2, ": SObjectDefinition$")).call(_context13, _name2, ";"));
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
            writeLine('  };');
            writeLine('}');
            out.end();
          }));
        case 20:
        case "end":
          return _context14.stop();
      }
    }, _callee3);
  }));
  return _dumpSchema.apply(this, arguments);
}
/**
 *
 */
function readCommand() {
  return new Command().option('-u, --username [username]', 'Salesforce username').option('-p, --password [password]', 'Salesforce password (and security token, if available)').option('-c, --connection [connection]', 'Connection name stored in connection registry').option('-l, --loginUrl [loginUrl]', 'Salesforce login url').option('-n, --schemaName [schemaName]', 'Name of schema type', 'MySchema').requiredOption('-o, --outputFile <outputFile>', 'Generated schema file path', './schema.d.ts').option('--sandbox', 'Login to Salesforce sandbox').option('--no-cache', 'Do not generate cache file for described result in tmp directory').option('--clearCache', 'Clear all existing described cache files').version(VERSION).parse(process.argv);
}

/**
 *
 */
export default function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    var program, cli, conn;
    return _regeneratorRuntime.wrap(function _callee4$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          program = readCommand();
          cli = new Cli();
          _context15.next = 4;
          return cli.connect(program);
        case 4:
          conn = cli.getCurrentConnection();
          if (conn.userInfo) {
            _context15.next = 8;
            break;
          }
          console.error('Cannot connect to Salesforce');
          return _context15.abrupt("return");
        case 8:
          _context15.next = 10;
          return dumpSchema(conn, conn.userInfo.organizationId, program.outputFile, program.schemaName, program.cache);
        case 10:
          if (!program.clearCache) {
            _context15.next = 14;
            break;
          }
          console.log('removing cache files');
          _context15.next = 14;
          return fs.promises.rm(getCacheFileDir(), {
            recursive: true
          });
        case 14:
          console.log("Dumped to: ".concat(program.outputFile));
        case 15:
        case "end":
          return _context15.stop();
      }
    }, _callee4);
  }));
  return _main.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcyIsImZzIiwicGF0aCIsIkNsaSIsIlZFUlNJT04iLCJDb21tYW5kIiwiZ2V0Q2FjaGVGaWxlRGlyIiwiam9pbiIsInRtcGRpciIsImdldENhY2hlRmlsZVBhdGgiLCJvcmdJZCIsInJlYWREZXNjcmliZWRDYWNoZSIsIl94IiwiX3JlYWREZXNjcmliZWRDYWNoZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJjYWNoZUZpbGUiLCJkYXRhIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsInByb21pc2VzIiwicmVhZEZpbGUiLCJzZW50IiwiYWJydXB0IiwiSlNPTiIsInBhcnNlIiwidDAiLCJzdG9wIiwibG9hZERlc2NyaWJlUmVzdWx0IiwiX3gyIiwiX3gzIiwiX3g0IiwiX2xvYWREZXNjcmliZVJlc3VsdCIsIl9jYWxsZWUyIiwiY29ubiIsImNhY2hlIiwiX3lpZWxkJGNvbm4kZGVzY3JpYmVHIiwic29zIiwic29iamVjdHMiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwibmFtZSIsInNvIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiY29uc29sZSIsImluZm8iLCJkZXNjcmliZUdsb2JhbCIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwicyIsIm4iLCJkb25lIiwidmFsdWUiLCJkZXNjcmliZSIsInB1c2giLCJlIiwiZiIsImZpbmlzaCIsIm1rZGlyIiwiZGlybmFtZSIsInJlY3Vyc2l2ZSIsIndyaXRlRmlsZSIsIl9KU09OJHN0cmluZ2lmeSIsImdldFBhcmVudFJlZmVyZW5jZXMiLCJzb2JqZWN0IiwicGFyZW50UmVmZXJlbmNlcyIsIl9pdGVyYXRvciIsImZpZWxkcyIsIl9zdGVwIiwiX3N0ZXAkdmFsdWUiLCJ0eXBlIiwibmlsbGFibGUiLCJyZWxhdGlvbnNoaXBOYW1lIiwicmVmZXJlbmNlVG8iLCJsZW5ndGgiLCJwYXJlbnRTT2JqZWN0IiwiZXJyIiwiZ2V0VFNUeXBlU3RyaW5nIiwiZHVtcFNjaGVtYSIsIl94NSIsIl94NiIsIl94NyIsIl94OCIsIl94OSIsIl9kdW1wU2NoZW1hIiwiX2NhbGxlZTMiLCJvdXRwdXRGaWxlIiwic2NoZW1hTmFtZSIsIm91dCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MTQiLCJ0MSIsImV4aXN0c1N5bmMiLCJjcmVhdGVXcml0ZVN0cmVhbSIsIl9Qcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uIiwid3JpdGVMaW5lIiwibWVzc2FnZSIsIndyaXRlIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsIl9jb250ZXh0MyIsIl9jb250ZXh0NCIsIl9jb250ZXh0NSIsIl9jb250ZXh0NiIsIl9jb250ZXh0NyIsImNoaWxkUmVsYXRpb25zaGlwcyIsImNvbmNhdCIsIl9pdGVyYXRvcjUiLCJfc3RlcDUiLCJfY29udGV4dDgiLCJfY29udGV4dDkiLCJfc3RlcDUkdmFsdWUiLCJ0c1R5cGUiLCJvck51bGwiLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsImNhbGwiLCJfaXRlcmF0b3I2IiwiX3N0ZXA2IiwiX2NvbnRleHQxMCIsIl9jb250ZXh0MTEiLCJfc3RlcDYkdmFsdWUiLCJfaXRlcmF0b3I3IiwiX3N0ZXA3IiwiX3N0ZXA3JHZhbHVlIiwiZmllbGQiLCJjaGlsZFNPYmplY3QiLCJfZW5kc1dpdGhJbnN0YW5jZVByb3BlcnR5IiwiX2NvbnRleHQxMiIsIl9pdGVyYXRvcjQiLCJfc3RlcDQiLCJfY29udGV4dDEzIiwiZW5kIiwicmVhZENvbW1hbmQiLCJvcHRpb24iLCJyZXF1aXJlZE9wdGlvbiIsInZlcnNpb24iLCJwcm9jZXNzIiwiYXJndiIsIm1haW4iLCJfbWFpbiIsIl9jYWxsZWU0IiwicHJvZ3JhbSIsImNsaSIsIl9jYWxsZWU0JCIsIl9jb250ZXh0MTUiLCJjb25uZWN0IiwiZ2V0Q3VycmVudENvbm5lY3Rpb24iLCJ1c2VySW5mbyIsImVycm9yIiwib3JnYW5pemF0aW9uSWQiLCJjbGVhckNhY2hlIiwibG9nIiwicm0iXSwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hL2dlbmVyYXRvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBEZXNjcmliZVNPYmplY3RSZXN1bHQgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBDbGkgfSBmcm9tICcuLi9jbGkvY2xpJztcbmltcG9ydCB7IENvbm5lY3Rpb24sIFZFUlNJT04gfSBmcm9tICcuLic7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCB7IG1rZGlyIH0gZnJvbSAnZnMnO1xuXG50eXBlIFVud3JhcFByb21pc2U8VD4gPSBUIGV4dGVuZHMgUHJvbWlzZTxpbmZlciBVPiA/IFUgOiBuZXZlcjtcblxuZnVuY3Rpb24gZ2V0Q2FjaGVGaWxlRGlyKCkge1xuICByZXR1cm4gcGF0aC5qb2luKG9zLnRtcGRpcigpLCAnanNmb3JjZS1nZW4tc2NoZW1hLWNhY2hlJyk7XG59XG5cbmZ1bmN0aW9uIGdldENhY2hlRmlsZVBhdGgob3JnSWQ6IHN0cmluZykge1xuICByZXR1cm4gcGF0aC5qb2luKGdldENhY2hlRmlsZURpcigpLCBvcmdJZCwgJ2Rlc2NyaWJlLmpzb24nKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVhZERlc2NyaWJlZENhY2hlKFxuICBvcmdJZDogc3RyaW5nLFxuKTogUHJvbWlzZTxVbndyYXBQcm9taXNlPFJldHVyblR5cGU8dHlwZW9mIGxvYWREZXNjcmliZVJlc3VsdD4+IHwgbnVsbD4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNhY2hlRmlsZSA9IGdldENhY2hlRmlsZVBhdGgob3JnSWQpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShjYWNoZUZpbGUsICd1dGY4Jyk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkRGVzY3JpYmVSZXN1bHQoXG4gIGNvbm46IENvbm5lY3Rpb24sXG4gIG9yZ0lkOiBzdHJpbmcsXG4gIGNhY2hlPzogYm9vbGVhbixcbikge1xuICBjb25zb2xlLmluZm8oJ2Rlc2NyaWJpbmcgZ2xvYmFsJyk7XG4gIGNvbnN0IHsgc29iamVjdHM6IHNvcyB9ID0gYXdhaXQgY29ubi5kZXNjcmliZUdsb2JhbCgpO1xuICBjb25zdCBzb2JqZWN0cyA9IFtdO1xuICBmb3IgKGNvbnN0IHsgbmFtZSB9IG9mIHNvcykge1xuICAgIGNvbnNvbGUuaW5mbygnZGVzY3JpYmluZyAnICsgbmFtZSk7XG4gICAgY29uc3Qgc28gPSBhd2FpdCBjb25uLmRlc2NyaWJlKG5hbWUpO1xuICAgIHNvYmplY3RzLnB1c2goc28pO1xuICB9XG4gIGlmIChjYWNoZSkge1xuICAgIGNvbnN0IGNhY2hlRmlsZSA9IGdldENhY2hlRmlsZVBhdGgob3JnSWQpO1xuICAgIGF3YWl0IGZzLnByb21pc2VzLm1rZGlyKHBhdGguZGlybmFtZShjYWNoZUZpbGUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUoXG4gICAgICBjYWNoZUZpbGUsXG4gICAgICBKU09OLnN0cmluZ2lmeShzb2JqZWN0cywgbnVsbCwgMiksXG4gICAgICAndXRmOCcsXG4gICAgKTtcbiAgfVxuICByZXR1cm4gc29iamVjdHM7XG59XG5cbmZ1bmN0aW9uIGdldFBhcmVudFJlZmVyZW5jZXMoc29iamVjdDogRGVzY3JpYmVTT2JqZWN0UmVzdWx0KSB7XG4gIGNvbnN0IHBhcmVudFJlZmVyZW5jZXMgPSBbXTtcbiAgZm9yIChjb25zdCB7XG4gICAgdHlwZSxcbiAgICBuaWxsYWJsZSxcbiAgICByZWxhdGlvbnNoaXBOYW1lLFxuICAgIHJlZmVyZW5jZVRvLFxuICB9IG9mIHNvYmplY3QuZmllbGRzKSB7XG4gICAgaWYgKFxuICAgICAgdHlwZSA9PT0gJ3JlZmVyZW5jZScgJiZcbiAgICAgIHJlbGF0aW9uc2hpcE5hbWUgJiZcbiAgICAgIHJlZmVyZW5jZVRvICYmXG4gICAgICByZWZlcmVuY2VUby5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBjb25zdCBwYXJlbnRTT2JqZWN0ID0gcmVmZXJlbmNlVG8ubGVuZ3RoID4gMSA/ICdOYW1lJyA6IHJlZmVyZW5jZVRvWzBdO1xuICAgICAgcGFyZW50UmVmZXJlbmNlcy5wdXNoKHsgbmlsbGFibGUsIHBhcmVudFNPYmplY3QsIHJlbGF0aW9uc2hpcE5hbWUgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXJlbnRSZWZlcmVuY2VzO1xufVxuXG5mdW5jdGlvbiBnZXRUU1R5cGVTdHJpbmcodHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHR5cGUgPT09ICdkb3VibGUnIHx8XG4gICAgdHlwZSA9PT0gJ2ludCcgfHxcbiAgICB0eXBlID09PSAnY3VycmVuY3knIHx8XG4gICAgdHlwZSA9PT0gJ3BlcmNlbnQnXG4gICAgPyAnbnVtYmVyJ1xuICAgIDogdHlwZSA9PT0gJ2Jvb2xlYW4nXG4gICAgPyAnYm9vbGVhbidcbiAgICA6IHR5cGUgPT09ICdkYXRlJyB8fCB0eXBlID09PSAnZGF0ZXRpbWUnIHx8IHR5cGUgPT09ICd0aW1lJ1xuICAgID8gJ0RhdGVTdHJpbmcnXG4gICAgOiB0eXBlID09PSAnYmFzZTY0J1xuICAgID8gJ0Jsb2JTdHJpbmcnXG4gICAgOiB0eXBlID09PSAnYWRkcmVzcydcbiAgICA/ICdBZGRyZXNzJ1xuICAgIDogdHlwZSA9PT0gJ2NvbXBsZXh2YWx1ZSdcbiAgICA/ICdhbnknXG4gICAgOiAnc3RyaW5nJztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZHVtcFNjaGVtYShcbiAgY29ubjogQ29ubmVjdGlvbixcbiAgb3JnSWQ6IHN0cmluZyxcbiAgb3V0cHV0RmlsZTogc3RyaW5nLFxuICBzY2hlbWFOYW1lOiBzdHJpbmcsXG4gIGNhY2hlPzogYm9vbGVhbixcbikge1xuICBjb25zdCBzb2JqZWN0cyA9XG4gICAgKGNhY2hlID8gYXdhaXQgcmVhZERlc2NyaWJlZENhY2hlKG9yZ0lkKSA6IG51bGwpIHx8XG4gICAgKGF3YWl0IGxvYWREZXNjcmliZVJlc3VsdChjb25uLCBvcmdJZCwgY2FjaGUpKTtcbiAgaWYgKCFmcy5leGlzdHNTeW5jKG91dHB1dEZpbGUpKSB7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMubWtkaXIocGF0aC5kaXJuYW1lKG91dHB1dEZpbGUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICBhd2FpdCBmcy5wcm9taXNlcy53cml0ZUZpbGUob3V0cHV0RmlsZSwgJycsICd1dGY4Jyk7XG4gIH1cbiAgY29uc3Qgb3V0ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0ob3V0cHV0RmlsZSwgJ3V0ZjgnKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBvdXQub24oJ2Vycm9yJywgKGVycikgPT4gcmVqZWN0KGVycikpO1xuICAgIG91dC5vbignZmluaXNoJywgcmVzb2x2ZSk7XG4gICAgY29uc3Qgd3JpdGVMaW5lID0gKG1lc3NhZ2U6IHN0cmluZykgPT4gb3V0LndyaXRlKG1lc3NhZ2UgKyAnXFxuJyk7XG4gICAgd3JpdGVMaW5lKFxuICAgICAgXCJpbXBvcnQgeyBTY2hlbWEsIFNPYmplY3REZWZpbml0aW9uLCBEYXRlU3RyaW5nLCBCbG9iU3RyaW5nLCBBZGRyZXNzIH0gZnJvbSAnanNmb3JjZSc7XCIsXG4gICAgKTtcbiAgICB3cml0ZUxpbmUoJycpO1xuICAgIGZvciAoY29uc3Qgc29iamVjdCBvZiBzb2JqZWN0cykge1xuICAgICAgY29uc3QgeyBuYW1lLCBmaWVsZHMsIGNoaWxkUmVsYXRpb25zaGlwcyB9ID0gc29iamVjdDtcbiAgICAgIHdyaXRlTGluZShgdHlwZSBGaWVsZHMkJHtuYW1lfSA9IHtgKTtcbiAgICAgIHdyaXRlTGluZSgnICAvLycpO1xuICAgICAgZm9yIChjb25zdCB7IG5hbWUsIHR5cGUsIG5pbGxhYmxlIH0gb2YgZmllbGRzKSB7XG4gICAgICAgIGNvbnN0IHRzVHlwZSA9IGdldFRTVHlwZVN0cmluZyh0eXBlKTtcbiAgICAgICAgY29uc3Qgb3JOdWxsID0gbmlsbGFibGUgPyAnIHwgbnVsbCcgOiAnJztcbiAgICAgICAgd3JpdGVMaW5lKGAgICR7bmFtZX06ICR7dHNUeXBlfSR7b3JOdWxsfTtgKTtcbiAgICAgIH1cbiAgICAgIHdyaXRlTGluZSgnfTsnKTtcbiAgICAgIHdyaXRlTGluZSgnJyk7XG4gICAgICB3cml0ZUxpbmUoYHR5cGUgUGFyZW50UmVmZXJlbmNlcyQke25hbWV9ID0ge2ApO1xuICAgICAgd3JpdGVMaW5lKCcgIC8vJyk7XG4gICAgICBjb25zdCBwYXJlbnRSZWZlcmVuY2VzID0gZ2V0UGFyZW50UmVmZXJlbmNlcyhzb2JqZWN0KTtcbiAgICAgIGZvciAoY29uc3Qge1xuICAgICAgICBuaWxsYWJsZSxcbiAgICAgICAgcGFyZW50U09iamVjdCxcbiAgICAgICAgcmVsYXRpb25zaGlwTmFtZSxcbiAgICAgIH0gb2YgcGFyZW50UmVmZXJlbmNlcykge1xuICAgICAgICBjb25zdCBvck51bGwgPSBuaWxsYWJsZSA/ICcgfCBudWxsJyA6ICcnO1xuICAgICAgICB3cml0ZUxpbmUoXG4gICAgICAgICAgYCAgJHtyZWxhdGlvbnNoaXBOYW1lfTogU09iamVjdERlZmluaXRpb24kJHtwYXJlbnRTT2JqZWN0fSR7b3JOdWxsfTtgLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgd3JpdGVMaW5lKCd9OycpO1xuICAgICAgd3JpdGVMaW5lKCcnKTtcbiAgICAgIHdyaXRlTGluZShgdHlwZSBDaGlsZFJlbGF0aW9uc2hpcHMkJHtuYW1lfSA9IHtgKTtcbiAgICAgIHdyaXRlTGluZSgnICAvLycpO1xuICAgICAgZm9yIChjb25zdCB7XG4gICAgICAgIGZpZWxkLFxuICAgICAgICBjaGlsZFNPYmplY3QsXG4gICAgICAgIHJlbGF0aW9uc2hpcE5hbWUsXG4gICAgICB9IG9mIGNoaWxkUmVsYXRpb25zaGlwcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZmllbGQgJiZcbiAgICAgICAgICBjaGlsZFNPYmplY3QgJiZcbiAgICAgICAgICByZWxhdGlvbnNoaXBOYW1lICYmXG4gICAgICAgICAgIWZpZWxkLmVuZHNXaXRoKCdfX2MnKVxuICAgICAgICApIHtcbiAgICAgICAgICB3cml0ZUxpbmUoXG4gICAgICAgICAgICBgICAke3JlbGF0aW9uc2hpcE5hbWV9OiBTT2JqZWN0RGVmaW5pdGlvbiQke2NoaWxkU09iamVjdH07YCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3cml0ZUxpbmUoJ307Jyk7XG4gICAgICB3cml0ZUxpbmUoJycpO1xuICAgICAgd3JpdGVMaW5lKFxuICAgICAgICBgaW50ZXJmYWNlIFNPYmplY3REZWZpbml0aW9uJCR7bmFtZX0gZXh0ZW5kcyBTT2JqZWN0RGVmaW5pdGlvbjwnJHtuYW1lfSc+IHtcbiAgICBOYW1lOiAnJHtuYW1lfSc7XG4gICAgRmllbGRzOiBGaWVsZHMkJHtuYW1lfTtcbiAgICBQYXJlbnRSZWZlcmVuY2VzOiBQYXJlbnRSZWZlcmVuY2VzJCR7bmFtZX07XG4gICAgQ2hpbGRSZWxhdGlvbnNoaXBzOiBDaGlsZFJlbGF0aW9uc2hpcHMkJHtuYW1lfTtcbiAgfWAsXG4gICAgICApO1xuICAgICAgd3JpdGVMaW5lKCcnKTtcbiAgICB9XG4gICAgd3JpdGVMaW5lKCcnKTtcbiAgICB3cml0ZUxpbmUoYGV4cG9ydCBpbnRlcmZhY2UgJHtzY2hlbWFOYW1lfSBleHRlbmRzIFNjaGVtYSB7YCk7XG4gICAgd3JpdGVMaW5lKCcgIFNPYmplY3RzOiB7Jyk7XG4gICAgZm9yIChjb25zdCB7IG5hbWUgfSBvZiBzb2JqZWN0cykge1xuICAgICAgd3JpdGVMaW5lKGAgICAgJHtuYW1lfTogU09iamVjdERlZmluaXRpb24kJHtuYW1lfTtgKTtcbiAgICB9XG4gICAgd3JpdGVMaW5lKCcgIH07Jyk7XG4gICAgd3JpdGVMaW5lKCd9Jyk7XG4gICAgb3V0LmVuZCgpO1xuICB9KTtcbn1cblxudHlwZSBHZW5lcmF0b3JDb21tYW5kID0ge1xuICBjb25uZWN0aW9uPzogc3RyaW5nO1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gIGxvZ2luVXJsPzogc3RyaW5nO1xuICBzYW5kYm94PzogYm9vbGVhbjtcbiAgb3V0cHV0RmlsZTogc3RyaW5nO1xuICBjYWNoZT86IGJvb2xlYW47XG4gIGNsZWFyQ2FjaGU/OiBib29sZWFuO1xufSAmIENvbW1hbmQ7XG5cbi8qKlxuICpcbiAqL1xuZnVuY3Rpb24gcmVhZENvbW1hbmQoKTogR2VuZXJhdG9yQ29tbWFuZCB7XG4gIHJldHVybiBuZXcgQ29tbWFuZCgpXG4gICAgLm9wdGlvbignLXUsIC0tdXNlcm5hbWUgW3VzZXJuYW1lXScsICdTYWxlc2ZvcmNlIHVzZXJuYW1lJylcbiAgICAub3B0aW9uKFxuICAgICAgJy1wLCAtLXBhc3N3b3JkIFtwYXNzd29yZF0nLFxuICAgICAgJ1NhbGVzZm9yY2UgcGFzc3dvcmQgKGFuZCBzZWN1cml0eSB0b2tlbiwgaWYgYXZhaWxhYmxlKScsXG4gICAgKVxuICAgIC5vcHRpb24oXG4gICAgICAnLWMsIC0tY29ubmVjdGlvbiBbY29ubmVjdGlvbl0nLFxuICAgICAgJ0Nvbm5lY3Rpb24gbmFtZSBzdG9yZWQgaW4gY29ubmVjdGlvbiByZWdpc3RyeScsXG4gICAgKVxuICAgIC5vcHRpb24oJy1sLCAtLWxvZ2luVXJsIFtsb2dpblVybF0nLCAnU2FsZXNmb3JjZSBsb2dpbiB1cmwnKVxuICAgIC5vcHRpb24oJy1uLCAtLXNjaGVtYU5hbWUgW3NjaGVtYU5hbWVdJywgJ05hbWUgb2Ygc2NoZW1hIHR5cGUnLCAnTXlTY2hlbWEnKVxuICAgIC5yZXF1aXJlZE9wdGlvbihcbiAgICAgICctbywgLS1vdXRwdXRGaWxlIDxvdXRwdXRGaWxlPicsXG4gICAgICAnR2VuZXJhdGVkIHNjaGVtYSBmaWxlIHBhdGgnLFxuICAgICAgJy4vc2NoZW1hLmQudHMnLFxuICAgIClcbiAgICAub3B0aW9uKCctLXNhbmRib3gnLCAnTG9naW4gdG8gU2FsZXNmb3JjZSBzYW5kYm94JylcbiAgICAub3B0aW9uKFxuICAgICAgJy0tbm8tY2FjaGUnLFxuICAgICAgJ0RvIG5vdCBnZW5lcmF0ZSBjYWNoZSBmaWxlIGZvciBkZXNjcmliZWQgcmVzdWx0IGluIHRtcCBkaXJlY3RvcnknLFxuICAgIClcbiAgICAub3B0aW9uKCctLWNsZWFyQ2FjaGUnLCAnQ2xlYXIgYWxsIGV4aXN0aW5nIGRlc2NyaWJlZCBjYWNoZSBmaWxlcycpXG4gICAgLnZlcnNpb24oVkVSU0lPTilcbiAgICAucGFyc2UocHJvY2Vzcy5hcmd2KSBhcyBHZW5lcmF0b3JDb21tYW5kO1xufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHByb2dyYW0gPSByZWFkQ29tbWFuZCgpO1xuICBjb25zdCBjbGkgPSBuZXcgQ2xpKCk7XG4gIGF3YWl0IGNsaS5jb25uZWN0KHByb2dyYW0pO1xuICBjb25zdCBjb25uID0gY2xpLmdldEN1cnJlbnRDb25uZWN0aW9uKCk7XG4gIGlmICghY29ubi51c2VySW5mbykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBjb25uZWN0IHRvIFNhbGVzZm9yY2UnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgYXdhaXQgZHVtcFNjaGVtYShcbiAgICBjb25uLFxuICAgIGNvbm4udXNlckluZm8ub3JnYW5pemF0aW9uSWQsXG4gICAgcHJvZ3JhbS5vdXRwdXRGaWxlLFxuICAgIHByb2dyYW0uc2NoZW1hTmFtZSxcbiAgICBwcm9ncmFtLmNhY2hlLFxuICApO1xuICBpZiAocHJvZ3JhbS5jbGVhckNhY2hlKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbW92aW5nIGNhY2hlIGZpbGVzJyk7XG4gICAgYXdhaXQgZnMucHJvbWlzZXMucm0oZ2V0Q2FjaGVGaWxlRGlyKCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG4gIGNvbnNvbGUubG9nKGBEdW1wZWQgdG86ICR7cHJvZ3JhbS5vdXRwdXRGaWxlfWApO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEVBQUUsTUFBTSxJQUFJO0FBQ25CLE9BQU9DLEVBQUUsTUFBTSxTQUFTO0FBQ3hCLE9BQU9DLElBQUksTUFBTSxNQUFNO0FBRXZCLFNBQVNDLEdBQUcsUUFBUSxZQUFZO0FBQ2hDLFNBQXFCQyxPQUFPLFFBQVEsSUFBSTtBQUN4QyxTQUFTQyxPQUFPLFFBQVEsV0FBVztBQUtuQyxTQUFTQyxlQUFlQSxDQUFBLEVBQUc7RUFDekIsT0FBT0osSUFBSSxDQUFDSyxJQUFJLENBQUNQLEVBQUUsQ0FBQ1EsTUFBTSxDQUFDLENBQUMsRUFBRSwwQkFBMEIsQ0FBQztBQUMzRDtBQUVBLFNBQVNDLGdCQUFnQkEsQ0FBQ0MsS0FBYSxFQUFFO0VBQ3ZDLE9BQU9SLElBQUksQ0FBQ0ssSUFBSSxDQUFDRCxlQUFlLENBQUMsQ0FBQyxFQUFFSSxLQUFLLEVBQUUsZUFBZSxDQUFDO0FBQzdEO0FBQUMsU0FFY0Msa0JBQWtCQSxDQUFBQyxFQUFBO0VBQUEsT0FBQUMsbUJBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0FBQUE7QUFBQSxTQUFBRixvQkFBQTtFQUFBQSxtQkFBQSxHQUFBRyxpQkFBQSxlQUFBQyxtQkFBQSxDQUFBQyxJQUFBLENBQWpDLFNBQUFDLFFBQ0VULEtBQWE7SUFBQSxJQUFBVSxTQUFBLEVBQUFDLElBQUE7SUFBQSxPQUFBSixtQkFBQSxDQUFBSyxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7TUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtRQUFBO1VBQUFGLFFBQUEsQ0FBQUMsSUFBQTtVQUdMTCxTQUFTLEdBQUdYLGdCQUFnQixDQUFDQyxLQUFLLENBQUM7VUFBQWMs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