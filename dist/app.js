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
var body_parser_1 = __importDefault(require("body-parser"));
var exp = express_1.default;
var app = (0, express_1.default)();
var port = 3000;
// the endpoint configuration file fort this server
var dsbEndpoints = __spreadArray([], endpoints_json_1.default, true);
var authOptions = {
    scopeFormat: 'STRING',
    endpoints: dsbEndpoints
};
var dsbOptions = {
    endpoints: dsbEndpoints
};
//app.use(exp.json());
//app.use(cdrJwtScopesListSeparated);
app.use(body_parser_1.default);
app.use((0, dsb_middleware_1.cdrJwtScopes)(authOptions));
app.use((0, dsb_middleware_1.cdrAuthorisation)(dsbOptions));
app.use((0, dsb_middleware_1.cdrHeaders)(dsbOptions));
var standardsVersion = '/cds-au/v1';
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
app.get(standardsVersion + "/energy/accounts/:accountId", function (req, res, next) {
    var st = "Received request on " + port + " for " + req.url;
    console.log(st);
    res.send(st);
});
app.post(standardsVersion + "/energy/electricity/servicepoints/usage", function (req, res, next) {
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
app.get('/', function (req, res, next) {
    console.log("Received request on BASE " + port);
    res.send();
});
app.listen(port);
//# sourceMappingURL=app.js.map