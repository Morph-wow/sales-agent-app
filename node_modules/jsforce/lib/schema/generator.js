"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
const cli_1 = require("../cli/cli");
const __1 = require("..");
const commander_1 = require("commander");
function getCacheFileDir() {
    return path_1.default.join(os_1.default.tmpdir(), 'jsforce-gen-schema-cache');
}
function getCacheFilePath(orgId) {
    return path_1.default.join(getCacheFileDir(), orgId, 'describe.json');
}
async function readDescribedCache(orgId) {
    try {
        const cacheFile = getCacheFilePath(orgId);
        const data = await node_fs_1.default.promises.readFile(cacheFile, 'utf8');
        return JSON.parse(data);
    }
    catch (e) {
        return null;
    }
}
async function loadDescribeResult(conn, orgId, cache) {
    console.info('describing global');
    const { sobjects: sos } = await conn.describeGlobal();
    const sobjects = [];
    for (const { name } of sos) {
        console.info('describing ' + name);
        const so = await conn.describe(name);
        sobjects.push(so);
    }
    if (cache) {
        const cacheFile = getCacheFilePath(orgId);
        await node_fs_1.default.promises.mkdir(path_1.default.dirname(cacheFile), { recursive: true });
        await node_fs_1.default.promises.writeFile(cacheFile, JSON.stringify(sobjects, null, 2), 'utf8');
    }
    return sobjects;
}
function getParentReferences(sobject) {
    const parentReferences = [];
    for (const { type, nillable, relationshipName, referenceTo, } of sobject.fields) {
        if (type === 'reference' &&
            relationshipName &&
            referenceTo &&
            referenceTo.length > 0) {
            const parentSObject = referenceTo.length > 1 ? 'Name' : referenceTo[0];
            parentReferences.push({ nillable, parentSObject, relationshipName });
        }
    }
    return parentReferences;
}
function getTSTypeString(type) {
    return type === 'double' ||
        type === 'int' ||
        type === 'currency' ||
        type === 'percent'
        ? 'number'
        : type === 'boolean'
            ? 'boolean'
            : type === 'date' || type === 'datetime' || type === 'time'
                ? 'DateString'
                : type === 'base64'
                    ? 'BlobString'
                    : type === 'address'
                        ? 'Address'
                        : type === 'complexvalue'
                            ? 'any'
                            : 'string';
}
async function dumpSchema(conn, orgId, outputFile, schemaName, cache) {
    const sobjects = (cache ? await readDescribedCache(orgId) : null) ||
        (await loadDescribeResult(conn, orgId, cache));
    if (!node_fs_1.default.existsSync(outputFile)) {
        await node_fs_1.default.promises.mkdir(path_1.default.dirname(outputFile), { recursive: true });
        await node_fs_1.default.promises.writeFile(outputFile, '', 'utf8');
    }
    const out = node_fs_1.default.createWriteStream(outputFile, 'utf8');
    return new Promise((resolve, reject) => {
        out.on('error', (err) => reject(err));
        out.on('finish', resolve);
        const writeLine = (message) => out.write(message + '\n');
        writeLine("import { Schema, SObjectDefinition, DateString, BlobString, Address } from 'jsforce';");
        writeLine('');
        for (const sobject of sobjects) {
            const { name, fields, childRelationships } = sobject;
            writeLine(`type Fields$${name} = {`);
            writeLine('  //');
            for (const { name, type, nillable } of fields) {
                const tsType = getTSTypeString(type);
                const orNull = nillable ? ' | null' : '';
                writeLine(`  ${name}: ${tsType}${orNull};`);
            }
            writeLine('};');
            writeLine('');
            writeLine(`type ParentReferences$${name} = {`);
            writeLine('  //');
            const parentReferences = getParentReferences(sobject);
            for (const { nillable, parentSObject, relationshipName, } of parentReferences) {
                const orNull = nillable ? ' | null' : '';
                writeLine(`  ${relationshipName}: SObjectDefinition$${parentSObject}${orNull};`);
            }
            writeLine('};');
            writeLine('');
            writeLine(`type ChildRelationships$${name} = {`);
            writeLine('  //');
            for (const { field, childSObject, relationshipName, } of childRelationships) {
                if (field &&
                    childSObject &&
                    relationshipName &&
                    !field.endsWith('__c')) {
                    writeLine(`  ${relationshipName}: SObjectDefinition$${childSObject};`);
                }
            }
            writeLine('};');
            writeLine('');
            writeLine(`interface SObjectDefinition$${name} extends SObjectDefinition<'${name}'> {
    Name: '${name}';
    Fields: Fields$${name};
    ParentReferences: ParentReferences$${name};
    ChildRelationships: ChildRelationships$${name};
  }`);
            writeLine('');
        }
        writeLine('');
        writeLine(`export interface ${schemaName} extends Schema {`);
        writeLine('  SObjects: {');
        for (const { name } of sobjects) {
            writeLine(`    ${name}: SObjectDefinition$${name};`);
        }
        writeLine('  };');
        writeLine('}');
        out.end();
    });
}
/**
 *
 */
function readCommand() {
    return new commander_1.Command()
        .option('-u, --username [username]', 'Salesforce username')
        .option('-p, --password [password]', 'Salesforce password (and security token, if available)')
        .option('-c, --connection [connection]', 'Connection name stored in connection registry')
        .option('-l, --loginUrl [loginUrl]', 'Salesforce login url')
        .option('-n, --schemaName [schemaName]', 'Name of schema type', 'MySchema')
        .requiredOption('-o, --outputFile <outputFile>', 'Generated schema file path', './schema.d.ts')
        .option('--sandbox', 'Login to Salesforce sandbox')
        .option('--no-cache', 'Do not generate cache file for described result in tmp directory')
        .option('--clearCache', 'Clear all existing described cache files')
        .version(__1.VERSION)
        .parse(process.argv);
}
/**
 *
 */
async function main() {
    const program = readCommand();
    const cli = new cli_1.Cli();
    await cli.connect(program);
    const conn = cli.getCurrentConnection();
    if (!conn.userInfo) {
        console.error('Cannot connect to Salesforce');
        return;
    }
    await dumpSchema(conn, conn.userInfo.organizationId, program.outputFile, program.schemaName, program.cache);
    if (program.clearCache) {
        console.log('removing cache files');
        await node_fs_1.default.promises.rm(getCacheFileDir(), { recursive: true });
    }
    console.log(`Dumped to: ${program.outputFile}`);
}
exports.default = main;
