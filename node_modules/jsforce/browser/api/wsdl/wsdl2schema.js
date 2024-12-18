import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.string.replace.js";
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { var _context6; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context6 = Object.prototype.toString.call(o)).call(_context6, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import fs from 'node:fs';
import xml2js from 'xml2js';
import { castTypeUsingSchema } from '../../soap';
import { isMapObject } from '../../util/function';

/**
 *
 */
var WSDLRestrictionSchema = {
  $: {
    base: 'string'
  },
  enumeration: [{
    $: {
      value: 'string'
    }
  }],
  'xsd:enumeration': [{
    $: {
      value: 'string'
    }
  }]
};
var WSDLSimpleTypeSchema = {
  $: {
    name: 'string'
  },
  restriction: WSDLRestrictionSchema,
  'xsd:restriction': WSDLRestrictionSchema
};
var WSDLElementSchema = {
  $: {
    name: 'string',
    type: 'string',
    minOccurs: '?number',
    maxOccurs: '?string',
    nillable: '?boolean'
  }
};
var WSDLSequenceSchema = {
  element: ['?', WSDLElementSchema],
  'xsd:element': ['?', WSDLElementSchema]
};
var WSDLExtensionSchema = {
  $: {
    base: 'string'
  },
  sequence: {
    '?': WSDLSequenceSchema
  },
  'xsd:sequence': {
    '?': WSDLSequenceSchema
  }
};
var WSDLComplexContentSchema = {
  extension: {
    '?': WSDLExtensionSchema
  },
  'xsd:extension': {
    '?': WSDLExtensionSchema
  }
};
var WSDLComplexTypeSchema = {
  $: {
    name: 'string'
  },
  sequence: {
    '?': WSDLSequenceSchema
  },
  'xsd:sequence': {
    '?': WSDLSequenceSchema
  },
  complexContent: {
    '?': WSDLComplexContentSchema
  },
  'xsd:complexContent': {
    '?': WSDLComplexContentSchema
  }
};
var WSDLSchemaSchema = {
  $: 'any',
  complexType: ['?', 'any'],
  simpleType: ['?', 'any'],
  'xsd:complexType': ['?', 'any'],
  'xsd:simpleType': ['?', 'any']
};
var WSDLSchema = {
  definitions: {
    $: 'any',
    types: {
      schema: ['?', WSDLSchemaSchema],
      'xsd:schema': ['?', WSDLSchemaSchema]
    },
    message: ['any'],
    portType: {
      $: 'any',
      operation: ['any']
    },
    binding: {
      $: 'any',
      operation: ['any']
    },
    service: {
      $: 'any',
      documentation: 'string',
      operation: ['any']
    }
  }
};

/**
 *
 */

/**
 *
 */
function toJsType(xsdType, simpleTypes) {
  switch (xsdType) {
    case 'xsd:boolean':
      return 'boolean';
    case 'xsd:string':
    case 'xsd:date':
    case 'xsd:dateTime':
    case 'xsd:time':
    case 'xsd:base64Binary':
      return 'string';
    case 'xsd:int':
    case 'xsd:long':
    case 'xsd:double':
      return 'number';
    case 'xsd:anyType':
      return 'any';
    default:
      {
        var _xsdType$split = xsdType.split(':'),
          _xsdType$split2 = _slicedToArray(_xsdType$split, 2),
          ns = _xsdType$split2[0],
          type = _xsdType$split2[1];
        if (simpleTypes[type]) {
          return simpleTypes[type];
        }
        if (ns) {
          return type;
        }
        return xsdType;
      }
  }
}

/**
 *
 */
function readWSDLFile(_x) {
  return _readWSDLFile.apply(this, arguments);
}
/**
 *
 */
function _readWSDLFile() {
  _readWSDLFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(filePath) {
    var xmlData, json;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fs.promises.readFile(filePath, 'utf8');
        case 2:
          xmlData = _context.sent;
          _context.next = 5;
          return xml2js.parseStringPromise(xmlData, {
            explicitArray: false
          });
        case 5:
          json = _context.sent;
          return _context.abrupt("return", castTypeUsingSchema(json, WSDLSchema));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _readWSDLFile.apply(this, arguments);
}
function getTypeInfo(el, simpleTypes) {
  var type = toJsType(el.$.type, simpleTypes);
  var isArray = el.$.maxOccurs === 'unbounded';
  var nillable = !isArray && el.$.minOccurs === 0 || el.$.nillable;
  return isArray ? nillable ? ['?', type] : [type] : nillable ? "?".concat(type) : type;
}

/**
 *
 */
function extractComplexTypes(wsdl) {
  var _ref, _types$schema, _ref3, _types$schema2;
  console.log(wsdl.definitions.types['xsd:schema']);
  var schemas = {};
  var simpleTypes = {};
  var types = wsdl.definitions.types;
  var _iterator = _createForOfIteratorHelper((_ref = (_types$schema = types.schema) !== null && _types$schema !== void 0 ? _types$schema : types['xsd:schema']) !== null && _ref !== void 0 ? _ref : []),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ref2, _sc$simpleType;
      var sc = _step.value;
      var _iterator3 = _createForOfIteratorHelper((_ref2 = (_sc$simpleType = sc.simpleType) !== null && _sc$simpleType !== void 0 ? _sc$simpleType : sc['xsd:simpleType']) !== null && _ref2 !== void 0 ? _ref2 : []),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _simpleType$restricti;
          var st = _step3.value;
          var simpleType = castTypeUsingSchema(st, WSDLSimpleTypeSchema);
          var rs = (_simpleType$restricti = simpleType.restriction) !== null && _simpleType$restricti !== void 0 ? _simpleType$restricti : simpleType['xsd:restriction'];
          var base = rs.$.base.split(':')[1];
          simpleTypes[simpleType.$.name] = base;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  console.log({
    simpleTypes: simpleTypes
  });
  var _iterator2 = _createForOfIteratorHelper((_ref3 = (_types$schema2 = types.schema) !== null && _types$schema2 !== void 0 ? _types$schema2 : types['xsd:schema']) !== null && _ref3 !== void 0 ? _ref3 : []),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _ref4, _sc$complexType;
      var _sc = _step2.value;
      var _iterator4 = _createForOfIteratorHelper((_ref4 = (_sc$complexType = _sc.complexType) !== null && _sc$complexType !== void 0 ? _sc$complexType : _sc['xsd:complexType']) !== null && _ref4 !== void 0 ? _ref4 : []),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _complexType$sequence, _seq$element, _complexType$complexC;
          var ct = _step4.value;
          var complexType = castTypeUsingSchema(ct, WSDLComplexTypeSchema);
          var schema = {
            type: complexType.$.name,
            props: {}
          };
          var seq = (_complexType$sequence = complexType.sequence) !== null && _complexType$sequence !== void 0 ? _complexType$sequence : complexType['xsd:sequence'];
          var els = (_seq$element = seq === null || seq === void 0 ? void 0 : seq.element) !== null && _seq$element !== void 0 ? _seq$element : seq === null || seq === void 0 ? void 0 : seq['xsd:element'];
          var _iterator5 = _createForOfIteratorHelper(els !== null && els !== void 0 ? els : []),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _el = _step5.value;
              schema.props[_el.$.name] = getTypeInfo(_el, simpleTypes);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          var cc = (_complexType$complexC = complexType.complexContent) !== null && _complexType$complexC !== void 0 ? _complexType$complexC : complexType['xsd:complexContent'];
          if (cc) {
            var _cc$extension;
            var extension = (_cc$extension = cc.extension) !== null && _cc$extension !== void 0 ? _cc$extension : cc['xsd:extension'];
            if (extension) {
              var _extension$sequence, _seq$element2;
              schema.extends = extension.$.base.split(':')[1];
              var _seq = (_extension$sequence = extension.sequence) !== null && _extension$sequence !== void 0 ? _extension$sequence : extension['xsd:sequence'];
              var _els = (_seq$element2 = _seq === null || _seq === void 0 ? void 0 : _seq.element) !== null && _seq$element2 !== void 0 ? _seq$element2 : _seq === null || _seq === void 0 ? void 0 : _seq['xsd:element'];
              var _iterator6 = _createForOfIteratorHelper(_els !== null && _els !== void 0 ? _els : []),
                _step6;
              try {
                for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                  var el = _step6.value;
                  schema.props[el.$.name] = getTypeInfo(el, simpleTypes);
                }
              } catch (err) {
                _iterator6.e(err);
              } finally {
                _iterator6.f();
              }
            }
          }
          schemas[complexType.$.name] = schema;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return schemas;
}

/**
 *
 */
var GENERATED_MESSAGE_COMMENT = "/**\n * This file is generated from WSDL file by wsdl2schema.ts.\n * Do not modify directly.\n * To generate the file, run \"ts-node path/to/wsdl2schema.ts path/to/wsdl.xml path/to/schema.ts\"\n */\n";

/**
 *
 */
function dumpSchema(_x2, _x3) {
  return _dumpSchema.apply(this, arguments);
}
/**
 *
 */
function _dumpSchema() {
  _dumpSchema = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(schemas, outFile) {
    var out, print, println, writeSchema, writeTypeDef, writeTypeDefs;
    return _regeneratorRuntime.wrap(function _callee2$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          writeTypeDefs = function _writeTypeDefs(schemas) {
            for (var _i2 = 0, _Object$keys3 = _Object$keys(schemas); _i2 < _Object$keys3.length; _i2++) {
              var name = _Object$keys3[_i2];
              var schema = schemas[name];
              print("export type ".concat(name, " = "));
              writeTypeDef(schema, schemas);
              println(';');
              println();
            }
            println('export type ApiSchemaTypes = {');
            for (var _i3 = 0, _Object$keys4 = _Object$keys(schemas); _i3 < _Object$keys4.length; _i3++) {
              var _context3;
              var _name = _Object$keys4[_i3];
              println(_concatInstanceProperty(_context3 = "".concat(_name, ": ")).call(_context3, _name, ";"), 2);
            }
            println('};');
          };
          writeTypeDef = function _writeTypeDef(o, schemas) {
            var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            if (typeof o === 'string') {
              print(o);
            } else if (isMapObject(o)) {
              if ('type' in o && 'props' in o) {
                if ('extends' in o && typeof o.extends === 'string') {
                  print("".concat(o.extends, " & "));
                }
                writeTypeDef(o.props, schemas, indent);
                return;
              }
              var keys = _Object$keys(o);
              if (keys.length > 0) {
                println('{');
                for (var _i = 0, _Object$keys2 = _Object$keys(o); _i < _Object$keys2.length; _i++) {
                  var _context2;
                  var prop = _Object$keys2[_i];
                  var value = o[prop];
                  var nillable = false;
                  var isArray = false;
                  if (_Array$isArray(value)) {
                    isArray = true;
                    var len = value.length;
                    if (len === 2 && value[0] === '?') {
                      nillable = true;
                      value = value[1];
                    } else {
                      value = value[0];
                    }
                  } else if (isMapObject(value)) {
                    if ('?' in value) {
                      nillable = true;
                      value = value['?'];
                    }
                  }
                  if (typeof value === 'string' && _startsWithInstanceProperty(value).call(value, '?')) {
                    nillable = true;
                    value = value.substring(1);
                  }
                  print(_concatInstanceProperty(_context2 = "".concat(prop)).call(_context2, nillable ? '?' : '', ": "), indent + 2);
                  writeTypeDef(value, schemas, indent + 2);
                  if (isArray) {
                    print('[]');
                  }
                  if (nillable) {
                    print(' | null | undefined');
                  }
                  println(';');
                }
                print('}', indent);
              } else {
                print('{}');
              }
            }
          };
          writeSchema = function _writeSchema(o) {
            var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            if (indent > 20) {
              print("'any'");
              return;
            }
            if (_Array$isArray(o)) {
              print('[');
              var i = 0;
              var _iterator7 = _createForOfIteratorHelper(o),
                _step7;
              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  var co = _step7.value;
                  if (i > 0) {
                    print(', ');
                  }
                  writeSchema(co, indent);
                  i++;
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
              print(']');
            } else if (isMapObject(o)) {
              var keys = _Object$keys(o);
              if (keys.length > 0) {
                println('{');
                var _iterator8 = _createForOfIteratorHelper(keys),
                  _step8;
                try {
                  for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                    var name = _step8.value;
                    var _co = o[name];
                    var nameId = /^[\w_$]+$/.test(name) ? name : "'".concat(name, "'");
                    print("".concat(nameId, ": "), indent + 2);
                    writeSchema(_co, indent + 2);
                    println(',');
                  }
                } catch (err) {
                  _iterator8.e(err);
                } finally {
                  _iterator8.f();
                }
                print('}', indent);
              } else {
                print('{}');
              }
            } else {
              print(_JSON$stringify(o).replace(/"/g, "'"));
            }
          };
          out = fs.createWriteStream(outFile, 'utf8');
          print = function print(str) {
            var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            for (var i = 0; i < indent; i++) {
              out.write(' ');
            }
            out.write(str);
          };
          println = function println() {
            var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            print(str + '\n', indent);
          };
          return _context4.abrupt("return", new _Promise(function (resolve, reject) {
            out.on('error', reject);
            out.on('finish', function () {
              return resolve();
            });
            println(GENERATED_MESSAGE_COMMENT);
            print('export const ApiSchemas = ');
            writeSchema(schemas);
            println(' as const;');
            println();
            writeTypeDefs(schemas);
            out.end();
          }));
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee2);
  }));
  return _dumpSchema.apply(this, arguments);
}
function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var wsdlFilePath, outFilePath, wsdl, schemas;
    return _regeneratorRuntime.wrap(function _callee3$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          wsdlFilePath = process.argv[2];
          if (wsdlFilePath) {
            _context5.next = 4;
            break;
          }
          console.error('No input WSDL file is specified.');
          return _context5.abrupt("return");
        case 4:
          outFilePath = process.argv[3];
          if (wsdlFilePath) {
            _context5.next = 8;
            break;
          }
          console.error('No output typescript schema file is specified.');
          return _context5.abrupt("return");
        case 8:
          _context5.next = 10;
          return readWSDLFile(wsdlFilePath);
        case 10:
          wsdl = _context5.sent;
          schemas = extractComplexTypes(wsdl);
          dumpSchema(schemas, outFilePath);
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee3);
  }));
  return _main.apply(this, arguments);
}
main();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcyIsInhtbDJqcyIsImNhc3RUeXBlVXNpbmdTY2hlbWEiLCJpc01hcE9iamVjdCIsIldTRExSZXN0cmljdGlvblNjaGVtYSIsIiQiLCJiYXNlIiwiZW51bWVyYXRpb24iLCJ2YWx1ZSIsIldTRExTaW1wbGVUeXBlU2NoZW1hIiwibmFtZSIsInJlc3RyaWN0aW9uIiwiV1NETEVsZW1lbnRTY2hlbWEiLCJ0eXBlIiwibWluT2NjdXJzIiwibWF4T2NjdXJzIiwibmlsbGFibGUiLCJXU0RMU2VxdWVuY2VTY2hlbWEiLCJlbGVtZW50IiwiV1NETEV4dGVuc2lvblNjaGVtYSIsInNlcXVlbmNlIiwiV1NETENvbXBsZXhDb250ZW50U2NoZW1hIiwiZXh0ZW5zaW9uIiwiV1NETENvbXBsZXhUeXBlU2NoZW1hIiwiY29tcGxleENvbnRlbnQiLCJXU0RMU2NoZW1hU2NoZW1hIiwiY29tcGxleFR5cGUiLCJzaW1wbGVUeXBlIiwiV1NETFNjaGVtYSIsImRlZmluaXRpb25zIiwidHlwZXMiLCJzY2hlbWEiLCJtZXNzYWdlIiwicG9ydFR5cGUiLCJvcGVyYXRpb24iLCJiaW5kaW5nIiwic2VydmljZSIsImRvY3VtZW50YXRpb24iLCJ0b0pzVHlwZSIsInhzZFR5cGUiLCJzaW1wbGVUeXBlcyIsIl94c2RUeXBlJHNwbGl0Iiwic3BsaXQiLCJfeHNkVHlwZSRzcGxpdDIiLCJfc2xpY2VkVG9BcnJheSIsIm5zIiwicmVhZFdTRExGaWxlIiwiX3giLCJfcmVhZFdTRExGaWxlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsImZpbGVQYXRoIiwieG1sRGF0YSIsImpzb24iLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicHJvbWlzZXMiLCJyZWFkRmlsZSIsInNlbnQiLCJwYXJzZVN0cmluZ1Byb21pc2UiLCJleHBsaWNpdEFycmF5IiwiYWJydXB0Iiwic3RvcCIsImdldFR5cGVJbmZvIiwiZWwiLCJpc0FycmF5IiwiY29uY2F0IiwiZXh0cmFjdENvbXBsZXhUeXBlcyIsIndzZGwiLCJfcmVmIiwiX3R5cGVzJHNjaGVtYSIsIl9yZWYzIiwiX3R5cGVzJHNjaGVtYTIiLCJjb25zb2xlIiwibG9nIiwic2NoZW1hcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJfcmVmMiIsIl9zYyRzaW1wbGVUeXBlIiwic2MiLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwiX3NpbXBsZVR5cGUkcmVzdHJpY3RpIiwic3QiLCJycyIsImVyciIsImUiLCJmIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9yZWY0IiwiX3NjJGNvbXBsZXhUeXBlIiwiX2l0ZXJhdG9yNCIsIl9zdGVwNCIsIl9jb21wbGV4VHlwZSRzZXF1ZW5jZSIsIl9zZXEkZWxlbWVudCIsIl9jb21wbGV4VHlwZSRjb21wbGV4QyIsImN0IiwicHJvcHMiLCJzZXEiLCJlbHMiLCJfaXRlcmF0b3I1IiwiX3N0ZXA1IiwiY2MiLCJfY2MkZXh0ZW5zaW9uIiwiX2V4dGVuc2lvbiRzZXF1ZW5jZSIsIl9zZXEkZWxlbWVudDIiLCJleHRlbmRzIiwiX2l0ZXJhdG9yNiIsIl9zdGVwNiIsIkdFTkVSQVRFRF9NRVNTQUdFX0NPTU1FTlQiLCJkdW1wU2NoZW1hIiwiX3gyIiwiX3gzIiwiX2R1bXBTY2hlbWEiLCJfY2FsbGVlMiIsIm91dEZpbGUiLCJvdXQiLCJwcmludCIsInByaW50bG4iLCJ3cml0ZVNjaGVtYSIsIndyaXRlVHlwZURlZiIsIndyaXRlVHlwZURlZnMiLCJfY2FsbGVlMiQiLCJfY29udGV4dDQiLCJfd3JpdGVUeXBlRGVmcyIsIl9pMiIsIl9PYmplY3Qka2V5czMiLCJfT2JqZWN0JGtleXMiLCJsZW5ndGgiLCJfaTMiLCJfT2JqZWN0JGtleXM0IiwiX2NvbnRleHQzIiwiX2NvbmNhdEluc3RhbmNlUHJvcGVydHkiLCJjYWxsIiwiX3dyaXRlVHlwZURlZiIsIm8iLCJpbmRlbnQiLCJ1bmRlZmluZWQiLCJrZXlzIiwiX2kiLCJfT2JqZWN0JGtleXMyIiwiX2NvbnRleHQyIiwicHJvcCIsIl9BcnJheSRpc0FycmF5IiwibGVuIiwiX3N0YXJ0c1dpdGhJbnN0YW5jZVByb3BlcnR5Iiwic3Vic3RyaW5nIiwiX3dyaXRlU2NoZW1hIiwiaSIsIl9pdGVyYXRvcjciLCJfc3RlcDciLCJjbyIsIl9pdGVyYXRvcjgiLCJfc3RlcDgiLCJuYW1lSWQiLCJ0ZXN0IiwiX0pTT04kc3RyaW5naWZ5IiwicmVwbGFjZSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwic3RyIiwid3JpdGUiLCJfUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbiIsImVuZCIsIm1haW4iLCJfbWFpbiIsIl9jYWxsZWUzIiwid3NkbEZpbGVQYXRoIiwib3V0RmlsZVBhdGgiLCJfY2FsbGVlMyQiLCJfY29udGV4dDUiLCJwcm9jZXNzIiwiYXJndiIsImVycm9yIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS93c2RsL3dzZGwyc2NoZW1hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdub2RlOmZzJztcbmltcG9ydCB4bWwyanMgZnJvbSAneG1sMmpzJztcbmltcG9ydCB7IGNhc3RUeXBlVXNpbmdTY2hlbWEgfSBmcm9tICcuLi8uLi9zb2FwJztcbmltcG9ydCB7IFNvYXBTY2hlbWFFbGVtZW50VHlwZSwgU29hcFNjaGVtYURlZiB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IGlzTWFwT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbC9mdW5jdGlvbic7XG5cbi8qKlxuICpcbiAqL1xuY29uc3QgV1NETFJlc3RyaWN0aW9uU2NoZW1hID0ge1xuICAkOiB7IGJhc2U6ICdzdHJpbmcnIH0sXG4gIGVudW1lcmF0aW9uOiBbXG4gICAge1xuICAgICAgJDogeyB2YWx1ZTogJ3N0cmluZycgfSxcbiAgICB9LFxuICBdLFxuICAneHNkOmVudW1lcmF0aW9uJzogW1xuICAgIHtcbiAgICAgICQ6IHsgdmFsdWU6ICdzdHJpbmcnIH0sXG4gICAgfSxcbiAgXSxcbn0gYXMgY29uc3Q7XG5cbmNvbnN0IFdTRExTaW1wbGVUeXBlU2NoZW1hID0ge1xuICAkOiB7IG5hbWU6ICdzdHJpbmcnIH0sXG4gIHJlc3RyaWN0aW9uOiBXU0RMUmVzdHJpY3Rpb25TY2hlbWEsXG4gICd4c2Q6cmVzdHJpY3Rpb24nOiBXU0RMUmVzdHJpY3Rpb25TY2hlbWEsXG59IGFzIGNvbnN0O1xuXG5jb25zdCBXU0RMRWxlbWVudFNjaGVtYSA9IHtcbiAgJDoge1xuICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIG1pbk9jY3VyczogJz9udW1iZXInLFxuICAgIG1heE9jY3VyczogJz9zdHJpbmcnLFxuICAgIG5pbGxhYmxlOiAnP2Jvb2xlYW4nLFxuICB9LFxufSBhcyBjb25zdDtcblxuY29uc3QgV1NETFNlcXVlbmNlU2NoZW1hID0ge1xuICBlbGVtZW50OiBbJz8nLCBXU0RMRWxlbWVudFNjaGVtYV0sXG4gICd4c2Q6ZWxlbWVudCc6IFsnPycsIFdTRExFbGVtZW50U2NoZW1hXSxcbn0gYXMgY29uc3Q7XG5cbmNvbnN0IFdTRExFeHRlbnNpb25TY2hlbWEgPSB7XG4gICQ6IHsgYmFzZTogJ3N0cmluZycgfSxcbiAgc2VxdWVuY2U6IHsgJz8nOiBXU0RMU2VxdWVuY2VTY2hlbWEgfSxcbiAgJ3hzZDpzZXF1ZW5jZSc6IHsgJz8nOiBXU0RMU2VxdWVuY2VTY2hlbWEgfSxcbn0gYXMgY29uc3Q7XG5cbmNvbnN0IFdTRExDb21wbGV4Q29udGVudFNjaGVtYSA9IHtcbiAgZXh0ZW5zaW9uOiB7ICc/JzogV1NETEV4dGVuc2lvblNjaGVtYSB9LFxuICAneHNkOmV4dGVuc2lvbic6IHsgJz8nOiBXU0RMRXh0ZW5zaW9uU2NoZW1hIH0sXG59IGFzIGNvbnN0O1xuXG5jb25zdCBXU0RMQ29tcGxleFR5cGVTY2hlbWEgPSB7XG4gICQ6IHsgbmFtZTogJ3N0cmluZycgfSxcbiAgc2VxdWVuY2U6IHsgJz8nOiBXU0RMU2VxdWVuY2VTY2hlbWEgfSxcbiAgJ3hzZDpzZXF1ZW5jZSc6IHsgJz8nOiBXU0RMU2VxdWVuY2VTY2hlbWEgfSxcbiAgY29tcGxleENvbnRlbnQ6IHsgJz8nOiBXU0RMQ29tcGxleENvbnRlbnRTY2hlbWEgfSxcbiAgJ3hzZDpjb21wbGV4Q29udGVudCc6IHsgJz8nOiBXU0RMQ29tcGxleENvbnRlbnRTY2hlbWEgfSxcbn0gYXMgY29uc3Q7XG5cbmNvbnN0IFdTRExTY2hlbWFTY2hlbWEgPSB7XG4gICQ6ICdhbnknLFxuICBjb21wbGV4VHlwZTogWyc/JywgJ2FueSddLFxuICBzaW1wbGVUeXBlOiBbJz8nLCAnYW55J10sXG4gICd4c2Q6Y29tcGxleFR5cGUnOiBbJz8nLCAnYW55J10sXG4gICd4c2Q6c2ltcGxlVHlwZSc6IFsnPycsICdhbnknXSxcbn0gYXMgY29uc3Q7XG5cbmNvbnN0IFdTRExTY2hlbWEgPSB7XG4gIGRlZmluaXRpb25zOiB7XG4gICAgJDogJ2FueScsXG4gICAgdHlwZXM6IHtcbiAgICAgIHNjaGVtYTogWyc/JywgV1NETFNjaGVtYVNjaGVtYV0sXG4gICAgICAneHNkOnNjaGVtYSc6IFsnPycsIFdTRExTY2hlbWFTY2hlbWFdLFxuICAgIH0sXG4gICAgbWVzc2FnZTogWydhbnknXSxcbiAgICBwb3J0VHlwZToge1xuICAgICAgJDogJ2FueScsXG4gICAgICBvcGVyYXRpb246IFsnYW55J10sXG4gICAgfSxcbiAgICBiaW5kaW5nOiB7XG4gICAgICAkOiAnYW55JyxcbiAgICAgIG9wZXJhdGlvbjogWydhbnknXSxcbiAgICB9LFxuICAgIHNlcnZpY2U6IHtcbiAgICAgICQ6ICdhbnknLFxuICAgICAgZG9jdW1lbnRhdGlvbjogJ3N0cmluZycsXG4gICAgICBvcGVyYXRpb246IFsnYW55J10sXG4gICAgfSxcbiAgfSxcbn0gYXMgY29uc3Q7XG5cbi8qKlxuICpcbiAqL1xudHlwZSBXU0RMID0gU29hcFNjaGVtYUVsZW1lbnRUeXBlPHR5cGVvZiBXU0RMU2NoZW1hPjtcblxudHlwZSBXU0RMRWxlbWVudCA9IFNvYXBTY2hlbWFFbGVtZW50VHlwZTx0eXBlb2YgV1NETEVsZW1lbnRTY2hlbWE+O1xuXG50eXBlIFdTRExTaW1wbGVUeXBlID0gU29hcFNjaGVtYUVsZW1lbnRUeXBlPHR5cGVvZiBXU0RMU2ltcGxlVHlwZVNjaGVtYT47XG5cbnR5cGUgV1NETENvbXBsZXhUeXBlID0gU29hcFNjaGVtYUVsZW1lbnRUeXBlPHR5cGVvZiBXU0RMQ29tcGxleFR5cGVTY2hlbWE+O1xuXG4vKipcbiAqXG4gKi9cbmZ1bmN0aW9uIHRvSnNUeXBlKHhzZFR5cGU6IHN0cmluZywgc2ltcGxlVHlwZXM6IHsgW3R5cGU6IHN0cmluZ106IHN0cmluZyB9KSB7XG4gIHN3aXRjaCAoeHNkVHlwZSkge1xuICAgIGNhc2UgJ3hzZDpib29sZWFuJzpcbiAgICAgIHJldHVybiAnYm9vbGVhbic7XG4gICAgY2FzZSAneHNkOnN0cmluZyc6XG4gICAgY2FzZSAneHNkOmRhdGUnOlxuICAgIGNhc2UgJ3hzZDpkYXRlVGltZSc6XG4gICAgY2FzZSAneHNkOnRpbWUnOlxuICAgIGNhc2UgJ3hzZDpiYXNlNjRCaW5hcnknOlxuICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgIGNhc2UgJ3hzZDppbnQnOlxuICAgIGNhc2UgJ3hzZDpsb25nJzpcbiAgICBjYXNlICd4c2Q6ZG91YmxlJzpcbiAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICBjYXNlICd4c2Q6YW55VHlwZSc6XG4gICAgICByZXR1cm4gJ2FueSc7XG4gICAgZGVmYXVsdDoge1xuICAgICAgY29uc3QgW25zLCB0eXBlXSA9IHhzZFR5cGUuc3BsaXQoJzonKTtcbiAgICAgIGlmIChzaW1wbGVUeXBlc1t0eXBlXSkge1xuICAgICAgICByZXR1cm4gc2ltcGxlVHlwZXNbdHlwZV07XG4gICAgICB9XG4gICAgICBpZiAobnMpIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgICByZXR1cm4geHNkVHlwZTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKlxuICovXG5hc3luYyBmdW5jdGlvbiByZWFkV1NETEZpbGUoZmlsZVBhdGg6IHN0cmluZykge1xuICBjb25zdCB4bWxEYXRhID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZVBhdGgsICd1dGY4Jyk7XG4gIGNvbnN0IGpzb24gPSBhd2FpdCB4bWwyanMucGFyc2VTdHJpbmdQcm9taXNlKHhtbERhdGEsIHtcbiAgICBleHBsaWNpdEFycmF5OiBmYWxzZSxcbiAgfSk7XG4gIHJldHVybiBjYXN0VHlwZVVzaW5nU2NoZW1hKGpzb24sIFdTRExTY2hlbWEpIGFzIFdTREw7XG59XG5cbi8qKlxuICpcbiAqL1xuZnVuY3Rpb24gZ2V0VHlwZUluZm8oZWw6IFdTRExFbGVtZW50LCBzaW1wbGVUeXBlczogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0pIHtcbiAgY29uc3QgdHlwZSA9IHRvSnNUeXBlKGVsLiQudHlwZSwgc2ltcGxlVHlwZXMpO1xuICBjb25zdCBpc0FycmF5ID0gZWwuJC5tYXhPY2N1cnMgPT09ICd1bmJvdW5kZWQnO1xuICBjb25zdCBuaWxsYWJsZSA9ICghaXNBcnJheSAmJiBlbC4kLm1pbk9jY3VycyA9PT0gMCkgfHwgZWwuJC5uaWxsYWJsZTtcbiAgcmV0dXJuIGlzQXJyYXlcbiAgICA/IG5pbGxhYmxlXG4gICAgICA/IFsnPycsIHR5cGVdXG4gICAgICA6IFt0eXBlXVxuICAgIDogbmlsbGFibGVcbiAgICA/IGA/JHt0eXBlfWBcbiAgICA6IHR5cGU7XG59XG5cbi8qKlxuICpcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdENvbXBsZXhUeXBlcyh3c2RsOiBXU0RMKSB7XG4gIGNvbnNvbGUubG9nKHdzZGwuZGVmaW5pdGlvbnMudHlwZXNbJ3hzZDpzY2hlbWEnXSk7XG4gIGNvbnN0IHNjaGVtYXM6IHsgW25hbWU6IHN0cmluZ106IFNvYXBTY2hlbWFEZWYgfSA9IHt9O1xuICBjb25zdCBzaW1wbGVUeXBlczogeyBbdHlwZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgY29uc3QgdHlwZXMgPSB3c2RsLmRlZmluaXRpb25zLnR5cGVzO1xuICBmb3IgKGNvbnN0IHNjIG9mIHR5cGVzLnNjaGVtYSA/PyB0eXBlc1sneHNkOnNjaGVtYSddID8/IFtdKSB7XG4gICAgZm9yIChjb25zdCBzdCBvZiBzYy5zaW1wbGVUeXBlID8/IHNjWyd4c2Q6c2ltcGxlVHlwZSddID8/IFtdKSB7XG4gICAgICBjb25zdCBzaW1wbGVUeXBlOiBXU0RMU2ltcGxlVHlwZSA9IGNhc3RUeXBlVXNpbmdTY2hlbWEoXG4gICAgICAgIHN0LFxuICAgICAgICBXU0RMU2ltcGxlVHlwZVNjaGVtYSxcbiAgICAgICk7XG4gICAgICBjb25zdCBycyA9IHNpbXBsZVR5cGUucmVzdHJpY3Rpb24gPz8gc2ltcGxlVHlwZVsneHNkOnJlc3RyaWN0aW9uJ107XG4gICAgICBjb25zdCBiYXNlID0gcnMuJC5iYXNlLnNwbGl0KCc6JylbMV07XG4gICAgICBzaW1wbGVUeXBlc1tzaW1wbGVUeXBlLiQubmFtZV0gPSBiYXNlO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZyh7IHNpbXBsZVR5cGVzIH0pO1xuICBmb3IgKGNvbnN0IHNjIG9mIHR5cGVzLnNjaGVtYSA/PyB0eXBlc1sneHNkOnNjaGVtYSddID8/IFtdKSB7XG4gICAgZm9yIChjb25zdCBjdCBvZiBzYy5jb21wbGV4VHlwZSA/PyBzY1sneHNkOmNvbXBsZXhUeXBlJ10gPz8gW10pIHtcbiAgICAgIGNvbnN0IGNvbXBsZXhUeXBlOiBXU0RMQ29tcGxleFR5cGUgPSBjYXN0VHlwZVVzaW5nU2NoZW1hKFxuICAgICAgICBjdCxcbiAgICAgICAgV1NETENvbXBsZXhUeXBlU2NoZW1hLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHNjaGVtYToge1xuICAgICAgICB0eXBlOiBzdHJpbmc7XG4gICAgICAgIGV4dGVuZHM/OiBzdHJpbmc7XG4gICAgICAgIHByb3BzOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfTtcbiAgICAgIH0gPSB7XG4gICAgICAgIHR5cGU6IGNvbXBsZXhUeXBlLiQubmFtZSxcbiAgICAgICAgcHJvcHM6IHt9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNlcSA9IGNvbXBsZXhUeXBlLnNlcXVlbmNlID8/IGNvbXBsZXhUeXBlWyd4c2Q6c2VxdWVuY2UnXTtcbiAgICAgIGNvbnN0IGVscyA9IHNlcT8uZWxlbWVudCA/PyBzZXE/LlsneHNkOmVsZW1lbnQnXTtcbiAgICAgIGZvciAoY29uc3QgZWwgb2YgZWxzID8/IFtdKSB7XG4gICAgICAgIHNjaGVtYS5wcm9wc1tlbC4kLm5hbWVdID0gZ2V0VHlwZUluZm8oZWwsIHNpbXBsZVR5cGVzKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNjID1cbiAgICAgICAgY29tcGxleFR5cGUuY29tcGxleENvbnRlbnQgPz8gY29tcGxleFR5cGVbJ3hzZDpjb21wbGV4Q29udGVudCddO1xuICAgICAgaWYgKGNjKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IGNjLmV4dGVuc2lvbiA/PyBjY1sneHNkOmV4dGVuc2lvbiddO1xuICAgICAgICBpZiAoZXh0ZW5zaW9uKSB7XG4gICAgICAgICAgc2NoZW1hLmV4dGVuZHMgPSBleHRlbnNpb24uJC5iYXNlLnNwbGl0KCc6JylbMV07XG4gICAgICAgICAgY29uc3Qgc2VxID0gZXh0ZW5zaW9uLnNlcXVlbmNlID8/IGV4dGVuc2lvblsneHNkOnNlcXVlbmNlJ107XG4gICAgICAgICAgY29uc3QgZWxzID0gc2VxPy5lbGVtZW50ID8/IHNlcT8uWyd4c2Q6ZWxlbWVudCddO1xuICAgICAgICAgIGZvciAoY29uc3QgZWwgb2YgZWxzID8/IFtdKSB7XG4gICAgICAgICAgICBzY2hlbWEucHJvcHNbZWwuJC5uYW1lXSA9IGdldFR5cGVJbmZvKGVsLCBzaW1wbGVUeXBlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzY2hlbWFzW2NvbXBsZXhUeXBlLiQubmFtZV0gPSBzY2hlbWE7XG4gICAgfVxuICB9XG4gIHJldHVybiBzY2hlbWFzO1xufVxuXG4vKipcbiAqXG4gKi9cbmNvbnN0IEdFTkVSQVRFRF9NRVNTQUdFX0NPTU1FTlQgPSBgLyoqXG4gKiBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGZyb20gV1NETCBmaWxlIGJ5IHdzZGwyc2NoZW1hLnRzLlxuICogRG8gbm90IG1vZGlmeSBkaXJlY3RseS5cbiAqIFRvIGdlbmVyYXRlIHRoZSBmaWxlLCBydW4gXCJ0cy1ub2RlIHBhdGgvdG8vd3NkbDJzY2hlbWEudHMgcGF0aC90by93c2RsLnhtbCBwYXRoL3RvL3NjaGVtYS50c1wiXG4gKi9cbmA7XG5cbi8qKlxuICpcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZHVtcFNjaGVtYShzY2hlbWFzOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSwgb3V0RmlsZTogc3RyaW5nKSB7XG4gIGNvbnN0IG91dCA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKG91dEZpbGUsICd1dGY4Jyk7XG4gIGNvbnN0IHByaW50ID0gKHN0cjogc3RyaW5nLCBpbmRlbnQ6IG51bWJlciA9IDApID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGVudDsgaSsrKSB7XG4gICAgICBvdXQud3JpdGUoJyAnKTtcbiAgICB9XG4gICAgb3V0LndyaXRlKHN0cik7XG4gIH07XG4gIGNvbnN0IHByaW50bG4gPSAoc3RyOiBzdHJpbmcgPSAnJywgaW5kZW50OiBudW1iZXIgPSAwKSA9PiB7XG4gICAgcHJpbnQoc3RyICsgJ1xcbicsIGluZGVudCk7XG4gIH07XG4gIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgb3V0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgb3V0Lm9uKCdmaW5pc2gnLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgIHByaW50bG4oR0VORVJBVEVEX01FU1NBR0VfQ09NTUVOVCk7XG4gICAgcHJpbnQoJ2V4cG9ydCBjb25zdCBBcGlTY2hlbWFzID0gJyk7XG4gICAgd3JpdGVTY2hlbWEoc2NoZW1hcyk7XG4gICAgcHJpbnRsbignIGFzIGNvbnN0OycpO1xuICAgIHByaW50bG4oKTtcbiAgICB3cml0ZVR5cGVEZWZzKHNjaGVtYXMpO1xuICAgIG91dC5lbmQoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gd3JpdGVTY2hlbWEobzogYW55LCBpbmRlbnQ6IG51bWJlciA9IDApIHtcbiAgICBpZiAoaW5kZW50ID4gMjApIHtcbiAgICAgIHByaW50KFwiJ2FueSdcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG4gICAgICBwcmludCgnWycpO1xuICAgICAgbGV0IGkgPSAwO1xuICAgICAgZm9yIChjb25zdCBjbyBvZiBvKSB7XG4gICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgIHByaW50KCcsICcpO1xuICAgICAgICB9XG4gICAgICAgIHdyaXRlU2NoZW1hKGNvLCBpbmRlbnQpO1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgICBwcmludCgnXScpO1xuICAgIH0gZWxzZSBpZiAoaXNNYXBPYmplY3QobykpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvKTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcHJpbnRsbigneycpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2Yga2V5cykge1xuICAgICAgICAgIGNvbnN0IGNvID0gb1tuYW1lXTtcbiAgICAgICAgICBjb25zdCBuYW1lSWQgPSAvXltcXHdfJF0rJC8udGVzdChuYW1lKSA/IG5hbWUgOiBgJyR7bmFtZX0nYDtcbiAgICAgICAgICBwcmludChgJHtuYW1lSWR9OiBgLCBpbmRlbnQgKyAyKTtcbiAgICAgICAgICB3cml0ZVNjaGVtYShjbywgaW5kZW50ICsgMik7XG4gICAgICAgICAgcHJpbnRsbignLCcpO1xuICAgICAgICB9XG4gICAgICAgIHByaW50KCd9JywgaW5kZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByaW50KCd7fScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwcmludChKU09OLnN0cmluZ2lmeShvKS5yZXBsYWNlKC9cIi9nLCBcIidcIikpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlVHlwZURlZihcbiAgICBvOiBhbnksXG4gICAgc2NoZW1hczogeyBbbmFtZTogc3RyaW5nXTogU29hcFNjaGVtYURlZiB9LFxuICAgIGluZGVudDogbnVtYmVyID0gMCxcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBvID09PSAnc3RyaW5nJykge1xuICAgICAgcHJpbnQobyk7XG4gICAgfSBlbHNlIGlmIChpc01hcE9iamVjdChvKSkge1xuICAgICAgaWYgKCd0eXBlJyBpbiBvICYmICdwcm9wcycgaW4gbykge1xuICAgICAgICBpZiAoJ2V4dGVuZHMnIGluIG8gJiYgdHlwZW9mIG8uZXh0ZW5kcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBwcmludChgJHtvLmV4dGVuZHN9ICYgYCk7XG4gICAgICAgIH1cbiAgICAgICAgd3JpdGVUeXBlRGVmKG8ucHJvcHMsIHNjaGVtYXMsIGluZGVudCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvKTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcHJpbnRsbigneycpO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMobykpIHtcbiAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9IG9bcHJvcF07XG4gICAgICAgICAgbGV0IG5pbGxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgbGV0IGlzQXJyYXkgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlzQXJyYXkgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgbGVuID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGxlbiA9PT0gMiAmJiB2YWx1ZVswXSA9PT0gJz8nKSB7XG4gICAgICAgICAgICAgIG5pbGxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVsxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpc01hcE9iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmICgnPycgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgbmlsbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlWyc/J107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnN0YXJ0c1dpdGgoJz8nKSkge1xuICAgICAgICAgICAgbmlsbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHByaW50KGAke3Byb3B9JHtuaWxsYWJsZSA/ICc/JyA6ICcnfTogYCwgaW5kZW50ICsgMik7XG4gICAgICAgICAgd3JpdGVUeXBlRGVmKHZhbHVlLCBzY2hlbWFzLCBpbmRlbnQgKyAyKTtcbiAgICAgICAgICBpZiAoaXNBcnJheSkge1xuICAgICAgICAgICAgcHJpbnQoJ1tdJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuaWxsYWJsZSkge1xuICAgICAgICAgICAgcHJpbnQoJyB8IG51bGwgfCB1bmRlZmluZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJpbnRsbignOycpO1xuICAgICAgICB9XG4gICAgICAgIHByaW50KCd9JywgaW5kZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByaW50KCd7fScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlVHlwZURlZnMoc2NoZW1hczogeyBbbmFtZTogc3RyaW5nXTogU29hcFNjaGVtYURlZiB9KSB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHNjaGVtYXMpKSB7XG4gICAgICBjb25zdCBzY2hlbWEgPSBzY2hlbWFzW25hbWVdO1xuICAgICAgcHJpbnQoYGV4cG9ydCB0eXBlICR7bmFtZX0gPSBgKTtcbiAgICAgIHdyaXRlVHlwZURlZihzY2hlbWEsIHNjaGVtYXMpO1xuICAgICAgcHJpbnRsbignOycpO1xuICAgICAgcHJpbnRsbigpO1xuICAgIH1cbiAgICBwcmludGxuKCdleHBvcnQgdHlwZSBBcGlTY2hlbWFUeXBlcyA9IHsnKTtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMoc2NoZW1hcykpIHtcbiAgICAgIHByaW50bG4oYCR7bmFtZX06ICR7bmFtZX07YCwgMik7XG4gICAgfVxuICAgIHByaW50bG4oJ307Jyk7XG4gIH1cbn1cblxuLyoqXG4gKlxuICovXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCB3c2RsRmlsZVBhdGggPSBwcm9jZXNzLmFyZ3ZbMl07XG4gIGlmICghd3NkbEZpbGVQYXRoKSB7XG4gICAgY29uc29sZS5lcnJvcignTm8gaW5wdXQgV1NETCBmaWxlIGlzIHNwZWNpZmllZC4nKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgb3V0RmlsZVBhdGggPSBwcm9jZXNzLmFyZ3ZbM107XG4gIGlmICghd3NkbEZpbGVQYXRoKSB7XG4gICAgY29uc29sZS5lcnJvcignTm8gb3V0cHV0IHR5cGVzY3JpcHQgc2NoZW1hIGZpbGUgaXMgc3BlY2lmaWVkLicpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB3c2RsID0gYXdhaXQgcmVhZFdTRExGaWxlKHdzZGxGaWxlUGF0aCk7XG4gIGNvbnN0IHNjaGVtYXMgPSBleHRyYWN0Q29tcGxleFR5cGVzKHdzZGwpO1xuICBkdW1wU2NoZW1hKHNjaGVtYXMsIG91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