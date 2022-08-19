"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var endpoints_json_1 = __importDefault(require("./data/endpoints.json"));
var dsb_middleware_1 = require("dsb-middleware");
var exp = express_1.default;
var app = (0, express_1.default)();
var port = 3000;
var standardsVersion = '/cds-au/v1';
// the endpoint configuration file fort this server, which endpoints does this server implement
// The dsb-middleware also has constants for DefaultBankingEndpoints and DefaultEnergyEndpoints
// These can be used as defaults if the server implements all CDR endpoints
// eg 
//          const dsbOptions: CdrConfig = {
//              endpoints: DefaultBankingEndpoints
//          }
var dsbEndpoints = __spreadArray([], endpoints_json_1.default, true);
// Used in cdrJwtScopes. This configuration assumes that the IdAM issues a JWT
// ie access token is JWT and scope in that token is a space delimited string
var authOptions = {
    scopeFormat: 'STRING',
    endpoints: dsbEndpoints,
};
// Used in the cdrAuthorisation and cdrHeaders functions. 
var dsbOptions = {
    endpoints: dsbEndpoints
};
// This middle ware will extend the request object with the scopes.
// It can be used for any IdAM where the access token is a JWT and the 
// scope property is either an array of string or a space separated string
app.use((0, dsb_middleware_1.cdrJwtScopes)(authOptions));
// This middle ware will check access tokens for existence and scope
app.use((0, dsb_middleware_1.cdrAuthorisation)(dsbOptions));
// this middle ware will handle the boilerplate validation and setting for a number of header parameters
app.use((0, dsb_middleware_1.cdrHeaders)(dsbOptions));
// this endpoint does NOT reequire authentication
app.get(standardsVersion + "/energy/plans", function (req, res, next) {
    var st = "Received request on " + port + " for " + req.url;
    console.log(st);
    res.send(st);
});
// this endpoint requires authentication
app.get(standardsVersion + "/energy/accounts", function (req, res, next) {
    var st = "Received request on " + port + " for " + req.url;
    console.log(st);
    res.send(st);
});
// this endpoint requires authentication
app.get(standardsVersion + "/energy/electricity/servicepoints", function (req, res, next) {
    var st = "Received request on " + port + " for " + req.url;
    console.log(st);
    res.send(st);
});
// this endpoint requires authentication
app.get(standardsVersion + "/energy/accounts/:accountId", function (req, res, next) {
    var st = "Received request on " + port + " for " + req.url;
    console.log(st);
    res.send(st);
});
// this endpoint requires authentication
app.get(standardsVersion + "/banking/accounts/:accountId/balance", function (req, res, next) {
    var st = "Received request on " + port + " for " + req.url;
    console.log(st);
    res.send(st);
});
// this endpoint requires authentication
app.get(standardsVersion + "/banking/payments/scheduled", function (req, res, next) {
    var st = "Received request on " + port + " for " + req.url;
    console.log(st);
    res.send(st);
});
// this endpoint requires authentication
app.get(standardsVersion + "/banking/payees", function (req, res, next) {
    var st = "Received request on " + port + " for " + req.url;
    console.log(st);
    res.send(st);
});
app.get('/', function (req, res, next) {
    console.log("Received request on BASE " + port);
    res.send();
});
app.listen(port);
//# sourceMappingURL=app.js.map