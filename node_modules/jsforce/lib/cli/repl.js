"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repl = void 0;
/**
 * @file Creates REPL interface with built in Salesforce API objects and automatically resolves promise object
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 * @private
 */
const events_1 = require("events");
const repl_1 = require("repl");
const stream_1 = require("stream");
const __1 = __importDefault(require(".."));
const function_1 = require("../util/function");
/**
 * Intercept the evaled value returned from repl evaluator, convert and send back to output.
 * @private
 */
function injectBefore(replServer, method, beforeFn) {
    const _orig = replServer[method];
    replServer[method] = (...args) => {
        const callback = args.pop();
        beforeFn(...args.concat((err, res) => {
            if (err || res) {
                callback(err, res);
            }
            else {
                _orig.apply(replServer, args.concat(callback));
            }
        }));
    };
    return replServer;
}
/**
 * @private
 */
function injectAfter(replServer, method, afterFn) {
    const _orig = replServer[method];
    replServer[method] = (...args) => {
        const callback = args.pop();
        _orig.apply(replServer, args.concat((...args) => {
            try {
                afterFn(...args.concat(callback));
            }
            catch (e) {
                callback(e);
            }
        }));
    };
    return replServer;
}
/**
 * When the result was "promise", resolve its value
 * @private
 */
function promisify(err, value, callback) {
    // callback immediately if no value passed
    if (!callback && (0, function_1.isFunction)(value)) {
        callback = value;
        return callback();
    }
    if (err) {
        throw err;
    }
    if ((0, function_1.isPromiseLike)(value)) {
        value.then((v) => {
            callback(null, v);
        }, (err) => {
            callback(err);
        });
    }
    else {
        callback(null, value);
    }
}
/**
 * Output object to stdout in JSON representation
 * @private
 */
function outputToStdout(prettyPrint) {
    if (prettyPrint && !(0, function_1.isNumber)(prettyPrint)) {
        prettyPrint = 4;
    }
    return (err, value, callback) => {
        if (err) {
            console.error(err);
        }
        else {
            const str = JSON.stringify(value, null, prettyPrint);
            console.log(str);
        }
        callback(err, value);
    };
}
/**
 * define get accessor using Object.defineProperty
 * @private
 */
function defineProp(obj, prop, getter) {
    if (Object.defineProperty) {
        Object.defineProperty(obj, prop, { get: getter });
    }
}
/**
 *
 */
