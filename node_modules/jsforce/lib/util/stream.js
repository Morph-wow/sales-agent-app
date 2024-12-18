"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatStreamsAsDuplex = exports.readAll = exports.createLazyStream = void 0;
const stream_1 = require("stream");
function createLazyStream() {
    const ins = new stream_1.PassThrough();
    const outs = new stream_1.PassThrough();
    const stream = concatStreamsAsDuplex(ins, outs);
    let piped = false;
    const setStream = (str) => {
        if (piped) {
            throw new Error('stream is already piped to actual stream');
        }
        piped = true;
        ins.pipe(str).pipe(outs);
    };
    return { stream, setStream };
}
exports.createLazyStream = createLazyStream;
class MemoryWriteStream extends stream_1.Writable {
    _buf;
    constructor() {
        super();
        this._buf = Buffer.alloc(0);
    }
    _write(chunk, encoding, callback) {
        this._buf = Buffer.concat([this._buf, chunk]);
        callback();
    }
    _writev(data, callback) {
        this._buf = Buffer.concat([this._buf, ...data.map(({ chunk }) => chunk)]);
        callback();
    }
    toString(encoding = 'utf-8') {
        return this._buf.toString(encoding);
    }
}
async function readAll(rs, encoding = 'utf-8') {
    return new Promise((resolve, reject) => {
        const ws = new MemoryWriteStream();
        rs.on('error', reject)
            .pipe(ws)
            .on('finish', () => resolve(ws.toString(encoding)));
    });
}
exports.readAll = readAll;
class DuplexifiedStream extends stream_1.Duplex {
    _writable;
    _readable;
    constructor(ws, rs, opts = {}) {
        super({
            writableObjectMode: opts.writableObjectMode ?? ws.writableObjectMode,
            readableObjectMode: opts.readableObjectMode ?? rs.readableObjectMode,
        });
        this._writable = ws;
        this._readable = rs;
        ws.once('finish', () => {
            this.end();
        });
        this.once('finish', () => {
            ws.end();
        });
        rs.on('readable', () => {
            this._readStream();
        });
        rs.once('end', () => {
            this.push(null);
        });
        ws.on('error', (err) => this.emit('error', err));
        rs.on('error', (err) => this.emit('error', err));
    }
    _write(chunk, encoding, callback) {
        this._writable.write(chunk, encoding, callback);
    }
    _read(n) {
        this._readStream(n);
    }
    _readStream(n) {
        let data;
        while ((data = this._readable.read(n)) !== null) {
            this.push(data);
        }
    }
}
function concatStreamsAsDuplex(ws, rs, opts) {
    return new DuplexifiedStream(ws, rs, opts);
}
exports.concatStreamsAsDuplex = concatStreamsAsDuplex;
