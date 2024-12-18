"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cli = void 0;
/**
 * @file Command line interface for JSforce
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const crypto_1 = __importDefault(require("crypto"));
const open_1 = __importDefault(require("open"));
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const request_1 = __importDefault(require("../request"));
const base64url_1 = __importDefault(require("base64url"));
const repl_1 = __importDefault(require("./repl"));
const __1 = __importStar(require(".."));
const VERSION_1 = __importDefault(require("../VERSION"));
const registry = __1.default.registry;
/**
 *
 */
class Cli {
    _repl = new repl_1.default(this);
    _conn = new __1.Connection();
    _connName = undefined;
    _outputEnabled = true;
    _defaultLoginUrl = undefined;
    /**
     *
     */
    readCommand() {
        return new commander_1.Command()
            .option('-u, --username [username]', 'Salesforce username')
            .option('-p, --password [password]', 'Salesforce password (and security token, if available)')
            .option('-c, --connection [connection]', 'Connection name stored in connection registry')
            .option('-l, --loginUrl [loginUrl]', 'Salesforce login url')
            .option('--sandbox', 'Login to Salesforce sandbox')
            .option('-e, --evalScript [evalScript]', 'Script to evaluate')
            .version(VERSION_1.default)
            .parse(process.argv);
    }
    async start() {
        const program = this.readCommand();
        this._outputEnabled = !program.evalScript;
        try {
            await this.connect(program);
            if (program.evalScript) {
                this._repl.start({
                    interactive: false,
                    evalScript: program.evalScript,
                });
            }
            else {
                this._repl.start();
            }
        }
        catch (err) {
            console.error(err);
            process.exit();
        }
    }
    getCurrentConnection() {
        return this._conn;
    }
    print(...args) {
        if (this._outputEnabled) {
            console.log(...args);
        }
    }
    saveCurrentConnection() {
        if (this._connName) {
            const conn = this._conn;
            const connName = this._connName;
            const connConfig = {
                oauth2: conn.oauth2
                    ? {
                        clientId: conn.oauth2.clientId || undefined,
                        clientSecret: conn.oauth2.clientSecret || undefined,
                        redirectUri: conn.oauth2.redirectUri || undefined,
                        loginUrl: conn.oauth2.loginUrl || undefined,
                    }
                    : undefined,
                accessToken: conn.accessToken || undefined,
                instanceUrl: conn.instanceUrl || undefined,
                refreshToken: conn.refreshToken || undefined,
            };
            registry.saveConnectionConfig(connName, connConfig);
        }
    }
    setLoginServer(loginServer) {
        if (!loginServer) {
            return;
        }
        if (loginServer === 'production') {
            this._defaultLoginUrl = 'https://login.salesforce.com';
        }
        else if (loginServer === 'sandbox') {
            this._defaultLoginUrl = 'https://test.salesforce.com';
        }
        else if (!loginServer.startsWith('https://')) {
            this._defaultLoginUrl = 'https://' + loginServer;
        }
        else {
            this._defaultLoginUrl = loginServer;
        }
        this.print(`Using "${this._defaultLoginUrl}" as default login URL.`);
    }
    /**
     *
     */
    async connect(options) {
        const loginServer = options.loginUrl
            ? options.loginUrl
            : options.sandbox
                ? 'sandbox'
                : null;
        this.setLoginServer(loginServer);
        this._connName = options.connection;
        let connConfig = await registry.getConnectionConfig(options.connection);
        let username = options.username;
        if (!connConfig) {
            connConfig = {};
            if (this._defaultLoginUrl) {
                connConfig.loginUrl = this._defaultLoginUrl;
            }
            username = username || options.connection;
        }
        this._conn = new __1.Connection(connConfig);
        const password = options.password;
        if (username) {
            await this.startPasswordAuth(username, password);
            this.saveCurrentConnection();
        }
        else {
            if (this._connName && this._conn.accessToken) {
                this._conn.on('refresh', () => {
                    this.print('Refreshing access token ... ');
                    this.saveCurrentConnection();
                });
                try {
                    const identity = await this._conn.identity();
                    this.print(`Logged in as : ${identity.username}`);
                }
                catch (err) {
                    if (err instanceof Error) {
                        this.print(err.message);
                    }
                    if (this._conn.oauth2) {
                        throw new Error('Please re-authorize connection.');
                    }
                    else {
                        await this.startPasswordAuth(this._connName);
                    }
                }
            }
        }
    }
    /**
     *
     */
    async startPasswordAuth(username, password) {
        try {
            await this.loginByPassword(username, password, 2);
        }
        catch (err) {
            if (err instanceof Error && err.message === 'canceled') {
                console.error('Password authentication canceled: Not logged in');
            }
            else {
                throw err;
            }
        }
    }
    /**
     *
     */
    async loginByPassword(username, password, retryCount) {
        if (password === '') {
            throw new Error('canceled');
        }
        if (password == null) {
            const pass = await this.promptPassword('Password: ');
            return this.loginByPassword(username, pass, retryCount);
        }
        try {
            const result = await this._conn.login(username, password);
            this.print(`Logged in as : ${username}`);
            return result;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
            if (retryCount > 0) {
                return this.loginByPassword(username, undefined, retryCount - 1);
            }
            else {
                throw new Error('canceled');
            }
        }
    }
    /**
     *
     */
    async disconnect(connName) {
        const name = connName || this._connName;
        if (name && (await registry.getConnectionConfig(name))) {
            await registry.removeConnectionConfig(name);
            this.print(`Disconnect connection '${name}'`);
        }
        this._connName = undefined;
        this._conn = new __1.Connection();
    }
    /**
     *
     */
    async authorize(clientName) {
        const name = clientName || 'default';
        const oauth2Config = await registry.getClientConfig(name);
        if (!oauth2Config?.clientId) {
            if (name === 'default' || name === 'sandbox') {
                this.print('No client information registered. Downloading JSforce default client information...');
                return this.downloadDefaultClientInfo(name);
            }
            throw new Error(`No OAuth2 client information registered : '${name}'. Please register client info first.`);
        }
        const oauth2 = new __1.OAuth2(oauth2Config);
        const verifier = base64url_1.default.encode(crypto_1.default.randomBytes(32));
        const challenge = base64url_1.default.encode(crypto_1.default.createHash('sha256').update(verifier).digest());
        const state = base64url_1.default.encode(crypto_1.default.randomBytes(32));
        const authzUrl = oauth2.getAuthorizationUrl({
            code_challenge: challenge,
            state,
        });
        this.print('Opening authorization page in browser...');
        this.print(`URL: ${authzUrl}`);
        this.openUrl(authzUrl);
        const params = await this.waitCallback(oauth2Config.redirectUri, state);
        if (!params.code) {
            throw new Error('No authorization code returned.');
        }
        if (params.state !== state) {
            throw new Error('Invalid state parameter returned.');
        }
        this._conn = new __1.Connection({ oauth2 });
        this.print('Received authorization code. Please close the opened browser window.');
        await this._conn.authorize(params.code, { code_verifier: verifier });
        this.print('Authorized. Fetching user info...');
        const identity = await this._conn.identity();
        this.print(`Logged in as : ${identity.username}`);
        this._connName = identity.username;
        this.saveCurrentConnection();
    }
    /**
     *
     */
    async downloadDefaultClientInfo(clientName) {
        const configUrl = 'https://jsforce.github.io/client-config/default.json';
        const res = await new Promise((resolve, reject) => {
            (0, request_1.default)({ method: 'GET', url: configUrl })
                .on('complete', resolve)
                .on('error', reject);
        });
        const clientConfig = JSON.parse(res.body);
        if (clientName === 'sandbox') {
            clientConfig.loginUrl = 'https://test.salesforce.com';
        }
        await registry.registerClientConfig(clientName, clientConfig);
        this.print('Client information downloaded successfully.');
        return this.authorize(clientName);
    }
    async waitCallback(serverUrl, state) {
        if (serverUrl && serverUrl.startsWith('http://localhost:')) {
            return new Promise((resolve, reject) => {
                const server = http_1.default.createServer((req, res) => {
                    if (!req.url) {
                        return;
                    }
                    const qparams = url_1.default.parse(req.url, true).query;
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('<html><script>location.href="about:blank";</script></html>');
                    res.end();
                    if (qparams.error) {
                        reject(new Error(qparams.error));
                    }
                    else {
                        resolve(qparams);
                    }
                    server.close();
                    req.connection.end();
                    req.connection.destroy();
                });
                const port = Number(url_1.default.parse(serverUrl).port);
                server.listen(port, 'localhost');
            });
        }
        else {
            const code = await this.promptMessage('Copy & paste authz code passed in redirected URL: ');
            return { code: decodeURIComponent(code), state };
        }
    }
    /**
     *
     */
    async register(clientName, clientConfig) {
        const name = clientName || 'default';
        const prompts = {
            clientId: 'Input client ID : ',
            clientSecret: 'Input client secret (optional) : ',
            redirectUri: 'Input redirect URI : ',
            loginUrl: 'Input login URL (default is https://login.salesforce.com) : ',
        };
        const registered = await registry.getClientConfig(name);
        if (registered) {
            const msg = `Client '${name}' is already registered. Are you sure you want to override ? [yN] : `;
            const ok = await this.promptConfirm(msg);
            if (!ok) {
                throw new Error('Registration canceled.');
            }
        }
        clientConfig = await Object.keys(prompts).reduce(async (promise, name) => {
            const cconfig = await promise;
            const promptName = name;
            const message = prompts[promptName];
            if (!cconfig[promptName]) {
                const value = await this.promptMessage(message);
                if (value) {
                    return {
                        ...cconfig,
                        [promptName]: value,
                    };
                }
            }
            return cconfig;
        }, Promise.resolve(clientConfig));
        await registry.registerClientConfig(name, clientConfig);
        this.print('Client registered successfully.');
    }
    /**
     *
     */
    async listConnections() {
        const names = await registry.getConnectionNames();
        for (const name of names) {
            this.print((name === this._connName ? '* ' : '  ') + name);
        }
    }
    /**
     *
     */
    async getConnectionNames() {
        return registry.getConnectionNames();
    }
    /**
     *
     */
    async getClientNames() {
        return registry.getClientNames();
    }
    /**
     *
     */
    async prompt(type, message) {
        this._repl.pause();
        const answer = await inquirer_1.default.prompt([
            {
                type,
                name: 'value',
                message,
            },
        ]);
        this._repl.resume();
        return answer.value;
    }
    /**
     *
     */
    async promptMessage(message) {
        return this.prompt('input', message);
    }
    async promptPassword(message) {
        return this.prompt('password', message);
    }
    /**
     *
     */
    async promptConfirm(message) {
        return this.prompt('confirm', message);
    }
    /**
     *
     */
    openUrl(url) {
        (0, open_1.default)(url);
    }
    /**
     *
     */
    openUrlUsingSession(url) {
        let frontdoorUrl = `${this._conn.instanceUrl}/secur/frontdoor.jsp?sid=${this._conn.accessToken}`;
        if (url) {
            frontdoorUrl += '&retURL=' + encodeURIComponent(url);
        }
        this.openUrl(frontdoorUrl);
    }
}
exports.Cli = Cli;
/* ------------------------------------------------------------------------- */
const cli = new Cli();
exports.default = cli;