class Repl {
    _cli;
    _in;
    _out;
    _interactive = true;
    _paused = false;
    _replServer = undefined;
    constructor(cli) {
        this._cli = cli;
        this._in = new stream_1.Transform();
        this._out = new stream_1.Transform();
        this._in._transform = (chunk, encoding, callback) => {
            if (!this._paused) {
                this._in.push(chunk);
            }
            callback();
        };
        this._out._transform = (chunk, encoding, callback) => {
            if (!this._paused && this._interactive !== false) {
                this._out.push(chunk);
            }
            callback();
        };
    }
    /**
     *
     */
    start(options = {}) {
        this._interactive = options.interactive !== false;
        process.stdin.resume();
        if (process.stdin.setRawMode) {
            process.stdin.setRawMode(true);
        }
        process.stdin.pipe(this._in);
        this._out.pipe(process.stdout);
        defineProp(this._out, 'columns', () => process.stdout.columns);
        this._replServer = (0, repl_1.start)({
            input: this._in,
            output: this._out,
            terminal: true,
        });
        this._defineAdditionalCommands();
        this._replServer = injectBefore(this._replServer, 'completer', (line, callback) => {
            this.complete(line)
                .then((rets) => {
                callback(null, rets);
            })
                .catch((err) => {
                callback(err);
            });
        });
        this._replServer = injectAfter(this._replServer, 'eval', promisify);
        if (options.interactive === false) {
            this._replServer = injectAfter(this._replServer, 'eval', outputToStdout(options.prettyPrint));
            this._replServer = injectAfter(this._replServer, 'eval', function () {
                process.exit();
            });
        }
        this._replServer.on('exit', () => process.exit());
        this._defineBuiltinVars(this._replServer.context);
        if (options.evalScript) {
            this._in.write(options.evalScript + '\n', 'utf-8');
        }
        return this;
    }
    /**
     *
     */
    _defineAdditionalCommands() {
        const cli = this._cli;
        const replServer = this._replServer;
        if (!replServer) {
            return;
        }
        replServer.defineCommand('connections', {
            help: 'List currenty registered Salesforce connections',
            action: async () => {
                await cli.listConnections();
                replServer.displayPrompt();
            },
        });
        replServer.defineCommand('connect', {
            help: 'Connect to Salesforce instance',
            action: async (...args) => {
                const [name, password] = args;
                const params = password
                    ? { connection: name, username: name, password: password }
                    : { connection: name, username: name };
                try {
                    await cli.connect(params);
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.error(err.message);
                    }
                }
                replServer.displayPrompt();
            },
        });
        replServer.defineCommand('disconnect', {
            help: 'Disconnect connection and erase it from registry',
            action: (name) => {
                cli.disconnect(name);
                replServer.displayPrompt();
            },
        });
        replServer.defineCommand('use', {
            help: 'Specify login server to establish connection',
            action: (loginServer) => {
                cli.setLoginServer(loginServer);
                replServer.displayPrompt();
            },
        });
        replServer.defineCommand('authorize', {
            help: 'Connect to Salesforce using OAuth2 authorization flow',
            action: async (clientName) => {
                try {
                    await cli.authorize(clientName);
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.error(err.message);
                    }
                }
                replServer.displayPrompt();
            },
        });
        replServer.defineCommand('register', {
            help: 'Register OAuth2 client information',
            action: async (...args) => {
                const [clientName, clientId, clientSecret, redirectUri, loginUrl,] = args;
                const config = { clientId, clientSecret, redirectUri, loginUrl };
                try {
                    await cli.register(clientName, config);
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.error(err.message);
                    }
                }
                replServer.displayPrompt();
            },
        });
        replServer.defineCommand('open', {
            help: 'Open Salesforce web page using established connection',
            action: (url) => {
                cli.openUrlUsingSession(url);
                replServer.displayPrompt();
            },
        });
    }
    /**
     *
     */
    pause() {
        this._paused = true;
        if (process.stdin.setRawMode) {
            process.stdin.setRawMode(false);
        }
    }
    /**
     *
     */
    resume() {
        this._paused = false;
        process.stdin.resume();
        if (process.stdin.setRawMode) {
            process.stdin.setRawMode(true);
        }
    }
    /**
     *
     */
    async complete(line) {
        const tokens = line.replace(/^\s+/, '').split(/\s+/);
        const [command, keyword = ''] = tokens;
        if (command.startsWith('.') && tokens.length === 2) {
            let candidates = [];
            if (command === '.connect' || command === '.disconnect') {
                candidates = await this._cli.getConnectionNames();
            }
            else if (command === '.authorize') {
                candidates = await this._cli.getClientNames();
            }
            else if (command === '.use') {
                candidates = ['production', 'sandbox'];
            }
            candidates = candidates.filter((name) => name.startsWith(keyword));
            return [candidates, keyword];
        }
    }
    /**
     * Map all jsforce object to REPL context
     * @private
     */
    _defineBuiltinVars(context) {
        const cli = this._cli;
        // define salesforce package root objects
        for (const key in __1.default) {
            if (Object.prototype.hasOwnProperty.call(__1.default, key) &&
                !global[key]) {
                context[key] = __1.default[key];
            }
        }
        // expose jsforce package root object in context.
        context.jsforce = __1.default;
        function createProxyFunc(prop) {
            return (...args) => {
                const conn = cli.getCurrentConnection();
                return conn[prop](...args);
            };
        }
        function createProxyAccessor(prop) {
            return () => {
                const conn = cli.getCurrentConnection();
                return conn[prop];
            };
        }
        const conn = cli.getCurrentConnection();
        // list all props in connection instance, other than EventEmitter or object built-in methods
        const props = {};
        let o = conn;
        while (o && o !== events_1.EventEmitter.prototype && o !== Object.prototype) {
            for (const p of Object.getOwnPropertyNames(o)) {
                if (p !== 'constructor') {
                    props[p] = true;
                }
            }
            o = Object.getPrototypeOf(o);
        }
        for (const prop of Object.keys(props)) {
            if (typeof global[prop] !== 'undefined') {
                // avoid global override
                continue;
            }
            if (prop.startsWith('_')) {
                // ignore private
                continue;
            }
            if ((0, function_1.isFunction)(conn[prop])) {
                context[prop] = createProxyFunc(prop);
            }
            else if ((0, function_1.isObject)(conn[prop])) {
                defineProp(context, prop, createProxyAccessor(prop));
            }
        }
        // expose default connection as "$conn"
        defineProp(context, '$conn', () => {
            return cli.getCurrentConnection();
        });
    }
}
exports.Repl = Repl;
exports.default = Repl;
